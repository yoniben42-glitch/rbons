# Rbonsu Photography Payments

## Customer flow

1. Customer selects a service/date/time.
2. The server checks availability and creates a temporary `pending_payment` booking.
3. The customer selects an enabled payment method.
4. Stripe sends the customer to hosted Checkout; successful payment is confirmed by `/api/stripe-webhook`.
5. An external payment link sends the customer to the configured hosted payment page. The studio can confirm that payment manually from `/admin`.
6. The client portal shows the booking status and outstanding balance when applicable.

## Admin dashboard

The **Payments** tab controls:

- Whether payment is required for new bookings.
- Currency.
- Booking deposit amount.
- Payment reservation window.
- Default payment method.
- Stripe enable/disable state.
- External hosted payment links.
- Payment transaction history.

The **Bookings** tab allows the owner to mark a payment paid manually, which clears the temporary payment expiry and confirms the booking.

## Stripe secrets

Set these only as Cloudflare Worker secrets:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `APP_ORIGIN`

Do not place Stripe secret keys in GitHub, `.env` committed files, Supabase tables, or browser JavaScript.

## Stripe webhook

Endpoint:

`https://YOUR-DOMAIN/api/stripe-webhook`

Subscribe to at least:

- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`
- `checkout.session.expired`

The webhook validates Stripe's signature, applies payment updates, clears payment expiry after successful deposit payment, and sends confirmation email/ICS when email configuration is available.

## External payment links

The admin can add a public HTTPS payment URL such as a provider-hosted PayPal or Square payment page. The URL is stored so the app can redirect customers, but provider credentials are never stored by this app.

## Important limitation

Generic external links cannot be automatically verified by this application without a provider-specific API/webhook integration. The admin should only mark an external payment paid after verifying it in the provider's own account.
