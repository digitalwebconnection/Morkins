import { useState, useRef, useEffect } from 'react';
import {
  Play,
  Check
} from 'lucide-react';
import { PRODUCTS_EXTENDED } from '../data/products';
import ProductStoryModal, { type StoryItem } from './ProductStoryModal';

// Product Images
import p1 from '../../../assets/images/product/p1.jpg';
import p2 from '../../../assets/images/product/p2.jpg';
import p3 from '../../../assets/images/product/p3.jpg';
import p4 from '../../../assets/images/product/p4.jpg';
import p5 from '../../../assets/images/product/p5.jpg';
import p6 from '../../../assets/images/product/p6.jpg';
import p9 from '../../../assets/images/product/p9.avif';

// Model & Lifestyle Hero Images for full-screen story experience
import h1 from '../../../assets/images/hero/1.jpg';
import h2 from '../../../assets/images/hero/2.jpg';
import h3 from '../../../assets/images/hero/3.jpg';
import h4 from '../../../assets/images/hero/4.jpg';
import h6 from '../../../assets/images/hero/6.jpg';
import hHairAfter from '../../../assets/images/hero/hair_after.jpg';

interface ProductStoriesBarProps {
  activeCategory: string;
  activeDepartment: string;
  onSelectCategory: (category: string) => void;
  onAddToCart: (product: any, openCartAfter?: boolean) => void;
}

