import { createFileRoute } from "@tanstack/react-router";
import { auditLog } from "@/server/security/logging";
import { getClientIp, checkRateLimit } from "@/server/security/rate-limit";
import { inquirySchema, originMatchesRequest, validateJsonContentType } from "@/server/security/input";
import { newInquiryId, hashIdentifier } from "@/server/security/crypto";
import { persistInquiry } from "@/server/data/inquiries";

const MAX_BODY_BYTES = 24 * 1024;

export const Route = createFileRoute("/api/inquiries")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const requestId = crypto.randomUUID();
        const ip = getClientIp(request);

        if (!validateJsonContentType(request)) {
          return Response.json({ success: false, error: "Unsupported content type." }, { status: 415 });
        }

        if (!originMatchesRequest(request)) {
          auditLog("inquiry.csrf_rejected", { requestId });
          return Response.json({ success: false, error: "Request origin could not be verified." }, { status: 403 });
        }

        const limit = await checkRateLimit(`inquiry:${ip}`);
        if (!limit.allowed) {
          return Response.json(
            { success: false, error: "Too many submissions. Please try again later." },
            { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
          );
        }

        try {
          const contentLength = Number(request.headers.get("content-length") ?? "0");
          if (contentLength > MAX_BODY_BYTES) {
            return Response.json({ success: false, error: "Request is too large." }, { status: 413 });
          }

          const raw = await request.text();
          if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) {
            return Response.json({ success: false, error: "Request is too large." }, { status: 413 });
          }

          const parsed = inquirySchema.safeParse(JSON.parse(raw));
          if (!parsed.success) {
            return Response.json(
              { success: false, error: "Please review the highlighted fields and try again." },
              { status: 400 },
            );
          }

          // Honeypot: silently accept bots so they get no useful feedback.
          if (parsed.data.website_hp) {
            auditLog("inquiry.bot_rejected", { requestId });
            return Response.json({ success: true, inquiryId: "accepted" });
          }

          const inquiry = {
            ...parsed.data,
            id: newInquiryId(),
            createdAt: new Date().toISOString(),
            ipHash: hashIdentifier(ip),
          };

          await persistInquiry(inquiry);
          auditLog("inquiry.created", {
            requestId,
            inquiryId: inquiry.id,
            service: inquiry.service,
          });

          return Response.json(
            { success: true, inquiryId: inquiry.id },
            { status: 201, headers: { "Cache-Control": "no-store" } },
          );
        } catch (error) {
          auditLog("inquiry.failed", {
            requestId,
            error: error instanceof Error ? error.message : "unknown",
          });

          return Response.json(
            { success: false, error: "Unable to submit your inquiry right now. Please try again later." },
            { status: 503 },
          );
        }
      },
    },
  },
});
