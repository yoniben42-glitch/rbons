import React, { useState } from 'react';
import { Link, Navigate } from '@/lib/router-compat';
import { useParams } from '@/lib/router-hooks';
import { ArrowLeft, ArrowRight, Maximize2, MapPin, Calendar } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { PageTransition } from '../components/motion/PageTransition';
import { CURATED_STORIES } from '../data/imageManifest';
import { verifiedProjects } from '../data/business';
import { PhotographyAsset, ImageCategory } from '../types/image';
import { useGalleryAssets } from '@/lib/gallery-client';
import { GALLERY_CATEGORIES, normalizeGalleryCategory } from '../types/gallery';
import { Lightbox } from '../components/common/Lightbox';
import { AdaptiveImage } from '../components/common/AdaptiveImage';

export const WorkDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const categorySlugs = GALLERY_CATEGORIES.filter(({ id }) => id !== "other").map(({ id }) => id) as ImageCategory[];
  const dynamicCategory = categorySlugs.includes(slug as ImageCategory) ? (slug as ImageCategory) : 'all';
  const dynamicGallery = useGalleryAssets(dynamicCategory);

  // Direct category URLs (e.g. /work/weddings) are backed by the live Supabase gallery.
  if (dynamicCategory !== 'all') {
    const title = GALLERY_CATEGORIES.find(({ id }) => id === dynamicCategory)?.label ?? dynamicCategory;
    return <DynamicCategoryPage slug={dynamicCategory} title={title} assets={dynamicGallery.assets} loading={dynamicGallery.loading} />;
  }

  // Match against CURATED_STORIES or verifiedProjects
  const curatedStory = CURATED_STORIES.find(
    (s) => s.id === slug || s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug
  );

  const businessProject = verifiedProjects.find((p) => p.slug === slug || p.id === slug);

  // Normalize data representation. Curated/business pages use the live Supabase
  // gallery for imagery; static manifest data is kept only for editorial copy.
  let title = '';
  let category = '';
  let description = '';
  let location = 'King Street, Alexandria. VA & Worldwide';
  let images: PhotographyAsset[] = [];
  let coverImage: PhotographyAsset | undefined;

  if (curatedStory) {
    title = curatedStory.title;
    category = curatedStory.category;
    description = curatedStory.description;
    const liveCategory = normalizeGalleryCategory(String(curatedStory.category));
    images = dynamicGallery.assets.filter((asset) => asset.category === liveCategory);
    coverImage = images.find((asset) => asset.isFeatured) ?? images[0];
  } else if (businessProject) {
    title = businessProject.title;
    category = businessProject.category;
    description = businessProject.description;
    location = businessProject.location;
    const liveCategory = normalizeGalleryCategory(String(businessProject.category));
    images = dynamicGallery.assets.filter((asset) => asset.category === liveCategory);
    coverImage = images.find((asset) => asset.isFeatured) ?? images[0];
  } else {
    const fallback = CURATED_STORIES[0];
    if (!fallback) return <Navigate to="/work" replace />;
    title = fallback.title;
    category = fallback.category;
    description = fallback.description;
    const liveCategory = normalizeGalleryCategory(String(fallback.category));
    images = dynamicGallery.assets.filter((asset) => asset.category === liveCategory);
    coverImage = images.find((asset) => asset.isFeatured) ?? images[0];
  }

  // Find next/prev stories
  const storyList = CURATED_STORIES;
  const currentIdx = storyList.findIndex((s) => s.title === title || s.id === slug);
  const prevStory = currentIdx > 0 ? storyList[currentIdx - 1] : storyList[storyList.length - 1];
  const nextStory = currentIdx !== -1 && currentIdx < storyList.length - 1 ? storyList[currentIdx + 1] : storyList[0];

  return (
    <PageTransition>
      <SEOHead
        title={`${title} | RBONSU PHOTOGRAPHY`}
        description={description}
        canonicalPath={`/work/${slug}`}
      />

      <article className="py-12 sm:py-20 bg-[#FAF8F5]">
        <div className="max-w-[1720px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
          {/* Breadcrumb Navigation */}
          <div className="mb-10">
            <Link
              to="/work"
              id="back-to-work"
              className="inline-flex items-center font-sans text-xs uppercase tracking-[0.16em] text-[#8C7A6B] hover:text-[#191817] transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-2 transition-transform group-hover:-translate-x-1" />
              <span>Back To All Works & Archive</span>
            </Link>
          </div>

          {/* Project Title & Metadata Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-16 pb-12 border-b border-[#ECE7DD]">
            <div className="lg:col-span-8">
              <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#8C7A6B] block mb-3">
                {category} • Curated Visual Narrative
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#191817] font-normal tracking-tight leading-[1.04] mb-6">
                {title}
              </h1>
              <p className="font-sans text-base sm:text-lg text-[#5E5247] font-light leading-relaxed max-w-2xl">
                {description}
              </p>
            </div>

            <div className="lg:col-span-4 bg-[#F4F1EB] border border-[#ECE7DD] p-6 sm:p-8 space-y-4 text-xs">
              <div>
                <span className="block uppercase tracking-widest text-[#8C7A6B] text-[10px] mb-1">
                  Commission Format
                </span>
                <p className="font-medium text-[#191817]">{category}</p>
              </div>

              <div>
                <span className="block uppercase tracking-widest text-[#8C7A6B] text-[10px] mb-1">
                  Location & Setting
                </span>
                <div className="flex items-center space-x-1.5 text-[#191817]">
                  <MapPin className="w-3.5 h-3.5 text-[#8C7A6B]" />
                  <span>{location}</span>
                </div>
              </div>

              <div>
                <span className="block uppercase tracking-widest text-[#8C7A6B] text-[10px] mb-1">
                  Collection Gallery
                </span>
                <div className="flex items-center space-x-1.5 text-[#191817]">
                  <Calendar className="w-3.5 h-3.5 text-[#8C7A6B]" />
                  <span>{images.length} Curated High-Resolution Works</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#ECE7DD]">
                <Link
                  to="/contact"
                  className="w-full text-center inline-block font-sans text-xs uppercase tracking-[0.14em] font-medium py-3 px-4 bg-[#191817] text-[#FAF8F5] hover:bg-[#2F2C29] transition-all"
                >
                  Inquire Similar Commission
                </Link>
              </div>
            </div>
          </div>

          {/* Full-Bleed Cover Hero Image */}
          {coverImage && (
            <div
              className="mb-16 sm:mb-24 overflow-hidden bg-[#ECE7DD] shadow-md cursor-pointer group relative"
              onClick={() => setLightboxIndex(0)}
            >
              <AdaptiveImage
                src={coverImage.src}
                alt={coverImage.alt}
                initialAspectRatio={coverImage.dimensions.aspectRatio}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-100 pointer-fine:opacity-0 pointer-fine:group-hover:opacity-100 transition-opacity p-6 flex items-end justify-between text-white">
                <span className="font-serif text-lg">{coverImage.alt}</span>
                <span className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
                  <Maximize2 className="w-4 h-4" />
                </span>
              </div>
            </div>
          )}

          {/* Story Visual Gallery Grid */}
          <div className="mb-24">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#ECE7DD]">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#191817] font-normal">
                Curated Series Portfolio
              </h2>
              <span className="text-xs uppercase tracking-widest text-[#8C7A6B]">
                Click any photograph to view high-resolution details
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {images.map((asset, idx) => (
                <div
                  key={asset.id}
                  className="group relative overflow-hidden bg-[#ECE7DD] shadow-sm cursor-pointer"
                  onClick={() => setLightboxIndex(idx)}
                >
                  <AdaptiveImage
                    src={asset.src}
                    alt={asset.alt}
                    initialAspectRatio={asset.dimensions.aspectRatio}
                    backgroundColor={asset.dominantColor}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 pointer-fine:opacity-0 pointer-fine:group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-between text-[#FAF8F5]">
                    <div className="flex justify-end">
                      <span className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    <div>
                      <p className="font-serif text-base text-white font-normal line-clamp-2">
                        {asset.alt}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next / Previous Story Navigation Bar */}
          <div className="pt-12 border-t border-[#ECE7DD] flex flex-col sm:flex-row items-center justify-between gap-6">
            {prevStory && (
              <Link
                to={`/work/${prevStory.id}`}
                className="flex items-center space-x-3 text-xs uppercase tracking-[0.14em] font-medium text-[#5E5247] hover:text-[#191817] group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <div>
                  <span className="block text-[10px] text-[#8C7A6B]">Previous Series</span>
                  <span className="font-serif text-sm capitalize">{prevStory.title}</span>
                </div>
              </Link>
            )}

            <Link
              to="/work"
              className="font-sans text-xs uppercase tracking-[0.16em] font-medium py-3 px-6 bg-[#FAF8F5] border border-[#ECE7DD] hover:border-[#191817] text-[#191817] transition-all"
            >
              View Complete Archive
            </Link>

            {nextStory && (
              <Link
                to={`/work/${nextStory.id}`}
                className="flex items-center space-x-3 text-xs uppercase tracking-[0.14em] font-medium text-[#5E5247] hover:text-[#191817] group text-right"
              >
                <div>
                  <span className="block text-[10px] text-[#8C7A6B]">Next Series</span>
                  <span className="font-serif text-sm capitalize">{nextStory.title}</span>
                </div>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </div>
      </article>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          isOpen={lightboxIndex !== null}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      )}
    </PageTransition>
  );
};

function DynamicCategoryPage({ slug, title, assets, loading }: { slug: ImageCategory; title: string; assets: PhotographyAsset[]; loading: boolean }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  return (
    <PageTransition>
      <SEOHead title={`${title} | RBONSU PHOTOGRAPHY`} description={`Browse the ${title} photography gallery by RBONSU Photography.`} canonicalPath={`/work/${slug}`} />
      <article className="py-12 sm:py-20 bg-[#FAF8F5] min-h-screen">
        <div className="max-w-[1720px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
          <Link to="/work" className="inline-flex items-center text-xs uppercase tracking-[0.16em] text-[#8C7A6B] hover:text-[#191817]">← Back to archive</Link>
          <div className="max-w-4xl mt-10 mb-12 sm:mb-16">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C7A6B]">Live Gallery</span>
            <h1 className="font-serif text-5xl sm:text-7xl mt-3 text-[#191817]">{title}</h1>
            <p className="mt-5 text-base sm:text-lg text-[#5E5247] leading-relaxed">The latest published work in this collection, updated directly from the studio gallery manager.</p>
          </div>
          {loading && <p className="mb-6 text-xs uppercase tracking-[0.14em] text-[#8C7A6B]">Refreshing gallery…</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
            {assets.map((asset, index) => <button key={asset.id} type="button" onClick={() => setLightboxIndex(index)} className="group text-left overflow-hidden bg-[#ECE7DD] focus-visible:outline-none">
              <AdaptiveImage
                src={asset.src}
                alt={asset.alt}
                initialAspectRatio={asset.dimensions.aspectRatio}
                backgroundColor={asset.dominantColor}
              />
              <div className="bg-white border-x border-b border-[#ECE7DD] p-4"><p className="font-serif text-xl text-[#191817]">{asset.title}</p><p className="mt-1 text-[10px] uppercase tracking-wider text-[#8C7A6B]">{title}</p></div>
            </button>)}
          </div>
          {!assets.length && !loading && <div className="py-20 text-center border-y border-[#ECE7DD] text-[#8C7A6B]">No published images in this gallery yet.</div>}
        </div>
      </article>
      {lightboxIndex !== null && <Lightbox images={assets} currentIndex={lightboxIndex} isOpen onClose={() => setLightboxIndex(null)} onNavigate={setLightboxIndex} />}
    </PageTransition>
  );
}

