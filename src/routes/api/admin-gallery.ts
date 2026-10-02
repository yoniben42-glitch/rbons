import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { isAdmin, originMatchesAdminRequest } from "@/server/security/admin";
import { auditLog } from "@/server/security/logging";
import { internalErrorDetail } from "@/server/security/errors";
import {
  GALLERY_CATEGORIES,
  type GalleryCategory,
  deleteGalleryImage,
  deleteStorageObjects,
  insertGalleryImage,
  listGalleryImages,
  publicStorageUrl,
  storageBucketName,
  syncStorageGallery,
  updateGalleryImage,
} from "@/server/data/gallery";
import { dimensionsWithinLimits, readImageDimensions, stripImageMetadata } from "@/server/security/image-processing";

const categoryValues = GALLERY_CATEGORIES.map((item) => item.id) as [string, ...string[]];
const MAX_IMAGE_BYTES = 15 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

async function hasValidImageSignature(file: File) {
  const bytes = new Uint8Array(await file.slice(0, 16).arrayBuffer());
  if (file.type === "image/jpeg") {
    return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  }
  if (file.type === "image/png") {
    const signature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
    return bytes.length >= signature.length && signature.every((value, index) => bytes[index] === value);
  }
  if (file.type === "image/webp") {
    return bytes.length >= 12 &&
      bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
      bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50;
  }
  return false;
}

function safeSlug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 70) || "image";
}

