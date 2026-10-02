# RBONSU Photography — Feature Integration Map

This release is the standalone successor to the richer booking/payment prototype that was reviewed during the project. The useful presentation, portfolio, motion, booking, and administration patterns were retained; online payment code was deliberately removed.

## Visual features retained

- Full-screen cinematic hero slideshow with autoplay, pause, keyboard navigation, crossfade, and Ken Burns motion.
- Responsive editorial typography using a serif/sans pairing.
- Warm ivory, charcoal, stone, and bronze visual system.
- Selected Stories & Series editorial presentation.
- Curated Gallery / Current Works section with category filtering and lightbox viewing.
- Complete portfolio archive with category, orientation, and keyword filtering.
- Direct category gallery pages such as `/work/weddings` and `/work/maternity`.
- Service, experience, philosophy, testimonial, and final-call-to-action sections.
- Editorial image cards with hover treatment and high-resolution lightbox navigation.
- Motion/reveal components with `prefers-reduced-motion` support.
- Responsive navigation with social links and a dedicated booking CTA.

## Content structure retained from the inspected Rbonsu site

Primary gallery categories are modeled after the existing site:

1. Weddings
2. Maternity
3. Engagement
4. Lifestyle & Birthdays
5. Newborn, Kids & Family
6. Christmas & Season
7. Models & Boudoir
8. Events
9. Editorial
10. Commercial
11. Other

The public archive can filter by these categories and the admin upload flow can assign each new image directly to a category.

## Dynamic gallery system

The public gallery is database-backed through Supabase. New work can be uploaded from the private admin dashboard without changing source code.

Flow:

`Admin → Gallery → Choose category → Select images → Browser optimization → Supabase Storage → gallery_images metadata → Published public gallery`

The homepage hero can also use published images marked **Featured**. Existing manifest photography remains available as a fallback until the owner migrates or re-uploads the legacy image set into the new Supabase project.

## Booking system retained and rebuilt without payment

The inspected Acuity configuration provided the starting rules:

- Consultation
- 50-minute duration
- $45 reference price from the existing Acuity setup (price is not collected by this release)
- Richard Bonsu calendar
- Sunday–Friday: 9:00 AM–5:00 PM
- Saturday: closed
- 12-hour minimum advance booking window
- 12-hour client cancellation/rescheduling window
- 1 appointment per time slot
- 365-day booking horizon

The standalone booking system turns those rules into application-owned logic. The public flow is:

`Service → Date → Time → Client details → Booking request → Private client portal`

The admin flow is:

`Dashboard → Bookings → Confirm / Cancel / Reschedule`

A private client token allows a customer to view their booking and, while inside the allowed change window, cancel or reschedule it. An iCalendar download is also provided.

## Admin dashboard

The private dashboard includes:

- Overview counts
- Booking management
- Gallery upload/publishing
- Category filters
- Publish/unpublish controls
- Featured-work controls
- Gallery deletion
- Weekly availability editing
- One-off availability blocks
- Client inquiry viewing

## Security/data boundary

The browser never receives the Supabase service-role key. Database and Storage operations requiring privilege are performed server-side. The admin credential is held server-side and exchanged for an HTTP-only, `SameSite=Strict` cookie.

## Payments

The booking flow supports server-created Stripe hosted Checkout sessions and admin-configured external hosted payment links. Stripe payment confirmation is applied only from a verified webhook. External payment links are redirected to directly and must be manually confirmed by the studio because the application does not control an arbitrary provider webhook/API. Provider secret credentials remain server-only Cloudflare Worker secrets.
