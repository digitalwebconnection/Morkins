import React from 'react';

export interface FilterState {
  searchQuery: string;
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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-serif font-semibold text-brand-dark">Filters</h2>
        <button
          onClick={onClear}
          className="text-sm text-brand-dark/60 hover:text-brand-dark underline transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Search */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-brand-dark mb-2">Search</label>
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={filters.searchQuery}
            onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
            className="w-full px-4 py-2.5 rounded-lg border border-brand-dark/20 focus:border-brand-dark focus:ring-1 focus:ring-brand-dark outline-none transition-all text-sm"
          />
          <svg className="absolute right-3 top-2.5 h-5 w-5 text-brand-dark/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-brand-dark mb-3">Category</label>
        <div className="space-y-2.5">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center group cursor-pointer">
              <input
                type="checkbox"
                checked={filters.category === cat}
                onChange={() => handleCategoryChange(cat)}
                className="w-4 h-4 rounded border-brand-dark/30 text-brand-dark focus:ring-brand-dark focus:ring-offset-0 cursor-pointer"
              />
              <span className="ml-3 text-sm text-brand-dark/80 group-hover:text-brand-dark transition-colors">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-brand-dark mb-3">Rating</label>
        <div className="space-y-2.5">
          {[5, 4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center group cursor-pointer">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === rating}
                onChange={() => handleRatingChange(rating)}
                className="w-4 h-4 border-brand-dark/30 text-brand-dark focus:ring-brand-dark cursor-pointer"
              />
              <span className="ml-3 flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm text-brand-dark/70">& Up</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Stock Status */}
      <div>
        <label className="flex items-center group cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => setFilters(prev => ({ ...prev, inStockOnly: e.target.checked }))}
            className="w-4 h-4 rounded border-brand-dark/30 text-brand-dark focus:ring-brand-dark focus:ring-offset-0 cursor-pointer"
          />
          <span className="ml-3 text-sm font-medium text-brand-dark group-hover:text-brand-dark/80 transition-colors">In Stock Only</span>
        </label>
      </div>
    </div>
  );
}
