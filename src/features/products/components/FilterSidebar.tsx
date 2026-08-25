import React from 'react';

export interface FilterState {
  searchQuery: string;
  department: 'women' | 'men' | '';
  category: string;
  brand: string;
  priceRange: [number, number];
  rating: number;
  inStockOnly: boolean;
}

interface FilterSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  categories: string[];
  brands: string[];
  maxPrice: number;
  onClear: () => void;
  womenCount?: number;
  menCount?: number;
  className?: string;
}

export default function FilterSidebar({
  filters,
  setFilters,
  categories,
  onClear,
 
  className = ''
}: FilterSidebarProps) {


  const handleCategoryChange = (cat: string) => {
    setFilters(prev => ({ ...prev, category: prev.category === cat ? '' : cat }));
  }; 

  const handleRatingChange = (rating: number) => {
    setFilters(prev => ({ ...prev, rating: prev.rating === rating ? 0 : rating }));
  };

  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-brand-dark/5 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-brand-dark/5">
        <h2 className="text-xl font-serif font-semibold text-brand-dark flex items-center gap-2">
          <span>Filters</span>
          {(filters.department || filters.category || filters.searchQuery || filters.rating > 0 || filters.inStockOnly) && (
            <span className="w-2 h-2 rounded-full bg-[#6F8C51]"></span>
          )}
        </h2>
        <button
          onClick={onClear}
          className="text-xs font-semibold uppercase tracking-wider text-brand-dark/60 hover:text-brand-dark underline transition-colors cursor-pointer"
        >
          Clear All
        </button>
      </div>

 
      {/* Search */}
      <div className="mb-8">
        <label className="block text-xs font-bold uppercase tracking-wider text-brand-dark/70 mb-2">
          Search
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder={
              filters.department === 'women' 
                ? "Search skincare..." 
                : filters.department === 'men' 
                ? "Search haircare..." 
                : "Search products..."
            }
            value={filters.searchQuery}
            onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
            className="w-full pl-3.5 pr-9 py-2.5 rounded-xl border border-brand-dark/20 focus:border-[#6F8C51] focus:ring-2 focus:ring-[#6F8C51]/20 outline-none transition-all text-sm bg-stone-50/50"
          />
          <svg className="absolute right-3 top-3 h-4 w-4 text-brand-dark/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-dark/70">
            {filters.department === 'women'
              ? 'Skincare Categories'
              : filters.department === 'men'
              ? 'Hair Care Categories'
              : 'Categories'}
          </label>
          {filters.category && (
            <button
              onClick={() => setFilters(prev => ({ ...prev, category: '' }))}
              className="text-[11px] text-[#6F8C51] hover:underline cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center justify-between group cursor-pointer p-1.5 rounded-lg hover:bg-stone-50 transition-colors">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.category === cat}
                  onChange={() => handleCategoryChange(cat)}
                  className="w-4 h-4 rounded border-brand-dark/30 text-[#6F8C51] focus:ring-[#6F8C51] focus:ring-offset-0 cursor-pointer"
                />
                <span className={`ml-3 text-sm transition-colors ${
                  filters.category === cat ? 'font-semibold text-brand-dark' : 'text-brand-dark/80 group-hover:text-brand-dark'
                }`}>
                  {cat}
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="mb-8">
        <label className="block text-xs font-bold uppercase tracking-wider text-brand-dark/70 mb-3">Rating</label>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center group cursor-pointer p-1 rounded-lg hover:bg-stone-50 transition-colors">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === rating}
                onChange={() => handleRatingChange(rating)}
                className="w-4 h-4 border-brand-dark/30 text-[#6F8C51] focus:ring-[#6F8C51] cursor-pointer"
              />
              <span className="ml-3 flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className={`w-3.5 h-3.5 ${i < rating ? 'text-amber-400 fill-current' : 'text-stone-200'}`} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-xs text-brand-dark/70">& Up</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Stock Status */}
      <div className="pt-2 border-t border-brand-dark/5">
        <label className="flex items-center group cursor-pointer p-1.5 rounded-lg hover:bg-stone-50 transition-colors">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => setFilters(prev => ({ ...prev, inStockOnly: e.target.checked }))}
            className="w-4 h-4 rounded border-brand-dark/30 text-[#6F8C51] focus:ring-[#6F8C51] focus:ring-offset-0 cursor-pointer"
          />
          <span className="ml-3 text-sm font-medium text-brand-dark group-hover:text-brand-dark/80 transition-colors">In Stock Only</span>
        </label>
      </div>
    </div>
  );
}
