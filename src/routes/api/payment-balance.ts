import { createFileRoute } from "@tanstack/react-router";
import { getBookingById, updateBooking } from "@/server/data/bookings";
import { getPaymentMethod, methodIsUsable } from "@/server/data/payment-methods";
import { insertPaymentTransaction } from "@/server/data/payment-transactions";
import { createCheckoutSession } from "@/server/payments/stripe";
import { checkRateLimit, getClientIp } from "@/server/security/rate-limit";
import { auditLog } from "@/server/security/logging";
import { internalErrorDetail, publicErrorMessage, publicErrorStatus } from "@/server/security/errors";
import { bookingIdFromPortalSession } from "@/server/security/portal-session";

export const Route = createFileRoute("/api/payment-balance")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const origin = request.headers.get("origin");
        if (!origin || origin !== new URL(request.url).origin) return Response.json({ success: false, error: "Request origin could not be verified." }, { status: 403 });
        const limit = await checkRateLimit(`balance:${getClientIp(request)}`, 10, 10 * 60 * 1000);
        if (!limit.allowed) return Response.json({ success: false, error: "Too many requests." }, { status: 429 });
        try {
          // Authenticated by the portal session cookie established via
          // GET /api/booking-portal, never by a token resent in the body.
          const bookingId = await bookingIdFromPortalSession(request);
          if (!bookingId) return Response.json({ success: false, error: "Your session has expired. Please use the link from your confirmation email again." }, { status: 401 });
          const booking = await getBookingById(bookingId);
          if (!booking) return Response.json({ success: false, error: "Booking not found." }, { status: 404 });
          if (booking.status === "cancelled" || booking.status === "expired") return Response.json({ success: false, error: "This booking cannot accept payment." }, { status: 409 });
          if (booking.balanceCents <= 0) return Response.json({ success: false, error: "There is no balance due." }, { status: 400 });
          const body = await request.json() as { paymentMethodId?: string };
          const methodId = body.paymentMethodId || booking.paymentMethodId || "pm_stripe";
          const method = await getPaymentMethod(methodId);
          if (!method || !methodIsUsable(method)) return Response.json({ success: false, error: "That payment method is unavailable." }, { status: 400 });
          const transactionId = `ptx_${crypto.randomUUID()}`;
          if (method.provider === "payment_link") {
            await insertPaymentTransaction({ id: transactionId, bookingId: booking.id, paymentMethodId: method.id, provider: method.provider, kind: "balance", amountCents: booking.balanceCents, currency: booking.currency, status: "pending", providerRef: null, checkoutUrl: method.checkoutUrl });
            return Response.json({ success: true, paymentUrl: method.checkoutUrl, provider: method.provider }, { headers: { "Cache-Control": "no-store" } });
          }
          await insertPaymentTransaction({ id: transactionId, bookingId: booking.id, paymentMethodId: method.id, provider: method.provider, kind: "balance", amountCents: booking.balanceCents, currency: booking.currency, status: "pending", providerRef: null, checkoutUrl: null });
          // No clientToken passed: the browser returns from Stripe with its
          // existing portal session cookie still valid, so the return page
          // reloads via the cookie instead of a token in the redirect URL.
          const checkout = await createCheckoutSession({ booking, amountCents: booking.balanceCents, kind: "balance", currency: booking.currency, transactionId });
          await updateBooking(booking.id, { stripe_balance_session_id: checkout.id, payment_method_id: method.id, payment_provider: method.provider });
          return Response.json({ success: true, checkoutUrl: checkout.url, provider: method.provider }, { headers: { "Cache-Control": "no-store" } });
        } catch (error) {
          auditLog("payment.balance_failed", { detail: internalErrorDetail(error) });
          return Response.json({ success: false, error: publicErrorMessage(error, "Unable to start payment right now. Please try again later.") }, { status: publicErrorStatus(error, 503) });
        }
      },
    },
  },
});
