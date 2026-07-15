import React from 'react';
import { Heart, Trash2 } from 'lucide-react';

interface WishlistProduct {
  id: number;
  name: string;
  price: number;
  img: string;
  description: string;
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
  return (
    <div className="bg-white/80 rounded-[32px] p-6 md:p-8 border border-brand-dark/10 shadow-sm backdrop-blur-xs space-y-6 animate-modal-content">
      <div>
        <h3 className="font-serif text-2xl font-bold text-brand-light">{t('profile_tab_wishlist')}</h3>
        <p className="text-[10px] text-brand-dark/55 uppercase tracking-widest mt-0.5">Harvest of custom blends waiting for your routine</p>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-16 text-brand-dark/45 text-xs font-light animate-fade-in">
          <Heart className="w-9 h-9 mx-auto mb-2 opacity-50 text-red-400" />
          Your skincare wishlist is currently empty.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {wishlist.map((item) => {
            const translatedName = t('prod_' + item.id + '_name') || item.name;
            const translatedDesc = t('prod_' + item.id + '_desc') || item.description;
            return (
              <div key={item.id} className="border border-brand-dark/10 rounded-[28px] overflow-hidden flex flex-col md:flex-row shadow-3xs bg-white/50 hover:border-brand-light/35 transition-all group">
                <div className="w-full md:w-32 h-32 overflow-hidden shrink-0 border-b md:border-b-0 md:border-r border-brand-dark/10 relative">
                  <img 
                    src={item.img} 
                    alt={translatedName} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
                
                <div className="p-5 flex flex-col justify-between grow min-w-0 space-y-4">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-xs font-bold text-brand-light truncate">{translatedName}</h4>
                      <button 
                        onClick={() => handleRemoveWishlist(item.id)} 
                        className="p-1 rounded-lg hover:bg-red-50 text-neutral-400 hover:text-red-500 transition-colors shrink-0 cursor-pointer"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[10px] text-brand-dark/60 font-light line-clamp-2 mt-1 leading-relaxed">
                      {translatedDesc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-brand-dark/5">
                    <strong className="text-xs text-brand-light font-extrabold">${item.price.toFixed(2)}</strong>
                    <button
                      onClick={() => {
                        onAddToCart({ id: item.id, name: translatedName, price: item.price, img: item.img });
                      }}
                      className="bg-brand-light hover:bg-brand-light/95 text-white px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all cursor-pointer shadow-3xs hover:scale-105 active:scale-95"
                    >
                      {t('btn_add_to_bag')}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
