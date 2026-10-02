# Rbonsu Photography v1.4.0 — Code Quality & Bloat Refactor

This release removes dead code, redundant work, duplicate definitions, and unnecessary package/data bloat while preserving the existing public website, booking flow, gallery behavior, admin dashboard, and payment flow.

## Changes

- Removed unused `Button`, `TextReveal`, and unused Open Graph `site.json` artifacts.
- Removed unused motion variants and unused rate-limit helper implementation.
- Removed unused image-manifest helpers and stale metadata fields that had no runtime consumers.
- Added indexed lookup maps for verified images by ID and category, reducing repeated manifest scans.
- Centralized gallery category definitions in `src/types/gallery.ts` and removed duplicate page-level lists/maps.
- Centralized Supabase REST/service-role client handling in `src/server/data/supabase.ts` and refactored server data modules to use it.
- Optimized booking availability so stale pending bookings are expired once per availability request instead of once per slot; weekly-hours calculation is also reused.
- Removed redundant verified filtering in the gallery client.
- Removed stale TypeScript configuration references and corrected the TypeScript include scope.
- Cleaned React Router hook exports to avoid refresh-boundary warnings.
- Fixed hook dependency/lifecycle issues in the lightbox, booking portal, and related pages.
- Removed unused runtime dependencies from `package.json` (the application runtime dependency set is now intentionally small).
- Updated release version to `1.4.0`.

## Verification

- TypeScript: PASS
- ESLint: PASS, 0 warnings and 0 errors
- Security scanner: PASS (138 source/config files inspected)
- Integration check: PASS
- `npm audit --package-lock-only --offline --audit-level=high`: PASS, 0 vulnerabilities reported from the lockfile audit
- `npm ci --dry-run --ignore-scripts --offline --no-audit --no-fund`: PASS against the final lockfile
- Removed-symbol search: PASS; no references remain to the deleted helper APIs

## Environment limitation

The supplied `node_modules` directory was created for Windows and contains Windows-native Vite/Rolldown binaries, so the Linux inspection environment cannot execute the Vite production build or Playwright web server successfully from that copied dependency tree. The release package intentionally excludes `node_modules`.

A clean networked environment must run `npm ci` and then the full production build and browser tests before the first live deployment.
