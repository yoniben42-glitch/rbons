# Booking System

The standalone booking system is application-owned and does not depend on Acuity.

## Starting defaults
- Timezone: America/New_York
- Appointment duration: 50 minutes
- Slots: 09:00, 11:30, 14:00, 16:00
- Sunday–Friday: 09:00–17:00
- Saturday: closed
- Minimum advance notice: 12 hours
- Cancellation/rescheduling threshold: 12 hours
- One booking per active slot

These are defaults based on the inspected existing Acuity configuration. The owner can change working hours, slot times, duration, and booking window from the admin dashboard.

## Customer flow
`/booking` → service → package → date → time → customer details → booking receipt → private portal.

## Owner flow
`/admin` → Bookings → confirm/cancel/reschedule.

## Email
Email is optional. When `RESEND_API_KEY` is configured, the customer and studio receive booking notifications.
