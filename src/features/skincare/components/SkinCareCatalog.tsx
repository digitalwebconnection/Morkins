import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, Check, Sparkles, Star, ArrowUpDown } from 'lucide-react';
import { PRODUCTS_EXTENDED, getProductUrl } from '../../products/data/products';

interface SkinCareCatalogProps {
  onAddToCart: (product: { id: number; name: string; price: number; discountPrice?: number; img: string }, openCart?: boolean) => void;
}

export default function SkinCareCatalog({ onAddToCart }: SkinCareCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedConcern, setSelectedConcern] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [addedProductId, setAddedProductId] = useState<number | null>(null);

  // All skincare products
  const allSkinCare = useMemo(() => {
    return PRODUCTS_EXTENDED.filter((p) => p.department === 'women' || p.productType === 'skincare');
  }, []);

  // Filtered list
  const filteredProducts = useMemo(() => {
    let list = [...allSkinCare];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Concern filter
    if (selectedConcern !== 'All') {
      if (selectedConcern === 'radiance') {
        list = list.filter((p) => [1, 3, 4, 8].includes(p.id));
      } else if (selectedConcern === 'barrier') {
        list = list.filter((p) => [2, 7, 10, 12].includes(p.id));
      } else if (selectedConcern === 'antiaging') {
        list = list.filter((p) => [6, 8, 11, 12].includes(p.id));
      } else if (selectedConcern === 'clarifying') {
        list = list.filter((p) => [3, 5, 7, 9].includes(p.id));
      }
    }

    // Sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    } else if (sortBy === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return list;
  }, [allSkinCare, searchQuery, selectedCategory, selectedConcern, sortBy]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(allSkinCare.map((p) => p.category).filter(Boolean)));
    return ['All', ...cats];
  }, [allSkinCare]);

  const handleAdd = (prod: typeof PRODUCTS_EXTENDED[0]) => {
    const activePrice = prod.discountPrice || prod.price;
    onAddToCart({
      id: prod.id,
      name: prod.name,
      price: activePrice,
      discountPrice: prod.discountPrice,
      img: prod.img,
    }, true);

    setAddedProductId(prod.id);
    setTimeout(() => setAddedProductId(null), 1800);
  };

  return (
    <section id="skincare-catalog" className="py-16 sm:py-24 bg-[#FAF8F4] border-b border-[#EAE3D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-xs font-bold text-[#8C6221] uppercase tracking-[0.25em] mb-1.5 block">
              The Complete Apothecary Collection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#123624] font-normal leading-tight">
              Women’s Clinical Botanical Formulations
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-light mt-1">
              Cold-pressed, pharmaceutical-grade skincare crafted for radiant skin barrier health.
            </p>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search formulas or actives..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9.5 pr-4 py-2 text-xs rounded-full bg-white border border-[#DDD3C1] text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#12602F] focus:ring-1 focus:ring-[#12602F]"
              />
            </div>

            {/* Sort Select */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-3.5 pr-8 py-2 text-xs font-bold uppercase tracking-wider rounded-full bg-white border border-[#DDD3C1] text-stone-700 focus:outline-none focus:border-[#12602F] cursor-pointer appearance-none"
              >
                <option value="featured">Featured</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <ArrowUpDown className="w-3 h-3 text-stone-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Filter Tabs Bar */}
        <div className="space-y-4 mb-10 pb-6 border-b border-[#EAE3D2]">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 shrink-0 mr-1">
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#12602F] text-white shadow-xs'
                    : 'bg-white text-stone-600 hover:bg-[#F2EFE7] border border-[#DDD3C1]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Concern Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 shrink-0 mr-1">
              Skin Concern:
            </span>
            {[
              { id: 'All', label: 'All Concerns' },
              { id: 'radiance', label: '✨ Glass Skin Glow' },
              { id: 'barrier', label: '🛡️ Barrier Repair' },
              { id: 'antiaging', label: '🌿 Anti-Aging Firming' },
              { id: 'clarifying', label: '💧 Pore Clarifying' },
            ].map((con) => (
              <button
                key={con.id}
                onClick={() => setSelectedConcern(con.id)}
                className={`px-3.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedConcern === con.id
                    ? 'bg-[#8C6221] text-white shadow-xs'
                    : 'bg-white/80 text-stone-600 hover:bg-[#EAE3D2] border border-[#DDD3C1]'
                }`}
              >
                {con.label}
              </button>
            ))}

            {(selectedCategory !== 'All' || selectedConcern !== 'All' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedConcern('All');
                  setSearchQuery('');
                }}
                className="text-[10px] font-bold text-stone-500 hover:text-stone-800 underline ml-2 cursor-pointer whitespace-nowrap"
              >
                Clear Filters
              </button>
            )}
          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 text-xs text-stone-500 font-mono">
          <span>Showing {filteredProducts.length} formulated products</span>
          <span>100% Vegan & Cold-Pressed</span>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#DDD3C1] p-8">
            <Sparkles className="w-8 h-8 text-[#8C6221] mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-[#1C2E1A]">No formulations match your filter</h3>
            <p className="text-xs text-stone-500 mt-1">Try resetting the category or concern filter to explore the full collection.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedConcern('All');
                setSearchQuery('');
              }}
              className="mt-4 px-5 py-2 rounded-full bg-[#12602F] text-white text-xs font-bold uppercase tracking-wider"
            >
              Show All Formulations
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => {
              const activePrice = prod.discountPrice || prod.price;
              const hasDiscount = Boolean(prod.discountPrice && prod.discountPrice < prod.price);
              const isAdded = addedProductId === prod.id;

              return (
                <div
                  key={prod.id}
                  className="bg-white rounded-2xl border border-[#DDD3C1] overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
                >
                  {/* Full-Box Thumbnail Stage with Image Hover Swap */}
                  <div className="relative aspect-square w-full overflow-hidden bg-[#FAF8F2]">
                    <Link to={getProductUrl(prod)} className="block w-full h-full relative">
                      <img
                        src={prod.img}
                        alt={prod.name}
                        className={`w-full h-full object-cover transition-opacity duration-500 ${
                          prod.hoverImg ? 'group-hover:opacity-0' : 'group-hover:scale-105 transition-transform'
                        }`}
                      />
                      {prod.hoverImg && (
                        <img
                          src={prod.hoverImg}
                          alt={`${prod.name} alternative`}
                          className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-105"
                        />
                      )}
                    </Link>

                    {prod.badge && (
                      <span className="absolute top-3 left-3 bg-[#12602F] text-[#D8EFE3] text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
                        {prod.badge}
                      </span>
                    )}

                    <div className="absolute top-3 right-3 bg-white/92 backdrop-blur-xs px-2 py-0.5 rounded-md border border-stone-200 text-[10px] font-bold text-amber-700 flex items-center gap-1 shadow-2xs">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{prod.rating || '4.9'}</span>
                    </div>
                  </div>

                  {/* Product Info & CTA */}
                  <div className="p-5 flex flex-col flex-1 justify-between space-y-3">
                    <div>
                      <span className="text-[9px] font-bold text-[#8C6221] uppercase tracking-widest block mb-1">
                        {prod.category}
                      </span>
                      <Link to={getProductUrl(prod)}>
                        <h4 className="font-serif text-base font-bold text-[#1C2E1A] group-hover:text-[#12602F] transition-colors line-clamp-1">
                          {prod.name}
                        </h4>
                      </Link>
                      <p className="text-xs text-stone-500 font-light line-clamp-2 mt-1.5 leading-relaxed">
                        {prod.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#EAE3D2]">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-serif text-lg font-bold text-[#12602F]">
                          ${activePrice.toFixed(2)}
                        </span>
                        {hasDiscount && (
                          <span className="text-xs text-stone-400 font-mono line-through">
                            ${prod.price.toFixed(2)}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleAdd(prod)}
                        disabled={isAdded}
                        className={`px-3.5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer shadow-2xs flex items-center gap-1.5 active:scale-95 ${
                          isAdded
                            ? 'bg-emerald-700 text-white'
                            : 'bg-[#12602F] hover:bg-[#1B6A45] text-white hover:shadow-md'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5 text-[#AFD971]" />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
