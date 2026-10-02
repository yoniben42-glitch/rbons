import { createFileRoute } from "@tanstack/react-router";
import { isAdmin, originMatchesAdminRequest } from "@/server/security/admin";
import { addAvailabilityBlock, deleteAvailabilityBlock, listAvailabilityBlocks } from "@/server/data/availability";

export const Route = createFileRoute("/api/admin-availability")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!(await isAdmin(request))) return Response.json({ success: false, error: "Unauthorized." }, { status: 401 });
        return Response.json({ success: true, blocks: await listAvailabilityBlocks() }, { headers: { "Cache-Control": "no-store" } });
      },
      POST: async ({ request }) => {
        if (!(await isAdmin(request))) return Response.json({ success: false, error: "Unauthorized." }, { status: 401 });
        if (!originMatchesAdminRequest(request)) return Response.json({ success: false, error: "Request origin could not be verified." }, { status: 403 });
        const body = await request.json() as { startsAt?: string; endsAt?: string; reason?: string };
        if (!body.startsAt || !body.endsAt || Number.isNaN(Date.parse(body.startsAt)) || Number.isNaN(Date.parse(body.endsAt)) || Date.parse(body.endsAt) <= Date.parse(body.startsAt)) {
          return Response.json({ success: false, error: "Provide valid start and end dates." }, { status: 400 });
        }
        await addAvailabilityBlock({ startsAt: body.startsAt, endsAt: body.endsAt, reason: String(body.reason ?? "").slice(0, 500) });
        return Response.json({ success: true }, { status: 201 });
      },
      DELETE: async ({ request }) => {
        if (!(await isAdmin(request))) return Response.json({ success: false, error: "Unauthorized." }, { status: 401 });
        if (!originMatchesAdminRequest(request)) return Response.json({ success: false, error: "Request origin could not be verified." }, { status: 403 });
        const id = Number(new URL(request.url).searchParams.get("id"));
        if (!Number.isInteger(id)) return Response.json({ success: false, error: "Block id required." }, { status: 400 });
        await deleteAvailabilityBlock(id);
        return Response.json({ success: true });
      },
    },
  },
});
