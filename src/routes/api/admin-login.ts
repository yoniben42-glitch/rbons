import { createFileRoute } from "@tanstack/react-router";
import { adminCookie, adminConfigured, createAdminSession, verifyMasterCredential } from "@/server/security/admin";
import { checkRateLimit, getClientIp } from "@/server/security/rate-limit";
import { adminMfaConfigured, verifyTotp } from "@/server/security/totp";

export const Route = createFileRoute("/api/admin-login")({ server: { handlers: {
  POST: async ({ request }) => {
    // Origin first: a cross-origin caller learns nothing about whether admin
    // access is configured on this deployment.
    const origin = request.headers.get("origin");
    if (!origin || origin !== new URL(request.url).origin) return Response.json({ success: false, error: "Origin rejected." }, { status: 403 });
    const limit = await checkRateLimit(`admin-login:${getClientIp(request)}`, 8, 15 * 60 * 1000);
    if (!limit.allowed) return Response.json({ success: false, error: "Too many sign-in attempts. Please try again later." }, { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } });
    if (!adminConfigured()) return Response.json({ success: false, error: "Admin access is not configured." }, { status: 503 });
    const body = await request.json() as { token?: string; mfaCode?: string };
    if (!body.token || !verifyMasterCredential(body.token)) return Response.json({ success: false, error: "Invalid admin credential." }, { status: 401 });

    if (adminMfaConfigured()) {
      if (!body.mfaCode || !(await verifyTotp(body.mfaCode))) {
        return Response.json({ success: false, error: "Enter the current 6-digit authentication code.", mfaRequired: true }, { status: 401 });
      }
    }

    const sessionToken = await createAdminSession();
    return Response.json({ success: true }, { headers: { "Set-Cookie": adminCookie(sessionToken, request), "Cache-Control": "no-store" } });
  },
}}});
