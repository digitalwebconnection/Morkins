import { useState, useRef, useEffect, useMemo, useId, type KeyboardEvent, type TouchEvent, type FormEvent } from 'react';
import p1 from '../../assets/images/product/p1.jpg';
import p2 from '../../assets/images/product/p2.jpg';
import p3 from '../../assets/images/product/p3.jpg';
import p4 from '../../assets/images/product/p4.jpg';
import p5 from '../../assets/images/product/p5.jpg';
import p6 from '../../assets/images/product/p6.jpg';
import hero1 from '../../assets/images/hero/1.jpg';
import hero2 from '../../assets/images/hero/2.jpg';
import hero3 from '../../assets/images/hero/3.jpg';
import hero4 from '../../assets/images/hero/4.jpg';
import hero5 from '../../assets/images/hero/5.jpg';
import hero6 from '../../assets/images/hero/6.jpg';


export interface ReviewItem {
  id: number;
  author: string;
  avatar: string;
  location: string;
  ageGroup: string;
  rating: number;
  productId: number;
  productBought: string;
  productCategory: string;
  productImg: string;
  skinType: string;
  skinConcern: string;
  timeframe: string;
  headline: string;
  comment: string;
  verified: boolean;
  keyResult: string;
  reviewPhoto: string;
  helpfulCount: number;
  date: string;
  tag: 'Glow' | 'Barrier' | 'Hydration' | 'Sensitive' | 'Anti-Aging' | 'Clearing';
}

