import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, Trash2, ShoppingBag, Check, 
  ArrowRight, CheckCircle2 
} from 'lucide-react';

interface WishlistProduct {
  id: number;
  name: string;
  price: number;
  img: string;
  description: string;
  category?: string;
}

interface WishlistTabProps {
  wishlist: WishlistProduct[];
  handleRemoveWishlist: (id: number) => void;
  onAddToCart: (product: { id: number; name: string; price: number; img: string }) => void;
  t: (key: string) => string;
}

export const WishlistTab: React.FC<WishlistTabProps> = ({
  wishlist,
  handleRemoveWishlist,
  onAddToCart,
  t,
}) => {
  const [addedIds, setAddedIds] = useState<number[]>([]);
  const [addAllFeedback, setAddAllFeedback] = useState(false);

  const handleAddSingle = (item: WishlistProduct) => {
    const translatedName = t('prod_' + item.id + '_name') || item.name;
    onAddToCart({
      id: item.id,
      name: translatedName,
      price: item.price,
      img: item.img
    });

    setAddedIds((prev) => [...prev, item.id]);
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== item.id));
    }, 2500);
  };

  const handleAddAll = () => {
    wishlist.forEach((item) => {
      const translatedName = t('prod_' + item.id + '_name') || item.name;
      onAddToCart({
        id: item.id,
        name: translatedName,
        price: item.price,
        img: item.img
      });
    });

    setAddAllFeedback(true);
    setTimeout(() => setAddAllFeedback(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* ── Section Header ── */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DDD3C1]/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#12602F] via-[#1F8242] to-[#C49746]" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E5DEC9]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-linear-to-r from-[#F4EFE6] to-[#EFE8D8] border border-[#C9B387]/50 text-[10px] font-bold uppercase tracking-widest text-[#8C6D34] mb-1">
              <span>✦</span>
              <span>Saved Formulations</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#1C2E1A]">{t('profile_tab_wishlist')}</h3>
            <p className="text-xs text-[#464D3F] mt-0.5">
              Personal harvest of biological skincare blends awaiting your next daily routine
            </p>
          </div>

          {wishlist.length > 0 && (
            <button
              onClick={handleAddAll}
              className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-[#12602F] to-[#1F7A3E] hover:from-[#0E4F26] hover:to-[#176B37] text-[#AFD971] rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-xs active:scale-95 shrink-0"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Move All to Bag ({wishlist.length})</span>
            </button>
          )}
        </div>

        {/* Move All Notification */}
        {addAllFeedback && (
          <div className="mt-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>All {wishlist.length} saved wishlist formulations have been added to your shopping bag!</span>
          </div>
        )}

        {/* ── Wishlist Product Cards Grid ── */}
        {wishlist.length === 0 ? (
          <div className="text-center py-16 bg-[#FAF8F2] rounded-2xl border border-[#DDD3C1]/80 p-8 mt-6">
            <div className="w-14 h-14 rounded-full bg-white border border-[#DDD3C1] flex items-center justify-center mx-auto mb-3 shadow-2xs">
              <Heart className="w-6 h-6 text-gray-400" />
            </div>
            <h4 className="font-serif text-xl font-bold text-[#1C2E1A]">Your Skincare Wishlist is Empty</h4>
            <p className="text-xs text-[#464D3F] mt-1 max-w-sm mx-auto">
              Explore our clinical best sellers and botanical collections to save your favorite formulations.
            </p>
            <Link
              to="/bestsellers"
              className="inline-flex items-center gap-2 mt-5 px-6 py-2.5 bg-[#12602F] hover:bg-[#0E4F26] text-[#AFD971] text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs transition-all"
            >
              <span>Explore Best Sellers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
            {wishlist.map((item) => {
              const translatedName = t('prod_' + item.id + '_name') || item.name;
              const translatedDesc = t('prod_' + item.id + '_desc') || item.description;
              const isAdded = addedIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-[#DDD3C1] overflow-hidden bg-white shadow-2xs hover:shadow-md hover:border-[#12602F] transition-all duration-300 flex flex-col sm:flex-row group"
                >
                  {/* Left: Product Thumbnail */}
                  <div className="sm:w-36 h-36 sm:h-auto overflow-hidden bg-[#FAF8F2] relative shrink-0 border-b sm:border-b-0 sm:border-r border-[#E5DEC9]">
                    <img
                      src={item.img}
                      alt={translatedName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button
                      onClick={() => handleRemoveWishlist(item.id)}
                      className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs text-gray-400 hover:text-rose-600 hover:bg-white flex items-center justify-center transition-all cursor-pointer shadow-2xs border border-gray-200"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Right: Product Details & CTA */}
                  <div className="p-5 flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-[#12602F] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                          In Stock • Cold Batched
                        </span>
                      </div>

                      <h4 className="font-serif text-sm sm:text-base font-bold text-[#1C2E1A] truncate mt-1">
                        {translatedName}
                      </h4>

                      <p className="text-xs text-[#464D3F] font-light line-clamp-2 mt-1 leading-relaxed">
                        {translatedDesc}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#E5DEC9]">
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase font-bold block">
                          Patron Price
                        </span>
                        <strong className="text-base font-serif font-bold text-[#12602F]">
                          ${item.price.toFixed(2)}
                        </strong>
                      </div>

                      <button
                        onClick={() => handleAddSingle(item)}
                        disabled={isAdded}
                        className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-2xs flex items-center gap-1.5 ${
                          isAdded
                            ? 'bg-[#12602F] text-[#AFD971]'
                            : 'bg-[#FAF8F2] hover:bg-[#12602F] text-[#1C2E1A] hover:text-[#AFD971] border border-[#DDD3C1] hover:border-[#12602F]'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add to Bag</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
