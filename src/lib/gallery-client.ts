import { useEffect, useMemo, useState } from "react";
import type { GalleryImage } from "@/server/data/gallery";
import { normalizeGalleryCategory } from "@/types/gallery";
import type { ImageCategory, PhotographyAsset } from "@/types/image";

export type GalleryAsset = PhotographyAsset & { createdAt?: string };

function toAsset(row: GalleryImage): GalleryAsset {
  const orientation = row.width > row.height ? "landscape" : row.width < row.height ? "portrait" : "square";
  const category = normalizeGalleryCategory(row.category);
  return {
    id: row.id,
    title: row.title,
    filename: row.storagePath.split("/").pop() ?? row.id,
    src: row.publicUrl,
    alt: row.alt,
    category,
    categories: [category],
    orientation,
    isFeatured: row.isFeatured,
    isHeroCandidate: row.isFeatured,
    gallery: category,
    sectionUsage: ["gallery_archive", "lightbox"],
    dimensions: {
      width: row.width,
      height: row.height,
      aspectRatio: row.height ? row.width / row.height : 1,
      orientation,
    },
    dominantColor: "#ece7dd",
    curationNotes: undefined,
    status: row.isPublished ? "verified" : "broken",
    createdAt: row.createdAt,
  } as GalleryAsset;
}

export async function fetchDynamicGallery(category = "all") {
  try {
    const url = category === "all" ? "/api/gallery" : `/api/gallery?category=${encodeURIComponent(category)}`;
    const response = await fetch(url, { headers: { Accept: "application/json" }, cache: "no-store" });
    if (!response.ok) return [];
    const payload = await response.json() as { images?: GalleryImage[] };
    const seen = new Set<string>();
    return (payload.images ?? [])
      .map(toAsset)
      .filter((asset) => asset.status === "verified")
      .filter((asset) => {
        if (seen.has(asset.src)) return false;
        seen.add(asset.src);
        return true;
      });
  } catch {
    return [];
  }
}

export function useGalleryAssets(category = "all") {
  const [dynamicAssets, setDynamicAssets] = useState<GalleryAsset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchDynamicGallery(category).then((rows) => {
      if (!active) return;
      setDynamicAssets(rows);
      setLoading(false);
    });
    return () => { active = false; };
  }, [category]);

  const assets = useMemo(() => dynamicAssets, [dynamicAssets]);

  return { assets, loading };
}

export function useGalleryAssetsByCategories(categories: ImageCategory[]) {
  const categoryKey = Array.from(new Set(categories)).join("|");
  const requestedCategories = useMemo(
    () => (categoryKey ? categoryKey.split("|") as ImageCategory[] : []),
    [categoryKey],
  );
  const [dynamicAssets, setDynamicAssets] = useState<GalleryAsset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    if (!requestedCategories.length) {
      setDynamicAssets([]);
      setLoading(false);
      return () => { active = false; };
    }
    Promise.all(requestedCategories.map((category) => fetchDynamicGallery(category)))
      .then((groups) => {
        if (!active) return;
        const seen = new Set<string>();
        const merged = groups.flat().filter((asset) => {
          if (seen.has(asset.src)) return false;
          seen.add(asset.src);
          return true;
        });
        setDynamicAssets(merged);
        setLoading(false);
      })
      .catch(() => {
        if (!active) return;
        setDynamicAssets([]);
        setLoading(false);
      });
    return () => { active = false; };
  }, [requestedCategories]);

  return { assets: dynamicAssets, loading };
}
