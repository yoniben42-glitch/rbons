import { randomToken, sha256 } from "./tokens";
import { supabaseRest } from "../data/supabase";

const COOKIE = "rbonsu_portal";
const SESSION_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours: long enough for one visit, short enough to limit exposure.

/**
 * The emailed booking-portal link still carries a long-lived bearer token in
 * its URL (?token=...) — that part is unavoidable for a one-click link sent
 * by email. What changes is what that token is allowed to do directly: it
 * can only be *exchanged*, once per page load, for a short-lived,
 * HttpOnly-cookie-bound session (see booking-portal.ts GET). All PII reads
 * and all state-changing actions (cancel, reschedule, pay balance) are then
 * gated on that session, never on the token itself, and the client strips
 * the token from the visible URL immediately after exchange.
 */

function sessionTokenFromCookie(request: Request): string {
  const cookie = request.headers.get("cookie") ?? "";
  const match = cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE}=([^;]+)`));
  return match?.[1] ? decodeURIComponent(match[1]) : "";
}

export async function createPortalSession(bookingId: string): Promise<string> {
  const sessionToken = randomToken("psess");
  const sessionTokenHash = await sha256(sessionToken);
  await supabaseRest("booking_portal_sessions", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({
      id: crypto.randomUUID(),
      booking_id: bookingId,
      session_token_hash: sessionTokenHash,
      expires_at: new Date(Date.now() + SESSION_TTL_MS).toISOString(),
    }),
  });
  return sessionToken;
}

/** Returns the booking id bound to this request's portal session cookie, or null. */
export async function bookingIdFromPortalSession(request: Request): Promise<string | null> {
  const sessionToken = sessionTokenFromCookie(request);
  if (!sessionToken || sessionToken.length < 20) return null;
  try {
    const sessionTokenHash = await sha256(sessionToken);
    const response = await supabaseRest(
      `booking_portal_sessions?select=booking_id&session_token_hash=eq.${encodeURIComponent(sessionTokenHash)}` +
        `&revoked_at=is.null&expires_at=gt.${encodeURIComponent(new Date().toISOString())}&limit=1`,
      { method: "GET" },
    );
    const rows = (await response.json()) as Array<{ booking_id: string }>;
    return rows[0]?.booking_id ?? null;
  } catch {
    return null;
  }
}

export async function revokePortalSession(request: Request): Promise<void> {
  const sessionToken = sessionTokenFromCookie(request);
  if (!sessionToken) return;
  try {
    const sessionTokenHash = await sha256(sessionToken);
    await supabaseRest(`booking_portal_sessions?session_token_hash=eq.${encodeURIComponent(sessionTokenHash)}`, {
      method: "PATCH",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({ revoked_at: new Date().toISOString() }),
    });
  } catch {
    // best-effort only
  }
}

export function portalCookie(sessionToken: string, request?: Request) {
  const secure = request && new URL(request.url).protocol === "https:" ? "; Secure" : "";
  return `${COOKIE}=${encodeURIComponent(sessionToken)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${Math.floor(SESSION_TTL_MS / 1000)}${secure}`;
}

export function clearPortalCookie(request?: Request) {
  const secure = request && new URL(request.url).protocol === "https:" ? "; Secure" : "";
  return `${COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secure}`;
}
