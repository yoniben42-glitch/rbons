import { supabaseRest } from "./supabase";

export type WeeklyHours = Record<string, { open: string; close: string } | null>;

export type BookingSettings = {
  timezone: string;
  slotMinutes: number;
  slotTimes: string[];
  minAdvanceHours: number;
  cancellationHours: number;
  maxDaysAhead: number;
  weeklyHours: WeeklyHours;
};

const DEFAULTS: BookingSettings = {
  timezone: "America/New_York",
  slotMinutes: 50,
  slotTimes: ["09:00", "11:30", "14:00", "16:00"],
  minAdvanceHours: 12,
  cancellationHours: 12,
  maxDaysAhead: 365,
  weeklyHours: {
    "0": { open: "09:00", close: "17:00" },
    "1": { open: "09:00", close: "17:00" },
    "2": { open: "09:00", close: "17:00" },
    "3": { open: "09:00", close: "17:00" },
    "4": { open: "09:00", close: "17:00" },
    "5": { open: "09:00", close: "17:00" },
    "6": null,
  },
};

const HHMM = /^([01][0-9]|2[0-3]):[0-5][0-9]$/;

/**
 * Accepts only `{ "0".."6": { open: "HH:MM", close: "HH:MM" } | null }`.
 * Unknown keys and malformed values fall back to the supplied defaults so an
 * admin PATCH cannot persist arbitrary JSON into booking_settings.weekly_hours.
 */
export function sanitizeWeeklyHours(value: unknown, fallback: WeeklyHours = DEFAULTS.weeklyHours): WeeklyHours {
  if (!value || typeof value !== "object" || Array.isArray(value)) return fallback;
  const source = value as Record<string, unknown>;
  const result: WeeklyHours = {};
  for (const day of ["0", "1", "2", "3", "4", "5", "6"]) {
    const entry = source[day];
    if (entry === null) {
      result[day] = null;
      continue;
    }
    if (entry && typeof entry === "object" && !Array.isArray(entry)) {
      const { open, close } = entry as Record<string, unknown>;
      if (typeof open === "string" && typeof close === "string" && HHMM.test(open) && HHMM.test(close) && open < close) {
        result[day] = { open, close };
        continue;
      }
    }
    result[day] = fallback[day] ?? null;
  }
  return result;
}

function sanitize(raw: Record<string, unknown> | undefined): BookingSettings {
  const weekly = sanitizeWeeklyHours(raw?.weekly_hours);
  const slots = Array.isArray(raw?.slot_times) ? raw!.slot_times.map(String).filter((value) => /^\d{2}:\d{2}$/.test(value)) : DEFAULTS.slotTimes;
  return {
    timezone: typeof raw?.timezone === "string" && raw.timezone ? raw.timezone : DEFAULTS.timezone,
    slotMinutes: Number.isInteger(raw?.slot_minutes) ? Number(raw?.slot_minutes) : DEFAULTS.slotMinutes,
    slotTimes: slots.length ? slots : DEFAULTS.slotTimes,
    minAdvanceHours: Number.isInteger(raw?.min_advance_hours) ? Number(raw?.min_advance_hours) : DEFAULTS.minAdvanceHours,
    cancellationHours: Number.isInteger(raw?.cancellation_hours) ? Number(raw?.cancellation_hours) : DEFAULTS.cancellationHours,
    maxDaysAhead: Number.isInteger(raw?.max_days_ahead) ? Number(raw?.max_days_ahead) : DEFAULTS.maxDaysAhead,
    weeklyHours: weekly,
  };
}

export async function getBookingSettings(): Promise<BookingSettings> {
  try {
    const response = await supabaseRest("booking_settings?select=*&id=eq.singleton&limit=1", { method: "GET" });
    const rows = await response.json() as Record<string, unknown>[];
    return sanitize(rows[0]);
  } catch {
    return DEFAULTS;
  }
}

export async function updateBookingSettings(input: BookingSettings) {
  const body = {
    id: "singleton",
    timezone: input.timezone,
    slot_minutes: input.slotMinutes,
    slot_times: input.slotTimes,
    min_advance_hours: input.minAdvanceHours,
    cancellation_hours: input.cancellationHours,
    max_days_ahead: input.maxDaysAhead,
    weekly_hours: input.weeklyHours,
    updated_at: new Date().toISOString(),
  };
  await supabaseRest("booking_settings?id=eq.singleton", {
    method: "PATCH",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify(body),
  });
  return input;
}

export { DEFAULTS as DEFAULT_BOOKING_SETTINGS };
