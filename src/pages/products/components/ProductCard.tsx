import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProductExtended } from '../data/products';

interface ProductCardProps {
  product: ProductExtended;
  onAddToCart: (product: any) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/products/${product.id}`)}
      className="group flex flex-col bg-white rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-brand-cream/30">
        <img
          src={isHovered ? product.hoverImg : product.img}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.badge && (
            <span className="bg-brand-dark text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm">
              {product.badge}
            </span>
          )}
          {product.discountPrice && (
            <span className="bg-brand-light text-brand-dark text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm">
              Sale
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm text-brand-dark hover:bg-white transition-colors z-10"
        >
          <svg 
            className={`w-5 h-5 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'fill-none'}`} 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Quick Actions (Hover) */}
        <div className={`absolute bottom-4 left-4 right-4 flex gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/products/${product.id}`);
            }}
            className="flex-1 bg-white/90 backdrop-blur-sm text-brand-dark py-2.5 rounded-lg text-xs font-semibold tracking-wide hover:bg-white transition-colors shadow-sm"
          >
            Quick View
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            disabled={!product.inStock}
            className={`flex-1 ${product.inStock ? 'bg-brand-dark text-white hover:bg-brand-dark/90' : 'bg-gray-300 text-gray-500 cursor-not-allowed'} py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-colors shadow-sm`}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <p className="text-xs font-semibold text-brand-light uppercase tracking-wider">
            {product.category}
          </p>
          <div className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs font-medium text-brand-dark/70">{product.rating}</span>
          </div>
        </div>

        <h3 className="text-lg font-serif font-semibold text-brand-dark mb-1 line-clamp-1">
          {product.name}
        </h3>
        
        <p className="text-sm text-brand-dark/90 mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>

        <div className="flex items-center gap-2 mt-auto">
          {product.discountPrice ? (
            <>
              <span className="text-lg font-bold text-brand-dark">${product.discountPrice.toFixed(2)}</span>
              <span className="text-sm text-brand-dark/40 line-through">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-lg font-bold text-brand-dark">${product.price.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
