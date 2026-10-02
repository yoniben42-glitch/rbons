# RBONSU Photography — Deployment Security Status

## Hardening completed in this release

- Removed local secret files and generated build/deployment state from the release package.
- Security scanner now detects local secret files and ignores generated Wrangler/build output.
- Admin image uploads validate JPEG/PNG/WebP file signatures in addition to MIME type and size.
- Admin mutations require same-origin requests in addition to admin authentication.
- Admin dashboard credentials must be at least 32 characters.
- Added Cloudflare Workers Rate Limiting API binding with an in-process fallback for local development.
- Production HSTS and Secure-cookie behavior are based on the actual HTTPS request.
- Docker build context excludes secrets, dependencies, generated output, and Wrangler state.
- Production build script now performs TypeScript checking after Vite build.
- Added a secure admin-secret generator script.

## Required production configuration

Before deployment, create these secrets with Wrangler:

```text
wrangler secret put SUPABASE_URL
wrangler secret put SUPABASE_SERVICE_ROLE_KEY
wrangler secret put ADMIN_DASHBOARD_TOKEN
wrangler secret put AUDIT_HASH_SALT
```

Add payment/email secrets only when those features are enabled:

```text
wrangler secret put STRIPE_SECRET_KEY
wrangler secret put STRIPE_WEBHOOK_SECRET
wrangler secret put RESEND_API_KEY
wrangler secret put RESEND_FROM_EMAIL
wrangler secret put STUDIO_NOTIFICATION_EMAIL
```

Generate the admin credential with:

```text
node scripts/generate-admin-secret.mjs
```

Never put the generated value in GitHub, `.env`, `.dev.vars`, or this ZIP.

## Remaining items requiring external account/deployment action

1. The Cloudflare rate-limit namespace identifier in `wrangler.jsonc` must be unique to the Cloudflare account. If Cloudflare reports a namespace collision, replace `731904281` with another positive integer unique to the account.
2. Configure Cloudflare WAF/rules at the zone level if available on the account.
3. Rotate any credentials that were ever present in an older project archive before production.
4. Configure Supabase Auth/MFA if the studio requires multi-factor administrator login. The existing shared-token login is retained in this release to avoid changing the established admin workflow.
5. Run the final `npm ci`, `npm audit --audit-level=high`, `npm run build`, `npm run test`, and `npm run cf:dry-run` from a networked deployment environment. This inspection environment could not complete a clean registry install.

## Security status

This release contains no production credentials. The source-level security scan passes. Deployment security still depends on correct Cloudflare and Supabase secret configuration and successful clean CI/Cloudflare verification.
