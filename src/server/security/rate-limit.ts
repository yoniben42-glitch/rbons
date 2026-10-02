type RateLimitRecord = { count: number; resetAt: number };
type CloudflareRateLimiter = { limit(input: { key: string }): Promise<{ success: boolean }> };

const memoryStore = new Map<string, RateLimitRecord>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const CF_BINDING = "RBONSU_RATE_LIMIT";

function prune(now: number) {
  for (const [key, value] of memoryStore) {
    if (value.resetAt <= now) memoryStore.delete(key);
  }
}

export function getClientIp(request: Request): string {
  return (
    request.headers.get("CF-Connecting-IP") ??
    request.headers.get("X-Real-IP") ??
    "unknown"
  ).slice(0, 64);
}

async function getCloudflareRateLimiter(): Promise<CloudflareRateLimiter | null> {
  try {
    const cloudflare = await import("cloudflare:workers");
    const candidate = cloudflare.env?.[CF_BINDING] as unknown;
    if (candidate && typeof candidate === "object" && typeof (candidate as CloudflareRateLimiter).limit === "function") {
      return candidate as CloudflareRateLimiter;
    }
  } catch {
    // Local Node/Vite execution does not provide the Worker-only module.
  }

  // Development/test fallback and compatibility with older Workers adapters.
  const candidate = (process.env as unknown as Record<string, unknown>)[CF_BINDING];
  if (!candidate || typeof candidate !== "object" || typeof (candidate as CloudflareRateLimiter).limit !== "function") {
    return null;
  }
  return candidate as CloudflareRateLimiter;
}

/**
 * Distributed Cloudflare protection is applied first when the Worker binding
 * exists. The memory window remains as a finer-grained defense and local-dev
 * fallback. Cloudflare's binding uses a one-minute window; application limits
 * below can remain longer without changing endpoint behavior.
 */
export async function checkRateLimit(
  key: string,
  limit = MAX_REQUESTS,
  windowMs = WINDOW_MS,
) {
  const cloudflare = await getCloudflareRateLimiter();
  if (cloudflare) {
    try {
      const result = await cloudflare.limit({ key: `rbonsu:${key}` });
      if (!result.success) {
        return { allowed: false, retryAfterSeconds: 60 };
      }
    } catch {
      // Availability of the rate-limit binding must never make the site fail
      // closed. The local limiter below remains active as a safety net.
    }
  }

  const now = Date.now();
  prune(now);
  const current = memoryStore.get(key);

  if (!current || current.resetAt <= now) {
    memoryStore.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: Math.ceil(windowMs / 1000) };
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  return {
    allowed: true,
    retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
  };
}

