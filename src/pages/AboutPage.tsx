import React from 'react';
import { Link } from '@/lib/router-compat';
import { ArrowUpRight, Camera, ShieldCheck, Heart, Sparkles, MapPin, Mail, Instagram } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { PageTransition } from '../components/motion/PageTransition';
import { businessInfo } from '../data/business';
import { AdaptiveImage } from '../components/common/AdaptiveImage';
import { useGalleryAssetsByCategories } from '@/lib/gallery-client';

export const AboutPage: React.FC = () => {
  const { assets: liveAssets } = useGalleryAssetsByCategories(['portraits-fashion', 'culture-events']);
  const portraitAsset = liveAssets[0];
  const secondaryAsset = liveAssets[1];

  const principles = [
    {
      title: 'Chiaroscuro & Sculpted Light',
      description:
        'We harness deliberate directional light to sculpt dimensional contours, bringing depth, drama, and painterly texture to every portrait.',
    },
    {
      title: 'Authentic Human Connection',
      description:
        'Great photography requires trust. We create a serene, supportive atmosphere where clients feel completely at ease and undeniably radiant.',
    },
    {
      title: 'True-to-Life Color Grading',
      description:
        'Our color grading honors rich, natural skin tones with luminous warmth and velvety blacks that withstand the test of passing trends.',
    },
    {
      title: 'Museum-Grade Archival Standards',
      description:
        'Photographs belong in hand. We curate bespoke Italian leather and linen albums printed on heavy cotton rag paper engineered to endure generations.',
    },
  ];

  return (
    <PageTransition>
      <SEOHead
        title="About The Studio & Philosophy | RBONSU PHOTOGRAPHY"
        description="Learn about RBONSU Photography — our artistic philosophy, commitment to sculpted directional lighting, technical gear standards, and timeless editorial approach."
        canonicalPath="/about"
      />

      <div className="py-12 sm:py-20 bg-[#FAF8F5]">
        <div className="max-w-[1720px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
          {/* Header */}
          <div className="max-w-4xl mb-16 sm:mb-24">
            <div className="flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] text-[#8C7A6B] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#5E5247]" />
              <span>Artist & Studio Statement</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#191817] font-normal tracking-tight leading-[1.04] mb-6">
              About RBONSU Photography
            </h1>
            <p className="font-serif text-2xl sm:text-3xl text-[#5E5247] italic leading-relaxed max-w-3xl">
              "To photograph is to hold one's breath when all faculties converge to captivate fleeting reality."
            </p>
          </div>

          {/* Main Biography & Dual Image Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24 pb-16 border-b border-[#ECE7DD]">
            {/* Primary Artist Portrait */}
            <div className="lg:col-span-5 space-y-6">
              {portraitAsset && (
                <div className="overflow-hidden bg-[#ECE7DD] shadow-md">
                  <AdaptiveImage
                    src={portraitAsset.src}
                    alt={portraitAsset.alt}
                    initialAspectRatio={portraitAsset.dimensions.aspectRatio}
                    priority={true}
                  />
                </div>
              )}

              {/* Studio Coordinates Box */}
              <div className="bg-[#F4F1EB] border border-[#ECE7DD] p-6 space-y-3 text-xs">
                <div className="flex items-center space-x-2 text-[#191817]">
                  <MapPin className="w-4 h-4 text-[#8C7A6B]" />
                  <span>{businessInfo.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-[#191817]">
                  <Mail className="w-4 h-4 text-[#8C7A6B]" />
                  <span>{businessInfo.inquiriesEmail}</span>
                </div>
                <div className="flex items-center space-x-2 text-[#191817]">
                  <Instagram className="w-4 h-4 text-[#8C7A6B]" />
                  <a
                    href={businessInfo.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                    aria-label="Visit RBONSU Photography on Instagram"
                  >
                    {businessInfo.instagram.handle}
                  </a>
                </div>
                <div className="flex items-center space-x-2 text-[#191817]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-3.5 h-3.5 text-[#8C7A6B]"
                  >
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.357-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.546.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                  </svg>
                  <a
                    href={businessInfo.pinterest.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                    aria-label="Visit RBONSU Photography on Pinterest"
                  >
                    {businessInfo.pinterest.handle}
                  </a>
                </div>
              </div>
            </div>

            {/* Narrative & Philosophy */}
            <div className="lg:col-span-7 space-y-8 lg:pl-4">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#8C7A6B] block mb-2">
                  The Vision
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#191817] font-normal mb-6">
                  Where Editorial Poise Meets Raw Emotion
                </h2>
                <div className="space-y-5 text-[#5E5247] text-base sm:text-lg font-light leading-relaxed">
                  <p>
                    RBONSU PHOTOGRAPHY was founded on a singular premise: that the most extraordinary
                    moments of human life deserve the same artistic rigor, cinematic depth, and
                    impeccable craftsmanship found in high-fashion editorial publications.
                  </p>
                  <p>
                    Specializing in luxury wedding celebrations, fine art studio portraiture, and
                    commercial campaigns, the studio’s signature aesthetic is characterized by rich
                    contrast, deliberate light control, and an intuitive knack for capturing candid,
                    unguarded intimacy.
                  </p>
                  <p>
                    Based at King Street, Alexandria. VA, RBONSU travels nationwide and
                    internationally to document weddings and private commissions for clients who value
                    quiet luxury, authentic presence, and enduring legacy.
                  </p>
                </div>
              </div>

              {/* Secondary Detail Image Spread */}
              {secondaryAsset && (
                <div className="overflow-hidden bg-[#ECE7DD] shadow-sm my-8">
                  <AdaptiveImage
                    src={secondaryAsset.src}
                    alt={secondaryAsset.alt}
                    initialAspectRatio={secondaryAsset.dimensions.aspectRatio}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Pillars of Craft */}
          <div className="mb-24">
            <div className="max-w-2xl mb-12">
              <span className="text-xs uppercase tracking-[0.2em] text-[#8C7A6B] block mb-2">
                Our Standards
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#191817] font-normal">
                Core Pillars of Our Craft
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {principles.map((p, idx) => (
                <div
                  key={idx}
                  className="bg-[#F4F1EB] border border-[#ECE7DD] p-8 flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-xs text-[#8C7A6B] block mb-3">0{idx + 1}</span>
                    <h3 className="font-serif text-xl text-[#191817] font-normal mb-3">{p.title}</h3>
                    <p className="text-xs text-[#5E5247] font-light leading-relaxed">{p.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical & Digital Archiving Standards */}
          <div className="bg-[#191817] text-[#FAF8F5] p-10 sm:p-16 mb-24">
            <div className="max-w-3xl mb-10">
              <span className="text-xs uppercase tracking-[0.2em] text-[#A69280] block mb-2">
                Studio Standards
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal mb-4">
                Equipment & Archival Care
              </h2>
              <p className="text-sm text-[#D8D3CA] font-light leading-relaxed">
                Your wedding and milestone memories are priceless. We operate with professional-grade camera systems,
                thoughtful backup workflows, and dedicated post-production care.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-white/15 text-xs text-[#D8D3CA]">
              <div className="space-y-2">
                <Camera className="w-5 h-5 text-[#A69280]" />
                <h3 className="text-sm font-serif text-white font-normal">Professional Gear & Optics</h3>
                <p className="font-light leading-relaxed">
                  High-resolution camera bodies and sharp prime lenses calibrated for rich dynamic range,
                  natural skin tones, and low-light fidelity.
                </p>
              </div>

              <div className="space-y-2">
                <ShieldCheck className="w-5 h-5 text-[#A69280]" />
                <h3 className="text-sm font-serif text-white font-normal">Dedicated Digital Backups</h3>
                <p className="font-light leading-relaxed">
                  Careful multi-stage archival procedures from the moment of capture through final high-resolution
                  gallery delivery.
                </p>
              </div>

              <div className="space-y-2">
                <Heart className="w-5 h-5 text-[#A69280]" />
                <h3 className="text-sm font-serif text-white font-normal">Artisanal Finishing</h3>
                <p className="font-light leading-relaxed">
                  Individual frame-by-frame color grading, skin tone refinement, and high-resolution master
                  exporting.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Link to Experience & Booking */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 bg-[#F4F1EB] border border-[#ECE7DD]">
            <div>
              <h3 className="font-serif text-2xl text-[#191817] font-normal mb-1">
                Explore the Client Experience
              </h3>
              <p className="text-xs text-[#8C7A6B]">
                Discover what it feels like to work with RBONSU from initial inquiry to album delivery.
              </p>
            </div>

            <Link
              to="/experience"
              className="inline-flex items-center font-sans text-xs uppercase tracking-[0.16em] font-medium py-3.5 px-6 bg-[#191817] text-[#FAF8F5] hover:bg-[#2F2C29] transition-all whitespace-nowrap"
            >
              <span>The Client Experience</span>
              <ArrowUpRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
