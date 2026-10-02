import { z } from "zod";
import type { BookingSettings } from "../data/booking-settings";
import { localDateTimeToUtc, weekdayForLocalDate } from "./timezone";

export const BOOKABLE_SERVICES = [
  "weddings",
  "portraits",
  "maternity-family",
  "editorial",
  "engagements",
  "commercial",
  "other",
] as const;

export const bookingSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255).transform((v) => v.toLowerCase()),
  phone: z.string().trim().max(40).optional().default(""),
  service: z.enum(BOOKABLE_SERVICES),
  packageId: z.string().trim().max(120).optional().default(""),
  paymentMethodId: z.string().trim().max(120).optional().default(""),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  location: z.string().trim().max(180).optional().default(""),
  guestCount: z.string().trim().max(32).optional().default(""),
  notes: z.string().trim().max(4000).optional().default(""),
  website_hp: z.string().max(120).optional().default(""),
});



export function isValidBookingDate(date: string, settings?: Pick<BookingSettings, "maxDaysAhead" | "timezone">) {
  const timezone = settings?.timezone ?? "America/New_York";
  const d = localDateTimeToUtc(date, "12:00", timezone);
  if (!d) return false;
  const today = new Date();
  const todayDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(today);
  const [todayYear, todayMonth, todayDay] = todayDate.split("-").map(Number);
  const start = Date.UTC(todayYear, todayMonth - 1, todayDay);
  const candidate = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  const diffDays = Math.floor((candidate - start) / 86_400_000);
  return diffDays >= 0 && (!settings || diffDays <= settings.maxDaysAhead);
}

export function isTimeWithinHours(time: string, hours: { open: string; close: string } | null, slotMinutes = 0) {
  if (!hours || !/^\d{2}:\d{2}$/.test(time)) return false;
  const toMinutes = (value: string) => Number(value.slice(0, 2)) * 60 + Number(value.slice(3, 5));
  const start = toMinutes(time);
  const open = toMinutes(hours.open);
  const close = toMinutes(hours.close);
  return start >= open && start + Math.max(0, slotMinutes) <= close;
}

export function isValidSlot(time: string, settings: BookingSettings, date: string) {
  const day = weekdayForLocalDate(date, settings.timezone);
  if (day === null) return false;
  const hours = settings.weeklyHours[String(day)] ?? null;
  return settings.slotTimes.includes(time) && isTimeWithinHours(time, hours, settings.slotMinutes);
}

export function isWithinAdvanceWindow(date: string, time: string, settings: Pick<BookingSettings, "timezone" | "minAdvanceHours">, now = new Date()) {
  const candidate = localDateTimeToUtc(date, time, settings.timezone);
  if (!candidate) return false;
  return candidate.getTime() - now.getTime() >= settings.minAdvanceHours * 60 * 60_000;
}

export function isWithinClientChangeWindow(date: string, time: string, settings: Pick<BookingSettings, "timezone" | "cancellationHours">, now = new Date()) {
  const candidate = localDateTimeToUtc(date, time, settings.timezone);
  if (!candidate) return false;
  return candidate.getTime() - now.getTime() >= settings.cancellationHours * 60 * 60_000;
}
