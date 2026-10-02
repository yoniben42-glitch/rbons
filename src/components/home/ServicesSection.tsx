import React from 'react';
import { Link } from '@/lib/router-compat';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { verifiedServices } from '../../data/business';
import { AdaptiveImage } from '../common/AdaptiveImage';
import { useGalleryAssetsByCategories } from '@/lib/gallery-client';
import { SERVICE_GALLERY_CATEGORIES } from '@/lib/service-gallery';

export const ServicesSection: React.FC = () => {
  const { assets: liveAssets } = useGalleryAssetsByCategories(
    Array.from(new Set(Object.values(SERVICE_GALLERY_CATEGORIES).flat())),
  );

  return (
    <section id="services-section" className="py-24 md:py-36 bg-[#FAF8F5]">
      <div className="max-w-[1720px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#ECE7DD]">
          <div>
            <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#8C7A6B] block mb-2">
              Commissions & Offerings
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#191817] font-normal tracking-tight">
              Bespoke Photography Collections
            </h2>
          </div>

          <Link
            to="/services"
            className="mt-4 md:mt-0 inline-flex items-center text-xs uppercase tracking-[0.15em] font-medium text-[#191817] hover:text-[#5E5247] transition-colors group"
          >
            <span>View All Packages & Investment Guides</span>
            <ArrowUpRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Services Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {verifiedServices.map((service) => {
            const categories = SERVICE_GALLERY_CATEGORIES[service.slug] ?? [];
            const heroAsset =
              liveAssets.find((asset) => categories.includes(asset.category) && asset.orientation === 'landscape') ??
              liveAssets.find((asset) => categories.includes(asset.category));
            return (
              <div
                key={service.id}
                className="group bg-[#F4F1EB] border border-[#ECE7DD] p-8 sm:p-10 flex flex-col justify-between transition-all hover:border-[#D8D3CA] hover:shadow-sm"
              >
                <div>
                  {/* Service Hero Image */}
                  {heroAsset && (
                    <div className="overflow-hidden bg-[#ECE7DD] mb-8">
                      <AdaptiveImage
                        src={heroAsset.src}
                        alt={heroAsset.alt}
                        initialAspectRatio={heroAsset.dimensions.aspectRatio}
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[#8C7A6B] mb-2">
                    <span>{service.category}</span>
                    <span className="font-mono text-xs text-[#191817] font-medium">
                      {service.investmentGuide}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#191817] font-normal mb-3 group-hover:text-[#5E5247] transition-colors">
                    {service.title}
                  </h3>

                  <p className="font-sans text-sm text-[#5E5247] font-light leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Deliverables Highlights */}
                  <div className="space-y-2 mb-8 pt-4 border-t border-[#ECE7DD]">
                    {service.deliverables.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start text-xs text-[#5E5247]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8C7A6B] mr-2.5 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-[#ECE7DD] flex items-center justify-between">
                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center text-xs uppercase tracking-[0.15em] font-medium text-[#191817] hover:text-[#5E5247] transition-colors"
                  >
                    <span>View Pricing & Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1.5" />
                  </Link>

                  <Link
                    to={`/contact?service=${service.slug}`}
                    className="text-xs uppercase tracking-[0.15em] font-medium text-[#8C7A6B] hover:text-[#191817] transition-colors"
                  >
                    Inquire
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
