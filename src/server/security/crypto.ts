import { createHash, randomUUID } from "node:crypto";

export function newInquiryId() {
  return `inq_${randomUUID()}`;
}

export function hashIdentifier(value: string) {
  const salt = process.env.AUDIT_HASH_SALT;
  if (!salt) return undefined;
  return createHash("sha256").update(`${salt}:${value}`).digest("hex");
}
