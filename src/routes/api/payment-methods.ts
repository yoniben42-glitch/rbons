import { createFileRoute } from "@tanstack/react-router";
import { listEnabledPaymentMethods, publicPaymentMethod } from "@/server/data/payment-methods";
import { getPaymentSettings } from "@/server/data/payment-settings";
import { auditLog } from "@/server/security/logging";
import { internalErrorDetail } from "@/server/security/errors";

export const Route = createFileRoute("/api/payment-methods")({
  server: {
    handlers: {
      GET: async () => {
        try {
        const [methods, settings] = await Promise.all([listEnabledPaymentMethods(), getPaymentSettings()]);
        const ordered = methods.sort((a, b) => (a.id === settings.defaultMethodId ? -1 : b.id === settings.defaultMethodId ? 1 : 0));
        return Response.json({
          success: true,
          paymentRequired: settings.paymentRequired,
          currency: settings.currency,
          depositCents: settings.depositCents,
          methods: ordered.map(publicPaymentMethod),
          defaultMethodId: ordered.some((item) => item.id === settings.defaultMethodId) ? settings.defaultMethodId : ordered[0]?.id ?? null,
        }, { headers: { "Cache-Control": "no-store" } });
        } catch (error) {
          auditLog("payment.methods_failed", { detail: internalErrorDetail(error) });
          return Response.json({ success: false, error: "Payment options are temporarily unavailable.", methods: [], defaultMethodId: null }, { status: 503, headers: { "Cache-Control": "no-store" } });
        }
      },
    },
  },
});
