import React from 'react';
import { ImageReveal } from '../motion/ImageReveal';
import { getImageById } from '../../data/imageManifest';
import { PhotographyAsset } from '../../types/image';

interface EditorialImageProps {
  /** If provided, loads asset from centralized manifest */
  assetId?: string;
  /** Or pass direct asset object */
  asset?: PhotographyAsset;
  /** Or explicit src/alt overrides */
  src?: string;
  alt?: string;
  aspectRatio?: 'portrait' | 'landscape' | 'square' | 'wide' | 'auto' | number;
  className?: string;
  imageClassName?: string;
  showCaption?: boolean;
  captionText?: string;
  priority?: boolean;
  id?: string;
  onClick?: () => void;
}

export const EditorialImage: React.FC<EditorialImageProps> = ({
  assetId,
  asset: directAsset,
  src: directSrc,
  alt: directAlt,
  aspectRatio,
  className = '',
  imageClassName = '',
  showCaption = false,
  captionText,
  priority = false,
  id,
  onClick,
}) => {
  const asset = assetId ? getImageById(assetId) : directAsset;

  const src = directSrc || asset?.src || '';
  const alt = directAlt || asset?.alt || 'RBONSU Photography editorial capture';
  const resolvedAspectRatio =
    aspectRatio ?? (asset?.dimensions?.aspectRatio || (asset?.orientation === 'landscape' ? 'landscape' : 'portrait'));
  const caption = captionText || asset?.curationNotes || asset?.title;
  const dominantColor = asset?.dominantColor;

  if (!src) {
    return (
      <div
        id={id}
        className={`bg-[#ECE7DD] border border-[#D8D3CA] flex items-center justify-center p-8 text-center text-xs tracking-wider uppercase text-[#8C7A6B] aspect-[3/4] ${className}`}
      >
        <span>[RBONSU Photography Asset]</span>
      </div>
    );
  }

  return (
    <figure
      id={id}
      onClick={onClick}
      className={`group m-0 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <ImageReveal
        src={src}
        alt={alt}
        aspectRatio={resolvedAspectRatio}
        imageClassName={imageClassName}
        priority={priority}
        dominantColor={dominantColor}
      />
      {showCaption && caption && (
        <figcaption className="mt-2.5 font-sans text-xs tracking-wide text-[#8C7A6B]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
