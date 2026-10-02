import {
  GALLERY_CATEGORIES,
  galleryCategoryQueryValues,
  normalizeGalleryCategory,
} from "@/types/gallery";
import type { GalleryCategory } from "@/types/gallery";
import {
  publicStorageUrl as buildPublicStorageUrl,
  supabaseRest,
  supabaseServiceRoleKey,
  supabaseUrl,
} from "./supabase";
import { readImageDimensions } from "../security/image-processing";
import { isCanonicalGalleryCategory } from "@/types/gallery";
export { GALLERY_CATEGORIES };
export type { GalleryCategory };

export type GalleryImage = {
  id: string;
  title: string;
  alt: string;
  category: GalleryCategory;
  storagePath: string;
  publicUrl: string;
  width: number;
  height: number;
  mimeType: string;
  fileSize: number;
  isPublished: boolean;
  isFeatured: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

function bucket() {
  return process.env.SUPABASE_STORAGE_BUCKET || "rbonsu-photography";
}

function map(row: Record<string, unknown>): GalleryImage {
  return {
    id: String(row.id),
    title: String(row.title ?? "Untitled"),
    alt: String(row.alt ?? row.title ?? "RBONSU Photography"),
    category: normalizeGalleryCategory(String(row.category ?? "other")),
    storagePath: String(row.storage_path),
    publicUrl: String(row.public_url),
    width: Number(row.width ?? 0),
    height: Number(row.height ?? 0),
    mimeType: String(row.mime_type ?? "image/webp"),
    fileSize: Number(row.file_size ?? 0),
    isPublished: Boolean(row.is_published),
    isFeatured: Boolean(row.is_featured),
    sortOrder: Number(row.sort_order ?? 0),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

export async function listGalleryImages(options: { publishedOnly?: boolean; category?: string } = {}) {
  const filters = ["order=sort_order.desc,created_at.desc", "limit=5000"];
  if (options.publishedOnly) filters.unshift("is_published=eq.true");
  if (options.category && options.category !== "all") {
    const values = galleryCategoryQueryValues(options.category);
    if (values.length === 1) {
      filters.unshift(`category=eq.${encodeURIComponent(values[0])}`);
    } else {
      filters.unshift(`category=in.(${values.map(encodeURIComponent).join(",")})`);
    }
  }
  const response = await supabaseRest(`gallery_images?select=*&${filters.join("&")}`, { method: "GET" });
  const rows = await response.json() as Record<string, unknown>[];
  const seen = new Set<string>();
  return rows.map(map).filter((row) => {
    const topLevelFolder = row.storagePath.split("/")[0] ?? "";
    if (!isCanonicalGalleryCategory(topLevelFolder)) return false;
    if (topLevelFolder !== row.category) return false;
    if (seen.has(row.storagePath)) return false;
    seen.add(row.storagePath);
    return true;
  });
}

export async function insertGalleryImage(input: Omit<GalleryImage, "createdAt" | "updatedAt">) {
  await supabaseRest("gallery_images", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({
      id: input.id,
      title: input.title,
      alt: input.alt,
      category: input.category,
      storage_path: input.storagePath,
      public_url: input.publicUrl,
      width: input.width,
      height: input.height,
      mime_type: input.mimeType,
      file_size: input.fileSize,
      is_published: input.isPublished,
      is_featured: input.isFeatured,
      sort_order: input.sortOrder,
    }),
  });
}

export async function updateGalleryImage(id: string, patch: Record<string, unknown>) {
  await supabaseRest(`gallery_images?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ ...patch, updated_at: new Date().toISOString() }),
  });
}

export async function deleteStorageObjects(storagePaths: string[]) {
  if (storagePaths.length === 0) return;
  const storageUrl = `${supabaseUrl()}/storage/v1/object/${encodeURIComponent(bucket())}`;
  const response = await fetch(storageUrl, {
    method: "POST",
    headers: {
      apikey: supabaseServiceRoleKey(),
      Authorization: `Bearer ${supabaseServiceRoleKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prefixes: storagePaths }),
  });
  if (!response.ok && response.status !== 404) throw new Error(`Storage delete failed: ${response.status}`);
}

export async function deleteGalleryImage(id: string) {
  const existing = await supabaseRest(`gallery_images?select=storage_path&id=eq.${encodeURIComponent(id)}&limit=1`, { method: "GET" });
  const rows = await existing.json() as Array<{ storage_path?: string }>;
  const storagePath = rows[0]?.storage_path;
  if (storagePath) await deleteStorageObjects([storagePath]);
  await supabaseRest(`gallery_images?id=eq.${encodeURIComponent(id)}`, { method: "DELETE" });
}

export function publicStorageUrl(storagePath: string) {
  return buildPublicStorageUrl(bucket(), storagePath);
}

export function storageBucketName() {
  return bucket();
}

type StorageObject = {
  name?: string;
  id?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  metadata?: Record<string, unknown> | null;
};

type StorageScanFolder = {
  folder: string;
  category: GalleryCategory;
};

const STORAGE_SCAN_FOLDERS: StorageScanFolder[] = GALLERY_CATEGORIES.map(({ id }) => ({
  folder: id,
  category: id,
}));

