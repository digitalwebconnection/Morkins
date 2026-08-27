import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Sparkles, SlidersHorizontal, ArrowLeft } from 'lucide-react';
import { searchProducts } from '../../lib/api/search';
import ProductCard from '../products/components/ProductCard';
import LoadingSkeleton from '../products/components/LoadingSkeleton';
import type { ProductExtended } from '../../types';

interface SearchResultsPageProps {
  onAddToCart: (product: any, openCartAfter?: boolean) => void;
}

export default function SearchResultsPage({ onAddToCart }: SearchResultsPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawQuery = searchParams.get('q') || searchParams.get('search') || '';

  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<ProductExtended[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc' | 'rating'>('relevance');
  const [suggestedKeywords, setSuggestedKeywords] = useState<string[]>([]);
  const [categories, setCategories] = useState<{ name: string; count: number }[]>([]);

  // Fetch search results on query or filter change
  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);

    searchProducts(rawQuery, {
      category: selectedCategory,
      sortBy,
    })
      .then((data) => {
        if (!isCancelled) {
          setProducts(data.products);
          setCategories(data.categories);
          if (data.suggestedKeywords) {
            setSuggestedKeywords(data.suggestedKeywords);
          }
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setProducts([]);
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [rawQuery, selectedCategory, sortBy]);

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory((prev) => (prev === category ? '' : category));
  };

  const handleKeywordClick = (keyword: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('q', keyword);
    setSearchParams(newParams);
    setSelectedCategory('');
  };

  return (
    <div className="min-h-screen bg-[#FAFBF9]">
      {/* ── PART 1: SEARCH HEADER, KEYWORD QUERY & CATEGORY PILLS ── */}
      {/* Search breadcrumb, active keyword title, result counter, sort dropdown, and quick category pills */}
      <div className="bg-[#F4F8F5] border-b border-[#13442C]/10 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb back to shop */}
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#5E826D] hover:text-[#13442C] transition-colors mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Formulas</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#13442C]/15 text-[11px] font-bold uppercase tracking-wider text-[#13442C] mb-2 shadow-2xs">
                <Search className="w-3 h-3 text-[#1B6A45]" />
                <span>Search Results</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#162820] tracking-tight">
                {rawQuery ? (
                  <>
                    Results for <span className="text-[#13442C]">"{rawQuery}"</span>
                  </>
                ) : (
                  'All Clinical Formulations'
                )}
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                {isLoading
                  ? 'Searching through bio-active apothecary catalog...'
                  : `${products.length} formula${products.length === 1 ? '' : 's'} available`}
              </p>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-start md:self-auto bg-white px-3 py-2 rounded-xl border border-[#13442C]/15 shadow-2xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#5E826D]" />
              <label htmlFor="search-sort" className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Sort:
              </label>
              <select
                id="search-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-semibold text-[#162820] bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="relevance">Most Relevant</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          {categories.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedCategory('')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === ''
                    ? 'bg-[#13442C] text-white shadow-2xs'
                    : 'bg-white text-[#162820] border border-[#13442C]/15 hover:border-[#13442C]/40'
                }`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => handleCategoryFilter(cat.name)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedCategory === cat.name
                      ? 'bg-[#13442C] text-white font-bold shadow-2xs'
                      : 'bg-white text-stone-700 border border-[#13442C]/15 hover:border-[#13442C]/40'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === cat.name ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-500'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── PART 2: MATCHING BOTANICAL FORMULATIONS GRID ── */}
      {/* Renders ProductCards with loading skeleton states and direct 1-click cart triggers */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          /* ── PART 3: ZERO RESULTS & SUGGESTED SEARCH PROMPTS ── */
          /* Helpful suggestions, popular alternative keywords, and back-to-catalog button */
          <div className="text-center py-16 px-4 bg-white rounded-lg border border-[#13442C]/10 max-w-2xl mx-auto shadow-xs">
            <div className="w-16 h-16 rounded-full bg-[#D8EFE3] text-[#13442C] flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#162820] mb-2">
              No matching botanical formulas found
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mb-6 max-w-md mx-auto">
              We couldn't find any products matching "<strong>{rawQuery}</strong>". Try checking for spelling errors or searching for a broader term.
            </p>

            {/* Suggestions */}
            {suggestedKeywords.length > 0 && (
              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-wider text-[#5E826D] mb-3">
                  Recommended Botanical Searches:
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {suggestedKeywords.map((kw) => (
                    <button
                      key={kw}
                      type="button"
                      onClick={() => handleKeywordClick(kw)}
                      className="px-3.5 py-1.5 rounded-full bg-[#F0F6F2] hover:bg-[#D8EFE3] text-[#13442C] text-xs font-semibold transition-colors cursor-pointer"
                    >
                      {kw}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#13442C] hover:bg-[#1B6A45] text-white text-xs font-bold uppercase tracking-widest transition-colors shadow-xs hover:shadow-md"
            >
              <span>Explore All Formulas</span>
              <Sparkles className="w-3.5 h-3.5 text-[#D8EFE3]" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