const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 1,
    author: 'Genevieve L.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
    location: 'Geneva, Switzerland',
    ageGroup: '30-35',
    rating: 5,
    productId: 1,
    productBought: 'Botanical Radiance Glow Serum',
    productCategory: 'Active Glow Serum',
    productImg: p1,
    skinType: 'Sensitive & Dull Skin',
    skinConcern: 'Post-Acne Marks & Dullness',
    timeframe: 'Used for 3 weeks',
    headline: 'Truly transformed my skin texture within 14 days!',
    comment:
      'I was skeptical because my sensitive skin reacts to almost every serum. Morkins Botanical Radiance absorbed like water with zero stinging. My post-acne dark marks have visibly faded and my skin has that lit-from-within glass glow.',
    verified: true,
    keyResult: 'Dark marks faded & 24h glass radiance',
    reviewPhoto: hero1,
    helpfulCount: 42,
    date: 'August 14, 2026',
    tag: 'Glow'
  },
  {
    id: 2,
    author: 'Clara M.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&h=200&q=80',
    location: 'New York, USA',
    ageGroup: '28-34',
    rating: 5,
    productId: 2,
    productBought: 'Bio-Active Barrier Repair Cream',
    productCategory: 'Ceramide Lipid Cream',
    productImg: p2,
    skinType: 'Compromised Barrier / Rosacea',
    skinConcern: 'Tightness & Extreme Redness',
    timeframe: 'Used for 1 month',
    headline: 'Saved my peeling, winter-wrecked skin barrier in 48 hours.',
    comment:
      'After over-exfoliating with harsh peels, my barrier was in agony. This cream healed the stinging and tightness literally overnight. It melts into a velvety cloud without clogging pores. Officially my holy-grail staple.',
    verified: true,
    keyResult: 'Barrier healed overnight & redness stopped',
    reviewPhoto: hero2,
    helpfulCount: 38,
    date: 'August 08, 2026',
    tag: 'Barrier'
  },
  {
    id: 3,
    author: 'Sophia R.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80',
    location: 'London, UK',
    ageGroup: '35-40',
    rating: 5,
    productId: 4,
    productBought: 'Hyaluronic Dew Plumping Elixir',
    productCategory: 'Multi-Depth Hydration',
    productImg: p4,
    skinType: 'Dehydrated Dry Skin',
    skinConcern: 'Fine Lines & Dull Moisture Drop',
    timeframe: 'Used for 2 weeks',
    headline: 'Fine lines around my eyes and forehead simply smoothed out.',
    comment:
      'The 4D hyaluronic acid makes an undeniable difference compared to standard drugstore formulas. It keeps my face plumped and bouncy through long workdays. Makeup glides on flawlessly without flaking.',
    verified: true,
    keyResult: 'Bouncy hydration & fine lines diminished',
    reviewPhoto: hero3,
    helpfulCount: 29,
    date: 'July 29, 2026',
    tag: 'Hydration'
  },
  {
    id: 4,
    author: 'Evelyn K.',
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=200&h=200&q=80',
    location: 'Stockholm, Sweden',
    ageGroup: '26-30',
    rating: 5,
    productId: 5,
    productBought: 'Niacinamide Pore Tightening Serum',
    productCategory: 'Blemish & Pore Refining',
    productImg: p5,
    skinType: 'Combination / Oily T-Zone',
    skinConcern: 'Enlarged Pores & Excess Sebum',
    timeframe: 'Used for 3 weeks',
    headline: 'Pores on my nose and cheeks look virtually airbrushed.',
    comment:
      'I have struggled with congested pores and midday grease for years. Combining 10% pure Niacinamide with Zinc PCA created magic. My T-zone stays naturally satin-matte while maintaining a hydrated luminosity all day.',
    verified: true,
    keyResult: 'Balanced sebum & refined pore structure',
    reviewPhoto: hero4,
    helpfulCount: 31,
    date: 'July 22, 2026',
    tag: 'Clearing'
  },
  {
    id: 5,
    author: 'Elena D.',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&h=200&q=80',
    location: 'Milan, Italy',
    ageGroup: '40-48',
    rating: 5,
    productId: 6,
    productBought: 'Bakuchiol Youth Restoring Oil',
    productCategory: 'Natural Retinol Alternative',
    productImg: p6,
    skinType: 'Sensitive Aging Skin',
    skinConcern: 'Loss of Firmness & Irritation',
    timeframe: 'Used for 5 weeks',
    headline: 'All the firming power of retinol with zero irritation.',
    comment:
      'I can never tolerate conventional retinol without burning redness and peeling. Bakuchiol from Morkins is in a league of its own. My jawline and neck feel noticeably firmer, skin tone is luminous, and wild botanicals soothe deeply.',
    verified: true,
    keyResult: 'Enhanced elasticity without retinol purge',
    reviewPhoto: hero5,
    helpfulCount: 26,
    date: 'July 15, 2026',
    tag: 'Anti-Aging'
  },
  {
    id: 6,
    author: 'Isabelle V.',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&h=200&q=80',
    location: 'Paris, France',
    ageGroup: '30-36',
    rating: 5,
    productId: 3,
    productBought: 'Gentle Clarifying Foaming Wash',
    productCategory: 'pH-Balanced Cleanser',
    productImg: p3,
    skinType: 'Dry & Reactive Skin',
    skinConcern: 'Stiffness After Face Washing',
    timeframe: 'Used for 4 weeks',
    headline: 'Luxurious velvety cleanse that never leaves skin stripped.',
    comment:
      'Finding a cleanser that effortlessly breaks down sunscreen and makeup without stripping lipid moisture is rare. This botanical foam leaves skin supple and calm. I only wish the bottle was twice as big!',
    verified: true,
    keyResult: 'Zero tightness & velvety clean feel',
    reviewPhoto: hero6,
    helpfulCount: 19,
    date: 'June 30, 2026',
    tag: 'Sensitive'
  }
];

interface BestSellersReviewsProps {
  onAddToCart?: (product: { id: number; name: string; price: number; img: string }, openCart?: boolean) => void;
}

