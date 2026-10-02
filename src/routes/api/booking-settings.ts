import { createFileRoute } from "@tanstack/react-router";
import { getBookingSettings, sanitizeWeeklyHours, updateBookingSettings } from "@/server/data/booking-settings";
import { isAdmin, originMatchesAdminRequest } from "@/server/security/admin";

export const Route = createFileRoute("/api/booking-settings")({
  server: {
    handlers: {
      GET: async () => Response.json({ success: true, settings: await getBookingSettings() }, { headers: { "Cache-Control": "no-store" } }),
      PATCH: async ({ request }) => {
        if (!(await isAdmin(request))) return Response.json({ success: false, error: "Unauthorized." }, { status: 401 });
        if (!originMatchesAdminRequest(request)) return Response.json({ success: false, error: "Request origin could not be verified." }, { status: 403 });
        const body = await request.json() as Record<string, unknown>;
        const current = await getBookingSettings();
        const next = {
          ...current,
          timezone: typeof body.timezone === "string" ? body.timezone.slice(0, 64) : current.timezone,
          slotMinutes: Number.isInteger(body.slotMinutes) ? Math.min(240, Math.max(15, Number(body.slotMinutes))) : current.slotMinutes,
          slotTimes: Array.isArray(body.slotTimes) ? body.slotTimes.map(String).filter((x) => /^\d{2}:\d{2}$/.test(x)).slice(0, 24) : current.slotTimes,
          minAdvanceHours: Number.isInteger(body.minAdvanceHours) ? Math.min(168, Math.max(0, Number(body.minAdvanceHours))) : current.minAdvanceHours,
          cancellationHours: Number.isInteger(body.cancellationHours) ? Math.min(168, Math.max(0, Number(body.cancellationHours))) : current.cancellationHours,
          maxDaysAhead: Number.isInteger(body.maxDaysAhead) ? Math.min(730, Math.max(1, Number(body.maxDaysAhead))) : current.maxDaysAhead,
          weeklyHours: sanitizeWeeklyHours(body.weeklyHours, current.weeklyHours),
        };
        await updateBookingSettings(next);
        return Response.json({ success: true, settings: next }, { headers: { "Cache-Control": "no-store" } });
      },
    },
  },
});
