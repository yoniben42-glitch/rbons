import React from 'react';
import { Link } from '@/lib/router-compat';
import { ArrowUpRight } from 'lucide-react';
import { AdaptiveImage } from '../common/AdaptiveImage';
import { useGalleryAssetsByCategories } from '@/lib/gallery-client';

export const PhilosophySection: React.FC = () => {
  const { assets: liveAssets } = useGalleryAssetsByCategories(['portraits-fashion', 'wedding-couples']);
  const leftImage = liveAssets[0];
  const rightImage = liveAssets[1];

  return (
    <section id="studio-philosophy" className="py-24 md:py-36 bg-[#191817] text-[#FAF8F5]">
      <div className="max-w-[1720px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text Narrative Column (7 cols) */}
          <div className="lg:col-span-7">
            <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#A69280] block mb-4">
              Artistic Philosophy & Direction
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.08] mb-8">
              "We believe photographs should not merely document a day — they should immortalize an emotion."
            </h2>

            <div className="space-y-6 text-[#D8D3CA] text-base sm:text-lg font-light leading-relaxed max-w-2xl">
              <p>
                RBONSU PHOTOGRAPHY merges the grandeur of luxury high-fashion editorial storytelling
                with the tender authenticity of genuine human connection. Every frame is treated with
                reverence for directional light, rich natural skin tones, and textural contrast.
              </p>
              <p>
                Whether orchestrating grand wedding celebrations in historic ballrooms or creating
                sculptural studio portraiture, our deliberate approach puts you at ease, resulting in
                images that feel regal, intimate, and eternally timeless.
              </p>
            </div>

            <div className="pt-8 mt-8 border-t border-white/15 flex flex-wrap items-center gap-6">
              <div>
                <span className="block font-serif text-3xl text-white font-normal">100%</span>
                <span className="text-[11px] uppercase tracking-wider text-[#A69280]">
                  Authentic Real Work
                </span>
              </div>
              <div className="h-8 w-[1px] bg-white/20 hidden sm:block" />
              <div>
                <span className="block font-serif text-3xl text-white font-normal">Alexandria & Global</span>
                <span className="text-[11px] uppercase tracking-wider text-[#A69280]">
                  Destination Coverage
                </span>
              </div>
              <div className="h-8 w-[1px] bg-white/20 hidden sm:block" />
              <div>
                <span className="block font-serif text-3xl text-white font-normal">Heirloom</span>
                <span className="text-[11px] uppercase tracking-wider text-[#A69280]">
                  Archival Fine Art Albums
                </span>
              </div>
            </div>

            <div className="mt-10">
              <Link
                to="/about"
                className="inline-flex items-center text-xs uppercase tracking-[0.16em] font-medium text-white hover:text-[#A69280] transition-colors group"
              >
                <span>Read Studio Story & Background</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Dual Editorial Image Staggered Layout (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4 sm:space-y-6 pt-8">
              {leftImage && (
                <div className="overflow-hidden bg-[#22201E] shadow-2xl">
                  <AdaptiveImage
                    src={leftImage.src}
                    alt={leftImage.alt}
                    initialAspectRatio={leftImage.dimensions.aspectRatio}
                    imageClassName="filter brightness-95 contrast-105"
                  />
                </div>
              )}
              <div className="p-4 bg-[#22201E] border border-white/10 text-xs text-[#D8D3CA]">
                <span className="text-white uppercase tracking-wider block mb-1">
                  Chiaroscuro
                </span>
                Sculptural natural light with deep black tonal rolloff.
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="p-4 bg-[#22201E] border border-white/10 text-xs text-[#D8D3CA]">
                <span className="text-white uppercase tracking-wider block mb-1">
                  Editorial Posing
                </span>
                Effortless guidance bringing confidence to every frame.
              </div>
              {rightImage && (
                <div className="overflow-hidden bg-[#22201E] shadow-2xl">
                  <AdaptiveImage
                    src={rightImage.src}
                    alt={rightImage.alt}
                    initialAspectRatio={rightImage.dimensions.aspectRatio}
                    imageClassName="filter brightness-95 contrast-105"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
