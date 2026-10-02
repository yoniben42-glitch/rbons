import { createFileRoute } from "@tanstack/react-router";
import { getBookingById } from "@/server/data/bookings";
import { bookingIcs } from "@/server/data/calendar";
import { checkRateLimit, getClientIp } from "@/server/security/rate-limit";
import { bookingIdFromPortalSession } from "@/server/security/portal-session";

export const Route = createFileRoute("/api/calendar/$id")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const limit = await checkRateLimit(`calendar:${getClientIp(request)}`, 30, 10 * 60 * 1000);
        if (!limit.allowed) return new Response("Too many requests", { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds), "Cache-Control": "no-store" } });
        const bookingId = await bookingIdFromPortalSession(request);
        if (!bookingId || bookingId !== params.id) return new Response("Unauthorized", { status: 401, headers: { "Cache-Control": "no-store" } });
        const booking = await getBookingById(bookingId);
        if (!booking || booking.status === "cancelled") return new Response("Not found", { status: 404, headers: { "Cache-Control": "no-store" } });
        return new Response(bookingIcs({ id: booking.id, name: booking.name, service: booking.service, date: booking.bookingDate, time: booking.bookingTime, location: booking.location }), { status: 200, headers: { "Content-Type": "text/calendar; charset=utf-8", "Content-Disposition": `attachment; filename="rbonsu-${booking.id}.ics"`, "Cache-Control": "no-store" } });
      },
    },
  },
});
