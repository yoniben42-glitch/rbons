# RBONSU Photography — v1.4.1 Remediation Summary

This documents the fixes applied against the v1.4.0 Security & Deployment
Readiness Audit (68/100, DO NOT DEPLOY under an 85/100 gate). Original
finding IDs (SEC-001 … SEC-016) are preserved for traceability.

## High findings — fixed

**SEC-001 — Portal bearer token in URL.** The emailed portal link still
carries a token in its URL (unavoidable for a one-click emailed link), but
that token can now only be *exchanged* — once, on page load — for a
short-lived (2h), HttpOnly, `SameSite=Strict` session cookie
(`booking_portal_sessions` table, new). All booking reads and all
state-changing actions (cancel, reschedule, pay balance) are authorized
against that session, never against a token resent in a request body. The
client strips the token from the visible URL immediately after exchange
(`history.replaceState`). Stripe's balance-payment redirect no longer
carries the token at all — the portal session cookie survives the round
trip — and the token is no longer sent to Stripe as checkout metadata.
Files: `src/server/security/portal-session.ts` (new),
`src/routes/api/booking-portal.ts`, `src/routes/api/payment-balance.ts`,
`src/server/payments/stripe.ts`, `src/pages/BookingPage.tsx`.

**SEC-002 — Unthrottled N+1 booking-availability endpoint.** The endpoint
now issues two queries per request (all overlapping availability blocks,
all booked slot times for the date) instead of two queries per slot
(previously up to ~48), and is rate-limited (60 req / 10 min / IP).
Files: `src/server/data/availability.ts`, `src/server/data/bookings.ts`,
`src/routes/api/booking-availability.ts`.

**SEC-003 — Shared admin master token as session credential.** Admin login
now issues an independent, revocable session: a freshly generated random
bearer token, stored in an HttpOnly cookie, whose SHA-256 hash (never the
value itself) is persisted in a new `admin_sessions` table alongside a hash
of the master token *at creation time* — rotating `ADMIN_DASHBOARD_TOKEN`
invalidates every open session automatically. `POST /api/admin-logout` now
explicitly revokes the session server-side. Optional TOTP MFA
(`ADMIN_TOTP_SECRET`) is available and recommended for production; the HOTP
core and Base32 codec were verified against RFC 4226/6238 test vectors.
Files: `src/server/security/admin.ts`, `src/server/security/totp.ts` (new),
`src/routes/api/admin-login.ts`, `src/routes/api/admin-logout.ts`,
`src/pages/AdminPage.tsx`, `scripts/generate-admin-secret.mjs`.

## Medium findings — fixed

**SEC-004 — Image upload had no dimension/pixel validation or metadata
stripping.** Pixel dimensions are now parsed directly from each file's own
container header (JPEG SOF / PNG IHDR / WebP VP8 family) — never trusted
from client-supplied form fields — and rejected above 12,000px per side or
40 megapixels total. EXIF/XMP/comment segments are stripped from JPEG, PNG,
and WebP before the file is written to the public bucket. This is
header-level validation and metadata stripping, not a full pixel
decode/re-encode; see "Known residual scope" below.
File: `src/server/security/image-processing.ts` (new), wired into
`src/routes/api/admin-gallery.ts`.

**SEC-005 — Payment-link HTTPS enforcement depended on `NODE_ENV`.**
`NODE_ENV` is not set on the deployed Worker, so this was not a real
production boundary. HTTPS is now required unconditionally, with the only
exception being `http://localhost`/`127.0.0.1` for local development.
File: `src/routes/api/admin-payments.ts`.

**SEC-006 — booking-settings PATCH lacked Origin validation.** Added the
same `originMatchesAdminRequest()` check used by other admin mutations.
File: `src/routes/api/booking-settings.ts`.

**SEC-007 — Portal tokens had no independent expiry/revocation model.**
Resolved as part of SEC-001's session model: the emailed token is now only
a credential for creating a session, and the session itself expires after
2 hours.

## Low / Informational findings — fixed

