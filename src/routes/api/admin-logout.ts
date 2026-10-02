import { createFileRoute } from "@tanstack/react-router";
import { clearAdminCookie, originMatchesAdminRequest, revokeAdminSession } from "@/server/security/admin";
export const Route = createFileRoute("/api/admin-logout")({ server: { handlers: { POST: async ({ request }) => {
      if (!originMatchesAdminRequest(request)) return Response.json({ success: false, error: "Request origin could not be verified." }, { status: 403 });
      await revokeAdminSession(request);
      return new Response(null, { status: 204, headers: { "Set-Cookie": clearAdminCookie(request) } });
    } } } });
