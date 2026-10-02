import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { imageRevealVariants } from '../../utilities/motion';
import { getResponsiveImageSources } from '../../lib/image-url';

interface ImageRevealProps {
  src: string;
  alt: string;
  aspectRatio?: 'portrait' | 'landscape' | 'square' | 'wide' | 'auto' | number;
  className?: string;
  imageClassName?: string;
  delay?: number;
  priority?: boolean;
  dominantColor?: string;
}

export const ImageReveal: React.FC<ImageRevealProps> = ({
  src,
  alt,
  aspectRatio = 'portrait',
  className = '',
  imageClassName = '',
  delay = 0,
  priority = false,
  dominantColor,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const responsiveSources = getResponsiveImageSources(src);

  const aspectStyles = typeof aspectRatio === 'number' ? '' : ({
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
    wide: 'aspect-[16/9]',
    square: 'aspect-square',
    auto: '',
  }[aspectRatio]);
  const inlineAspectRatio = typeof aspectRatio === 'number' && Number.isFinite(aspectRatio) && aspectRatio > 0
    ? String(aspectRatio)
    : undefined;

  return (
    <div
      className={`relative overflow-hidden bg-[#ECE7DD] ${aspectStyles} ${className}`}
      style={{ backgroundColor: dominantColor || '#ECE7DD', aspectRatio: inlineAspectRatio }}
    >
      {/* Editorial shimmer / placeholder tone */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-out pointer-events-none ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ backgroundColor: dominantColor || '#E2DBD0' }}
      />

      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center p-4 text-center bg-[#2F2C29] text-[#FAF8F5]/60 text-xs">
          <span>RBONSU PHOTOGRAPHY</span>
        </div>
      ) : prefersReducedMotion ? (
        <img
          src={responsiveSources.src}
          srcSet={responsiveSources.srcSet}
          sizes={responsiveSources.sizes}
          alt={alt}
          referrerPolicy="no-referrer"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-contain transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${imageClassName}`}
        />
      ) : (
        <motion.div
          custom={delay}
          variants={imageRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="w-full h-full"
        >
          <img
            src={responsiveSources.src}
            srcSet={responsiveSources.srcSet}
            sizes={responsiveSources.sizes}
            alt={alt}
            referrerPolicy="no-referrer"
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full object-contain transition-opacity duration-700 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${imageClassName}`}
          />
        </motion.div>
      )}
    </div>
  );
};
