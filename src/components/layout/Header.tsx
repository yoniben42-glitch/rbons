import React, { useState, useEffect } from "react";
import { Link } from "@/lib/router-compat";
import { useLocation } from "@/lib/router-hooks";
import { Menu, X, Instagram } from "lucide-react";
import { businessInfo } from "../../data/business";

const PinterestIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.357-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.546.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
  </svg>
);

interface HeaderProps {
  overlayHero?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ overlayHero = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: "Work", path: "/work" },
    { label: "Services", path: "/services" },
    { label: "About", path: "/about" },
    { label: "Experience", path: "/experience" },
    { label: "Contact", path: "/contact" },
    { label: "Book", path: "/booking" },
  ];

  const light = overlayHero && !isScrolled && !isOpen;

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
               isOpen
          ? "bg-ivory-50 border-b border-ivory-200/80 py-4"
          : isScrolled
            ? "bg-ivory-50/92 backdrop-blur-md border-b border-ivory-200/80 py-4"
            : "bg-transparent py-6 md:py-8"
      }`}
    >
      <div className="max-w-[1720px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 flex items-center justify-between">
        <Link
          to="/"
          id="header-brand-logo"
          className="group flex flex-col focus-visible:outline-none"
          aria-label={`${businessInfo.brandName} Home`}
        >
          <span
            className={`font-serif text-xl sm:text-2xl tracking-[0.08em] font-normal transition-colors ${
              light ? "text-ivory-50 group-hover:text-bronze-400" : "text-charcoal-900 group-hover:text-bronze-700"
            }`}
          >
            RBONSU
          </span>
          <span
            className={`font-sans text-[9px] uppercase tracking-[0.2em] -mt-1 hidden sm:block ${
              light ? "text-ivory-50/70" : "text-bronze-600"
            }`}
          >
            Photography
          </span>
        </Link>

        <nav
          id="desktop-navigation"
          aria-label="Main Navigation"
          className="hidden md:flex items-center space-x-7 lg:space-x-10"
        >
          {navLinks.map((link) => {
            const isActive =
              link.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(link.path);

            return (
              <Link
                key={link.path}
                to={link.path}
                id={`nav-link-${link.label.toLowerCase()}`}
                className={`font-sans text-xs uppercase tracking-[0.14em] font-medium transition-colors py-1 relative ${
                  isActive
                    ? light
                      ? "text-ivory-50"
                      : "text-charcoal-900"
                    : light
                      ? "text-ivory-50/65 hover:text-ivory-50"
                      : "text-bronze-600 hover:text-charcoal-900"
                }`}
              >
                {link.label}
                {isActive && (
                  <span
                    className={`absolute -bottom-1 left-0 right-0 h-px ${light ? "bg-ivory-50" : "bg-charcoal-900"}`}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center space-x-5 lg:space-x-6">
          <div
            className={`flex items-center space-x-3 pr-5 border-r ${
              light ? "text-ivory-50/70 border-ivory-50/20" : "text-bronze-600 border-ivory-200"
            }`}
          >
            <a
              href={businessInfo.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              id="header-social-instagram"
              aria-label="Visit RBONSU Photography on Instagram"
              className={`p-1.5 transition-colors ${light ? "hover:text-ivory-50" : "hover:text-charcoal-900"}`}
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={businessInfo.pinterest.url}
              target="_blank"
              rel="noopener noreferrer"
              id="header-social-pinterest"
              aria-label="Visit RBONSU Photography on Pinterest"
              className={`p-1.5 transition-colors ${light ? "hover:text-ivory-50" : "hover:text-charcoal-900"}`}
            >
              <PinterestIcon className="w-3.5 h-3.5" />
            </a>
          </div>

          <Link
            to="/booking"
            id="header-inquire-cta"
            className={`font-sans text-xs uppercase tracking-[0.12em] font-medium py-2.5 px-5 min-h-11 inline-flex items-center transition-all ${
              light
                ? "bg-ivory-50 text-charcoal-950 hover:bg-white"
                : "bg-charcoal-900 text-ivory-50 hover:bg-charcoal-700"
            }`}
          >
            Inquire
          </Link>
        </div>

        <button
          type="button"
          id="mobile-menu-toggle"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden p-2 min-w-11 min-h-11 focus-visible:outline-none ${
            light ? "text-ivory-50" : "text-charcoal-900"
          }`}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <div
          id="mobile-navigation"
          className="fixed top-[73px] right-0 bottom-0 left-0 bg-ivory-50 z-50 flex flex-col px-6 py-10 md:hidden border-t border-ivory-200 overflow-y-auto"
        >
          <nav className="flex flex-col space-y-5" aria-label="Mobile Navigation">
            {navLinks.map((link) => {
              const isActive =
                link.path === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(link.path);

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  id={`mobile-nav-link-${link.label.toLowerCase()}`}
                  className={`font-serif text-3xl tracking-tight transition-colors py-1 ${
                    isActive ? "text-charcoal-900 italic font-medium" : "text-bronze-600 hover:text-charcoal-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-8 border-t border-ivory-200 flex flex-col space-y-6">
            <div className="flex flex-col space-y-3">
              <span className="font-sans text-xs uppercase tracking-[0.15em] text-bronze-600">
                Follow The Studio
              </span>
              <div className="flex items-center space-x-4">
                <a
                  href={businessInfo.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="mobile-social-instagram"
                  aria-label="Visit RBONSU Photography on Instagram"
                  className="flex items-center space-x-2 text-xs uppercase tracking-[0.12em] text-charcoal-900 py-2 px-3 bg-ivory-100 border border-ivory-200 hover:border-charcoal-900 transition-colors"
                >
                  <Instagram className="w-4 h-4 text-bronze-600" />
                  <span>Instagram</span>
                </a>
                <a
                  href={businessInfo.pinterest.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="mobile-social-pinterest"
                  aria-label="Visit RBONSU Photography on Pinterest"
                  className="flex items-center space-x-2 text-xs uppercase tracking-[0.12em] text-charcoal-900 py-2 px-3 bg-ivory-100 border border-ivory-200 hover:border-charcoal-900 transition-colors"
                >
                  <PinterestIcon className="w-3.5 h-3.5 text-bronze-600" />
                  <span>Pinterest</span>
                </a>
              </div>
            </div>

            <Link
              to="/booking"
              id="mobile-inquire-cta"
              className="w-full text-center font-sans text-xs uppercase tracking-[0.14em] font-medium py-3.5 px-6 bg-charcoal-900 text-ivory-50 hover:bg-charcoal-700 transition-all"
            >
              Start Conversation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
