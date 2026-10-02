# Rbonsu Photography — Release Checklist

## Files that must exist at the repository root

```text
package.json
vite.config.ts
src/router.tsx
src/routeTree.gen.ts
supabase-schema.sql
```

## Cloudflare Workers Builds

```text
Production branch: main
Build command: npm run build
Deploy command: npx wrangler deploy
Root directory: /
Build non-production branches: ON
Cloudflare Access: OFF
Advanced settings: defaults
```

## Production Worker secrets

Set these in Cloudflare Worker Variables/Secrets:

```text
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_STORAGE_BUCKET=rbonsu-photography
AUDIT_HASH_SALT
ADMIN_DASHBOARD_TOKEN
APP_ORIGIN=https://www.rbonsuphotography.com
RESEND_API_KEY (optional)
RESEND_FROM_EMAIL (optional)
STUDIO_NOTIFICATION_EMAIL (optional)
```

Never commit `.env` or real secret values.

## Supabase inquiry table

The contact form writes to:

```text
public.inquiries
```

Verify with:

```bash
npm run verify:inquiry-storage
```

Temporary write/delete smoke test:

```bash
npm run verify:inquiry-storage -- --write-test
```

List recent inquiries:

```bash
npm run inquiries:list -- --limit=20
```

## Domain

Keep domain registration with the current registrar. Add the domain to Cloudflare DNS and attach `rbonsuphotography.com` and `www.rbonsuphotography.com` as Worker custom domains after the first successful Worker deployment.
