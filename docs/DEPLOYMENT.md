# Production deployment — Rbonsu Photography

## Target architecture

`GitHub → Cloudflare Workers (TanStack Start SSR/API) → Supabase Postgres + Storage`

Optional email delivery uses Resend. The public edge is Cloudflare Workers; Supabase is the application persistence layer.

## Cloudflare Workers Builds

Recommended settings:

- **Production branch:** `main`
- **Build command:** `npm run build`
- **Deploy command:** `npx wrangler deploy`
- **Root directory:** `/`
- **Builds for non-production branches:** enabled
- **Cloudflare Access:** disabled for the public production site

`wrangler.jsonc` is committed and is required: `wrangler deploy` will not run
without `main` and `compatibility_date`. See `docs/CLOUDFLARE.md` for what each
key does. Use Node 22.x (`.nvmrc`).

## Runtime variables / secrets

Set these in Cloudflare Worker **Variables & Secrets**. Never commit production values.

Required:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` (secret)
- `SUPABASE_STORAGE_BUCKET` (normally `rbonsu-photography`)
- `AUDIT_HASH_SALT` (secret)
- `ADMIN_DASHBOARD_TOKEN` (secret)
- `APP_ORIGIN`

Strongly recommended:

- `ADMIN_TOTP_SECRET` (secret) — enables authenticator-app MFA on admin login; see `scripts/generate-admin-secret.mjs --totp` and docs/SECURITY.md.

If Stripe is enabled in Admin → Payments, also configure:

- `STRIPE_SECRET_KEY` (secret)
- `STRIPE_WEBHOOK_SECRET` (secret)

Optional email delivery:

- `RESEND_API_KEY` (secret)
- `RESEND_FROM_EMAIL`
- `STUDIO_NOTIFICATION_EMAIL`

## Supabase setup

Run `supabase-schema.sql` in the Supabase SQL Editor. This creates the inquiry, booking, availability, and gallery tables, the admin and booking-portal session tables, and the `rbonsu-photography` storage bucket.

The service-role key is used only on the server. It must never be exposed through a browser-visible `VITE_*` variable.

## Domain

You do not need to transfer domain registration away from the existing registrar. Move DNS management to Cloudflare by using the nameservers assigned to the Cloudflare zone, then attach both:

- `rbonsuphotography.com`
- `www.rbonsuphotography.com`

to the Worker as custom domains.

## Local verification

```bash
npm ci
npm run integration:check
npm run typecheck
npm run lint
npm run security:check
npm run build
npm test
npm run cf:dry-run
```

`npm run dev:cloudflare` serves the built Worker in the real workerd runtime on
`http://127.0.0.1:8787`, reading secrets from `.dev.vars`. This is the closest
local equivalent to production; `npm run dev` (Vite) does not use the Worker
runtime.

After deploying, smoke test the live Worker:

```bash
npm run verify:cloudflare -- https://<your-worker-url>
```

Then run the app locally and exercise booking, admin login, gallery upload, and the public category pages before production deployment.
