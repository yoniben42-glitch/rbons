import type { ImageCategory } from "@/types/image";

/** Canonical Supabase gallery categories used to illustrate each service. */
export const SERVICE_GALLERY_CATEGORIES: Record<string, ImageCategory[]> = {
  weddings: ["wedding-couples", "culture-events"],
  portraits: ["portraits-fashion"],
  "maternity-family": ["maternity", "children-family"],
  commercial: ["portraits-fashion", "culture-events"],
};

export function categoriesForService(slug: string): ImageCategory[] {
  return SERVICE_GALLERY_CATEGORIES[slug] ?? [];
}
