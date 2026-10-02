import type { InquiryInput } from "../security/input";
import { supabaseRest } from "./supabase";

export type StoredInquiry = InquiryInput & {
  id: string;
  createdAt: string;
  ipHash?: string;
};

const devInquiries: StoredInquiry[] = [];

async function writeSupabase(inquiry: StoredInquiry) {
  await supabaseRest("inquiries", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({
      id: inquiry.id,
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone,
      service: inquiry.service,
      event_date: inquiry.eventDate,
      location_venue: inquiry.locationVenue,
      guest_count: inquiry.guestCount,
      investment_tier: inquiry.investmentTier,
      scope_preference: inquiry.scopePreference,
      message: inquiry.message,
      created_at: inquiry.createdAt,
      ip_hash: inquiry.ipHash ?? null,
    }),
  });
}

export async function persistInquiry(inquiry: StoredInquiry) {
  const configured = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

  if (configured) {
    await writeSupabase(inquiry);
    return;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("Production persistence is not configured");
  }

  devInquiries.push(inquiry);
  if (devInquiries.length > 100) devInquiries.shift();
}

export async function listInquiries(limit = 100) {
  const configured = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
  if (!configured) return [...devInquiries].reverse().slice(0, limit);
  const response = await supabaseRest(`inquiries?select=*&order=created_at.desc&limit=${Math.min(Math.max(limit, 1), 250)}`);
  const rows = await response.json() as Array<Record<string, unknown>>;
  return rows.map((row) => ({
    id: String(row.id),
    name: String(row.name ?? ""),
    email: String(row.email ?? ""),
    phone: String(row.phone ?? ""),
    service: String(row.service ?? ""),
    eventDate: String(row.event_date ?? ""),
    locationVenue: String(row.location_venue ?? ""),
    guestCount: String(row.guest_count ?? ""),
    investmentTier: String(row.investment_tier ?? "not-sure"),
    scopePreference: String(row.scope_preference ?? ""),
    message: String(row.message ?? ""),
    createdAt: String(row.created_at ?? ""),
  }));
}
