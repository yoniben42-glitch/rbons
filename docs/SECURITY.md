# Rbonsu Photography — Security Baseline

## Architecture

Browser → Cloudflare/WAF → TLS-terminating reverse proxy → TanStack Start SSR/API → Supabase Postgres.

The browser receives only public data. Supabase service-role credentials and Resend API credentials stay server-side. Sensitive mutations go through server routes and are validated at the data boundary.

TanStack Start supports global request middleware for security headers and CSRF protection, and server routes are appropriate for externally callable HTTP APIs. See the official framework guidance: https://tanstack.com/start/latest/docs/framework/react/guide/middleware and https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

## Controls implemented

- Strict Zod validation and unknown-field rejection on the inquiry endpoint.
- JSON-only request enforcement and 24 KiB body cap.
- Origin verification on state-changing public API requests.
- Honeypot bot trap.
- Per-IP in-memory rate limit for local/dev; production should use Cloudflare/WAF plus a shared Redis limiter for multi-instance deployments.
- No-store responses for inquiry mutations.
- Structured audit logs without logging message bodies, credentials, cookies, or API keys.
- Security headers: HSTS (production), CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, COOP/CORP, DNS prefetch disabled.
- Secrets only via runtime environment variables; `.env` is git-ignored.
- Supabase RLS enabled and all direct client grants revoked.
- Non-root container, read-only filesystem, dropped Linux capabilities, and no-new-privileges.

## Authentication / authorization

The public portfolio and inquiry submission do not require an end-user account, which follows data minimization.

The studio admin dashboard is authenticated with `ADMIN_DASHBOARD_TOKEN` (a single high-entropy shared credential) plus optional TOTP MFA (`ADMIN_TOTP_SECRET`). Logging in exchanges these for an independent, revocable session:

- The session bearer value stored in the browser's HttpOnly cookie is a freshly generated random token — never the master credential itself. Only its SHA-256 hash is persisted, in the `admin_sessions` table.
- Each session is also bound to a hash of `ADMIN_DASHBOARD_TOKEN` *as it existed at session creation*. Rotating the token therefore invalidates every open session immediately, with no separate revocation sweep needed.
- `POST /api/admin-logout` explicitly revokes the current session server-side (not just a cookie clear).
- Sessions expire after 8 hours regardless of activity.
- Enable `ADMIN_TOTP_SECRET` (see `scripts/generate-admin-secret.mjs --totp`) to require a 6-digit authenticator code at login in addition to the master token. Strongly recommended for production; the app runs without it for easier initial setup, but a compromised `ADMIN_DASHBOARD_TOKEN` alone grants full admin access when MFA isn't enabled.

The client booking portal (accessed via the link emailed after a booking) follows the same pattern: the emailed URL carries a long-lived bearer token, but that token is only ever used to *exchange* for a short-lived (2 hour), HttpOnly-cookie-bound portal session (`booking_portal_sessions` table) on page load. All booking reads and all state-changing portal actions (cancel, reschedule, pay balance) are authorized against that session, never against the token resent in a request. The client strips the token from the visible URL immediately after the exchange.

Any future addition of end-user accounts (not just the single shared admin credential) should move to Supabase Auth with passwordless email or passkeys where supported, refresh rotation, and server-side authorization on every protected endpoint.

UI route guards are not authorization boundaries; enforce permissions in server middleware/handlers.

## Threat model summary

| Threat | Control |
|---|---|
| XSS | React escaping + CSP + no raw HTML sinks |
| SQL injection | Supabase REST/parameterized database interface; no string-built SQL |
| CSRF | Origin checks + TanStack CSRF for server functions |
| Credential attacks | No public password login; MFA/passwordless for privileged users |
| Abuse/spam | WAF + rate limiting + honeypot + body limits |
| Session theft | Secure HttpOnly SameSite=Strict cookies bound to server-side revocable sessions (admin and booking portal); TLS 1.3 at edge |
| Secret leakage | Server-only env vars; no secret values in client code or git |
| Supply-chain attacks | `npm ci`, lockfile, audit/SBOM/Dependabot or Renovate |
| Container escape | Non-root, read-only root FS, drop capabilities, no-new-privileges |
| Data exfiltration | RLS, least privilege, minimal data collection, restricted grants |

## Production deployment

1. Put the application behind Cloudflare or an equivalent WAF/reverse proxy. Only expose the proxy publicly.
2. Enforce TLS 1.3 at the edge and redirect HTTP to HTTPS. Do not expose the origin directly.
3. Set `APP_ORIGIN` to the exact production origin, e.g. `https://www.rbonsuphotography.com`.
4. Store `SUPABASE_SERVICE_ROLE_KEY`, `AUDIT_HASH_SALT`, and any email/API keys in the platform secret store.
5. Use Supabase PITR/backups and audit logging appropriate to the plan and workload.
6. Add a shared Redis limiter (e.g. Upstash Redis) when running more than one application instance. The current in-memory limiter is intentionally not a distributed security control.
7. Run `npm audit --audit-level=high`, dependency-review, secret scanning, SAST, and image scanning in CI.
8. Generate and archive an SBOM (CycloneDX or SPDX) for every release.
9. Monitor 4xx/5xx rates, rate-limit events, auth failures, anomalous admin actions, and database permission errors.

## Incident response

- Revoke/rotate compromised secrets immediately.
- Disable affected admin accounts and sessions.
- Preserve structured logs and timestamps.
- Identify affected records and scope of access.
- Patch and redeploy through CI; do not hot-edit production containers.
- Review WAF and application logs for the initial access path.
- Perform a post-incident root-cause review and update the threat model.
