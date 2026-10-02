import { PublicError } from "../security/errors";
import { supabaseRest } from "./supabase";

export type PaymentProvider = "stripe" | "payment_link";

export type PaymentMethod = {
  id: string;
  provider: PaymentProvider;
  name: string;
  description: string;
  checkoutUrl: string | null;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
};


function map(row: Record<string, unknown>): PaymentMethod {
  return {
    id: String(row.id),
    provider: row.provider as PaymentProvider,
    name: String(row.name),
    description: String(row.description ?? ""),
    checkoutUrl: row.checkout_url ? String(row.checkout_url) : null,
    enabled: Boolean(row.enabled),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

export async function listPaymentMethods() {
  const response = await supabaseRest("payment_methods?select=*&order=created_at.asc", { method: "GET" });
  const rows = await response.json() as Record<string, unknown>[];
  return rows.map(map);
}

export async function getPaymentMethod(id: string) {
  const response = await supabaseRest(`payment_methods?select=*&id=eq.${encodeURIComponent(id)}&limit=1`, { method: "GET" });
  const rows = await response.json() as Record<string, unknown>[];
  return rows[0] ? map(rows[0]) : null;
}

export async function insertPaymentMethod(input: {
  id?: string;
  provider: PaymentProvider;
  name: string;
  description: string;
  checkoutUrl?: string | null;
  enabled?: boolean;
}) {
  const now = new Date().toISOString();
  const id = input.id ?? `pm_${crypto.randomUUID()}`;
  await supabaseRest("payment_methods", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({
      id,
      provider: input.provider,
      name: input.name,
      description: input.description,
      checkout_url: input.checkoutUrl ?? null,
      enabled: input.enabled ?? true,
      created_at: now,
      updated_at: now,
    }),
  });
  return getPaymentMethod(id);
}

export async function updatePaymentMethod(id: string, patch: Partial<Pick<PaymentMethod, "name" | "description" | "checkoutUrl" | "enabled">>) {
  const body: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (typeof patch.name === "string") body.name = patch.name;
  if (typeof patch.description === "string") body.description = patch.description;
  if (patch.checkoutUrl !== undefined) body.checkout_url = patch.checkoutUrl;
  if (typeof patch.enabled === "boolean") body.enabled = patch.enabled;
  await supabaseRest(`payment_methods?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify(body),
  });
  return getPaymentMethod(id);
}

export async function deletePaymentMethod(id: string) {
  if (id === "pm_stripe") throw new PublicError("The built-in Stripe method cannot be deleted.");
  await supabaseRest(`payment_methods?id=eq.${encodeURIComponent(id)}`, { method: "DELETE" });
}

export function stripeConfigured() {
  return Boolean(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_WEBHOOK_SECRET && process.env.APP_ORIGIN);
}

export function methodIsUsable(method: PaymentMethod) {
  if (!method.enabled) return false;
  if (method.provider === "stripe") return stripeConfigured();
  return Boolean(method.checkoutUrl);
}

export function publicPaymentMethod(method: PaymentMethod) {
  return {
    id: method.id,
    provider: method.provider,
    name: method.name,
    description: method.description,
    checkoutUrl: method.provider === "payment_link" ? method.checkoutUrl : null,
  };
}

export async function listEnabledPaymentMethods() {
  const methods = await listPaymentMethods();
  return methods.filter(methodIsUsable);
}
