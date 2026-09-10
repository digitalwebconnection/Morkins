import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductUrl, type ProductExtended } from '../data/products';

interface ProductCardProps {
  product: ProductExtended | any;
  onAddToCart: (product: any, openCartAfter?: boolean) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const inStock = product.inStock !== false;
  const activePrice = product.discountPrice || product.price;

  return (
    <div
      onClick={() => navigate(getProductUrl(product))}
      className="group relative flex flex-col h-full bg-white rounded-md overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 border border-brand-dark/5 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden flex items-center justify-center transition-all duration-500 bg-[#F1EDE9]">
        <img
          src={isHovered && product.hoverImg ? product.hoverImg : product.img}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-all duration-700 ease-out transform group-hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <p className="text-[10px] font-bold text-[#A68A56] uppercase tracking-widest mb-1.5">
          {product.category}
        </p>

        <h3 className="text-lg md:text-xl font-serif font-medium text-[#0B1A28] mb-1.5 line-clamp-1 group-hover:text-[#A68A56] transition-colors">
          {product.name}
        </h3>

        {/* 1-2 line short description */}
        <p className="text-[11px] text-gray-500 mb-2.5 line-clamp-2 font-light tracking-wide leading-relaxed">
          {product.description}
        </p>

        {/* Key Ingredients */}
        {product.keyIngredients && product.keyIngredients.length > 0 && (
          <div className="flex flex-wrap items-center gap-1 mb-4">
            <span className="text-[9px] font-bold text-[#A68A56] uppercase tracking-wider mr-0.5">
              Actives:
            </span>
            {product.keyIngredients.slice(0, 3).map((ing: string, idx: number) => (
              <span
                key={idx}
                className="text-[9.5px] font-medium px-2 py-0.5 rounded-full bg-[#13442C]/5 text-[#13442C] border border-[#13442C]/10"
              >
                {ing}
              </span>
            ))}
          </div>
        )}

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
            disabled={!inStock}
            className={`shrink-0 w-16 h-8 flex items-center justify-center text-[9px] font-bold uppercase tracking-widest rounded-none transition-colors ${inStock
                ? 'bg-[#0B1A28] text-white hover:bg-black cursor-pointer'
                : 'bg-stone-300 text-stone-600 cursor-not-allowed'
              }`}
          >
            {inStock ? 'ADD' : 'OUT'}
          </button>
        </div>
      </div>
    </div>
  );
}

