import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PRODUCTS_EXTENDED, getProductUrl, type ProductExtended } from '../products/data/products';

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
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'rank' | 'rating' | 'reviews' | 'price-low' | 'price-high'>('rank');
  const [viewMode, setViewMode] = useState<'grid' | 'editorial'>('grid');
  const [] = useState<number[]>([]);
  const [recentlyAddedId, setRecentlyAddedId] = useState<number | null>(null);


  const handleQuickAdd = (product: ProductExtended, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const activePrice = product.discountPrice || product.price;
    onAddToCart({
      id: product.id,
      name: product.name,
      price: activePrice,
      img: product.img
    });

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
    <section id="master-grid" className="py-12 sm:py-16 bg-[#FCFBF8] border-b border-[#D8CCB5]/40 relative">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4E7A52]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#C49746]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F4EFE6] border border-[#C9B387]/50 text-[11px] font-bold text-[#8C6D34] uppercase tracking-[0.2em] mb-3 shadow-[0_2px_8px_rgba(196,151,70,0.1)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C49746] animate-pulse" />
              The Official Leaderboard
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1C2E1A] tracking-tight">
              Our Best-Selling{' '}
              <span className="text-[#2D5A32]">
                Formulas
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-[#464D3F] font-normal mt-1.5 max-w-2xl leading-relaxed">
              Ranked by over 50,000+ verified customer purchases, recurring routine subscriptions, and clinical dermatology trials.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs text-[#464D3F] font-medium hidden sm:inline">
              Showing <strong className="text-[#1C2E1A] font-bold">{bestSellersList.length}</strong> icons
            </span>

            {/* Grid vs Editorial View Toggle */}
            <div className="flex items-center bg-[#F1ECE1] p-1 rounded-xl border border-[#D8CCB5]/80 shadow-2xs">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'grid' ? 'bg-[#1C331B] text-[#AFD971] shadow-xs' : 'text-[#5C6556] hover:text-[#1C331B]'
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
                className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'editorial' ? 'bg-[#1C331B] text-[#AFD971] shadow-xs' : 'text-[#5C6556] hover:text-[#1C331B]'
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
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-[#DDD3C1] shadow-[0_4px_20px_rgba(0,0,0,0.03)] mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A6353] mr-1 hidden sm:inline">
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1C331B] text-[#AFD971] border border-[#AFD971]/35 shadow-xs scale-100 font-bold'
                    : 'bg-[#FCFBF8] text-[#464D3F] hover:text-[#1C331B] hover:bg-[#F4F1E8] border border-[#DDD3C1]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-medium text-[#464D3F]">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#FCFBF8] border border-[#DDD3C1] text-[#1C2E1A] text-xs font-semibold px-3 py-1.5 rounded-xl outline-none cursor-pointer focus:border-[#4E7A52] shadow-2xs"
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
            <h3 className="font-serif text-xl text-[#1C2E1A] font-medium mb-1">No best sellers in this category</h3>
            <p className="text-xs text-[#464D3F] mb-5">Try selecting "All" to view our complete award-winning lineup.</p>
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
              const isJustAdded = recentlyAddedId === product.id;

              // Distinct multi-color rank themes for each best seller

              return (
                <div
                  key={product.id}
                  onClick={() => navigate(getProductUrl(product))}
                  className="group relative flex flex-col h-full bg-white rounded-md overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 border border-brand-dark/5 cursor-pointer"
                >
                  {/* Card Image Stage */}
                  <div className="relative aspect-square w-full overflow-hidden flex items-center justify-center transition-all duration-500 bg-[#F1EDE9]">
                    <img
                      src={product.hoverImg ? product.hoverImg : product.img}
                      alt={product.name}
                      className="h-full w-full object-cover object-center transition-all duration-700 ease-out transform group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-col flex-1 p-6">
                    <p className="text-[10px] font-bold text-[#A68A56] uppercase tracking-widest mb-1.5">
                      {product.category}
                    </p>

                    <h3 className="text-lg md:text-xl font-serif font-medium text-[#0B1A28] mb-1.5 line-clamp-1 group-hover:text-[#A68A56] transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-[11px] text-gray-500 mb-6 line-clamp-1 font-light tracking-wide">
                      {product.description}
                    </p>

                    <div className="flex items-end justify-between mt-auto pt-2">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-bold text-[#A68A56] leading-none">
                          ${activePrice.toFixed(2)}
                        </span>
                        {hasDiscount && (
                          <span className="text-[11px] text-stone-400 line-through leading-none font-mono">
                            ${product.price.toFixed(2)}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={(e) => handleQuickAdd(product, e)}
                        className="shrink-0 w-16 h-8 flex items-center justify-center text-[9px] font-bold uppercase tracking-widest rounded-none transition-colors bg-[#0B1A28] text-white hover:bg-black cursor-pointer"
                      >
                        {isJustAdded ? 'ADDED' : 'ADD'}
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

              const rankBadgeClasses = [
                'bg-[#8C6221] text-white',
                'bg-[#1C331B] text-[#AFD971]',
                'bg-[#944825] text-white',
                'bg-[#244C6B] text-white',
              ][(rankIndex - 1) % 4];

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#DDD3C1] shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-xl transition-all duration-500 flex flex-col sm:flex-row"
                >
                  {/* Left: Image (Fill in Box) */}
                  <div className="sm:w-5/12 bg-[#FAF8F2] relative aspect-square sm:aspect-auto overflow-hidden">
                    <Link to={getProductUrl(product)} className="w-full h-full flex items-center justify-center">
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </Link>
                    <span className={`absolute top-3 left-3 text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs ${rankBadgeClasses}`}>
                      #{rankIndex} Best Seller
                    </span>
                  </div>

                  {/* Right: Info */}
                  <div className="sm:w-7/12 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold text-[#2D5A32] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 uppercase tracking-widest">
                          {product.category}
                        </span>
                        <div className="flex items-center gap-1 text-xs font-bold text-[#8C6221] bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                          <span className="text-amber-500">★</span>
                          <span>{product.rating}</span>
                          <span className="text-[#8C6221]/70 font-normal">({product.reviewsCount})</span>
                        </div>
                      </div>

                      <Link to={getProductUrl(product)}>
                        <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#182617] hover:text-[#3B622E] transition-colors leading-tight mb-2">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="mb-3 text-xs font-semibold text-[#8C6221] bg-amber-50/70 border border-amber-200/60 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                        <span>✨</span>
                        <span>{benefitNote}</span>
                      </div>

                      <p className="text-xs text-[#464D3F] font-light leading-relaxed mb-4">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[#E5DEC9]">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-serif font-bold text-[#1C331B]">
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
                          className="px-3.5 py-2 border border-[#DDD3C1] hover:border-[#1C331B] text-[#1C2E1A] text-[11px] font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer bg-white"
                        >
                          Quick View
                        </button>
                        <button
                          onClick={(e) => handleQuickAdd(product, e)}
                          disabled={isJustAdded}
                          className={`px-4 py-2 text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                            isJustAdded
                              ? 'bg-emerald-600 text-white'
                              : 'bg-[#1C331B] hover:bg-[#2B4B27] text-[#AFD971] shadow-xs hover:shadow-md'
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
