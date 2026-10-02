import { supabaseRest } from "./supabase";

export async function recordBookingEvent(
  bookingId: string,
  eventType: string,
  providerEventId?: string,
  metadata: Record<string, unknown> = {},
) {
  await supabaseRest("booking_events", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({
      booking_id: bookingId,
      event_type: eventType,
      provider_event_id: providerEventId ?? null,
      metadata,
    }),
  }).catch((error: unknown) => {
    // Provider event IDs are idempotent; an existing event is safe to ignore.
    if (error instanceof Error && "status" in error && (error as Error & { status?: number }).status === 409) return;
    throw error;
  });
}
