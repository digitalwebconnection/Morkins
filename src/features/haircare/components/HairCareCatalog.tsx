import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { PRODUCTS_EXTENDED, getProductUrl } from '../../products/data/products';

interface HairCareCatalogProps {
  onAddToCart: (product: { id: number; name: string; price: number; discountPrice?: number; img: string }, openCart?: boolean) => void;
}

export default function HairCareCatalog({ onAddToCart }: HairCareCatalogProps) {
  const navigate = useNavigate();
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
                  onClick={() => navigate(getProductUrl(prod))}
                  className="group relative flex flex-col h-full bg-white rounded-md overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 border border-brand-dark/5 cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative aspect-square w-full overflow-hidden flex items-center justify-center transition-all duration-500 bg-[#F1EDE9]">
                    <img
                      src={prod.hoverImg ? prod.hoverImg : prod.img}
                      alt={prod.name}
                      className="h-full w-full object-cover object-center transition-all duration-700 ease-out transform group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-col flex-1 p-6">
                    <p className="text-[10px] font-bold text-[#A68A56] uppercase tracking-widest mb-1.5">
                      {prod.category}
                    </p>

                    <h3 className="text-lg md:text-xl font-serif font-medium text-[#0B1A28] mb-1.5 line-clamp-1 group-hover:text-[#A68A56] transition-colors">
                      {prod.name}
                    </h3>

                    <p className="text-[11px] text-gray-500 mb-6 line-clamp-1 font-light tracking-wide">
                      {prod.description}
                    </p>

                    <div className="flex items-end justify-between mt-auto pt-2">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-bold text-[#A68A56] leading-none">
                          ${activePrice.toFixed(2)}
                        </span>
                        {hasDiscount && (
                          <span className="text-[11px] text-stone-400 line-through leading-none font-mono">
                            ${prod.price.toFixed(2)}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAdd(prod);
                        }}
                        className="shrink-0 w-16 h-8 flex items-center justify-center text-[9px] font-bold uppercase tracking-widest rounded-none transition-colors bg-[#0B1A28] text-white hover:bg-black cursor-pointer"
                      >
                        {isJustAdded ? 'ADDED' : 'ADD'}
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
