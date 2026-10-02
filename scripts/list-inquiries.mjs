#!/usr/bin/env node

import { readFileSync } from "node:fs";

function loadDotEnv() {
  try {
    const text = readFileSync(".env", "utf8");
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
      const index = trimmed.indexOf("=");
      const key = trimmed.slice(0, index).trim();
      let value = trimmed.slice(index + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
      if (!(key in process.env)) process.env[key] = value;
    }
  } catch {
    // No .env file present; rely on the ambient environment instead.
  }
}
loadDotEnv();

const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key || key === "replace-me") {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(2);
}

const limitArg = Number(process.argv.find((v) => v.startsWith("--limit="))?.split("=")[1] ?? "50");
const limit = Number.isFinite(limitArg) ? Math.min(100, Math.max(1, Math.floor(limitArg))) : 50;

const response = await fetch(
  `${url}/rest/v1/inquiries?select=id,name,email,phone,service,event_date,location_venue,guest_count,investment_tier,scope_preference,message,created_at&order=created_at.desc&limit=${limit}`,
  { headers: { apikey: key, Authorization: `Bearer ${key}` } },
);

if (!response.ok) {
  console.error(`Supabase returned HTTP ${response.status}: ${(await response.text()).slice(0, 300)}`);
  process.exit(1);
}

const rows = await response.json();
console.log(`\nRbonsu Photography inquiries — ${rows.length} row(s)\n`);
for (const row of rows) {
  console.log(`ID: ${row.id}`);
  console.log(`Date: ${row.created_at}`);
  console.log(`Name: ${row.name}`);
  console.log(`Email: ${row.email}`);
  console.log(`Phone: ${row.phone || "—"}`);
  console.log(`Service: ${row.service}`);
  console.log(`Event date: ${row.event_date || "—"}`);
  console.log(`Location/Venue: ${row.location_venue || "—"}`);
  console.log(`Guests: ${row.guest_count || "—"}`);
  console.log(`Investment: ${row.investment_tier}`);
  console.log(`Scope: ${row.scope_preference || "—"}`);
  console.log(`Message: ${row.message}`);
  console.log("─".repeat(72));
}
