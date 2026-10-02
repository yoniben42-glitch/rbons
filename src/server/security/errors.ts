/**
 * Error-surface control for API handlers.
 *
 * Internal failures (Supabase REST bodies, Stripe API messages, storage status
 * lines) must never be forwarded to a client: they can disclose table names,
 * policy details and upstream diagnostics. Handlers return the message of a
 * `PublicError` and a generic fallback for everything else, logging the real
 * cause server-side via `auditLog`.
 */
export class PublicError extends Error {
  readonly status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "PublicError";
    this.status = status;
  }
}

export function publicErrorMessage(error: unknown, fallback: string) {
  return error instanceof PublicError ? error.message : fallback;
}

export function publicErrorStatus(error: unknown, fallback: number) {
  return error instanceof PublicError ? error.status : fallback;
}

export function internalErrorDetail(error: unknown) {
  return error instanceof Error ? error.message : "unknown";
}
