import { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight
} from 'lucide-react';

import type { ProductExtended } from '../../../types';

export interface StoryItem {
  id: string;
  productId?: number;
  product?: ProductExtended;
  title: string;
  subtitle: string;
  badge: string;
  category: string;
  department?: 'women' | 'men' | '';
  avatarImg: string;
  storyMedia: string;
  videoUrl?: string;
  metric: string;
  dermatologistNote: string;
  gradient: string;
  tagline: string;
  ingredients: string[];
}

interface ProductStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  stories: StoryItem[];
  initialStoryIndex: number;
  onAddToCart: (product: any, openCartAfter?: boolean) => void;
  onFilterCategory?: (category: string) => void;
}

const STORY_DURATION = 6000; // 6 seconds per story

export default function ProductStoryModal({
  isOpen,
  onClose,
  stories,
  initialStoryIndex = 0,
  onAddToCart,
  onFilterCategory,
}: ProductStoryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialStoryIndex);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isAddedToast, setIsAddedToast] = useState(false);

  // Video element reference
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Sync index when opened with a specific story
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialStoryIndex);
      setProgress(0);
      setIsPaused(false);
    }
  }, [isOpen, initialStoryIndex]);

  const currentStory = stories[currentIndex];

  // Control video play/pause
  useEffect(() => {
    if (!videoRef.current) return;
    if (isPaused) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {});
    }
  }, [isPaused, currentIndex]);

  // Control video sound mute
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Auto-advancing timer logic (advances only when NOT paused)
  useEffect(() => {
    if (!isOpen || isPaused || !currentStory) return;

    const intervalTime = 50; // update progress every 50ms
    const step = (intervalTime / STORY_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Go to next story or close if last
          if (currentIndex < stories.length - 1) {
            setCurrentIndex((curr) => curr + 1);
            return 0;
          } else {
            onClose();
            return 100;
          }
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isOpen, isPaused, currentIndex, stories.length, onClose, currentStory]);

  // Handle navigation
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setProgress(0);
      setIsPaused(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setProgress(0);
      setIsPaused(false);
    } else {
      onClose();
    }
  };

  const handleTogglePause = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsPaused((prev) => {
      const nextState = !prev;
      if (videoRef.current) {
        if (nextState) {
          videoRef.current.pause();
        } else {
          videoRef.current.play().catch(() => {});
        }
      }
      return nextState;
    });
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted((prev) => {
      const nextMuted = !prev;
      if (videoRef.current) {
        videoRef.current.muted = nextMuted;
      }
      return nextMuted;
    });
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === ' ') {
        e.preventDefault();
        handleTogglePause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, stories.length]);

  // Lock body scroll when story is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !currentStory) return null;

  const product = currentStory.product;

  const handleShopNow = () => {
    if (!product) return;
    onAddToCart({
      id: product.id,
      name: product.name,
      price: product.discountPrice || product.price,
      discountPrice: product.discountPrice,
      img: product.img,
    }, false);
    setIsAddedToast(true);
    setTimeout(() => setIsAddedToast(false), 2000);
  };


  const handleExploreCategory = () => {
    if (onFilterCategory && currentStory.category) {
      onFilterCategory(currentStory.category);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md transition-all duration-300 select-none animate-in fade-in">
      
      {/* Background click to close */}
      <div 
        className="absolute inset-0"
        onClick={onClose}
      />

      {/* Close Button Top Right */}
      <button
        onClick={onClose}
        aria-label="Close story"
        className="absolute top-5 right-5 sm:top-8 sm:right-8 z-50 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-110"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Desktop Navigation Arrows */}
      <button
        onClick={handlePrev}
        disabled={currentIndex === 0}
        aria-label="Previous story"
        className={`hidden md:flex absolute left-8 lg:left-16 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md items-center justify-center transition-all cursor-pointer shadow-xl hover:scale-110 ${
          currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-90'
        }`}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        aria-label="Next story"
        className="hidden md:flex absolute right-8 lg:right-16 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md items-center justify-center transition-all cursor-pointer shadow-xl hover:scale-110 opacity-90"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Story Container (Mobile-first Aspect Ratio) */}
      <div 
        className="relative w-full h-full sm:h-[90vh] sm:max-h-205 sm:max-w-107.5 sm:rounded-3xl overflow-hidden bg-[#111] shadow-2xl flex flex-col justify-between z-10 border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Story Background Visual */}
        <div className="absolute inset-0 z-0">
          {currentStory.videoUrl ? (
            <video
              ref={videoRef}
              key={currentStory.id}
              src={currentStory.videoUrl}
              poster={currentStory.storyMedia || currentStory.avatarImg}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover object-center transform scale-102 transition-transform duration-1000"
            />
          ) : (
            <img
              src={currentStory.storyMedia}
              alt={currentStory.title}
              className="w-full h-full object-cover object-center transform scale-102 transition-transform duration-1000"
            />
          )}
          {/* Top Vignette Gradient for Header Readability */}
          <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/10 to-black/80 pointer-events-none" />
        </div>

        {/* ── Pause State Center Overlay ── */}
        {isPaused && (
          <div 
            onClick={handleTogglePause}
            className="absolute inset-0 z-30 flex items-center justify-center bg-black/25 backdrop-blur-xs cursor-pointer animate-in fade-in duration-200"
          >
            <div className="w-16 h-16 rounded-full bg-black/60 border border-white/30 flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform">
              <Play className="w-8 h-8 fill-white ml-1" />
            </div>
          </div>
        )}

        {/* ── TOP SECTION: Progress Bars & Story Header ── */}
        <div className="relative z-20 p-4 sm:p-5 pt-3 sm:pt-4">
          
          {/* Progress Bars Strip */}
          <div className="flex items-center gap-1.5 mb-3.5">
            {stories.map((s, idx) => {
              let fillWidth = '0%';
              if (idx < currentIndex) fillWidth = '100%';
              else if (idx === currentIndex) fillWidth = `${progress}%`;

              return (
                <div 
                  key={s.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setProgress(0);
                    setIsPaused(false);
                  }}
                  className="h-1 sm:h-1.2 flex-1 rounded-full bg-white/30 overflow-hidden cursor-pointer backdrop-blur-xs"
                >
                  <div 
                    className="h-full bg-white transition-all duration-75 ease-linear rounded-full shadow-sm"
                    style={{ width: fillWidth }}
                  />
                </div>
              );
            })}
          </div>

          {/* Story Author & Meta Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div 
                className="w-9 h-9 rounded-full p-0.5"
                style={{ background: currentStory.gradient }}
              >
                <img
                  src={currentStory.avatarImg}
                  alt={currentStory.title}
                  className="w-full h-full rounded-full object-cover border border-black/40"
                />
              </div>

              <div>
                <span className="font-sans text-sm font-semibold text-white tracking-wide block">
                  {currentStory.title}
                </span>
                <p className="text-[10px] text-white/70 font-sans">
                  {currentStory.subtitle}
                </p>
              </div>
            </div>

            {/* Play/Pause & Mute Toggle Controls */}
            <div className="flex items-center gap-1.5 text-white/90">
              <button
                type="button"
                onClick={handleTogglePause}
                className="p-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md transition-colors cursor-pointer"
                aria-label={isPaused ? 'Play' : 'Pause'}
              >
                {isPaused ? <Play className="w-3.5 h-3.5 fill-white ml-0.5" /> : <Pause className="w-3.5 h-3.5 fill-white" />}
              </button>

              <button
                type="button"
                onClick={handleToggleMute}
                className="p-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md transition-colors cursor-pointer"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

        </div>

        {/* ── MIDDLE SECTION: Invisible Tap Zones (Left = Prev, Right = Next) ── */}
        <div className="relative z-10 flex-1 flex flex-col justify-between px-5 py-4">
          <div className="absolute inset-0 flex">
            <div 
              className="w-1/2 h-full cursor-pointer" 
              onClick={handlePrev} 
              aria-label="Previous story slide" 
            />
            <div 
              className="w-1/2 h-full cursor-pointer" 
              onClick={handleNext} 
              aria-label="Next story slide" 
            />
          </div>
        </div>

        {/* ── BOTTOM SECTION: Clean Shoppable Product Widget (Exact Reference Style) ── */}
        <div className="relative z-20 p-4 sm:p-8 pt-0">
          
          {product ? (
            <div className="p-3.5 sm:p-4 rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl border border-white/10">
              
              {/* Product Info Row */}
              <div className="flex items-center gap-3.5 mb-3.5">
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-xl bg-white p-1 overflow-hidden shrink-0 border border-white/20 shadow-sm flex items-center justify-center">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-sans text-sm sm:text-base font-medium text-white truncate leading-snug">
                    {product.name}
                  </h4>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-sans text-sm sm:text-base font-bold text-white">
                      ${product.discountPrice ? product.discountPrice.toFixed(2) : product.price.toFixed(2)}
                    </span>
                    {product.discountPrice && (
                      <span className="font-sans text-xs text-stone-400 line-through">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Solid White "Shop Now" Button */}
              <button
                type="button"
                onClick={handleShopNow}
                className={`w-full py-3 px-6 rounded-xl text-sm font-bold tracking-wide transition-all shadow-lg active:scale-98 cursor-pointer flex items-center justify-center gap-1.5 ${
                  isAddedToast
                    ? 'bg-emerald-600 text-white shadow-emerald-900/30'
                    : 'bg-white text-black hover:bg-stone-100'
                }`}
              >
                <span>{isAddedToast ? 'Added to Bag! ✓' : 'Shop Now'}</span>
              </button>


            </div>
          ) : (
            <div className="p-3.5 sm:p-4 rounded-2xl bg-black/65 backdrop-blur-md text-white shadow-2xl border border-white/10">
              <button
                type="button"
                onClick={handleExploreCategory}
                className="w-full py-3 px-6 rounded-xl bg-white text-black hover:bg-stone-100 text-sm font-bold tracking-wide transition-all shadow-lg active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
