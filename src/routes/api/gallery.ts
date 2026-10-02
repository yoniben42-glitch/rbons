import { createFileRoute } from "@tanstack/react-router";
import { listGalleryImages } from "@/server/data/gallery";

export const Route = createFileRoute("/api/gallery")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const category = new URL(request.url).searchParams.get("category") ?? "all";
          const images = await listGalleryImages({ publishedOnly: true, category });
          return Response.json(
            { success: true, images },
            { headers: { "Cache-Control": "no-store" } },
          );
        } catch {
          return Response.json({ success: false, images: [] }, { status: 503 });
        }
      },
    },
  },
});
