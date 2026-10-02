# Release audit — Rbonsu Photography v1.3.0

Date of audit: 2026-09-21
Toolchain used: Node v22.22.2, npm 10.9.7, Wrangler 4.135.0

Every result below was produced by running the command named. Nothing in this
document is inferred from reading code alone.

## Verified commands

| Command | Result |
| --- | --- |
| `npm ci --dry-run` | PASS |
| `npm ci` | PASS |
| `npm run typecheck` | PASS (exit 0) |
| `npm run lint` | PASS (0 errors, 6 warnings) |
| `npm test` | PASS (9/9) |
| `npm run security:scan` | PASS (134 files) |
| `npm audit --audit-level=high` | PASS (0 vulnerabilities) |
| `npm run integration:check` | PASS |
| `npm run build` | PASS (exit 0) |
| `npx wrangler deploy --dry-run` | PASS (34 assets, 3107 KiB / 512 KiB gzip) |
| `npx wrangler dev --local` + HTTP smoke tests | PASS (see below) |

## Local Worker runtime verification (workerd)

Served with `wrangler dev --local` on `http://127.0.0.1:8787`, with Supabase
deliberately pointed at an unreachable host so failure paths were exercised.

- `/`, `/work`, `/services`, `/about`, `/contact`, `/booking`, `/experience`,
  `/admin` — all HTTP 200 with server-rendered HTML.
- `/favicon.svg` — HTTP 200 from the assets binding.
- Security headers present on `/`: CSP, `X-Frame-Options: DENY`,
  `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`,
  COOP/CORP, HSTS.
- `/api/admin-bookings`, `/api/admin-gallery`, `/api/admin-inquiries`,
  `/api/admin-availability`, `/api/admin-payments` — HTTP 401 without a session,
  and 401 with a forged cookie value.
- `/api/admin-login` — 403 cross-origin, 401 wrong token, 200 + `HttpOnly;
  SameSite=Strict; Secure` cookie with the right token, 429 after 8 failures.
- `/api/bookings` — 403 missing/foreign origin, 415 wrong content type,
  400 past date, 400 invalid email.
- `/api/stripe-webhook` — 503 when no webhook secret is configured,
  400 for an unsigned payload. Never 200.
- Upstream outage paths return controlled 503 JSON, not framework 500s.

## What could not be verified here, and why

These are limitations of the audit environment, not known failures:

1. **Real Cloudflare deployment** (`wrangler deploy`) — requires a
   `CLOUDFLARE_API_TOKEN` and network access to `api.cloudflare.com`. Not
   performed. The dry run passes, which validates configuration, bundling and
   asset collection but not account-side deployment.
2. **Supabase behaviour** — no project URL or service-role key available. The
   schema, queries and RLS posture were reviewed statically; no query was run
   against a live database. Gallery upload, booking persistence, availability
   blocks and payment records are therefore unverified end to end.
3. **Stripe** — no API key. Checkout session creation and webhook delivery were
   not exercised against Stripe. Signature verification logic was reviewed and
   the unsigned/unconfigured paths were tested locally.
4. **Resend email** — no API key. No message was sent.
5. **Browser QA** — responsive breakpoints, accessibility and console-error
   checks were not run; Playwright browser binaries could not be downloaded in
   the audit environment. The API-level Playwright suite does run and passes.

## Defects found and fixed

1. **No Wrangler configuration existed.** `npx wrangler deploy` could not have
   worked. `wrangler.jsonc` added (entry, `nodejs_compat`, assets,
   `not_found_handling: none`, observability); `wrangler` added as a
   devDependency. The previous documentation claim that Workers Builds
   auto-generates this configuration was incorrect and has been corrected in
   `docs/CLOUDFLARE.md` and `docs/DEPLOYMENT.md`.
2. **`npm test` could not run** — `tests/security.spec.ts` imports
   `@playwright/test`, which was not a dependency. Added at 1.63.0.
3. **Typecheck failure and mass-assignment hole** in `PATCH
   /api/booking-settings`: `weeklyHours` was accepted as an arbitrary object and
   written to the database. `sanitizeWeeklyHours` now validates keys 0-6,
   `HH:MM` format and `open < close`.
4. **Five high-severity advisories** (sharp/libheif, undici) entered the tree
   through `nitro`, an unused devDependency whose `env-runner` transitive
   declares an optional `miniflare@^4` peer. `nitro` and the orphaned `nf3`
   override were removed. Build unaffected; audit back to zero.
5. **Timezone weekday bug**: `weekdayForLocalDate` derived the weekday from the
   UTC instant of local noon, which is off by one day for zones beyond +/-12:00
   (for example Pacific/Auckland in DST). Now derived from the date parts.
   `/api/booking-availability` had its own duplicate UTC calculation and now
   uses the shared helper.
