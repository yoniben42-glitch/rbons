export function auditLog(event: string, data: Record<string, unknown> = {}) {
  // Structured logging: never pass raw request bodies, tokens, cookies, or secrets.
  console.log(
    JSON.stringify({
      ts: new Date().toISOString(),
      service: "rbonsu-photography",
      event,
      ...data,
    }),
  );
}
