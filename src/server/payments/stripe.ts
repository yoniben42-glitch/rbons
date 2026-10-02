import type { BookingRecord } from "../data/bookings";
import { formatMoney } from "@/lib/money";

function required(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not configured`);
  return value;
}

async function stripeRequest(path: string, body: URLSearchParams, idempotencyKey?: string) {
  const key = required("STRIPE_SECRET_KEY");
  const response = await fetch(`https://api.stripe.com/v1/${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/x-www-form-urlencoded",
      ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
    },
    body,
  });
  const data = await response.json() as Record<string, any>;
  if (!response.ok) throw new Error(`Stripe ${response.status}: ${String(data.error?.message ?? "request failed")}`);
  return data;
}

export async function createCheckoutSession(args: {
  booking: BookingRecord;
  amountCents: number;
  kind: "deposit" | "balance";
  currency: string;
  expiresAtSeconds?: number;
  transactionId: string;
}) {
  if (!Number.isSafeInteger(args.amountCents) || args.amountCents <= 0) throw new Error("Payment amount must be a positive integer");
  if (!/^[A-Z]{3}$/.test(args.currency)) throw new Error("Unsupported payment currency");
  const origin = required("APP_ORIGIN").replace(/\/$/, "");
  const body = new URLSearchParams();
  body.set("mode", "payment");
  body.set("success_url", `${origin}/booking?payment=success&booking_id=${encodeURIComponent(args.booking.id)}&session_id={CHECKOUT_SESSION_ID}`);
  body.set("cancel_url", `${origin}/booking?payment=cancelled&booking_id=${encodeURIComponent(args.booking.id)}`);
  body.set("customer_email", args.booking.email);
  body.set("client_reference_id", args.booking.id);
  body.set("metadata[booking_id]", args.booking.id);
  body.set("metadata[payment_kind]", args.kind);
  body.set("metadata[payment_transaction_id]", args.transactionId);
  body.set("line_items[0][price_data][currency]", args.currency.toLowerCase());
  body.set("line_items[0][price_data][product_data][name]", `RBONSU Photography — ${args.kind === "deposit" ? "Booking Deposit" : "Remaining Balance"}`);
  body.set("line_items[0][price_data][product_data][description]", `${args.booking.service} · ${args.booking.bookingDate} ${args.booking.bookingTime} ${args.booking.timezone}`);
  body.set("line_items[0][price_data][unit_amount]", String(args.amountCents));
  body.set("line_items[0][quantity]", "1");
  body.set("billing_address_collection", "auto");
  body.set("payment_method_collection", "always");
  body.set("submit_type", "pay");
  body.set("locale", "en");
  if (args.expiresAtSeconds) body.set("expires_at", String(args.expiresAtSeconds));
  const session = await stripeRequest("checkout/sessions", body, `rbonsu-checkout-${args.transactionId}`);
  if (!session.url) throw new Error("Stripe did not return a checkout URL");
  return {
    id: String(session.id),
    url: String(session.url),
    amountCents: args.amountCents,
    displayAmount: formatMoney(args.amountCents, args.currency),
  };
}

export async function verifyStripeSignature(payload: string, signature: string) {
  const secret = required("STRIPE_WEBHOOK_SECRET");
  const parts = signature.split(",").map((p) => p.split("=", 2));
  const timestamp = parts.find(([key]) => key === "t")?.[1];
  const signatures = parts.filter(([key]) => key === "v1").map(([, value]) => value);
  if (!timestamp || signatures.length === 0) return false;
  const timestampNumber = Number(timestamp);
  if (!Number.isFinite(timestampNumber) || Math.abs(Date.now() / 1000 - timestampNumber) > 300) return false;
  const signed = `${timestamp}.${payload}`;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const digest = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(signed));
  const expected = Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
  return signatures.some((sig) => {
    if (sig.length !== expected.length) return false;
    let result = 0;
    for (let i = 0; i < expected.length; i++) result |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
    return result === 0;
  });
}
