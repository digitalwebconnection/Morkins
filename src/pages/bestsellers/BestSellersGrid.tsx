import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS_EXTENDED, type ProductExtended } from '../products/data/products';

interface BestSellersGridProps {
  onAddToCart: (product: { id: number; name: string; price: number; img: string }, openCart?: boolean) => void;
}

export default function BestSellersGrid({ onAddToCart }: BestSellersGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('rating');

  // Filter top-rated / bestselling items (rating >= 4.8 or badge present)
  const bestSellersList = useMemo(() => {
    let list = PRODUCTS_EXTENDED.filter(p => p.rating >= 4.8 || p.badge === 'Best Seller' || p.badge === 'Trending' || p.badge === 'Popular');

    if (selectedCategory !== 'All') {
      list = list.filter(p => p.category === selectedCategory);
    }

    if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
    } else if (sortBy === 'price-low') {
      list.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    } else if (sortBy === 'reviews') {
      list.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return list;
  }, [selectedCategory, sortBy]);

  const categories = ['All', 'Serums', 'Moisturizers', 'Treatments', 'Cleansers'];

  return (
    <section className="py-16 bg-[#F4F3EE]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-[12px] font-bold text-[#A68A56] uppercase tracking-[0.2em] mb-2 block">
              Top Ranked Skincare
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-brand-dark">
              Shop The Complete Best Sellers Collection
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#6F8C51] text-white shadow-xs'
                    : 'bg-white text-brand-dark/70 hover:text-brand-dark hover:bg-gray-100 border border-brand-dark/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Toolbar: Counter + Sort */}
        <div className="flex items-center justify-between pb-4 mb-8 border-b border-brand-dark/10 text-xs font-semibold text-brand-dark/70">
          <span>Showing <strong className="text-brand-dark">{bestSellersList.length}</strong> top-rated products</span>

          <div className="flex items-center gap-2">
            <span>Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-brand-dark/20 text-brand-dark px-3 py-1.5 rounded-lg outline-none cursor-pointer focus:border-[#6F8C51]"
            >
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviewed</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellersList.map((product: ProductExtended) => {
            const activePrice = product.discountPrice || product.price;

            return (
              <div
                key={product.id}
                className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-brand-dark/10 hover:border-[#6F8C51]/40 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5"
              >
                {/* Product Image & Badges */}
                <div className="relative aspect-square w-full overflow-hidden bg-[#F4F3EE] p-6 flex items-center justify-center">
                  <Link to={`/products/${product.id}`} className="w-full h-full flex items-center justify-center">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-108"
                    />
                  </Link>

                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-[#A68A56] text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                      {product.badge}
                    </span>
                  )}

                  {/* Rating Pill */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full text-[10px] font-bold text-brand-dark flex items-center gap-1 shadow-xs">
                    <span className="text-yellow-400">★</span>
                    <span>{product.rating}</span>
                  </div>
                </div>

                {/* Info & Action */}
                <div className="flex flex-col flex-1 p-5">
                  <span className="text-[10px] font-bold text-[#6F8C51] uppercase tracking-wider mb-1">
                    {product.category}
                  </span>

                  <Link to={`/products/${product.id}`}>
                    <h3 className="font-serif text-base font-semibold text-brand-dark group-hover:text-[#6F8C51] transition-colors line-clamp-1 leading-snug">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-xs text-brand-dark/60 font-light mt-1.5 line-clamp-2 leading-relaxed flex-1">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-brand-dark/10">
                    <div>
                      <span className="text-base font-bold font-mono text-brand-dark">
                        ${activePrice.toFixed(2)}
                      </span>
                      {product.discountPrice && (
                        <span className="text-xs text-gray-400 font-mono line-through ml-2">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => onAddToCart({
                        id: product.id,
                        name: product.name,
                        price: activePrice,
                        img: product.img
                      }, true)}
                      className="px-3 py-2 bg-brand-dark hover:bg-[#6F8C51] text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                      title="Add to Bag"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                      <span>Add</span>
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
