/**
 * Defense-in-depth for uploaded gallery images, without adding an image
 * codec dependency to the Worker bundle:
 *
 *  - `readImageDimensions` parses just enough of the container format
 *    (JPEG SOF marker / PNG IHDR / WebP VP8 headers) to get authoritative
 *    pixel dimensions, so upload validation never trusts client-supplied
 *    width/height form fields and can reject implausible/decompression-bomb
 *    dimensions before the file is ever stored or served.
 *  - `stripImageMetadata` removes EXIF/XMP/text metadata segments at the
 *    container level (well-defined, well-bounded byte ranges) so published
 *    gallery originals don't carry embedded location/device metadata.
 *
 * This does not decode pixel data, so it cannot catch a decoder exploit
 * inside a browser's own image parser or a malformed-but-dimension-valid
 * file. Full protection against that class of issue needs a real decode/
 * re-encode pass through a codec (e.g. a WASM JPEG/PNG/WebP encoder such as
 * @jsquash/*), which is a larger addition intentionally left for a follow-up
 * since it adds a new dependency and Worker bundle weight.
 */

export const MAX_IMAGE_PIXELS = 40_000_000; // ~40MP — generous for photography, bounds worst-case memory use downstream.
export const MAX_IMAGE_DIMENSION = 12_000; // pixels, either axis

export function readImageDimensions(bytes: Uint8Array, mimeType: string): { width: number; height: number } | null {
  if (mimeType === "image/jpeg") return readJpegDimensions(bytes);
  if (mimeType === "image/png") return readPngDimensions(bytes);
  if (mimeType === "image/webp") return readWebpDimensions(bytes);
  return null;
}

function readPngDimensions(bytes: Uint8Array): { width: number; height: number } | null {
  // IHDR is always the first chunk, at a fixed offset, in a well-formed PNG.
  if (bytes.length < 33) return null;
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const width = view.getUint32(16, false);
  const height = view.getUint32(20, false);
  if (!width || !height) return null;
  return { width, height };
}

function readJpegDimensions(bytes: Uint8Array): { width: number; height: number } | null {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let offset = 2; // skip SOI (0xFFD8)
  while (offset + 4 <= bytes.length) {
    if (bytes[offset] !== 0xff) { offset += 1; continue; }
    const marker = bytes[offset + 1];
    // Standalone markers with no length/payload.
    if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7)) { offset += 2; continue; }
    if (offset + 4 > bytes.length) return null;
    const segmentLength = view.getUint16(offset + 2, false);
    const isSofMarker = (marker >= 0xc0 && marker <= 0xcf) && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
    if (isSofMarker) {
      if (offset + 9 > bytes.length) return null;
      const height = view.getUint16(offset + 5, false);
      const width = view.getUint16(offset + 7, false);
      if (!width || !height) return null;
      return { width, height };
    }
    if (marker === 0xda) break; // start of scan: no more headers before entropy-coded data
    offset += 2 + segmentLength;
  }
  return null;
}

function readWebpDimensions(bytes: Uint8Array): { width: number; height: number } | null {
  if (bytes.length < 30) return null;
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const fourCc = (start: number) => String.fromCharCode(bytes[start], bytes[start + 1], bytes[start + 2], bytes[start + 3]);
  if (fourCc(0) !== "RIFF" || fourCc(8) !== "WEBP") return null;
  const chunkType = fourCc(12);
  if (chunkType === "VP8X") {
    const width = 1 + (view.getUint32(24, true) & 0x00ffffff);
    const height = 1 + (view.getUint32(27, true) & 0x00ffffff);
    return { width, height };
  }
  if (chunkType === "VP8 ") {
    // Lossy: dimensions are 14-bit values following a 3-byte frame tag and sync code, at offset 26/28.
    if (bytes.length < 30) return null;
    const width = view.getUint16(26, true) & 0x3fff;
    const height = view.getUint16(28, true) & 0x3fff;
    return { width, height };
  }
  if (chunkType === "VP8L") {
    if (bytes.length < 25) return null;
    const bits = view.getUint32(21, true);
    const width = (bits & 0x3fff) + 1;
    const height = ((bits >> 14) & 0x3fff) + 1;
    return { width, height };
  }
  return null;
}

