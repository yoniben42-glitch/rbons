# Inquiry Storage & Retrieval — Rbonsu Photography

## Where website inquiries are stored

The public contact form submits `POST /api/inquiries`. The server validates the request and writes the accepted inquiry to the Supabase Postgres table:

`public.inquiries`

The table is created by `supabase-schema.sql`. Row Level Security is enabled and direct `anon`/`authenticated` access is revoked; only the server-side Supabase service-role credential can write/read the table.

## How to see inquiries in Supabase

1. Open the Supabase project whose URL is configured in `SUPABASE_URL`.
2. Open **Table Editor**.
3. Open the `public` schema.
4. Select **inquiries**.
5. Sort by `created_at` descending.

A useful SQL query in **SQL Editor** is:

```sql
select
  id, name, email, phone, service, event_date, location_venue, guest_count,
  investment_tier, scope_preference, message, created_at
from public.inquiries
order by created_at desc
limit 100;
```

## Local verification

Create `.env` from `.env.example` and supply the server-only Supabase values. Never commit `.env`. Then run:

```bash
npm run verify:inquiry-storage
```

That performs a read-only check. To verify write + delete end-to-end, run:

```bash
npm run verify:inquiry-storage -- --write-test
```

The write test creates a clearly labeled temporary row and deletes it immediately. It does not test the public browser endpoint or Cloudflare deployment itself.

To inspect the latest inquiries from the terminal:

```bash
npm run inquiries:list
```

or:

```bash
npm run inquiries:list -- --limit=20
```

These scripts use the service-role key locally and are never exposed to the browser.

## What happens when Supabase is not configured

In local development only, if `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are missing, submissions are held in an in-memory array for development and disappear when the server restarts.

In production, missing Supabase configuration causes submission persistence to fail with HTTP 503 rather than silently losing an inquiry.
