import { useRouterState } from "@tanstack/react-router";

export function useLocation() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return { pathname };
}

export function useParams<T extends Record<string, string>>() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const parts = pathname.split("/").filter(Boolean);
  return { slug: parts[1] ?? "" } as unknown as T;
}

export function useSearchParams() {
  const href = useRouterState({ select: (s) => s.location.href });
  let query = "";
  try {
    const url = new URL(href, "https://rbonsu.local");
    query = url.search.replace(/^\?/, "");
  } catch {
    query = "";
  }
  const params = new URLSearchParams(query);
  return [params] as const;
}
