import { useState } from 'react'
import { PRODUCTS } from './productsData'
import { useLanguage } from '../../context/LanguageContext'

interface ProductGridProps {
  onAddToCart: (product: { id: number; name: string; price: number; img: string }) => void
}

export default function ProductGrid({ onAddToCart }: ProductGridProps) {
  const { t } = useLanguage()
  const [showAll, setShowAll] = useState(false)

  const visibleProducts = showAll ? PRODUCTS : PRODUCTS.slice(0, 4)

  return (
    <section id="products" className="py-16 bg-[#F2F5F8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
          <p className="text-[11px] font-bold text-[#A68A56] uppercase tracking-[0.2em] mb-3">
            BEST SELLERS
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-medium text-[#0B1A28] leading-tight">
            Loved By Our Clients
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12">
          {visibleProducts.map((p) => {
            const isLocal = !p.img.startsWith('http')
            const badgeKey = p.badge ? 'badge_' + p.badge.toLowerCase().replace('-', '_').replace(' ', '_') : ''
            const translatedName = t('prod_' + p.id + '_name')
            return (
              <div
                key={p.id}
                className="group relative flex flex-col h-full bg-white rounded-md overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer border border-brand-dark/5"
              >
                {/* Image Wrapper */}
                <div className={`relative aspect-square w-full overflow-hidden flex items-center justify-center transition-all duration-500 bg-[#F1EDE9]`}>
                  {isLocal && (
                    <div className="absolute inset-0 bg-radial from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  )}

                  {/* Default Image */}
                  <img
                    src={p.img}
                    alt={translatedName}
                    className={`transition-all duration-700 ease-out transform group-hover:scale-110 ${isLocal
                      ? 'h-full w-auto max-h-full max-w-full object-fill drop-shadow-[0_10px_20px_rgba(0,0,0,0.05)]'
                      : 'h-full w-full object-cover object-center'
                      }`}
                    loading="lazy"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10 transition-opacity duration-500 group-hover:opacity-0">
                    <span className="bg-[#0B1A28] text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                      {t('cat_' + p.category.toLowerCase())}
                    </span>
                    {p.badge && (
                      <span className="bg-white text-[#0B1A28] text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                        {t(badgeKey) || p.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  <p className="text-[10px] font-bold text-[#A68A56] uppercase tracking-widest mb-1.5">
                    {t('cat_' + p.category.toLowerCase())}
                  </p>
                  <h3 className="text-lg md:text-xl font-serif font-medium text-[#0B1A28] mb-1.5 line-clamp-1">
                    {translatedName}
                  </h3>
                  
                  <p className="text-[11px] text-gray-500 mb-6 line-clamp-1 font-light tracking-wide">
                    {p.description || t('prod_' + p.id + '_desc')}
                  </p>

                  <div className="flex items-end justify-between mt-auto pt-2">
                    <span className="text-xl font-bold text-[#A68A56] leading-none">
                      ${p.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => onAddToCart({ id: p.id, name: translatedName, price: p.price, img: p.img })}
                      className="shrink-0 w-16 h-8 flex items-center justify-center text-[9px] font-bold uppercase tracking-widest rounded-none transition-colors bg-[#0B1A28] text-white hover:bg-black cursor-pointer"
                    >
                      ADD
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex w-fit px-12 py-4.5 rounded-xs bg-[#0B1A28] text-white font-semibold uppercase tracking-wider text-xs hover:bg-black transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
          >
            {showAll ? t('btn_show_less') : t('btn_show_more')}
          </button>
        </div>
      </div>
    </section>
  )
}
