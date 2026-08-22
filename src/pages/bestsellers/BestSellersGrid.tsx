import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS_EXTENDED, type ProductExtended } from '../products/data/products';

interface BestSellersGridProps {
  onAddToCart: (product: { id: number; name: string; price: number; img: string }, openCart?: boolean) => void;
  onOpenQuickView: (product: ProductExtended) => void;
}

// Curated Best Seller IDs in rank order
const BEST_SELLER_IDS = [1, 4, 6, 2];

// Key botanical benefits for the best sellers
const BEST_SELLER_BENEFITS: Record<number, string> = {
  1: 'Luminosity & Glass Skin Finish',
  2: 'Ceramide Barrier Restoration',
  3: 'pH 5.5 Gentle Botanical Wash',
  4: 'Triple-Molecular Deep Hydration',
  5: '10% Niacinamide Pore Refiner',
  6: 'Encapsulated Pure Retinol',
  8: 'Gentle Plant-Derived Bio-Retinol',
  11: 'Multi-Peptide Collagen Booster',
};

export default function BestSellersGrid({ onAddToCart, onOpenQuickView }: BestSellersGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'rank' | 'rating' | 'reviews' | 'price-low' | 'price-high'>('rank');
  const [viewMode, setViewMode] = useState<'grid' | 'editorial'>('grid');
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [recentlyAddedId, setRecentlyAddedId] = useState<number | null>(null);

  const toggleWishlist = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleQuickAdd = (product: ProductExtended, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const activePrice = product.discountPrice || product.price;
    onAddToCart({
      id: product.id,
      name: product.name,
      price: activePrice,
      img: product.img
    }, true);

    setRecentlyAddedId(product.id);
    setTimeout(() => setRecentlyAddedId(null), 1200);
  };

  // Categories list
  const categories = ['All', 'Serums', 'Moisturizers', 'Treatments', 'Cleansers'];

  // Filtered & Sorted Best Sellers List
  const bestSellersList = useMemo(() => {
    // Only select the official best sellers
    let list = PRODUCTS_EXTENDED.filter(p => BEST_SELLER_IDS.includes(p.id));

    // Category filter
    if (selectedCategory !== 'All') {
      list = list.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Sorting
    if (sortBy === 'rank') {
      list.sort((a, b) => BEST_SELLER_IDS.indexOf(a.id) - BEST_SELLER_IDS.indexOf(b.id));
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
    } else if (sortBy === 'reviews') {
      list.sort((a, b) => b.reviewsCount - a.reviewsCount);
    } else if (sortBy === 'price-low') {
      list.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    }

    return list;
  }, [selectedCategory, sortBy]);

  return (
    <section id="master-grid" className="py-14 sm:py-20 bg-[#FCFBF8] border-b border-[#A68A56]/15 relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#6F8C51]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#A68A56]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A68A56]/10 border border-[#A68A56]/25 text-[11px] font-bold text-[#8B7443] uppercase tracking-[0.2em] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A68A56]" />
              The Official Leaderboard
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-brand-dark tracking-tight">
              Our Best-Selling Formulas
            </h2>
            <p className="text-xs sm:text-sm text-brand-dark/70 font-light mt-1.5 max-w-2xl">
              Ranked by over 50,000+ verified customer purchases, recurring routine subscriptions, and clinical dermatology trials.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs text-brand-dark/60 font-medium hidden sm:inline">
              Showing <strong className="text-brand-dark font-bold">{bestSellersList.length}</strong> icons
            </span>

            {/* Grid vs Editorial View Toggle */}
            <div className="flex items-center bg-[#F4F3EE] p-1 rounded-xl border border-[#A68A56]/20">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${viewMode === 'grid' ? 'bg-white text-brand-dark shadow-xs' : 'text-gray-400 hover:text-brand-dark'
                  }`}
                title="Grid View (4-Col)"
                aria-label="Grid View"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('editorial')}
                className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${viewMode === 'editorial' ? 'bg-white text-brand-dark shadow-xs' : 'text-gray-400 hover:text-brand-dark'
                  }`}
                title="Editorial View (2-Col)"
                aria-label="Editorial View"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── Filter Bar Ribbon ── */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-[#A68A56]/20 shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-dark/50 mr-1 hidden sm:inline">
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${selectedCategory === cat
                    ? 'bg-[#1C331B] text-[#AFD971] shadow-xs scale-100'
                    : 'bg-[#FCFBF8] text-brand-dark/70 hover:text-brand-dark hover:bg-gray-100 border border-gray-200/80'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-medium text-brand-dark/60">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#FCFBF8] border border-gray-200 text-brand-dark text-xs font-semibold px-3 py-1.5 rounded-xl outline-none cursor-pointer focus:border-[#6F8C51] shadow-2xs"
            >
              <option value="rank">👑 Best Seller Rank</option>
              <option value="rating">★ Highest Customer Rating</option>
              <option value="reviews">💬 Most Reviewed</option>
              <option value="price-low">💵 Price: Low to High</option>
              <option value="price-high">💎 Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* ── Product Cards Output ── */}
        {bestSellersList.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 p-8">
            <span className="text-3xl mb-3 block">🌿</span>
            <h3 className="font-serif text-xl text-brand-dark font-medium mb-1">No best sellers in this category</h3>
            <p className="text-xs text-brand-dark/60 mb-5">Try selecting "All" to view our complete award-winning lineup.</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="px-5 py-2 rounded-full bg-[#1C331B] text-[#AFD971] text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* ═════════════════ 4-COLUMN PREMIUM BEST SELLERS GRID ═════════════════ */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {bestSellersList.map((product) => {
              const activePrice = product.discountPrice || product.price;
              const hasDiscount = Boolean(product.discountPrice && product.discountPrice < product.price);
              const discountPercent = hasDiscount
                ? Math.round(((product.price - product.discountPrice!) / product.price) * 100)
                : 0;
              const rankIndex = BEST_SELLER_IDS.indexOf(product.id) + 1;
              const isWishlisted = wishlist.includes(product.id);
              const isJustAdded = recentlyAddedId === product.id;
              const benefitNote = BEST_SELLER_BENEFITS[product.id] || product.category;

              return (
                <div
                  key={product.id}
                  className="group relative flex flex-col bg-white rounded-xl overflow-hidden border border-[#A68A56]/20 hover:border-[#6F8C51]/50 shadow-[0_4px_20px_rgba(0,0,0,0.28)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] transition-all duration-500 hover:-translate-y-1"
                >
                  {/* Card Image Stage */}
                  <div className="relative aspect-square w-full overflow-hidden">
                    <Link to={`/products/${product.id}`} className="absolute inset-0">
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:opacity-0"
                      />
                      {product.hoverImg && (
                        <img
                          src={product.hoverImg}
                          alt={`${product.name} alternate view`}
                          className="w-full h-full object-cover absolute inset-0 opacity-0 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100"
                        />
                      )}
                    </Link>

                    {/* Rank Pill & Badges (Top-Left) */}
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                      {rankIndex <= 3 ? (
                        <span className="bg-linear-to-r from-[#1C331B] to-[#2E4A28] text-[#AFD971] text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs border border-[#AFD971]/30 flex items-center gap-1">
                          <span>🏆</span> #{rankIndex} Best Seller
                        </span>
                      ) : (
                        <span className="bg-white/90 backdrop-blur-xs text-[#8B7443] border border-[#A68A56]/30 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-2xs">
                          #{rankIndex} Best Seller
                        </span>
                      )}
                      {hasDiscount && (
                        <span className="bg-[#A68A56] text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full shadow-2xs self-start">
                          -{discountPercent}%
                        </span>
                      )}
                    </div>

                    {/* Wishlist Button (Top-Right) */}
                    <button
                      onClick={(e) => toggleWishlist(product.id, e)}
                      className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${isWishlisted
                          ? 'bg-rose-50 text-rose-600 shadow-md scale-110'
                          : 'bg-white/85 backdrop-blur-xs text-gray-400 hover:text-rose-500 hover:bg-white shadow-2xs'
                        }`}
                      aria-label="Wishlist"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isWishlisted ? '0' : '2'}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>

                    {/* Floating Quick View Bar (Appears on Hover) */}
                    <div className="absolute bottom-2.5 inset-x-2.5 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <button
                        onClick={() => onOpenQuickView(product)}
                        className="w-full py-2 bg-white/95 backdrop-blur-md hover:bg-white text-brand-dark text-[10px] font-bold uppercase tracking-wider rounded-xl shadow-md border border-[#A68A56]/20 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <svg className="w-3.5 h-3.5 text-[#6F8C51]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span>Quick View</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-col flex-1 p-4 sm:p-5">
                    {/* Category & Rating */}
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold text-[#6F8C51] uppercase tracking-widest">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] font-bold text-brand-dark">
                        <span className="text-amber-500">★</span>
                        <span>{product.rating}</span>
                        <span className="text-gray-400 font-normal text-[10px]">({product.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Product Name */}
                    <Link to={`/products/${product.id}`} className="block">
                      <h3 className="font-serif text-base font-semibold text-brand-dark group-hover:text-[#6F8C51] transition-colors line-clamp-1 leading-snug">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Botanical Benefit Highlight Note */}
                    <div className="mt-1.5 mb-2 text-[11px] font-medium text-[#8B7443] flex items-center gap-1.5 line-clamp-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8B7443]/60 shrink-0" />
                      <span className="truncate">{benefitNote}</span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-brand-dark/65 font-light line-clamp-2 leading-relaxed flex-1">
                      {product.description}
                    </p>

                    {/* Bottom: Price & Add to Bag */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-base font-bold font-mono text-brand-dark">
                            ${activePrice.toFixed(2)}
                          </span>
                          {hasDiscount && (
                            <span className="text-xs text-gray-400 font-mono line-through">
                              ${product.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={(e) => handleQuickAdd(product, e)}
                        disabled={isJustAdded}
                        className={`px-3.5 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-2xs cursor-pointer flex items-center gap-1.5 ${isJustAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#1C331B] hover:bg-[#6F8C51] text-white hover:shadow-md active:scale-95'
                          }`}
                        title="Add to Shopping Bag"
                      >
                        {isJustAdded ? (
                          <>
                            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <circle cx="9" cy="21" r="1" />
                              <circle cx="20" cy="21" r="1" />
                              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                            </svg>
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ═════════════════ 2-COLUMN EDITORIAL MAGAZINE VIEW ═════════════════ */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {bestSellersList.map((product) => {
              const activePrice = product.discountPrice || product.price;
              const hasDiscount = Boolean(product.discountPrice && product.discountPrice < product.price);
              const rankIndex = BEST_SELLER_IDS.indexOf(product.id) + 1;
              const isJustAdded = recentlyAddedId === product.id;
              const benefitNote = BEST_SELLER_BENEFITS[product.id] || product.category;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl overflow-hidden border border-[#A68A56]/20 shadow-xs hover:shadow-xl transition-all duration-500 flex flex-col sm:flex-row"
                >
                  {/* Left: Image */}
                  <div className="sm:w-5/12 bg-linear-to-b from-[#F4F3EE]/80 to-[#FCFBF8] p-6 flex items-center justify-center relative aspect-square sm:aspect-auto">
                    <Link to={`/products/${product.id}`} className="w-full h-full flex items-center justify-center">
                      <img
                        src={product.img}
                        alt={product.name}
                        className="max-h-52 max-w-full object-contain transition-transform duration-500 hover:scale-105"
                      />
                    </Link>
                    <span className="absolute top-3 left-3 bg-[#1C331B] text-[#AFD971] text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                      #{rankIndex} Best Seller
                    </span>
                  </div>

                  {/* Right: Info */}
                  <div className="sm:w-7/12 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold text-[#6F8C51] uppercase tracking-widest">
                          {product.category}
                        </span>
                        <div className="flex items-center gap-1 text-xs font-bold text-brand-dark">
                          <span className="text-amber-500">★</span>
                          <span>{product.rating}</span>
                          <span className="text-gray-400 font-normal">({product.reviewsCount})</span>
                        </div>
                      </div>

                      <Link to={`/products/${product.id}`}>
                        <h3 className="font-serif text-xl sm:text-2xl font-semibold text-brand-dark hover:text-[#6F8C51] transition-colors leading-tight mb-2">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="mb-3 text-xs font-semibold text-[#8B7443] flex items-center gap-1.5">
                        <span>✨</span>
                        <span>{benefitNote}</span>
                      </div>

                      <p className="text-xs text-brand-dark/70 font-light leading-relaxed mb-4">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold font-mono text-brand-dark">
                          ${activePrice.toFixed(2)}
                        </span>
                        {hasDiscount && (
                          <span className="text-xs text-gray-400 font-mono line-through">
                            ${product.price.toFixed(2)}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onOpenQuickView(product)}
                          className="px-3.5 py-2 border border-gray-200 hover:border-brand-dark text-brand-dark text-[11px] font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                        >
                          Quick View
                        </button>
                        <button
                          onClick={(e) => handleQuickAdd(product, e)}
                          disabled={isJustAdded}
                          className={`px-4 py-2 text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${isJustAdded
                              ? 'bg-emerald-600 text-white'
                              : 'bg-[#1C331B] hover:bg-[#6F8C51] text-white shadow-xs hover:shadow-md'
                            }`}
                        >
                          {isJustAdded ? 'Added' : 'Add to Bag'}
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
    </section>
  );
}
