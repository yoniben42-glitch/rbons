import { createFileRoute } from "@tanstack/react-router";
import { isAdmin } from "@/server/security/admin";
import { listInquiries } from "@/server/data/inquiries";

export const Route = createFileRoute("/api/admin-inquiries")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!(await isAdmin(request))) return Response.json({ success: false, error: "Unauthorized." }, { status: 401 });
        return Response.json({ success: true, inquiries: await listInquiries() }, { headers: { "Cache-Control": "no-store" } });
      },
    },
  },
});
