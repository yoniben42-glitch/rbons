begin;

-- Canonical gallery taxonomy for Supabase bucket `rbonsu-photography`.
alter table public.gallery_images drop constraint if exists gallery_images_category_check;

update public.gallery_images
set category = case category
  when 'weddings' then 'wedding-couples'
  when 'engagement' then 'wedding-couples'
  when 'maternity' then 'maternity'
  when 'newborn-kids-family' then 'children-family'
  when 'christmas-season' then 'children-family'
  when 'portraits-fashion' then 'portraits-fashion'
  when 'models-boudoir' then 'portraits-fashion'
  when 'editorial' then 'portraits-fashion'
  when 'commercial' then 'portraits-fashion'
  when 'events-performance' then 'culture-events'
  when 'cultural-traditional' then 'culture-events'
  when 'events' then 'culture-events'
  when 'lifestyle-birthdays' then 'culture-events'
  when 'graduation' then 'graduation'
  else 'culture-events'
end
where category is not null;

-- The storage path is the source of truth for the public gallery. Rows that are
-- still in an old folder are kept for audit/history but removed from the live gallery.
update public.gallery_images
set
  category = split_part(storage_path, '/', 1),
  is_published = true,
  updated_at = now()
where split_part(storage_path, '/', 1) in
  ('wedding-couples','maternity','children-family','portraits-fashion','culture-events','graduation');

update public.gallery_images
set is_published = false, updated_at = now()
where split_part(storage_path, '/', 1) not in
  ('wedding-couples','maternity','children-family','portraits-fashion','culture-events','graduation');

alter table public.gallery_images
  add constraint gallery_images_category_check
  check (category in ('wedding-couples','maternity','children-family','portraits-fashion','culture-events','graduation'));

-- The portfolio bucket is intentionally public: public gallery URLs are meant to
-- render on the marketing site. Upload/update/delete remain server-only.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'rbonsu-photography',
  'rbonsu-photography',
  true,
  15728640,
  array['image/jpeg','image/png','image/webp']
)
on conflict (id) do update set
  public = true,
  file_size_limit = 15728640,
  allowed_mime_types = array['image/jpeg','image/png','image/webp'];

-- Stripe is the built-in payment provider. Leave payment configuration otherwise
-- unchanged so the studio can connect credentials without changing application code.
update public.payment_methods
set enabled = true, updated_at = now()
where id = 'pm_stripe' and provider = 'stripe';

update public.payment_settings
set default_method_id = 'pm_stripe', updated_at = now()
where id = 'singleton';

commit;
