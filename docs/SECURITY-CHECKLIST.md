# Production Security Checklist

## P0 — before public launch
- [ ] Cloudflare/WAF enabled and origin locked down.
- [ ] TLS 1.3 enforced; HTTP redirects to HTTPS.
- [ ] Production `APP_ORIGIN` set exactly.
- [ ] Supabase service-role key stored only in secret manager.
- [ ] `supabase-schema.sql` applied and RLS verified.
- [ ] No `.env` or secrets committed.
- [ ] CI blocks high/critical dependency vulnerabilities.
- [ ] Rate limiting configured at WAF and application layer.
- [ ] Backups/PITR tested with a restore drill.
- [ ] Error monitoring and alerting enabled.

## P1 — hardening
- [ ] Shared Redis rate limiter enabled for multi-instance production.
- [ ] Admin/client-portal authentication uses passwordless/passkeys + MFA.
- [ ] Privileged authorization enforced in server handlers, not just UI routes.
- [ ] SBOM generated on every release.
- [ ] DAST scan run against staging.
- [ ] Container image scanned and signed.
- [ ] Secret scanning enabled on every pull request.

## P2 — ongoing
- [ ] Monthly dependency patch cycle.
- [ ] Quarterly access review.
- [ ] Annual external penetration test.
- [ ] Incident-response exercise.
- [ ] Review WAF/rate-limit tuning as traffic grows.
- [ ] Consider a coordinated vulnerability disclosure / bug bounty program.
