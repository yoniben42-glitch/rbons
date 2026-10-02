/**
 * RBONSU PHOTOGRAPHY — VERIFIED BUSINESS DATA & REPOSITORY
 *
 * Professional studio data, authentic service structures, curated portfolio projects,
 * client journey milestones, and luxury commission guides.
 */

export interface VerifiedBusinessInfo {
  brandName: string;
  tagline: string;
  location: string;
  inquiriesEmail: string;
  phone: string;
  phoneDisplay?: string;
  phoneTel?: string;
  studioNotice: string;
  instagram: {
    handle: string;
    url: string;
  };
  pinterest: {
    handle: string;
    url: string;
  };
  socials: {
    name: string;
    handle: string;
    url: string;
  }[];
  workingHours: string;
  serviceAreas: string[];
}

export const businessInfo: VerifiedBusinessInfo = {
  brandName: 'RBONSU PHOTOGRAPHY',
  tagline: 'Timeless Weddings, Luxury Portraits & Editorial Fine Art',
  location: 'King Street, Alexandria, VA',
  inquiriesEmail: 'info@rbonsuphotography.com',
  phone: '(571) 265-6674',
  phoneDisplay: '(571) 265-6674',
  phoneTel: 'tel:+15712656674',
  studioNotice: 'Now accepting wedding commissions & portrait reservations for 2026 / 2027.',
  instagram: {
    handle: '@rbonsu_photography',
    url: 'https://www.instagram.com/rbonsu_photography/',
  },
  pinterest: {
    handle: '@bonsu_photography',
    url: 'https://www.pinterest.com/bonsu_photography/',
  },
  socials: [
    {
      name: 'Instagram',
      handle: '@rbonsu_photography',
      url: 'https://www.instagram.com/rbonsu_photography/',
    },
    {
      name: 'Pinterest',
      handle: '@bonsu_photography',
      url: 'https://www.pinterest.com/bonsu_photography/',
    },
  ],
  workingHours: 'Sunday – Friday: 9:00 AM – 5:00 PM Eastern Time · Saturday: Closed',
  serviceAreas: [
    'Washington, D.C.',
    'Maryland & Virginia (DMV)',
    'New York City',
    'Atlanta',
    'Destination & Worldwide',
  ],
};

export interface ServicePackage {
  id: string;
  name: string;
  priceStartingAt: string;
  idealFor: string;
  includes: string[];
  popular?: boolean;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  heroImageId: string;
  investmentGuide: string;
  packages: ServicePackage[];
  deliverables: string[];
  timeline: string;
  sampleAssetIds: string[];
}

