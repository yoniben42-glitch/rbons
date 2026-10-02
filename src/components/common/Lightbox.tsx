import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';
import { PhotographyAsset } from '../../types/image';

interface LightboxProps {
  images: PhotographyAsset[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const currentImage = images[currentIndex];

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsZoomed(false);
    onNavigate((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsZoomed(false);
    onNavigate((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  // Swipe-to-navigate for touch devices — a horizontal drag past the
  // threshold moves to the next/previous photo; near-vertical drags are
  // ignored so the gesture doesn't fight a swipe that was meant to dismiss
  // or scroll.
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;
    const SWIPE_THRESHOLD = 45;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) < Math.abs(deltaY)) return;
    if (deltaX > 0) handlePrev(); else handleNext();
  }, [handlePrev, handleNext]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentImage) return null;

  return (
    <AnimatePresence>
      <motion.div
        id="editorial-lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#121211]/95 backdrop-blur-md select-none"
        onClick={onClose}
      >
        {/* Top Header Bar */}
        <div
          className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between gap-3 text-[#FAF8F5] z-50 bg-gradient-to-b from-black/60 to-transparent"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center min-w-0 space-x-3">
            <span className="font-serif text-base sm:text-lg tracking-wide text-[#FAF8F5] truncate">
              RBONSU<span className="hidden sm:inline"> PHOTOGRAPHY</span>
            </span>
            <span className="hidden sm:inline text-xs uppercase tracking-widest text-[#FAF8F5]/60 border-l border-[#FAF8F5]/20 pl-3 whitespace-nowrap">
              Photograph {currentIndex + 1} of {images.length}
            </span>
          </div>

          {/* Action Controls */}
          <div className="flex items-center shrink-0 space-x-1 sm:space-x-2">
            <span className="sm:hidden text-xs text-[#FAF8F5]/60 mr-1 whitespace-nowrap">
              {currentIndex + 1}/{images.length}
            </span>
            <button
              type="button"
              onClick={() => setIsZoomed(!isZoomed)}
              className="p-2 min-w-11 min-h-11 flex items-center justify-center text-[#FAF8F5]/70 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              title={isZoomed ? 'Zoom Out' : 'Zoom In'}
              aria-label={isZoomed ? 'Zoom Out' : 'Zoom In'}
            >
              {isZoomed ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 min-w-11 min-h-11 flex items-center justify-center text-[#FAF8F5]/70 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              title="Close (Esc)"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Previous Navigation Button — hidden on touch; swipe is the primary gesture there */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous photograph"
          className="hidden pointer-fine:flex absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 text-[#FAF8F5]/60 hover:text-white hover:bg-white/10 rounded-full transition-all z-40 cursor-pointer focus:outline-none items-center justify-center"
        >
          <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10" />
        </button>

        {/* Main Stage Image */}
        <div
          className="relative w-full h-full flex items-center justify-center p-4 sm:p-12 md:p-16 touch-pan-y"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <motion.img
            key={currentImage.id}
            src={currentImage.src}
            alt={currentImage.alt}
            referrerPolicy="no-referrer"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: isZoomed ? 1.3 : 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={() => setIsZoomed(!isZoomed)}
            className={`max-w-full max-h-[82vh] object-contain shadow-2xl transition-transform duration-300 select-none ${
              isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
            }`}
          />
        </div>

        {/* Next Navigation Button — hidden on touch; swipe is the primary gesture there */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next photograph"
          className="hidden pointer-fine:flex absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 text-[#FAF8F5]/60 hover:text-white hover:bg-white/10 rounded-full transition-all z-40 cursor-pointer focus:outline-none items-center justify-center"
        >
          <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10" />
        </button>

        {/* Mobile-only tap zones, layered under the image's own click-to-zoom */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous photograph"
          className="pointer-fine:hidden absolute left-0 top-0 bottom-0 w-1/4 z-30 focus:outline-none"
        />
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next photograph"
          className="pointer-fine:hidden absolute right-0 top-0 bottom-0 w-1/4 z-30 focus:outline-none"
        />

        {/* Bottom Editorial Caption */}
        <div
          className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-[#FAF8F5] z-40 pointer-events-none"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="max-w-4xl mx-auto text-center pointer-events-auto">
            <p className="font-serif text-base sm:text-lg tracking-wide font-normal mb-1">
              {currentImage.alt}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs uppercase tracking-widest text-[#FAF8F5]/60">
              {currentImage.categories.map((c) => (
                <span key={c} className="px-2 py-0.5 bg-white/10 rounded-full">
                  {c}
                </span>
              ))}
              <span>•</span>
              <span className="capitalize">{currentImage.dimensions.orientation}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
