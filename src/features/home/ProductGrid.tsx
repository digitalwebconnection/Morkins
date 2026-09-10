import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PRODUCTS } from './productsData'
import { getProductUrl } from '../products/data/products'
import { useLanguage } from '../../context/LanguageContext'

interface ProductGridProps {
  onAddToCart: (
    product: { id: number; name: string; price: number; discountPrice?: number; img: string },
    openCart?: boolean
  ) => void
}

export default function ProductGrid({ onAddToCart }: ProductGridProps) {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [showAll, setShowAll] = useState(false)

  const visibleProducts = showAll ? PRODUCTS : PRODUCTS.slice(0, 4)

  return (
    <section id="products" className="py-12 bg-[#F2F5F8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-4">
        {/* Section Header */}
        <div className="text-center mb-5 sm:mb-18">
          <p className="text-[16px] text-[#01442e] uppercase tracking-[0.2em] mb-3">
            BEST SELLERS
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-[#0C1B33] tracking-tight mt-2.5">
            Loved By Our Clients
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12">
          {visibleProducts.map((p) => {
            const isLocal = !p.img.startsWith('http')
            const translatedName = t('prod_' + p.id + '_name') || p.name
            const translatedDesc = t('prod_' + p.id + '_desc') || p.description
            const activePrice = p.discountPrice || p.price

            return (
              <div
                key={p.id}
                onClick={() => navigate(getProductUrl(p))}
                className="group relative flex flex-col h-full bg-white rounded-md overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 border border-brand-dark/5 cursor-pointer"
              >
                {/* Image Wrapper */}
                <div className="relative aspect-square w-full overflow-hidden flex items-center justify-center transition-all duration-500 bg-[#F1EDE9]">
                  {isLocal && (
                    <div className="absolute inset-0 bg-radial from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  )}

                  {/* Default Image */}
                  <img
                    src={p.img}
                    alt={translatedName}
                    className="h-full w-full object-cover object-center transition-all duration-700 ease-out transform group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  <p className="text-[                                                                                                                  10px] font-bold text-[#A68A56] uppercase tracking-widest mb-1.5">
                    {t('cat_' + p.category.toLowerCase()) || p.category}
                  </p>
                  <h3 className="text-lg md:text-xl font-serif font-medium text-[#0B1A28] mb-1.5 line-clamp-1 group-hover:text-[#A68A56] transition-colors">
                    {translatedName}
                  </h3>

                  {/* 1-2 line short description */}
                  <p className="text-[13px] text-gray-500 mb-2.5 line-clamp-2 font-light tracking-wide leading-relaxed">
                    {translatedDesc}
                  </p>

               

                  <div className="flex items-end justify-between mt-auto pt-2">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-bold text-[#A68A56] leading-none">
                        ${activePrice.toFixed(2)}
                      </span>
                      {p.discountPrice && (
                        <span className="text-[11px] text-stone-400 line-through leading-none font-mono">
                          ${p.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart({ id: p.id, name: translatedName, price: activePrice, discountPrice: p.discountPrice, img: p.img });
                      }}
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
