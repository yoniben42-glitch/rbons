# Cloudflare Workers deployment

This repository uses TanStack Start and ships an explicit Wrangler configuration
(`wrangler.jsonc`) so the Worker entry, asset directory, runtime flags, and public
non-secret variables are deterministic in production.

## Workers Builds

Use:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Node.js version: 22.x (see `.nvmrc`; `engines` requires `^20.19.0 || >=22.12.0`)
- Production branch: `main`
- Root directory: `/`
- Non-production branch builds: enabled
- Cloudflare Access: disabled for the public site

## Worker configuration

`wrangler.jsonc` defines:

| Key | Value | Why |
| --- | --- | --- |
| `main` | `dist/server/server.js` | Current build target used by this repository; the compiled server entry exports the Worker fetch handler. |
| `assets.directory` | `dist/client` | Hashed client bundles, `favicon.svg`, `og.jpg`. |
| `assets.not_found_handling` | `none` | Unmatched paths fall through to the Worker so SSR routes and `/api/*` are handled by the router instead of returning a static 404. |
| `compatibility_flags` | `nodejs_compat` | The SSR bundle imports `node:async_hooks`; server code uses `node:crypto`; `process.env` is backed by Worker vars and secrets. |
| `observability.enabled` | `true` | Worker logs for post-deploy verification. |

Verify the configuration without deploying:

```bash
npm run cf:dry-run     # npm run build && wrangler deploy --dry-run
```

Run the real Worker runtime locally (workerd, using `.dev.vars` for secrets):

```bash
npm run dev:cloudflare
```

## Before production

The repository already defines these non-secret runtime values in `wrangler.jsonc`:

- `SUPABASE_URL`
- `SUPABASE_STORAGE_BUCKET`
- `APP_ORIGIN`

Set these Worker secrets under **Variables & Secrets**:

For automatic Stripe Checkout, also add:

- `STRIPE_SECRET_KEY` (secret)
- `STRIPE_WEBHOOK_SECRET` (secret)

Optional:

- `RESEND_API_KEY` (secret)
- `RESEND_FROM_EMAIL`
- `STUDIO_NOTIFICATION_EMAIL`

Never commit `.env` or real secret values.

## Domain

Keep your domain registration with your existing registrar. Move DNS management to Cloudflare by changing the registrar nameservers to the nameservers Cloudflare assigns to your zone. Then attach `rbonsuphotography.com` and `www.rbonsuphotography.com` as Worker custom domains.
