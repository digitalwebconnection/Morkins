import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProductUrl, type ProductExtended } from '../products/data/products';

interface BestSellersQuickViewProps {
  product: ProductExtended | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: { id: number; name: string; price: number; img: string }, openCart?: boolean) => void;
}

export default function BestSellersQuickView({ product, isOpen, onClose, onAddToCart }: BestSellersQuickViewProps) {
  const [selectedImg, setSelectedImg] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'howToUse'>('benefits');
  const [addedAnimation, setAddedAnimation] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedImg(product.img);
      setQuantity(1);
      setActiveTab('benefits');
      setAddedAnimation(false);
    }
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const currentPrice = product.discountPrice || product.price;
  const originalPrice = product.discountPrice ? product.price : undefined;
  const savings = originalPrice ? (originalPrice - currentPrice).toFixed(2) : null;

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart({
        id: product.id,
        name: product.name,
        price: currentPrice,
        img: product.img,
      }, i === quantity - 1);
    }
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop with Smooth Blur */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/65 backdrop-blur-md transition-opacity animate-modal-backdrop"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl lg:max-w-5xl bg-white rounded-xl shadow-[0_25px_70px_rgba(0,0,0,0.35)] border border-[#A68A56]/25 overflow-hidden z-10 animate-modal-content max-h-[92vh] md:max-h-[88vh] flex flex-col my-auto">
        
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-30 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-black border border-gray-200/90 shadow-md flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer backdrop-blur-xs"
          aria-label="Close modal"
        >
          <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 overflow-y-auto">
          
          {/* Left Column: Full-Bleed Edge-to-Edge Product Visual Stage */}
          <div className="md:col-span-6 relative min-h-80 sm:min-h-95 md:min-h-135 bg-[#F4F3EE] overflow-hidden group flex flex-col justify-between">
            
            {/* Full Card Hero Image */}
            <img
              src={selectedImg || product.img}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />

            {/* Top Floating Badges */}
            <div className="relative z-20 w-full p-4 sm:p-5 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C331B]/90 backdrop-blur-md text-[#AFD971] text-[10px] font-bold uppercase tracking-widest border border-[#AFD971]/35 shadow-md">
                <span>★</span>
                <span>Best Seller Icon</span>
              </span>

              {product.badge && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-[10px] font-bold uppercase tracking-wider border border-amber-300/30 shadow-md">
                  <span>✦</span>
                  <span>{product.badge}</span>
                </span>
              )}
            </div>

            {/* Bottom Floating Controls: Image Switcher Thumbnails & Status */}
            <div className="relative z-20 w-full p-4 sm:p-5 flex items-end justify-between gap-3">
              {/* Image Switcher Pills */}
              <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-black/45 backdrop-blur-md border border-white/20 shadow-lg">
                <button
                  onClick={() => setSelectedImg(product.img)}
                  className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedImg === product.img ? 'border-[#AFD971] scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                  aria-label="View primary angle"
                >
                  <img src={product.img} alt="Primary" className="w-full h-full object-cover" />
                </button>

                {product.hoverImg && (
                  <button
                    onClick={() => setSelectedImg(product.hoverImg)}
                    className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedImg === product.hoverImg ? 'border-[#AFD971] scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                    aria-label="View secondary angle"
                  >
                    <img src={product.hoverImg} alt="Secondary" className="w-full h-full object-cover" />
                  </button>
                )}
              </div>

              {/* In-Stock Botanical Authenticity Pill */}
              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#1C331B] text-[11px] font-semibold shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Clinical Grade</span>
              </div>
            </div>

          </div>

          {/* Right Column: Refined Editorial Product Info & Checkout */}
          <div className="md:col-span-6 p-6 sm:p-8 lg:p-9 flex flex-col justify-between bg-[#FCFBF8]">
            <div>
              {/* Category Eyebrow & Star Rating */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6F8C51] bg-[#6F8C51]/10 px-2.5 py-0.5 rounded-full">
                  {product.category}
                </span>

                <div className="flex items-center gap-1.5 bg-[#FAF8F2] border border-[#E5DEC9] px-3 py-1 rounded-full text-xs font-semibold text-[#8C6221] shadow-2xs">
                  <span className="text-amber-500">★</span>
                  <span>{product.rating}</span>
                  <span className="text-gray-400 font-normal">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Product Title */}
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1C2E1A] leading-tight mb-2.5">
                {product.name}
              </h2>

              {/* Price & Savings Display */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1C331B]">
                  ${currentPrice.toFixed(2)}
                </span>
                {originalPrice && (
                  <span className="font-mono text-base text-gray-400 line-through">
                    ${originalPrice.toFixed(2)}
                  </span>
                )}
                {savings && (
                  <span className="text-[11px] font-bold bg-emerald-100 text-[#2D5A32] border border-emerald-300/70 px-2.5 py-0.5 rounded-full">
                    Save ${savings}
                  </span>
                )}
              </div>

              {/* Short Formula Description */}
              <p className="text-xs sm:text-sm text-[#464D3F] font-light leading-relaxed mb-5">
                {product.description}
              </p>

              {/* Interactive Tabbed Product Details */}
              <div className="border-t border-b border-[#E5DEC9]/70 py-3.5 mb-5">
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider mb-3">
                  <button
                    onClick={() => setActiveTab('benefits')}
                    className={`pb-1 border-b-2 transition-all cursor-pointer ${
                      activeTab === 'benefits' ? 'border-[#547E3D] text-[#2D5A32] font-semibold' : 'border-transparent text-gray-400 hover:text-[#1C331B]'
                    }`}
                  >
                    Clinical Benefits
                  </button>
                  <button
                    onClick={() => setActiveTab('ingredients')}
                    className={`pb-1 border-b-2 transition-all cursor-pointer ${
                      activeTab === 'ingredients' ? 'border-[#547E3D] text-[#2D5A32] font-semibold' : 'border-transparent text-gray-400 hover:text-[#1C331B]'
                    }`}
                  >
                    Key Actives
                  </button>
                  <button
                    onClick={() => setActiveTab('howToUse')}
                    className={`pb-1 border-b-2 transition-all cursor-pointer ${
                      activeTab === 'howToUse' ? 'border-[#547E3D] text-[#2D5A32] font-semibold' : 'border-transparent text-gray-400 hover:text-[#1C331B]'
                    }`}
                  >
                    Ritual
                  </button>
                </div>

                <div className="text-xs text-[#30382E] font-normal leading-relaxed min-h-16">
                  {activeTab === 'benefits' && (
                    <ul className="space-y-1.5 text-[#30382E]">
                      <li className="flex items-start gap-2">
                        <span className="text-[#4E7A52] font-bold">✓</span>
                        <span>Promotes deep dermal hydration and cellular bio-renewal.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#4E7A52] font-bold">✓</span>
                        <span>Clinically proven 94% improvement in skin luminosity within 14 days.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#4E7A52] font-bold">✓</span>
                        <span>Fortifies the lipid barrier against environmental oxidation.</span>
                      </li>
                    </ul>
                  )}
                  {activeTab === 'ingredients' && (
                    <div className="flex flex-wrap gap-2 pt-0.5">
                      <span className="px-2.5 py-1 rounded-lg bg-[#F4F1E8] border border-[#E0D7C3] text-[11px] font-semibold text-[#2D472B]">Bio-Peptides 5%</span>
                      <span className="px-2.5 py-1 rounded-lg bg-[#F4F1E8] border border-[#E0D7C3] text-[11px] font-semibold text-[#2D472B]">Cold-Pressed Botanicals</span>
                      <span className="px-2.5 py-1 rounded-lg bg-[#F4F1E8] border border-[#E0D7C3] text-[11px] font-semibold text-[#2D472B]">4D Hyaluronic Complex</span>
                      <span className="px-2.5 py-1 rounded-lg bg-[#F4F1E8] border border-[#E0D7C3] text-[11px] font-semibold text-[#2D472B]">Ceramide Complex NP</span>
                    </div>
                  )}
                  {activeTab === 'howToUse' && (
                    <p className="text-xs text-[#384234] leading-relaxed pt-0.5 bg-emerald-50/70 p-3 rounded-xl border border-emerald-200/60">
                      Warm 3-4 drops between clean palms and gently press onto face, neck, and décolletage after cleansing. Use morning and evening for optimal vitality.
                    </p>
                  )}
                </div>
              </div>

              {/* Skin Compatibility Chips */}
              <div className="flex items-center flex-wrap gap-2 mb-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Suitable For:</span>
                <span className="text-[11px] bg-white border border-[#DDD3C1] px-2.5 py-0.5 rounded-full text-[#2B3528] font-medium shadow-2xs">Sensitive</span>
                <span className="text-[11px] bg-white border border-[#DDD3C1] px-2.5 py-0.5 rounded-full text-[#2B3528] font-medium shadow-2xs">Dry & Dehydrated</span>
                <span className="text-[11px] bg-white border border-[#DDD3C1] px-2.5 py-0.5 rounded-full text-[#2B3528] font-medium shadow-2xs">All Skin Types</span>
              </div>
            </div>

            {/* Bottom Actions: Quantity & Luxury Add to Bag Button */}
            <div>
              <div className="flex items-center gap-3.5 mb-3.5">
                {/* Quantity Pill Selector */}
                <div className="flex items-center border border-[#DDD3C1] rounded-2xl bg-white p-1 shadow-xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-[#1C331B] hover:bg-[#F4F1E8] transition-colors cursor-pointer font-bold text-sm"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="w-9 text-center font-mono font-bold text-sm text-[#1C331B]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-[#1C331B] hover:bg-[#F4F1E8] transition-colors cursor-pointer font-bold text-sm"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Main Add to Bag Button */}
                <button
                  onClick={handleAdd}
                  disabled={addedAnimation}
                  className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_6px_20px_rgba(28,51,27,0.25)] cursor-pointer flex items-center justify-center gap-2 ${
                    addedAnimation
                      ? 'bg-emerald-600 text-white scale-98 shadow-none'
                      : 'bg-[#1C331B] hover:bg-[#2B4B27] text-[#AFD971] hover:shadow-[0_8px_25px_rgba(28,51,27,0.35)] active:scale-98'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <svg className="w-4 h-4 text-white animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 text-[#AFD971]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                      <span>Add to Bag • ${(currentPrice * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Full Product Dossier Link */}
              <div className="text-center pt-1">
                <Link
                  to={getProductUrl(product)}
                  onClick={onClose}
                  className="text-xs font-bold uppercase tracking-widest text-[#8C6D34] hover:text-[#5B451E] transition-colors underline underline-offset-4"
                >
                  View Full Product Dossier & Clinical Specs →
                </Link>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
