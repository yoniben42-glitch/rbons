import React from 'react';
import { Link } from '@/lib/router-compat';
import { ArrowUpRight, Calendar, Mail, MapPin } from 'lucide-react';
import { businessInfo } from '../../data/business';
import { AdaptiveImage } from '../common/AdaptiveImage';
import { useGalleryAssets } from '@/lib/gallery-client';

export const FinalCTASection: React.FC = () => {
  const { assets } = useGalleryAssets('wedding-couples');
  const bgAsset = assets.find((asset) => asset.orientation === 'landscape') ?? assets[0];

  return (
    <section id="final-cta" className="relative py-28 md:py-40 bg-[#121211] text-[#FAF8F5] overflow-hidden">
      {/* Background Ambience Image */}
      {bgAsset && (
        <div className="absolute inset-0 opacity-20 filter grayscale contrast-125">
          <AdaptiveImage
            src={bgAsset.src}
            alt={bgAsset.alt}
            initialAspectRatio={bgAsset.dimensions.aspectRatio}
          />
        </div>
      )}

      {/* Overlay Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#121211] via-[#121211]/80 to-[#121211] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#A69280] block mb-4">
          Reserve Your Commission
        </span>

        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-white font-normal leading-[1.05] tracking-tight mb-8">
          Let’s Create Something <br />
          <span className="italic font-light text-[#FAF8F5]/90">Unforgettable Together.</span>
        </h2>

        <p className="font-sans text-base sm:text-lg text-[#D8D3CA] font-light max-w-2xl mx-auto leading-relaxed mb-12">
          {businessInfo.studioNotice} We invite you to begin the conversation regarding your wedding date,
          private portrait session, or brand campaign.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <Link
            to="/contact"
            id="cta-start-inquiry-btn"
            className="inline-flex items-center justify-center font-sans text-xs uppercase tracking-[0.16em] font-medium py-4 px-8 bg-[#FAF8F5] text-[#121211] hover:bg-white hover:shadow-xl transition-all group"
          >
            <span>Begin Your Inquiry</span>
            <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <Link
            to="/work"
            className="inline-flex items-center justify-center font-sans text-xs uppercase tracking-[0.16em] font-medium py-4 px-8 bg-white/10 hover:bg-white/20 text-[#FAF8F5] border border-white/20 backdrop-blur-sm transition-all"
          >
            <span>Browse All Collections</span>
          </Link>
        </div>

        {/* Quick Studio Coordinates */}
        <div className="pt-10 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-[#FAF8F5]/70">
          <div className="flex items-center justify-center space-x-2">
            <MapPin className="w-4 h-4 text-[#A69280]" />
            <span>{businessInfo.location}</span>
          </div>

          <div className="flex items-center justify-center space-x-2">
            <Mail className="w-4 h-4 text-[#A69280]" />
            <span>{businessInfo.inquiriesEmail}</span>
          </div>

          <div className="flex items-center justify-center space-x-2">
            <Calendar className="w-4 h-4 text-[#A69280]" />
            <span>Season 2026 / 2027 Inquiries Open</span>
          </div>
        </div>
      </div>
    </section>
  );
};