- **SEC-008** — CSP's `img-src`/`connect-src` are now resolved from the
  configured `SUPABASE_URL` at request time instead of the blanket
  `https:` scheme; `media-src` scoped to `'self'` (no video/audio is
  served). `'unsafe-inline'` in `script-src` is an intentional, documented
  tradeoff for TanStack Start SSR hydration (see `docs/CSP-NOTE.md`) and
  was left as-is.
- **SEC-009** — addressed by SEC-004's EXIF stripping.
- **SEC-010** — gallery upload now deletes the just-uploaded storage object
  if the database insert fails, instead of leaving it orphaned.
- **SEC-011** — replaced a 300-row scan-and-`.find()` with a direct,
  indexed query (`getPendingPaymentTransactionByBookingId`).
- **SEC-012 / SEC-013** — `formatMoney` and `escapeHtml` were each
  implemented identically three/two times; consolidated into
  `src/lib/money.ts` and `src/server/security/html.ts`.
- **SEC-014** — removed confirmed-dead code: `HERO_ASSETS`/
  `getHeroCandidates`, unused design tokens (`typography`, `spacing`,
  `containers`, `breakpoints`), unused `H1`/`H2`/`H3` components, and the
  unused `BookingInput` type.
- **SEC-015** — removed `@types/pg` and `playwright` from
  `package.json` (no `pg` usage; `@playwright/test` already provides what
  `npm test` needs).
- **SEC-016** — deleted `startup.sh` (superseded by the Cloudflare Workers
  deployment path).
- **Gallery fallback logic bug** — fixed: the static manifest fallback now
  only renders when the database gallery is empty, matching its documented
  intent, instead of always merging in behind a non-empty dynamic gallery.

## New database objects

Two tables were added to `supabase-schema.sql` (run it again on an existing
project to pick these up — it's idempotent):

- `admin_sessions` — admin dashboard sessions (see SEC-003).
- `booking_portal_sessions` — client portal sessions (see SEC-001).

Both have RLS enabled with all client grants revoked; only the
service-role key (server-only) can read/write them.

## New/changed environment variables

- `ADMIN_TOTP_SECRET` (new, optional but recommended) — see
  `.env.example` and `scripts/generate-admin-secret.mjs --totp`.
- `NODE_ENV` is no longer read anywhere in a security-relevant path.

## Verification performed in this environment

- `npm install` — clean, 0 vulnerabilities
- `npx tsc --noEmit` — clean
- `npx eslint .` — clean
- `npm run build` — clean (no Rollup warnings)
- `node scripts/security-scan.mjs` — PASS (145 files)
- `node scripts/integration-check.mjs` — PASS
- `npm audit --package-lock-only --audit-level=high` — 0 vulnerabilities
- `npm ci --dry-run` — installable
- `npx wrangler deploy --dry-run` — succeeds; bindings resolve
- TOTP HOTP core and Base32 codec independently checked against RFC
  4226 Appendix D and RFC 6238 test vectors

## Verification NOT performed (needs your live environment)

Same category as the original audit's gaps, for the same reason — no live
Supabase project or Stripe test account is available in this environment:

- Live Supabase RLS/storage behavior against `anon`/`authenticated` roles
- Full Playwright browser suite against a running instance
- Stripe test-mode checkout and webhook end-to-end flow
- Live Cloudflare WAF/rate-limit-binding/DNS/TLS configuration

Run these once against your real project before go-live.

## Known residual scope (disclosed, not hidden)

- **SEC-004**: header-level dimension validation and metadata stripping
  were implemented without adding an image codec dependency. This does not
  protect against a decoder-level exploit in a *viewer's own browser*
  triggered by a malformed-but-dimension-valid file. Closing that
  completely would mean adding a real decode/re-encode pass (e.g. a WASM
  codec such as `@jsquash/jpeg`/`png`/`webp`), which was intentionally left
  out to avoid growing the Worker bundle without a deliberate decision from
  the owner.
- **Deposit checkout redirect** (initial booking creation, before any
  portal session exists) still carries the client token in its Stripe
  return URL, because the browser has no other way to reload the booking
  after that specific redirect. This is the one remaining case of the
  SEC-001 pattern; it's a single-use, immediately-after-issuance exposure
  rather than the standing, repeatedly-reused exposure the audit flagged,
  but it is not zero.
