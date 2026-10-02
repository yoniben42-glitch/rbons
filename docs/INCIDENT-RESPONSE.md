# Incident Response Runbook

## Suspected credential or secret compromise

1. Disable the affected credential and rotate it in the provider secret manager.
2. Rotate any downstream credentials that could have been accessed through it.
3. Review application, WAF, Supabase, and deployment logs for the exposure window.
4. Revoke affected sessions/admin accounts.
5. Identify impacted records and preserve evidence.
6. Patch the root cause, run security tests, and redeploy through CI.
7. Document root cause, indicators, containment, recovery, and preventive actions.

## Suspicious inquiry abuse

Tune WAF rules for `/api/inquiries`, increase challenge/rate-limit sensitivity, and preserve request IDs and event timestamps. Do not log full message bodies or email contents for routine security telemetry.
