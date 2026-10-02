import { randomBytes } from "node:crypto";

const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

function base32Encode(bytes) {
  let bits = "";
  for (const byte of bytes) bits += byte.toString(2).padStart(8, "0");
  let output = "";
  for (let i = 0; i + 5 <= bits.length; i += 5) {
    output += BASE32_ALPHABET[parseInt(bits.slice(i, i + 5), 2)];
  }
  return output;
}

const wantsTotp = process.argv.includes("--totp");

if (wantsTotp) {
  const secret = base32Encode(randomBytes(20)); // 160 bits, standard TOTP secret length
  console.log("ADMIN_TOTP_SECRET=" + secret);
  console.log("\nEnroll this Base32 secret in an authenticator app (Google Authenticator, 1Password, Authy, etc).");
  console.log("Store it as a Cloudflare Worker secret; do not commit it or put it in the release ZIP.");
  console.log("Leaving ADMIN_TOTP_SECRET unset disables MFA for admin login (not recommended for production).");
} else {
  const secret = randomBytes(32).toString("base64url");
  console.log("ADMIN_DASHBOARD_TOKEN=" + secret);
  console.log("\nStore this as a Cloudflare Worker secret; do not commit it or put it in the release ZIP.");
  console.log("Run with --totp to also generate an ADMIN_TOTP_SECRET for admin MFA.");
}
