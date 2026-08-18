import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProductExtended } from '../data/products';

interface ProductCardProps {
  product: ProductExtended;
  onAddToCart: (product: any) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/products/${product.id}`)}
      className="group flex flex-col bg-white rounded-md overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer border border-brand-dark/5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-[#F1EDE9]">
        <img
          src={isHovered && product.hoverImg ? product.hoverImg : product.img}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start transition-opacity duration-500 group-hover:opacity-0">
          <span className="bg-[#0B1A28] text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
            {product.category}
          </span>
          {product.badge && (
            <span className="bg-white text-[#0B1A28] text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
              {product.badge}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-[10px] font-bold text-[#A68A56] uppercase tracking-widest mb-1.5">
          {product.category}
        </p>
        
        <h3 className="text-lg md:text-xl font-serif font-medium text-[#0B1A28] mb-1.5 line-clamp-1">
          {product.name}
        </h3>
        
        <p className="text-[11px] text-gray-500 mb-6 line-clamp-1 font-light tracking-wide">
          {product.description}
        </p>

        <div className="flex items-end justify-between mt-auto gap-2">
          <div className="flex items-center flex-wrap gap-x-1.5 gap-y-0.5 min-w-0">
            <span className="text-lg font-bold text-[#A68A56] leading-none">
              ${product.discountPrice ? product.discountPrice.toFixed(2) : product.price.toFixed(2)}
            </span>
            {product.discountPrice && (
              <span className="text-[11px] text-gray-400 line-through leading-none">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            disabled={!product.inStock}
            className={`shrink-0 w-16 h-8 flex items-center justify-center text-[9px] font-bold uppercase tracking-widest rounded-none transition-colors ${
              product.inStock 
                ? 'bg-[#0B1A28] text-white hover:bg-black' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {product.inStock ? 'ADD' : 'OUT'}
          </button>
        </div>
      </div>
    </div>
  );
}
