import { createFileRoute } from "@tanstack/react-router";
import { getBookingById, getBookingByToken, bookingSlotTaken, updateBooking } from "@/server/data/bookings";
import { getBookingSettings } from "@/server/data/booking-settings";
import { listEnabledPaymentMethods, publicPaymentMethod } from "@/server/data/payment-methods";
import { checkRateLimit, getClientIp } from "@/server/security/rate-limit";
import { isValidBookingDate, isValidSlot, isWithinClientChangeWindow, isWithinAdvanceWindow } from "@/server/security/booking";
import { availabilityBlockContains } from "@/server/data/availability";
import { bookingIdFromPortalSession, createPortalSession, portalCookie } from "@/server/security/portal-session";

export const Route = createFileRoute("/api/booking-portal")({
  server: {
    handlers: {
      // GET serves two purposes:
      //  - `?token=...` present: a one-time exchange of the emailed bearer
      //    token for a short-lived, HttpOnly-cookie-bound portal session.
      //    The client immediately strips the token from the visible URL.
      //  - no token: reload using the existing portal session cookie (e.g.
      //    after a page refresh, once the token is no longer in the URL).
      GET: async ({ request }) => {
        const limit = await checkRateLimit(`portal-read:${getClientIp(request)}`, 40, 10 * 60 * 1000);
        if (!limit.allowed) return Response.json({ success: false, error: "Too many requests." }, { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } });

        const token = new URL(request.url).searchParams.get("token") ?? "";
        let booking: Awaited<ReturnType<typeof getBookingById>> = null;
        let setCookie: string | null = null;

        if (token) {
          if (token.length < 20) return Response.json({ success: false, error: "Invalid portal token." }, { status: 401 });
          booking = await getBookingByToken(token);
          if (!booking) return Response.json({ success: false, error: "Booking not found." }, { status: 404 });
          setCookie = portalCookie(await createPortalSession(booking.id), request);
        } else {
          const bookingId = await bookingIdFromPortalSession(request);
          if (!bookingId) return Response.json({ success: false, error: "Your session has expired. Please use the link from your confirmation email again." }, { status: 401 });
          booking = await getBookingById(bookingId);
          if (!booking) return Response.json({ success: false, error: "Booking not found." }, { status: 404 });
        }

        const methods = await listEnabledPaymentMethods();
        const headers: Record<string, string> = { "Cache-Control": "no-store" };
        if (setCookie) headers["Set-Cookie"] = setCookie;
        return Response.json({ success: true, booking: publicBooking(booking), paymentMethods: methods.map(publicPaymentMethod) }, { headers });
      },
      // All state-changing actions are gated on the short-lived portal
      // session cookie established by GET above — never on a token resent
      // in the request body.
      POST: async ({ request }) => {
        const limit = await checkRateLimit(`portal:${getClientIp(request)}`, 20, 10 * 60 * 1000);
        if (!limit.allowed) return Response.json({ success: false, error: "Too many requests." }, { status: 429 });
        const origin = request.headers.get("origin");
        if (!origin || origin !== new URL(request.url).origin) return Response.json({ success: false, error: "Request origin could not be verified." }, { status: 403 });
        const bookingId = await bookingIdFromPortalSession(request);
        if (!bookingId) return Response.json({ success: false, error: "Your session has expired. Please use the link from your confirmation email again." }, { status: 401 });
        const booking = await getBookingById(bookingId);
        if (!booking) return Response.json({ success: false, error: "Booking not found." }, { status: 404 });
        if (booking.status === "cancelled") return Response.json({ success: false, error: "This booking is already cancelled." }, { status: 409 });
        const body = await request.json() as { action?: "cancel" | "reschedule"; date?: string; time?: string };
        const settings = await getBookingSettings();
        if (body.action === "cancel") {
          if (!isWithinClientChangeWindow(booking.bookingDate, booking.bookingTime, settings)) return Response.json({ success: false, error: "Cancellation is no longer available this close to the appointment. Please contact the studio." }, { status: 409 });
          await updateBooking(booking.id, { status: "cancelled" });
          return Response.json({ success: true, booking: { ...publicBooking(booking), status: "cancelled" } });
        }
        if (body.action === "reschedule") {
          if (!body.date || !body.time || !isValidBookingDate(body.date, settings) || !isValidSlot(body.time, settings, body.date) || !isWithinAdvanceWindow(body.date, body.time, settings)) return Response.json({ success: false, error: "Choose a valid available date and time." }, { status: 400 });
          if (!isWithinClientChangeWindow(booking.bookingDate, booking.bookingTime, settings)) return Response.json({ success: false, error: "Rescheduling is no longer available this close to the appointment. Please contact the studio." }, { status: 409 });
          if (await availabilityBlockContains(body.date, body.time, settings.timezone, settings.slotMinutes) || await bookingSlotTaken(body.date, body.time, booking.id)) return Response.json({ success: false, error: "That slot is unavailable." }, { status: 409 });
          await updateBooking(booking.id, { booking_date: body.date, booking_time: body.time });
          return Response.json({ success: true, booking: { ...publicBooking(booking), bookingDate: body.date, bookingTime: body.time } });
        }
        return Response.json({ success: false, error: "Unsupported action." }, { status: 400 });
      },
    },
  },
});

function publicBooking(booking: Awaited<ReturnType<typeof getBookingById>>) {
  if (!booking) return null;
  return {
    id: booking.id,
    name: booking.name,
    email: booking.email,
    phone: booking.phone,
    service: booking.service,
    packageId: booking.packageId,
    bookingDate: booking.bookingDate,
    bookingTime: booking.bookingTime,
    timezone: booking.timezone,
    location: booking.location,
    guestCount: booking.guestCount,
    notes: booking.notes,
    status: booking.status,
    paymentStatus: booking.paymentStatus,
    paymentMethodId: booking.paymentMethodId,
    paymentProvider: booking.paymentProvider,
    currency: booking.currency,
    depositCents: booking.depositCents,
    totalCents: booking.totalCents,
    balanceCents: booking.balanceCents,
    paymentExpiresAt: booking.paymentExpiresAt,
    createdAt: booking.createdAt,
  };
}
