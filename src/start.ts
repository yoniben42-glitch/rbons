import { createCsrfMiddleware, createMiddleware, createStart } from "@tanstack/react-start";

const securityMiddleware = createMiddleware().server(async ({ request, next }) => {
  const result = await next();
  const headers = result.response.headers;

  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "DENY");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
  headers.set("Cross-Origin-Opener-Policy", "same-origin");
  headers.set("Cross-Origin-Resource-Policy", "same-origin");
  headers.set("X-Permitted-Cross-Domain-Policies", "none");
  headers.set("X-DNS-Prefetch-Control", "off");
  headers.set("Cache-Control", request.method === "GET" ? "no-cache" : "no-store");

  if (new URL(request.url).protocol === "https:") {
    headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  }

  // Resolved from the configured Supabase project rather than hardcoded, so
  // img-src/connect-src stay a real allow-list (gallery images and API
  // reads/writes) instead of the blanket `https:` this replaces, without
  // hardcoding a specific Supabase hosting domain.
  let supabaseOrigin = "";
  try {
    if (process.env.SUPABASE_URL) supabaseOrigin = new URL(process.env.SUPABASE_URL).origin;
  } catch {
    // Falls through to a same-origin-only policy if misconfigured.
  }

  headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      `img-src 'self' data: blob:${supabaseOrigin ? ` ${supabaseOrigin}` : ""}`,
      `connect-src 'self'${supabaseOrigin ? ` ${supabaseOrigin}` : ""}`,
      "media-src 'self'",
      "worker-src 'self' blob:",
      "manifest-src 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  );

  return result;
});

const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
});

export const startInstance = createStart(() => ({
  requestMiddleware: [csrfMiddleware, securityMiddleware],
}));
