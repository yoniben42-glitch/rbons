export function bookingIcs(args: { id: string; name: string; service: string; date: string; time: string; location?: string }) {
  const local = `${args.date.replaceAll("-", "")}T${args.time.replace(":", "")}00`;
  const [y,m,d] = args.date.split("-").map(Number);
  const [hh,mm] = args.time.split(":").map(Number);
  const endDate = new Date(Date.UTC(y, m - 1, d, hh, mm) + 2 * 60 * 60 * 1000);
  const end = `${endDate.getUTCFullYear()}${String(endDate.getUTCMonth()+1).padStart(2,"0")}${String(endDate.getUTCDate()).padStart(2,"0")}T${String(endDate.getUTCHours()).padStart(2,"0")}${String(endDate.getUTCMinutes()).padStart(2,"0")}00`;
  const esc = (v: string) => v.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
  return [
    "BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//RBONSU Photography//Booking//EN","CALSCALE:GREGORIAN","BEGIN:VEVENT",
    `UID:${esc(args.id)}@rbonsuphotography.com`,`DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z")}`,
    `DTSTART;TZID=America/New_York:${local}`,`DTEND;TZID=America/New_York:${end}`,
    `SUMMARY:${esc(`RBONSU Photography — ${args.service}`)}`,`DESCRIPTION:${esc(`Photography booking for ${args.name}.`)}`,`LOCATION:${esc(args.location || "RBONSU Photography")}`,
    "END:VEVENT","END:VCALENDAR"
  ].join("\r\n");
}
export function base64(value: string) { return btoa(unescape(encodeURIComponent(value))); }