export const verifiedServices: ServiceItem[] = [
  {
    id: 'srv-weddings',
    slug: 'weddings',
    title: 'Weddings & Destination Nuptials',
    category: 'weddings',
    subtitle: 'Timeless Love Stories & Grand Celebrations',
    description:
      'From intimate vows to grand ballroom celebrations, we capture the romance, emotion, and exquisite grandeur of your wedding day with refined editorial poise and documentary intimacy.',
    heroImageId: 'rbonsu-002',
    investmentGuide: 'Tailored investment proposals upon inquiry',
    packages: [
      {
        id: 'pkg-wedding-signature',
        name: 'The Signature Wedding Collection',
        priceStartingAt: 'Inquire for Custom Investment',
        idealFor: 'Full-day celebrations with comprehensive documentation',
        popular: true,
        includes: [
          'Comprehensive Day Coverage',
          'Lead Photographer (RBONSU)',
          'Engagement / Pre-Wedding Session Option',
          'Private Online High-Resolution Master Gallery',
          'Curated Color Grading & Editorial Retouching',
          'Personal Print & Reproduction Rights',
        ],
      },
      {
        id: 'pkg-wedding-intimate',
        name: 'The Classic Wedding Collection',
        priceStartingAt: 'Inquire for Custom Investment',
        idealFor: 'Single-venue ceremonies & intimate gatherings',
        includes: [
          'Targeted Celebration Coverage',
          'Lead Photographer (RBONSU)',
          'Private Online High-Resolution Master Gallery',
          'Signature Color Grading & Enhancements',
          'Personal Print & Reproduction Rights',
        ],
      },
      {
        id: 'pkg-wedding-destination',
        name: 'The Destination & Multi-Day Commission',
        priceStartingAt: 'Custom Quote',
        idealFor: 'Multi-day celebrations, cultural nuptials & travel destinations',
        includes: [
          'Multi-Event Celebration Coverage',
          'Lead Photography & Custom Production Team',
          'Location & Lighting Consultation',
          'High-Resolution Digital Archive Delivery',
          'Bespoke Fine Art Keepsake Consultation',
        ],
      },
    ],
    deliverables: [
      'Curated High-Resolution Digital Master Gallery',
      'Signature Editorial Color Grading & Skin Retouching',
      'Private Online Client Proofing & Download Access',
      'Full Personal Reproduction & Archival Rights',
      'Fine Art Heirloom Album & Print Options',
    ],
    timeline: 'Online gallery delivered with preview teasers sent first.',
    sampleAssetIds: [
      'rbonsu-002',
      'rbonsu-003',
      'rbonsu-004',
      'rbonsu-005',
      'rbonsu-008',
      'rbonsu-121',
    ],
  },
  {
    id: 'srv-portraits',
    slug: 'portraits',
    title: 'Luxury Portraits & Editorial Sittings',
    category: 'portraits',
    subtitle: 'Striking Studio Lighting & Refined Character Profiles',
    description:
      'Impeccably lit studio sessions and environmental portraiture designed to capture your authentic confidence, beauty, and unique personal essence with magazine-grade sophistication.',
    heroImageId: 'rbonsu-122',
    investmentGuide: 'Tailored investment proposals upon inquiry',
    packages: [
      {
        id: 'pkg-portrait-editorial',
        name: 'The Editorial Signature Session',
        priceStartingAt: 'Inquire for Custom Investment',
        idealFor: 'Luxury beauty, fashion, milestone celebrations & creative artists',
        popular: true,
        includes: [
          'Dedicated Studio or On-Location Sitting',
          'Multiple Wardrobe Look Transitions',
          'Professional Studio Direction & Sculpted Light',
          'Curated Suite of Master Retouched Images',
          'Full High-Resolution Download Rights',
        ],
      },
      {
        id: 'pkg-portrait-essential',
        name: 'The Classic Studio Portrait',
        priceStartingAt: 'Inquire for Custom Investment',
        idealFor: 'Executive branding, refined headshots & single-look portraiture',
        includes: [
          'Focused Studio Sitting',
          'Curated Wardrobe & Backdrop Options',
          'Master Retouched High-Resolution Images',
          'Private Online Selection Gallery',
        ],
      },
    ],
    deliverables: [
      'Private Online Selection & Proofing Gallery',
      'Signature High-End Editorial Retouching',
      'High-Resolution Digital Masters for Web and Large-Format Printing',
    ],
    timeline: 'Proofing gallery access followed by final retouched master delivery.',
    sampleAssetIds: [
      'rbonsu-122',
      'rbonsu-012',
      'rbonsu-017',
      'rbonsu-024',
      'rbonsu-030',
      'rbonsu-043',
    ],
  },
  {
    id: 'srv-maternity-family',
    slug: 'maternity-family',
    title: 'Maternity, Newborn & Family Milestones',
    category: 'portraits',
    subtitle: 'Cherishing Life’s Most Sacred Transitions',
    description:
      'Artful documentation of motherhood, newborn beginnings, and generations of family warmth. Crafted with gentle pacing, flattering light, and quiet tenderness.',
    heroImageId: 'rbonsu-026',
    investmentGuide: 'Tailored investment proposals upon inquiry',
    packages: [
      {
        id: 'pkg-maternity-luxury',
        name: 'The Heirloom Maternity & Family Collection',
        priceStartingAt: 'Inquire for Custom Investment',
        idealFor: 'Expecting mothers, growing families & multigenerational legacies',
        popular: true,
        includes: [
          'Studio or Scenic Location Session',
          'Partner and Immediate Family Members Welcome',
          'Wardrobe Guidance & Gentle Direction',
          'Curated Suite of Master Retouched Images',
          'Complete High-Resolution Archive',
        ],
      },
    ],
    deliverables: [
      'Private Online Proofing & Download Gallery',
      'Gentle Artistic Retouching & Natural Skin Toning',
      'Fine Art Print Consultation',
    ],
    timeline: 'Final edited gallery delivered via private online access.',
    sampleAssetIds: ['rbonsu-026', 'rbonsu-027', 'rbonsu-028', 'rbonsu-029'],
  },
  {
    id: 'srv-commercial',
    slug: 'commercial',
    title: 'Brand Campaigns & Editorial Lookbooks',
    category: 'editorial',
    subtitle: 'Visual Identity for Discerning Designers & Brands',
    description:
      'Bespoke visual production for apparel designers, beauty brands, luxury events, and commercial campaigns demanding cinematic presence and strong artistic direction.',
    heroImageId: 'rbonsu-124',
    investmentGuide: 'Custom day and half-day rates upon request',
    packages: [
      {
        id: 'pkg-commercial-campaign',
        name: 'Commercial & Editorial Production',
        priceStartingAt: 'Custom Quote',
        idealFor: 'Brand collections, lookbooks, and commercial marketing campaigns',
        includes: [
          'Dedicated Set Production & Shooting Schedule',
          'Pre-Production Creative Consultation & Moodboards',
          'Commercial Usage Licensing Agreement',
          'Master High-Resolution Asset Suite',
        ],
      },
    ],
    deliverables: [
      'Complete Raw Capture Review & Curation',
      'Master High-Resolution Color-Graded Assets',
      'Commercial Licensing & Format Optimization',
    ],
    timeline: 'Coordinated to project campaign deadlines.',
    sampleAssetIds: ['rbonsu-124', 'rbonsu-035', 'rbonsu-040', 'rbonsu-122'],
  },
];

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  season: string;
  description: string;
  coverImageId: string;
  assetIds: string[];
}

