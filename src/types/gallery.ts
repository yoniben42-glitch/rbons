export const GALLERY_CATEGORIES = [
  { id: "wedding-couples", label: "Wedding & Couples" },
  { id: "maternity", label: "Maternity" },
  { id: "children-family", label: "Children & Family" },
  { id: "portraits-fashion", label: "Portraits & Fashion" },
  { id: "culture-events", label: "Culture & Events" },
  { id: "graduation", label: "Graduation" },
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number]["id"];

/** Historical database/storage category aliases retained only for migration compatibility. */
export type LegacyGalleryCategory =
  | "weddings"
  | "engagement"
  | "lifestyle-birthdays"
  | "newborn-kids-family"
  | "christmas-season"
  | "events-performance"
  | "cultural-traditional"
  | "models-boudoir"
  | "events"
  | "editorial"
  | "commercial"
  | "other";

/** Normalize historical category names to the six canonical public categories. */
export function normalizeGalleryCategory(category: string): GalleryCategory {
  switch (category) {
    case "weddings":
    case "engagement":
      return "wedding-couples";
    case "maternity":
      return "maternity";
    case "newborn-kids-family":
    case "christmas-season":
      return "children-family";
    case "portraits-fashion":
    case "models-boudoir":
    case "editorial":
    case "commercial":
    case "portraits":
      return "portraits-fashion";
    case "events-performance":
    case "cultural-traditional":
    case "events":
    case "lifestyle-birthdays":
      return "culture-events";
    case "graduation":
      return "graduation";
    default:
      return "culture-events";
  }
}

/** Public API accepts only canonical category ids; legacy aliases are never emitted. */
export function galleryCategoryQueryValues(category: string): string[] {
  const normalized = normalizeGalleryCategory(category);
  return [normalized];
}

export function isCanonicalGalleryCategory(value: string): value is GalleryCategory {
  return GALLERY_CATEGORIES.some((item) => item.id === value);
}
