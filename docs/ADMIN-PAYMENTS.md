# Admin Payments

## Stripe

1. Configure `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and `APP_ORIGIN` as Cloudflare Worker secrets/variables.
2. Add a Stripe webhook pointing at `/api/stripe-webhook`.
3. In **Admin → Payments**, confirm Stripe shows **Configured** and enable it.
4. Set the currency, booking deposit, payment window, and default method.

The dashboard does not accept the Stripe secret key. This prevents provider secrets from being stored in application data or sent to the browser.

## PayPal / Square / other providers

Use a provider-hosted payment page or payment link. In **Admin → Payments → Add external payment link**, enter the customer-facing name, description, and HTTPS payment URL, then enable it and optionally make it the default.

Customers are redirected to that hosted provider page after the booking is created. The application records the attempted payment transaction but does not claim it is paid until the owner verifies it in the provider's dashboard and uses **Admin → Bookings → Mark paid**.

## Customer experience

The public booking page only displays payment methods that are enabled and configured. When payment is required, the booking is temporarily held as `pending_payment`. Stripe success marks it confirmed automatically after webhook verification. External links remain pending until manually confirmed.