6. **Double-booking race surfaced the wrong error.** The database guard
   (`bookings_active_slot_unique`) is correct, but a losing insert became a
   generic 503. `BookingSlotConflictError` now produces a 409 with an
   actionable message.
7. **Internal error text was returned to clients** by `/api/payment-balance`,
   `/api/admin-payments` (PATCH and DELETE) and `/api/admin-gallery` uploads —
   including raw Supabase, Stripe and storage responses. Added
   `PublicError`/`publicErrorMessage`; real causes now go only to `auditLog`.
8. **Unhandled 500s.** `/api/admin-bookings`, `/api/payment-methods`,
   `/api/booking-availability` and `/api/stripe-webhook` had no error handling,
   so any upstream outage produced a framework error envelope. All four now
   return controlled 503 responses.
9. **No brute-force protection on admin login.** Added 8 attempts per 15
   minutes per IP. The origin check now runs before the configuration check so a
   cross-origin caller cannot probe whether admin access is configured.
10. **Two lint errors** fixed without suppression: the control-character
    sanitiser is now an explicit code-point filter, and an empty catch is
    documented. `.wrangler/**` added to the ESLint ignore list.
11. **Toolchain pinning**: `.nvmrc` (22.22.2) and `engines`
    (`^20.19.0 || >=22.12.0`, matching Vite 8's own requirement) added.
    `deploy` no longer relies on `npx` resolving Wrangler at deploy time.
12. **`.env.example`** rewritten to separate public (`VITE_*`) variables from
    server-only configuration and server-only secrets, and to document the
    previously undocumented `VITE_SUPABASE_IMAGE_TRANSFORM` and
    `VITE_ENABLE_LEGACY_GALLERY_FALLBACK`.
13. **Test coverage** extended with `tests/api-security.spec.ts`: admin
    authorization, forged cookies, login origin and credential handling, booking
    validation, portal token rejection and webhook signature refusal.

## Known limitations carried into production

These are design characteristics of the application, not regressions. They were
left in place deliberately because changing them is a rewrite, not a fix.

- **Admin authentication is a single shared static token**
  (`ADMIN_DASHBOARD_TOKEN`) held verbatim in an `HttpOnly` cookie. There is no
  Supabase Auth, no `profiles` table, no per-user accounts, roles or audit
  trail of who acted. Rotating the token invalidates every session at once.
  Treat the token as a password, store it only as a Cloudflare secret, and
  rotate it at handover and whenever staff change.
- **Rate limiting is per-isolate and in memory.** On Workers each isolate keeps
  its own counters, so the limits above are a speed bump rather than a global
  control. A durable implementation needs a Durable Object or KV binding.
- **CSRF protection is origin-header based** for API routes (plus the framework
  CSRF middleware for server functions). This is sound for modern browsers but
  depends on the `Origin` header being present.
- **Payment confirmation differs by provider.** Stripe is confirmed
  automatically from cryptographically verified webhook events. The
  `payment_link` provider has no callback: those bookings stay `pending` until
  an admin marks them paid in the dashboard, which is recorded as
  `manual-confirmation`. Do not describe payment-link bookings as automatically
  confirmed.
- **The bundled static photo manifest hardcodes a specific Supabase project
  reference** (200 image URLs) and retains 200 Squarespace `sourceUrl` values
  for audit only. If the Supabase project changes, the fallback gallery breaks;
  set `VITE_ENABLE_LEGACY_GALLERY_FALLBACK=false` once the database gallery is
  populated.
- **Unknown URLs render the not-found page with HTTP 200**, not 404. This is a
  soft-404 and affects search engines only; it was left unchanged to avoid
  altering routing behaviour late in the release.
- **Six ESLint warnings remain**: three `react-refresh/only-export-components`
  (structural), one `react-hooks/exhaustive-deps` in `BookingPage` (changing it
  alters effect behaviour), one unused local, one related export warning.

## Before going live

1. Create the Supabase project and run `supabase-schema.sql` in the SQL editor.
2. Set Worker secrets: `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_DASHBOARD_TOKEN`,
   `AUDIT_HASH_SALT`, and if payments are enabled `STRIPE_SECRET_KEY` and
   `STRIPE_WEBHOOK_SECRET`, plus `RESEND_API_KEY` for email.
3. Set vars: `SUPABASE_URL`, `APP_ORIGIN` (the live https origin),
   `SUPABASE_STORAGE_BUCKET`, `RESEND_FROM_EMAIL`,
   `STUDIO_NOTIFICATION_EMAIL`.
4. Point the Stripe webhook endpoint at `https://<origin>/api/stripe-webhook`
   and confirm the signing secret matches `STRIPE_WEBHOOK_SECRET`.
5. `npm run cf:dry-run`, then `npx wrangler deploy`.
6. `npm run verify:cloudflare -- https://<deployed-url>`, then exercise a real
   booking, an admin login, and a gallery upload against the live deployment.