export function dimensionsWithinLimits(dimensions: { width: number; height: number }): boolean {
  const { width, height } = dimensions;
  if (width <= 0 || height <= 0) return false;
  if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) return false;
  return width * height <= MAX_IMAGE_PIXELS;
}

export function stripImageMetadata(bytes: Uint8Array, mimeType: string): Uint8Array {
  if (mimeType === "image/jpeg") return stripJpegMetadata(bytes);
  if (mimeType === "image/png") return stripPngMetadata(bytes);
  if (mimeType === "image/webp") return stripWebpMetadata(bytes);
  return bytes;
}

/** Removes APP1 (EXIF/XMP) and COM (comment) segments; keeps JFIF/ICC/image data untouched. */
function stripJpegMetadata(bytes: Uint8Array): Uint8Array {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const out: number[] = [0xff, 0xd8];
  let offset = 2;
  while (offset + 4 <= bytes.length) {
    if (bytes[offset] !== 0xff) { out.push(bytes[offset]); offset += 1; continue; }
    const marker = bytes[offset + 1];
    if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7)) {
      out.push(0xff, marker);
      offset += 2;
      continue;
    }
    if (offset + 4 > bytes.length) break;
    const segmentLength = view.getUint16(offset + 2, false);
    const stripSegment = marker === 0xe1 /* APP1: EXIF/XMP */ || marker === 0xfe /* COM */;
    if (!stripSegment) {
      for (let i = offset; i < offset + 2 + segmentLength && i < bytes.length; i += 1) out.push(bytes[i]);
    }
    offset += 2 + segmentLength;
    if (marker === 0xda) {
      // Start of scan: copy the remaining entropy-coded data verbatim.
      for (let i = offset; i < bytes.length; i += 1) out.push(bytes[i]);
      break;
    }
  }
  return new Uint8Array(out);
}

/** Removes eXIf/tEXt/zTXt/iTXt ancillary chunks; keeps all critical chunks. */
function stripPngMetadata(bytes: Uint8Array): Uint8Array {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const signature = bytes.slice(0, 8);
  const out: number[] = Array.from(signature);
  let offset = 8;
  const stripTypes = new Set(["eXIf", "tEXt", "zTXt", "iTXt"]);
  while (offset + 8 <= bytes.length) {
    const length = view.getUint32(offset, false);
    const type = String.fromCharCode(bytes[offset + 4], bytes[offset + 5], bytes[offset + 6], bytes[offset + 7]);
    const chunkEnd = offset + 8 + length + 4; // length + type + data + CRC
    if (chunkEnd > bytes.length) break;
    if (!stripTypes.has(type)) {
      for (let i = offset; i < chunkEnd; i += 1) out.push(bytes[i]);
    }
    offset = chunkEnd;
    if (type === "IEND") break;
  }
  return new Uint8Array(out);
}

/** Removes RIFF EXIF/XMP chunks; keeps VP8/VP8L/VP8X and ALPH/ANIM image chunks intact. */
function stripWebpMetadata(bytes: Uint8Array): Uint8Array {
  if (bytes.length < 12) return bytes;
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const fourCc = (start: number) => String.fromCharCode(bytes[start], bytes[start + 1], bytes[start + 2], bytes[start + 3]);
  if (fourCc(0) !== "RIFF" || fourCc(8) !== "WEBP") return bytes;

  const chunks: number[][] = [];
  let offset = 12;
  const stripTypes = new Set(["EXIF", "XMP "]);
  while (offset + 8 <= bytes.length) {
    const type = fourCc(offset);
    const size = view.getUint32(offset + 4, true);
    const paddedSize = size + (size % 2);
    const chunkEnd = offset + 8 + paddedSize;
    if (chunkEnd > bytes.length) break;
    if (!stripTypes.has(type)) {
      chunks.push(Array.from(bytes.slice(offset, chunkEnd)));
    }
    offset = chunkEnd;
  }

  const body = chunks.flat();
  const totalLength = 4 + body.length; // "WEBP" + chunks, per the RIFF size field's definition
  const out = new Uint8Array(12 + body.length); // "RIFF" + size + "WEBP" + chunks
  const outView = new DataView(out.buffer);
  out.set([0x52, 0x49, 0x46, 0x46], 0); // "RIFF"
  outView.setUint32(4, totalLength, true);
  out.set([0x57, 0x45, 0x42, 0x50], 8); // "WEBP"
  out.set(body, 12);
  return out;
}
