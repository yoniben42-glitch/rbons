# Rbonsu Photography — v1.3.0 Release Notes

## Integrated payments

- Stripe hosted Checkout for automatic payment confirmation.
- Stripe webhook verification for successful and expired Checkout sessions.
- Admin-configurable external hosted payment links (PayPal, Square, or another provider).
- Admin payment settings for currency, deposit, payment window, required-payment toggle, and default method.
- Payment transaction history.
- Client portal support for remaining-balance payments.
- Manual payment confirmation for externally hosted payment links.

## Security

- Provider secret credentials stay in Cloudflare Worker secrets.
- No raw card data is stored or processed by the application.
- Payment method configuration exposed to the browser is limited to public method metadata and public hosted URLs.
- Stripe webhook signatures are verified server-side.
