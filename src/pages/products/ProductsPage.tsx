import { useState, useEffect, useMemo } from 'react';
import HeroSection from './components/HeroSection';
import FilterSidebar, { type FilterState } from './components/FilterSidebar';
import ProductGrid from './components/ProductGrid';
import { PRODUCTS_EXTENDED } from './data/products';

interface ProductsPageProps {
  onAddToCart: (product: any) => void;
}

const ITEMS_PER_PAGE = 8;

export default function ProductsPage({ onAddToCart }: ProductsPageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  // Filtering State
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    category: '',
    brand: '',
    priceRange: [0, 100], // Will be updated dynamically
    rating: 0,
    inStockOnly: false
  });
  
  const [sortOption, setSortOption] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);

  // Extract unique categories and brands, and max price for filter setup
  const categories = useMemo(() => Array.from(new Set(PRODUCTS_EXTENDED.map(p => p.category))), []);
  const brands = useMemo(() => Array.from(new Set(PRODUCTS_EXTENDED.map(p => p.brand))), []);
  const maxPrice = useMemo(() => Math.ceil(Math.max(...PRODUCTS_EXTENDED.map(p => p.price))), []);

  // Initialize price range based on actual max price
  useEffect(() => {
    setFilters(prev => ({ ...prev, priceRange: [0, maxPrice] }));
  }, [maxPrice]);

  // Simulate loading state on initial mount or filter change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600); // Artificial delay for smooth skeleton loading demo
    return () => clearTimeout(timer);
  }, [filters, sortOption, currentPage]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortOption]);

  // Apply Filters & Sorting
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...PRODUCTS_EXTENDED];

    // Search
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q)
      );
    }

    // Category
    if (filters.category) {
      result = result.filter(p => p.category === filters.category);
    }

    // Brand
    if (filters.brand) {
      result = result.filter(p => p.brand === filters.brand);
    }

    // Price
    result = result.filter(p => {
      const activePrice = p.discountPrice || p.price;
      return activePrice >= filters.priceRange[0] && activePrice <= filters.priceRange[1];
    });

    // Rating
    if (filters.rating > 0) {
      result = result.filter(p => p.rating >= filters.rating);
    }

    // Stock
    if (filters.inStockOnly) {
      result = result.filter(p => p.inStock);
    }

    // Sort
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        break;
      case 'price-desc':
        result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        // Use default order or any specific featured logic
        break;
    }

    return result;
  }, [filters, sortOption]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);
  const currentProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleClearFilters = () => {
    setFilters({
      searchQuery: '',
      category: '',
      brand: '',
      priceRange: [0, maxPrice],
      rating: 0,
      inStockOnly: false
    });
    setSortOption('featured');
    setCurrentPage(1);
  };

  // Ensure body scroll is blocked when mobile filter drawer is open
  useEffect(() => {
    if (isMobileFiltersOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileFiltersOpen]);

  return (
    <div className="min-h-screen bg-brand-cream/20">
      <HeroSection />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-8">
        
        {/* Mobile Filter Toggle */}
        <div className="md:hidden flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-brand-dark/5">
          <span className="font-semibold text-brand-dark">Filters & Sorting</span>
          <button 
            onClick={() => setIsMobileFiltersOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-brand-dark text-white rounded-lg text-sm font-medium hover:bg-brand-dark/90 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </button>
        </div>

        {/* Mobile Filter Drawer Overlay */}
        {isMobileFiltersOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div 
              className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm transition-opacity"
              onClick={() => setIsMobileFiltersOpen(false)}
            ></div>
            <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-6 pb-12 shadow-xl animate-slide-left">
              <div className="flex items-center justify-between px-6 mb-6">
                <h2 className="text-xl font-serif font-bold text-brand-dark">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md text-brand-dark hover:bg-brand-cream transition-colors"
                  onClick={() => setIsMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="px-6 pb-6 border-b border-brand-dark/10 mb-6">
                <FilterSidebar 
                  filters={filters} 
                  setFilters={setFilters} 
                  categories={categories}
                  brands={brands}
                  maxPrice={maxPrice}
                  onClear={handleClearFilters}
                  className="shadow-none border-none p-0 bg-transparent"
                />
              </div>
              
              <div className="px-6 mt-auto pt-6">
                <button 
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="w-full bg-brand-dark text-white py-3 rounded-xl font-semibold tracking-wide hover:bg-brand-dark/90 transition-colors"
                >
                  View {filteredAndSortedProducts.length} Results
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Desktop Sidebar */}
        <div className="hidden md:block w-72 flex-shrink-0">
          <div className="sticky top-28">
            <FilterSidebar 
              filters={filters} 
              setFilters={setFilters} 
              categories={categories}
              brands={brands}
              maxPrice={maxPrice}
              onClear={handleClearFilters}
            />
          </div>
        </div>

        {/* Product Grid Area */}
        <ProductGrid 
          products={currentProducts}
          isLoading={isLoading}
          onClearFilters={handleClearFilters}
          onAddToCart={onAddToCart}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          sortOption={sortOption}
          onSortChange={setSortOption}
        />

      </div>
    </div>
  );
}
