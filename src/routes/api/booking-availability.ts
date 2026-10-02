import { createFileRoute } from "@tanstack/react-router";
import { getBookingSettings } from "@/server/data/booking-settings";
import { listAvailabilityBlocksForDay, slotOverlapsBlocks } from "@/server/data/availability";
import { bookedSlotTimesForDate, expireStalePendingBookings } from "@/server/data/bookings";
import { isValidBookingDate, isTimeWithinHours, isWithinAdvanceWindow } from "@/server/security/booking";
import { weekdayForLocalDate, localDateTimeToUtc } from "@/server/security/timezone";
import { checkRateLimit, getClientIp } from "@/server/security/rate-limit";
import { auditLog } from "@/server/security/logging";
import { internalErrorDetail } from "@/server/security/errors";

export const Route = createFileRoute("/api/booking-availability")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const limit = await checkRateLimit(`booking-availability:${getClientIp(request)}`, 60, 10 * 60 * 1000);
        if (!limit.allowed) {
          return Response.json(
            { success: false, error: "Too many requests." },
            { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds), "Cache-Control": "no-store" } },
          );
        }
        try {
          const settings = await getBookingSettings();
          const date = new URL(request.url).searchParams.get("date") ?? "";
          if (!isValidBookingDate(date, settings)) return Response.json({ success: false, error: "Invalid or unavailable date." }, { status: 400 });
          const day = weekdayForLocalDate(date, settings.timezone);
          const hours = day === null ? null : settings.weeklyHours[String(day)] ?? null;
          if (!hours) return Response.json({ success: true, date, timezone: settings.timezone, slots: [] });

          await expireStalePendingBookings();

          // Fetch all potentially-relevant availability blocks and all booked
          // slot times for this date up front (two queries total for the whole
          // date), instead of two queries per candidate slot (previously up to
          // ~2x the slot count per request).
          const [blocks, bookedTimes] = await Promise.all([
            listAvailabilityBlocksForDay(date, settings.timezone),
            bookedSlotTimesForDate(date),
          ]);

          const withinWeeklyHours = (time: string) => settings.slotTimes.includes(time) && isTimeWithinHours(time, hours, settings.slotMinutes);
          const slots = settings.slotTimes.map((time) => {
            const withinHours = withinWeeklyHours(time);
            const advanceOk = withinHours && isWithinAdvanceWindow(date, time, settings);
            if (!advanceOk) return { time, available: false };
            const blocked = slotOverlapsBlocks(date, time, settings.timezone, settings.slotMinutes, blocks, localDateTimeToUtc);
            const taken = bookedTimes.has(time);
            return { time, available: !blocked && !taken };
          });
          return Response.json({ success: true, date, timezone: settings.timezone, slots }, { headers: { "Cache-Control": "no-store" } });
        } catch (error) {
          auditLog("booking.availability_failed", { detail: internalErrorDetail(error) });
          return Response.json({ success: false, error: "Availability is temporarily unavailable. Please try again shortly." }, { status: 503, headers: { "Cache-Control": "no-store" } });
        }
      },
    },
  },
});
