/**
 * Legacy editorial metadata registry.
 * The public gallery source of truth is the live Supabase bucket and the six
 * canonical categories in src/types/gallery.ts; do not use this file as a
 * gallery image source. CURATED_STORIES is retained for editorial copy and
 * story navigation metadata.
 */
/**
 * RBONSU PHOTOGRAPHY — AUTHORITATIVE IMAGE REGISTRY (PHASE 7.6)
 * 
 * Total Assets: 200 authoritative photographs.
 * Active rendering source: Supabase Storage (bucket configured in the admin gallery flow).
 * 
 * Strict Category Counts:
 * - Weddings: 24
 * - Maternity: 39
 * - Engagement: 23
 * - LifeStyle & Birthdays: 48
 * - Newborn, Kids & Family Portraits: 46
 * - Christmas & Season: 20
 * TOTAL: 200
 */

import {
  PhotographyAsset,
  ImageCategory,
  ImageManifestFilter,
} from '../types/image';

export const PHOTOGRAPHY_MANIFEST: PhotographyAsset[] = [
  {
    "id": "rbonsu-001",
    "title": "Weddings: BON_5376",
    "filename": "BON_5376+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/weddings/BON_5376%20copy.jpg",
    "alt": "Wedding celebration photograph \u2014 BON_5376 by RBONSU Photography.",
    "category": "weddings",
    "categories": [
      "weddings",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": true,
    "isHeroCandidate": true,
    "gallery": "weddings",
    "sectionUsage": [
      "gallery_archive",
      "lightbox",
      "featured_grid",
      "hero",
      "hero_candidate"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#1E1B18",
    "curationNotes": "Authentic commissioned wedding ceremony and reception photography honoring genuine connection. (Plate 1 of 24)",
    "status": "verified",
  },
  {
    "id": "rbonsu-002",
    "title": "Weddings: 1P6A0385",
    "filename": "1P6A0385.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/weddings/1P6A0385.jpg",
    "alt": "Wedding celebration photograph \u2014 1P6A0385 by RBONSU Photography.",
    "category": "weddings",
    "categories": [
      "weddings",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": true,
    "isHeroCandidate": false,
    "gallery": "weddings",
    "sectionUsage": [
      "gallery_archive",
      "lightbox",
      "featured_grid"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#2B2623",
    "curationNotes": "Authentic commissioned wedding ceremony and reception photography honoring genuine connection. (Plate 2 of 24)",
    "status": "verified",
  },
  {
    "id": "rbonsu-003",
    "title": "Weddings: BON_4001",
    "filename": "BON_4001.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/weddings/BON_4001.jpg",
    "alt": "Wedding celebration photograph \u2014 BON_4001 by RBONSU Photography.",
    "category": "weddings",
    "categories": [
      "weddings",
      "events",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": true,
    "isHeroCandidate": false,
    "gallery": "weddings",
    "sectionUsage": [
      "gallery_archive",
      "lightbox",
      "featured_grid"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#3D352E",
    "curationNotes": "Authentic commissioned wedding ceremony and reception photography honoring genuine connection. (Plate 3 of 24)",
    "status": "verified",
  },
  {
    "id": "rbonsu-004",
    "title": "Weddings: 1P6A0990",
    "filename": "1P6A0990+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/weddings/1P6A0990%20copy.jpg",
    "alt": "Wedding celebration photograph \u2014 1P6A0990 by RBONSU Photography.",
    "category": "weddings",
    "categories": [
      "weddings",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "weddings",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#4A4138",
    "curationNotes": "Authentic commissioned wedding ceremony and reception photography honoring genuine connection. (Plate 4 of 24)",
    "status": "verified",
  },
  {
    "id": "rbonsu-005",
    "title": "Weddings: _DSC9531",
    "filename": "_DSC9531.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/weddings/_DSC9531.jpg",
    "alt": "Wedding celebration photograph \u2014 _DSC9531 by RBONSU Photography.",
    "category": "weddings",
    "categories": [
      "weddings",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "weddings",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#5E5247",
    "curationNotes": "Authentic commissioned wedding ceremony and reception photography honoring genuine connection. (Plate 5 of 24)",
    "status": "verified",
  },
  {
    "id": "rbonsu-006",
    "title": "Weddings: _DSC9636",
    "filename": "_DSC9636.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/weddings/_DSC9636.jpg",
    "alt": "Wedding celebration photograph \u2014 _DSC9636 by RBONSU Photography.",
    "category": "weddings",
    "categories": [
      "weddings",
      "events",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "weddings",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#252525",
    "curationNotes": "Authentic commissioned wedding ceremony and reception photography honoring genuine connection. (Plate 6 of 24)",
    "status": "verified",
  },
  {
    "id": "rbonsu-007",
    "title": "Weddings: _DSC9753",
    "filename": "_DSC9753.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/weddings/_DSC9753.jpg",
    "alt": "Wedding celebration photograph \u2014 _DSC9753 by RBONSU Photography.",
    "category": "weddings",
    "categories": [
      "weddings",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "weddings",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#1B1E24",
    "curationNotes": "Authentic commissioned wedding ceremony and reception photography honoring genuine connection. (Plate 7 of 24)",
    "status": "verified",
  },
  {
    "id": "rbonsu-008",
    "title": "Weddings: _DSC816440-",
    "filename": "_DSC816440-Edit.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/weddings/_DSC816440-Edit.jpg",
    "alt": "Wedding celebration photograph \u2014 _DSC816440- by RBONSU Photography.",
    "category": "weddings",
    "categories": [
      "weddings",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "weddings",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#2F2B28",
    "curationNotes": "Authentic commissioned wedding ceremony and reception photography honoring genuine connection. (Plate 8 of 24)",
    "status": "verified",
  },
  {
    "id": "rbonsu-009",
    "title": "Weddings: Beth (36)",
    "filename": "Beth+%2836%29.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/weddings/Beth%20(36).jpg",
    "alt": "Wedding celebration photograph \u2014 Beth (36) by RBONSU Photography.",
    "category": "weddings",
    "categories": [
      "weddings",
      "events",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "weddings",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#1E1B18",
    "curationNotes": "Authentic commissioned wedding ceremony and reception photography honoring genuine connection. (Plate 9 of 24)",
    "status": "verified",
  },
  {
    "id": "rbonsu-010",
    "title": "Weddings: Beth (126)",
    "filename": "Beth+%28126%29.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/weddings/Beth%20(126).jpg",
    "alt": "Wedding celebration photograph \u2014 Beth (126) by RBONSU Photography.",
    "category": "weddings",
    "categories": [
      "weddings",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "weddings",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#2B2623",
    "curationNotes": "Authentic commissioned wedding ceremony and reception photography honoring genuine connection. (Plate 10 of 24)",
    "status": "verified",
  },
  {
    "id": "rbonsu-011",
    "title": "Weddings: BON_4000",
    "filename": "BON_4000.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/weddings/BON_4000.jpg",
    "alt": "Wedding celebration photograph \u2014 BON_4000 by RBONSU Photography.",
    "category": "weddings",
    "categories": [
      "weddings",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "weddings",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#3D352E",
    "curationNotes": "Authentic commissioned wedding ceremony and reception photography honoring genuine connection. (Plate 11 of 24)",
    "status": "verified",
  },
  {
    "id": "rbonsu-012",
    "title": "Weddings: BON_4722",
    "filename": "BON_4722.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/weddings/BON_4722.jpg",
    "alt": "Wedding celebration photograph \u2014 BON_4722 by RBONSU Photography.",
    "category": "weddings",
    "categories": [
      "weddings",
      "events",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "weddings",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#4A4138",
    "curationNotes": "Authentic commissioned wedding ceremony and reception photography honoring genuine connection. (Plate 12 of 24)",
    "status": "verified",
  },
  {
    "id": "rbonsu-013",
    "title": "Weddings: BON_4817",
    "filename": "BON_4817.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/weddings/BON_4817.jpg",
    "alt": "Wedding celebration photograph \u2014 BON_4817 by RBONSU Photography.",
    "category": "weddings",
    "categories": [
      "weddings",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "weddings",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#5E5247",
    "curationNotes": "Authentic commissioned wedding ceremony and reception photography honoring genuine connection. (Plate 13 of 24)",
    "status": "verified",
  },
  {
    "id": "rbonsu-014",
    "title": "Weddings: BON_5256",
    "filename": "BON_5256.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/weddings/BON_5256.jpg",
    "alt": "Wedding celebration photograph \u2014 BON_5256 by RBONSU Photography.",
    "category": "weddings",
    "categories": [
      "weddings",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "weddings",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#252525",
    "curationNotes": "Authentic commissioned wedding ceremony and reception photography honoring genuine connection. (Plate 14 of 24)",
    "status": "verified",
  },
  {
    "id": "rbonsu-015",
    "title": "Weddings: BON_5265",
    "filename": "BON_5265.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/weddings/BON_5265.jpg",
    "alt": "Wedding celebration photograph \u2014 BON_5265 by RBONSU Photography.",
    "category": "weddings",
    "categories": [
      "weddings",
      "events",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "weddings",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#1B1E24",
    "curationNotes": "Authentic commissioned wedding ceremony and reception photography honoring genuine connection. (Plate 15 of 24)",
    "status": "verified",
  },
  {
    "id": "rbonsu-016",
    "title": "Weddings: DSC_2474",
    "filename": "DSC_2474.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/weddings/DSC_2474.jpg",
    "alt": "Wedding celebration photograph \u2014 DSC_2474 by RBONSU Photography.",
    "category": "weddings",
    "categories": [
      "weddings",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "weddings",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#2F2B28",
    "curationNotes": "Authentic commissioned wedding ceremony and reception photography honoring genuine connection. (Plate 16 of 24)",
    "status": "verified",
  },
  {
    "id": "rbonsu-017",
    "title": "Weddings: DSC_2600",
    "filename": "DSC_2600.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/weddings/DSC_2600.jpg",
    "alt": "Wedding celebration photograph \u2014 DSC_2600 by RBONSU Photography.",
    "category": "weddings",
    "categories": [
      "weddings",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "weddings",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#1E1B18",
    "curationNotes": "Authentic commissioned wedding ceremony and reception photography honoring genuine connection. (Plate 17 of 24)",
    "status": "verified",
  },
  {
    "id": "rbonsu-018",
    "title": "Weddings: DSC_2629",
    "filename": "DSC_2629.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/weddings/DSC_2629.jpg",
    "alt": "Wedding celebration photograph \u2014 DSC_2629 by RBONSU Photography.",
    "category": "weddings",
    "categories": [
      "weddings",
      "events",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "weddings",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#2B2623",
    "curationNotes": "Authentic commissioned wedding ceremony and reception photography honoring genuine connection. (Plate 18 of 24)",
    "status": "verified",
  },
  {
    "id": "rbonsu-019",
    "title": "Weddings: DSC_2886",
    "filename": "DSC_2886.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/weddings/DSC_2886.jpg",
    "alt": "Wedding celebration photograph \u2014 DSC_2886 by RBONSU Photography.",
    "category": "weddings",
    "categories": [
      "weddings",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "weddings",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#3D352E",
    "curationNotes": "Authentic commissioned wedding ceremony and reception photography honoring genuine connection. (Plate 19 of 24)",
    "status": "verified",
  },
  {
    "id": "rbonsu-020",
    "title": "Weddings: DSC_3381",
    "filename": "DSC_3381.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/weddings/DSC_3381.jpg",
    "alt": "Wedding celebration photograph \u2014 DSC_3381 by RBONSU Photography.",
    "category": "weddings",
    "categories": [
      "weddings",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "weddings",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#4A4138",
    "curationNotes": "Authentic commissioned wedding ceremony and reception photography honoring genuine connection. (Plate 20 of 24)",
    "status": "verified",
  },
  {
    "id": "rbonsu-021",
    "title": "Weddings: DSC_7103",
    "filename": "DSC_7103.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/weddings/DSC_7103.jpg",
    "alt": "Wedding celebration photograph \u2014 DSC_7103 by RBONSU Photography.",
    "category": "weddings",
    "categories": [
      "weddings",
      "events",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "weddings",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#5E5247",
    "curationNotes": "Authentic commissioned wedding ceremony and reception photography honoring genuine connection. (Plate 21 of 24)",
    "status": "verified",
  },
  {
    "id": "rbonsu-022",
    "title": "Weddings: DSC_9539",
    "filename": "DSC_9539.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/weddings/DSC_9539.jpg",
    "alt": "Wedding celebration photograph \u2014 DSC_9539 by RBONSU Photography.",
    "category": "weddings",
    "categories": [
      "weddings",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "weddings",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#252525",
    "curationNotes": "Authentic commissioned wedding ceremony and reception photography honoring genuine connection. (Plate 22 of 24)",
    "status": "verified",
  },
  {
    "id": "rbonsu-023",
    "title": "Weddings: Z62_2529",
    "filename": "Z62_2529+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/weddings/Z62_2529%20copy.jpg",
    "alt": "Wedding celebration photograph \u2014 Z62_2529 by RBONSU Photography.",
    "category": "weddings",
    "categories": [
      "weddings",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "weddings",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#1B1E24",
    "curationNotes": "Authentic commissioned wedding ceremony and reception photography honoring genuine connection. (Plate 23 of 24)",
    "status": "verified",
  },
  {
    "id": "rbonsu-024",
    "title": "Weddings: Z62_2714",
    "filename": "Z62_2714+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/weddings/Z62_2714%20copy.jpg",
    "alt": "Wedding celebration photograph \u2014 Z62_2714 by RBONSU Photography.",
    "category": "weddings",
    "categories": [
      "weddings",
      "events",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "weddings",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#2F2B28",
    "curationNotes": "Authentic commissioned wedding ceremony and reception photography honoring genuine connection. (Plate 24 of 24)",
    "status": "verified",
  },
  {
    "id": "rbonsu-026",
    "title": "Maternity: _DSC1641",
    "filename": "_DSC1641.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/maternity/_DSC1641.jpg",
    "alt": "Maternity fine art portrait session \u2014 _DSC1641 by RBONSU Photography.",
    "category": "maternity",
    "categories": [
      "maternity",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": true,
    "isHeroCandidate": false,
    "gallery": "maternity",
    "sectionUsage": [
      "gallery_archive",
      "lightbox",
      "featured_grid"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#2B2623",
    "curationNotes": "Sculptural studio and natural light maternity study celebrating motherhood and graceful form. (Plate 2 of 40)",
    "status": "verified",
  },
  {
    "id": "rbonsu-027",
    "title": "Maternity: DSC_0021",
    "filename": "DSC_0021+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/maternity/DSC_0021%20copy.jpg",
    "alt": "Maternity fine art portrait session \u2014 DSC_0021 by RBONSU Photography.",
    "category": "maternity",
    "categories": [
      "maternity",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": true,
    "isHeroCandidate": false,
    "gallery": "maternity",
    "sectionUsage": [
      "gallery_archive",
      "lightbox",
      "featured_grid"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#3D352E",
    "curationNotes": "Sculptural studio and natural light maternity study celebrating motherhood and graceful form. (Plate 3 of 40)",
    "status": "verified",
  },
  {
    "id": "rbonsu-028",
    "title": "Maternity: DSC_0216--",
    "filename": "DSC_0216-Recovered-Recovered+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/maternity/DSC_0216-Recovered-Recovered%20copy.jpg",
    "alt": "Maternity fine art portrait session \u2014 DSC_0216-- by RBONSU Photography.",
    "category": "maternity",
    "categories": [
      "maternity",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "maternity",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#4A4138",
    "curationNotes": "Sculptural studio and natural light maternity study celebrating motherhood and graceful form. (Plate 4 of 40)",
    "status": "verified",
  },
  {
    "id": "rbonsu-029",
    "title": "Maternity: DSC_488RR5",
    "filename": "DSC_488RR5+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/maternity/DSC_488RR5%20copy.jpg",
    "alt": "Maternity fine art portrait session \u2014 DSC_488RR5 by RBONSU Photography.",
    "category": "maternity",
    "categories": [
      "maternity",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "maternity",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#5E5247",
    "curationNotes": "Sculptural studio and natural light maternity study celebrating motherhood and graceful form. (Plate 5 of 40)",
    "status": "verified",
  },
  {
    "id": "rbonsu-030",
    "title": "Maternity: DSC_1774",
    "filename": "DSC_1774.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/maternity/DSC_1774.jpg",
    "alt": "Maternity fine art portrait session \u2014 DSC_1774 by RBONSU Photography.",
    "category": "maternity",
    "categories": [
      "maternity",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "maternity",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#252525",
    "curationNotes": "Sculptural studio and natural light maternity study celebrating motherhood and graceful form. (Plate 6 of 40)",
    "status": "verified",
  },
  {
    "id": "rbonsu-031",
    "title": "Maternity: DSC_1781",
    "filename": "DSC_1781+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/maternity/DSC_1781%20copy.jpg",
    "alt": "Maternity fine art portrait session \u2014 DSC_1781 by RBONSU Photography.",
    "category": "maternity",
    "categories": [
      "maternity",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "maternity",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#1B1E24",
    "curationNotes": "Sculptural studio and natural light maternity study celebrating motherhood and graceful form. (Plate 7 of 40)",
    "status": "verified",
  },
  {
    "id": "rbonsu-032",
    "title": "Maternity: DSC_1932",
    "filename": "DSC_1932+copy+2.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/maternity/DSC_1932%20copy%202.jpg",
    "alt": "Maternity fine art portrait session \u2014 DSC_1932 by RBONSU Photography.",
    "category": "maternity",
    "categories": [
      "maternity",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "maternity",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#2F2B28",
    "curationNotes": "Sculptural studio and natural light maternity study celebrating motherhood and graceful form. (Plate 8 of 40)",
    "status": "verified",
  },
  {
    "id": "rbonsu-033",
    "title": "Maternity: DSC_1998",
    "filename": "DSC_1998+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/maternity/DSC_1998%20copy.jpg",
    "alt": "Maternity fine art portrait session \u2014 DSC_1998 by RBONSU Photography.",
    "category": "maternity",
    "categories": [
      "maternity",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "maternity",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#1E1B18",
    "curationNotes": "Sculptural studio and natural light maternity study celebrating motherhood and graceful form. (Plate 9 of 40)",
    "status": "verified",
  },
  {
    "id": "rbonsu-034",
    "title": "Maternity: DSC_2270",
    "filename": "DSC_2270.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/maternity/DSC_2270.jpg",
    "alt": "Maternity fine art portrait session \u2014 DSC_2270 by RBONSU Photography.",
    "category": "maternity",
    "categories": [
      "maternity",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "maternity",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#2B2623",
    "curationNotes": "Sculptural studio and natural light maternity study celebrating motherhood and graceful form. (Plate 10 of 40)",
    "status": "verified",
  },
  {
    "id": "rbonsu-035",
    "title": "Maternity: DSC_3063",
    "filename": "DSC_3063+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/maternity/DSC_3063%20copy.jpg",
    "alt": "Maternity fine art portrait session \u2014 DSC_3063 by RBONSU Photography.",
    "category": "maternity",
    "categories": [
      "maternity",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "maternity",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#3D352E",
    "curationNotes": "Sculptural studio and natural light maternity study celebrating motherhood and graceful form. (Plate 11 of 40)",
    "status": "verified",
  },
  {
    "id": "rbonsu-036",
    "title": "Maternity: DSC_3081",
    "filename": "DSC_3081+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/maternity/DSC_3081%20copy.jpg",
    "alt": "Maternity fine art portrait session \u2014 DSC_3081 by RBONSU Photography.",
    "category": "maternity",
    "categories": [
      "maternity",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "maternity",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#4A4138",
    "curationNotes": "Sculptural studio and natural light maternity study celebrating motherhood and graceful form. (Plate 12 of 40)",
    "status": "verified",
  },
  {
    "id": "rbonsu-037",
    "title": "Maternity: DSC_3090",
    "filename": "DSC_3090+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/maternity/DSC_3090%20copy.jpg",
    "alt": "Maternity fine art portrait session \u2014 DSC_3090 by RBONSU Photography.",
    "category": "maternity",
    "categories": [
      "maternity",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "maternity",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#5E5247",
    "curationNotes": "Sculptural studio and natural light maternity study celebrating motherhood and graceful form. (Plate 13 of 40)",
    "status": "verified",
  },
  {
    "id": "rbonsu-038",
    "title": "Maternity: DSC_3097-2",
    "filename": "DSC_3097-2+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/maternity/DSC_3097-2%20copy.jpg",
    "alt": "Maternity fine art portrait session \u2014 DSC_3097-2 by RBONSU Photography.",
    "category": "maternity",
    "categories": [
      "maternity",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "maternity",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#252525",
    "curationNotes": "Sculptural studio and natural light maternity study celebrating motherhood and graceful form. (Plate 14 of 40)",
    "status": "verified",
  },
  {
    "id": "rbonsu-039",
    "title": "Maternity: DSC_3103-2",
    "filename": "DSC_3103-2+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/maternity/DSC_3103-2%20copy.jpg",
    "alt": "Maternity fine art portrait session \u2014 DSC_3103-2 by RBONSU Photography.",
    "category": "maternity",
    "categories": [
      "maternity",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "maternity",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#1B1E24",
    "curationNotes": "Sculptural studio and natural light maternity study celebrating motherhood and graceful form. (Plate 15 of 40)",
    "status": "verified",
  },
  {
    "id": "rbonsu-040",
    "title": "Maternity: DSC_3109",
    "filename": "DSC_3109+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/maternity/DSC_3109%20copy.jpg",
    "alt": "Maternity fine art portrait session \u2014 DSC_3109 by RBONSU Photography.",
    "category": "maternity",
    "categories": [
      "maternity",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "maternity",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#2F2B28",
    "curationNotes": "Sculptural studio and natural light maternity study celebrating motherhood and graceful form. (Plate 16 of 40)",
    "status": "verified",
  },
  {
    "id": "rbonsu-041",
    "title": "Maternity: DSC_3142",
    "filename": "DSC_3142+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/maternity/DSC_3142%20copy.jpg",
    "alt": "Maternity fine art portrait session \u2014 DSC_3142 by RBONSU Photography.",
    "category": "maternity",
    "categories": [
      "maternity",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "maternity",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#1E1B18",
    "curationNotes": "Sculptural studio and natural light maternity study celebrating motherhood and graceful form. (Plate 17 of 40)",
    "status": "verified",
  },
  {
    "id": "rbonsu-042",
    "title": "Maternity: DSC_3567",
    "filename": "DSC_3567+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/maternity/DSC_3567%20copy.jpg",
    "alt": "Maternity fine art portrait session \u2014 DSC_3567 by RBONSU Photography.",
    "category": "maternity",
    "categories": [
      "maternity",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "maternity",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#2B2623",
    "curationNotes": "Sculptural studio and natural light maternity study celebrating motherhood and graceful form. (Plate 18 of 40)",
    "status": "verified",
  },
  {
    "id": "rbonsu-043",
    "title": "Maternity: DSC_3571",
    "filename": "DSC_3571+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/maternity/DSC_3571%20copy.jpg",
    "alt": "Maternity fine art portrait session \u2014 DSC_3571 by RBONSU Photography.",
    "category": "maternity",
    "categories": [
      "maternity",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "maternity",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#3D352E",
    "curationNotes": "Sculptural studio and natural light maternity study celebrating motherhood and graceful form. (Plate 19 of 40)",
    "status": "verified",
  },
  {
    "id": "rbonsu-044",
    "title": "Maternity: DSC_3589",
    "filename": "DSC_3589+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/maternity/DSC_3589%20copy.jpg",
    "alt": "Maternity fine art portrait session \u2014 DSC_3589 by RBONSU Photography.",
    "category": "maternity",
    "categories": [
      "maternity",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "maternity",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#4A4138",
    "curationNotes": "Sculptural studio and natural light maternity study celebrating motherhood and graceful form. (Plate 20 of 40)",
    "status": "verified",
  },
  {
    "id": "rbonsu-045",
    "title": "Maternity: DSC_3624",
    "filename": "DSC_3624+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/maternity/DSC_3624%20copy.jpg",
    "alt": "Maternity fine art portrait session \u2014 DSC_3624 by RBONSU Photography.",
    "category": "maternity",
    "categories": [
      "maternity",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "maternity",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#5E5247",
    "curationNotes": "Sculptural studio and natural light maternity study celebrating motherhood and graceful form. (Plate 21 of 40)",
    "status": "verified",
  },
  {
    "id": "rbonsu-046",
    "title": "Maternity: DSC_3699",
    "filename": "DSC_3699+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/maternity/DSC_3699%20copy.jpg",
    "alt": "Maternity fine art portrait session \u2014 DSC_3699 by RBONSU Photography.",
    "category": "maternity",
    "categories": [
      "maternity",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "maternity",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#252525",
    "curationNotes": "Sculptural studio and natural light maternity study celebrating motherhood and graceful form. (Plate 22 of 40)",
    "status": "verified",
  },
  {
    "id": "rbonsu-047",
    "title": "Maternity: DSC_3705",
    "filename": "DSC_3705+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/maternity/DSC_3705%20copy.jpg",
    "alt": "Maternity fine art portrait session \u2014 DSC_3705 by RBONSU Photography.",
    "category": "maternity",
    "categories": [
      "maternity",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "maternity",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#1B1E24",
    "curationNotes": "Sculptural studio and natural light maternity study celebrating motherhood and graceful form. (Plate 23 of 40)",
    "status": "verified",
  },
  {
    "id": "rbonsu-048",
    "title": "Maternity: DSC_4073",
    "filename": "DSC_4073+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/maternity/DSC_4073%20copy.jpg",
    "alt": "Maternity fine art portrait session \u2014 DSC_4073 by RBONSU Photography.",
    "category": "maternity",
    "categories": [
      "maternity",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "maternity",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#2F2B28",
    "curationNotes": "Sculptural studio and natural light maternity study celebrating motherhood and graceful form. (Plate 24 of 40)",
    "status": "verified",
  },
  {
    "id": "rbonsu-049",
    "title": "Maternity: DSC_4085",
    "filename": "DSC_4085+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/maternity/DSC_4085%20copy.jpg",
    "alt": "Maternity fine art portrait session \u2014 DSC_4085 by RBONSU Photography.",
    "category": "maternity",
    "categories": [
      "maternity",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "maternity",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#1E1B18",
    "curationNotes": "Sculptural studio and natural light maternity study celebrating motherhood and graceful form. (Plate 25 of 40)",
    "status": "verified",
  },
  {
    "id": "rbonsu-050",
    "title": "Maternity: DSC_4109",
    "filename": "DSC_4109+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/maternity/DSC_4109%20copy.jpg",
    "alt": "Maternity fine art portrait session \u2014 DSC_4109 by RBONSU Photography.",
    "category": "maternity",
    "categories": [
      "maternity",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "maternity",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#2B2623",
    "curationNotes": "Sculptural studio and natural light maternity study celebrating motherhood and graceful form. (Plate 26 of 40)",
    "status": "verified",
  },
  {
    "id": "rbonsu-051",
    "title": "Maternity: DSC_4184",
    "filename": "DSC_4184+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/maternity/DSC_4184%20copy.jpg",
    "alt": "Maternity fine art portrait session \u2014 DSC_4184 by RBONSU Photography.",
    "category": "maternity",
    "categories": [
      "maternity",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "maternity",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#3D352E",
    "curationNotes": "Sculptural studio and natural light maternity study celebrating motherhood and graceful form. (Plate 27 of 40)",
    "status": "verified",
  },
  {
    "id": "rbonsu-052",
    "title": "Maternity: DSC_4503",
    "filename": "DSC_4503+copy+2.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/maternity/DSC_4503%20copy%202.jpg",
    "alt": "Maternity fine art portrait session \u2014 DSC_4503 by RBONSU Photography.",
    "category": "maternity",
    "categories": [
      "maternity",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "maternity",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#4A4138",
    "curationNotes": "Sculptural studio and natural light maternity study celebrating motherhood and graceful form. (Plate 28 of 40)",
    "status": "verified",
  },
  {
    "id": "rbonsu-053",
    "title": "Maternity: DSC_4528",
    "filename": "DSC_4528+copy+2.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/maternity/DSC_4528%20copy%202.jpg",
    "alt": "Maternity fine art portrait session \u2014 DSC_4528 by RBONSU Photography.",
    "category": "maternity",
    "categories": [
      "maternity",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "maternity",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#5E5247",
    "curationNotes": "Sculptural studio and natural light maternity study celebrating motherhood and graceful form. (Plate 29 of 40)",
    "status": "verified",
  },
  {
    "id": "rbonsu-054",
    "title": "Maternity: DSC_4803-",
    "filename": "DSC_4803-Recovered+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/maternity/DSC_4803-Recovered%20copy.jpg",
    "alt": "Maternity fine art portrait session \u2014 DSC_4803- by RBONSU Photography.",
    "category": "maternity",
    "categories": [
      "maternity",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "maternity",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#252525",
    "curationNotes": "Sculptural studio and natural light maternity study celebrating motherhood and graceful form. (Plate 30 of 40)",
    "status": "verified",
  },
  {
    "id": "rbonsu-055",
    "title": "Maternity: DSC_4855",
    "filename": "DSC_4855.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/maternity/DSC_4855.jpg",
    "alt": "Maternity fine art portrait session \u2014 DSC_4855 by RBONSU Photography.",
    "category": "maternity",
    "categories": [
      "maternity",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "maternity",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#1B1E24",
    "curationNotes": "Sculptural studio and natural light maternity study celebrating motherhood and graceful form. (Plate 31 of 40)",
    "status": "verified",
  },
  {
    "id": "rbonsu-056",
    "title": "Maternity: DSC_4881",
    "filename": "DSC_4881+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/maternity/DSC_4881%20copy.jpg",
    "alt": "Maternity fine art portrait session \u2014 DSC_4881 by RBONSU Photography.",
    "category": "maternity",
    "categories": [
      "maternity",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "maternity",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#2F2B28",
    "curationNotes": "Sculptural studio and natural light maternity study celebrating motherhood and graceful form. (Plate 32 of 40)",
    "status": "verified",
  },
  {
    "id": "rbonsu-057",
    "title": "Maternity: DSC_4896",
    "filename": "DSC_4896+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/maternity/DSC_4896%20copy.jpg",
    "alt": "Maternity fine art portrait session \u2014 DSC_4896 by RBONSU Photography.",
    "category": "maternity",
    "categories": [
      "maternity",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "maternity",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#1E1B18",
    "curationNotes": "Sculptural studio and natural light maternity study celebrating motherhood and graceful form. (Plate 33 of 40)",
    "status": "verified",
  },
  {
    "id": "rbonsu-058",
    "title": "Maternity: DSC_4908",
    "filename": "DSC_4908+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/maternity/DSC_4908%20copy.jpg",
    "alt": "Maternity fine art portrait session \u2014 DSC_4908 by RBONSU Photography.",
    "category": "maternity",
    "categories": [
      "maternity",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "maternity",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#2B2623",
    "curationNotes": "Sculptural studio and natural light maternity study celebrating motherhood and graceful form. (Plate 34 of 40)",
    "status": "verified",
  },
  {
    "id": "rbonsu-059",
    "title": "Maternity: DSC_4932",
    "filename": "DSC_4932.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/maternity/DSC_4932.jpg",
    "alt": "Maternity fine art portrait session \u2014 DSC_4932 by RBONSU Photography.",
    "category": "maternity",
    "categories": [
      "maternity",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "maternity",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#3D352E",
    "curationNotes": "Sculptural studio and natural light maternity study celebrating motherhood and graceful form. (Plate 35 of 40)",
    "status": "verified",
  },
  {
    "id": "rbonsu-060",
    "title": "Maternity: DSC_5295",
    "filename": "DSC_5295.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/maternity/DSC_5295.jpg",
    "alt": "Maternity fine art portrait session \u2014 DSC_5295 by RBONSU Photography.",
    "category": "maternity",
    "categories": [
      "maternity",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "maternity",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#4A4138",
    "curationNotes": "Sculptural studio and natural light maternity study celebrating motherhood and graceful form. (Plate 36 of 40)",
    "status": "verified",
  },
  {
    "id": "rbonsu-061",
    "title": "Maternity: DSC_5331",
    "filename": "DSC_5331.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/maternity/DSC_5331.jpg",
    "alt": "Maternity fine art portrait session \u2014 DSC_5331 by RBONSU Photography.",
    "category": "maternity",
    "categories": [
      "maternity",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "maternity",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#5E5247",
    "curationNotes": "Sculptural studio and natural light maternity study celebrating motherhood and graceful form. (Plate 37 of 40)",
    "status": "verified",
  },
  {
    "id": "rbonsu-062",
    "title": "Maternity: DSC_7784-",
    "filename": "DSC_7784-Recovered+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/maternity/DSC_7784-Recovered%20copy.jpg",
    "alt": "Maternity fine art portrait session \u2014 DSC_7784- by RBONSU Photography.",
    "category": "maternity",
    "categories": [
      "maternity",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "maternity",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#252525",
    "curationNotes": "Sculptural studio and natural light maternity study celebrating motherhood and graceful form. (Plate 38 of 40)",
    "status": "verified",
  },
  {
    "id": "rbonsu-063",
    "title": "Maternity: DSC_7958-",
    "filename": "DSC_7958-Recovered+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/maternity/DSC_7958-Recovered%20copy.jpg",
    "alt": "Maternity fine art portrait session \u2014 DSC_7958- by RBONSU Photography.",
    "category": "maternity",
    "categories": [
      "maternity",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "maternity",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#1B1E24",
    "curationNotes": "Sculptural studio and natural light maternity study celebrating motherhood and graceful form. (Plate 39 of 40)",
    "status": "verified",
  },
  {
    "id": "rbonsu-064",
    "title": "Maternity: DSC_24252",
    "filename": "DSC_24252.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/maternity/DSC_24252.jpg",
    "alt": "Maternity fine art portrait session \u2014 DSC_24252 by RBONSU Photography.",
    "category": "maternity",
    "categories": [
      "maternity",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "maternity",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#2F2B28",
    "curationNotes": "Sculptural studio and natural light maternity study celebrating motherhood and graceful form. (Plate 40 of 40)",
    "status": "verified",
  },
  {
    "id": "rbonsu-065",
    "title": "Engagement: Z62_1618",
    "filename": "Z62_1618.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/engagement/Z62_1618.jpg",
    "alt": "Romantic engagement couple sitting \u2014 Z62_1618 by RBONSU Photography.",
    "category": "engagement",
    "categories": [
      "engagement",
      "portraits",
      "weddings"
    ],
    "orientation": "portrait",
    "isFeatured": true,
    "isHeroCandidate": true,
    "gallery": "engagement",
    "sectionUsage": [
      "gallery_archive",
      "lightbox",
      "featured_grid",
      "hero",
      "hero_candidate"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#1E1B18",
    "curationNotes": "Intimate couple portraiture capturing authentic connection, editorial styling, and romantic storytelling. (Plate 1 of 23)",
    "status": "verified",
  },
  {
    "id": "rbonsu-066",
    "title": "Engagement: DSC_1117",
    "filename": "DSC_1117+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/engagement/DSC_1117%20copy.jpg",
    "alt": "Romantic engagement couple sitting \u2014 DSC_1117 by RBONSU Photography.",
    "category": "engagement",
    "categories": [
      "engagement",
      "portraits",
      "weddings"
    ],
    "orientation": "portrait",
    "isFeatured": true,
    "isHeroCandidate": false,
    "gallery": "engagement",
    "sectionUsage": [
      "gallery_archive",
      "lightbox",
      "featured_grid"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#2B2623",
    "curationNotes": "Intimate couple portraiture capturing authentic connection, editorial styling, and romantic storytelling. (Plate 2 of 23)",
    "status": "verified",
  },
  {
    "id": "rbonsu-067",
    "title": "Engagement: DSC_1147",
    "filename": "DSC_1147+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/engagement/DSC_1147%20copy.jpg",
    "alt": "Romantic engagement couple sitting \u2014 DSC_1147 by RBONSU Photography.",
    "category": "engagement",
    "categories": [
      "engagement",
      "portraits",
      "weddings"
    ],
    "orientation": "landscape",
    "isFeatured": true,
    "isHeroCandidate": false,
    "gallery": "engagement",
    "sectionUsage": [
      "gallery_archive",
      "lightbox",
      "featured_grid"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#3D352E",
    "curationNotes": "Intimate couple portraiture capturing authentic connection, editorial styling, and romantic storytelling. (Plate 3 of 23)",
    "status": "verified",
  },
  {
    "id": "rbonsu-068",
    "title": "Engagement: DSC_1158",
    "filename": "DSC_1158+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/engagement/DSC_1158%20copy.jpg",
    "alt": "Romantic engagement couple sitting \u2014 DSC_1158 by RBONSU Photography.",
    "category": "engagement",
    "categories": [
      "engagement",
      "portraits",
      "weddings"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "engagement",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#4A4138",
    "curationNotes": "Intimate couple portraiture capturing authentic connection, editorial styling, and romantic storytelling. (Plate 4 of 23)",
    "status": "verified",
  },
  {
    "id": "rbonsu-069",
    "title": "Engagement: DSC_1168",
    "filename": "DSC_1168+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/engagement/DSC_1168%20copy.jpg",
    "alt": "Romantic engagement couple sitting \u2014 DSC_1168 by RBONSU Photography.",
    "category": "engagement",
    "categories": [
      "engagement",
      "portraits",
      "weddings"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "engagement",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#5E5247",
    "curationNotes": "Intimate couple portraiture capturing authentic connection, editorial styling, and romantic storytelling. (Plate 5 of 23)",
    "status": "verified",
  },
  {
    "id": "rbonsu-070",
    "title": "Engagement: DSC_1234",
    "filename": "DSC_1234+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/engagement/DSC_1234%20copy.jpg",
    "alt": "Romantic engagement couple sitting \u2014 DSC_1234 by RBONSU Photography.",
    "category": "engagement",
    "categories": [
      "engagement",
      "portraits",
      "weddings"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "engagement",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#252525",
    "curationNotes": "Intimate couple portraiture capturing authentic connection, editorial styling, and romantic storytelling. (Plate 6 of 23)",
    "status": "verified",
  },
  {
    "id": "rbonsu-071",
    "title": "Engagement: DSC_1248",
    "filename": "DSC_1248+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/engagement/DSC_1248%20copy.jpg",
    "alt": "Romantic engagement couple sitting \u2014 DSC_1248 by RBONSU Photography.",
    "category": "engagement",
    "categories": [
      "engagement",
      "portraits",
      "weddings"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "engagement",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#1B1E24",
    "curationNotes": "Intimate couple portraiture capturing authentic connection, editorial styling, and romantic storytelling. (Plate 7 of 23)",
    "status": "verified",
  },
  {
    "id": "rbonsu-072",
    "title": "Engagement: DSC_1395",
    "filename": "DSC_1395+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/engagement/DSC_1395%20copy.jpg",
    "alt": "Romantic engagement couple sitting \u2014 DSC_1395 by RBONSU Photography.",
    "category": "engagement",
    "categories": [
      "engagement",
      "portraits",
      "weddings"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "engagement",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#2F2B28",
    "curationNotes": "Intimate couple portraiture capturing authentic connection, editorial styling, and romantic storytelling. (Plate 8 of 23)",
    "status": "verified",
  },
  {
    "id": "rbonsu-073",
    "title": "Engagement: DSC_1525",
    "filename": "DSC_1525+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/engagement/DSC_1525%20copy.jpg",
    "alt": "Romantic engagement couple sitting \u2014 DSC_1525 by RBONSU Photography.",
    "category": "engagement",
    "categories": [
      "engagement",
      "portraits",
      "weddings"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "engagement",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#1E1B18",
    "curationNotes": "Intimate couple portraiture capturing authentic connection, editorial styling, and romantic storytelling. (Plate 9 of 23)",
    "status": "verified",
  },
  {
    "id": "rbonsu-074",
    "title": "Engagement: DSC_1625",
    "filename": "DSC_1625+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/engagement/DSC_1625%20copy.jpg",
    "alt": "Romantic engagement couple sitting \u2014 DSC_1625 by RBONSU Photography.",
    "category": "engagement",
    "categories": [
      "engagement",
      "portraits",
      "weddings"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "engagement",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#2B2623",
    "curationNotes": "Intimate couple portraiture capturing authentic connection, editorial styling, and romantic storytelling. (Plate 10 of 23)",
    "status": "verified",
  },
  {
    "id": "rbonsu-075",
    "title": "Engagement: DSC_1765",
    "filename": "DSC_1765+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/engagement/DSC_1765%20copy.jpg",
    "alt": "Romantic engagement couple sitting \u2014 DSC_1765 by RBONSU Photography.",
    "category": "engagement",
    "categories": [
      "engagement",
      "portraits",
      "weddings"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "engagement",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#3D352E",
    "curationNotes": "Intimate couple portraiture capturing authentic connection, editorial styling, and romantic storytelling. (Plate 11 of 23)",
    "status": "verified",
  },
  {
    "id": "rbonsu-076",
    "title": "Engagement: DSC_1940",
    "filename": "DSC_1940+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/engagement/DSC_1940%20copy.jpg",
    "alt": "Romantic engagement couple sitting \u2014 DSC_1940 by RBONSU Photography.",
    "category": "engagement",
    "categories": [
      "engagement",
      "portraits",
      "weddings"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "engagement",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#4A4138",
    "curationNotes": "Intimate couple portraiture capturing authentic connection, editorial styling, and romantic storytelling. (Plate 12 of 23)",
    "status": "verified",
  },
  {
    "id": "rbonsu-077",
    "title": "Engagement: DSC_2012",
    "filename": "DSC_2012+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/engagement/DSC_2012%20copy.jpg",
    "alt": "Romantic engagement couple sitting \u2014 DSC_2012 by RBONSU Photography.",
    "category": "engagement",
    "categories": [
      "engagement",
      "portraits",
      "weddings"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "engagement",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#5E5247",
    "curationNotes": "Intimate couple portraiture capturing authentic connection, editorial styling, and romantic storytelling. (Plate 13 of 23)",
    "status": "verified",
  },
  {
    "id": "rbonsu-078",
    "title": "Engagement: DSC_3286",
    "filename": "DSC_3286+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/engagement/DSC_3286%20copy.jpg",
    "alt": "Romantic engagement couple sitting \u2014 DSC_3286 by RBONSU Photography.",
    "category": "engagement",
    "categories": [
      "engagement",
      "portraits",
      "weddings"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "engagement",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#252525",
    "curationNotes": "Intimate couple portraiture capturing authentic connection, editorial styling, and romantic storytelling. (Plate 14 of 23)",
    "status": "verified",
  },
  {
    "id": "rbonsu-079",
    "title": "Engagement: DSC_3348",
    "filename": "DSC_3348+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/engagement/DSC_3348%20copy.jpg",
    "alt": "Romantic engagement couple sitting \u2014 DSC_3348 by RBONSU Photography.",
    "category": "engagement",
    "categories": [
      "engagement",
      "portraits",
      "weddings"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "engagement",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#1B1E24",
    "curationNotes": "Intimate couple portraiture capturing authentic connection, editorial styling, and romantic storytelling. (Plate 15 of 23)",
    "status": "verified",
  },
  {
    "id": "rbonsu-080",
    "title": "Engagement: DSC_5794",
    "filename": "DSC_5794.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/engagement/DSC_5794.jpg",
    "alt": "Romantic engagement couple sitting \u2014 DSC_5794 by RBONSU Photography.",
    "category": "engagement",
    "categories": [
      "engagement",
      "portraits",
      "weddings"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "engagement",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#2F2B28",
    "curationNotes": "Intimate couple portraiture capturing authentic connection, editorial styling, and romantic storytelling. (Plate 16 of 23)",
    "status": "verified",
  },
  {
    "id": "rbonsu-081",
    "title": "Engagement: DSC_5876",
    "filename": "DSC_5876.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/engagement/DSC_5876.jpg",
    "alt": "Romantic engagement couple sitting \u2014 DSC_5876 by RBONSU Photography.",
    "category": "engagement",
    "categories": [
      "engagement",
      "portraits",
      "weddings"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "engagement",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#1E1B18",
    "curationNotes": "Intimate couple portraiture capturing authentic connection, editorial styling, and romantic storytelling. (Plate 17 of 23)",
    "status": "verified",
  },
  {
    "id": "rbonsu-082",
    "title": "Engagement: DSC_9182",
    "filename": "DSC_9182+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/engagement/DSC_9182%20copy.jpg",
    "alt": "Romantic engagement couple sitting \u2014 DSC_9182 by RBONSU Photography.",
    "category": "engagement",
    "categories": [
      "engagement",
      "portraits",
      "weddings"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "engagement",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#2B2623",
    "curationNotes": "Intimate couple portraiture capturing authentic connection, editorial styling, and romantic storytelling. (Plate 18 of 23)",
    "status": "verified",
  },
  {
    "id": "rbonsu-083",
    "title": "Engagement: DSC_9753",
    "filename": "DSC_9753+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/engagement/DSC_9753%20copy.jpg",
    "alt": "Romantic engagement couple sitting \u2014 DSC_9753 by RBONSU Photography.",
    "category": "engagement",
    "categories": [
      "engagement",
      "portraits",
      "weddings"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "engagement",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#3D352E",
    "curationNotes": "Intimate couple portraiture capturing authentic connection, editorial styling, and romantic storytelling. (Plate 19 of 23)",
    "status": "verified",
  },
  {
    "id": "rbonsu-084",
    "title": "Engagement: Z62_1604",
    "filename": "Z62_1604.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/engagement/Z62_1604.jpg",
    "alt": "Romantic engagement couple sitting \u2014 Z62_1604 by RBONSU Photography.",
    "category": "engagement",
    "categories": [
      "engagement",
      "portraits",
      "weddings"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "engagement",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#4A4138",
    "curationNotes": "Intimate couple portraiture capturing authentic connection, editorial styling, and romantic storytelling. (Plate 20 of 23)",
    "status": "verified",
  },
  {
    "id": "rbonsu-085",
    "title": "Engagement: Z62_1618",
    "filename": "Z62_1618.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/engagement/Z62_1618.jpg",
    "alt": "Romantic engagement couple sitting \u2014 Z62_1618 by RBONSU Photography.",
    "category": "engagement",
    "categories": [
      "engagement",
      "portraits",
      "weddings"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "engagement",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#5E5247",
    "curationNotes": "Intimate couple portraiture capturing authentic connection, editorial styling, and romantic storytelling. (Plate 21 of 23)",
    "status": "verified",
  },
  {
    "id": "rbonsu-086",
    "title": "Engagement: Z62_1681",
    "filename": "Z62_1681.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/engagement/Z62_1681.jpg",
    "alt": "Romantic engagement couple sitting \u2014 Z62_1681 by RBONSU Photography.",
    "category": "engagement",
    "categories": [
      "engagement",
      "portraits",
      "weddings"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "engagement",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#252525",
    "curationNotes": "Intimate couple portraiture capturing authentic connection, editorial styling, and romantic storytelling. (Plate 22 of 23)",
    "status": "verified",
  },
  {
    "id": "rbonsu-087",
    "title": "Engagement: Z62_1767",
    "filename": "Z62_1767.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/engagement/Z62_1767.jpg",
    "alt": "Romantic engagement couple sitting \u2014 Z62_1767 by RBONSU Photography.",
    "category": "engagement",
    "categories": [
      "engagement",
      "portraits",
      "weddings"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "engagement",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#1B1E24",
    "curationNotes": "Intimate couple portraiture capturing authentic connection, editorial styling, and romantic storytelling. (Plate 23 of 23)",
    "status": "verified",
  },
  {
    "id": "rbonsu-088",
    "title": "LifeStyle & Birthdays: 853A0315",
    "filename": "853A0315+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/853A0315%20copy.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 853A0315 by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": true,
    "isHeroCandidate": true,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox",
      "featured_grid",
      "hero",
      "hero_candidate"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#2F2B28",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 1 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-089",
    "title": "LifeStyle & Birthdays: 853A0316",
    "filename": "853A0316+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/853A0316%20copy.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 853A0316 by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": true,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox",
      "featured_grid"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#1E1B18",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 2 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-090",
    "title": "LifeStyle & Birthdays: 853A0393",
    "filename": "853A0393+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/853A0393%20copy.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 853A0393 by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": true,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox",
      "featured_grid"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#2B2623",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 3 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-091",
    "title": "LifeStyle & Birthdays: 853A0426",
    "filename": "853A0426+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/853A0426%20copy.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 853A0426 by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#3D352E",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 4 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-092",
    "title": "LifeStyle & Birthdays: DSC_0015",
    "filename": "DSC_0015.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC_0015.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC_0015 by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#4A4138",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 5 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-093",
    "title": "LifeStyle & Birthdays: DSC_0026-Re",
    "filename": "DSC_0026-Re.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC_0026-Re.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC_0026-Re by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#5E5247",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 6 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-094",
    "title": "LifeStyle & Birthdays: DSC_0080",
    "filename": "DSC_0080.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC_0080.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC_0080 by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#252525",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 7 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-095",
    "title": "LifeStyle & Birthdays: DSC_0084",
    "filename": "DSC_0084.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC_0084.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC_0084 by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#1B1E24",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 8 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-096",
    "title": "LifeStyle & Birthdays: DSC_0125",
    "filename": "DSC_0125+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC_0125%20copy.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC_0125 by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#2F2B28",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 9 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-097",
    "title": "LifeStyle & Birthdays: DSC_0137",
    "filename": "DSC_0137+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC_0137%20copy.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC_0137 by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#1E1B18",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 10 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-098",
    "title": "LifeStyle & Birthdays: DSC_0138",
    "filename": "DSC_0138.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC_0138.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC_0138 by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#2B2623",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 11 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-099",
    "title": "LifeStyle & Birthdays: DSC_0164 yy",
    "filename": "DSC_0164+yycopy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC_0164%20yycopy.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC_0164 yy by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#3D352E",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 12 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-100",
    "title": "LifeStyle & Birthdays: DSC_0169",
    "filename": "DSC_0169+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC_0169%20copy.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC_0169 by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#4A4138",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 13 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-101",
    "title": "LifeStyle & Birthdays: DSC_0172 d",
    "filename": "DSC_0172+dcopy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC_0172%20dcopy.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC_0172 d by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#5E5247",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 14 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-102",
    "title": "LifeStyle & Birthdays: DSC_0262 4",
    "filename": "DSC_0262+4copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC_0262%204copy.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC_0262 4 by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#252525",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 15 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-103",
    "title": "LifeStyle & Birthdays: DSC_0300",
    "filename": "DSC_0300.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC_0300.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC_0300 by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#1B1E24",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 16 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-104",
    "title": "LifeStyle & Birthdays: DSC_0326",
    "filename": "DSC_0326+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC_0326%20copy.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC_0326 by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#2F2B28",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 17 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-105",
    "title": "LifeStyle & Birthdays: DSC_0365",
    "filename": "DSC_0365+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC_0365%20copy.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC_0365 by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#1E1B18",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 18 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-106",
    "title": "LifeStyle & Birthdays: DSC_0567",
    "filename": "DSC_0567.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC_0567.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC_0567 by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#2B2623",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 19 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-107",
    "title": "LifeStyle & Birthdays: DSC_1207-",
    "filename": "DSC_1207-Recovered.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC_1207-Recovered.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC_1207- by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#3D352E",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 20 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-108",
    "title": "LifeStyle & Birthdays: DSC_1358",
    "filename": "DSC_1358.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC_1358.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC_1358 by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#4A4138",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 21 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-109",
    "title": "LifeStyle & Birthdays: DSC_1456-",
    "filename": "DSC_1456-Recovered.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC_1456-Recovered.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC_1456- by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#5E5247",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 22 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-110",
    "title": "LifeStyle & Birthdays: DSC_1579-",
    "filename": "DSC_1579-Recovered.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC_1579-Recovered.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC_1579- by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#252525",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 23 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-111",
    "title": "LifeStyle & Birthdays: DSC_1894-",
    "filename": "DSC_1894-Recovered.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC_1894-Recovered.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC_1894- by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#1B1E24",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 24 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-112",
    "title": "LifeStyle & Birthdays: DSC_1956-",
    "filename": "DSC_1956-Recovered.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC_1956-Recovered.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC_1956- by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#2F2B28",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 25 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-113",
    "title": "LifeStyle & Birthdays: DSC_2356",
    "filename": "DSC_2356.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC_2356.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC_2356 by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#1E1B18",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 26 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-114",
    "title": "LifeStyle & Birthdays: DSC_2893-",
    "filename": "DSC_2893-Recovered.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC_2893-Recovered.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC_2893- by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#2B2623",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 27 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-115",
    "title": "LifeStyle & Birthdays: DSC_2910",
    "filename": "DSC_2910.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC_2910.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC_2910 by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#3D352E",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 28 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-116",
    "title": "LifeStyle & Birthdays: DSC_2961",
    "filename": "DSC_2961.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC_2961.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC_2961 by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#4A4138",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 29 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-117",
    "title": "LifeStyle & Birthdays: DSC_2972",
    "filename": "DSC_2972.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC_2972.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC_2972 by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#5E5247",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 30 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-118",
    "title": "LifeStyle & Birthdays: DSC_4070",
    "filename": "DSC_4070.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC_4070.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC_4070 by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#252525",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 31 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-119",
    "title": "LifeStyle & Birthdays: DSC_4123",
    "filename": "DSC_4123.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC_4123.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC_4123 by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#1B1E24",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 32 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-120",
    "title": "LifeStyle & Birthdays: DSC_4378",
    "filename": "DSC_4378.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC_4378.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC_4378 by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#2F2B28",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 33 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-121",
    "title": "LifeStyle & Birthdays: DSC_4621",
    "filename": "DSC_4621.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC_4621.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC_4621 by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#1E1B18",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 34 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-122",
    "title": "LifeStyle & Birthdays: DSC_4840",
    "filename": "DSC_4840+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC_4840%20copy.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC_4840 by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#2B2623",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 35 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-123",
    "title": "LifeStyle & Birthdays: DSC_5470",
    "filename": "DSC_5470.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC_5470.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC_5470 by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#3D352E",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 36 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-124",
    "title": "LifeStyle & Birthdays: DSC_8322",
    "filename": "DSC_8322.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC_8322.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC_8322 by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#4A4138",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 37 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-125",
    "title": "LifeStyle & Birthdays: DSC_8343",
    "filename": "DSC_8343.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC_8343.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC_8343 by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#5E5247",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 38 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-126",
    "title": "LifeStyle & Birthdays: DSC_9220",
    "filename": "DSC_9220+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC_9220%20copy.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC_9220 by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#252525",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 39 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-127",
    "title": "LifeStyle & Birthdays: DSC_9535",
    "filename": "DSC_9535.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC_9535.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC_9535 by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#1B1E24",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 40 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-128",
    "title": "LifeStyle & Birthdays: DSC_9546",
    "filename": "DSC_9546.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC_9546.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC_9546 by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#2F2B28",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 41 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-129",
    "title": "LifeStyle & Birthdays: DSC_9548",
    "filename": "DSC_9548.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC_9548.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC_9548 by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#1E1B18",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 42 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-130",
    "title": "LifeStyle & Birthdays: DSC_9831",
    "filename": "DSC_9831.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC_9831.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC_9831 by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#2B2623",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 43 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-131",
    "title": "LifeStyle & Birthdays: DSC_9987",
    "filename": "DSC_9987.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC_9987.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC_9987 by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#3D352E",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 44 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-132",
    "title": "LifeStyle & Birthdays: DSC01880 new",
    "filename": "DSC01880+new+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC01880%20new%20copy.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC01880 new by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#4A4138",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 45 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-133",
    "title": "LifeStyle & Birthdays: DSC01998 new",
    "filename": "DSC01998+new+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC01998%20new%20copy.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC01998 new by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#5E5247",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 46 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-134",
    "title": "LifeStyle & Birthdays: DSC02520",
    "filename": "DSC02520.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC02520.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC02520 by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#252525",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 47 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-135",
    "title": "LifeStyle & Birthdays: DSC06295e",
    "filename": "DSC06295e.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/lifestyle-birthdays/DSC06295e.jpg",
    "alt": "Lifestyle and milestone birthday portrait \u2014 DSC06295e by RBONSU Photography.",
    "category": "lifestyle-birthdays",
    "categories": [
      "lifestyle-birthdays",
      "lifestyle",
      "birthdays",
      "events",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "lifestyle-birthdays",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#1B1E24",
    "curationNotes": "Vibrant celebration photography highlighting milestone birthdays, high-fashion styling, and joyful candid moments. (Plate 48 of 48)",
    "status": "verified",
  },
  {
    "id": "rbonsu-136",
    "title": "Newborn, Kids & Family Portraits: DSC_2844",
    "filename": "DSC_2844.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_2844.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_2844 by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": true,
    "isHeroCandidate": true,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox",
      "featured_grid",
      "hero",
      "hero_candidate"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#2F2B28",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 1 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-137",
    "title": "Newborn, Kids & Family Portraits: DSC_0020",
    "filename": "DSC_0020+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_0020%20copy.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_0020 by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": true,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox",
      "featured_grid"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#1E1B18",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 2 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-138",
    "title": "Newborn, Kids & Family Portraits: DSC_0693",
    "filename": "DSC_0693.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_0693.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_0693 by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": true,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox",
      "featured_grid"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#2B2623",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 3 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-139",
    "title": "Newborn, Kids & Family Portraits: DSC_0709",
    "filename": "DSC_0709.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_0709.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_0709 by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#3D352E",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 4 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-140",
    "title": "Newborn, Kids & Family Portraits: DSC_0828",
    "filename": "DSC_0828.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_0828.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_0828 by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#4A4138",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 5 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-141",
    "title": "Newborn, Kids & Family Portraits: DSC_0832",
    "filename": "DSC_0832+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_0832%20copy.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_0832 by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#5E5247",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 6 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-142",
    "title": "Newborn, Kids & Family Portraits: DSC_0836",
    "filename": "DSC_0836+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_0836%20copy.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_0836 by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#252525",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 7 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-143",
    "title": "Newborn, Kids & Family Portraits: DSC_0919",
    "filename": "DSC_0919.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_0919.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_0919 by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#1B1E24",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 8 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-144",
    "title": "Newborn, Kids & Family Portraits: DSC_0998",
    "filename": "DSC_0998+copy+2.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_0998%20copy%202.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_0998 by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#2F2B28",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 9 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-145",
    "title": "Newborn, Kids & Family Portraits: DSC_0998",
    "filename": "DSC_0998+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_0998%20copy.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_0998 by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#1E1B18",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 10 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-146",
    "title": "Newborn, Kids & Family Portraits: DSC_1029",
    "filename": "DSC_1029+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_1029%20copy.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_1029 by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#2B2623",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 11 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-147",
    "title": "Newborn, Kids & Family Portraits: DSC_1049",
    "filename": "DSC_1049+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_1049%20copy.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_1049 by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#3D352E",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 12 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-148",
    "title": "Newborn, Kids & Family Portraits: DSC_1076",
    "filename": "DSC_1076.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_1076.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_1076 by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#4A4138",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 13 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-149",
    "title": "Newborn, Kids & Family Portraits: DSC_1119",
    "filename": "DSC_1119.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_1119.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_1119 by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#5E5247",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 14 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-150",
    "title": "Newborn, Kids & Family Portraits: DSC_2029-",
    "filename": "DSC_2029-Recovered.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_2029-Recovered.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_2029- by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#252525",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 15 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-151",
    "title": "Newborn, Kids & Family Portraits: DSC_2042-",
    "filename": "DSC_2042-Recovered.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_2042-Recovered.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_2042- by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#1B1E24",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 16 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-152",
    "title": "Newborn, Kids & Family Portraits: DSC_2078-",
    "filename": "DSC_2078-Recovered.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_2078-Recovered.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_2078- by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#2F2B28",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 17 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-153",
    "title": "Newborn, Kids & Family Portraits: DSC_2369",
    "filename": "DSC_2369.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_2369.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_2369 by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#1E1B18",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 18 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-154",
    "title": "Newborn, Kids & Family Portraits: DSC_2409",
    "filename": "DSC_2409.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_2409.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_2409 by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#2B2623",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 19 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-155",
    "title": "Newborn, Kids & Family Portraits: DSC_2416-",
    "filename": "DSC_2416-Recovered.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_2416-Recovered.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_2416- by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#3D352E",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 20 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-156",
    "title": "Newborn, Kids & Family Portraits: DSC_2420",
    "filename": "DSC_2420.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_2420.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_2420 by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#4A4138",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 21 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-157",
    "title": "Newborn, Kids & Family Portraits: DSC_2551-",
    "filename": "DSC_2551-Recovered.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_2551-Recovered.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_2551- by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#5E5247",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 22 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-158",
    "title": "Newborn, Kids & Family Portraits: DSC_2556-",
    "filename": "DSC_2556-Recovered.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_2556-Recovered.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_2556- by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#252525",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 23 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-159",
    "title": "Newborn, Kids & Family Portraits: DSC_2628-",
    "filename": "DSC_2628-Recovered.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_2628-Recovered.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_2628- by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#1B1E24",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 24 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-160",
    "title": "Newborn, Kids & Family Portraits: DSC_2844",
    "filename": "DSC_2844.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_2844.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_2844 by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#2F2B28",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 25 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-161",
    "title": "Newborn, Kids & Family Portraits: DSC_3405-",
    "filename": "DSC_3405-Recovered+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_3405-Recovered%20copy.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_3405- by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#1E1B18",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 26 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-162",
    "title": "Newborn, Kids & Family Portraits: DSC_3624",
    "filename": "DSC_3624+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_3624%20copy.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_3624 by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#2B2623",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 27 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-163",
    "title": "Newborn, Kids & Family Portraits: DSC_3684",
    "filename": "DSC_3684+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_3684%20copy.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_3684 by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#3D352E",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 28 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-164",
    "title": "Newborn, Kids & Family Portraits: DSC_4040",
    "filename": "DSC_4040+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_4040%20copy.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_4040 by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#4A4138",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 29 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-165",
    "title": "Newborn, Kids & Family Portraits: DSC_4422",
    "filename": "DSC_4422.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_4422.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_4422 by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#5E5247",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 30 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-166",
    "title": "Newborn, Kids & Family Portraits: DSC_4596",
    "filename": "DSC_4596.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_4596.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_4596 by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#252525",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 31 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-167",
    "title": "Newborn, Kids & Family Portraits: DSC_5829",
    "filename": "DSC_5829.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_5829.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_5829 by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#1B1E24",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 32 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-168",
    "title": "Newborn, Kids & Family Portraits: DSC_5937",
    "filename": "DSC_5937+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_5937%20copy.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_5937 by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#2F2B28",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 33 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-169",
    "title": "Newborn, Kids & Family Portraits: DSC_6061",
    "filename": "DSC_6061+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_6061%20copy.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_6061 by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#1E1B18",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 34 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-170",
    "title": "Newborn, Kids & Family Portraits: DSC_6120",
    "filename": "DSC_6120+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_6120%20copy.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_6120 by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#2B2623",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 35 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-171",
    "title": "Newborn, Kids & Family Portraits: DSC_6298",
    "filename": "DSC_6298+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_6298%20copy.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_6298 by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#3D352E",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 36 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-172",
    "title": "Newborn, Kids & Family Portraits: DSC_6375",
    "filename": "DSC_6375+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_6375%20copy.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_6375 by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#4A4138",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 37 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-173",
    "title": "Newborn, Kids & Family Portraits: DSC_6571-",
    "filename": "DSC_6571-Recovered.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_6571-Recovered.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_6571- by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#5E5247",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 38 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-174",
    "title": "Newborn, Kids & Family Portraits: DSC_6597-",
    "filename": "DSC_6597-Recovered.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_6597-Recovered.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_6597- by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#252525",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 39 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-175",
    "title": "Newborn, Kids & Family Portraits: DSC_6771",
    "filename": "DSC_6771.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_6771.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_6771 by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#1B1E24",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 40 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-176",
    "title": "Newborn, Kids & Family Portraits: DSC_6871",
    "filename": "DSC_6871+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_6871%20copy.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_6871 by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#2F2B28",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 41 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-177",
    "title": "Newborn, Kids & Family Portraits: DSC_7080",
    "filename": "DSC_7080+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_7080%20copy.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_7080 by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#1E1B18",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 42 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-178",
    "title": "Newborn, Kids & Family Portraits: DSC_7315",
    "filename": "DSC_7315.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_7315.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_7315 by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#2B2623",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 43 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-179",
    "title": "Newborn, Kids & Family Portraits: DSC_7914",
    "filename": "DSC_7914.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_7914.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_7914 by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#3D352E",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 44 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-180",
    "title": "Newborn, Kids & Family Portraits: DSC_7935",
    "filename": "DSC_7935.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_7935.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_7935 by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#4A4138",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 45 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-181",
    "title": "Newborn, Kids & Family Portraits: DSC_8487",
    "filename": "DSC_8487.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/newborn-kids-family/DSC_8487.jpg",
    "alt": "Family, newborn, and children fine art portrait \u2014 DSC_8487 by RBONSU Photography.",
    "category": "newborn-kids-family",
    "categories": [
      "newborn-kids-family",
      "family",
      "portraits"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "newborn-kids-family",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#5E5247",
    "curationNotes": "Heartfelt family heirloom portraits and tender newborn studies honoring multigenerational heritage and love. (Plate 46 of 46)",
    "status": "verified",
  },
  {
    "id": "rbonsu-182",
    "title": "Christmas & Season: DSC_1309",
    "filename": "DSC_1309.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/christmas-season/DSC_1309.jpg",
    "alt": "Festive holiday and Christmas seasonal sitting \u2014 DSC_1309 by RBONSU Photography.",
    "category": "christmas-season",
    "categories": [
      "christmas-season",
      "events",
      "lifestyle",
      "family"
    ],
    "orientation": "portrait",
    "isFeatured": true,
    "isHeroCandidate": true,
    "gallery": "christmas-season",
    "sectionUsage": [
      "gallery_archive",
      "lightbox",
      "featured_grid",
      "hero",
      "hero_candidate"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#252525",
    "curationNotes": "Festive holiday themed studio portraiture capturing seasonal warmth, elegance, and family celebrations. (Plate 1 of 20)",
    "status": "verified",
  },
  {
    "id": "rbonsu-183",
    "title": "Christmas & Season: DSC_1152",
    "filename": "DSC_1152.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/christmas-season/DSC_1152.jpg",
    "alt": "Festive holiday and Christmas seasonal sitting \u2014 DSC_1152 by RBONSU Photography.",
    "category": "christmas-season",
    "categories": [
      "christmas-season",
      "events",
      "lifestyle",
      "family"
    ],
    "orientation": "portrait",
    "isFeatured": true,
    "isHeroCandidate": false,
    "gallery": "christmas-season",
    "sectionUsage": [
      "gallery_archive",
      "lightbox",
      "featured_grid"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#1B1E24",
    "curationNotes": "Festive holiday themed studio portraiture capturing seasonal warmth, elegance, and family celebrations. (Plate 2 of 20)",
    "status": "verified",
  },
  {
    "id": "rbonsu-184",
    "title": "Christmas & Season: DSC_1247",
    "filename": "DSC_1247.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/christmas-season/DSC_1247.jpg",
    "alt": "Festive holiday and Christmas seasonal sitting \u2014 DSC_1247 by RBONSU Photography.",
    "category": "christmas-season",
    "categories": [
      "christmas-season",
      "events",
      "lifestyle",
      "family"
    ],
    "orientation": "landscape",
    "isFeatured": true,
    "isHeroCandidate": false,
    "gallery": "christmas-season",
    "sectionUsage": [
      "gallery_archive",
      "lightbox",
      "featured_grid"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#2F2B28",
    "curationNotes": "Festive holiday themed studio portraiture capturing seasonal warmth, elegance, and family celebrations. (Plate 3 of 20)",
    "status": "verified",
  },
  {
    "id": "rbonsu-185",
    "title": "Christmas & Season: DSC_1367",
    "filename": "DSC_1367.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/christmas-season/DSC_1367.jpg",
    "alt": "Festive holiday and Christmas seasonal sitting \u2014 DSC_1367 by RBONSU Photography.",
    "category": "christmas-season",
    "categories": [
      "christmas-season",
      "events",
      "lifestyle",
      "family"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "christmas-season",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#1E1B18",
    "curationNotes": "Festive holiday themed studio portraiture capturing seasonal warmth, elegance, and family celebrations. (Plate 4 of 20)",
    "status": "verified",
  },
  {
    "id": "rbonsu-186",
    "title": "Christmas & Season: DSC_4275",
    "filename": "DSC_4275.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/christmas-season/DSC_4275.jpg",
    "alt": "Festive holiday and Christmas seasonal sitting \u2014 DSC_4275 by RBONSU Photography.",
    "category": "christmas-season",
    "categories": [
      "christmas-season",
      "events",
      "lifestyle",
      "family"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "christmas-season",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#2B2623",
    "curationNotes": "Festive holiday themed studio portraiture capturing seasonal warmth, elegance, and family celebrations. (Plate 5 of 20)",
    "status": "verified",
  },
  {
    "id": "rbonsu-187",
    "title": "Christmas & Season: DSC_4310",
    "filename": "DSC_4310.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/christmas-season/DSC_4310.jpg",
    "alt": "Festive holiday and Christmas seasonal sitting \u2014 DSC_4310 by RBONSU Photography.",
    "category": "christmas-season",
    "categories": [
      "christmas-season",
      "events",
      "lifestyle",
      "family"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "christmas-season",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#3D352E",
    "curationNotes": "Festive holiday themed studio portraiture capturing seasonal warmth, elegance, and family celebrations. (Plate 6 of 20)",
    "status": "verified",
  },
  {
    "id": "rbonsu-188",
    "title": "Christmas & Season: DSC_5139",
    "filename": "DSC_5139.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/christmas-season/DSC_5139.jpg",
    "alt": "Festive holiday and Christmas seasonal sitting \u2014 DSC_5139 by RBONSU Photography.",
    "category": "christmas-season",
    "categories": [
      "christmas-season",
      "events",
      "lifestyle",
      "family"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "christmas-season",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#4A4138",
    "curationNotes": "Festive holiday themed studio portraiture capturing seasonal warmth, elegance, and family celebrations. (Plate 7 of 20)",
    "status": "verified",
  },
  {
    "id": "rbonsu-189",
    "title": "Christmas & Season: DSC_5303",
    "filename": "DSC_5303.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/christmas-season/DSC_5303.jpg",
    "alt": "Festive holiday and Christmas seasonal sitting \u2014 DSC_5303 by RBONSU Photography.",
    "category": "christmas-season",
    "categories": [
      "christmas-season",
      "events",
      "lifestyle",
      "family"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "christmas-season",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#5E5247",
    "curationNotes": "Festive holiday themed studio portraiture capturing seasonal warmth, elegance, and family celebrations. (Plate 8 of 20)",
    "status": "verified",
  },
  {
    "id": "rbonsu-190",
    "title": "Christmas & Season: DSC_7105",
    "filename": "DSC_7105.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/christmas-season/DSC_7105.jpg",
    "alt": "Festive holiday and Christmas seasonal sitting \u2014 DSC_7105 by RBONSU Photography.",
    "category": "christmas-season",
    "categories": [
      "christmas-season",
      "events",
      "lifestyle",
      "family"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "christmas-season",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#252525",
    "curationNotes": "Festive holiday themed studio portraiture capturing seasonal warmth, elegance, and family celebrations. (Plate 9 of 20)",
    "status": "verified",
  },
  {
    "id": "rbonsu-191",
    "title": "Christmas & Season: DSC_7155",
    "filename": "DSC_7155.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/christmas-season/DSC_7155.jpg",
    "alt": "Festive holiday and Christmas seasonal sitting \u2014 DSC_7155 by RBONSU Photography.",
    "category": "christmas-season",
    "categories": [
      "christmas-season",
      "events",
      "lifestyle",
      "family"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "christmas-season",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#1B1E24",
    "curationNotes": "Festive holiday themed studio portraiture capturing seasonal warmth, elegance, and family celebrations. (Plate 10 of 20)",
    "status": "verified",
  },
  {
    "id": "rbonsu-192",
    "title": "Christmas & Season: DSC_7546",
    "filename": "DSC_7546.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/christmas-season/DSC_7546.jpg",
    "alt": "Festive holiday and Christmas seasonal sitting \u2014 DSC_7546 by RBONSU Photography.",
    "category": "christmas-season",
    "categories": [
      "christmas-season",
      "events",
      "lifestyle",
      "family"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "christmas-season",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#2F2B28",
    "curationNotes": "Festive holiday themed studio portraiture capturing seasonal warmth, elegance, and family celebrations. (Plate 11 of 20)",
    "status": "verified",
  },
  {
    "id": "rbonsu-193",
    "title": "Christmas & Season: DSC_7661",
    "filename": "DSC_7661.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/christmas-season/DSC_7661.jpg",
    "alt": "Festive holiday and Christmas seasonal sitting \u2014 DSC_7661 by RBONSU Photography.",
    "category": "christmas-season",
    "categories": [
      "christmas-season",
      "events",
      "lifestyle",
      "family"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "christmas-season",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#1E1B18",
    "curationNotes": "Festive holiday themed studio portraiture capturing seasonal warmth, elegance, and family celebrations. (Plate 12 of 20)",
    "status": "verified",
  },
  {
    "id": "rbonsu-194",
    "title": "Christmas & Season: DSC_7686",
    "filename": "DSC_7686.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/christmas-season/DSC_7686.jpg",
    "alt": "Festive holiday and Christmas seasonal sitting \u2014 DSC_7686 by RBONSU Photography.",
    "category": "christmas-season",
    "categories": [
      "christmas-season",
      "events",
      "lifestyle",
      "family"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "christmas-season",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#2B2623",
    "curationNotes": "Festive holiday themed studio portraiture capturing seasonal warmth, elegance, and family celebrations. (Plate 13 of 20)",
    "status": "verified",
  },
  {
    "id": "rbonsu-195",
    "title": "Christmas & Season: DSC_7735",
    "filename": "DSC_7735+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/christmas-season/DSC_7735%20copy.jpg",
    "alt": "Festive holiday and Christmas seasonal sitting \u2014 DSC_7735 by RBONSU Photography.",
    "category": "christmas-season",
    "categories": [
      "christmas-season",
      "events",
      "lifestyle",
      "family"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "christmas-season",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#3D352E",
    "curationNotes": "Festive holiday themed studio portraiture capturing seasonal warmth, elegance, and family celebrations. (Plate 14 of 20)",
    "status": "verified",
  },
  {
    "id": "rbonsu-196",
    "title": "Christmas & Season: DSC_7847",
    "filename": "DSC_7847+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/christmas-season/DSC_7847%20copy.jpg",
    "alt": "Festive holiday and Christmas seasonal sitting \u2014 DSC_7847 by RBONSU Photography.",
    "category": "christmas-season",
    "categories": [
      "christmas-season",
      "events",
      "lifestyle",
      "family"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "christmas-season",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#4A4138",
    "curationNotes": "Festive holiday themed studio portraiture capturing seasonal warmth, elegance, and family celebrations. (Plate 15 of 20)",
    "status": "verified",
  },
  {
    "id": "rbonsu-197",
    "title": "Christmas & Season: DSC_7872",
    "filename": "DSC_7872+copy.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/christmas-season/DSC_7872%20copy.jpg",
    "alt": "Festive holiday and Christmas seasonal sitting \u2014 DSC_7872 by RBONSU Photography.",
    "category": "christmas-season",
    "categories": [
      "christmas-season",
      "events",
      "lifestyle",
      "family"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "christmas-season",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#5E5247",
    "curationNotes": "Festive holiday themed studio portraiture capturing seasonal warmth, elegance, and family celebrations. (Plate 16 of 20)",
    "status": "verified",
  },
  {
    "id": "rbonsu-198",
    "title": "Christmas & Season: DSC_7986",
    "filename": "DSC_7986.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/christmas-season/DSC_7986.jpg",
    "alt": "Festive holiday and Christmas seasonal sitting \u2014 DSC_7986 by RBONSU Photography.",
    "category": "christmas-season",
    "categories": [
      "christmas-season",
      "events",
      "lifestyle",
      "family"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "christmas-season",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#252525",
    "curationNotes": "Festive holiday themed studio portraiture capturing seasonal warmth, elegance, and family celebrations. (Plate 17 of 20)",
    "status": "verified",
  },
  {
    "id": "rbonsu-199",
    "title": "Christmas & Season: DSC_8288",
    "filename": "DSC_8288.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/christmas-season/DSC_8288.jpg",
    "alt": "Festive holiday and Christmas seasonal sitting \u2014 DSC_8288 by RBONSU Photography.",
    "category": "christmas-season",
    "categories": [
      "christmas-season",
      "events",
      "lifestyle",
      "family"
    ],
    "orientation": "landscape",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "christmas-season",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1600,
      "height": 1200,
      "aspectRatio": 1.333,
      "orientation": "landscape"
    },
    "dominantColor": "#1B1E24",
    "curationNotes": "Festive holiday themed studio portraiture capturing seasonal warmth, elegance, and family celebrations. (Plate 18 of 20)",
    "status": "verified",
  },
  {
    "id": "rbonsu-200",
    "title": "Christmas & Season: DSC_8333",
    "filename": "DSC_8333.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/christmas-season/DSC_8333.jpg",
    "alt": "Festive holiday and Christmas seasonal sitting \u2014 DSC_8333 by RBONSU Photography.",
    "category": "christmas-season",
    "categories": [
      "christmas-season",
      "events",
      "lifestyle",
      "family"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "christmas-season",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#2F2B28",
    "curationNotes": "Festive holiday themed studio portraiture capturing seasonal warmth, elegance, and family celebrations. (Plate 19 of 20)",
    "status": "verified",
  },
  {
    "id": "rbonsu-201",
    "title": "Christmas & Season: DSC_8342",
    "filename": "DSC_8342.jpg",
    "src": "https://qpavbelrhifpkxncwbnr.supabase.co/storage/v1/object/public/rbonsu-photography/christmas-season/DSC_8342.jpg",
    "alt": "Festive holiday and Christmas seasonal sitting \u2014 DSC_8342 by RBONSU Photography.",
    "category": "christmas-season",
    "categories": [
      "christmas-season",
      "events",
      "lifestyle",
      "family"
    ],
    "orientation": "portrait",
    "isFeatured": false,
    "isHeroCandidate": false,
    "gallery": "christmas-season",
    "sectionUsage": [
      "gallery_archive",
      "lightbox"
    ],
    "dimensions": {
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75,
      "orientation": "portrait"
    },
    "dominantColor": "#1E1B18",
    "curationNotes": "Festive holiday themed studio portraiture capturing seasonal warmth, elegance, and family celebrations. (Plate 20 of 20)",
    "status": "verified",
  }
];

/**
 * EXPLICIT HOMEPAGE HERO PICKS — edit this list to change which photo
 * appears in the homepage hero for each category. Order here is the order
 * slides rotate in.
 *
 * 'filename' just needs to be a distinctive fragment of the image's
 * filename as it appears in the PHOTOGRAPHY_MANIFEST entries above
 * (case-insensitive, ignores the '+' Squarespace uses for spaces) —
 * e.g. 'DSC_2629' is enough, no need for the full 'DSC_2629.jpg'.
 * It must belong to the listed category, and should be a landscape photo
 * so the hero crops/crossfades consistently full-bleed.
 */
const HERO_SHOWCASE_PICKS: { category: ImageCategory; filename: string }[] = [
  { category: 'weddings', filename: 'DSC_2629' },
  { category: 'maternity', filename: 'DSC_3624' },
  { category: 'engagement', filename: 'DSC_3348' },
  { category: 'lifestyle-birthdays', filename: 'DSC_0365' },
  { category: 'newborn-kids-family', filename: 'DSC_2628' },
  { category: 'christmas-season', filename: 'DSC_7105' },
];

const VERIFIED_BY_ID = new Map(
  PHOTOGRAPHY_MANIFEST.filter((asset) => asset.status === 'verified').map((asset) => [asset.id, asset]),
);

const VERIFIED_BY_CATEGORY = new Map<ImageCategory, PhotographyAsset[]>();
for (const asset of PHOTOGRAPHY_MANIFEST) {
  if (asset.status !== 'verified') continue;
  const list = VERIFIED_BY_CATEGORY.get(asset.category) ?? [];
  list.push(asset);
  VERIFIED_BY_CATEGORY.set(asset.category, list);
}

function findHeroPick(category: ImageCategory, filenameFragment: string): PhotographyAsset | undefined {
  const normalizedFragment = filenameFragment.toLowerCase().replace(/\+/g, ' ');
  const inCategory = VERIFIED_BY_CATEGORY.get(category) ?? [];
  return inCategory.find((asset) =>
    asset.filename.toLowerCase().replace(/\+/g, ' ').includes(normalizedFragment)
  );
}

export function getHeroShowcaseAssets(): PhotographyAsset[] {
  return HERO_SHOWCASE_PICKS.map(({ category, filename }) => {
    const exactPick = findHeroPick(category, filename);
    if (exactPick) return exactPick;

    // Fallback ONLY if the filename above doesn't match anything (e.g. a typo,
    // or that photo gets removed later) — same landscape-first logic as before,
    // so the hero slide for that category never goes empty.
    const inCategory = VERIFIED_BY_CATEGORY.get(category) ?? [];
    const landscapeOnly = inCategory.filter((asset) => asset.orientation === 'landscape');
    const pool = landscapeOnly.length > 0 ? landscapeOnly : inCategory;
    return pool.find((asset) => asset.isHeroCandidate) ?? pool.find((asset) => asset.isFeatured) ?? pool[0];
  }).filter((asset): asset is PhotographyAsset => Boolean(asset));
}


/**
 * Filter image manifest with multi-criteria support (verified authentic photography only by default)
 */
export function filterManifest(filters: ImageManifestFilter): PhotographyAsset[] {
  return PHOTOGRAPHY_MANIFEST.filter((asset) => {
    if (asset.status !== 'verified') {
      return false;
    }
    if (filters.category && filters.category !== 'all') {
      if (asset.category !== filters.category) {
        return false;
      }
    }
    if (filters.orientation && asset.orientation !== filters.orientation) {
      return false;
    }
    if (filters.isFeatured !== undefined && asset.isFeatured !== filters.isFeatured) {
      return false;
    }
    if (filters.isHeroCandidate !== undefined && asset.isHeroCandidate !== filters.isHeroCandidate) {
      return false;
    }
    if (filters.gallery && asset.gallery !== filters.gallery) {
      return false;
    }
    if (filters.sectionUsage && !asset.sectionUsage.includes(filters.sectionUsage)) {
      return false;
    }
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      const matchTitle = asset.title.toLowerCase().includes(q);
      const matchAlt = asset.alt.toLowerCase().includes(q);
      const matchNotes = asset.curationNotes?.toLowerCase().includes(q);
      const matchCat = asset.categories.some((c) => c.includes(q)) || asset.category.includes(q);
      if (!matchTitle && !matchAlt && !matchNotes && !matchCat) {
        return false;
      }
    }
    return true;
  });
}

/**
 * Retrieve single photograph by unique ID
 */
export function getImageById(id: string): PhotographyAsset | undefined {
  return VERIFIED_BY_ID.get(id);
}



/**
 * Group assets by stories / collections
 */
export interface PhotoStory {
  id: string;
  title: string;
  category: string;
  description: string;
  coverImage: PhotographyAsset;
  images: PhotographyAsset[];
}

export const CURATED_STORIES: PhotoStory[] = [
  {
    id: 'story-wedding-elegance',
    title: 'Editorial Wedding Collection',
    category: 'weddings',
    description: 'A celebration of love, opulent ballroom floral installations, and timeless monochromatic portraits.',
    coverImage: PHOTOGRAPHY_MANIFEST.find((a) => a.category === 'weddings') || PHOTOGRAPHY_MANIFEST[0],
    images: PHOTOGRAPHY_MANIFEST.filter((a) => a.category === 'weddings').slice(0, 12),
  },
  {
    id: 'story-maternity-sculpture',
    title: 'Graceful Maternity Studies',
    category: 'maternity',
    description: 'High-contrast studio lighting, flowing fabrics, and sculptural profiles honoring the beauty of expectant motherhood.',
    coverImage: PHOTOGRAPHY_MANIFEST.find((a) => a.category === 'maternity') || PHOTOGRAPHY_MANIFEST[24],
    images: PHOTOGRAPHY_MANIFEST.filter((a) => a.category === 'maternity').slice(0, 12),
  },
  {
    id: 'story-engagement-romance',
    title: 'Intimate Engagement Narratives',
    category: 'engagement',
    description: 'Golden hour warmth, architectural backdrops, and candid romantic connections captured across scenic locations.',
    coverImage: PHOTOGRAPHY_MANIFEST.find((a) => a.category === 'engagement') || PHOTOGRAPHY_MANIFEST[64],
    images: PHOTOGRAPHY_MANIFEST.filter((a) => a.category === 'engagement').slice(0, 12),
  },
  {
    id: 'story-lifestyle-celebration',
    title: 'Vibrant Lifestyle & Milestones',
    category: 'lifestyle-birthdays',
    description: 'Dynamic editorial poses, high-glamour birthday portraits, and vibrant joy in celebration of milestone moments.',
    coverImage: PHOTOGRAPHY_MANIFEST.find((a) => a.category === 'lifestyle-birthdays') || PHOTOGRAPHY_MANIFEST[87],
    images: PHOTOGRAPHY_MANIFEST.filter((a) => a.category === 'lifestyle-birthdays').slice(0, 12),
  },
  {
    id: 'story-family-heirlooms',
    title: 'Family, Newborn & Heritage',
    category: 'newborn-kids-family',
    description: 'Tender multigenerational heirlooms, newborn portraits, and joyous family bonding captured with timeless warmth.',
    coverImage: PHOTOGRAPHY_MANIFEST.find((a) => a.category === 'newborn-kids-family') || PHOTOGRAPHY_MANIFEST[135],
    images: PHOTOGRAPHY_MANIFEST.filter((a) => a.category === 'newborn-kids-family').slice(0, 12),
  },
  {
    id: 'story-holiday-elegance',
    title: 'Christmas & Seasonal Magic',
    category: 'christmas-season',
    description: 'Festive warmth, studio holiday backdrops, and seasonal family portraiture celebrating the holiday season.',
    coverImage: PHOTOGRAPHY_MANIFEST.find((a) => a.category === 'christmas-season') || PHOTOGRAPHY_MANIFEST[181],
    images: PHOTOGRAPHY_MANIFEST.filter((a) => a.category === 'christmas-season').slice(0, 12),
  }
];
