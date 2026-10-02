# Rbonsu Photography — Final Windows Setup

This package is the standalone source of truth for the Rbonsu Photography website, booking system, admin dashboard, and Supabase gallery workflow.

## 1. Extract the project

1. Back up any existing local Rbonsu project.
2. Extract the ZIP into a clean folder, for example:

```text
C:\Projects\rbonsu-photography
```

3. Open that folder directly in VS Code. `package.json` must be at the project root.

## 2. Install dependencies

From PowerShell:

```powershell
cd C:\Projects\rbonsu-photography
npm ci
```

## 3. Verify the project structure

```powershell
Test-Path .\package.json
Test-Path .\src\router.tsx
Test-Path .\src\routeTree.gen.ts
Test-Path .\supabase-schema.sql
```

All four commands must print `True`.

This release intentionally does not require a committed `wrangler.jsonc`. Deployment uses `npx wrangler deploy` from the project root.

## 4. Run the local checks

```powershell
npm run integration:check
npm run security:scan
npm run typecheck
npm run lint
npm run build
```

## 5. Configure Supabase

Follow `docs/DEPLOYMENT.md` and `docs/ADMIN-GALLERY.md`.

Set up:

- Supabase Postgres schema
- `rbonsu-photography` Storage bucket
- server-side service-role secret
- owner/admin credential

The service-role key must never be exposed in browser code or committed to Git.

## 6. Configure runtime environment

Copy `.env.example` to `.env.local` for local development and fill in the real values.

Do not commit `.env.local`.

## 7. Run locally

```powershell
npm run dev
```

Then open the local URL shown by Vite.

## 8. Push to GitHub

```powershell
git init
git add .
git commit -m "Initial Rbonsu Photography standalone release"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

## 9. Cloudflare Workers

Use these project settings:

```text
Production branch: main
Root directory: /
Build command: npm run build
Deploy command: npx wrangler deploy
```

The Worker deployment command is run from the project root. No committed Wrangler JSON configuration is required for this release.

## 10. Production secrets

Configure the production values in Cloudflare Workers Variables/Secrets. See `docs/DEPLOYMENT.md` for the exact names.

## 11. Custom domain

After the Worker is deployed and tested on its staging URL, connect the owner's domain to the Worker in Cloudflare, then set:

```text
APP_ORIGIN=https://www.rbonsuphotography.com
```

## 12. Gallery ownership workflow

The owner can sign in to `/admin`, open **Gallery**, choose a gallery category, select multiple photographs, and publish them. Images are optimized in the browser, uploaded to Supabase Storage, recorded in the database, and then appear automatically in the matching public gallery.

## 13. Booking workflow

The owner can manage bookings and availability from `/admin`. Online payment is intentionally not part of this release.

## 14. Handover

See `docs/OWNER-HANDOVER.md` before transferring the repository, Cloudflare account, Supabase project, domain, and email provider to the owner.