export default function ProductStoriesBar({
  activeCategory,
  activeDepartment,
  onSelectCategory,
  onAddToCart,
}: ProductStoriesBarProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [, setCanScrollLeft] = useState(false);
  const [, setCanScrollRight] = useState(true);

  // Story modal state
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);

  // Clean, Curated Highlights Data with Continuous Looping Videos
  const STORIES_DATA: StoryItem[] = [
    {
      id: 'story-all',
      title: 'All Products',
      subtitle: 'Full Collection',
      badge: 'ALL',
      category: '',
      department: '',
      avatarImg: p1,
      storyMedia: h2,
      videoUrl: 'https://v1.pinimg.com/videos/mc/720p/5a/68/24/5a68242ade693aba90875d897b13feda.mp4',
      metric: '100% Dermatologist Verified',
      dermatologistNote: 'Clean clinical botanicals formulated for cellular rejuvenation without harmful parabens or sulfates.',
      gradient: 'linear-gradient(135deg, #13442C 0%, #C59B27 100%)',
      tagline: 'Apothecary Collection',
      ingredients: ['Plant Peptides', 'Bio-Ceramides', 'Nano-Caffeine'],
    },
    {
      id: 'story-dual-serum',
      productId: 1,
      product: PRODUCTS_EXTENDED.find((p) => p.id === 1),
      title: 'Dual Phase Serum',
      subtitle: 'Viral Radiance',
      badge: 'VIRAL',
      category: 'Serums',
      department: 'women',
      avatarImg: p1,
      storyMedia: h2,
      videoUrl: 'https://v1.pinimg.com/videos/mc/720p/5a/68/24/5a68242ade693aba90875d897b13feda.mp4',
      metric: '+94% Radiant Glow in 7 Days',
      dermatologistNote: 'Dual-phase botanical sterols activate micro-cellular turnover, restoring vibrant natural glow.',
      gradient: 'linear-gradient(135deg, #D97706 0%, #F59E0B 50%, #B45309 100%)',
      tagline: 'Dual-Phase Vitamin C + Rosehip',
      ingredients: ['15% Vitamin C', 'Rosehip Bio-Ferment', 'Hyaluronic Acid'],
    },
    {
      id: 'story-oil-free-moisturizer',
      productId: 2,
      product: PRODUCTS_EXTENDED.find((p) => p.id === 2),
      title: 'Oil Free Moisturizer',
      subtitle: 'Barrier Repair',
      badge: 'HYDRA',
      category: 'Moisturizers',
      department: 'women',
      avatarImg: p2,
      storyMedia: h1,
      videoUrl: 'https://v1.pinimg.com/videos/mc/720p/c7/53/28/c7532835d5cdd682b924426ef89fc404.mp4',
      metric: '48-Hour Continuous Lipid Lock',
      dermatologistNote: 'Bio-identical Ceramide complex reinforces the skin moisture barrier and locks in deep dermal hydration.',
      gradient: 'linear-gradient(135deg, #0284C7 0%, #38BDF8 50%, #0369A1 100%)',
      tagline: '5-Type Ceramide NP Complex',
      ingredients: ['Ceramide NP/AP/EOP', 'Plant Squalane', 'Centella Asiatica'],
    },
    {
      id: 'story-dht-scalp',
      productId: 6,
      product: PRODUCTS_EXTENDED.find((p) => p.id === 6),
      title: 'DHT Scalp Serum',
      subtitle: 'Trichology Density',
      badge: 'DHT 0',
      category: 'Serums',
      department: 'men',
      avatarImg: p6,
      storyMedia: hHairAfter,
      videoUrl: 'https://v1.pinimg.com/videos/mc/720p/20/8b/66/208b662971933336108fb8c94cc8707d.mp4',
      metric: '+214% Follicle Stem Division',
      dermatologistNote: 'Saw Palmetto & liposomal caffeine neutralize local 5α-reductase, halting hair thinning.',
      gradient: 'linear-gradient(135deg, #854D0E 0%, #CA8A04 50%, #451A03 100%)',
      tagline: 'Men’s Trichology Benchmark',
      ingredients: ['Redensyl 3%', 'Procapil', 'Cold-Pressed Saw Palmetto'],
    },
    {
      id: 'story-face-mask',
      productId: 5,
      product: PRODUCTS_EXTENDED.find((p) => p.id === 5),
      title: 'Face Mask',
      subtitle: 'Peptide Renewal',
      badge: 'REPAIR',
      category: 'Night Care',
      department: 'women',
      avatarImg: p5,
      storyMedia: h6,
      videoUrl: 'https://v1.pinimg.com/videos/iht/expMp4/c1/01/3b/c1013b79a42ad85819f1a79874761d01_720w.mp4',
      metric: '+87% Collagen Elasticity',
      dermatologistNote: 'Copper tripeptides and bakuchiol promote intensive matrix repair during sleep.',
      gradient: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 50%, #581C87 100%)',
      tagline: 'Deep Restorative Complex',
      ingredients: ['Copper Tripeptide-1', 'Bakuchiol 1%', 'Evening Primrose'],
    },
    {
      id: 'story-lip-balm',
      productId: 9,
      product: PRODUCTS_EXTENDED.find((p) => p.id === 9),
      title: 'Lip Balm',
      subtitle: 'Peptide Plump',
      badge: 'PLUMP',
      category: 'Treatments',
      department: 'women',
      avatarImg: p9,
      storyMedia: p9,
      videoUrl: 'https://v1.pinimg.com/videos/iht/expMp4/69/ff/46/69ff46836623d68f45a2ff1e86dcc28c_720w.mp4',
      metric: '+55% Immediate Hydration Volume',
      dermatologistNote: 'Micro-hyaluronic spheres bind 1000x their weight in moisture for soft, smoothed lips.',
      gradient: 'linear-gradient(135deg, #E11D48 0%, #FB7185 50%, #9F1239 100%)',
      tagline: 'Hydra-Gel Peptide Treatment',
      ingredients: ['Micro Hyaluronic Acid', 'Palmitoyl Tripeptide-38', 'Shea Ester'],
    },
    {
      id: 'story-sunscreen',
      productId: 4,
      product: PRODUCTS_EXTENDED.find((p) => p.id === 4),
      title: 'Sunscreen SPF 50',
      subtitle: 'Invisible Matte',
      badge: 'SPF 50',
      category: 'Sun Care',
      department: 'women',
      avatarImg: p4,
      storyMedia: h3,
      videoUrl: 'https://v1.pinimg.com/videos/iht/expMp4/69/ff/46/69ff46836623d68f45a2ff1e86dcc28c_720w.mp4',
      metric: '100% Invisible On All Skin Tones',
      dermatologistNote: 'Ultralight non-comedogenic zinc oxide shielding UVA/UVB and HEV blue light with zero white cast.',
      gradient: 'linear-gradient(135deg, #D97706 0%, #FBBF24 50%, #78350F 100%)',
      tagline: 'Broad Spectrum UVA/UVB + HEV',
      ingredients: ['Non-Nano Zinc', 'Niacinamide 2%', 'Green Tea Polyphenols'],
    },
    {
      id: 'story-clarifying-wash',
      productId: 3,
      product: PRODUCTS_EXTENDED.find((p) => p.id === 3),
      title: 'Clarifying Wash',
      subtitle: 'Pore Detox',
      badge: 'CLEAN',
      category: 'Cleansers',
      department: 'women',
      avatarImg: p3,
      storyMedia: h4,
      videoUrl: 'https://v1.pinimg.com/videos/iht/expMp4/a2/5e/06/a25e060090543422d12d9d1407f665fb_720w.mp4',
      metric: '-68% Sebum Decongestion',
      dermatologistNote: 'Sulfate-free botanical amino acids dissolve pore debris without disrupting the skin acid mantle.',
      gradient: 'linear-gradient(135deg, #059669 0%, #34D399 50%, #064E3B 100%)',
      tagline: 'Gentle pH 5.5 Balanced',
      ingredients: ['Salicylic Acid 0.5%', 'Tea Tree Ferment', 'Aloe Leaf Juice'],
    },


  ];

  // Filter stories if a specific department is active
  const filteredStories = STORIES_DATA.filter((story) => {
    if (!activeDepartment) return true;
    if (!story.department) return true;
    return story.department === activeDepartment;
  });

  // Check scroll bounds
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 8);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 8);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [filteredStories.length]);


  // Open story reel modal
  const handleOpenStory = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedStoryIndex(index);
    setIsStoryModalOpen(true);
  };

  // Fast Category Filter toggle
  const handleCategoryClick = (category: string) => {
    onSelectCategory(category);
  };

  return (
    <div className="relative py-4 sm:py-6 bg-[#FCFBF8] border-b border-[#EDE4D8]/80 select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Stories Horizontal Carousel */}
        <div className="relative">
          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex items-start gap-4 sm:gap-6 overflow-x-auto pb-1.5 scrollbar-none scroll-smooth snap-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredStories.map((story, idx) => {
              const isAllButton = story.category === '' && story.id === 'story-all';
              const isSelected = isAllButton
                ? activeCategory === ''
                : activeCategory.toLowerCase() === story.category.toLowerCase();

              return (
                <div
                  key={story.id}
                  className="flex flex-col items-center py-6 shrink-0 group cursor-pointer snap-start"

                >

                  {/* ── Outer Gradient Ring ── */}
                  <div
                    onClick={(e) => handleOpenStory(idx, e)}
                    className="relative w-18 h-18 sm:w-28 sm:h-28 rounded-full p-0.5 transition-all duration-300 transform group-hover:scale-106 active:scale-95"
                    style={{
                      background: isSelected
                        ? 'linear-gradient(135deg, #13442C 0%, #C59B27 100%)'
                        : story.gradient,
                      boxShadow: isSelected
                        ? '0 0 0 3px rgba(19, 68, 44, 0.25), 0 6px 16px rgba(197, 155, 39, 0.3)'
                        : '0 3px 10px rgba(0,0,0,0.06)',
                    }}
                  >

                    {/* Inner Gap Ring */}
                    <div className="w-full h-full rounded-full p-0.5 bg-[#FCFBF8] overflow-hidden">

                      {/* Inner Thumbnail / Continuously Playing Video */}
                      <div className="relative w-full h-full rounded-full overflow-hidden bg-[#F0F6F2]">
                        {story.videoUrl ? (
                          <video
                            src={story.videoUrl}
                            poster={story.avatarImg}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-115 pointer-events-none"
                          />
                        ) : (
                          <img
                            src={story.avatarImg}
                            alt={story.title}
                            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-115"
                            loading="lazy"
                          />
                        )}

                        {/* Subtle Play Overlay on Hover */}
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                          <div className="w-5 h-5 rounded-full bg-white/35 backdrop-blur-xs flex items-center justify-center shadow-xs">
                            <Play className="w-2.5 h-2.5 fill-white ml-0.5" />
                          </div>
                        </div>

                        {/* Selection Checkmark */}
                        {isSelected && !isAllButton && (
                          <div className="absolute bottom-0 inset-x-0 bg-[#13442C]/90 text-white flex items-center justify-center py-0.5 z-10">
                            <Check className="w-3 h-3 stroke-3" />
                          </div>
                        )}
                      </div>

                    </div>

                  </div>

                  {/* ── Label & Quick Filter Underneath ── */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCategoryClick(story.category);
                    }}
                    className={`mt-2 text-center w-full focus:outline-none transition-colors cursor-pointer ${isSelected
                        ? 'text-[#13442C] font-bold'
                        : 'text-[#44403C] hover:text-[#13442C]'
                      }`}
                  >
                    <span className="block text-xs font-medium leading-tight line-clamp-2">
                      {story.title}
                    </span>
                  </button>

                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* ── Fullscreen Interactive Story / Reel Modal ── */}
      <ProductStoryModal
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
        stories={filteredStories}
        initialStoryIndex={selectedStoryIndex}
        onAddToCart={onAddToCart}
        onFilterCategory={onSelectCategory}
      />

    </div>
  );
}
