/**
 * RBONSU PHOTOGRAPHY — AUTHENTIC IMAGE DATA ARCHITECTURE
 * Centralized Image Registry & Types for the verified photography catalog
 */

export type ImageOrientation = 'portrait' | 'landscape' | 'square';

export type ImageCategory =
  | 'wedding-couples'
  | 'children-family'
  | 'culture-events'
  | 'weddings'
  | 'maternity'
  | 'engagement'
  | 'engagements'
  | 'lifestyle-birthdays'
  | 'newborn-kids-family'
  | 'christmas-season'
  | 'family'
  | 'portraits'
  | 'lifestyle'
  | 'birthdays'
  | 'events'
  | 'models-boudoir'
  | 'portraits-fashion'
  | 'events-performance'
  | 'cultural-traditional'
  | 'graduation'
  | 'editorial'
  | 'commercial'
  | 'all'
  | 'other';

export type SectionUsage =
  | 'hero'
  | 'hero_candidate'
  | 'featured_grid'
  | 'curated_stories'
  | 'cinematic_ribbon'
  | 'services'
  | 'about'
  | 'gallery_archive'
  | 'lightbox'
  | 'client_proofing';

export interface PhotographyAsset {
  /** Unique stable identifier (e.g. 'rbonsu-001') */
  id: string;

  /** Clean human-readable title derived from shoot session */
  title: string;

  /** Original camera/archive filename */
  filename: string;

  /** Active rendering URL — Supabase Storage public URL */
  src: string;

  /** Accessible, descriptive alternative text grounded in factual visual elements */
  alt: string;

  /** Primary category */
  category: ImageCategory;

  /** Secondary / multi-tag categories */
  categories: ImageCategory[];

  /** Visual orientation */
  orientation: ImageOrientation;

  /** Prime featured showcase flag */
  isFeatured: boolean;

  /** Full-bleed hero banner candidate */
  isHeroCandidate: boolean;

  /** Story / Collection group */
  gallery: string;

  /** Architectural section placements */
  sectionUsage: SectionUsage[];

  /** Verified dimensions & aspect ratio */
  dimensions: {
    width: number;
    height: number;
    aspectRatio: number;
    orientation?: ImageOrientation;
  };

  /** Dominant hex color for instant perceptual loading placeholders */
  dominantColor: string;

  /** Curatorial note on lighting, palette, mood, or framing */
  curationNotes?: string;

  /** Asset verification status */
  status: 'verified' | 'third-party' | 'placeholder' | 'broken';
}

export interface ImageManifestFilter {
  category?: ImageCategory;
  orientation?: ImageOrientation;
  isFeatured?: boolean;
  isHeroCandidate?: boolean;
  gallery?: string;
  sectionUsage?: SectionUsage;
  searchQuery?: string;
}
