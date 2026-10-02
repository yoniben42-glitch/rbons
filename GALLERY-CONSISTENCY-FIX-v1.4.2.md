# RBONSU Photography — Gallery Consistency Fix v1.4.2

## Root cause

Supabase Storage and the public gallery catalog are two separate systems in this application.
The public `/api/gallery` route reads `public.gallery_images`; it does not enumerate the Storage bucket.
Uploading a photograph from the Supabase Storage dashboard therefore creates a Storage object but no
`gallery_images` row, so the public website cannot discover it.

## What this patch changes

1. Adds an authenticated **Admin → Gallery → Sync Supabase Storage** action.
2. Scans all current Storage folders and registers missing images in `gallery_images`.
3. Supports the current folders shown in Supabase, including:
   - portraits-fashion
   - events-performance
   - cultural-traditional
   - graduation
4. Reads real image dimensions from the uploaded file instead of trusting a client field.
5. Repairs old `gallery_images` rows that have `0 × 0` dimensions.
6. Deduplicates gallery output by Storage path.
7. Sorts newest gallery items first.
8. Normalizes old `models-boudoir` → `portraits-fashion` and `events` → `events-performance`.
9. Uses the real aspect ratio for gallery/service images and switches those renderers to `object-contain`.
10. Removes image hover scaling in gallery contexts because scaling a contained image inside an overflow-hidden wrapper still crops it.
11. Makes hero featured selection landscape-only.
12. Makes the Services homepage section use the live gallery instead of frozen manifest hero photos.
13. Replaces the maternity service fallback that pointed at a wedding photograph with a real maternity asset.
14. Makes `/api/gallery` non-cacheable so a successful sync is reflected without waiting for the previous catalog cache.

## Required deployment order

### 1. Run the SQL migration first

Open Supabase → SQL Editor and run:

`supabase-gallery-v1.5.0-six-category-migration.sql`

This expands the category constraint and normalizes historical category aliases.

### 2. Deploy the source patch

Deploy this version of the project to GitHub/Cloudflare.

The existing server already relies on `SUPABASE_SERVICE_ROLE_KEY` for authenticated admin storage operations,
so the new sync action uses the same server-side credential path.

### 3. Sync the already-uploaded photographs

Open:

`/admin` → `Gallery` → **Sync Supabase Storage**

The response reports:

- scanned
- added
- repaired
- unresolved

Any unresolved item should be checked before launch.

### 4. Verify the public gallery

Check:

- `/work`
- `/work/<category>` for each populated category
- homepage Current Works / Selected Stories / Services sections
- service detail pages
- mobile layout
- desktop layout
- portrait filter
- landscape filter
- square filter
- Lightbox

## Orientation rule

Orientation is derived from real dimensions:

- `width > height` → landscape
- `width < height` → portrait
- `width === height` → square

The gallery no longer forces all images into `3/4`, `4/3`, or `16/9` boxes.
A wrapper is given the asset's actual aspect ratio, and the image is rendered with `object-contain`.

This means a 1200×1600 portrait remains 3:4 and a 1600×1200 landscape remains 4:3 without cropping.

## Important distinction

The single remaining `object-cover` occurrence in `FinalCTASection.tsx` is an intentional low-opacity decorative
background, not a portfolio/gallery image. It can remain `object-cover` unless the owner also wants background
photographs to be fully uncropped.

## Files changed

- `src/types/gallery.ts`
- `src/types/image.ts`
- `src/server/data/gallery.ts`
- `src/routes/api/admin-gallery.ts`
- `src/routes/api/gallery.ts`
- `src/lib/gallery-client.ts`
- `src/components/common/AdaptiveImage.tsx`
- `src/components/common/EditorialImage.tsx`
- `src/components/motion/ImageReveal.tsx`
- `src/pages/WorkPage.tsx`
- `src/pages/WorkDetailPage.tsx`
- `src/pages/ServiceDetailPage.tsx`
- `src/pages/ServicesPage.tsx`
- `src/pages/ExperiencePage.tsx`
- `src/pages/AboutPage.tsx`
- `src/pages/AdminPage.tsx`
- `src/components/home/HeroShowcase.tsx`
- `src/components/home/CuratedGallery.tsx`
- `src/components/home/SelectedStories.tsx`
- `src/components/home/ServicesSection.tsx`
- `src/components/home/PhilosophySection.tsx`
- `src/data/business.ts`
- `supabase-schema.sql`
- `supabase-gallery-v1.5.0-six-category-migration.sql`
- `supabase-gallery-v1.5.0-six-category-migration.sql`

## Validation performed

- TypeScript parser: **0 parse errors across 104 source TS/TSX files**.
- Existing security scan: **passed; 149 source/config files inspected**.
- Full `tsc --noEmit` and production build were not completed in this environment because `npm install` could not
  finish before the container transport timeout, leaving the local dependency tree incomplete.

Do not consider the patch production-complete until the normal CI/build pipeline passes and the live sync is run once.
