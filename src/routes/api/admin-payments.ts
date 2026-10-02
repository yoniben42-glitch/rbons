import { createFileRoute } from "@tanstack/react-router";
import { isAdmin, originMatchesAdminRequest } from "@/server/security/admin";
import { auditLog } from "@/server/security/logging";
import { internalErrorDetail, publicErrorMessage, publicErrorStatus } from "@/server/security/errors";
import { getPaymentMethod, insertPaymentMethod, listPaymentMethods, updatePaymentMethod, deletePaymentMethod, stripeConfigured } from "@/server/data/payment-methods";
import { getPaymentSettings, updatePaymentSettings } from "@/server/data/payment-settings";
import { listPaymentTransactions, updatePaymentTransaction } from "@/server/data/payment-transactions";

function jsonHeaders() { return { "Cache-Control": "no-store" }; }

function validHttpsUrl(value: string) {
  try {
    const url = new URL(value);
    if (url.protocol === "https:") return true;
    // NODE_ENV is not reliably set on the deployed Worker (it isn't defined
    // in wrangler.jsonc's `vars`), so it must never be the thing standing
    // between this check and requiring HTTPS in production. The only
    // allowed exception is local development against localhost itself.
    const isLocalhost = url.hostname === "localhost" || url.hostname === "127.0.0.1";
    return url.protocol === "http:" && isLocalhost;
  } catch {
    return false;
  }
}

export const Route = createFileRoute("/api/admin-payments")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!(await isAdmin(request))) return Response.json({ success: false, error: "Unauthorized." }, { status: 401 });
        const [methods, settings, transactions] = await Promise.all([listPaymentMethods(), getPaymentSettings(), listPaymentTransactions()]);
        return Response.json({ success: true, methods, settings, transactions, stripeConfigured: stripeConfigured() }, { headers: jsonHeaders() });
      },
      POST: async ({ request }) => {
        if (!(await isAdmin(request))) return Response.json({ success: false, error: "Unauthorized." }, { status: 401 });
        if (!originMatchesAdminRequest(request)) return Response.json({ success: false, error: "Request origin could not be verified." }, { status: 403 });
        const body = await request.json() as { provider?: string; name?: string; description?: string; checkoutUrl?: string; enabled?: boolean };
        const provider = body.provider === "payment_link" ? "payment_link" : null;
        if (!provider) return Response.json({ success: false, error: "Only external payment links can be added from the dashboard." }, { status: 400 });
        const name = String(body.name ?? "").trim().slice(0, 100);
        const description = String(body.description ?? "").trim().slice(0, 300);
        const checkoutUrl = String(body.checkoutUrl ?? "").trim();
        if (name.length < 2) return Response.json({ success: false, error: "Payment method name is required." }, { status: 400 });
        if (!validHttpsUrl(checkoutUrl)) return Response.json({ success: false, error: "Enter a valid HTTPS payment URL." }, { status: 400 });
        const method = await insertPaymentMethod({ provider, name, description, checkoutUrl, enabled: body.enabled !== false });
        return Response.json({ success: true, method }, { status: 201, headers: jsonHeaders() });
      },
      PATCH: async ({ request }) => {
        if (!(await isAdmin(request))) return Response.json({ success: false, error: "Unauthorized." }, { status: 401 });
        if (!originMatchesAdminRequest(request)) return Response.json({ success: false, error: "Request origin could not be verified." }, { status: 403 });
        const body = await request.json() as {
          target?: "settings" | "method" | "transaction";
          id?: string;
          currency?: string;
          paymentRequired?: boolean;
          depositCents?: number;
          paymentExpiryMinutes?: number;
          defaultMethodId?: string | null;
          name?: string;
          description?: string;
          checkoutUrl?: string | null;
          enabled?: boolean;
          status?: "pending" | "paid" | "failed" | "refunded" | "expired";
          providerRef?: string | null;
        };
        try {
          if (body.target === "settings") {
            const current = await getPaymentSettings();
            const requestedDefault = typeof body.defaultMethodId === "string" && body.defaultMethodId ? body.defaultMethodId : null;
            if (requestedDefault) {
              const candidate = await getPaymentMethod(requestedDefault);
              if (!candidate) return Response.json({ success: false, error: "Default payment method not found." }, { status: 400 });
            }
            const next = await updatePaymentSettings({
              currency: typeof body.currency === "string" ? body.currency.toUpperCase() : current.currency,
              paymentRequired: typeof body.paymentRequired === "boolean" ? body.paymentRequired : current.paymentRequired,
              depositCents: Number.isInteger(body.depositCents) ? Number(body.depositCents) : current.depositCents,
              paymentExpiryMinutes: Number.isInteger(body.paymentExpiryMinutes) ? Number(body.paymentExpiryMinutes) : current.paymentExpiryMinutes,
              defaultMethodId: typeof body.defaultMethodId === "string" ? body.defaultMethodId : current.defaultMethodId,
            });
            return Response.json({ success: true, settings: next }, { headers: jsonHeaders() });
          }
          if (!body.id) return Response.json({ success: false, error: "Payment object id required." }, { status: 400 });
          if (body.target === "transaction") {
            await updatePaymentTransaction(body.id, { status: body.status, providerRef: body.providerRef });
            return Response.json({ success: true }, { headers: jsonHeaders() });
          }
          const existing = await getPaymentMethod(body.id);
          if (!existing) return Response.json({ success: false, error: "Payment method not found." }, { status: 404 });
          if (body.checkoutUrl !== undefined && body.checkoutUrl !== null && !validHttpsUrl(body.checkoutUrl)) {
            return Response.json({ success: false, error: "Enter a valid HTTPS payment URL." }, { status: 400 });
          }
          const method = await updatePaymentMethod(body.id, {
            name: typeof body.name === "string" ? body.name.trim().slice(0, 100) : undefined,
            description: typeof body.description === "string" ? body.description.trim().slice(0, 300) : undefined,
            checkoutUrl: body.checkoutUrl,
            enabled: typeof body.enabled === "boolean" ? body.enabled : undefined,
          });
          return Response.json({ success: true, method }, { headers: jsonHeaders() });
        } catch (error) {
          auditLog("admin.payments.update_failed", { detail: internalErrorDetail(error) });
          return Response.json({ success: false, error: publicErrorMessage(error, "Could not update payment settings.") }, { status: publicErrorStatus(error, 400) });
        }
      },
      DELETE: async ({ request }) => {
        if (!(await isAdmin(request))) return Response.json({ success: false, error: "Unauthorized." }, { status: 401 });
        if (!originMatchesAdminRequest(request)) return Response.json({ success: false, error: "Request origin could not be verified." }, { status: 403 });
        const id = new URL(request.url).searchParams.get("id") ?? "";
        if (!id) return Response.json({ success: false, error: "Payment method id required." }, { status: 400 });
        try {
          await deletePaymentMethod(id);
          return Response.json({ success: true }, { headers: jsonHeaders() });
        } catch (error) {
          auditLog("admin.payments.delete_failed", { detail: internalErrorDetail(error) });
          return Response.json({ success: false, error: publicErrorMessage(error, "Could not delete payment method.") }, { status: publicErrorStatus(error, 400) });
        }
      },
    },
  },
});