export default function BestSellersReviews({ onAddToCart }: BestSellersReviewsProps) {
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [ratingFilter, setRatingFilter] = useState<number | 'all'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [upvotedIds, setUpvotedIds] = useState<Record<number, boolean>>({});
  const [lightboxPhoto, setLightboxPhoto] = useState<{ photo: string; author: string; product: string; quote: string; productImg: string } | null>(null);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [writeSubmitted, setWriteSubmitted] = useState(false);

  // Form State for Write Review Modal
  const [newAuthor, setNewAuthor] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newProductId, setNewProductId] = useState(1);
  const [newSkinType, setNewSkinType] = useState('Combination Skin');
  const [newTimeframe, setNewTimeframe] = useState('Used for 2 weeks');
  const [newHeadline, setNewHeadline] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newKeyResult, setNewKeyResult] = useState('');
  const [newTag, setNewTag] = useState<'Glow' | 'Barrier' | 'Hydration' | 'Sensitive' | 'Anti-Aging' | 'Clearing'>('Glow');

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef<number>(0);
  const writeModalTitleId = useId();

  // Responsive cards count calculation
  const [cardsPerView, setCardsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter logic based on clicked rating
  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => {
      if (ratingFilter !== 'all' && r.rating !== ratingFilter) return false;
      return true;
    });
  }, [reviews, ratingFilter]);

  const maxIndex = Math.max(0, filteredReviews.length - cardsPerView);

  // Reset index if out of bounds
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(Math.max(0, maxIndex));
    }
  }, [filteredReviews.length, maxIndex, currentIndex]);

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlay || isHovered || filteredReviews.length <= cardsPerView) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlay, isHovered, filteredReviews.length, cardsPerView, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'ArrowRight') handleNext();
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null) return;
    if (touchDeltaX.current < -50) {
      handleNext();
    } else if (touchDeltaX.current > 50) {
      handlePrev();
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  const handleToggleHelpful = (id: number) => {
    const isUpvoted = upvotedIds[id];
    setUpvotedIds((prev) => ({ ...prev, [id]: !isUpvoted }));
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          return {
            ...r,
            helpfulCount: isUpvoted ? r.helpfulCount - 1 : r.helpfulCount + 1
          };
        }
        return r;
      })
    );
  };

  const handleAddReview = (e: FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newHeadline || !newComment) return;

    const productMap: Record<number, { name: string; category: string; img: string }> = {
      1: { name: 'Botanical Radiance Glow Serum', category: 'Active Glow Serum', img: p1 },
      2: { name: 'Bio-Active Barrier Repair Cream', category: 'Ceramide Lipid Cream', img: p2 },
      3: { name: 'Gentle Clarifying Foaming Wash', category: 'pH-Balanced Cleanser', img: p3 },
      4: { name: 'Hyaluronic Dew Plumping Elixir', category: 'Multi-Depth Hydration', img: p4 },
      5: { name: 'Niacinamide Pore Tightening Serum', category: 'Blemish & Pore Refining', img: p5 },
      6: { name: 'Bakuchiol Youth Restoring Oil', category: 'Natural Retinol Alternative', img: p6 }
    };

    const selProd = productMap[newProductId] || productMap[1];

    const newReview: ReviewItem = {
      id: Date.now(),
      author: newAuthor,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
      location: newLocation || 'Verified Patron',
      ageGroup: '25-34',
      rating: newRating,
      productId: newProductId,
      productBought: selProd.name,
      productCategory: selProd.category,
      productImg: selProd.img,
      skinType: newSkinType,
      skinConcern: 'Radiance & Moisture Barrier',
      timeframe: newTimeframe,
      headline: newHeadline,
      comment: newComment,
      verified: true,
      keyResult: newKeyResult || 'Noticeable improvement in skin comfort & radiance',
      reviewPhoto: selProd.img,
      helpfulCount: 1,
      date: 'Just now',
      tag: newTag
    };

    setReviews([newReview, ...reviews]);
    setWriteSubmitted(true);

    setTimeout(() => {
      setWriteSubmitted(false);
      setIsWriteModalOpen(false);
      setNewAuthor('');
      setNewLocation('');
      setNewHeadline('');
      setNewComment('');
      setNewKeyResult('');
      setRatingFilter('all');
      setCurrentIndex(0);
    }, 1800);
  };

  return (
    <section
      id="best-sellers-reviews"
      aria-label="Customer Reviews & Ratings"
      className="relative py-12 sm:py-16 lg:py-20 bg-[#F1EDE9] border-b border-brand-cream/30 overflow-hidden select-none"
    >
      {/* Background Lighting Elements */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-180 h-90 bg-[#12602F]/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-96 h-96 bg-[#A68A56]/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Header ── */}
        <div className="text-center mb-5 sm:mb-18 max-w-3xl mx-auto">
          <p className="text-[16px] text-[#01442e] uppercase tracking-[0.2em] mb-3">
            VERIFIED REVIEWS
          </p>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-[#0C1B33] tracking-tight mt-2.5">
            Loved By Over 50,000+ Patrons
          </h2>

          <p className="mt-3 text-sm sm:text-base text-gray-600 font-normal leading-relaxed">
            Real chronicles from patrons who made Morkins clinical botanicals their essential ritual for radiant skin.
          </p>
        </div>

        {/* ── Carousel Slider Navigation Controls ── */}
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="text-xs text-[#0B1A28] font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#12602F] animate-pulse" />
            <span>Community Stories ({filteredReviews.length})</span>
          </div>

          <div className="flex items-center gap-2">
         

            <button
              onClick={handlePrev}
              disabled={filteredReviews.length <= cardsPerView}
              className="w-9 h-9 rounded-full border border-brand-dark/20 flex items-center justify-center text-brand-dark hover:bg-brand-cream-dark hover:text-white hover:border-brand-cream-dark transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Previous Review"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              disabled={filteredReviews.length <= cardsPerView}
              className="w-9 h-9 rounded-full border border-brand-dark/20 flex items-center justify-center text-brand-dark hover:bg-brand-cream-dark hover:text-white hover:border-brand-cream-dark transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Next Review"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Carousel Track Container ── */}
        <div
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          className="relative overflow-hidden outline-none py-2"
        >
          {filteredReviews.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border border-dashed border-gray-300 my-4">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="font-serif text-xl font-medium text-[#0B1A28]">No reviews found</h3>
              <button
                onClick={() => setRatingFilter('all')}
                className="mt-4 px-4 py-2 rounded-full bg-[#0B1A28] text-white hover:bg-[#12602F] text-xs font-bold cursor-pointer transition-colors"
              >
                Show All Reviews
              </button>
            </div>
          ) : (
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`
              }}
            >
              {filteredReviews.map((review) => {
                const isUpvoted = upvotedIds[review.id];
                return (
                  <div
                    key={review.id}
                    className="shrink-0 px-2.5 sm:px-3"
                    style={{ width: `${100 / cardsPerView}%` }}
                  >
                    <div className="h-full bg-white rounded-md border border-brand-dark/5 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">

                      {/* 1. Customer Uploaded Product Photo Banner */}
                      <div
                        onClick={() =>
                          setLightboxPhoto({
                            photo: review.reviewPhoto,
                            author: review.author,
                            product: review.productBought,
                            quote: review.headline,
                            productImg: review.productImg
                          })
                        }
                        className="relative w-full h-48 sm:h-52 bg-[#F1EDE9] overflow-hidden cursor-pointer shrink-0 group/img flex items-center justify-center"
                      >
                        <img
                          src={review.reviewPhoto}
                          alt={`${review.author} - ${review.productBought}`}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (target.src !== review.productImg) {
                              target.src = review.productImg;
                            }
                          }}
                          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
                        />

                        {/* Top Left: Customer Upload Badge */}
                        <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#12602F] text-[10px] font-bold shadow-xs">
                          <span>📸</span>
                          <span>Customer Photo</span>
                        </div>

                        {/* Top Right: Usage Timeframe */}
                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-medium tracking-wide">
                          ✓ {review.timeframe}
                        </div>

                        {/* Center Hover Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1.5">
                          <span>🔍</span>
                          <span>Click to Enlarge</span>
                        </div>

                        {/* Bottom Banner Result Highlight */}
                        <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
                          <span className="bg-black/65 backdrop-blur-xs px-2.5 py-1 rounded-md text-white text-[11px] font-medium tracking-wide drop-shadow-sm inline-flex items-center gap-1.5 max-w-full">
                            <span className="text-amber-300 shrink-0">✦</span>
                            <span className="truncate">{review.keyResult}</span>
                          </span>
                        </div>
                      </div>

                      {/* 2. Structured Card Content Body */}
                      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                        <div>
                          {/* Mini Product Bar */}
                          <div className="bg-[#F2F5F8] rounded-md p-2 mb-4 border border-stone-200 flex items-center justify-between gap-2.5">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <img
                                src={review.productImg}
                                alt={review.productBought}
                                className="w-9 h-9 rounded-md object-cover bg-white border border-stone-200 shrink-0"
                              />
                              <div className="min-w-0">
                                <span className="text-[9px] font-bold tracking-wider text-[#A68A56] uppercase block truncate">
                                  {review.productCategory}
                                </span>
                                <span className="text-xs font-medium text-[#0B1A28] truncate block leading-tight">
                                  {review.productBought}
                                </span>
                              </div>
                            </div>

                            {onAddToCart && (
                              <button
                                onClick={() => {
                                  onAddToCart({
                                    id: review.productId,
                                    name: review.productBought,
                                    price: 34.0,
                                    img: review.productImg
                                  }, true);
                                }}
                                className="shrink-0 w-16 h-7 flex items-center justify-center text-[9px] font-bold uppercase tracking-widest rounded-none transition-colors bg-[#0B1A28] text-white hover:bg-black cursor-pointer"
                              >
                                Shop
                              </button>
                            )}
                          </div>

                          {/* Star Rating & Date */}
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex text-amber-500 text-sm tracking-tight drop-shadow-xs">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <span key={i} className={i < review.rating ? 'text-amber-400' : 'text-stone-300'}>
                                  ★
                                </span>
                              ))}
                            </div>
                            <span className="text-[10px] text-gray-400 font-mono">
                              {review.date}
                            </span>
                          </div>

                          {/* Headline */}
                          <h3 className="font-serif text-base sm:text-lg font-medium text-[#0B1A28] mb-2 leading-snug line-clamp-2 min-h-12">
                            "{review.headline}"
                          </h3>

                          {/* Review Comment */}
                          <p className="text-xs text-gray-500 font-light leading-relaxed mb-4 line-clamp-3 min-h-13.5">
                            {review.comment}
                          </p>
                        </div>

                        {/* 3. Footer: Customer Profile & Helpful Button */}
                        <div className="mt-auto pt-4 border-t border-stone-200 flex items-center justify-between gap-2 text-xs">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <img
                              src={review.avatar}
                              alt={review.author}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                              className="w-8 h-8 rounded-full object-cover border border-stone-200 shrink-0"
                            />
                            <div className="min-w-0">
                              <span className="font-semibold text-[#0B1A28] text-xs block truncate leading-tight">
                                {review.author}
                              </span>
                              <span className="text-[10px] text-gray-500 block truncate">
                                {review.location} • {review.skinType}
                              </span>
                            </div>
                          </div>

                          {/* Helpful Counter Button */}
                          <button
                            onClick={() => handleToggleHelpful(review.id)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all duration-200 cursor-pointer shrink-0 ${isUpvoted
                              ? 'bg-[#0B1A28] text-white shadow-xs'
                              : 'bg-[#F2F5F8] hover:bg-stone-200 text-stone-600 border border-stone-200'
                              }`}
                          >
                            <span>👍</span>
                            <span>{review.helpfulCount}</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Slide Progress Bar / Pagination Dots ── */}
        {filteredReviews.length > cardsPerView && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${isActive ? 'w-8 bg-[#0B1A28]' : 'w-2 bg-[#A68A56]/40 hover:bg-[#A68A56]'
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* ── Photo Lightbox Modal ── */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
          onClick={() => setLightboxPhoto(null)}
        >
          <div
            className="relative bg-white rounded-xl overflow-hidden max-w-2xl w-full shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxPhoto(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-black text-white flex items-center justify-center text-sm cursor-pointer transition-colors"
            >
              ✕
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div className="relative h-72 sm:h-auto bg-[#F4F3EE] flex items-center justify-center overflow-hidden">
                <img
                  src={lightboxPhoto.photo}
                  alt={`${lightboxPhoto.author} - ${lightboxPhoto.product}`}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (lightboxPhoto.productImg && target.src !== lightboxPhoto.productImg) {
                      target.src = lightboxPhoto.productImg;
                    }
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col justify-between bg-white">
                <div>
                  <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#12602F] bg-[#12602F]/10 px-2.5 py-1 rounded-full mb-3">
                    📸 Verified Customer Upload
                  </div>
                  <h4 className="font-serif text-lg font-medium text-[#0B1A28] mb-2">
                    "{lightboxPhoto.quote}"
                  </h4>
                  <p className="text-xs text-gray-500 mb-4">
                    Product photo uploaded by {lightboxPhoto.author} alongside their verified formulation review.
                  </p>
                  <div className="p-3 bg-[#F2F5F8] rounded-xl border border-stone-200">
                    <span className="text-[10px] uppercase font-bold text-[#A68A56] block">
                      Product Formulation
                    </span>
                    <span className="text-xs font-semibold text-[#0B1A28] block mt-0.5">
                      {lightboxPhoto.product}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => setLightboxPhoto(null)}
                    className="w-full py-2.5 rounded-none bg-[#0B1A28] text-white text-xs font-bold uppercase tracking-wider hover:bg-black transition-colors cursor-pointer"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── "Write a Review" Interactive Submission Modal ── */}
      {isWriteModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={writeModalTitleId}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in"
          onClick={() => setIsWriteModalOpen(false)}
        >
          <div
            className="relative bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#A68A56]/20 my-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsWriteModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-black w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm cursor-pointer transition-colors"
            >
              ✕
            </button>

            {writeSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#12602F]/15 text-[#12602F] flex items-center justify-center text-3xl mx-auto mb-4 animate-bounce">
                  ✨
                </div>
                <h3 className="font-serif text-2xl font-medium text-[#0B1A28] mb-2">
                  Thank You For Your Voice
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 max-w-sm mx-auto">
                  Your verified patron review and photo have been added to our community chronicle.
                </p>
              </div>
            ) : (
              <div>
                <div className="text-center mb-6">
                  <span className="text-[10px] font-bold tracking-widest text-[#A68A56] uppercase">
                    Morkins Community Voice
                  </span>
                  <h3 id={writeModalTitleId} className="font-serif text-2xl font-medium text-[#0B1A28] mt-1">
                    Share Your Ritual & Experience
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Help fellow patrons discover what works best for their skin biology.
                  </p>
                </div>

                <form onSubmit={handleAddReview} className="space-y-4">
                  {/* Star Rating Picker */}
                  <div>
                    <label className="text-xs font-semibold text-[#0B1A28] block mb-1.5">
                      Your Overall Rating
                    </label>
                    <div className="flex items-center gap-1.5 text-2xl text-amber-400 cursor-pointer">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setNewRating(star)}
                          className="hover:scale-125 transition-transform cursor-pointer"
                        >
                          {star <= newRating ? '★' : '☆'}
                        </button>
                      ))}
                      <span className="text-xs font-mono text-gray-400 ml-2">({newRating} of 5 Stars)</span>
                    </div>
                  </div>

                  {/* Product Selection */}
                  <div>
                    <label htmlFor="product-select" className="text-xs font-semibold text-[#0B1A28] block mb-1.5">
                      Product Formulation Reviewed
                    </label>
                    <select
                      id="product-select"
                      value={newProductId}
                      onChange={(e) => setNewProductId(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#0B1A28] focus:border-[#0B1A28] focus:ring-1 focus:ring-[#0B1A28] outline-none"
                    >
                      <option value={1}>Botanical Radiance Glow Serum</option>
                      <option value={2}>Bio-Active Barrier Repair Cream</option>
                      <option value={3}>Gentle Clarifying Foaming Wash</option>
                      <option value={4}>Hyaluronic Dew Plumping Elixir</option>
                      <option value={5}>Niacinamide Pore Tightening Serum</option>
                      <option value={6}>Bakuchiol Youth Restoring Oil</option>
                    </select>
                  </div>

                  {/* Author Name & Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="author-name-input" className="text-xs font-semibold text-[#0B1A28] block mb-1">
                        Your Name / Pseudonym
                      </label>
                      <input
                        id="author-name-input"
                        type="text"
                        required
                        placeholder="e.g. Genevieve L."
                        value={newAuthor}
                        onChange={(e) => setNewAuthor(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#0B1A28] focus:border-[#0B1A28] outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="location-input" className="text-xs font-semibold text-[#0B1A28] block mb-1">
                        Location
                      </label>
                      <input
                        id="location-input"
                        type="text"
                        placeholder="e.g. Zurich, Switzerland"
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#0B1A28] focus:border-[#0B1A28] outline-none"
                      />
                    </div>
                  </div>

                  {/* Skin Type & Timeframe */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="skin-type-input" className="text-xs font-semibold text-[#0B1A28] block mb-1">
                        Skin Type / Primary Concern
                      </label>
                      <input
                        id="skin-type-input"
                        type="text"
                        placeholder="e.g. Sensitive & Dehydrated"
                        value={newSkinType}
                        onChange={(e) => setNewSkinType(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#0B1A28] focus:border-[#0B1A28] outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="timeframe-input" className="text-xs font-semibold text-[#0B1A28] block mb-1">
                        Usage Duration
                      </label>
                      <input
                        id="timeframe-input"
                        type="text"
                        placeholder="e.g. Used for 3 weeks"
                        value={newTimeframe}
                        onChange={(e) => setNewTimeframe(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#0B1A28] focus:border-[#0B1A28] outline-none"
                      />
                    </div>
                  </div>

                  {/* Category Pill Tag */}
                  <div>
                    <label htmlFor="category-tag-select" className="text-xs font-semibold text-[#0B1A28] block mb-1">
                      Primary Benefit
                    </label>
                    <select
                      id="category-tag-select"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value as any)}
                      className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#0B1A28] focus:border-[#0B1A28] outline-none"
                    >
                      <option value="Glow">Glow & Radiance</option>
                      <option value="Barrier">Barrier Repair</option>
                      <option value="Hydration">Deep Hydration</option>
                      <option value="Sensitive">Sensitive & Calming</option>
                      <option value="Anti-Aging">Youth & Firmness</option>
                    </select>
                  </div>

                  {/* Review Headline */}
                  <div>
                    <label htmlFor="headline-input" className="text-xs font-semibold text-[#0B1A28] block mb-1">
                      Headline / One-Line Summary
                    </label>
                    <input
                      id="headline-input"
                      type="text"
                      required
                      placeholder="e.g. My redness completely calmed in 5 days!"
                      value={newHeadline}
                      onChange={(e) => setNewHeadline(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#0B1A28] focus:border-[#0B1A28] outline-none"
                    />
                  </div>

                  {/* Detailed Review Comment */}
                  <div>
                    <label htmlFor="review-body-input" className="text-xs font-semibold text-[#0B1A28] block mb-1">
                      Detailed Review
                    </label>
                    <textarea
                      id="review-body-input"
                      required
                      rows={4}
                      placeholder="Describe the texture, scent, skin feel, and visible changes you noticed..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#0B1A28] focus:border-[#0B1A28] outline-none resize-none"
                    />
                  </div>

                  {/* Key Result Highlight */}
                  <div>
                    <label htmlFor="key-result-input" className="text-xs font-semibold text-[#0B1A28] block mb-1">
                      Key Result Tag (Optional)
                    </label>
                    <input
                      id="key-result-input"
                      type="text"
                      placeholder="e.g. Soothed inflammation & zero flaking"
                      value={newKeyResult}
                      onChange={(e) => setNewKeyResult(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#0B1A28] focus:border-[#0B1A28] outline-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-none bg-[#0B1A28] hover:bg-black text-white text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md cursor-pointer active:scale-98"
                    >
                      Publish Verified Patron Review
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
