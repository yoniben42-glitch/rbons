import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Maximize2, SlidersHorizontal } from "lucide-react";
import { Link } from "@/lib/router-compat";
import { ImageCategory, PhotographyAsset } from "../../types/image";
import { Lightbox } from "../common/Lightbox";
import { useGalleryAssets } from "@/lib/gallery-client";
import { GALLERY_CATEGORIES } from "@/types/gallery";
import { AdaptiveImage } from "../common/AdaptiveImage";

const CATEGORIES = GALLERY_CATEGORIES as ReadonlyArray<{ id: ImageCategory; label: string }>;


export const CuratedGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ImageCategory>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { assets } = useGalleryAssets(selectedCategory);
  const displayAssets = useMemo(() => assets.slice(0, 12), [assets]);
  const open = (asset: PhotographyAsset) => setLightboxIndex(Math.max(0, displayAssets.findIndex((item) => item.id === asset.id)));

  return <section id="curated-gallery" className="py-20 md:py-32 bg-[#F4F1EB]"><div className="max-w-[1720px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16"><div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6 pb-6 border-b border-[#D8D3CA]"><div><div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#8C7A6B] mb-2"><SlidersHorizontal className="w-3.5 h-3.5" /><span>Curated Portfolio</span></div><h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#191817]">Current Works</h2></div><div className="flex flex-wrap gap-2">{CATEGORIES.map((category) => <button key={category.id} type="button" onClick={() => setSelectedCategory(category.id)} className={`font-sans text-xs uppercase tracking-[0.14em] font-medium py-2 px-4 rounded-full ${selectedCategory === category.id ? "bg-[#191817] text-[#FAF8F5]" : "bg-[#ECE7DD] text-[#5E5247]"}`}>{category.label}</button>)}</div></div><motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"><AnimatePresence>{displayAssets.map((asset) => <motion.article key={asset.id} layout initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .97 }} className="group relative overflow-hidden bg-[#ECE7DD] cursor-pointer" onClick={() => open(asset)}>
    <AdaptiveImage
      src={asset.src}
      alt={asset.alt}
      initialAspectRatio={asset.dimensions.aspectRatio}
  />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-100 pointer-fine:opacity-0 pointer-fine:group-hover:opacity-100 transition-opacity p-5 flex flex-col justify-between text-white"><div className="flex justify-end"><span className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center"><Maximize2 className="w-4 h-4" /></span></div><div><span className="text-[10px] uppercase tracking-widest text-white/70">{asset.gallery}</span><p className="font-serif text-lg mt-1">{asset.title}</p></div></div></motion.article>)}</AnimatePresence></motion.div><div className="mt-14 text-center"><Link to="/work" className="inline-flex items-center py-4 px-8 bg-[#191817] text-[#FAF8F5] text-xs uppercase tracking-[0.16em]">Explore Complete Portfolio <ArrowUpRight className="w-4 h-4 ml-2" /></Link></div></div>{lightboxIndex !== null && <Lightbox images={displayAssets} currentIndex={lightboxIndex} isOpen onClose={() => setLightboxIndex(null)} onNavigate={setLightboxIndex} />}</section>;
};
