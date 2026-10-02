import React, { useEffect, useMemo, useState } from "react";

export type AdaptiveImageFallback = {
  src: string;
  alt: string;
};

interface AdaptiveImageProps {
  src: string;
  alt: string;
  fallbackSources?: AdaptiveImageFallback[];
  initialAspectRatio?: number;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  backgroundColor?: string;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
}

export const AdaptiveImage: React.FC<AdaptiveImageProps> = ({
  src,
  alt,
  fallbackSources = [],
  initialAspectRatio,
  priority = false,
  className = "",
  imageClassName = "",
  backgroundColor = "#ECE7DD",
  onLoad,
}) => {
  const candidates = useMemo(
    () =>
      [{ src, alt }, ...fallbackSources].filter(
        (item, index, all) =>
          item.src &&
          all.findIndex((candidate) => candidate.src === item.src) === index,
      ),
    [src, alt, fallbackSources],
  );

  const [candidateIndex, setCandidateIndex] = useState(0);
  const [naturalAspectRatio, setNaturalAspectRatio] = useState<number | null>(
    null,
  );

  const current = candidates[candidateIndex];

  useEffect(() => {
    setCandidateIndex(0);
    setNaturalAspectRatio(null);
  }, [src]);

  if (!current) {
    return (
      <div
        className={`relative overflow-hidden flex items-center justify-center p-6 text-center text-xs uppercase tracking-[0.14em] text-[#8C7A6B] ${className}`}
        style={{ backgroundColor }}
      >
        <span>RBONSU PHOTOGRAPHY</span>
      </div>
    );
  }

  const ratio =
    naturalAspectRatio &&
    Number.isFinite(naturalAspectRatio) &&
    naturalAspectRatio > 0
      ? naturalAspectRatio
      : initialAspectRatio &&
          Number.isFinite(initialAspectRatio) &&
          initialAspectRatio > 0
        ? initialAspectRatio
        : 4 / 5;

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        backgroundColor,
        aspectRatio: ratio ? String(ratio) : undefined,
      }}
    >
      <img
        key={current.src}
        src={current.src}
        alt={current.alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={(event) => {
          const image = event.currentTarget;

          if (image.naturalWidth > 0 && image.naturalHeight > 0) {
            setNaturalAspectRatio(
              image.naturalWidth / image.naturalHeight,
            );
          }

          onLoad?.(event);
        }}
        onError={() => {
          setNaturalAspectRatio(null);
          setCandidateIndex((index) => index + 1);
        }}
        className={`absolute inset-0 block w-full h-full object-contain transition-opacity duration-300 ${imageClassName}`}
        style={{ backgroundColor }}
      />
    </div>
  );
};
