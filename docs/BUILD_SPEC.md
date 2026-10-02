# RBONSU Photography — Standalone Build Specification v1.2

## 1. Product goal

A production-ready standalone photography website that preserves the strongest visual patterns of the existing Rbonsu Photography site and the richer prototype supplied for review, while providing an owner-operated booking and gallery system without online payment in this release.

## 2. Public routes

- `/` — cinematic homepage
- `/work` — complete portfolio archive
- `/work/:slug` — curated project or category gallery
- `/services` — service offerings
- `/services/:slug` — service detail
- `/about` — studio/photographer profile
- `/experience` — client journey and process
- `/contact` — inquiry form and contact pathways
- `/booking` — application-owned booking flow
- `/admin` — private studio dashboard

## 3. Homepage composition

1. Cinematic hero slideshow
2. Selected Stories & Series
3. Current Works / Curated Gallery
4. Testimonials / verified social proof presentation
5. Studio philosophy
6. Services / collection presentation
7. Final booking/inquiry CTA

## 4. Gallery categories

- Weddings
- Maternity
- Engagement
- Lifestyle & Birthdays
- Newborn, Kids & Family
- Christmas & Season
- Models & Boudoir
- Events
- Editorial
- Commercial
- Other

Every published image has category metadata in `public.gallery_images` and a public Storage object in the configured gallery bucket.

## 5. Gallery administrator workflow

The owner signs in to `/admin`, opens **Gallery**, chooses a category, selects one or more images, and publishes them. The browser converts compatible images to WebP and limits the working dimensions before the upload. The server performs type/size validation, writes the Storage object, records metadata, and marks the image published. Featured images can be used by the homepage hero and current-work components.

## 6. Booking requirements

Starting configuration is based on the inspected Acuity setup:

- 50-minute default slot duration
- Sunday–Friday 09:00–17:00
- Saturday closed
- 12 hours minimum advance notice
- 12 hours client cancellation/reschedule threshold
- 365 days maximum booking horizon
- single capacity per slot
- Eastern Time (`America/New_York`) as the starting timezone

The values are editable from the admin Availability panel. The server re-validates the booking request and does not trust browser availability alone.

## 7. Booking flow

Customer:

`Choose service → choose date → choose time → enter details → submit → receive private portal`

Owner:

`Review → confirm / cancel / reschedule`

The customer portal supports cancellation/rescheduling only while the configured change window is still open. The owner can make administrative booking changes without the customer cutoff.

## 8. Payment scope

Online payment is out of scope for v1.2. The database contains no payment columns, the API contains no payment checkout/webhook routes, and the environment template contains no payment secrets.

## 9. Responsive requirements

The UI is designed and tested conceptually across:

- Desktop: 1920, 1440, 1280px
- Tablet: 1024px, 768px
- Mobile: 430px, 414px, 390px, 375px, 360px

Core requirements:

- no horizontal overflow
- fluid typography
- responsive image aspect ratios
- touch-sized controls
- mobile-safe navigation
- readable overlays on images
- grid collapse without content clipping
- reduced-motion support

## 10. Deployment architecture

`GitHub → Cloudflare Workers → Supabase Postgres + Supabase Storage`

Optional email delivery uses Resend. The public domain is connected to the Cloudflare Worker after staging verification.

## 11. Ownership/handover

The owner receives the source repository, deployment account access, Supabase project ownership, domain/DNS control, and admin credential configuration. No production secret is committed to source control.
