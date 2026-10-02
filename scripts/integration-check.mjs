import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const required = [
  'src/components/home/HeroShowcase.tsx',
  'src/components/home/SelectedStories.tsx',
  'src/components/home/CuratedGallery.tsx',
  'src/components/home/TestimonialsSection.tsx',
  'src/components/home/PhilosophySection.tsx',
  'src/components/home/ServicesSection.tsx',
  'src/components/home/FinalCTASection.tsx',
  'src/pages/WorkPage.tsx',
  'src/pages/WorkDetailPage.tsx',
  'src/pages/BookingPage.tsx',
  'src/pages/AdminPage.tsx',
  'src/routes/api/admin-gallery.ts',
  'src/routes/api/gallery.ts',
  'src/routes/api/admin-availability.ts',
  'src/routes/api/booking-settings.ts',
  'src/routes/api/bookings.ts',
  'src/routes/api/booking-portal.ts',
  'src/routes/api/calendar/$id.ts',
  'src/server/data/gallery.ts',
  'src/server/data/bookings.ts',
  'src/server/data/availability.ts',
  'src/server/security/booking.ts',
  'src/server/data/payment-methods.ts',
  'src/server/data/payment-settings.ts',
  'src/server/data/payment-transactions.ts',
  'src/server/payments/stripe.ts',
  'src/routes/api/payment-methods.ts',
  'src/routes/api/admin-payments.ts',
  'src/routes/api/payment-balance.ts',
  'src/routes/api/stripe-webhook.ts',
  'supabase-schema.sql',
];

const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));
const routeTree = fs.readFileSync(path.join(root, 'src/routeTree.gen.ts'), 'utf8');
const requiredPaymentTokens = ['stripe', 'payment-balance', 'stripe-webhook', 'server/payments', 'pending_payment', 'paymentStatus', 'depositCents', 'balanceCents', 'totalCents'];
const forbiddenSecrets = /(sk_live_|sk_test_|whsec_|SUPABASE_SERVICE_ROLE_KEY\s*[:=])/i;
const sourceFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(ts|tsx|js|mjs|sql)$/.test(entry.name)) sourceFiles.push(full);
  }
}
walk(path.join(root, 'src'));
sourceFiles.push(path.join(root, 'supabase-schema.sql'));
const allSource = sourceFiles.map((file) => fs.readFileSync(file, 'utf8')).join('\n');
const paymentLeaks = requiredPaymentTokens.filter((token) => !allSource.includes(token));
const secretLeaks = sourceFiles.filter((file) => forbiddenSecrets.test(fs.readFileSync(file, 'utf8')));
const paymentRoutesInTree = ['/api/payment-methods', '/api/admin-payments', '/api/payment-balance', '/api/stripe-webhook'].filter((route) => !routeTree.includes(route));
const directSearchParams = sourceFiles.filter((file) => /import\s*\{[^}]*\buseSearchParams\b[^}]*\}\s*from\s*["']@tanstack\/react-router["']/.test(fs.readFileSync(file, 'utf8')));

const failures = [];
if (missing.length) failures.push(`Missing required files: ${missing.join(', ')}`);
if (paymentLeaks.length) failures.push(`Expected payment implementation tokens missing: ${paymentLeaks.join(', ')}`);
if (secretLeaks.length) failures.push(`Possible secret leakage in source: ${secretLeaks.join(', ')}`);
if (paymentRoutesInTree.length) failures.push(`Payment routes missing from routeTree.gen.ts: ${paymentRoutesInTree.join(', ')}`);
if (directSearchParams.length) failures.push(`Direct TanStack useSearchParams import remains in: ${directSearchParams.join(', ')}`);

console.log(`Required files checked: ${required.length}`);
console.log(`Source files scanned: ${sourceFiles.length}`);
console.log(`Direct router useSearchParams imports: ${directSearchParams.length}`);
console.log(`Payment implementation tokens missing: ${paymentLeaks.length}`);
console.log(`Possible secret leaks: ${secretLeaks.length}`);
console.log(`Payment route references missing from route tree: ${paymentRoutesInTree.length}`);

if (failures.length) {
  for (const failure of failures) console.error(`FAIL: ${failure}`);
  process.exit(1);
}
console.log('PASS: integrated Rbonsu feature set and payment configuration are structurally present with no provider secret literals found.');
