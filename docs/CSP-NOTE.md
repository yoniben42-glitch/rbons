# CSP implementation note

The project sends an enforced CSP with an intentionally narrow source allow-list. TanStack Start SSR currently has limitations around applying a single nonce to every framework-generated inline script, so this baseline keeps `'unsafe-inline'` in `script-src` for compatibility with framework hydration instead of shipping a policy that silently breaks the site.

`img-src` and `connect-src` are resolved from the configured `SUPABASE_URL` at request time rather than allowing the blanket `https:` scheme, since the only external origin the app actually talks to is its own Supabase project (gallery image delivery and API calls). `media-src` is scoped to `'self'` since the app does not currently serve video or audio.

Before treating CSP as a final high-assurance control, wire a per-request nonce through the Start SSR/router configuration and remove `'unsafe-inline'`. TanStack documents nonce support for SSR styles, and a 2025 framework issue identified a remaining inline-script nonce edge case. Verify the generated production HTML and every `<script>` element during staging deployment before changing the enforced policy.
