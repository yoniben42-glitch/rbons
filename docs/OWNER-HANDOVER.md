# RBONSU Photography — Owner Handover

## What the owner receives

- Standalone public photography website
- Private `/admin` studio dashboard
- Booking management with Stripe Checkout prepared; production payment activates when Stripe secrets/webhook are connected
- Supabase-backed gallery publishing
- Responsive desktop/tablet/mobile interface
- GitHub source repository
- Cloudflare Worker deployment
- Supabase database + Storage configuration

## Daily gallery workflow

1. Open `/admin`.
2. Enter the admin dashboard credential.
3. Open **Gallery**.
4. Select the correct gallery category.
5. Choose one or more new photographs.
6. Upload / publish.
7. Mark photographs as **Featured** when they should appear in the homepage featured/hero rotation.

The public site reads published gallery records from Supabase and updates without a code change.

## Booking workflow

1. Customer chooses a service.
2. Customer chooses a permitted date/time.
3. Customer submits contact details.
4. The studio receives the booking request when optional email delivery is configured.
5. Studio confirms, cancels, or reschedules from `/admin`.
6. Customer can use the private booking link for permitted cancellation/rescheduling and calendar download.

## Credentials and ownership

The owner should own/control:

- GitHub repository
- Cloudflare account and Worker
- Supabase organization/project
- Domain registrar/DNS
- Email sender domain/service

Keep the admin credential and Supabase service-role key in the deployment secret store. Never add them to GitHub.

## Gallery source of truth

The public gallery reads only the six canonical Supabase Storage folders: `wedding-couples`, `maternity`, `children-family`, `portraits-fashion`, `culture-events`, and `graduation`. Historical gallery rows outside those folders are retained for audit/history but are not published by the live gallery.
