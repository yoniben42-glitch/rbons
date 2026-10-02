import React, { useMemo, useState } from 'react';
import { Link } from '@/lib/router-compat';
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { PageTransition } from '../components/motion/PageTransition';
import { verifiedServices, frequentlyAskedQuestions, businessInfo } from '../data/business';
import { AdaptiveImage } from '../components/common/AdaptiveImage';
import { useGalleryAssetsByCategories } from '@/lib/gallery-client';
import { SERVICE_GALLERY_CATEGORIES } from '@/lib/service-gallery';

export const ServicesPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const serviceCategories = useMemo(() => Array.from(new Set(Object.values(SERVICE_GALLERY_CATEGORIES).flat())), []);
  const { assets: liveAssets } = useGalleryAssetsByCategories(serviceCategories);

  const addOnServices = [
    {
      title: 'Handcrafted Fine Art Keepsake Album',
      desc: 'Custom-bound fine art keepsake album featuring archival heavyweight matte paper and lay-flat panoramic spreads.',
      price: 'Custom Option',
    },
    {
      title: 'Second Master Photographer',
      desc: 'Additional documentary vantage points capturing guest reactions, alternate ceremony angles, and candid moments.',
      price: 'Available on Request',
    },
    {
      title: 'Engagement / Pre-Wedding Session',
      desc: 'Dedicated portrait sitting exploring locations and styling prior to the wedding celebration.',
      price: 'Available on Request',
    },
    {
      title: 'Additional Coverage Hours',
      desc: 'Extended event coverage coordinated with your day-of timeline and celebration schedule.',
      price: 'Custom Option',
    },
  ];

  return (
    <PageTransition>
      <SEOHead
        title="Services & Investment Collections | RBONSU PHOTOGRAPHY"
        description="Explore luxury wedding photography collections, bespoke portrait sessions, and commercial lookbook services with transparent investment guides and heirloom deliverable options."
        canonicalPath="/services"
      />

      <div className="py-12 sm:py-20 bg-[#FAF8F5]">
        <div className="max-w-[1720px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
          {/* Header */}
          <div className="max-w-4xl mb-16 sm:mb-24">
            <div className="flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] text-[#8C7A6B] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#5E5247]" />
              <span>Tailored Photographic Commissions</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#191817] font-normal tracking-tight leading-[1.04] mb-6">
              Services & Investment Collections
            </h1>
            <p className="font-sans text-base sm:text-lg text-[#5E5247] font-light leading-relaxed max-w-2xl">
              Every commission is approached as a timeless work of art. We offer transparent collections
              paired with bespoke options to match the scope of your celebration or portrait sitting.
            </p>
          </div>

          {/* Main Services Grid */}
          <div className="space-y-24 mb-32">
            {verifiedServices.map((service, sIndex) => {
              const categories = SERVICE_GALLERY_CATEGORIES[service.slug] ?? [];
              const heroAsset = liveAssets.find((asset) => categories.includes(asset.category) && asset.orientation === 'landscape') ?? liveAssets.find((asset) => categories.includes(asset.category));
              return (
                <section
                  key={service.id}
                  id={`service-${service.slug}`}
                  className="bg-[#F4F1EB] border border-[#ECE7DD] p-8 sm:p-12 lg:p-16"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-12">
                    {/* Left Details */}
                    <div className="lg:col-span-6">
                      <span className="text-xs uppercase tracking-[0.2em] text-[#8C7A6B] block mb-2">
                        Collection 0{sIndex + 1} • {service.category}
                      </span>
                      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#191817] font-normal mb-4">
                        {service.title}
                      </h2>
                      <p className="font-serif text-xl text-[#5E5247] italic mb-6">
                        {service.subtitle}
                      </p>
                      <p className="font-sans text-base text-[#5E5247] font-light leading-relaxed mb-8">
                        {service.description}
                      </p>

                      <div className="p-4 bg-[#FAF8F5] border border-[#ECE7DD] mb-8">
                        <span className="block text-[10px] uppercase tracking-widest text-[#8C7A6B] mb-1">
                          Investment Guide
                        </span>
                        <p className="font-serif text-2xl text-[#191817]">
                          {service.investmentGuide}
                        </p>
                        <p className="text-xs text-[#8C7A6B] mt-1">{service.timeline}</p>
                      </div>

                      <div className="flex flex-wrap gap-4">
                        <Link
                          to={`/services/${service.slug}`}
                          className="inline-flex items-center font-sans text-xs uppercase tracking-[0.15em] font-medium py-3.5 px-6 bg-[#191817] text-[#FAF8F5] hover:bg-[#2F2C29] transition-all"
                        >
                          <span>Explore Deep Dive & Packages</span>
                          <ArrowUpRight className="w-3.5 h-3.5 ml-1.5" />
                        </Link>

                        <Link
                          to={`/contact?service=${service.slug}`}
                          className="inline-flex items-center font-sans text-xs uppercase tracking-[0.15em] font-medium py-3.5 px-6 bg-[#FAF8F5] border border-[#ECE7DD] text-[#191817] hover:border-[#191817] transition-all"
                        >
                          Inquire Date
                        </Link>
                      </div>
                    </div>

                    {/* Right Image Showcase */}
                    <div className="lg:col-span-6">
                      {heroAsset && (
                        <div className="overflow-hidden bg-[#ECE7DD] shadow-md mb-6">
                          <AdaptiveImage
                            src={heroAsset.src}
                            alt={heroAsset.alt}
                            initialAspectRatio={heroAsset.dimensions.aspectRatio}
                          />
                        </div>
                      )}

                      {/* Package Tiers Preview */}
                      <div className="space-y-4">
                        <span className="text-xs uppercase tracking-[0.15em] text-[#8C7A6B] block font-medium">
                          Available Collection Tiers
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {service.packages.map((pkg) => (
                            <div
                              key={pkg.id}
                              className={`p-5 bg-[#FAF8F5] border ${
                                pkg.popular ? 'border-[#191817] ring-1 ring-[#191817]' : 'border-[#ECE7DD]'
                              } flex flex-col justify-between`}
                            >
                              <div>
                                {pkg.popular && (
                                  <span className="inline-block text-[9px] uppercase tracking-widest text-[#FAF8F5] bg-[#191817] px-2 py-0.5 mb-2 font-mono">
                                    Signature Tier
                                  </span>
                                )}
                                <h3 className="font-serif text-lg text-[#191817] font-normal mb-1">
                                  {pkg.name}
                                </h3>
                                <p className="font-mono text-sm text-[#191817] font-medium mb-3">
                                  {pkg.priceStartingAt}
                                </p>
                                <p className="text-xs text-[#8C7A6B] mb-3">{pkg.idealFor}</p>
                              </div>
                              <ul className="text-xs text-[#5E5247] space-y-1.5 pt-3 border-t border-[#ECE7DD]">
                                {pkg.includes.slice(0, 3).map((inc, i) => (
                                  <li key={i} className="flex items-start">
                                    <CheckCircle2 className="w-3 h-3 text-[#8C7A6B] mr-1.5 mt-0.5 shrink-0" />
                                    <span className="line-clamp-1">{inc}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>

          {/* Add-On Services & Heirloom Upgrades */}
          <div className="mb-32 bg-[#FAF8F5] border border-[#ECE7DD] p-8 sm:p-12">
            <div className="max-w-2xl mb-10">
              <span className="text-xs uppercase tracking-[0.2em] text-[#8C7A6B] block mb-2">
                A La Carte Enhancements
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#191817] font-normal">
                Heirloom Upgrades & Add-Ons
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {addOnServices.map((addon, idx) => (
                <div key={idx} className="bg-[#F4F1EB] p-6 border border-[#ECE7DD] flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-lg text-[#191817] font-medium block mb-2">
                      {addon.price}
                    </span>
                    <h3 className="font-serif text-lg text-[#191817] font-normal mb-2">
                      {addon.title}
                    </h3>
                    <p className="text-xs text-[#5E5247] leading-relaxed mb-4">{addon.desc}</p>
                  </div>
                  <Link
                    to="/contact"
                    className="text-xs uppercase tracking-[0.14em] text-[#191817] font-medium hover:underline pt-4 border-t border-[#ECE7DD]"
                  >
                    Add to Inquiry →
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div className="max-w-4xl mx-auto mb-24">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-[0.2em] text-[#8C7A6B] block mb-2">
                Questions & Transparency
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#191817] font-normal">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {frequentlyAskedQuestions.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-[#F4F1EB] border border-[#ECE7DD] transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-6 text-left flex items-center justify-between cursor-pointer focus:outline-none"
                    >
                      <span className="font-serif text-lg sm:text-xl text-[#191817] font-normal pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#8C7A6B] transition-transform duration-300 shrink-0 ${
                          isOpen ? 'rotate-180 text-[#191817]' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-[#5E5247] leading-relaxed font-light border-t border-[#ECE7DD]/80">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Booking Box */}
          <div className="bg-[#191817] text-[#FAF8F5] p-10 sm:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#A69280] block mb-2">
                Ready to Secure Your Date?
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal mb-2">
                Let’s Discuss Your Vision
              </h2>
              <p className="text-sm text-[#D8D3CA] max-w-xl font-light">
                {businessInfo.studioNotice} We are delighted to answer any questions and prepare a
                bespoke proposal.
              </p>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center font-sans text-xs uppercase tracking-[0.16em] font-medium py-4 px-8 bg-[#FAF8F5] text-[#191817] hover:bg-white transition-all whitespace-nowrap"
            >
              <span>Schedule Consultation</span>
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
