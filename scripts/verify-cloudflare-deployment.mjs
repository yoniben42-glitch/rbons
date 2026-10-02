#!/usr/bin/env node
/**
 * Rbonsu Photography - Cloudflare deployment smoke test.
 * Usage:
 *   node scripts/verify-cloudflare-deployment.mjs https://your-worker.workers.dev
 *   node scripts/verify-cloudflare-deployment.mjs https://www.rbonsuphotography.com
 *
 * This performs read-only HTTP checks. It does not submit an inquiry.
 */
const target = process.argv[2];

if (!target) {
  console.error("Usage: node scripts/verify-cloudflare-deployment.mjs <https-url>");
  process.exit(2);
}

let url;
try {
  url = new URL(target);
} catch {
  console.error("Invalid URL.");
  process.exit(2);
}
if (url.protocol !== "https:") {
  console.error("Refusing non-HTTPS target.");
  process.exit(2);
}

const started = Date.now();
const res = await fetch(url, {
  method: "GET",
  redirect: "manual",
  headers: { "User-Agent": "Rbonsu-Cloudflare-Smoke-Test/1.0" }
});
const elapsed = Date.now() - started;

console.log(`URL: ${url.href}`);
console.log(`HTTP: ${res.status}`);
console.log(`Time: ${elapsed} ms`);
console.log(`server: ${res.headers.get("server") ?? "(missing)"}`);
console.log(`cf-ray: ${res.headers.get("cf-ray") ?? "(missing)"}`);
console.log(`cf-cache-status: ${res.headers.get("cf-cache-status") ?? "(not present)"}`);
console.log(`content-type: ${res.headers.get("content-type") ?? "(missing)"}`);

const server = (res.headers.get("server") || "").toLowerCase();
const cfRay = res.headers.get("cf-ray");
const cloudflareSignal = server.includes("cloudflare") || Boolean(cfRay);

if (!cloudflareSignal) {
  console.error("FAIL: no Cloudflare response signal (server=cloudflare or cf-ray).");
  process.exit(1);
}

if (res.status >= 500) {
  console.error("FAIL: origin/Worker returned a 5xx response.");
  process.exit(1);
}

console.log("PASS: Cloudflare edge response detected and no 5xx was returned.");
