import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PRODUCTS_EXTENDED, slugify, getProductUrl } from './data/products';
import ProductCard from './components/ProductCard';
import { useCart } from '../../hooks';

interface ProductDetailsPageProps {
  onAddToCart: (product: any, openCartAfter?: boolean) => void;
}

export default function ProductDetailsPage({ onAddToCart }: ProductDetailsPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cartItems } = useCart();

  // Find the product by SEO slug OR numeric ID (for full backwards compatibility)
  const product = useMemo(() => {
    if (!id) return undefined;
    const cleanParam = id.trim().toLowerCase();

    // 1. Match by explicit slug or slugified name
    const bySlug = PRODUCTS_EXTENDED.find(
      (p) => p.slug === cleanParam || slugify(p.name) === cleanParam
    );
    if (bySlug) return bySlug;

    // 2. Match by numeric ID (e.g. /products/1)
    const numericId = Number(id);
    if (!isNaN(numericId)) {
      return PRODUCTS_EXTENDED.find((p) => p.id === numericId);
    }

    return undefined;
  }, [id]);

  // Canonical SEO Redirection: If visited via numeric ID (/products/1), smoothly replace with SEO slug (/products/botanical-radiance-glow-serum)
  useEffect(() => {
    if (product && id && !isNaN(Number(id))) {
      const canonicalUrl = getProductUrl(product);
      navigate(canonicalUrl, { replace: true });
    }
  }, [id, product, navigate]);

  const cartItem = cartItems.find((item) => item.id === product?.id);
  const isMaxQty = (cartItem?.qty ?? 0) >= 5;

  // Find related products (same category, excluding current)
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return PRODUCTS_EXTENDED.filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4); // show up to 4 related products
  }, [product]);

  const [selectedImg, setSelectedImg] = useState<string | undefined>(undefined);

  // Scroll to top when product changes and reset selected image
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (product) {
      setSelectedImg(product.img);
    }
  }, [id, product]);

  const currentImage = selectedImg || product?.img;

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

        {/* ── PART 1: BREADCRUMB / BACK TO CATALOG BUTTON ── */}
        <button 
          onClick={() => navigate('/products')}
          className="inline-flex items-center gap-2 text-stone-500 hover:text-[#13442C] transition-colors mb-8 text-[11px] font-bold tracking-widest uppercase cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          BACK TO PRODUCTS
        </button>

        {/* ── PART 2: MAIN PRODUCT STAGE (GALLERY & DETAILS) ── */}
        <div className="flex flex-col lg:flex-row mb-16 gap-10 lg:gap-12 items-start">

          {/* ── PART 2A: FULL-SIZE PRODUCT MEDIA & ANGLE SWITCHER ── */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="relative w-full aspect-4/5 sm:aspect-square lg:aspect-4/5 rounded-3xl overflow-hidden shadow-sm border border-[#13442C]/10 bg-[#F0F6F2] group">
              <img
                src={currentImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              {product.badge && (
                <span className="absolute top-5 left-5 z-10 bg-[#13442C] text-[#D8EFE3] text-[9px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-md shadow-sm">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail switcher if secondary angle exists */}
            {product.hoverImg && (
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setSelectedImg(product.img)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer bg-[#F0F6F2] ${
                    currentImage === product.img
                      ? 'border-[#13442C] ring-2 ring-[#13442C]/20 scale-102 shadow-sm'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={product.img} alt={`${product.name} main view`} className="w-full h-full object-cover object-center" />
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedImg(product.hoverImg)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer bg-[#F0F6F2] ${
                    currentImage === product.hoverImg
                      ? 'border-[#13442C] ring-2 ring-[#13442C]/20 scale-102 shadow-sm'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={product.hoverImg} alt={`${product.name} alternate view`} className="w-full h-full object-cover object-center" />
                </button>
              </div>
            )}
          </div>

          {/* ── PART 2B: PRODUCT SPECIFICATIONS & ADD TO CART CTA ── */}
          <div className="w-full lg:w-1/2 py-2 lg:py-4 flex flex-col justify-center">
            <p className="text-[11px] font-bold text-[#5E826D] uppercase tracking-[0.2em] mb-3">
              {product.brand} • {product.category}
            </p>
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-[#13442C] leading-tight mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-1">
                <svg className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold text-[#162820]">{product.rating}</span>
                <span className="text-sm text-stone-500 ml-1">({product.reviewsCount} reviews)</span>
              </div>
              <div className="h-4 w-px bg-[#13442C]/20"></div>
              <div className={`text-sm font-semibold ${product.inStock ? 'text-emerald-700' : 'text-red-500'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </div>
            </div>

            <div className="flex items-end gap-3 mb-8">
              {product.discountPrice ? (
                <>
                  <span className="text-4xl font-bold text-[#13442C] font-mono">${product.discountPrice.toFixed(2)}</span>
                  <span className="text-xl text-stone-400 line-through mb-1 font-mono">${product.price.toFixed(2)}</span>
                  <span className="text-xs font-bold text-[#0D3322] bg-[#D8EFE3] px-3 py-1.5 rounded-full mb-1.5 ml-2 uppercase tracking-wide">
                    Save ${(product.price - product.discountPrice).toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-4xl font-bold text-[#13442C] font-mono">${product.price.toFixed(2)}</span>
              )}
            </div>

            <div className="mb-8">
              <h3 className="text-base font-semibold text-[#162820] mb-3">Product Description</h3>
              <p className="text-stone-600 leading-relaxed text-base mb-3">
                {product.description}
              </p>
              <p className="text-stone-500 text-sm leading-relaxed">
                Formulated with high-quality, scientifically proven ingredients. Perfect for daily use to achieve a healthy, glowing complexion. This product has been rigorously tested to ensure safety and efficacy for all skin types. Cruelty-free, vegan, and free of parabens and sulfates.
              </p>
            </div>

            <button
              onClick={() => onAddToCart({
                id: product.id,
                name: product.name,
                price: product.discountPrice || product.price,
                discountPrice: product.discountPrice,
                img: product.img
              })}
              disabled={!product.inStock || isMaxQty}
              className={`w-full md:w-auto px-12 py-4 rounded-full font-bold tracking-wide transition-all shadow-md flex items-center justify-center gap-3 uppercase ${
                isMaxQty
                  ? 'bg-stone-300 text-stone-600 cursor-not-allowed'
                  : product.inStock
                  ? 'bg-[#13442C] text-[#D8EFE3] hover:bg-[#1B6A45] hover:text-white hover:-translate-y-0.5 hover:shadow-xl cursor-pointer'
                  : 'bg-stone-200 text-stone-500 cursor-not-allowed'
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {isMaxQty ? 'Max Limit in Bag (5)' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>

            {/* ── PART 2C: BOTANICAL QUALITY TRUST BADGES ── */}
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-[#13442C]/10 pt-6">
              <div className="flex flex-col items-center text-center">
                <svg className="w-8 h-8 text-[#13442C] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-xs text-[#162820]/80 font-bold uppercase tracking-wider">Dermatologist<br />Tested</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <svg className="w-8 h-8 text-[#13442C] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs text-[#162820]/80 font-bold uppercase tracking-wider">Cruelty<br />Free</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <svg className="w-8 h-8 text-[#13442C] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span className="text-xs text-[#162820]/80 font-bold uppercase tracking-wider">Sustainable<br />Packaging</span>
              </div>
            </div>

          </div>
        </div>

        {/* ── PART 3: RELATED & COMPLEMENTARY PRODUCTS CAROUSEL ── */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-serif font-bold text-[#13442C]">You May Also Like</h2>
              <Link to="/products" className="text-[#5E826D] font-semibold hover:text-[#13442C] transition-colors hidden sm:block">
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
