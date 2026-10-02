import { createFileRoute } from "@tanstack/react-router";
import { auditLog } from "@/server/security/logging";
import { checkRateLimit, getClientIp } from "@/server/security/rate-limit";
import { bookingSchema, isValidBookingDate, isValidSlot, isWithinAdvanceWindow } from "@/server/security/booking";
import { getBookingSettings } from "@/server/data/booking-settings";
import { BookingSlotConflictError, bookingSlotTaken, insertBooking, updateBooking } from "@/server/data/bookings";
import { availabilityBlockContains } from "@/server/data/availability";
import { randomToken, sha256 } from "@/server/security/tokens";
import { sendEmail, sendStudioEmail } from "@/server/data/email";
import { getPaymentMethod, listEnabledPaymentMethods, methodIsUsable } from "@/server/data/payment-methods";
import { getPaymentSettings } from "@/server/data/payment-settings";
import { insertPaymentTransaction, updatePaymentTransaction } from "@/server/data/payment-transactions";
import { createCheckoutSession } from "@/server/payments/stripe";
import { formatMoney } from "@/lib/money";
import { escapeHtml } from "@/server/security/html";
import { createPortalSession, portalCookie } from "@/server/security/portal-session";

const MAX_BODY_BYTES = 24 * 1024;

export const Route = createFileRoute("/api/bookings")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const requestId = crypto.randomUUID();
        if (request.headers.get("content-type")?.toLowerCase().startsWith("application/json") !== true) {
          return Response.json({ success: false, error: "Unsupported content type." }, { status: 415 });
        }
        const origin = request.headers.get("origin");
        if (!origin || origin !== new URL(request.url).origin) {
          return Response.json({ success: false, error: "Request origin could not be verified." }, { status: 403 });
        }
        const limit = await checkRateLimit(`booking:${getClientIp(request)}`, 8, 10 * 60 * 1000);
        if (!limit.allowed) {
          return Response.json({ success: false, error: "Too many booking attempts. Please try again later." }, { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } });
        }

        try {
          const raw = await request.text();
          if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) return Response.json({ success: false, error: "Request is too large." }, { status: 413 });
          let payload: unknown;
          try { payload = JSON.parse(raw); } catch { return Response.json({ success: false, error: "Invalid request." }, { status: 400 }); }
          const parsed = bookingSchema.safeParse(payload);
          if (!parsed.success) return Response.json({ success: false, error: "Please review your booking details." }, { status: 400 });
          if (parsed.data.website_hp) return Response.json({ success: true, message: "Request accepted." }, { status: 201 });

          const bookingSettings = await getBookingSettings();
          if (!isValidBookingDate(parsed.data.date, bookingSettings) || !isValidSlot(parsed.data.time, bookingSettings, parsed.data.date) || !isWithinAdvanceWindow(parsed.data.date, parsed.data.time, bookingSettings)) {
            return Response.json({ success: false, error: "That date and time are not available for booking." }, { status: 400 });
          }
          if (await availabilityBlockContains(parsed.data.date, parsed.data.time, bookingSettings.timezone, bookingSettings.slotMinutes)) {
            return Response.json({ success: false, error: "That time is blocked. Please choose another slot." }, { status: 409 });
          }
          if (await bookingSlotTaken(parsed.data.date, parsed.data.time)) {
            return Response.json({ success: false, error: "That time was just booked. Please choose another slot." }, { status: 409 });
          }

          const paymentSettings = await getPaymentSettings();
          const enabledMethods = await listEnabledPaymentMethods();
          let selectedMethod = null;
          if (paymentSettings.paymentRequired) {
            const requestedId = parsed.data.paymentMethodId?.trim() || "";
            if (requestedId) {
              selectedMethod = await getPaymentMethod(requestedId);
              if (!selectedMethod || !methodIsUsable(selectedMethod)) {
                return Response.json({ success: false, error: "That payment method is unavailable. Please choose another option." }, { status: 400 });
              }
            } else {
              const defaultCandidate = paymentSettings.defaultMethodId ? await getPaymentMethod(paymentSettings.defaultMethodId) : null;
              selectedMethod = defaultCandidate && methodIsUsable(defaultCandidate) ? defaultCandidate : (enabledMethods[0] ?? null);
              if (!selectedMethod) {
                return Response.json({ success: false, error: "Online payment is not configured for this booking. Please contact the studio." }, { status: 503 });
              }
            }
          }

          const id = `book_${crypto.randomUUID()}`;
          const clientToken = randomToken("client");
          const now = new Date().toISOString();
          const totalCents = paymentSettings.paymentRequired ? paymentSettings.depositCents : 0;
          const paymentExpiresAt = paymentSettings.paymentRequired
            ? new Date(Date.now() + paymentSettings.paymentExpiryMinutes * 60_000).toISOString()
            : null;
          const booking = {
            id,
            clientTokenHash: await sha256(clientToken),
            name: parsed.data.name,
            email: parsed.data.email,
            phone: parsed.data.phone,
            service: parsed.data.service,
            packageId: parsed.data.packageId,
            bookingDate: parsed.data.date,
            bookingTime: parsed.data.time,
            timezone: bookingSettings.timezone,
            location: parsed.data.location,
            guestCount: parsed.data.guestCount,
            notes: parsed.data.notes,
            status: paymentSettings.paymentRequired ? "pending_payment" as const : "pending" as const,
            paymentStatus: "unpaid" as const,
            paymentMethodId: selectedMethod?.id ?? null,
            paymentProvider: selectedMethod?.provider ?? null,
            currency: paymentSettings.currency,
            depositCents: totalCents,
            totalCents,
            balanceCents: totalCents,
            paymentExpiresAt,
            stripeDepositSessionId: null,
            stripeBalanceSessionId: null,
            stripePaymentIntentId: null,
            createdAt: now,
            updatedAt: now,
          };

          await insertBooking(booking);
          let portalSessionToken: string;
          try {
            portalSessionToken = await createPortalSession(id);
          } catch (error) {
            await updateBooking(id, { status: "expired", payment_expires_at: null }).catch(() => undefined);
            auditLog("booking.portal_session_failed", { requestId, error: error instanceof Error ? error.message : "unknown" });
            return Response.json({ success: false, error: "Unable to establish a secure booking session. Please try again." }, { status: 503, headers: { "Cache-Control": "no-store" } });
          }
          const originUrl = new URL(request.url).origin;
          const customerPortalUrl = `${originUrl}/booking?token=${encodeURIComponent(clientToken)}&booking_id=${encodeURIComponent(id)}`;
          const browserPortalUrl = `${originUrl}/booking`;

          let checkoutUrl: string | null = null;
          let paymentTransactionId: string | null = null;
          if (paymentSettings.paymentRequired && selectedMethod) {
            paymentTransactionId = `ptx_${crypto.randomUUID()}`;
            await insertPaymentTransaction({
              id: paymentTransactionId,
              bookingId: id,
              paymentMethodId: selectedMethod.id,
              provider: selectedMethod.provider,
              kind: "deposit",
              amountCents: totalCents,
              currency: paymentSettings.currency,
              status: "pending",
              providerRef: null,
              checkoutUrl: selectedMethod.provider === "payment_link" ? selectedMethod.checkoutUrl : null,
            });

            if (selectedMethod.provider === "stripe") {
              try {
                const checkout = await createCheckoutSession({
                  booking,
                  amountCents: totalCents,
                  kind: "deposit",
                  currency: paymentSettings.currency,
                  expiresAtSeconds: Math.floor(new Date(paymentExpiresAt!).getTime() / 1000),
                  transactionId: paymentTransactionId,
                });
                checkoutUrl = checkout.url;
                await updatePaymentTransaction(paymentTransactionId, { providerRef: checkout.id, checkoutUrl: checkout.url });
                await updateBooking(id, { stripe_deposit_session_id: checkout.id });
              } catch (error) {
                await updatePaymentTransaction(paymentTransactionId, { status: "failed" }).catch(() => undefined);
                await updateBooking(id, { status: "expired", payment_expires_at: null }).catch(() => undefined);
                throw error;
              }
            } else {
              checkoutUrl = selectedMethod.checkoutUrl;
            }
          }

          const customerText = paymentSettings.paymentRequired
            ? `Your RBONSU Photography booking is reserved temporarily while payment is completed.\n\n${parsed.data.service}\n${parsed.data.date} at ${parsed.data.time} ${bookingSettings.timezone}\nPayment due: ${formatMoney(totalCents, paymentSettings.currency)}\n\nPay now: ${checkoutUrl}\nClient portal: ${customerPortalUrl}`
            : `Your RBONSU Photography booking request has been received.\n\n${parsed.data.service}\n${parsed.data.date} at ${parsed.data.time} ${bookingSettings.timezone}\n\nClient portal: ${customerPortalUrl}`;
          const customerHtml = paymentSettings.paymentRequired
            ? `<p>Your RBONSU Photography booking is reserved temporarily while payment is completed.</p><p><strong>${escapeHtml(parsed.data.service)}</strong><br>${escapeHtml(parsed.data.date)} at ${escapeHtml(parsed.data.time)} ${escapeHtml(bookingSettings.timezone)}<br>Payment due: ${escapeHtml(formatMoney(totalCents, paymentSettings.currency))}</p><p><a href="${escapeHtml(checkoutUrl ?? customerPortalUrl)}">${selectedMethod?.provider === "payment_link" ? "Open payment page" : "Pay now"}</a></p><p><a href="${escapeHtml(customerPortalUrl)}">Open your client booking portal</a></p>`
            : `<p>Your RBONSU Photography booking request has been received.</p><p><strong>${escapeHtml(parsed.data.service)}</strong><br>${escapeHtml(parsed.data.date)} at ${escapeHtml(parsed.data.time)} ${escapeHtml(bookingSettings.timezone)}</p><p><a href="${escapeHtml(customerPortalUrl)}">View or manage your booking</a></p>`;
          await sendEmail({ to: booking.email, subject: paymentSettings.paymentRequired ? "RBONSU Photography — Complete your booking" : "RBONSU Photography — Booking received", html: customerHtml, text: customerText }).catch((error) => auditLog("booking.email_failed", { requestId, error: error instanceof Error ? error.message : "unknown" }));
          await sendStudioEmail({
            subject: `New booking ${paymentSettings.paymentRequired ? "awaiting payment" : "request"} — ${booking.name}`,
            html: `<p>New booking from <strong>${escapeHtml(booking.name)}</strong> (${escapeHtml(booking.email)}).</p><p>${escapeHtml(booking.service)} · ${escapeHtml(booking.bookingDate)} · ${escapeHtml(booking.bookingTime)} ${escapeHtml(booking.timezone)}</p><p>Payment: ${paymentSettings.paymentRequired ? escapeHtml(formatMoney(totalCents, paymentSettings.currency)) + " required" : "not required"}.</p><p><a href="${escapeHtml(customerPortalUrl)}">Client portal</a></p>`,
            text: customerText,
          }).catch(() => undefined);

          auditLog("booking.created", { requestId, bookingId: id, service: booking.service, paymentProvider: selectedMethod?.provider ?? null });
          return Response.json({
            success: true,
            bookingId: id,
            portalUrl: browserPortalUrl,
            checkoutUrl,
            paymentUrl: selectedMethod?.provider === "payment_link" ? selectedMethod.checkoutUrl : null,
            booking: {
              service: booking.service,
              date: booking.bookingDate,
              time: booking.bookingTime,
              timezone: booking.timezone,
              currency: booking.currency,
              depositCents: booking.depositCents,
              paymentRequired: paymentSettings.paymentRequired,
              paymentMethod: selectedMethod?.name ?? null,
            },
          }, { status: 201, headers: { "Cache-Control": "no-store", "Set-Cookie": portalCookie(portalSessionToken, request) } });
        } catch (error) {
          if (error instanceof BookingSlotConflictError) {
            auditLog("booking.slot_conflict", { requestId });
            return Response.json({ success: false, error: "That time was just booked. Please choose another slot." }, { status: 409, headers: { "Cache-Control": "no-store" } });
          }
          auditLog("booking.failed", { requestId, error: error instanceof Error ? error.message : "unknown" });
          return Response.json({ success: false, error: "Unable to create the booking right now. Please try again later." }, { status: 503, headers: { "Cache-Control": "no-store" } });
        }
      },
    },
  },
});


