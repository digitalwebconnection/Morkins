import { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Crown,
  Star,
  MessageSquare,
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  ChevronDown,
  Check
} from 'lucide-react';
import { PRODUCTS_EXTENDED, getProductUrl, type ProductExtended } from '../products/data/products';

interface BestSellersGridProps {
  onAddToCart: (product: { id: number; name: string; price: number; img: string }, openCart?: boolean) => void;
}

// Curated Best Seller IDs in rank order
const BEST_SELLER_IDS = [1, 4, 6, 2];

type SortOption = 'rank' | 'rating' | 'reviews' | 'price-low' | 'price-high';

const SORT_OPTIONS: { value: SortOption; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: 'rank', label: 'Best Seller Rank', icon: Crown },
  { value: 'rating', label: 'Highest Customer Rating', icon: Star },
  { value: 'reviews', label: 'Most Reviewed', icon: MessageSquare },
  { value: 'price-low', label: 'Price: Low to High', icon: ArrowDownNarrowWide },
  { value: 'price-high', label: 'Price: High to Low', icon: ArrowUpNarrowWide },
];

export default function BestSellersGrid({ onAddToCart }: BestSellersGridProps) {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<SortOption>('rank');
  const [isOpen, setIsOpen] = useState(false);
  const [recentlyAddedId, setRecentlyAddedId] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

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

  // Sorted Best Sellers List
  const bestSellersList = useMemo(() => {
    // Only select the official best sellers
    const list = PRODUCTS_EXTENDED.filter(p => BEST_SELLER_IDS.includes(p.id));

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
  }, [sortBy]);

  const currentOption = SORT_OPTIONS.find(opt => opt.value === sortBy) || SORT_OPTIONS[0];
  const CurrentOptionIcon = currentOption.icon;

  return (
    <section id="master-grid" className="py-12 sm:py-16 bg-white relative">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#12602F]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#A68A56]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Header & Sort Order ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-6">
          <div>
            <p className="text-[16px] font-bold text-[#184433] uppercase tracking-[0.2em] mb-3">
              BEST SELLERS
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#0B1A28] leading-tight">
              Our Best-Selling Formulas
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 font-normal mt-1.5 max-w-2xl leading-relaxed">
              Ranked by over 50,000+ verified customer purchases, recurring routine subscriptions, and clinical dermatology trials.
            </p>
          </div>

          {/* Custom Sort Dropdown with Lucide Icons */}
          <div className="flex items-center gap-2.5 shrink-0 self-start md:self-end">
            <span className="text-xs font-semibold text-gray-600">Sort:</span>
            <div ref={dropdownRef} className="relative inline-block text-left">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                className="flex items-center gap-2 bg-[#F2F5F8] hover:bg-stone-100 border border-stone-200 text-black text-xs font-semibold px-3.5 py-2 rounded-xl transition-all cursor-pointer focus:border-[#A68A56] shadow-2xs"
              >
                <CurrentOptionIcon className="w-3.5 h-3.5 text-[#A68A56]" />
                <span>{currentOption.label}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-stone-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div
                  role="listbox"
                  className="absolute right-0 top-full mt-1.5 w-56 bg-white rounded-xl shadow-xl border border-stone-200/90 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                >
                  {SORT_OPTIONS.map((opt) => {
                    const isSelected = sortBy === opt.value;
                    const IconComponent = opt.icon;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => {
                          setSortBy(opt.value);
                          setIsOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs transition-colors cursor-pointer text-left ${
                          isSelected
                            ? 'bg-[#0B1A28]/5 text-[#0B1A28] font-bold'
                            : 'text-stone-600 hover:bg-[#F2F5F8] hover:text-[#0B1A28] font-medium'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <IconComponent className={`w-4 h-4 ${isSelected ? 'text-[#A68A56]' : 'text-stone-400'}`} />
                          <span>{opt.label}</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#184433]" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Product Cards Output (4-Column Grid) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {bestSellersList.map((product) => {
            const activePrice = product.discountPrice || product.price;
            const hasDiscount = Boolean(product.discountPrice && product.discountPrice < product.price);
            const isJustAdded = recentlyAddedId === product.id;

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

                  {/* Bestseller Badge Touching Top & Right Edges (No Top/Right Border) */}
                  <div className="absolute top-0 right-0 z-10 inline-flex items-center gap-1.5 bg-white border-b border-l border-orange-200 px-3.5 py-3 rounded-bl-lg shadow-sm">
                    <span className="text-xs font-black uppercase tracking-wider text-[#F97316] leading-none">
                      BESTSELLER
                    </span>
                    <Star className="w-4 h-4 fill-[#FDD835] text-[#FDD835] shrink-0" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-col flex-1 p-6">
                  <p className="text-[10px] font-bold text-[#A68A56] uppercase tracking-widest mb-1.5">
                    {product.category}
                  </p>

                  <h3 className="text-lg md:text-xl font-serif font-medium text-[#0B1A28] mb-1.5 line-clamp-1 group-hover:text-[#A68A56] transition-colors">
                    {product.name}
                  </h3>

                  {/* 1-2 line short description */}
                  <p className="text-[13px] text-gray-500 mb-2.5 line-clamp-2 font-light tracking-wide leading-relaxed">
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

      </div>
    </section>
  );
}
