import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS_EXTENDED, getProductUrl, type ProductExtended } from '../products/data/products';

interface NewArrivalsGridProps {
  onAddToCart: (product: { id: number; name: string; price: number; discountPrice?: number; img: string }, openCart?: boolean) => void;
}

export default function NewArrivalsGrid({ onAddToCart }: NewArrivalsGridProps) {
  const navigate = useNavigate();
  const [selectedFilter] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [showAll, setShowAll] = useState(false);

  const newArrivalsList = useMemo(() => {
    let list = PRODUCTS_EXTENDED.filter(
      p => p.id >= 2 || p.badge === 'New' || p.badge === 'Clinical Grade' || p.badge === 'Top Rated' || p.badge === 'Hair Care'
    );

    if (selectedFilter !== 'All') {
      list = list.filter(p => p.category === selectedFilter);
    }

    if (sortBy === 'price-low') {
      list.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedFilter, sortBy]);

  const displayedList = useMemo(() => {
    return showAll ? newArrivalsList : newArrivalsList.slice(0, 4);
  }, [newArrivalsList, showAll]);


  return (
    <section className="py-8 lg:py-14 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FDFCFA 0%, #F8F5EF 50%, #FDFCFA 100%)' }}>

      {/* Background decoration */}
      <div className="absolute top-20 left-0 w-100 h-100 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(196,172,128,0.04) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row  justify-between mb-8 gap-8">
          <div className="max-w-xl">
            <p className="text-[16px] text-[#01442e] uppercase tracking-[0.2em] mb-3">
              Curated Collection
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-[#0C1B33] tracking-tight mt-2.5">
              Newly Launched Batch Formulations
            </h2>
          </div>

          {/* Toolbar */}
          <div className="flex items-center   ">

            <div className="flex items-center gap-2">

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white shadow-[#dbc598] shadow-lg border border-[#b6a891] text-[#1A1A1A] px-3.5 py-2 rounded-lg outline-none cursor-pointer focus:border-[#C4AC80] text-[11px] font-semibold"
              >
                <option value="featured">Featured Drops</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low → High</option>
                <option value="price-high">Price: High → Low</option>
              </select>
            </div>
          </div>
        </div>



        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {displayedList.map((product: ProductExtended) => {
            const activePrice = product.discountPrice || product.price;

            return (
              <div
                key={product.id}
                onClick={() => navigate(getProductUrl(product))}
                className="group relative flex flex-col h-full bg-white rounded-md overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 border border-brand-dark/5 cursor-pointer"
              >
                {/* Full-Bleed Product Image Container */}
                <div className="relative aspect-square w-full overflow-hidden flex items-center justify-center transition-all duration-500 bg-[#F1EDE9]">
                  <img
                    src={product.hoverImg ? product.hoverImg : product.img}
                    alt={product.name}
                    className="h-full w-full object-cover object-center transition-all duration-700 ease-out transform group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                {/* Product Info */}
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
                      {product.discountPrice && (
                        <span className="text-[11px] text-stone-400 line-through leading-none font-mono">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart({
                          id: product.id,
                          name: product.name,
                          price: activePrice,
                          discountPrice: product.discountPrice,
                          img: product.img,
                        });
                      }}
                      className="shrink-0 w-16 h-8 flex items-center justify-center text-[9px] font-bold uppercase tracking-widest rounded-none transition-colors bg-[#0B1A28] text-white hover:bg-black cursor-pointer"
                    >
                      ADD
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View More / View All Button */}
        {newArrivalsList.length > 4 && (
          <div className="flex flex-col items-center justify-center mt-12 gap-3">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-[0.18em] transition-all duration-300 shadow-[#f3e2bf] shadow-lg cursor-pointer bg-[#1A1A1A] hover:bg-[#184433] text-white flex items-center gap-2.5"
            >
              <span>
                {showAll ? 'Show Less Releases' : `View All Formulations (${newArrivalsList.length})`}
              </span>
              <svg
                className={`w-4 h-4 text-[#184433] transition-transform duration-300 ${
                  showAll ? 'rotate-180' : 'group-hover:translate-y-0.5'
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="text-[11px] font-medium text-[#8B7D65]">
              Showing <strong className="text-[#1A1A1A] font-bold">{displayedList.length}</strong> of <strong className="text-[#1A1A1A] font-bold">{newArrivalsList.length}</strong> new releases
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
