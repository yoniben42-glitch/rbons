import React from 'react';
import { Link } from '@/lib/router-compat';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { CURATED_STORIES } from '../../data/imageManifest';
import { AdaptiveImage } from '../common/AdaptiveImage';
import type { ImageCategory } from '@/types/image';
import { normalizeGalleryCategory } from '@/types/gallery';
import { useGalleryAssets } from '@/lib/gallery-client';

export const SelectedStories: React.FC = () => {
  const { assets: liveAssets } = useGalleryAssets('all');

  return (
    <section id="selected-stories" className="py-20 md:py-32 bg-[#FAF8F5]">
      <div className="max-w-[1720px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#ECE7DD]">
          <div>
            <div className="flex items-center space-x-2 text-[11px] uppercase tracking-[0.2em] text-[#8C7A6B] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#5E5247]" />
              <span>Curated Visual Narratives</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#191817] font-normal tracking-tight">
              Selected Stories & Series
            </h2>
          </div>

          <Link
            to="/work"
            className="mt-4 md:mt-0 inline-flex items-center text-xs uppercase tracking-[0.15em] font-medium text-[#191817] hover:text-[#5E5247] transition-colors group"
          >
            <span>View Complete Archive</span>
            <ArrowUpRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
          {CURATED_STORIES.map((story, idx) => {
            const storyCategory = normalizeGalleryCategory(String(story.category)) as ImageCategory;
            const photoCount = liveAssets.filter((asset) => asset.category === storyCategory).length;
            return (
            <article
              key={story.id}
              className="group flex flex-col justify-between border-t border-[#ECE7DD] pt-6"
            >
              <div>
                {/* Cover Image */}
                <div className="overflow-hidden bg-[#ECE7DD] mb-6">
                  {(() => {
  const liveCover =
    liveAssets.find((asset) => asset.id === story.coverImage.id) ??
    liveAssets.find(
      (asset) =>
        asset.category === storyCategory && asset.isFeatured,
    ) ??
    liveAssets.find(
      (asset) => asset.category === storyCategory,
    );

  if (!liveCover) {
    return <div className="aspect-[4/3] flex items-center justify-center text-[10px] uppercase tracking-[0.18em] text-[#8C7A6B]">Live gallery pending</div>;
  }

  return (
    <AdaptiveImage
      src={liveCover.src}
      alt={liveCover.alt}
      initialAspectRatio={liveCover.dimensions.aspectRatio}
      priority={idx === 0}
      imageClassName="transition-all duration-700"
    />
  );
})()}
                  </div>

                {/* Metadata & Tag */}
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#8C7A6B] mb-3">
                  <span>0{idx + 1} — {storyCategory}</span>
                  <span>{photoCount} Photographs</span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-2xl sm:text-3xl text-[#191817] mb-3 font-normal group-hover:text-[#5E5247] transition-colors">
                  {story.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-sm text-[#5E5247] leading-relaxed mb-6 font-light">
                  {story.description}
                </p>
              </div>

              {/* Story Link */}
              <div className="pt-4 border-t border-[#ECE7DD]/80">
                <Link
                  to={`/work/${story.id}`}
                  className="inline-flex items-center text-xs uppercase tracking-[0.14em] font-medium text-[#191817] hover:text-[#5E5247] transition-colors"
                >
                  <span>Explore Series</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
