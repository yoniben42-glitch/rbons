/**
 * Minimal RFC 6238 TOTP verification for optional admin MFA, using only Web
 * Crypto (available in Workers and Node) so no extra dependency is required.
 *
 * MFA is opt-in: if ADMIN_TOTP_SECRET is not configured, adminMfaConfigured()
 * returns false and admin-login.ts skips the MFA step entirely, preserving
 * behavior for deployments that haven't set it up yet. Setting it is
 * strongly recommended (see docs/SECURITY.md) since the admin token is the
 * only gate on the dashboard otherwise.
 */

import { constantTimeEqual } from "./tokens";

const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
const STEP_SECONDS = 30;
const CODE_DIGITS = 6;

function base32Decode(secret: string): Uint8Array {
  const cleaned = secret.toUpperCase().replace(/[^A-Z2-7]/g, "");
  let bits = "";
  for (const char of cleaned) {
    const value = BASE32_ALPHABET.indexOf(char);
    if (value === -1) continue;
    bits += value.toString(2).padStart(5, "0");
  }
  const bytes = new Uint8Array(Math.floor(bits.length / 8));
  for (let i = 0; i < bytes.length; i += 1) {
    bytes[i] = parseInt(bits.slice(i * 8, i * 8 + 8), 2);
  }
  return bytes;
}

async function hotp(secretBytes: Uint8Array, counter: number): Promise<string> {
  const counterBytes = new ArrayBuffer(8);
  const view = new DataView(counterBytes);
  // JS numbers are safe integers well beyond any realistic counter value here.
  view.setUint32(4, counter >>> 0, false);
  view.setUint32(0, Math.floor(counter / 2 ** 32), false);

  const key = await crypto.subtle.importKey("raw", secretBytes as BufferSource, { name: "HMAC", hash: "SHA-1" }, false, ["sign"]);
  const signature = new Uint8Array(await crypto.subtle.sign("HMAC", key, counterBytes));

  const offset = signature[signature.length - 1] & 0x0f;
  const binary =
    ((signature[offset] & 0x7f) << 24) |
    ((signature[offset + 1] & 0xff) << 16) |
    ((signature[offset + 2] & 0xff) << 8) |
    (signature[offset + 3] & 0xff);

  return String(binary % 10 ** CODE_DIGITS).padStart(CODE_DIGITS, "0");
}

export function adminMfaConfigured(): boolean {
  return (process.env.ADMIN_TOTP_SECRET ?? "").length >= 16;
}

/**
 * Verifies a 6-digit code against the configured secret, allowing the
 * previous and next 30-second step to absorb clock drift between the
 * server and the admin's authenticator app.
 */
export async function verifyTotp(code: string): Promise<boolean> {
  const secret = process.env.ADMIN_TOTP_SECRET ?? "";
  if (secret.length < 16) return false;
  const normalized = code.replace(/\s+/g, "");
  if (!/^\d{6}$/.test(normalized)) return false;

  const secretBytes = base32Decode(secret);
  if (secretBytes.length === 0) return false;
  const counter = Math.floor(Date.now() / 1000 / STEP_SECONDS);

  for (const drift of [0, -1, 1]) {
    const candidate = await hotp(secretBytes, counter + drift);
    if (constantTimeEqual(candidate, normalized)) return true;
  }
  return false;
}
