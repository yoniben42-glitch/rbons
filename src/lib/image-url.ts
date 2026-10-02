/**
 * Responsive Supabase Storage image URLs.
 *
 * When VITE_SUPABASE_IMAGE_TRANSFORM=true, public Storage URLs are routed through
 * Supabase's image transformation endpoint. Supabase returns optimized WebP to
 * supporting browsers automatically. The original URL remains the fallback so
 * the site still works on plans/environments without image transformations.
 */

const TRANSFORM_ENABLED = import.meta.env.VITE_SUPABASE_IMAGE_TRANSFORM === 'true';

function toTransformUrl(src: string, width: number, quality = 78): string {
  try {
    const url = new URL(src);
    const marker = '/storage/v1/object/public/';
    const markerIndex = url.pathname.indexOf(marker);

    if (markerIndex === -1) return src;

    const assetPath = url.pathname.slice(markerIndex + marker.length);
    const renderPath = `${url.pathname.slice(0, markerIndex)}/storage/v1/render/image/public/${assetPath}`;
    url.pathname = renderPath;
    url.search = `?width=${Math.round(width)}&quality=${Math.round(quality)}`;
    return url.toString();
  } catch {
    return src;
  }
}

export function getResponsiveImageSources(src: string) {
  if (!TRANSFORM_ENABLED || !src.includes('/storage/v1/object/public/')) {
    return {
      src,
      srcSet: undefined,
      sizes: undefined,
    };
  }

  const widths = [480, 768, 1024, 1440, 1920, 2400];
  return {
    src: toTransformUrl(src, 1440),
    srcSet: widths.map((width) => `${toTransformUrl(src, width)} ${width}w`).join(', '),
    sizes: '(max-width: 768px) 100vw, (max-width: 1440px) 100vw, 1720px',
  };
}

export function getHeroImageUrl(src: string, viewportWidth = 1920): string {
  if (!TRANSFORM_ENABLED || !src.includes('/storage/v1/object/public/')) return src;
  const width = viewportWidth <= 768 ? 1200 : viewportWidth <= 1440 ? 1600 : 1920;
  return toTransformUrl(src, width, 82);
}
