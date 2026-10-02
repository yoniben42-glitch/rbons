# RBONSU Photography — V1.5.0 Release Readiness

This release is based on the uploaded v1.4.2 gallery-consistency project and keeps the user's current Supabase bucket as the live gallery source.

## Canonical Supabase gallery structure

The public gallery recognizes exactly these six folders:

- `wedding-couples`
- `maternity`
- `children-family`
- `portraits-fashion`
- `culture-events`
- `graduation`

The server gallery scanner no longer scans historical folders. Old database rows whose storage path is outside these six folders are unpublished rather than silently remapped into a different live folder.

## Payment hardening

Stripe Checkout no longer receives the customer's long-lived portal bearer token in metadata or success/cancel URLs. Booking creation issues a short-lived HttpOnly portal session cookie in the browser. The emailed portal link still contains the one-time bearer token used for the initial exchange.

Stripe Checkout creation uses an idempotency key derived from the payment transaction id. Webhook handling accepts successful synchronous and asynchronous completion events and records asynchronous payment failures.

The built-in `pm_stripe` method is enabled by the supplied Supabase migration; the application still requires the studio's Stripe secrets before a public payment can start.

## Cloudflare

`wrangler.jsonc` no longer contains an account-specific Rate Limiting namespace id. This prevents deployment from failing because a hard-coded binding belongs to a different Cloudflare account. The application retains its existing server-side rate-limit fallback.

## Required one-time production configuration

The code package intentionally does not include secrets. Set these with Cloudflare secrets:

- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_DASHBOARD_TOKEN`
- `AUDIT_HASH_SALT`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `RESEND_API_KEY`

Optional admin MFA: `ADMIN_TOTP_SECRET`.

Run the SQL migration file `supabase-gallery-v1.5.0-six-category-migration.sql` once in the Supabase SQL editor.

Configure the Stripe webhook endpoint at:

`https://www.rbonsuphotography.com/api/stripe-webhook`

The application expects Checkout events for successful completion, asynchronous success/failure, and expiration.

## Deployment

```text
npm ci
npm run verify:release
npm run build
npm run cf:dry-run
npm run deploy
```

The repository has not been built inside this delivery environment because dependency installation attempted to reach the npm registry and timed out. The release package therefore does not claim a locally executed Vite/TypeScript/Playwright production build. The source-level release checks are included as `npm run verify:release`.
