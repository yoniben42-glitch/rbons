import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const skip = new Set(["node_modules", ".git", ".output", "dist", ".wrangler", ".tanstack", "coverage", "playwright-report", "test-results"]);
const files = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (skip.has(name)) continue;
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) walk(path);
    else if (/\.(ts|tsx|js|jsx|mjs|json|yml|yaml|sql|env|md)$/.test(name)) files.push(path);
  }
}

walk(root);

const forbidden = [
  /dangerouslySetInnerHTML/,
  /VITE_[A-Z0-9_]*(?:SECRET|TOKEN|PASSWORD|KEY)=/i,
  /SUPABASE_SERVICE_ROLE_KEY\s*=\s*[^#\s]+/,
  /RESEND_API_KEY\s*=\s*[^#\s]+/,
];

const findings = [];
for (const file of files) {
  if (file.endsWith("scripts/security-scan.mjs")) continue;
  const text = readFileSync(file, "utf8");
  for (const pattern of forbidden) {
    if (pattern.test(text) && !file.endsWith(".env.example")) {
      findings.push(`${relative(root, file)} matches ${pattern}`);
    }
  }
}

for (const name of [".env", ".env.local", ".env.production", ".env.development", ".dev.vars"]) {
  if (existsSync(join(root, name))) findings.push(`${name} exists in the project tree; keep runtime secrets outside source control`);
}

if (findings.length) {
  console.error("Security scan failed:");
  for (const finding of findings) console.error(`- ${finding}`);
  process.exit(1);
}

console.log(`Security scan passed (${files.length} source/config files inspected).`);
