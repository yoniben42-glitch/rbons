import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Link } from "@/lib/router-compat";
import { ChevronLeft, ChevronRight, Play, Pause, ArrowUpRight } from "lucide-react";
import { useGalleryAssets } from "@/lib/gallery-client";
import { PhotographyAsset } from "../../types/image";
import { getHeroImageUrl } from "../../lib/image-url";

const EASE_CINEMATIC: [number, number, number, number] = [0.25, 1, 0.5, 1];
const AUTOPLAY_MS = 4200;

export const HeroShowcase: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { assets: dynamicAssets } = useGalleryAssets("all");

  const slides = useMemo(() => {
    const dynamicFeatured = dynamicAssets.filter((asset) => asset.isFeatured && asset.orientation === "landscape");
    const liveLandscape = dynamicAssets.filter((asset) => asset.orientation === "landscape");
    return (dynamicFeatured.length ? dynamicFeatured : liveLandscape).slice(0, 5);
  }, [dynamicAssets]);
  const shouldAutoplay = isPlaying && !isHovered && !prefersReducedMotion && slides.length > 1;

  useEffect(() => {
    if (!shouldAutoplay) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [shouldAutoplay, slides.length]);

  const goTo = useCallback(
    (index: number) => {
      if (slides.length === 0) return;
      setCurrentIndex((index + slides.length) % slides.length);
    },
    [slides.length],
  );

  const handlePrev = () => goTo(currentIndex - 1);
  const handleNext = () => goTo(currentIndex + 1);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      handlePrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      handleNext();
    } else if (event.key === " ") {
      event.preventDefault();
      setIsPlaying((playing) => !playing);
    }
  };

  useEffect(() => {
    if (slides.length < 2) return;
    const next = slides[(currentIndex + 1) % slides.length];
    const image = new Image();
    image.decoding = "async";
    image.src = getHeroImageUrl(next.src);
  }, [currentIndex, slides]);

  if (slides.length === 0) return null;

  const currentSlide: PhotographyAsset = slides[Math.min(currentIndex, slides.length - 1)];
  const currentImageUrl = getHeroImageUrl(currentSlide.src);
  const kenBurns = 1;
  const enterScale = 1;
  const crossfadeDuration = prefersReducedMotion ? 0.35 : 1.4;

  return (
    <section
      id="hero-showcase"
      className="relative w-full h-[100svh] min-h-[640px] max-h-[1080px] bg-charcoal-950 overflow-hidden select-none"
      aria-label="Hero photography showcase"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={currentSlide.id}
          initial={{ opacity: 0, scale: enterScale }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: crossfadeDuration, ease: EASE_CINEMATIC }}
          className="absolute inset-0 w-full h-full"
        >
          <motion.img
            src={currentImageUrl}
            alt={currentSlide.alt}
            referrerPolicy="no-referrer"
            fetchPriority={currentIndex === 0 ? "high" : "low"}
            loading={currentIndex === 0 ? "eager" : "lazy"}
            decoding="async"
            className="w-full h-full object-contain object-center will-change-transform"
            style={{ filter: "brightness(0.82) contrast(1.06)" }}
            initial={{ scale: 1 }}
            animate={{ scale: kenBurns }}
            transition={{
              duration: prefersReducedMotion ? 0 : AUTOPLAY_MS / 1000,
              ease: "linear",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Cinematic vignettes — keep type legible without flattening the photograph */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-charcoal-950 via-charcoal-950/25 to-black/45" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-charcoal-950/70 via-charcoal-950/15 to-black/35" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/35 via-transparent to-transparent" />

      <div className="relative z-10 w-full h-full max-w-[1720px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 flex flex-col justify-end pb-8 md:pb-12 text-ivory-50">
        <div className="max-w-3xl mb-8 md:mb-12">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE_CINEMATIC }}
            className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.25em] text-bronze-500 mb-5 sm:mb-6"
          >
            Editorial Wedding & Cultural Storytelling · Based in Alexandria, VA & Serving the DMV Worldwide
          </motion.p>

          <motion.h1
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE_CINEMATIC }}
            className="font-serif font-light text-[2.25rem] sm:text-5xl md:text-7xl lg:text-[5.5rem] tracking-tight leading-[1.02] text-ivory-50 mb-6"
          >
            Timeless Moments,
            <br />
            <span className="italic font-light text-ivory-50/90">Sculpted in Light.</span>
          </motion.h1>

          <motion.p
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE_CINEMATIC }}
            className="font-sans text-base sm:text-lg text-ivory-50/80 max-w-xl leading-relaxed mb-8 font-light"
          >
            Elevated weddings, bespoke portraiture & editorial narratives crafted for
            discerning couples.
          </motion.p>

          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: EASE_CINEMATIC }}
            className="flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <Link
              to="/work"
              id="hero-explore-work-btn"
              className="inline-flex items-center justify-center min-h-11 font-sans text-xs uppercase tracking-[0.16em] font-medium py-3.5 px-7 bg-ivory-50 text-charcoal-950 hover:bg-white transition-colors"
            >
              <span>Explore the Work</span>
              <ArrowUpRight className="w-4 h-4 ml-2" aria-hidden="true" />
            </Link>

            <Link
              to="/contact"
              id="hero-inquire-btn"
              className="inline-flex items-center justify-center min-h-11 font-sans text-xs uppercase tracking-[0.16em] font-medium py-3.5 px-7 bg-transparent text-ivory-50 border border-ivory-50/30 hover:border-ivory-50/70 hover:bg-ivory-50/10 backdrop-blur-sm transition-colors"
            >
              <span>Inquire Availability</span>
            </Link>
          </motion.div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-5 border-t border-ivory-50/15">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentSlide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="text-xs text-ivory-50/70 max-w-md truncate font-sans"
            >
              <span className="text-ivory-50 font-medium tracking-[0.12em] uppercase mr-2">
                Featured
              </span>
              {currentSlide.alt}
            </motion.p>
          </AnimatePresence>

          <div className="flex items-center space-x-5 self-end sm:self-auto">
            <div
              className="flex items-center gap-2"
              role="tablist"
              aria-label="Hero slides"
            >
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={i === currentIndex}
                  onClick={() => goTo(i)}
                  className={`h-[2px] rounded-none transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ivory-50 ${
                    i === currentIndex
                      ? "w-10 sm:w-12 bg-ivory-50"
                      : "w-5 bg-ivory-50/30 hover:bg-ivory-50/55"
                  }`}
                  aria-label={`Go to slide ${i + 1}: ${slide.title}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 min-w-11 min-h-11 flex items-center justify-center text-ivory-50/60 hover:text-ivory-50 rounded-full transition-colors"
              title={isPlaying ? "Pause slideshow" : "Play slideshow"}
              aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <div className="flex items-center space-x-1">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous slide"
                className="p-2 min-w-11 min-h-11 flex items-center justify-center bg-ivory-50/10 hover:bg-ivory-50/20 rounded-full text-ivory-50 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ivory-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next slide"
                className="p-2 min-w-11 min-h-11 flex items-center justify-center bg-ivory-50/10 hover:bg-ivory-50/20 rounded-full text-ivory-50 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ivory-50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
