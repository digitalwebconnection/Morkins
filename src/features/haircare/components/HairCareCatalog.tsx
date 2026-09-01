import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { PRODUCTS_EXTENDED, getProductUrl } from '../../products/data/products';

interface HairCareCatalogProps {
  onAddToCart: (product: { id: number; name: string; price: number; discountPrice?: number; img: string }, openCart?: boolean) => void;
}

export default function HairCareCatalog({ onAddToCart }: HairCareCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const hairCareProducts = useMemo(() => {
    const list = PRODUCTS_EXTENDED.filter((p) => p.department === 'men' || p.productType === 'haircare');
    if (selectedCategory === 'All') return list;
    return list.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(PRODUCTS_EXTENDED.filter(p => p.department === 'men').map(p => p.category)));
    return ['All', ...cats];
  }, []);

  return (
    <section id="haircare-catalog" className="py-16 sm:py-24 bg-[#09090B] text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-[#E5B869] uppercase tracking-[0.25em] mb-1.5 block">
              The Trichology Vault
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight">
              Men’s Clinical Hair & Scalp Collection
            </h2>
          </div>

          {/* Category Filter Pills (Obsidian Pill Buttons) */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#E5B869] text-black font-extrabold shadow-sm'
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hairCareProducts.map((prod) => {
            const activePrice = prod.discountPrice || prod.price;
            const hasDiscount = Boolean(prod.discountPrice && prod.discountPrice < prod.price);

            return (
              <div
                key={prod.id}
                className="bg-zinc-950 rounded-2xl border border-zinc-800 hover:border-[#E5B869]/60 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
              >
                {/* Full-Box Thumbnail Stage */}
                <div className="relative aspect-square w-full overflow-hidden bg-zinc-900">
                  <Link to={getProductUrl(prod)} className="block w-full h-full">
                    <img
                      src={prod.img}
                      alt={prod.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                  </Link>

                  {prod.badge && (
                    <span className="absolute top-3 left-3 bg-black/85 text-[#E5B869] border border-[#E5B869]/40 text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md">
                      {prod.badge}
                    </span>
                  )}

                  <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-xs px-2 py-0.5 rounded-md border border-zinc-800 text-[10px] font-bold text-[#E5B869] flex items-center gap-1 shadow-xs">
                    <span>★</span>
                    <span>{prod.rating}</span>
                  </div>
                </div>

                {/* Product Info & CTA */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-[9px] font-bold text-[#E5B869] uppercase tracking-widest block mb-1">
                      {prod.category}
                    </span>
                    <Link to={getProductUrl(prod)}>
                      <h4 className="font-serif text-base font-bold text-white group-hover:text-[#E5B869] transition-colors line-clamp-1">
                        {prod.name}
                      </h4>
                    </Link>
                    <p className="text-xs text-zinc-400 font-light line-clamp-2 mt-1.5 leading-relaxed">
                      {prod.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-800/80">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-serif text-lg font-bold text-[#E5B869]">
                        ${activePrice.toFixed(2)}
                      </span>
                      {hasDiscount && (
                        <span className="text-xs text-zinc-500 font-mono line-through">
                          ${prod.price.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => onAddToCart({
                        id: prod.id,
                        name: prod.name,
                        price: activePrice,
                        discountPrice: prod.discountPrice,
                        img: prod.img,
                      }, true)}
                      className="px-3.5 py-2 rounded-xl bg-linear-to-r from-[#E5B869] to-[#D97706] hover:from-[#FCD34D] hover:to-[#D97706] text-black text-[10px] font-extrabold uppercase tracking-widest transition-all cursor-pointer shadow-md active:scale-95 flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-black" />
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
