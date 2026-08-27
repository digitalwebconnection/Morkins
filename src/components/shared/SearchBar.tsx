import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import { searchProducts } from '../../lib/api/search';
import type { ProductExtended } from '../../types';

interface SearchBarProps {
  placeholder?: string;
  onClose?: () => void;
  className?: string;
  autoFocus?: boolean;
}

export default function SearchBar({
  placeholder = 'Search clinical serums, scalp tonics, ingredients...',
  onClose,
  className = '',
  autoFocus = false,
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ProductExtended[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced search trigger
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const handler = setTimeout(async () => {
      try {
        const data = await searchProducts(trimmed);
        setResults(data.products.slice(0, 5));
      } catch {
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 220);

    return () => clearTimeout(handler);
  }, [query]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanQuery = query.trim();
    if (cleanQuery) {
      navigate(`/search?q=${encodeURIComponent(cleanQuery)}`);
      setIsOpen(false);
      if (onClose) onClose();
    }
  };

  const handleSelectProduct = (productId: number) => {
    navigate(`/products/${productId}`);
    setIsOpen(false);
    if (onClose) onClose();
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setSelectedIndex(-1);
    if (inputRef.current) inputRef.current.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > -1 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0 && results[selectedIndex]) {
        e.preventDefault();
        handleSelectProduct(results[selectedIndex].id);
      } else {
        handleSearchSubmit();
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      if (onClose) onClose();
    }
  };

  const popularSearches = [
    'Radiance Glow Serum',
    'Hyaluronic Elixir',
    'Retinol Renewal',
    'Scalp Vitality',
    'Barrier Cream',
  ];

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Search Input Bar */}
      <form
        onSubmit={handleSearchSubmit}
        className="relative flex items-center bg-white rounded-full border border-[#13442C]/20 shadow-xs focus-within:border-[#13442C] focus-within:ring-2 focus-within:ring-[#13442C]/15 transition-all overflow-hidden"
      >
        <div className="pl-4 text-[#13442C]/70">
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-[#13442C]" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full py-2.5 pl-3 pr-10 text-sm text-[#162820] placeholder:text-stone-400 bg-transparent focus:outline-none"
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-12 p-1 text-stone-400 hover:text-stone-600 rounded-full transition-colors cursor-pointer"
            aria-label="Clear search query"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        <button
          type="submit"
          className="mr-1.5 px-4 py-1.5 rounded-full bg-[#13442C] hover:bg-[#1B6A45] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
        >
          Search
        </button>
      </form>

      {/* Live Dropdown Results */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-[#13442C]/15 overflow-hidden z-50 animate-fade-in divide-y divide-stone-100">
          {query.trim() ? (
            <div>
              {results.length > 0 ? (
                <div className="py-2">
                  <div className="px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#5E826D] flex items-center justify-between">
                    <span>Matching Formulas</span>
                    <span>{results.length} quick matches</span>
                  </div>
                  {results.map((product, index) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product.id)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`px-4 py-2.5 flex items-center gap-3 cursor-pointer transition-colors ${
                        selectedIndex === index ? 'bg-[#F0F6F2]' : 'hover:bg-stone-50'
                      }`}
                    >
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded-lg bg-[#FAFBF9] border border-stone-200/60 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-[#162820] truncate">
                          {product.name}
                        </p>
                        <p className="text-[11px] text-[#5E826D] mt-0.5">
                          {product.category} • {product.brand}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-extrabold text-[#13442C]">
                          ${(product.discountPrice || product.price).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* View all results button */}
                  <div className="p-2 border-t border-stone-100 bg-[#FAFBF9]">
                    <button
                      type="button"
                      onClick={() => handleSearchSubmit()}
                      className="w-full py-2 px-4 rounded-xl bg-[#13442C] hover:bg-[#1B6A45] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <span>View all results for "{query}"</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                !isLoading && (
                  <div className="p-6 text-center">
                    <p className="text-xs text-stone-500">
                      No matching formulas found for "<strong>{query}</strong>".
                    </p>
                    <button
                      type="button"
                      onClick={() => handleSearchSubmit()}
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#13442C] hover:underline"
                    >
                      <span>Explore all search results</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )
              )}
            </div>
          ) : (
            /* Recent / Popular Suggested Keywords */
            <div className="p-4">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#5E826D] mb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-[#13442C]" />
                <span>Trending Apothecary Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((keyword) => (
                  <button
                    key={keyword}
                    type="button"
                    onClick={() => {
                      setQuery(keyword);
                      navigate(`/search?q=${encodeURIComponent(keyword)}`);
                      setIsOpen(false);
                      if (onClose) onClose();
                    }}
                    className="px-3 py-1.5 rounded-full bg-[#F0F6F2] hover:bg-[#D8EFE3] text-[#13442C] text-xs font-medium transition-colors cursor-pointer"
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
