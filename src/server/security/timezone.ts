function offsetMinutesAt(instant: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "shortOffset",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(instant);
  const zone = parts.find((part) => part.type === "timeZoneName")?.value ?? "GMT";
  const match = /^GMT(?:(?<sign>[+-])(?<hours>\d{1,2})(?::(?<minutes>\d{2}))?)?$/.exec(zone);
  if (!match) return null;
  const sign = match.groups?.sign === "-" ? -1 : 1;
  return sign * ((Number(match.groups?.hours ?? 0) * 60) + Number(match.groups?.minutes ?? 0));
}

function localParts(instant: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(instant);
  return Object.fromEntries(parts.map((part) => [part.type, part.value]));
}

export function localDateTimeToUtc(date: string, time: string, timeZone: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) return null;
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  if (![year, month, day, hour, minute].every(Number.isFinite)) return null;
  const naiveUtc = Date.UTC(year, month - 1, day, hour, minute, 0);
  let candidate = new Date(naiveUtc);

  try {
    // Iterate because the UTC offset can change during daylight-saving transitions.
    for (let i = 0; i < 4; i += 1) {
      const offset = offsetMinutesAt(candidate, timeZone);
      if (offset === null) return null;
      const next = new Date(naiveUtc - offset * 60_000);
      if (next.getTime() === candidate.getTime()) break;
      candidate = next;
    }

    const values = localParts(candidate, timeZone);
    if (`${values.year}-${values.month}-${values.day}T${values.hour}:${values.minute}` !== `${date}T${time}`) return null;
    return candidate;
  } catch {
    return null;
  }
}

/**
 * Weekday (0 = Sunday) for a calendar date as written in `timeZone`.
 *
 * Derived from the date parts directly. Deriving it from the UTC instant of
 * local noon is wrong for zones beyond +/-12:00 (for example Pacific/Auckland
 * in DST at +13:00), where local noon falls on the previous UTC day.
 */
export function weekdayForLocalDate(date: string, timeZone: string): number | null {
  if (!localDateTimeToUtc(date, "12:00", timeZone)) return null;
  const [year, month, day] = date.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay();
}
