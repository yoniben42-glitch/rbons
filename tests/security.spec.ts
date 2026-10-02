import { expect, test } from "@playwright/test";

test("security headers are present", async ({ request }) => {
  const response = await request.get("/");
  expect(response.ok()).toBeTruthy();

  const headers = response.headers();
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["permissions-policy"]).toContain("geolocation=()");
  expect(headers["content-security-policy"]).toContain("default-src 'self'");
});

test("inquiry endpoint rejects cross-origin mutation", async ({ request }) => {
  const response = await request.post("/api/inquiries", {
    headers: {
      Origin: "https://attacker.example",
      "Content-Type": "application/json",
    },
    data: { name: "Test", email: "test@example.com", service: "portraits", message: "Hello test" },
  });

  expect(response.status()).toBe(403);
  expect((await response.json()).success).toBe(false);
});

test("inquiry endpoint rejects malformed and oversized requests safely", async ({ request }) => {
  const malformed = await request.post("/api/inquiries", {
    headers: {
      Origin: "http://127.0.0.1:8080",
      "Content-Type": "application/json",
    },
    data: "{not-json}",
  });
  expect(malformed.status()).toBe(400);

  const oversized = await request.post("/api/inquiries", {
    headers: {
      Origin: "http://127.0.0.1:8080",
      "Content-Type": "application/json",
      "Content-Length": String(25 * 1024),
    },
    data: JSON.stringify({ name: "A".repeat(25_000) }),
  });
  expect([413, 429]).toContain(oversized.status());
});
