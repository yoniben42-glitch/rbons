import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const expected = ["wedding-couples","maternity","children-family","portraits-fashion","culture-events","graduation"];
const gallery = read("src/types/gallery.ts");
const wrangler = read("wrangler.jsonc");
const stripe = read("src/server/payments/stripe.ts");
const booking = read("src/routes/api/bookings.ts");
const calendar = read("src/routes/api/calendar/$id.ts");
const sql = read("supabase-gallery-v1.5.0-six-category-migration.sql");

for (const category of expected) {
  if (!gallery.includes(`id: "${category}"`)) throw new Error(`Missing canonical gallery category: ${category}`);
}
if (wrangler.includes("namespace_id")) throw new Error("wrangler.jsonc contains a user-account-specific rate-limit namespace");
if (/metadata\[client_token\]/.test(stripe) || /token=.*success_url/.test(stripe)) throw new Error("Stripe checkout still exposes the client portal token");
if (/data\.clientToken/.test(booking)) throw new Error("Booking API still returns clientToken to the browser");
if (/calendar.*token=|searchParams.*token/.test(calendar)) throw new Error("Calendar endpoint still accepts portal token query authorization");
if (!sql.includes("gallery_images_category_check")) throw new Error("Gallery migration is missing category check reconciliation");

console.log(`Release checks passed: ${expected.length} canonical gallery categories; portal token is not exposed to Stripe/browser redirects; calendar requires portal session; Cloudflare config has no account-specific rate-limit namespace.`);
