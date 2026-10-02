import { createFileRoute } from "@tanstack/react-router";
import { verifyStripeSignature } from "@/server/payments/stripe";
import { getBookingById, updateBooking } from "@/server/data/bookings";
import { recordBookingEvent } from "@/server/data/booking-events";
import { getPaymentTransaction, updatePaymentTransaction } from "@/server/data/payment-transactions";
import { sendEmail, sendStudioEmail } from "@/server/data/email";
import { bookingIcs, base64 } from "@/server/data/calendar";
import { escapeHtml } from "@/server/security/html";
import { formatMoney } from "@/lib/money";
import { auditLog } from "@/server/security/logging";
import { internalErrorDetail } from "@/server/security/errors";

export const Route = createFileRoute("/api/stripe-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const payload = await request.text();
        const signature = request.headers.get("stripe-signature") ?? "";
        if (!process.env.STRIPE_WEBHOOK_SECRET) {
          auditLog("stripe.webhook_unconfigured", {});
          return new Response("Webhook not configured", { status: 503 });
        }
        let verified = false;
        try {
          verified = await verifyStripeSignature(payload, signature);
        } catch (error) {
          auditLog("stripe.webhook_verify_failed", { detail: internalErrorDetail(error) });
          return new Response("Invalid signature", { status: 400 });
        }
        if (!verified) return new Response("Invalid signature", { status: 400 });
        try {
        let event: { id: string; type: string; data: { object: Record<string, any> } };
        try {
          event = JSON.parse(payload);
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }
        const object = event.data.object;
        const bookingId = String(object.metadata?.booking_id ?? object.client_reference_id ?? "");
        const transactionId = String(object.metadata?.payment_transaction_id ?? "");
        if (!bookingId) return new Response("ok");
        const booking = await getBookingById(bookingId);
        if (!booking) return new Response("Booking not found", { status: 404 });
        try { await recordBookingEvent(bookingId, event.type, event.id, { payment_kind: object.metadata?.payment_kind ?? null, transaction_id: transactionId || null }); } catch {
          // Event logging should not block a valid Stripe event from being applied.
        }
        if (event.type === "checkout.session.async_payment_failed") {
          if (transactionId) {
            await updatePaymentTransaction(transactionId, { status: "failed", providerRef: String(object.id) }).catch(() => undefined);
          }
          return new Response("ok");
        }

        if (event.type === "checkout.session.expired") {
          if (transactionId) await updatePaymentTransaction(transactionId, { status: "expired", providerRef: String(object.id) }).catch(() => undefined);
          if (booking.status === "pending_payment" && booking.paymentExpiresAt) {
            await updateBooking(bookingId, { status: "expired", payment_expires_at: null });
          }
          return new Response("ok");
        }

        const isSuccessfulCheckout = (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") && (object.payment_status === "paid" || event.type === "checkout.session.async_payment_succeeded");
        if (isSuccessfulCheckout) {
          const kind = object.metadata?.payment_kind === "balance" ? "balance" : "deposit";
          if (transactionId) {
            const existingTransaction = await getPaymentTransaction(transactionId).catch(() => null);
            if (existingTransaction?.status === "paid") return new Response("ok");
            await updatePaymentTransaction(transactionId, { status: "paid", providerRef: String(object.id) }).catch(() => undefined);
          }
          if (kind === "deposit") {
            const remaining = Math.max(0, booking.totalCents - booking.depositCents);
            await updateBooking(bookingId, {
              status: "confirmed",
              payment_status: remaining > 0 ? "partially_paid" : "paid",
              balance_cents: remaining,
              stripe_deposit_session_id: String(object.id),
              stripe_payment_intent_id: String(object.payment_intent ?? ""),
              payment_expires_at: null,
            });
            const ics = bookingIcs({ id: booking.id, name: booking.name, service: booking.service, date: booking.bookingDate, time: booking.bookingTime, location: booking.location });
            const paid = formatMoney(booking.depositCents, booking.currency);
            await sendEmail({
              to: booking.email,
              subject: "RBONSU Photography — Booking confirmed",
              attachments: [{ filename: "rbonsu-booking.ics", content: base64(ics) }],
              html: `<p>Your booking is confirmed.</p><p><strong>${escapeHtml(booking.service)}</strong><br>${escapeHtml(booking.bookingDate)} at ${escapeHtml(booking.bookingTime)} ${escapeHtml(booking.timezone)}</p><p>Your ${escapeHtml(paid)} deposit has been received.</p>`,
              text: `Your RBONSU Photography booking is confirmed: ${booking.service}, ${booking.bookingDate} at ${booking.bookingTime} ${booking.timezone}. Your ${paid} deposit has been received.`,
            }).catch(() => undefined);
            await sendStudioEmail({ subject: `Payment received — ${booking.name}`, html: `<p>Deposit paid for ${escapeHtml(booking.name)}.</p><p>${escapeHtml(booking.service)} · ${escapeHtml(booking.bookingDate)} · ${escapeHtml(booking.bookingTime)} ${escapeHtml(booking.timezone)}</p>`, text: `Deposit paid for ${booking.name}: ${booking.service} ${booking.bookingDate} ${booking.bookingTime} ${booking.timezone}.` }).catch(() => undefined);
          } else {
            await updateBooking(bookingId, { status: "confirmed", payment_status: "paid", balance_cents: 0, stripe_balance_session_id: String(object.id), stripe_payment_intent_id: String(object.payment_intent ?? "") });
            await sendEmail({ to: booking.email, subject: "RBONSU Photography — Balance paid", html: `<p>Your remaining balance has been received. Thank you.</p>`, text: "Your RBONSU Photography remaining balance has been received." }).catch(() => undefined);
          }
        }
        return new Response("ok");
        } catch (error) {
          // 5xx tells Stripe to retry; the handler is idempotent on replay.
          auditLog("stripe.webhook_failed", { detail: internalErrorDetail(error) });
          return new Response("Webhook processing failed", { status: 503 });
        }
      },
    },
  },
});


