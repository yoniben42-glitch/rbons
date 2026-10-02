#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";

function loadDotEnv() {
  try {
    const text = readFileSync(".env", "utf8");
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
      const index = trimmed.indexOf("=");
      const key = trimmed.slice(0, index).trim();
      let value = trimmed.slice(index + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = value;
    }
  } catch {
    // Shell/CI environment variables may already be present.
  }
}

loadDotEnv();

const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key || key === "replace-me") {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  console.error("Create .env from .env.example or export the variables in your shell.");
  process.exit(2);
}

const headers = {
  apikey: key,
  Authorization: `Bearer ${key}`,
};

async function supabase(path, init = {}) {
  const response = await fetch(`${url}${path}`, {
    ...init,
    headers: {
      ...headers,
      ...(init.headers ?? {}),
    },
  });
  const body = await response.text();
  if (!response.ok) {
    throw new Error(`Supabase HTTP ${response.status}: ${body.slice(0, 300)}`);
  }
  return body;
}

try {
  const rows = JSON.parse(
    await supabase("/rest/v1/inquiries?select=id,created_at&order=created_at.desc&limit=1"),
  );
  console.log("✓ Supabase inquiry table is reachable with the server credential.");
  console.log(`✓ Storage location: ${new URL(url).origin} → public.inquiries`);
  console.log(`✓ Latest-row check: ${rows.length ? "at least 1 inquiry exists" : "table is currently empty"}`);

  if (!process.argv.includes("--write-test")) {
    console.log("✓ Read-only verification complete. No database rows were created or deleted.");
    process.exit(0);
  }

  const id = `storage-check-${randomUUID()}`;
  const testRow = {
    id,
    name: "Storage Verification",
    email: "storage-verification@example.invalid",
    phone: "",
    service: "other",
    event_date: "",
    location_venue: "",
    guest_count: "",
    investment_tier: "not-sure",
    scope_preference: "verification",
    message: "Automated storage verification test; this temporary row must be deleted.",
    created_at: new Date().toISOString(),
    ip_hash: null,
  };

  await supabase("/rest/v1/inquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify(testRow),
  });
  console.log("✓ Write test succeeded.");

  await supabase(`/rest/v1/inquiries?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: { Prefer: "return=minimal" },
  });
  console.log("✓ Write-test row was deleted.");
  console.log("✓ End-to-end persistence verification complete.");
} catch (error) {
  console.error("✗ Inquiry storage verification failed.");
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
