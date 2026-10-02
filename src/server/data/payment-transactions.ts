export type PaymentTransactionKind = "deposit" | "balance";
export type PaymentTransactionStatus = "pending" | "paid" | "failed" | "refunded" | "expired";

export type PaymentTransaction = {
  id: string;
  bookingId: string;
  paymentMethodId: string;
  provider: string;
  kind: PaymentTransactionKind;
  amountCents: number;
  currency: string;
  status: PaymentTransactionStatus;
  providerRef: string | null;
  checkoutUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

import { supabaseRest } from "./supabase";

function map(row: Record<string, unknown>): PaymentTransaction {
  return {
    id: String(row.id),
    bookingId: String(row.booking_id),
    paymentMethodId: String(row.payment_method_id),
    provider: String(row.provider),
    kind: row.kind as PaymentTransactionKind,
    amountCents: Number(row.amount_cents ?? 0),
    currency: String(row.currency ?? "USD"),
    status: row.status as PaymentTransactionStatus,
    providerRef: row.provider_ref ? String(row.provider_ref) : null,
    checkoutUrl: row.checkout_url ? String(row.checkout_url) : null,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

export async function insertPaymentTransaction(input: Omit<PaymentTransaction, "createdAt" | "updatedAt">) {
  const now = new Date().toISOString();
  await supabaseRest("payment_transactions", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({
      id: input.id,
      booking_id: input.bookingId,
      payment_method_id: input.paymentMethodId,
      provider: input.provider,
      kind: input.kind,
      amount_cents: input.amountCents,
      currency: input.currency,
      status: input.status,
      provider_ref: input.providerRef,
      checkout_url: input.checkoutUrl,
      created_at: now,
      updated_at: now,
    }),
  });
}

export async function getPaymentTransaction(id: string) {
  const response = await supabaseRest(`payment_transactions?select=*&id=eq.${encodeURIComponent(id)}&limit=1`, { method: "GET" });
  const rows = await response.json() as Record<string, unknown>[];
  return rows[0] ? map(rows[0]) : null;
}

export async function listPaymentTransactions(limit = 250) {
  const response = await supabaseRest(`payment_transactions?select=*&order=created_at.desc&limit=${Math.min(Math.max(limit, 1), 500)}`, { method: "GET" });
  const rows = await response.json() as Record<string, unknown>[];
  return rows.map(map);
}

/**
 * Fetches the single pending transaction for a booking directly, instead of
 * pulling the most recent N transactions across every booking and scanning
 * them client-side for a match.
 */
export async function getPendingPaymentTransactionByBookingId(bookingId: string) {
  const response = await supabaseRest(
    `payment_transactions?select=*&booking_id=eq.${encodeURIComponent(bookingId)}&status=eq.pending&order=created_at.desc&limit=1`,
    { method: "GET" },
  );
  const rows = await response.json() as Record<string, unknown>[];
  return rows[0] ? map(rows[0]) : null;
}

export async function updatePaymentTransaction(id: string, patch: Partial<Pick<PaymentTransaction, "status" | "providerRef" | "checkoutUrl">>) {
  const body: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (typeof patch.status === "string") body.status = patch.status;
  if (patch.providerRef !== undefined) body.provider_ref = patch.providerRef;
  if (patch.checkoutUrl !== undefined) body.checkout_url = patch.checkoutUrl;
  await supabaseRest(`payment_transactions?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify(body),
  });
}
