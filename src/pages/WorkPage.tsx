import React, { useMemo, useState } from "react";
import { ArrowUpRight, Filter, Layers, Maximize2, Search, Sparkles, X } from "lucide-react";
import { Link } from "@/lib/router-compat";
import { SEOHead } from "@/components/seo/SEOHead";
import { PageTransition } from "@/components/motion/PageTransition";
import { Lightbox } from "@/components/common/Lightbox";
import { useGalleryAssets } from "@/lib/gallery-client";
import type { ImageCategory, ImageOrientation, PhotographyAsset } from "@/types/image";
import { CURATED_STORIES } from "@/data/imageManifest";
import { GALLERY_CATEGORIES, normalizeGalleryCategory } from "@/types/gallery";
import { AdaptiveImage } from "@/components/common/AdaptiveImage";

const CATEGORIES = GALLERY_CATEGORIES as ReadonlyArray<{ id: ImageCategory; label: string }>;


const ORIENTATIONS: { id: ImageOrientation | "all"; label: string }[] = [
  { id: "all", label: "All Orientations" },
  { id: "portrait", label: "Portrait" },
  { id: "landscape", label: "Landscape" },
  { id: "square", label: "Square" },
];

type ViewTab = "archive" | "stories";

export const WorkPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ViewTab>("archive");
  const [selectedCategory, setSelectedCategory] = useState<ImageCategory>("all");
  const [selectedOrientation, setSelectedOrientation] = useState<ImageOrientation | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { assets, loading } = useGalleryAssets(selectedCategory);

  const filteredAssets = useMemo(() => assets.filter((asset) => {
    const orientationMatch = selectedOrientation === "all" || asset.orientation === selectedOrientation;
    const search = searchQuery.trim().toLowerCase();
    const searchMatch = !search || `${asset.title} ${asset.alt} ${asset.gallery}`.toLowerCase().includes(search);
    return orientationMatch && searchMatch;
  }), [assets, selectedOrientation, searchQuery]);

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedOrientation("all");
    setSearchQuery("");
  };

  const openLightbox = (asset: PhotographyAsset) => {
    const index = filteredAssets.findIndex((item) => item.id === asset.id);
    setLightboxIndex(index < 0 ? 0 : index);
  };

  return (
    <PageTransition>
      <SEOHead title="Portfolio Archive | RBONSU PHOTOGRAPHY" description="Explore Wedding & Couples, Maternity, Children & Family, Portraits & Fashion, Culture & Events, and Graduation work by RBONSU Photography." canonicalPath="/work" />
      <div className="py-12 sm:py-20 bg-[#FAF8F5] min-h-screen">
        <div className="max-w-[1720px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
          <div className="max-w-4xl mb-12 sm:mb-16">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#8C7A6B] mb-3"><Sparkles className="w-3.5 h-3.5" /><span>Portfolio Archive</span></div>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#191817] font-normal tracking-tight leading-[1.05] mb-6">The Archive & Selected Works</h1>
            <p className="font-sans text-base sm:text-lg text-[#5E5247] font-light leading-relaxed max-w-2xl">Browse the full body of work by category, orientation, or keyword. New images added by the studio appear here automatically after they are published in the admin dashboard.</p>
          </div>

          <div className="flex flex-col gap-6 pb-6 border-b border-[#ECE7DD] mb-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-2 bg-[#ECE7DD]/80 p-1.5 rounded-full w-fit"><button type="button" onClick={() => setActiveTab("archive")} className={`py-2 px-5 rounded-full text-xs uppercase tracking-[0.14em] font-medium ${activeTab === "archive" ? "bg-[#191817] text-[#FAF8F5]" : "text-[#5E5247]"}`}>Archive ({filteredAssets.length})</button><button type="button" onClick={() => setActiveTab("stories")} className={`py-2 px-5 rounded-full text-xs uppercase tracking-[0.14em] font-medium ${activeTab === "stories" ? "bg-[#191817] text-[#FAF8F5]" : "text-[#5E5247]"}`}>Stories ({CURATED_STORIES.length})</button></div>
              <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto"><label className="relative flex-1 lg:w-[360px]"><Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7A6B]" /><input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search the archive" className="w-full min-h-11 border border-[#D8D3CA] bg-white pl-11 pr-4 text-sm" /></label><button type="button" onClick={() => setShowFilters((value) => !value)} className="min-h-11 border border-[#D8D3CA] bg-white px-4 text-xs uppercase tracking-[0.14em] flex items-center justify-center gap-2"><Filter className="w-4 h-4" /> Filters</button></div>
            </div>

            {showFilters && <div className="flex flex-col gap-4 bg-[#F4F1EB] border border-[#ECE7DD] p-5"><div className="flex flex-wrap gap-2">{CATEGORIES.map((category) => <button key={category.id} type="button" onClick={() => setSelectedCategory(category.id)} className={`px-4 py-2 text-xs uppercase tracking-[0.12em] rounded-full ${selectedCategory === category.id ? "bg-[#191817] text-[#FAF8F5]" : "bg-[#ECE7DD] text-[#5E5247]"}`}>{category.label}</button>)}</div><div className="flex flex-wrap gap-2">{ORIENTATIONS.map((orientation) => <button key={orientation.id} type="button" onClick={() => setSelectedOrientation(orientation.id)} className={`px-3 py-2 text-xs uppercase tracking-[0.12em] rounded-full border ${selectedOrientation === orientation.id ? "border-[#191817] bg-white text-[#191817]" : "border-[#D8D3CA] text-[#5E5247]"}`}>{orientation.label}</button>)}<button type="button" onClick={clearFilters} className="ml-auto px-3 py-2 text-xs uppercase tracking-[0.12em] text-[#8C7A6B] flex items-center gap-1"><X className="w-3.5 h-3.5" /> Clear</button></div></div>}
          </div>

          {activeTab === "stories" ? <StoryGrid /> : <>
            {loading && <div className="mb-6 text-xs uppercase tracking-[0.14em] text-[#8C7A6B]">Refreshing gallery catalog…</div>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {filteredAssets.map((asset) => <article key={asset.id} className="group relative overflow-hidden bg-[#ECE7DD] cursor-pointer" onClick={() => openLightbox(asset)}>
                <div className="relative w-full h-full overflow-hidden">
                  <AdaptiveImage
                    src={asset.src}
                    alt={asset.alt}
                    initialAspectRatio={asset.dimensions.aspectRatio}
                  />
                </div><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 pointer-fine:opacity-0 pointer-fine:group-hover:opacity-100 transition-opacity p-5 flex flex-col justify-between text-white"><div className="flex justify-end"><span className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center"><Maximize2 className="w-4 h-4" /></span></div><div><span className="text-[10px] uppercase tracking-widest text-white/70">{asset.gallery}</span><h2 className="font-serif text-lg mt-1">{asset.title}</h2></div></div></article>)}
            </div>
            {!loading && filteredAssets.length === 0 && <div className="py-20 text-center border-y border-[#ECE7DD]"><Layers className="w-6 h-6 mx-auto text-[#8C7A6B]" /><p className="mt-4 text-[#5E5247]">No works match these filters yet.</p></div>}
            <div className="mt-16 text-center"><Link to="/contact" className="inline-flex items-center py-4 px-8 bg-[#191817] text-[#FAF8F5] text-xs uppercase tracking-[0.16em]">Commission a Similar Story <ArrowUpRight className="w-4 h-4 ml-2" /></Link></div>
          </>}
        </div>
      </div>
      {lightboxIndex !== null && <Lightbox images={filteredAssets} currentIndex={lightboxIndex} isOpen onClose={() => setLightboxIndex(null)} onNavigate={setLightboxIndex} />}
    </PageTransition>
  );
};

function StoryGrid() {
  const { assets: liveAssets } = useGalleryAssets("all");
  return <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">{CURATED_STORIES.map((story, index) => {
    const category = normalizeGalleryCategory(String(story.category));
    const assets = liveAssets.filter((asset) => asset.category === category);
    const cover = assets.find((asset) => asset.isFeatured) ?? assets[0];
    return <article key={story.id} className="border-t border-[#ECE7DD] pt-6">
      <div className="relative overflow-hidden bg-[#ECE7DD]">
        {cover ? <AdaptiveImage src={cover.src} alt={cover.alt} initialAspectRatio={cover.dimensions.aspectRatio} priority={index === 0} /> : <div className="aspect-[4/3] flex items-center justify-center text-[10px] uppercase tracking-[0.18em] text-[#8C7A6B]">Live gallery pending</div>}
      </div><div className="mt-5 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#8C7A6B]"><span>0{index + 1} — {category}</span><span>{assets.length} photographs</span></div><h2 className="font-serif text-3xl mt-3 text-[#191817]">{story.title}</h2><p className="mt-3 text-sm leading-relaxed text-[#5E5247]">{story.description}</p><Link to={`/work/${story.id}`} className="inline-flex items-center mt-6 text-xs uppercase tracking-[0.14em]">Explore series <ArrowUpRight className="w-3.5 h-3.5 ml-1.5" /></Link></article>;
  })}</div>;
}
