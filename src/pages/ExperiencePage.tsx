import React from 'react';
import { Link } from '@/lib/router-compat';
import {
  ArrowUpRight,
  Sparkles,
  HeartHandshake,
  Palette,
  Camera,
  Layers,
  Gift,
  CheckCircle2,
} from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { PageTransition } from '../components/motion/PageTransition';
import { AdaptiveImage } from '../components/common/AdaptiveImage';
import { useGalleryAssetsByCategories } from '@/lib/gallery-client';

export const ExperiencePage: React.FC = () => {
  const { assets: liveAssets } = useGalleryAssetsByCategories(['wedding-couples', 'portraits-fashion']);
  const shootAsset = liveAssets.find((asset) => asset.orientation === 'landscape') ?? liveAssets[0];
  const albumAsset = liveAssets.find((asset) => asset.id !== shootAsset?.id) ?? liveAssets[1];

  const journeyStages = [
    {
      step: '01',
      icon: HeartHandshake,
      title: 'The Connection & Vision Consultation',
      subtitle: 'Listening to your story and defining the aesthetic intention.',
      description:
        'We begin with an in-depth conversation to understand the essence of your celebration, your personal style, and the emotions you want preserved. We review timeline details, location lighting profiles, and custom collection options.',
      deliverables: ['Creative consultation call', 'Custom timeline blueprint', 'Date reservation agreement'],
    },
    {
      step: '02',
      icon: Palette,
      title: 'Styling, Wardrobe & Creative Direction',
      subtitle: 'Curating textures, silhouettes, and lighting choreography.',
      description:
        'We discuss recommendations on fabrics, movement, contrast, and color palettes. We coordinate with your planners and stylists to ensure every visual element aligns seamlessly.',
      deliverables: ['Editorial styling guidance', 'Location & lighting considerations', 'Shot schedule blueprint'],
    },
    {
      step: '03',
      icon: Camera,
      title: 'The Shoot Day: Calm, Natural & Unhurried',
      subtitle: 'Effortless direction where you feel commanding yet completely relaxed.',
      description:
        'On set or on your wedding day, our approach is unobtrusive, poised, and encouraging. We provide gentle directional cues so you never have to wonder where to look or how to place your hands, while allowing spontaneous romance to unfold organically.',
      deliverables: ['Lead master photographer', 'Professional capture workflow', 'Preview teaser selections'],
    },
    {
      step: '04',
      icon: Layers,
      title: 'Master Color Grading & Editorial Retouching',
      subtitle: 'Individual frame-by-frame artisanal finishing.',
      description:
        'Every selected photograph undergoes our signature color grading process: honoring authentic, luminous skin tones, harmonizing rich shadow tones, and removing temporary distractions while preserving authentic texture.',
      deliverables: ['Frame-by-frame color finishing', 'Editorial skin tone refinement', 'Dynamic range optimization'],
    },
    {
      step: '05',
      icon: Gift,
      title: 'The Heirloom Delivery & Archival Keepsakes',
      subtitle: 'Treasures engineered to be touched and treasured for generations.',
      description:
        'Your complete gallery is unveiled through a high-resolution private online portal with download access. For clients commissioning heirloom albums, we design custom-bound books crafted with fine art materials.',
      deliverables: ['Private online gallery archive', 'Personal print release rights', 'Bespoke heirloom album options'],
    },
  ];

  return (
    <PageTransition>
      <SEOHead
        title="The Client Experience | RBONSU PHOTOGRAPHY"
        description="Discover the five-stage luxury client journey with RBONSU Photography — from discovery consultation and styling direction to effortless shoot day and handcrafted heirloom album delivery."
        canonicalPath="/experience"
      />

      <div className="py-12 sm:py-20 bg-[#FAF8F5]">
        <div className="max-w-[1720px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
          {/* Header */}
          <div className="max-w-4xl mb-16 sm:mb-24">
            <div className="flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] text-[#8C7A6B] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#5E5247]" />
              <span>The RBONSU Signature Process</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#191817] font-normal tracking-tight leading-[1.04] mb-6">
              The Client Experience
            </h1>
            <p className="font-sans text-base sm:text-lg text-[#5E5247] font-light leading-relaxed max-w-2xl">
              Great photographs are not accidental; they are the fruit of intentional preparation,
              unflappable presence, and artisanal post-production. Here is how we craft your visual legacy.
            </p>
          </div>

          {/* Visual Hero Spread */}
          {shootAsset && (
            <div className="mb-24 overflow-hidden bg-[#ECE7DD] shadow-md">
              <div className="aspect-[16/9] w-full">
                <AdaptiveImage
                  src={shootAsset.src}
                  alt={shootAsset.alt}
                  initialAspectRatio={shootAsset.dimensions.aspectRatio}
                  priority={true}
                />
              </div>
            </div>
          )}

          {/* 5-Stage Journey Breakdown */}
          <div className="space-y-16 sm:space-y-24 mb-32">
            {journeyStages.map((stage) => {
              const Icon = stage.icon;
              return (
                <section
                  key={stage.step}
                  id={`stage-${stage.step}`}
                  className="bg-[#F4F1EB] border border-[#ECE7DD] p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start"
                >
                  <div className="lg:col-span-3 flex flex-col justify-between">
                    <span className="font-mono text-4xl sm:text-5xl text-[#8C7A6B] font-light block mb-4">
                      {stage.step}
                    </span>
                    <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#ECE7DD] flex items-center justify-center text-[#191817]">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="lg:col-span-6">
                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#191817] font-normal mb-2">
                      {stage.title}
                    </h2>
                    <p className="font-serif text-lg text-[#5E5247] italic mb-6">
                      {stage.subtitle}
                    </p>
                    <p className="font-sans text-sm sm:text-base text-[#5E5247] font-light leading-relaxed mb-6">
                      {stage.description}
                    </p>
                  </div>

                  <div className="lg:col-span-3 bg-[#FAF8F5] p-6 border border-[#ECE7DD] text-xs">
                    <span className="uppercase tracking-widest text-[#8C7A6B] text-[10px] block mb-3 font-medium">
                      Stage Deliverables
                    </span>
                    <ul className="space-y-2.5 text-[#5E5247]">
                      {stage.deliverables.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#8C7A6B] mr-2 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              );
            })}
          </div>

          {/* Heirloom Albums Feature */}
          <div className="bg-[#191817] text-[#FAF8F5] p-10 sm:p-16 lg:p-20 mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#A69280] block">
                Tangible Legacy
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal leading-[1.1]">
                Fine Art Heirloom Keepsake Albums
              </h2>
              <p className="text-sm sm:text-base text-[#D8D3CA] font-light leading-relaxed">
                In an era of fleeting digital screens, there is no substitute for the tactile weight of a
                custom-bound fine art album. Printed on heavyweight fine art paper with lay-flat spreads,
                each volume preserves your memories in tangible, archival form.
              </p>
              <div className="pt-4 flex flex-wrap gap-4 text-xs text-[#FAF8F5]">
                <div className="p-3 bg-white/10 rounded">
                  <span className="block font-semibold">Lay-Flat Panoramic Spreads</span>
                  <span className="text-[#A69280]">Seamless presentation across gutter</span>
                </div>
                <div className="p-3 bg-white/10 rounded">
                  <span className="block font-semibold">Fine Art Archival Paper</span>
                  <span className="text-[#A69280]">Heavyweight matte finish</span>
                </div>
                <div className="p-3 bg-white/10 rounded">
                  <span className="block font-semibold">Custom Cover Options</span>
                  <span className="text-[#A69280]">Curated linen & embossed finishing</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              {albumAsset && (
                <div className="overflow-hidden bg-[#242220] shadow-2xl">
                  <AdaptiveImage
                    src={albumAsset.src}
                    alt={albumAsset.alt}
                    initialAspectRatio={albumAsset.dimensions.aspectRatio}
                    imageClassName="filter brightness-95"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Bottom Action */}
          <div className="text-center py-16 bg-[#F4F1EB] border border-[#ECE7DD] p-8">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#191817] font-normal mb-4">
              Begin Your Experience
            </h2>
            <p className="font-sans text-sm text-[#5E5247] max-w-md mx-auto mb-8 font-light">
              We would be honored to document your next milestone. Reach out to check availability and
              receive our complete lookbook.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center font-sans text-xs uppercase tracking-[0.16em] font-medium py-4 px-8 bg-[#191817] text-[#FAF8F5] hover:bg-[#2F2C29] transition-all"
            >
              <span>Schedule Initial Consultation</span>
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
