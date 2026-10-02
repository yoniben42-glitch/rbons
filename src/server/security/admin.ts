import { constantTimeEqual, randomToken, sha256 } from "./tokens";
import { supabaseRest } from "../data/supabase";

const COOKIE = "rbonsu_admin";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours, matching the previous cookie lifetime.

export function adminConfigured() {
  const token = process.env.ADMIN_DASHBOARD_TOKEN ?? "";
  return token.length >= 32;
}

function sessionTokenFromCookie(request: Request): string {
  const cookie = request.headers.get("cookie") ?? "";
  const match = cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE}=([^;]+)`));
  return match?.[1] ? decodeURIComponent(match[1]) : "";
}

export function originMatchesAdminRequest(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try { return origin === new URL(request.url).origin; } catch { return false; }
}

/** Verifies a candidate value against the configured master admin credential. Login-time only. */
export function verifyMasterCredential(candidate: string): boolean {
  const configured = process.env.ADMIN_DASHBOARD_TOKEN ?? "";
  return configured.length >= 32 && candidate.length >= 32 && constantTimeEqual(configured, candidate);
}

/**
 * Creates an independent, revocable admin session and returns the bearer
 * value to store in the browser cookie. This value is never the master
 * credential itself — only its SHA-256 hash is persisted, alongside a hash
 * of the master token *at creation time*. Rotating ADMIN_DASHBOARD_TOKEN
 * therefore invalidates every existing session automatically, without a
 * separate revocation sweep.
 */
export async function createAdminSession(): Promise<string> {
  const masterToken = process.env.ADMIN_DASHBOARD_TOKEN ?? "";
  const sessionToken = randomToken("asess");
  const [sessionTokenHash, tokenVersionHash] = await Promise.all([sha256(sessionToken), sha256(masterToken)]);
  await supabaseRest("admin_sessions", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({
      id: crypto.randomUUID(),
      session_token_hash: sessionTokenHash,
      admin_token_version_hash: tokenVersionHash,
      expires_at: new Date(Date.now() + SESSION_TTL_MS).toISOString(),
    }),
  });
  return sessionToken;
}

/**
 * Validates the session cookie against the persistent session store: it
 * must exist, be unexpired, unrevoked, and bound to the currently configured
 * master token. A store outage fails closed (returns false) rather than
 * granting access.
 */
export async function isAdmin(request: Request): Promise<boolean> {
  const sessionToken = sessionTokenFromCookie(request);
  if (!sessionToken || sessionToken.length < 20) return false;
  const masterToken = process.env.ADMIN_DASHBOARD_TOKEN ?? "";
  if (masterToken.length < 32) return false;

  try {
    const [sessionTokenHash, tokenVersionHash] = await Promise.all([sha256(sessionToken), sha256(masterToken)]);
    const response = await supabaseRest(
      `admin_sessions?select=id&session_token_hash=eq.${encodeURIComponent(sessionTokenHash)}` +
        `&admin_token_version_hash=eq.${encodeURIComponent(tokenVersionHash)}` +
        `&revoked_at=is.null&expires_at=gt.${encodeURIComponent(new Date().toISOString())}&limit=1`,
      { method: "GET" },
    );
    const rows = (await response.json()) as Array<{ id: string }>;
    if (rows.length === 0) return false;

    // Best-effort activity touch; never block or fail the request on it.
    void supabaseRest(`admin_sessions?id=eq.${encodeURIComponent(rows[0].id)}`, {
      method: "PATCH",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({ last_seen_at: new Date().toISOString() }),
    }).catch(() => {});

    return true;
  } catch {
    return false;
  }
}

/** Revokes the session presented in the request cookie (used by admin-logout). */
export async function revokeAdminSession(request: Request): Promise<void> {
  const sessionToken = sessionTokenFromCookie(request);
  if (!sessionToken) return;
  try {
    const sessionTokenHash = await sha256(sessionToken);
    await supabaseRest(`admin_sessions?session_token_hash=eq.${encodeURIComponent(sessionTokenHash)}`, {
      method: "PATCH",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({ revoked_at: new Date().toISOString() }),
    });
  } catch {
    // The cookie is cleared by the caller regardless; a store outage should
    // not prevent the browser session from ending.
  }
}

export function adminCookie(sessionToken: string, request?: Request) {
  const secure = request && new URL(request.url).protocol === "https:" ? "; Secure" : "";
  return `${COOKIE}=${encodeURIComponent(sessionToken)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=28800${secure}`;
}

export function clearAdminCookie(request?: Request) {
  const secure = request && new URL(request.url).protocol === "https:" ? "; Secure" : "";
  return `${COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secure}`;
}