async function uploadToStorage(bytes: Uint8Array, contentType: string, storagePath: string) {
  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) throw new Error("Supabase server configuration is missing.");
  const url = `${supabaseUrl}/storage/v1/object/${encodeURIComponent(storageBucketName())}/${storagePath.split("/").map(encodeURIComponent).join("/")}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": contentType || "application/octet-stream",
      "x-upsert": "false",
      "cache-control": "31536000",
    },
    body: bytes as BodyInit,
  });
  if (!response.ok) throw new Error(`Storage upload failed: ${response.status}`);
}

export const Route = createFileRoute("/api/admin-gallery")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!(await isAdmin(request))) return Response.json({ success: false, error: "Unauthorized." }, { status: 401 });
        const images = await listGalleryImages();
        return Response.json({ success: true, images, categories: GALLERY_CATEGORIES }, { headers: { "Cache-Control": "no-store" } });
      },
      POST: async ({ request }) => {
        if (!(await isAdmin(request))) return Response.json({ success: false, error: "Unauthorized." }, { status: 401 });
        if (!originMatchesAdminRequest(request)) return Response.json({ success: false, error: "Request origin could not be verified." }, { status: 403 });
        const form = await request.formData();
        if (String(form.get("action") ?? "") === "sync") {
          try {
            const result = await syncStorageGallery();
            return Response.json({ success: true, result }, { headers: { "Cache-Control": "no-store" } });
          } catch (error) {
            auditLog("admin.gallery.sync_failed", { detail: internalErrorDetail(error) });
            return Response.json({ success: false, error: "Gallery sync failed. Please try again." }, { status: 503 });
          }
        }
        const file = form.get("file");
        const categoryRaw = String(form.get("category") ?? "");
        const titleRaw = String(form.get("title") ?? "").trim();
        const altRaw = String(form.get("alt") ?? "").trim();
        const isFeatured = String(form.get("isFeatured") ?? "false") === "true";
        if (!(file instanceof File)) return Response.json({ success: false, error: "Image file required." }, { status: 400 });
        if (file.size > MAX_IMAGE_BYTES) return Response.json({ success: false, error: "Image is too large. Maximum 15 MB." }, { status: 413 });
        if (!ALLOWED_TYPES.has(file.type)) return Response.json({ success: false, error: "Only JPEG, PNG, and WebP images are supported." }, { status: 415 });
        if (!(await hasValidImageSignature(file))) return Response.json({ success: false, error: "The uploaded file is not a valid JPEG, PNG, or WebP image." }, { status: 415 });
        const category = z.enum(categoryValues as [string, ...string[]]).safeParse(categoryRaw);
        if (!category.success) return Response.json({ success: false, error: "Invalid gallery category." }, { status: 400 });

        // Dimensions are read from the file's own header, never trusted from
        // the client-supplied form fields, and bounded to guard against
        // decompression-bomb-style pixel dimensions before the file is ever
        // stored or served publicly.
        const originalBytes = new Uint8Array(await file.arrayBuffer());
        const dimensions = readImageDimensions(originalBytes, file.type);
        if (!dimensions || !dimensionsWithinLimits(dimensions)) {
          return Response.json({ success: false, error: "Image dimensions could not be verified or exceed the allowed size." }, { status: 415 });
        }
        // Strips EXIF/XMP/comment metadata (which can embed GPS location and
        // device details) before the file is written to the public bucket.
        const sanitizedBytes = stripImageMetadata(originalBytes, file.type);

        const now = Date.now();
        const id = `img_${crypto.randomUUID()}`;
        const baseTitle = titleRaw || file.name.replace(/\.[^.]+$/, "");
        const ext = file.type === "image/png" ? "png" : file.type === "image/jpeg" ? "jpg" : "webp";
        const storagePath = `${category.data}/${now}-${safeSlug(baseTitle)}-${crypto.randomUUID().slice(0, 8)}.${ext}`;
        const publicUrl = publicStorageUrl(storagePath);

        try {
          await uploadToStorage(sanitizedBytes, file.type, storagePath);
          try {
            await insertGalleryImage({
              id,
              title: baseTitle.slice(0, 180),
              alt: (altRaw || `${baseTitle} — RBONSU Photography`).slice(0, 300),
              category: category.data as GalleryCategory,
              storagePath,
              publicUrl,
              width: dimensions.width,
              height: dimensions.height,
              mimeType: file.type,
              fileSize: sanitizedBytes.length,
              isPublished: true,
              isFeatured,
              sortOrder: now,
            });
          } catch (insertError) {
            // The object already landed in storage; without this cleanup it
            // would be orphaned there with no metadata row pointing to it.
            await deleteStorageObjects([storagePath]).catch((cleanupError) => {
              auditLog("admin.gallery.orphan_cleanup_failed", { detail: internalErrorDetail(cleanupError), storagePath });
            });
            throw insertError;
          }
          return Response.json({ success: true, image: { id, title: baseTitle, category: category.data, publicUrl } }, { status: 201 });
        } catch (error) {
          auditLog("admin.gallery.upload_failed", { detail: internalErrorDetail(error), category: category.data });
          return Response.json({ success: false, error: "Upload failed. Please try again." }, { status: 503 });
        }
      },
      PATCH: async ({ request }) => {
        if (!(await isAdmin(request))) return Response.json({ success: false, error: "Unauthorized." }, { status: 401 });
        if (!originMatchesAdminRequest(request)) return Response.json({ success: false, error: "Request origin could not be verified." }, { status: 403 });
        const body = await request.json() as { id?: string; title?: string; alt?: string; category?: string; isPublished?: boolean; isFeatured?: boolean; sortOrder?: number };
        if (!body.id) return Response.json({ success: false, error: "Image id required." }, { status: 400 });
        const patch: Record<string, unknown> = {};
        if (typeof body.title === "string") patch.title = body.title.trim().slice(0, 180);
        if (typeof body.alt === "string") patch.alt = body.alt.trim().slice(0, 300);
        if (typeof body.category === "string" && categoryValues.includes(body.category)) patch.category = body.category;
        if (typeof body.isPublished === "boolean") patch.is_published = body.isPublished;
        if (typeof body.isFeatured === "boolean") patch.is_featured = body.isFeatured;
        if (Number.isInteger(body.sortOrder)) patch.sort_order = body.sortOrder;
        if (!Object.keys(patch).length) return Response.json({ success: false, error: "No valid changes." }, { status: 400 });
        await updateGalleryImage(body.id, patch);
        return Response.json({ success: true });
      },
      DELETE: async ({ request }) => {
        if (!(await isAdmin(request))) return Response.json({ success: false, error: "Unauthorized." }, { status: 401 });
        if (!originMatchesAdminRequest(request)) return Response.json({ success: false, error: "Request origin could not be verified." }, { status: 403 });
        const id = new URL(request.url).searchParams.get("id") ?? "";
        if (!id) return Response.json({ success: false, error: "Image id required." }, { status: 400 });
        await deleteGalleryImage(id);
        return Response.json({ success: true });
      },
    },
  },
});
