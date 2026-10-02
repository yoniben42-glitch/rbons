import { supabaseRest } from "./supabase";
import { localDateTimeToUtc } from "../security/timezone";

export async function listAvailabilityBlocks(limit = 100) {
  const response = await supabaseRest(`availability_blocks?select=*&order=starts_at.asc&limit=${Math.min(limit, 250)}`, { method: "GET" });
  return await response.json() as Array<{ id: number; starts_at: string; ends_at: string; reason: string; created_at: string }>;
}

export async function addAvailabilityBlock(input: { startsAt: string; endsAt: string; reason: string }) {
  await supabaseRest("availability_blocks", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ starts_at: input.startsAt, ends_at: input.endsAt, reason: input.reason }),
  });
}

export async function deleteAvailabilityBlock(id: number) {
  await supabaseRest(`availability_blocks?id=eq.${encodeURIComponent(String(id))}`, { method: "DELETE" });
}

export async function availabilityBlockContains(date: string, time: string, timezone: string, slotMinutes = 50) {
  const startDate = localDateTimeToUtc(date, time, timezone);
  if (!startDate) return true;
  const endDate = new Date(startDate.getTime() + slotMinutes * 60_000);
  const response = await supabaseRest(
    `availability_blocks?select=id&starts_at=lt.${encodeURIComponent(endDate.toISOString())}&ends_at=gt.${encodeURIComponent(startDate.toISOString())}&limit=1`,
    { method: "GET" },
  );
  const rows = await response.json() as Array<{ id: number }>;
  return rows.length > 0;
}

/**
 * Fetches every availability block that could possibly overlap the given
 * calendar day (in `timezone`), in a single request, so callers can compute
 * per-slot availability in memory instead of issuing one query per slot.
 * The day's UTC window is padded by a day on each side to safely absorb any
 * timezone offset, then each candidate slot is checked precisely in memory.
 */
export async function listAvailabilityBlocksForDay(date: string, timezone: string) {
  const dayStart = localDateTimeToUtc(date, "00:00", timezone);
  if (!dayStart) return [];
  const paddedStart = new Date(dayStart.getTime() - 24 * 60 * 60_000);
  const paddedEnd = new Date(dayStart.getTime() + 2 * 24 * 60 * 60_000);
  const response = await supabaseRest(
    `availability_blocks?select=id,starts_at,ends_at&starts_at=lt.${encodeURIComponent(paddedEnd.toISOString())}&ends_at=gt.${encodeURIComponent(paddedStart.toISOString())}`,
    { method: "GET" },
  );
  const rows = await response.json() as Array<{ id: number; starts_at: string; ends_at: string }>;
  return rows.map((row) => ({ startsAt: new Date(row.starts_at), endsAt: new Date(row.ends_at) }));
}

/** In-memory equivalent of `availabilityBlockContains`, given pre-fetched blocks for the day. */
export function slotOverlapsBlocks(
  date: string,
  time: string,
  timezone: string,
  slotMinutes: number,
  blocks: Array<{ startsAt: Date; endsAt: Date }>,
  localDateTimeToUtc: (date: string, time: string, timezone: string) => Date | null,
) {
  const startDate = localDateTimeToUtc(date, time, timezone);
  if (!startDate) return true;
  const endDate = new Date(startDate.getTime() + slotMinutes * 60_000);
  return blocks.some((block) => block.startsAt < endDate && block.endsAt > startDate);
}

