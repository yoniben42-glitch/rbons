create extension if not exists pgcrypto;

-- Inquiries -----------------------------------------------------------------
create table if not exists public.inquiries (
  id text primary key,
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (char_length(email) between 3 and 255),
  phone text not null default '' check (char_length(phone) <= 40),
  service text not null check (service in ('weddings','portraits','maternity-family','editorial','engagements','commercial','other')),
  event_date text not null default '' check (char_length(event_date) <= 32),
  location_venue text not null default '' check (char_length(location_venue) <= 180),
  guest_count text not null default '' check (char_length(guest_count) <= 32),
  investment_tier text not null default 'not-sure' check (investment_tier in ('3k-5k','5k-8k','8k-plus','custom','not-sure')),
  scope_preference text not null default '' check (char_length(scope_preference) <= 120),
  message text not null check (char_length(message) between 5 and 4000),
  ip_hash text,
  created_at timestamptz not null default now()
);
create index if not exists inquiries_created_idx on public.inquiries(created_at desc);
create index if not exists inquiries_service_idx on public.inquiries(service, created_at desc);
alter table public.inquiries enable row level security;
revoke all on public.inquiries from anon, authenticated;

-- Payment methods -----------------------------------------------------------
create table if not exists public.payment_methods (
  id text primary key,
  provider text not null check (provider in ('stripe','payment_link')),
  name text not null check (char_length(name) between 2 and 100),
  description text not null default '' check (char_length(description) <= 300),
  checkout_url text,
  enabled boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ((provider = 'stripe' and checkout_url is null) or (provider = 'payment_link' and checkout_url is not null))
);
create unique index if not exists payment_methods_name_idx on public.payment_methods(lower(name));
alter table public.payment_methods enable row level security;
revoke all on public.payment_methods from anon, authenticated;
insert into public.payment_methods (id, provider, name, description, checkout_url, enabled)
values ('pm_stripe', 'stripe', 'Card / Stripe', 'Secure hosted card checkout.', null, true)
on conflict (id) do nothing;

-- Payment settings ----------------------------------------------------------
create table if not exists public.payment_settings (
  id text primary key check (id = 'singleton'),
  currency text not null default 'USD' check (currency ~ '^[A-Z]{3}$'),
  payment_required boolean not null default true,
  deposit_cents integer not null default 10000 check (deposit_cents >= 0),
  payment_expiry_minutes integer not null default 30 check (payment_expiry_minutes between 30 and 1440),
  default_method_id text references public.payment_methods(id) on delete set null,
  updated_at timestamptz not null default now()
);
insert into public.payment_settings (id) values ('singleton') on conflict (id) do nothing;
alter table public.payment_settings enable row level security;
revoke all on public.payment_settings from anon, authenticated;

