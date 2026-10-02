import { z } from "zod";

/**
 * Removes C0/C1 control characters while preserving tab, newline and carriage
 * return. Implemented as a code-point filter rather than a control-character
 * regex so the intent is explicit and lint-clean.
 */
export function stripControlCharacters(value: string) {
  let result = "";
  for (const char of value) {
    const code = char.codePointAt(0) ?? 0;
    const isC0 = code <= 0x1f && code !== 0x09 && code !== 0x0a && code !== 0x0d;
    if (isC0 || code === 0x7f) continue;
    result += char;
  }
  return result;
}

const normalizedText = (max: number) =>
  z
    .string()
    .trim()
    .min(1)
    .max(max)
    .transform(stripControlCharacters);

export const inquirySchema = z
  .object({
    name: normalizedText(120),
    email: z.string().trim().email().max(255).transform((value) => value.toLowerCase()),
    phone: z.string().trim().max(40).optional().default(""),
    service: z.enum(["weddings", "portraits", "maternity-family", "editorial", "engagements", "commercial", "other"]),
    eventDate: z.string().trim().max(32).optional().default(""),
    locationVenue: z.string().trim().max(180).optional().default(""),
    guestCount: z.string().trim().max(32).optional().default(""),
    investmentTier: z.enum(["3k-5k", "5k-8k", "8k-plus", "custom", "not-sure"]).optional().default("not-sure"),
    scopePreference: z.string().trim().max(120).default("Signature Wedding Collection"),
    message: normalizedText(4000),
    website_hp: z.string().max(120).optional().default(""),
  })
  .strict();

export type InquiryInput = z.infer<typeof inquirySchema>;

export function validateJsonContentType(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  return contentType.toLowerCase().startsWith("application/json");
}

export function originMatchesRequest(request: Request): boolean {
  const configuredOrigin = process.env.APP_ORIGIN?.trim();
  const origin = request.headers.get("origin")?.trim();

  if (!origin) return false;

  try {
    const requestOrigin = new URL(request.url).origin;
    return origin === requestOrigin || (Boolean(configuredOrigin) && origin === configuredOrigin);
  } catch {
    return false;
  }
}
