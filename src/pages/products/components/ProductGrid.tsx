import type { ProductExtended } from '../data/products';
import ProductCard from './ProductCard';
import EmptyState from './EmptyState';
import LoadingSkeleton from './LoadingSkeleton';
import Pagination from './Pagination';

interface ProductGridProps {
  products: ProductExtended[];
  isLoading: boolean;
  onClearFilters: () => void;
  onAddToCart: (product: any) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  sortOption: string;
  onSortChange: (option: string) => void;
}

export default function ProductGrid({
  products,
  isLoading,
  onClearFilters,
  onAddToCart,
  currentPage,
  totalPages,
  onPageChange,
  sortOption,
  onSortChange
}: ProductGridProps) {
  
  return (
    <div className="flex-1 w-full">
      {/* Top Bar (Count & Sort) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <p className="text-brand-dark/70 font-medium">
          Showing <span className="font-bold text-brand-dark">{products.length}</span> result{products.length !== 1 ? 's' : ''}
        </p>
        
        <div className="flex items-center space-x-2">
          <label htmlFor="sort" className="text-sm font-medium text-brand-dark">Sort by:</label>
          <div className="relative">
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none bg-white border border-brand-dark/20 text-brand-dark text-sm rounded-lg focus:ring-brand-dark focus:border-brand-dark block w-full py-2 pl-3 pr-10 outline-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-brand-dark">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <LoadingSkeleton />
      ) : products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={onAddToCart} 
              />
            ))}
          </div>
          
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={onPageChange} 
          />
        </>
      ) : (
        <div className="animate-fade-in">
          <EmptyState onClearFilters={onClearFilters} />
        </div>
      )}
    </div>
  );
}
