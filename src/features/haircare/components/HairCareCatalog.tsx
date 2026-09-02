import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Sparkles } from 'lucide-react';
import { PRODUCTS_EXTENDED, getProductUrl } from '../../products/data/products';

interface HairCareCatalogProps {
  onAddToCart: (product: { id: number; name: string; price: number; discountPrice?: number; img: string }, openCart?: boolean) => void;
}

export default function HairCareCatalog({ onAddToCart }: HairCareCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [addedId, setAddedId] = useState<number | null>(null);

  const hairCareProducts = useMemo(() => {
    const list = PRODUCTS_EXTENDED.filter((p) => p.department === 'men' || p.productType === 'haircare');
    if (selectedCategory === 'All') return list;
    return list.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(PRODUCTS_EXTENDED.filter(p => p.department === 'men').map(p => p.category)));
    return ['All', ...cats];
  }, []);

  const handleAdd = (prod: any) => {
    onAddToCart({
      id: prod.id,
      name: prod.name,
      price: prod.discountPrice || prod.price,
      discountPrice: prod.discountPrice,
      img: prod.img,
    }, true);

    setAddedId(prod.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section id="haircare-catalog" className="py-8 sm:py-14 select-none relative overflow-hidden bg-white">

      {/* Ambient background light */}
      <div
        className="absolute top-1/4 right-0 w-125 h-75 pointer-events-none opacity-25 blur-3xl"
        style={{
          background: 'radial-gradient(ellipse, rgba(196,154,108,0.15) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 relative z-10">

        {/* Header + Filters */}
        <div className="flex flex-col md:flex-row  items-center text-center justify-center mb-5 gap-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#FAF5EF] border border-[#EDE4D8] mb-2 shadow-2xs">
              <Sparkles className="w-3 h-3 text-[#A67C52]" />
              <span className="text-[9px] font-bold text-[#A67C52] uppercase tracking-[0.25em] font-mono">
                The Trichology Vault
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-[#1A1210]">
              Men's Clinical Hair &{' '}
              <span
                className="italic"
                style={{
                  background: 'linear-gradient(135deg, #8B5A2B 0%, #C49A6C 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Scalp Collection
              </span>
            </h2>
          </div>


        </div>
        {/* Category pills */}
        <div className="flex items-center gap-2 justify-center  flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${selectedCategory === cat
                  ? 'bg-[#2C1810] text-white shadow-md scale-105'
                  : 'bg-[#FAF8F5] text-[#7A6E64] hover:text-[#2C1810] border border-[#EDE4D8] hover:border-[#D9C7B6] hover:shadow-xs'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 mt-8 lg:grid-cols-4 gap-5 sm:gap-6">
          {hairCareProducts.slice(0, 4).map((prod) => {
            const activePrice = prod.discountPrice || prod.price;
            const hasDiscount = Boolean(prod.discountPrice && prod.discountPrice < prod.price);
            const isJustAdded = addedId === prod.id;

            return (
              <div
                key={prod.id}
                className="group rounded-xl border border-[#EDE4D8] hover:border-[#C49A6C]/70 overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(44,24,16,0.08)] flex flex-col justify-between bg-white relative"
                style={{ boxShadow: '0 4px 18px rgba(44,24,16,0.53)' }}
              >
                {/* Image */}
                <div className="relative aspect-square w-full overflow-hidden bg-[#FAF7F2]">
                  <Link to={getProductUrl(prod)} className="block w-full h-full">
                    <img
                      src={prod.img}
                      alt={prod.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                  </Link>

                  {prod.badge && (
                    <span
                      className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[8px] font-extrabold uppercase tracking-wider text-white shadow-sm"
                      style={{
                        background: 'linear-gradient(135deg, #2C1810 0%, #3D2516 100%)',
                        boxShadow: '0 2px 8px rgba(44,24,16,0.25)',
                      }}
                    >
                      {prod.badge}
                    </span>
                  )}

                  <div
                    className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-white/90 border border-[#EDE4D8] text-[10px] font-bold text-[#A67C52] flex items-center gap-1 shadow-sm backdrop-blur-md"
                  >
                    <Star className="w-3 h-3 fill-current text-[#C49A6C]" />
                    <span>{prod.rating}</span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-[8px] font-bold text-[#A67C52] uppercase tracking-[0.2em] block mb-1.5 font-mono">
                      {prod.category}
                    </span>
                    <Link to={getProductUrl(prod)}>
                      <h4 className="font-serif text-sm font-bold text-[#1A1210] group-hover:text-[#7A4E2D] transition-colors line-clamp-1">
                        {prod.name}
                      </h4>
                    </Link>
                    <p className="text-[11px] text-[#7A6E64] font-light line-clamp-2 mt-1.5 leading-relaxed">
                      {prod.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#F0E8DF]">
                    <div className="flex items-baseline gap-1.5">
                      <span
                        className="font-serif text-lg font-bold"
                        style={{
                          background: 'linear-gradient(135deg, #8B5A2B 0%, #A67C52 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        ${activePrice.toFixed(2)}
                      </span>
                      {hasDiscount && (
                        <span className="text-[10px] text-[#C4B8AC] font-mono line-through">
                          ${prod.price.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleAdd(prod)}
                      disabled={isJustAdded}
                      className={`px-4 py-2 rounded-xl text-[9px] font-extrabold uppercase tracking-widest transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 text-white ${isJustAdded
                          ? 'bg-[#16A34A] shadow-[0_4px_12px_rgba(22,163,74,0.25)]'
                          : 'hover:scale-[1.05] hover:shadow-[0_4px_14px_rgba(44,24,16,0.2)]'
                        }`}
                      style={!isJustAdded ? {
                        background: 'linear-gradient(135deg, #2C1810 0%, #3D2516 100%)',
                      } : undefined}
                    >
                      <ShoppingBag className="w-3 h-3 text-[#C49A6C]" />
                      <span>{isJustAdded ? 'Added' : 'Add'}</span>
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
