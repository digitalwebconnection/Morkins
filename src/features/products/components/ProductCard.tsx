import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProductExtended } from '../data/products';

interface ProductCardProps {
  product: ProductExtended;
  onAddToCart: (product: any, openCartAfter?: boolean) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/products/${product.id}`)}
      className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer border border-[#13442C]/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-[#F0F6F2] ">
        <img
          src={isHovered && product.hoverImg ? product.hoverImg : product.img}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
        />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-end items-start transition-opacity duration-500 group-hover:opacity-0">
          {product.badge && (
            <span className="bg-[#13442C] text-[#D8EFE3] text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
              {product.badge}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex flex-col grow">
        <p className="text-[10px] font-bold text-[#5E826D] uppercase tracking-widest mb-1.5">
          {product.category}
        </p>
        
        <h3 className="text-base sm:text-lg font-serif font-semibold text-[#162820] group-hover:text-[#13442C] transition-colors mb-1.5 line-clamp-1">
          {product.name}
        </h3>
        
        <p className="text-[11px] text-stone-500 mb-6 line-clamp-1 font-light tracking-wide">
          {product.description}
        </p>

        <div className="flex items-end justify-between mt-auto pt-2 border-t border-[#13442C]/10 gap-2">
          <div className="flex items-center flex-wrap gap-x-1.5 gap-y-0.5 min-w-0">
            <span className="text-lg font-bold text-[#13442C] font-mono leading-none">
              ${product.discountPrice ? product.discountPrice.toFixed(2) : product.price.toFixed(2)}
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
                price: product.discountPrice || product.price,
                discountPrice: product.discountPrice,
                img: product.img
              });
            }}
            disabled={!product.inStock}
            className={`shrink-0 px-4 h-8 flex items-center justify-center text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors shadow-2xs ${
              product.inStock 
                ? 'bg-[#13442C] text-[#D8EFE3] hover:bg-[#1B6A45] hover:text-white cursor-pointer' 
                : 'bg-stone-200 text-stone-500 cursor-not-allowed'
            }`}
          >
            {product.inStock ? 'ADD' : 'OUT'}
          </button>
        </div>
      </div>
    </div>
  );
}
