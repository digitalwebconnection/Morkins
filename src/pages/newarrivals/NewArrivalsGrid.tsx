import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS_EXTENDED, type ProductExtended } from '../products/data/products';

interface NewArrivalsGridProps {
  onAddToCart: (product: { id: number; name: string; price: number; img: string }, openCart?: boolean) => void;
}

export default function NewArrivalsGrid({ onAddToCart }: NewArrivalsGridProps) {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [hoveredId, setHoveredId] = useState<number | null>(null);
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

  const categories = ['All', 'Serums', 'Moisturizers', 'Treatments', 'Masks'];

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
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#9e7427]" />
              <span className="text-sm font-bold text-[#926a1f] uppercase tracking-[0.3em]">
                Curated Collection
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1A1A] leading-[1.15] tracking-[-0.01em]">
              Newly Launched <br className="hidden sm:block" />
              <span className="text-[#b48320] font-bold">Batch </span>
              <span className="text-[#184433] font-bold">Formulations</span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center  gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedFilter(cat);
                  setShowAll(false);
                }}
                className={`px-6 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.12em] transition-all duration-300 shadow-[#f3e2bf] shadow-lg cursor-pointer ${selectedFilter === cat
                    ? 'bg-[#1A1A1A] text-white shadow-md'
                    : 'bg-white text-[#8B7D65] hover:text-[#1A1A1A] border border-[#beb9b0] hover:border-[#C4AC80]'
                  }`}
              >
                {cat}
              </button>
            ))}
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
            const isHovered = hoveredId === product.id;

            return (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative flex flex-col bg-white rounded-lg overflow-hidden  border border-[#E8E3D8] transition-all duration-500"
                style={{
                  boxShadow: isHovered
                    ? '0 20px 60px -15px rgba(26,26,26,0.12), 0 8px 25px -8px rgba(196,172,128,0.15)'
                    : '0 2px 22px -4px rgba(0,0,0,0.94)',
                  transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                  borderColor: isHovered ? '#D4CFC5' : '#E8E3D8',
                }}
              >
                {/* Full-Bleed Product Image Container */}
                <div className="relative aspect-4/4.5 sm:aspect-[4/4.2] w-full overflow-hidden bg-[#F5F2EB]">
                  <Link to={`/products/${product.id}`} className="w-full h-full block overflow-hidden">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out"
                      style={{ transform: isHovered ? 'scale(1.01)' : 'scale(1)' }}
                    />
                  </Link>

                  {/* Badge */}
                  <span className="absolute top-3.5 left-3.5 bg-[#1A1A1A] text-white text-[9px] font-extrabold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full shadow-md z-10">
                    {product.badge || 'New Drop'}
                  </span>

                  {/* Rating */}
                  <div className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-md border border-[#E0DAD0] px-2.5 py-1 rounded-full text-[10px] font-extrabold text-[#1A1A1A] flex items-center gap-1 shadow-md z-10">
                    <span className="text-[#C4AC80]">★</span>
                    <span>{product.rating}</span>
                  </div>

                  {/* Quick-add overlay on hover */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-3.5 z-10 transition-all duration-300"
                    style={{
                      opacity: isHovered ? 1 : 0,
                      transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
                    }}
                  >
                    <button
                      onClick={() => onAddToCart({
                        id: product.id,
                        name: product.name,
                        price: activePrice,
                        img: product.img
                      }, true)}
                      className="w-full py-2.5 bg-[#1A1A1A] hover:bg-[#2B2B2B] text-white text-[10px] font-bold uppercase tracking-[0.15em] rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xl"
                    >
                      <svg className="w-3.5 h-3.5 text-[#C4AC80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col flex-1 p-5 pt-4">
                  <span className="text-[10px] font-bold text-[#C4AC80] uppercase tracking-[0.15em] mb-1.5">
                    {product.category}
                  </span>

                  <Link to={`/products/${product.id}`}>
                    <h3 className="font-serif text-lg font-medium text-[#000000] group-hover:text-[#9B8A68] transition-colors leading-snug line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-[12px] text-[#1b1b1a]  mt-1.5 line-clamp-2 leading-relaxed flex-1">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#c9a55e]">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[15px] font-bold font-mono text-[#1A1A1A]">
                        ${activePrice.toFixed(2)}
                      </span>
                      {product.discountPrice && (
                        <span className="text-[11px] text-[#B5AFA3] font-mono line-through">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <Link
                      to={`/products/${product.id}`}
                      className="text-[10px] font-bold text-[#815d13] uppercase tracking-wider hover:text-[#1A1A1A] transition-colors flex items-center gap-1"
                    >
                      View
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
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
              className="group px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-[0.18em] transition-all duration-300 shadow-[#f3e2bf] shadow-lg cursor-pointer bg-[#1A1A1A] hover:bg-[#b48320] text-white flex items-center gap-2.5"
            >
              <span>
                {showAll ? 'Show Less Releases' : `View All Formulations (${newArrivalsList.length})`}
              </span>
              <svg
                className={`w-4 h-4 text-[#C4AC80] transition-transform duration-300 ${
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
