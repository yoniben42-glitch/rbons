import { createFileRoute } from "@tanstack/react-router";
import { isAdmin, originMatchesAdminRequest } from "@/server/security/admin";
import { auditLog } from "@/server/security/logging";
import { internalErrorDetail } from "@/server/security/errors";
import { bookingSlotTaken, getBookingById, listBookings, updateBooking } from "@/server/data/bookings";
import { getBookingSettings } from "@/server/data/booking-settings";
import { availabilityBlockContains } from "@/server/data/availability";
import { isValidBookingDate, isValidSlot } from "@/server/security/booking";
import { updatePaymentTransaction, listPaymentTransactions, getPendingPaymentTransactionByBookingId } from "@/server/data/payment-transactions";

export const Route = createFileRoute("/api/admin-bookings")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!(await isAdmin(request))) return Response.json({ success: false, error: "Unauthorized." }, { status: 401 });
        try {
          return Response.json({ success: true, bookings: await listBookings(), paymentTransactions: await listPaymentTransactions(300) }, { headers: { "Cache-Control": "no-store" } });
        } catch (error) {
          auditLog("admin.bookings.list_failed", { detail: internalErrorDetail(error) });
          return Response.json({ success: false, error: "Bookings are temporarily unavailable." }, { status: 503, headers: { "Cache-Control": "no-store" } });
        }
      },
      PATCH: async ({ request }) => {
        if (!(await isAdmin(request))) return Response.json({ success: false, error: "Unauthorized." }, { status: 401 });
        if (!originMatchesAdminRequest(request)) return Response.json({ success: false, error: "Request origin could not be verified." }, { status: 403 });
        const body = await request.json() as {
          id?: string;
          status?: string;
          paymentStatus?: string;
          bookingDate?: string;
          bookingTime?: string;
          totalCents?: number;
          depositCents?: number;
          balanceCents?: number;
          paymentReference?: string;
        };
        if (!body.id) return Response.json({ success: false, error: "Booking id required." }, { status: 400 });
        try {
        const existing = await getBookingById(body.id);
        if (!existing) return Response.json({ success: false, error: "Booking not found." }, { status: 404 });

        const patch: Record<string, unknown> = {};
        if (body.status && ["pending_payment", "pending", "confirmed", "cancelled", "expired"].includes(body.status)) patch.status = body.status;
        if (body.bookingDate || body.bookingTime) {
          if (!body.bookingDate || !body.bookingTime) return Response.json({ success: false, error: "Both date and time are required." }, { status: 400 });
          const settings = await getBookingSettings();
          if (!isValidBookingDate(body.bookingDate, settings) || !isValidSlot(body.bookingTime, settings, body.bookingDate)) return Response.json({ success: false, error: "That date/time is not bookable." }, { status: 400 });
          if (await availabilityBlockContains(body.bookingDate, body.bookingTime, settings.timezone, settings.slotMinutes) || await bookingSlotTaken(body.bookingDate, body.bookingTime, body.id)) return Response.json({ success: false, error: "That slot is unavailable." }, { status: 409 });
          patch.booking_date = body.bookingDate;
          patch.booking_time = body.bookingTime;
        }

        const nextTotal = Number.isInteger(body.totalCents) && Number(body.totalCents) >= 0 ? Number(body.totalCents) : existing.totalCents;
        const nextDeposit = Number.isInteger(body.depositCents) && Number(body.depositCents) >= 0 ? Number(body.depositCents) : existing.depositCents;
        if (body.totalCents !== undefined || body.depositCents !== undefined || body.balanceCents !== undefined) {
          patch.total_cents = nextTotal;
          patch.deposit_cents = Math.min(nextDeposit, nextTotal);
          const explicitBalance = Number.isInteger(body.balanceCents) && Number(body.balanceCents) >= 0 ? Number(body.balanceCents) : null;
          patch.balance_cents = explicitBalance === null ? Math.max(0, nextTotal - nextDeposit) : Math.min(explicitBalance, nextTotal);
        }
        if (body.paymentStatus && ["unpaid", "paid", "partially_paid", "refunded"].includes(body.paymentStatus)) {
          patch.payment_status = body.paymentStatus;
          if (body.paymentStatus === "paid") {
            patch.status = "confirmed";
            patch.balance_cents = 0;
          }
        }

        if (!Object.keys(patch).length) return Response.json({ success: false, error: "No valid changes." }, { status: 400 });
        await updateBooking(body.id, patch);
        if (body.paymentStatus === "paid") {
          // A manual payment confirmation is intentionally recorded without storing sensitive payment data.
          await updateBooking(body.id, { payment_expires_at: null });
          const pending = await getPendingPaymentTransactionByBookingId(body.id);
          if (pending) await updatePaymentTransaction(pending.id, { status: "paid", providerRef: body.paymentReference?.trim().slice(0, 160) || "manual-confirmation" }).catch(() => undefined);
        }
        return Response.json({ success: true });
        } catch (error) {
          auditLog("admin.bookings.update_failed", { detail: internalErrorDetail(error) });
          return Response.json({ success: false, error: "Could not update the booking right now." }, { status: 503, headers: { "Cache-Control": "no-store" } });
        }
      },
    },
  },
});
