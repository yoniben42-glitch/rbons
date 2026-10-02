import React, { useState } from 'react';
import { Link, Navigate } from '@/lib/router-compat';
import { useParams } from '@/lib/router-hooks';
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { PageTransition } from '../components/motion/PageTransition';
import { verifiedServices } from '../data/business';
import { Lightbox } from '../components/common/Lightbox';
import { AdaptiveImage } from '../components/common/AdaptiveImage';
import { useGalleryAssetsByCategories } from '@/lib/gallery-client';
import { categoriesForService } from '@/lib/service-gallery';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const service = verifiedServices.find((s) => s.slug === slug);
  const requestedCategories = service ? categoriesForService(service.slug) : [];
  const liveGallery = useGalleryAssetsByCategories(requestedCategories);

  if (!service) {
    return <Navigate to="/services" replace />;
  }
  const liveLandscape = liveGallery.assets.find((asset) => asset.orientation === 'landscape');
  const heroAsset = liveLandscape ?? liveGallery.assets[0];
  const sampleAssets = liveGallery.assets.slice(0, 8);

  const workflowSteps = [
    {
      number: '01',
      title: 'Initial Consultation & Vision Discovery',
      description:
        'We connect via phone or video to review your date, timeline, aesthetic moodboards, and location considerations.',
    },
    {
      number: '02',
      title: 'Styling, Lighting & Itinerary Planning',
      description:
        'You receive our bespoke styling guide and custom lighting timeline optimized for the best golden-hour or studio environments.',
    },
    {
      number: '03',
      title: 'The Shoot Day Experience',
      description:
        'Calm, effortless direction that makes you feel commanding yet completely relaxed in front of the lens.',
    },
    {
      number: '04',
      title: 'Master Color Grading & Gallery Delivery',
      description:
        'Each frame undergoes meticulous color grading, fine skin tone correction, and high-resolution master archiving.',
    },
  ];

  return (
    <PageTransition>
      <SEOHead
        title={`${service.title} | RBONSU PHOTOGRAPHY`}
        description={service.description}
        canonicalPath={`/services/${service.slug}`}
      />

      <article className="py-12 sm:py-20 bg-[#FAF8F5]">
        <div className="max-w-[1720px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
          {/* Breadcrumb Back Link */}
          <div className="mb-10">
            <Link
              to="/services"
              id="back-to-services"
              className="inline-flex items-center font-sans text-xs uppercase tracking-[0.16em] text-[#8C7A6B] hover:text-[#191817] transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-2 transition-transform group-hover:-translate-x-1" />
              <span>Back To All Services & Investment Collections</span>
            </Link>
          </div>

          {/* Hero Header Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-16 pb-12 border-b border-[#ECE7DD]">
            <div className="lg:col-span-8">
              <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#8C7A6B] block mb-3">
                {service.category} • Collection Guide
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#191817] font-normal tracking-tight leading-[1.04] mb-6">
                {service.title}
              </h1>
              <p className="font-serif text-2xl text-[#5E5247] italic mb-6">
                "{service.subtitle}"
              </p>
              <p className="font-sans text-base sm:text-lg text-[#5E5247] font-light leading-relaxed max-w-2xl">
                {service.description}
              </p>
            </div>

            {/* Quick Investment Card */}
            <div className="lg:col-span-4 bg-[#F4F1EB] border border-[#ECE7DD] p-6 sm:p-8 space-y-5 text-xs">
              <div>
                <span className="block uppercase tracking-widest text-[#8C7A6B] text-[10px] mb-1">
                  Investment Baseline
                </span>
                <p className="font-serif text-2xl text-[#191817] font-normal">
                  {service.investmentGuide}
                </p>
              </div>

              <div>
                <span className="block uppercase tracking-widest text-[#8C7A6B] text-[10px] mb-1">
                  Turnaround Timeline
                </span>
                <div className="flex items-center space-x-2 text-[#191817]">
                  <Clock className="w-3.5 h-3.5 text-[#8C7A6B]" />
                  <span>{service.timeline}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#ECE7DD]">
                <Link
                  to={`/contact?service=${service.slug}`}
                  className="w-full text-center inline-block font-sans text-xs uppercase tracking-[0.15em] font-medium py-3.5 px-6 bg-[#191817] text-[#FAF8F5] hover:bg-[#2F2C29] transition-all"
                >
                  Inquire For This Service
                </Link>
              </div>
            </div>
          </div>

          {/* Full-Bleed Showcase Image */}
          {heroAsset && (
            <div className="mb-20 overflow-hidden bg-[#ECE7DD] shadow-md">
              <AdaptiveImage
                src={heroAsset.src}
                alt={heroAsset.alt}
                initialAspectRatio={heroAsset.dimensions.aspectRatio}
                priority={true}
              />
            </div>
          )}

          {/* Detailed Collection Packages */}
          <div className="mb-24">
            <div className="max-w-3xl mb-12">
              <span className="text-xs uppercase tracking-[0.2em] text-[#8C7A6B] block mb-2">
                Available Tiers
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#191817] font-normal">
                Curated Investment Options
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`bg-[#F4F1EB] border ${
                    pkg.popular
                      ? 'border-[#191817] ring-1 ring-[#191817]'
                      : 'border-[#ECE7DD]'
                  } p-8 flex flex-col justify-between`}
                >
                  <div>
                    {pkg.popular && (
                      <span className="inline-block text-[10px] uppercase tracking-widest text-[#FAF8F5] bg-[#191817] px-2.5 py-1 mb-3 font-mono">
                        Most Requested
                      </span>
                    )}

                    <h3 className="font-serif text-2xl text-[#191817] font-normal mb-2">
                      {pkg.name}
                    </h3>
                    <p className="font-mono text-xl text-[#191817] font-medium mb-3">
                      {pkg.priceStartingAt}
                    </p>
                    <p className="text-xs text-[#8C7A6B] mb-6 leading-relaxed">{pkg.idealFor}</p>

                    <div className="space-y-3 pt-6 border-t border-[#ECE7DD]">
                      <span className="text-[10px] uppercase tracking-wider text-[#8C7A6B] block">
                        Included In Collection
                      </span>
                      {pkg.includes.map((item, idx) => (
                        <div key={idx} className="flex items-start text-xs text-[#5E5247]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#8C7A6B] mr-2 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 mt-8 border-t border-[#ECE7DD]">
                    <Link
                      to={`/contact?service=${service.slug}&package=${pkg.id}`}
                      className="w-full text-center inline-block font-sans text-xs uppercase tracking-[0.14em] font-medium py-3 px-4 bg-[#191817] text-[#FAF8F5] hover:bg-[#2F2C29] transition-all"
                    >
                      Select This Collection
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Photographic Portfolio for this Service */}
          {sampleAssets.length > 0 && (
            <div className="mb-24">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#ECE7DD]">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-[#8C7A6B] block mb-1">
                    Visual Proof
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#191817] font-normal">
                    Sample Works in this Collection
                  </h2>
                </div>
                <span className="text-xs uppercase tracking-widest text-[#8C7A6B] hidden sm:inline-block">
                  Click to expand in high resolution
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sampleAssets.map((asset, idx) => (
                  <div
                    key={asset.id}
                    className="overflow-hidden bg-[#ECE7DD] shadow-sm cursor-pointer group"
                    onClick={() => setLightboxIndex(idx)}
                  >
                    <AdaptiveImage
                      src={asset.src}
                      alt={asset.alt}
                      initialAspectRatio={asset.dimensions.aspectRatio}
                      backgroundColor={asset.dominantColor}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Workflow Journey */}
          <div className="mb-24 bg-[#F4F1EB] border border-[#ECE7DD] p-8 sm:p-12 lg:p-16">
            <div className="max-w-2xl mb-12">
              <span className="text-xs uppercase tracking-[0.2em] text-[#8C7A6B] block mb-2">
                Process & Timeline
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#191817] font-normal">
                How We Work Together
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {workflowSteps.map((step) => (
                <div key={step.number} className="space-y-3">
                  <span className="font-mono text-2xl text-[#8C7A6B] font-light">
                    {step.number}
                  </span>
                  <h3 className="font-serif text-lg text-[#191817] font-normal">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#5E5247] leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Direct CTA */}
          <div className="p-10 sm:p-16 bg-[#191817] text-[#FAF8F5] flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal mb-2">
                Ready to Commission {service.title}?
              </h2>
              <p className="text-sm text-[#D8D3CA] font-light max-w-xl">
                Submit an inquiry with your preferred date and location to receive our complete client
                lookbook and commission availability.
              </p>
            </div>

            <Link
              to={`/contact?service=${service.slug}`}
              className="inline-flex items-center font-sans text-xs uppercase tracking-[0.16em] font-medium py-4 px-8 bg-[#FAF8F5] text-[#191817] hover:bg-white transition-all whitespace-nowrap"
            >
              <span>Begin Commission Inquiry</span>
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </article>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <Lightbox
          images={sampleAssets}
          currentIndex={lightboxIndex}
          isOpen={lightboxIndex !== null}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      )}
    </PageTransition>
  );
};