export const verifiedProjects: PortfolioProject[] = [
  {
    id: 'proj-wedding-collection',
    slug: 'wedding-collection',
    title: 'Editorial Wedding Collection',
    category: 'Weddings',
    location: 'King Street, Alexandria. VA & Worldwide',
    season: 'Selected Works',
    description:
      'A curated collection of wedding celebrations featuring elegant floral archways, couple portraits, emotional ceremony moments, and festive evening receptions.',
    coverImageId: 'rbonsu-002',
    assetIds: [
      'rbonsu-002',
      'rbonsu-003',
      'rbonsu-004',
      'rbonsu-005',
      'rbonsu-006',
      'rbonsu-007',
      'rbonsu-008',
      'rbonsu-121',
    ],
  },
  {
    id: 'proj-monochrome-editorial',
    slug: 'monochrome-editorial',
    title: 'Monochrome Studio Study',
    category: 'Portraits & Studio',
    location: 'Studio',
    season: 'Selected Works',
    description:
      'High-contrast chiaroscuro lighting, textured garments, and statuesque silhouettes showcasing timeless monochrome craft.',
    coverImageId: 'rbonsu-003',
    assetIds: ['rbonsu-003', 'rbonsu-012', 'rbonsu-017', 'rbonsu-024', 'rbonsu-122'],
  },
  {
    id: 'proj-fine-art-portraiture',
    slug: 'fine-art-portraiture',
    title: 'Fine Art Portrait Series',
    category: 'Portraits',
    location: 'Studio & Natural Light',
    season: 'Selected Works',
    description:
      'Warm natural tones, lush outdoor backdrops, and intimate couple moments honoring genuine connection and character.',
    coverImageId: 'rbonsu-005',
    assetIds: ['rbonsu-005', 'rbonsu-015', 'rbonsu-020', 'rbonsu-027', 'rbonsu-030'],
  },
];

export interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'weddings' | 'portraits' | 'delivery';
}

export const frequentlyAskedQuestions: FAQItem[] = [
  {
    question: 'How far in advance should we inquire about a wedding commission?',
    answer:
      'We recommend reaching out several months in advance for peak wedding dates, though we also welcome inquiries for last-minute and weekday availability.',
    category: 'weddings',
  },
  {
    question: 'Do you travel for destination celebrations and portrait sessions?',
    answer:
      'Yes. RBONSU is based in King Street, Alexandria. VA and is available across the Washington D.C., Maryland, and Virginia (DMV) area, nationwide, and internationally for destination commissions.',
    category: 'general',
  },
  {
    question: 'How are the final photographs delivered?',
    answer:
      'Photographs are delivered via a private, high-resolution online gallery with full download access and personal print rights. Fine art album and print options are also available.',
    category: 'delivery',
  },
  {
    question: 'Do you provide raw, unedited camera files?',
    answer:
      'We deliver fully curated, high-resolution finished images that have undergone our signature color grading and retouching. RAW files represent unfinished capture files and are not delivered.',
    category: 'general',
  },
  {
    question: 'How do we secure a date on the studio calendar?',
    answer:
      'Dates are reserved upon execution of a commission agreement and completion of the initial booking deposit.',
    category: 'weddings',
  },
  {
    question: 'Do you provide styling or wardrobe guidance for sessions?',
    answer:
      'Yes. Prior to your session, we discuss aesthetic direction, palettes, and styling recommendations to ensure the setting, lighting, and wardrobe harmonize beautifully.',
    category: 'portraits',
  },
];
