import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import FilterSidebar, { type FilterState } from './components/FilterSidebar';
import ProductGrid from './components/ProductGrid';
import { PRODUCTS_EXTENDED } from './data/products';

interface ProductsPageProps {
  onAddToCart: (product: any) => void;
}

const ITEMS_PER_PAGE = 8;

export default function ProductsPage({ onAddToCart }: ProductsPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearch = searchParams.get('search') || searchParams.get('q') || '';
  const urlDeptParam = (searchParams.get('department') || searchParams.get('gender') || searchParams.get('section') || '').toLowerCase();
  const initialDept = (urlDeptParam === 'women' || urlDeptParam === 'men') ? urlDeptParam : '';
  const urlCategory = searchParams.get('category') || '';

  const [isLoading, setIsLoading] = useState(true);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Filtering State
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: urlSearch,
    department: initialDept,
    category: urlCategory,
    brand: '',
    priceRange: [0, 100],
    rating: 0,
    inStockOnly: false
  });

  const [sortOption, setSortOption] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);

  // Sync state if URL search query or department changes from outside (e.g. Navbar navigation)
  useEffect(() => {
    const nextDept = (urlDeptParam === 'women' || urlDeptParam === 'men') ? urlDeptParam : '';
    setFilters(prev => ({
      ...prev,
      searchQuery: urlSearch,
      department: nextDept,
      category: urlCategory || (prev.department !== nextDept ? '' : prev.category)
    }));
  }, [urlSearch, urlDeptParam, urlCategory]);

  // Counts
  const womenCount = useMemo(() => PRODUCTS_EXTENDED.filter(p => p.department === 'women').length, []);
  const menCount = useMemo(() => PRODUCTS_EXTENDED.filter(p => p.department === 'men').length, []);

  // Extract categories dynamically based on selected department
  const categories = useMemo(() => {
    let sourceProducts = PRODUCTS_EXTENDED;
    if (filters.department === 'women') {
      sourceProducts = PRODUCTS_EXTENDED.filter(p => p.department === 'women');
    } else if (filters.department === 'men') {
      sourceProducts = PRODUCTS_EXTENDED.filter(p => p.department === 'men');
    }
    return Array.from(new Set(sourceProducts.map(p => p.category)));
  }, [filters.department]);

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
    }, 300);
    return () => clearTimeout(timer);
  }, [filters, sortOption, currentPage]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortOption]);

  // Update URL search parameters when department changes
  const handleDepartmentSwitch = (dept: 'women' | 'men' | '') => {
    setFilters(prev => ({
      ...prev,
      department: dept,
      category: '' // Reset subcategory on department change
    }));

    const newParams = new URLSearchParams(searchParams);
    if (dept) {
      newParams.set('department', dept);
    } else {
      newParams.delete('department');
      newParams.delete('gender');
      newParams.delete('section');
    }
    newParams.delete('category');
    setSearchParams(newParams);
  };

  const handleCategoryQuickFilter = (cat: string) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category === cat ? '' : cat
    }));

    const newParams = new URLSearchParams(searchParams);
    if (filters.category === cat) {
      newParams.delete('category');
    } else {
      newParams.set('category', cat);
    }
    setSearchParams(newParams);
  };

  // Apply Filters & Sorting
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...PRODUCTS_EXTENDED];

    // Department Filter (Women: Skincare, Men: Hair-Care)
    if (filters.department === 'women') {
      result = result.filter(p => p.department === 'women');
    } else if (filters.department === 'men') {
      result = result.filter(p => p.department === 'men');
    }

    // Search
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase().trim();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
      );
    }

    // Category
    if (filters.category) {
      result = result.filter(p => p.category.toLowerCase() === filters.category.toLowerCase());
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
      department: '',
      category: '',
      brand: '',
      priceRange: [0, maxPrice],
      rating: 0,
      inStockOnly: false
    });
    setSortOption('featured');
    setCurrentPage(1);
    setSearchParams(new URLSearchParams());
  };

  const handleRemoveSearch = () => {
    setFilters(prev => ({ ...prev, searchQuery: '' }));
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('search');
    newParams.delete('q');
    setSearchParams(newParams);
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
    <div className="min-h-screen bg-[#FCFBF8]">
      {/* Unified Luxury Hero Section with Dual Collection Cards & Category Quick Pills */}
      <HeroSection
        department={filters.department}
        activeCategory={filters.category}
        totalProducts={filteredAndSortedProducts.length}
        womenCount={womenCount}
        menCount={menCount}
        categories={categories}
        onSelectDepartment={handleDepartmentSwitch}
        onSelectCategory={handleCategoryQuickFilter}
      />

      {/* Main Catalog Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Mobile Filter Toggle */}
          <div className="md:hidden flex justify-between items-center bg-white p-4 rounded-2xl shadow-xs border border-brand-dark/10">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-brand-dark text-sm">Filters & Sorting</span>
              {filters.department && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#6F8C51]/10 text-[#6F8C51] font-medium uppercase">
                  {filters.department}
                </span>
              )}
            </div>
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-brand-dark text-white rounded-xl text-sm font-medium hover:bg-brand-dark/90 transition-colors cursor-pointer"
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
                    womenCount={womenCount}
                    menCount={menCount}
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
          <div className="hidden md:block w-72 shrink-0">
            <div className="sticky top-28">
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                categories={categories}
                brands={brands}
                maxPrice={maxPrice}
                onClear={handleClearFilters}
                womenCount={womenCount}
                menCount={menCount}
              />
            </div>
          </div>

          {/* Product Grid Area */}
          <div className="flex-1 min-w-0">
            {/* Active Filter Chips Bar */}
            {(filters.searchQuery || filters.department || filters.category) && (
              <div className="mb-6 flex flex-wrap items-center gap-2 p-3 bg-white border border-brand-dark/10 rounded-2xl shadow-2xs">
                <span className="text-xs font-medium text-brand-dark/70">Active Filters:</span>
                
                {/* Department Chip */}
                {filters.department && (
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-sans ${
                    filters.department === 'women'
                      ? 'bg-[#6F8C51]/15 border border-[#6F8C51]/30 text-[#6F8C51]'
                      : 'bg-stone-800 text-white'
                  }`}>
                    {filters.department === 'women' ? '👩 Women (Skincare)' : '👨 Men (Hair Care)'}
                    <button
                      onClick={() => handleDepartmentSwitch('')}
                      className="hover:opacity-75 transition-opacity p-0.5 rounded-full cursor-pointer ml-1"
                      title="Clear department filter"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}

                {/* Category Chip */}
                {filters.category && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 border border-stone-300 text-brand-dark rounded-full text-xs font-semibold font-sans">
                    Category: {filters.category}
                    <button
                      onClick={() => handleCategoryQuickFilter(filters.category)}
                      className="hover:text-red-500 transition-colors p-0.5 rounded-full cursor-pointer ml-1"
                      title="Clear category filter"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}

                {/* Search Query Chip */}
                {filters.searchQuery && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#6F8C51]/10 border border-[#6F8C51]/30 text-[#6F8C51] rounded-full text-xs font-bold font-sans">
                    "{filters.searchQuery}"
                    <button
                      onClick={handleRemoveSearch}
                      className="hover:text-black transition-colors p-0.5 rounded-full cursor-pointer ml-1"
                      title="Clear search filter"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}

                <button
                  onClick={handleClearFilters}
                  className="text-xs text-brand-dark/50 hover:text-brand-dark underline ml-auto cursor-pointer"
                >
                  Clear All
                </button>
              </div>
            )}

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
      </div>
    </div>
  );
}