function isImageObject(object: StorageObject) {
  const name = object.name ?? "";
  if (!name || name.endsWith("/")) return false;
  const contentType = String(object.metadata?.mimetype ?? object.metadata?.contentType ?? "").toLowerCase();
  return contentType.startsWith("image/") || /\.(jpe?g|png|webp)$/i.test(name);
}

function storageObjectPath(folder: string, objectName: string) {
  return `${folder}/${objectName}`.replace(/^\/+/, "");
}

async function listStorageFolder(prefix: string): Promise<StorageObject[]> {
  const url = `${supabaseUrl()}/storage/v1/object/list/${encodeURIComponent(bucket())}`;
  const all: StorageObject[] = [];
  for (let offset = 0; ; offset += 1000) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        apikey: supabaseServiceRoleKey(),
        Authorization: `Bearer ${supabaseServiceRoleKey()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prefix, limit: 1000, offset, sortBy: { column: "name", order: "asc" } }),
    });
    if (!response.ok) throw new Error(`Storage list failed for ${prefix}: ${response.status}`);
    const rows = await response.json() as StorageObject[];
    all.push(...rows);
    if (rows.length < 1000) break;
  }
  return all;
}

async function readImageHeader(storagePath: string, mimeTypeHint = "") {
  const response = await fetch(publicStorageUrl(storagePath), {
    method: "GET",
    headers: { Range: "bytes=0-262143" },
    cache: "no-store",
  });
  if (!response.ok && response.status !== 206) {
    throw new Error(`Image read failed for ${storagePath}: ${response.status}`);
  }
  const buffer = await response.arrayBuffer();
  if (buffer.byteLength === 0) throw new Error(`Empty image for ${storagePath}`);
  const dimensions = readImageDimensions(new Uint8Array(buffer), mimeTypeHint);
  if (!dimensions) throw new Error(`Could not read image dimensions for ${storagePath}`);
  return dimensions;
}

function titleFromStoragePath(storagePath: string) {
  const filename = storagePath.split("/").pop() ?? storagePath;
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim() || "RBONSU Photography";
}

function categoryAlt(category: GalleryCategory, title: string) {
  const label = GALLERY_CATEGORIES.find((item) => item.id === category)?.label ?? "Photography";
  return `${label} — ${title}`;
}

function asEpoch(value?: string | null) {
  if (!value) return Date.now();
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : Date.now();
}

/**
 * Register storage objects in gallery_images so dashboard uploads appear on the public site.
 * Also repairs legacy rows whose dimensions were previously stored as 0/0.
 */
export async function syncStorageGallery() {
  const existingResponse = await supabaseRest(
    "gallery_images?select=id,storage_path,width,height,mime_type,file_size&limit=5000",
    { method: "GET" },
  );
  const existingRows = await existingResponse.json() as Array<{
    id: string;
    storage_path: string;
    width: number;
    height: number;
    mime_type?: string | null;
    file_size?: number | null;
  }>;
  const existingByPath = new Map(existingRows.map((row) => [row.storage_path, row]));

  let scanned = 0;
  let added = 0;
  let repaired = 0;
  const unresolved: Array<{ path: string; reason: string }> = [];

  for (const { folder, category } of STORAGE_SCAN_FOLDERS) {
    const objects = await listStorageFolder(folder);
    for (const object of objects) {
      if (!isImageObject(object)) continue;
      const storagePath = storageObjectPath(folder, String(object.name));
      scanned += 1;
      const existing = existingByPath.get(storagePath);
      const metadataMime = String(object.metadata?.mimetype ?? object.metadata?.contentType ?? "");
      const mimeType = metadataMime.startsWith("image/") ? metadataMime : "image/webp";
      const fileSize = Number(object.metadata?.size ?? object.metadata?.contentLength ?? 0) || 0;

      if (existing && Number(existing.width) > 0 && Number(existing.height) > 0) continue;

      try {
        const dimensions = await readImageHeader(storagePath, mimeType);
        if (existing) {
          await updateGalleryImage(existing.id, {
            width: dimensions.width,
            height: dimensions.height,
            mime_type: mimeType,
            file_size: fileSize || existing.file_size || 0,
            category,
            public_url: publicStorageUrl(storagePath),
            is_published: true,
          });
          repaired += 1;
        } else {
          const createdAt = object.created_at ?? object.updated_at ?? new Date().toISOString();
          const safePathId = storagePath.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 72);
          const id = `storage-${safePathId}-${crypto.randomUUID().slice(0, 10)}`;
          await insertGalleryImage({
            id,
            title: titleFromStoragePath(storagePath),
            alt: categoryAlt(category, titleFromStoragePath(storagePath)),
            category,
            storagePath,
            publicUrl: publicStorageUrl(storagePath),
            width: dimensions.width,
            height: dimensions.height,
            mimeType,
            fileSize,
            isPublished: true,
            isFeatured: false,
            sortOrder: asEpoch(createdAt),
          });
          added += 1;
        }
      } catch (error) {
        unresolved.push({ path: storagePath, reason: error instanceof Error ? error.message : String(error) });
      }
    }
  }

  return { scanned, added, repaired, skipped: scanned - added - repaired - unresolved.length, unresolved };
}
