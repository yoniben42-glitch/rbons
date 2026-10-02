/** Shared server-only Supabase REST helpers. Keep service-role credentials in Worker secrets. */

export class SupabaseRequestError extends Error {
  status: number;
  body: string;

  constructor(status: number, body: string) {
    super(`Supabase ${status}: ${body.slice(0, 500)}`);
    this.name = "SupabaseRequestError";
    this.status = status;
    this.body = body;
  }
}

export function requiredServerEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not configured`);
  return value;
}

export function supabaseUrl(): string {
  return requiredServerEnv("SUPABASE_URL").replace(/\/$/, "");
}

export function supabaseServiceRoleKey(): string {
  return requiredServerEnv("SUPABASE_SERVICE_ROLE_KEY");
}

export async function supabaseRest(path: string, init: RequestInit = {}): Promise<Response> {
  const key = supabaseServiceRoleKey();
  const response = await fetch(`${supabaseUrl()}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  if (!response.ok) {
    throw new SupabaseRequestError(response.status, await response.text());
  }
  return response;
}

export function publicStorageUrl(bucket: string, storagePath: string): string {
  return `${supabaseUrl()}/storage/v1/object/public/${encodeURIComponent(bucket)}/${storagePath
    .split("/")
    .map(encodeURIComponent)
    .join("/")}`;
}
