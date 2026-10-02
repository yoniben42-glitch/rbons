# RBONSU Photography v1.5.0 — Deploy Now

## 1. Supabase

Use the existing bucket `rbonsu-photography` with these six folders only:
- `wedding-couples`
- `maternity`
- `children-family`
- `portraits-fashion`
- `culture-events`
- `graduation`

Run `supabase-gallery-v1.5.0-six-category-migration.sql` once in the Supabase SQL editor to reconcile database categories with the storage folders.

## 2. Cloudflare Worker Builds

This application is a **Cloudflare Worker**, not a Cloudflare Pages-only static site.

- Production branch: `main`
- Root directory: `/`
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Node: 22.x (see `.nvmrc`)

`wrangler.jsonc` already sets the Worker name, production origin, Supabase URL/bucket, Node compatibility, assets directory, and observability.

## 3. Worker secrets

Set these with `wrangler secret put NAME` or in Worker Variables & Secrets:

`SUPABASE_SERVICE_ROLE_KEY`
`ADMIN_DASHBOARD_TOKEN`
`AUDIT_HASH_SALT`
`RESEND_API_KEY` (optional)
`STRIPE_SECRET_KEY`
`STRIPE_WEBHOOK_SECRET`
`ADMIN_TOTP_SECRET` (optional but recommended)

Never put secrets in any `VITE_*` variable or GitHub.

## 4. Stripe

The application is already wired for hosted Stripe Checkout. Connect the Stripe account by providing the two Stripe secrets above and create a Stripe webhook pointing to:

`https://www.rbonsuphotography.com/api/stripe-webhook`

The database migration enables `pm_stripe` and selects it as the default payment method. Checkout completion is finalized from the webhook, not merely from the customer returning to the site.

## 5. Validation before go-live

```bash
npm ci
npm run verify:release
npm run integration:check
npm run security:scan
npm run typecheck
npm run build
npm run cf:dry-run
```

Then deploy:

```bash
npm run deploy
```

Finally verify the Worker, custom domain, booking flow, Stripe test payment, webhook delivery, admin login, and all six gallery filters.
