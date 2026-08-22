import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { ProductExtended } from '../products/data/products';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-modal-backdrop"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#A68A56]/20 overflow-hidden z-10 animate-modal-content max-h-[92vh] flex flex-col my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#FCFBF8] border border-gray-200 text-brand-dark/70 hover:text-brand-dark hover:bg-gray-100 flex items-center justify-center transition-all cursor-pointer shadow-xs"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 overflow-y-auto">
          {/* Left: Gallery Column */}
          <div className="md:col-span-6 bg-[#F4F3EE]/60 p-6 sm:p-8 flex flex-col justify-between items-center border-b md:border-b-0 md:border-r border-gray-100 relative">
            {/* Top Badges */}
            <div className="w-full flex items-center justify-between mb-4">
              <span className="bg-[#1C331B] text-[#AFD971] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-xs">
                ★ Best Seller Icon
              </span>
              {product.badge && (
                <span className="bg-[#A68A56] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Main Stage Image */}
            <div className="relative aspect-square w-full max-w-xs flex items-center justify-center p-4">
              <img
                src={selectedImg || product.img}
                alt={product.name}
                className="max-h-full max-w-full object-contain drop-shadow-xl transition-all duration-500 hover:scale-105"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => setSelectedImg(product.img)}
                className={`w-14 h-14 rounded-xl p-1 bg-white border-2 transition-all cursor-pointer overflow-hidden ${
                  selectedImg === product.img ? 'border-[#6F8C51] shadow-md scale-105' : 'border-transparent hover:border-gray-300'
                }`}
              >
                <img src={product.img} alt="Primary" className="w-full h-full object-contain" />
              </button>
              {product.hoverImg && (
                <button
                  onClick={() => setSelectedImg(product.hoverImg)}
                  className={`w-14 h-14 rounded-xl p-1 bg-white border-2 transition-all cursor-pointer overflow-hidden ${
                    selectedImg === product.hoverImg ? 'border-[#6F8C51] shadow-md scale-105' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img src={product.hoverImg} alt="Secondary" className="w-full h-full object-contain" />
                </button>
              )}
            </div>
          </div>

          {/* Right: Info & Purchase Column */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#6F8C51]">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 bg-[#F4F3EE] px-2.5 py-1 rounded-full text-xs font-bold text-brand-dark">
                  <span className="text-amber-500">★</span>
                  <span>{product.rating}</span>
                  <span className="text-gray-400 font-normal">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-brand-dark leading-tight mb-3">
                {product.name}
              </h2>

              {/* Price & Savings */}
              <div className="flex items-baseline gap-3 mb-5">
                <span className="font-mono text-2xl font-bold text-brand-dark">
                  ${currentPrice.toFixed(2)}
                </span>
                {originalPrice && (
                  <span className="font-mono text-base text-gray-400 line-through">
                    ${originalPrice.toFixed(2)}
                  </span>
                )}
                {savings && (
                  <span className="text-[11px] font-bold bg-[#6F8C51]/10 text-[#6F8C51] px-2.5 py-0.5 rounded-full">
                    Save ${savings}
                  </span>
                )}
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-brand-dark/75 font-light leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Interactive Tabs */}
              <div className="border-t border-b border-gray-100 py-3 mb-6">
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider mb-3">
                  <button
                    onClick={() => setActiveTab('benefits')}
                    className={`pb-1 border-b-2 transition-all cursor-pointer ${
                      activeTab === 'benefits' ? 'border-[#6F8C51] text-[#6F8C51]' : 'border-transparent text-gray-400 hover:text-brand-dark'
                    }`}
                  >
                    Clinical Benefits
                  </button>
                  <button
                    onClick={() => setActiveTab('ingredients')}
                    className={`pb-1 border-b-2 transition-all cursor-pointer ${
                      activeTab === 'ingredients' ? 'border-[#6F8C51] text-[#6F8C51]' : 'border-transparent text-gray-400 hover:text-brand-dark'
                    }`}
                  >
                    Key Actives
                  </button>
                  <button
                    onClick={() => setActiveTab('howToUse')}
                    className={`pb-1 border-b-2 transition-all cursor-pointer ${
                      activeTab === 'howToUse' ? 'border-[#6F8C51] text-[#6F8C51]' : 'border-transparent text-gray-400 hover:text-brand-dark'
                    }`}
                  >
                    Ritual
                  </button>
                </div>

                <div className="text-xs text-brand-dark/80 font-light leading-relaxed min-h-15">
                  {activeTab === 'benefits' && (
                    <ul className="space-y-1.5 list-disc list-inside text-brand-dark/75">
                      <li>Promotes deep dermal hydration and biological cellular renewal.</li>
                      <li>Clinically proven 94% improvement in skin radiance in 14 days.</li>
                      <li>Fortifies epidermal barrier against oxidative urban pollution.</li>
                    </ul>
                  )}
                  {activeTab === 'ingredients' && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      <span className="px-2.5 py-1 rounded-md bg-[#F4F3EE] text-[11px] font-medium text-brand-dark">Bio-Peptides 5%</span>
                      <span className="px-2.5 py-1 rounded-md bg-[#F4F3EE] text-[11px] font-medium text-brand-dark">Cold-Pressed Botanicals</span>
                      <span className="px-2.5 py-1 rounded-md bg-[#F4F3EE] text-[11px] font-medium text-brand-dark">Pure Hyaluronic Acid</span>
                      <span className="px-2.5 py-1 rounded-md bg-[#F4F3EE] text-[11px] font-medium text-brand-dark">Ceramide Complex</span>
                    </div>
                  )}
                  {activeTab === 'howToUse' && (
                    <p className="text-xs text-brand-dark/75 leading-relaxed pt-1">
                      Warm 3-4 drops between clean palms and gently press onto face, neck, and décolletage after cleansing. Use morning and evening for optimal cellular vitality.
                    </p>
                  )}
                </div>
              </div>

              {/* Skin Compatibility Pills */}
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Suitable For:</span>
                <span className="text-[11px] bg-[#FCFBF8] border border-gray-200 px-2 py-0.5 rounded text-brand-dark font-medium">Sensitive</span>
                <span className="text-[11px] bg-[#FCFBF8] border border-gray-200 px-2 py-0.5 rounded text-brand-dark font-medium">Dry & Dehydrated</span>
                <span className="text-[11px] bg-[#FCFBF8] border border-gray-200 px-2 py-0.5 rounded text-brand-dark font-medium">All Types</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div>
              <div className="flex items-center gap-4 mb-3">
                {/* Quantity Selector */}
                <div className="flex items-center border border-gray-200 rounded-xl bg-white p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-brand-dark hover:bg-gray-100 transition-colors cursor-pointer font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-mono font-bold text-sm text-brand-dark">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-brand-dark hover:bg-gray-100 transition-colors cursor-pointer font-bold text-sm"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  onClick={handleAdd}
                  disabled={addedAnimation}
                  className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center gap-2 ${
                    addedAnimation
                      ? 'bg-emerald-600 text-white scale-98'
                      : 'bg-[#1C331B] hover:bg-[#284826] text-[#AFD971] hover:shadow-xl active:scale-98'
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
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                      <span>Add to Bag • ${(currentPrice * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>
              </div>

              {/* View Full Details Link */}
              <div className="text-center">
                <Link
                  to={`/products/${product.id}`}
                  onClick={onClose}
                  className="text-xs font-bold uppercase tracking-widest text-[#A68A56] hover:text-[#8B7443] transition-colors underline underline-offset-4"
                >
                  View Full Product Page & Clinical Specs →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
