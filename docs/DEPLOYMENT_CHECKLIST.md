# Rbonsu Photography — Cloudflare Deployment Verification

## What is already verified in the repository

- `package.json` and `package-lock.json` are compatible with `npm ci` (lockfile dry-run passes).
- `src/router.tsx` and `src/routeTree.gen.ts` are present.
- The project uses TanStack Start.
- The deployment target is **Cloudflare Workers**, not Pages.
- The production branch is intended to be `main`.
- No secrets belong in GitHub; Supabase credentials must be configured in Cloudflare as secrets/environment variables.
- The repository contains a read-only Cloudflare edge smoke-test script.

## What cannot be marked green until Cloudflare actually deploys

### 1. GitHub verification

After a push to `main`, open the commit in GitHub.

Expected:
- A Cloudflare Workers Builds check run/status appears.
- The check is green after the build/deploy succeeds.

Cloudflare's GitHub integration reports build status through GitHub check runs/commit statuses.

### 2. Cloudflare verification

Cloudflare Dashboard → Workers & Pages → your Worker → Deployments / Build history.

Expected:
- Latest production deployment corresponds to the latest `main` commit.
- Build completes without errors.
- The resulting version is promoted to Active Deployment.

Do not require the deployment to be called `cloudflare-pages`; this project is a Worker.

### 3. Live edge verification

After Cloudflare gives the Worker a `workers.dev` URL:

```bash
npm run verify:cloudflare -- https://YOUR-WORKER.workers.dev
```

Expected:
- HTTPS
- HTTP status is not 5xx
- `server: cloudflare` and/or a `cf-ray` header is present

For the final business site, run the same check against:

```text
https://www.rbonsuphotography.com
```

and, if you choose the apex as the canonical host:

```text
https://rbonsuphotography.com
```

## Important

The three items above are deployment-state checks. They cannot be pre-completed inside a ZIP because they depend on your GitHub account, Cloudflare account, the actual deployment, DNS, and the live Worker.

Do not use:

```bash
curl -I https://pages.dev
```

as the test. `pages.dev` is only an example domain and is unrelated to this project's actual Worker.

Use your actual `workers.dev` URL or your actual custom domain.
