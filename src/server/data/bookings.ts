import { sha256 } from "../security/tokens";
import { SupabaseRequestError, supabaseRest } from "./supabase";

export type BookingStatus = "pending_payment" | "pending" | "confirmed" | "cancelled" | "expired";
export type BookingPaymentStatus = "unpaid" | "paid" | "partially_paid" | "refunded";

export type BookingRecord = {
  id: string;
  clientTokenHash: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  packageId: string;
  bookingDate: string;
  bookingTime: string;
  timezone: string;
  location: string;
  guestCount: string;
  notes: string;
  status: BookingStatus;
  paymentStatus: BookingPaymentStatus;
  paymentMethodId: string | null;
  paymentProvider: string | null;
  currency: string;
  depositCents: number;
  totalCents: number;
  balanceCents: number;
  paymentExpiresAt: string | null;
  stripeDepositSessionId: string | null;
  stripeBalanceSessionId: string | null;
  stripePaymentIntentId: string | null;
  createdAt: string;
  updatedAt: string;
};


/**
 * Raised when the `bookings_active_slot_unique` partial index rejects an insert.
 * The pre-insert availability check is advisory only; this is the authoritative
 * guard against two concurrent requests taking the same slot.
 */
export class BookingSlotConflictError extends Error {
  constructor() {
    super("Booking slot already taken");
    this.name = "BookingSlotConflictError";
  }
}

export async function expireStalePendingBookings() {
  await supabaseRest("bookings?status=eq.pending_payment&payment_expires_at=lt." + encodeURIComponent(new Date().toISOString()), {
    method: "PATCH",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ status: "expired", updated_at: new Date().toISOString() }),
  });
}

export async function bookingSlotTaken(date: string, time: string, excludeId?: string, options: { expireStale?: boolean } = {}) {
  if (options.expireStale !== false) await expireStalePendingBookings();
  const filters = [
    `booking_date=eq.${encodeURIComponent(date)}`,
    `booking_time=eq.${encodeURIComponent(time)}`,
    "status=in.(pending_payment,pending,confirmed)",
    "limit=1",
  ];
  if (excludeId) filters.splice(2, 0, `id=neq.${encodeURIComponent(excludeId)}`);
  const response = await supabaseRest(`bookings?select=id&${filters.join("&")}`, { method: "GET" });
  const rows = await response.json() as Array<{ id: string }>;
  return rows.length > 0;
}

/**
 * Returns the set of booking_time values already occupied (pending/confirmed)
 * on a given date, in a single query, so callers checking many slots for one
 * date don't issue one query per slot.
 */
export async function bookedSlotTimesForDate(date: string, excludeId?: string) {
  const filters = [
    `booking_date=eq.${encodeURIComponent(date)}`,
    "status=in.(pending_payment,pending,confirmed)",
  ];
  if (excludeId) filters.push(`id=neq.${encodeURIComponent(excludeId)}`);
  const response = await supabaseRest(`bookings?select=booking_time&${filters.join("&")}`, { method: "GET" });
  const rows = await response.json() as Array<{ booking_time: string }>;
  return new Set(rows.map((row) => row.booking_time));
}

export async function insertBooking(record: BookingRecord) {
  try {
    await insertBookingRow(record);
  } catch (error) {
    const detail = error as SupabaseRequestError;
    if (detail.status === 409 || (detail.body ?? "").includes("23505")) throw new BookingSlotConflictError();
    throw error;
  }
}

async function insertBookingRow(record: BookingRecord) {
  await supabaseRest("bookings", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({
      id: record.id,
      client_token_hash: record.clientTokenHash,
      name: record.name,
      email: record.email,
      phone: record.phone,
      service: record.service,
      package_id: record.packageId,
      booking_date: record.bookingDate,
      booking_time: record.bookingTime,
      timezone: record.timezone,
      location: record.location,
      guest_count: record.guestCount,
      notes: record.notes,
      status: record.status,
      payment_status: record.paymentStatus,
      payment_method_id: record.paymentMethodId,
      payment_provider: record.paymentProvider,
      currency: record.currency,
      deposit_cents: record.depositCents,
      total_cents: record.totalCents,
      balance_cents: record.balanceCents,
      payment_expires_at: record.paymentExpiresAt,
      stripe_deposit_session_id: record.stripeDepositSessionId,
      stripe_balance_session_id: record.stripeBalanceSessionId,
      stripe_payment_intent_id: record.stripePaymentIntentId,
      created_at: record.createdAt,
      updated_at: record.updatedAt,
    }),
  });
}

export async function getBookingById(id: string) {
  const response = await supabaseRest(`bookings?select=*&id=eq.${encodeURIComponent(id)}&limit=1`, { method: "GET" });
  const rows = await response.json() as Record<string, unknown>[];
  return rows[0] ? mapBooking(rows[0]) : null;
}

export async function getBookingByToken(token: string) {
  const hash = await sha256(token);
  const response = await supabaseRest(`bookings?select=*&client_token_hash=eq.${encodeURIComponent(hash)}&limit=1`, { method: "GET" });
  const rows = await response.json() as Record<string, unknown>[];
  return rows[0] ? mapBooking(rows[0]) : null;
}

export async function listBookings(limit = 150) {
  await expireStalePendingBookings();
  const response = await supabaseRest(`bookings?select=*&order=booking_date.asc,booking_time.asc&limit=${Math.min(Math.max(limit, 1), 250)}`, { method: "GET" });
  const rows = await response.json() as Record<string, unknown>[];
  return rows.map(mapBooking);
}

export async function updateBooking(id: string, patch: Record<string, unknown>) {
  await supabaseRest(`bookings?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ ...patch, updated_at: new Date().toISOString() }),
  });
}

function mapBooking(row: Record<string, unknown>): BookingRecord {
  return {
    id: String(row.id),
    clientTokenHash: String(row.client_token_hash),
    name: String(row.name),
    email: String(row.email),
    phone: String(row.phone ?? ""),
    service: String(row.service),
    packageId: String(row.package_id ?? ""),
    bookingDate: String(row.booking_date),
    bookingTime: String(row.booking_time),
    timezone: String(row.timezone ?? "America/New_York"),
    location: String(row.location ?? ""),
    guestCount: String(row.guest_count ?? ""),
    notes: String(row.notes ?? ""),
    status: row.status as BookingStatus,
    paymentStatus: row.payment_status as BookingPaymentStatus,
    paymentMethodId: row.payment_method_id ? String(row.payment_method_id) : null,
    paymentProvider: row.payment_provider ? String(row.payment_provider) : null,
    currency: String(row.currency ?? "USD"),
    depositCents: Number(row.deposit_cents ?? 0),
    totalCents: Number(row.total_cents ?? 0),
    balanceCents: Number(row.balance_cents ?? 0),
    paymentExpiresAt: row.payment_expires_at ? String(row.payment_expires_at) : null,
    stripeDepositSessionId: row.stripe_deposit_session_id ? String(row.stripe_deposit_session_id) : null,
    stripeBalanceSessionId: row.stripe_balance_session_id ? String(row.stripe_balance_session_id) : null,
    stripePaymentIntentId: row.stripe_payment_intent_id ? String(row.stripe_payment_intent_id) : null,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}
