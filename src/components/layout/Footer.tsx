import React from 'react';
import { Link } from '@/lib/router-compat';
import { ArrowUpRight, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { businessInfo } from '../../data/business';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="site-footer"
      className="bg-[#191817] text-[#FAF8F5] pt-20 pb-12 border-t border-[#2F2C29]"
    >
      <div className="max-w-[1720px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-[#2F2C29]">
          {/* Brand & Studio Summary */}
          <div className="md:col-span-6 lg:col-span-4 flex flex-col space-y-4">
            <Link to="/" className="group inline-block">
              <span className="font-serif text-3xl sm:text-4xl tracking-[0.06em] font-normal text-white group-hover:text-[#A69280] transition-colors">
                RBONSU
              </span>
              <span className="block font-sans text-[10px] uppercase tracking-[0.25em] text-[#A69280] mt-1">
                Photography Studio
              </span>
            </Link>

            <p className="font-sans text-sm text-[#BCB6AA] pt-2 leading-relaxed font-light">
              {businessInfo.tagline}. Honoring authentic love stories, regal portraiture, and
              high-fashion editorial narratives across King Street, Alexandria. VA and worldwide.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href={businessInfo.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                id="footer-social-instagram"
                aria-label="Visit RBONSU Photography on Instagram"
                className="inline-flex items-center text-xs uppercase tracking-[0.14em] text-[#A69280] hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4 mr-2 text-[#A69280]" />
                <span>Instagram</span>
              </a>
              <a
                href={businessInfo.pinterest.url}
                target="_blank"
                rel="noopener noreferrer"
                id="footer-social-pinterest"
                aria-label="Visit RBONSU Photography on Pinterest"
                className="inline-flex items-center text-xs uppercase tracking-[0.14em] text-[#A69280] hover:text-white transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-3.5 h-3.5 mr-2 text-[#A69280]"
                >
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.357-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.546.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
                <span>Pinterest</span>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 lg:col-span-3 flex flex-col space-y-3">
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#A69280] mb-2 font-medium">
              Navigation
            </span>
            <Link
              to="/work"
              id="footer-link-work"
              className="font-sans text-sm text-[#FAF8F5] hover:text-[#A69280] transition-colors"
            >
              The Archive & Portfolio
            </Link>
            <Link
              to="/services"
              id="footer-link-services"
              className="font-sans text-sm text-[#FAF8F5] hover:text-[#A69280] transition-colors"
            >
              Services & Investment
            </Link>
            <Link
              to="/about"
              id="footer-link-about"
              className="font-sans text-sm text-[#FAF8F5] hover:text-[#A69280] transition-colors"
            >
              Studio Philosophy
            </Link>
            <Link
              to="/experience"
              id="footer-link-experience"
              className="font-sans text-sm text-[#FAF8F5] hover:text-[#A69280] transition-colors"
            >
              The Client Journey
            </Link>
            <Link
              to="/contact"
              id="footer-link-contact"
              className="font-sans text-sm text-[#FAF8F5] hover:text-[#A69280] transition-colors"
            >
              Inquire Availability
            </Link>
          </div>

          {/* Direct Studio Coordinates */}
          <div className="md:col-span-3 lg:col-span-5 flex flex-col space-y-4">
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#A69280] mb-2 font-medium">
              Studio & Inquiries
            </span>

            <div className="space-y-2 text-sm text-[#BCB6AA] font-light">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#A69280] shrink-0" />
                <a
                  href={`mailto:${businessInfo.inquiriesEmail}`}
                  className="text-white hover:underline"
                  aria-label={`Email studio at ${businessInfo.inquiriesEmail}`}
                >
                  {businessInfo.inquiriesEmail}
                </a>
              </div>

              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#A69280] shrink-0" />
                <a
                  href={businessInfo.phoneTel || 'tel:+15712656674'}
                  className="text-white hover:underline"
                  aria-label={`Call studio at ${businessInfo.phone}`}
                >
                  {businessInfo.phone}
                </a>
              </div>

              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#A69280] shrink-0 mt-0.5" />
                <span>{businessInfo.location}</span>
              </div>
            </div>

            <div className="pt-3">
              <Link
                to="/contact"
                id="footer-cta-contact"
                className="inline-flex items-center font-sans text-xs uppercase tracking-[0.16em] font-medium py-3 px-6 bg-[#FAF8F5] text-[#191817] hover:bg-white transition-all group"
              >
                <span>Reserve Commission</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#9E9789] space-y-4 sm:space-y-0">
          <p>
            © {currentYear} {businessInfo.brandName}. All rights reserved.
          </p>

          <div className="flex items-center space-x-6">
            <span>King Street, Alexandria. VA • Worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
