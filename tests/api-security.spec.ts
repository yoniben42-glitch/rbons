import { expect, test } from "@playwright/test";

const ORIGIN = "http://127.0.0.1:8080";

const ADMIN_ENDPOINTS = [
  "/api/admin-bookings",
  "/api/admin-gallery",
  "/api/admin-inquiries",
  "/api/admin-availability",
  "/api/admin-payments",
];

test("admin endpoints reject unauthenticated reads", async ({ request }) => {
  for (const endpoint of ADMIN_ENDPOINTS) {
    const response = await request.get(endpoint);
    expect(response.status(), `${endpoint} must require authentication`).toBe(401);
    const body = await response.json();
    expect(body.success).toBe(false);
    // The failure must not disclose anything about the backing store.
    expect(JSON.stringify(body)).not.toMatch(/supabase|service_role|postgres/i);
  }
});

test("admin endpoints reject a forged session cookie", async ({ request }) => {
  const response = await request.get("/api/admin-bookings", {
    headers: { Cookie: "rbonsu_admin=not-the-configured-token" },
  });
  expect(response.status()).toBe(401);
});

test("admin login rejects cross-origin and invalid credentials", async ({ request }) => {
  const crossOrigin = await request.post("/api/admin-login", {
    headers: { Origin: "https://attacker.example", "Content-Type": "application/json" },
    data: { token: "anything" },
  });
  expect(crossOrigin.status()).toBe(403);

  const invalid = await request.post("/api/admin-login", {
    headers: { Origin: ORIGIN, "Content-Type": "application/json" },
    data: { token: "definitely-not-the-admin-token" },
  });
  // 503 when ADMIN_DASHBOARD_TOKEN is unset, 401 when configured; never 200.
  expect([401, 429, 503]).toContain(invalid.status());
  expect(invalid.status()).not.toBe(200);
});

test("booking endpoint enforces origin, content type and date rules", async ({ request }) => {
  const validBody = {
    name: "Test Client",
    email: "test@example.com",
    service: "portraits",
    date: "2020-01-01",
    time: "09:00",
  };

  const crossOrigin = await request.post("/api/bookings", {
    headers: { Origin: "https://attacker.example", "Content-Type": "application/json" },
    data: validBody,
  });
  expect(crossOrigin.status()).toBe(403);

  const wrongContentType = await request.post("/api/bookings", {
    headers: { Origin: ORIGIN, "Content-Type": "text/plain" },
    data: "hello",
  });
  expect(wrongContentType.status()).toBe(415);

  const pastDate = await request.post("/api/bookings", {
    headers: { Origin: ORIGIN, "Content-Type": "application/json" },
    data: validBody,
  });
  expect(pastDate.status()).toBe(400);

  const badEmail = await request.post("/api/bookings", {
    headers: { Origin: ORIGIN, "Content-Type": "application/json" },
    data: { ...validBody, email: "not-an-email", date: "2030-06-12" },
  });
  expect(badEmail.status()).toBe(400);
});

test("client portal rejects short or missing tokens", async ({ request }) => {
  const missing = await request.get("/api/booking-portal");
  expect(missing.status()).toBe(401);

  const short = await request.get("/api/booking-portal?token=abc");
  expect(short.status()).toBe(401);
});

test("stripe webhook refuses unsigned payloads", async ({ request }) => {
  const response = await request.post("/api/stripe-webhook", {
    headers: { "Content-Type": "application/json" },
    data: { id: "evt_test", type: "checkout.session.completed", data: { object: {} } },
  });
  // 400 when a webhook secret is configured, 503 when it is not. Never 200.
  expect([400, 503]).toContain(response.status());
});
