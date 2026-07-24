import { useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PRODUCTS_EXTENDED } from './data/products';
import ProductCard from './components/ProductCard';

interface ProductDetailsPageProps {
  onAddToCart: (product: any) => void;
}

export default function ProductDetailsPage({ onAddToCart }: ProductDetailsPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find the product by ID
  const product = useMemo(() => {
    return PRODUCTS_EXTENDED.find((p) => p.id === Number(id));
  }, [id]);

  // Find related products (same category, excluding current)
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return PRODUCTS_EXTENDED.filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4); // show up to 4 related products
  }, [product]);

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-brand-cream/20">
        <h2 className="text-3xl font-serif font-bold text-brand-dark mb-4">Product Not Found</h2>
        <p className="text-brand-dark/70 mb-8">We couldn't find the product you're looking for.</p>
        <button 
          onClick={() => navigate('/products')}
          className="px-8 py-3 bg-brand-dark text-white rounded-full font-semibold tracking-wide hover:bg-brand-dark/90 transition-colors"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream/20 pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        

        {/* Main Product Section */}
        <div className=" overflow-hidden flex flex-col lg:flex-row mb-16">
          
          {/* Left Side: Image */}
          <div className="w-full lg:w-1/2 bg-brand-cream/30 relative flex items-center justify-center p-12">
            <img 
              src={product.img} 
              alt={product.name} 
              className="w-full max-w-md object-contain mix-blend-multiply transition-transform duration-700 hover:scale-105"
            />
            {product.badge && (
              <span className="absolute top-6 left-6 bg-brand-dark text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm shadow-sm">
                {product.badge}
              </span>
            )}
          </div>

          {/* Right Side: Details */}
          <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
            <p className="text-sm font-semibold text-brand-light uppercase tracking-widest mb-3">
              {product.brand} • {product.category}
            </p>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-brand-dark leading-tight mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-1">
                <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold text-brand-dark">{product.rating}</span>
                <span className="text-sm text-brand-dark/60 ml-1">({product.reviewsCount} reviews)</span>
              </div>
              <div className="h-4 w-px bg-brand-dark/20"></div>
              <div className={`text-sm font-semibold ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </div>
            </div>

            <div className="flex items-end gap-3 mb-10">
              {product.discountPrice ? (
                <>
                  <span className="text-4xl font-bold text-brand-dark">${product.discountPrice.toFixed(2)}</span>
                  <span className="text-xl text-brand-dark/40 line-through mb-1">${product.price.toFixed(2)}</span>
                  <span className="text-sm font-semibold text-brand-light bg-brand-light/10 px-3 py-1.5 rounded mb-1.5 ml-2">
                    Save ${(product.price - product.discountPrice).toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-4xl font-bold text-brand-dark">${product.price.toFixed(2)}</span>
              )}
            </div>

            <div className="mb-10">
              <h3 className="text-lg font-semibold text-brand-dark mb-4">Product Description</h3>
              <p className="text-brand-dark/80 leading-relaxed text-lg mb-4">
                {product.description}
              </p>
              <p className="text-brand-dark/70 leading-relaxed">
                Formulated with high-quality, scientifically proven ingredients. Perfect for daily use to achieve a healthy, glowing complexion. This product has been rigorously tested to ensure safety and efficacy for all skin types. Cruelty-free, vegan, and free of parabens and sulfates.
              </p>
            </div>

            <button 
              onClick={() => onAddToCart(product)}
              disabled={!product.inStock}
              className={`w-full md:w-auto px-12 py-4 rounded-xl font-bold tracking-wide transition-all shadow-md flex items-center justify-center gap-3 ${
                product.inStock 
                  ? 'bg-brand-dark text-white hover:bg-brand-dark/90 hover:-translate-y-1 hover:shadow-xl' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
            
            {/* Additional Info Badges */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-brand-dark/10 pt-8">
              <div className="flex flex-col items-center text-center">
                <svg className="w-8 h-8 text-brand-light mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-xs text-brand-dark/80 font-medium uppercase tracking-wider">Dermatologist<br/>Tested</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <svg className="w-8 h-8 text-brand-light mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs text-brand-dark/80 font-medium uppercase tracking-wider">Cruelty<br/>Free</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <svg className="w-8 h-8 text-brand-light mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span className="text-xs text-brand-dark/80 font-medium uppercase tracking-wider">Sustainable<br/>Packaging</span>
              </div>
            </div>

          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-serif font-bold text-brand-dark">You May Also Like</h2>
              <Link to="/products" className="text-brand-light font-semibold hover:text-brand-dark transition-colors hidden sm:block">
                View All Products &rarr;
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(rp => (
                <ProductCard key={rp.id} product={rp} onAddToCart={onAddToCart} />
              ))}
            </div>
            
            <div className="mt-8 text-center sm:hidden">
              <Link to="/products" className="inline-block px-6 py-3 border-2 border-brand-dark text-brand-dark rounded-full font-semibold hover:bg-brand-dark hover:text-white transition-colors">
                View All Products
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
