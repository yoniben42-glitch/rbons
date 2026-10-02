export type PaymentSettings = {
  currency: string;
  paymentRequired: boolean;
  depositCents: number;
  paymentExpiryMinutes: number;
  defaultMethodId: string | null;
};

const DEFAULTS: PaymentSettings = {
  currency: "USD",
  paymentRequired: true,
  depositCents: 10000,
  paymentExpiryMinutes: 30,
  defaultMethodId: "pm_stripe",
};

import { supabaseRest } from "./supabase";

function sanitize(row?: Record<string, unknown>): PaymentSettings {
  const currency = typeof row?.currency === "string" && /^[A-Z]{3}$/.test(row.currency) ? row.currency : DEFAULTS.currency;
  const depositCents = Number.isInteger(row?.deposit_cents) && Number(row?.deposit_cents) >= 0 ? Number(row?.deposit_cents) : DEFAULTS.depositCents;
  const paymentExpiryMinutes = Number.isInteger(row?.payment_expiry_minutes) && Number(row?.payment_expiry_minutes) >= 30 && Number(row?.payment_expiry_minutes) <= 1440 ? Number(row?.payment_expiry_minutes) : DEFAULTS.paymentExpiryMinutes;
  return {
    currency,
    paymentRequired: typeof row?.payment_required === "boolean" ? row.payment_required : DEFAULTS.paymentRequired,
    depositCents,
    paymentExpiryMinutes,
    defaultMethodId: typeof row?.default_method_id === "string" && row.default_method_id ? row.default_method_id : DEFAULTS.defaultMethodId,
  };
}

export async function getPaymentSettings(): Promise<PaymentSettings> {
  try {
    const response = await supabaseRest("payment_settings?select=*&id=eq.singleton&limit=1", { method: "GET" });
    const rows = await response.json() as Record<string, unknown>[];
    return sanitize(rows[0]);
  } catch {
    return DEFAULTS;
  }
}

export async function updatePaymentSettings(input: PaymentSettings) {
  const normalized = sanitize({
    currency: input.currency.toUpperCase(),
    payment_required: input.paymentRequired,
    deposit_cents: input.depositCents,
    payment_expiry_minutes: input.paymentExpiryMinutes,
    default_method_id: input.defaultMethodId,
  });
  await supabaseRest("payment_settings?id=eq.singleton", {
    method: "PATCH",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({
      id: "singleton",
      currency: normalized.currency,
      payment_required: normalized.paymentRequired,
      deposit_cents: normalized.depositCents,
      payment_expiry_minutes: normalized.paymentExpiryMinutes,
      default_method_id: normalized.defaultMethodId,
      updated_at: new Date().toISOString(),
    }),
  });
  return normalized;
}

export { formatMoney } from "@/lib/money";

export { DEFAULTS as DEFAULT_PAYMENT_SETTINGS };