-- Bookings ------------------------------------------------------------------
create table if not exists public.bookings (
  id text primary key,
  client_token_hash text not null unique,
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (char_length(email) between 3 and 255),
  phone text not null default '' check (char_length(phone) <= 40),
  service text not null check (service in ('weddings','portraits','maternity-family','editorial','engagements','commercial','other')),
  package_id text not null default '' check (char_length(package_id) <= 120),
  booking_date date not null,
  booking_time text not null check (booking_time ~ '^([01][0-9]|2[0-3]):[0-5][0-9]$'),
  timezone text not null default 'America/New_York',
  location text not null default '' check (char_length(location) <= 180),
  guest_count text not null default '' check (char_length(guest_count) <= 32),
  notes text not null default '' check (char_length(notes) <= 4000),
  status text not null default 'pending_payment' check (status in ('pending_payment','pending','confirmed','cancelled','expired')),
  payment_status text not null default 'unpaid' check (payment_status in ('unpaid','paid','partially_paid','refunded')),
  payment_method_id text references public.payment_methods(id) on delete set null,
  payment_provider text,
  currency text not null default 'USD' check (currency ~ '^[A-Z]{3}$'),
  deposit_cents integer not null default 0 check (deposit_cents >= 0),
  total_cents integer not null default 0 check (total_cents >= 0),
  balance_cents integer not null default 0 check (balance_cents >= 0),
  payment_expires_at timestamptz,
  stripe_deposit_session_id text,
  stripe_balance_session_id text,
  stripe_payment_intent_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Safe migrations for installations that started before payments were added.
alter table public.bookings add column if not exists payment_status text not null default 'unpaid';
alter table public.bookings add column if not exists payment_method_id text;
alter table public.bookings add column if not exists payment_provider text;
alter table public.bookings add column if not exists currency text not null default 'USD';
alter table public.bookings add column if not exists deposit_cents integer not null default 0;
alter table public.bookings add column if not exists total_cents integer not null default 0;
alter table public.bookings add column if not exists balance_cents integer not null default 0;
alter table public.bookings add column if not exists payment_expires_at timestamptz;
alter table public.bookings add column if not exists stripe_deposit_session_id text;
alter table public.bookings add column if not exists stripe_balance_session_id text;
alter table public.bookings add column if not exists stripe_payment_intent_id text;
alter table public.bookings drop constraint if exists bookings_status_check;
alter table public.bookings add constraint bookings_status_check check (status in ('pending_payment','pending','confirmed','cancelled','expired'));
alter table public.bookings drop constraint if exists bookings_payment_status_check;
alter table public.bookings add constraint bookings_payment_status_check check (payment_status in ('unpaid','paid','partially_paid','refunded'));
alter table public.bookings drop constraint if exists bookings_currency_check;
alter table public.bookings add constraint bookings_currency_check check (currency ~ '^[A-Z]{3}$');
alter table public.bookings drop constraint if exists bookings_payment_method_fk;
alter table public.bookings add constraint bookings_payment_method_fk foreign key (payment_method_id) references public.payment_methods(id) on delete set null;
create index if not exists bookings_date_time_idx on public.bookings(booking_date, booking_time);
create index if not exists bookings_email_idx on public.bookings(email);
create index if not exists bookings_status_idx on public.bookings(status, booking_date);
create index if not exists bookings_payment_idx on public.bookings(payment_status, payment_expires_at);
drop index if exists public.bookings_active_slot_unique;
create unique index if not exists bookings_active_slot_unique on public.bookings(booking_date, booking_time) where status in ('pending_payment','pending','confirmed');
alter table public.bookings enable row level security;
revoke all on public.bookings from anon, authenticated;

-- Payment transactions ------------------------------------------------------
create table if not exists public.payment_transactions (
  id text primary key,
  booking_id text not null references public.bookings(id) on delete cascade,
  payment_method_id text not null references public.payment_methods(id) on delete restrict,
  provider text not null,
  kind text not null check (kind in ('deposit','balance')),
  amount_cents integer not null check (amount_cents > 0),
  currency text not null check (currency ~ '^[A-Z]{3}$'),
  status text not null check (status in ('pending','paid','failed','refunded','expired')),
  provider_ref text,
  checkout_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index if not exists payment_transactions_provider_ref_idx on public.payment_transactions(provider, provider_ref) where provider_ref is not null;
create index if not exists payment_transactions_booking_idx on public.payment_transactions(booking_id, created_at desc);
create index if not exists payment_transactions_status_idx on public.payment_transactions(status, created_at desc);
alter table public.payment_transactions enable row level security;
revoke all on public.payment_transactions from anon, authenticated;

-- Booking event audit log ---------------------------------------------------
create table if not exists public.booking_events (
  id bigserial primary key,
  booking_id text not null references public.bookings(id) on delete cascade,
  event_type text not null,
  provider_event_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create unique index if not exists booking_events_provider_idx on public.booking_events(provider_event_id) where provider_event_id is not null;
create index if not exists booking_events_booking_idx on public.booking_events(booking_id, created_at desc);
alter table public.booking_events enable row level security;
revoke all on public.booking_events from anon, authenticated;

-- Booking settings ----------------------------------------------------------
create table if not exists public.booking_settings (
  id text primary key,
  timezone text not null default 'America/New_York',
  slot_minutes integer not null default 50 check (slot_minutes between 15 and 240),
  slot_times text[] not null default array['09:00','11:30','14:00','16:00'],
  min_advance_hours integer not null default 12 check (min_advance_hours between 0 and 168),
  cancellation_hours integer not null default 12 check (cancellation_hours between 0 and 168),
  max_days_ahead integer not null default 365 check (max_days_ahead between 1 and 730),
  weekly_hours jsonb not null default '{"0":{"open":"09:00","close":"17:00"},"1":{"open":"09:00","close":"17:00"},"2":{"open":"09:00","close":"17:00"},"3":{"open":"09:00","close":"17:00"},"4":{"open":"09:00","close":"17:00"},"5":{"open":"09:00","close":"17:00"},"6":null}'::jsonb,
  updated_at timestamptz not null default now()
);
insert into public.booking_settings(id) values ('singleton') on conflict (id) do nothing;
alter table public.booking_settings enable row level security;
revoke all on public.booking_settings from anon, authenticated;

-- Calendar blocks -----------------------------------------------------------
create table if not exists public.availability_blocks (
  id bigserial primary key,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  reason text not null default '' check (char_length(reason) <= 500),
  created_at timestamptz not null default now(),
  check (ends_at > starts_at)
);
create index if not exists availability_blocks_idx on public.availability_blocks(starts_at, ends_at);
alter table public.availability_blocks enable row level security;
revoke all on public.availability_blocks from anon, authenticated;

-- Gallery -------------------------------------------------------------------
create table if not exists public.gallery_images (
  id text primary key,
  title text not null check (char_length(title) between 1 and 180),
  alt text not null check (char_length(alt) between 1 and 300),
  category text not null check (category in ('wedding-couples','maternity','children-family','portraits-fashion','culture-events','graduation')),
  storage_path text not null unique,
  public_url text not null,
  width integer not null default 0 check (width >= 0),
  height integer not null default 0 check (height >= 0),
  mime_type text not null default 'image/webp',
  file_size bigint not null default 0 check (file_size >= 0),
  is_published boolean not null default true,
  is_featured boolean not null default false,
  sort_order bigint not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists gallery_images_category_idx on public.gallery_images(category, is_published, sort_order desc, created_at desc);
create index if not exists gallery_images_featured_idx on public.gallery_images(is_featured, is_published, sort_order desc, created_at desc);
alter table public.gallery_images drop constraint if exists gallery_images_category_check;
alter table public.gallery_images add constraint gallery_images_category_check check (category in ('wedding-couples','maternity','children-family','portraits-fashion','culture-events','graduation'));
alter table public.gallery_images enable row level security;
revoke all on public.gallery_images from anon, authenticated;

-- Storage -------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('rbonsu-photography', 'rbonsu-photography', true)
on conflict (id) do update set public = true;

-- Admin sessions --------------------------------------------------------------
-- Independent, revocable session records issued at admin login. The session
-- bearer value the browser holds is never the master ADMIN_DASHBOARD_TOKEN
-- itself — only its SHA-256 hash lives here, alongside a hash of the master
-- token as it existed when the session was created, so rotating the master
-- token invalidates every open session without a separate sweep.
create table if not exists public.admin_sessions (
  id uuid primary key default gen_random_uuid(),
  session_token_hash text not null unique,
  admin_token_version_hash text not null,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  revoked_at timestamptz,
  last_seen_at timestamptz not null default now()
);
create index if not exists admin_sessions_lookup_idx on public.admin_sessions(session_token_hash, admin_token_version_hash) where revoked_at is null;
create index if not exists admin_sessions_expiry_idx on public.admin_sessions(expires_at);
alter table public.admin_sessions enable row level security;
revoke all on public.admin_sessions from anon, authenticated;

-- Booking portal sessions -----------------------------------------------------
-- Short-lived sessions issued when a client exchanges the long-lived, emailed
-- portal token for cookie-based access. Booking reads and all state-changing
-- portal actions (cancel, reschedule, pay balance) are authorized against
-- this table, not against the emailed token directly.
create table if not exists public.booking_portal_sessions (
  id uuid primary key default gen_random_uuid(),
  booking_id text not null references public.bookings(id) on delete cascade,
  session_token_hash text not null unique,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  revoked_at timestamptz
);
create index if not exists booking_portal_sessions_lookup_idx on public.booking_portal_sessions(session_token_hash) where revoked_at is null;
create index if not exists booking_portal_sessions_expiry_idx on public.booking_portal_sessions(expires_at);
create index if not exists booking_portal_sessions_booking_idx on public.booking_portal_sessions(booking_id);
alter table public.booking_portal_sessions enable row level security;
revoke all on public.booking_portal_sessions from anon, authenticated;

-- The application uses SUPABASE_SERVICE_ROLE_KEY only on the server.
-- Never expose this credential to browser code or VITE_* variables.
