import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PRODUCTS } from './productsData'
import type { Product } from './productsData'
import { getProductUrl } from '../products/data/products'
import { useLanguage } from '../../context/LanguageContext'

interface BestSellersProps {
  onAddToCart: (
    product: { id: number; name: string; price: number; discountPrice?: number; img: string },
    openCart?: boolean
  ) => void
}

const BEST_SELLERS: Product[] = PRODUCTS.filter(p => [1, 9, 10].includes(p.id))

export default function BestSellers({ onAddToCart }: BestSellersProps) {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [startIndex, setStartIndex] = useState(0)

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % (BEST_SELLERS.length - 1))
  }

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + (BEST_SELLERS.length - 1)) % (BEST_SELLERS.length - 1))
  }

  return (
    <section id="bestsellers" className="py-14 bg-brand-cream text-brand-sage overflow-hidden border-b border-brand-cream-dark/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* LEFT SIDE: Best Sellers Carousel */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="text-[16px] font-bold text-[#A68A56] uppercase tracking-[0.2em] mb-3">{t('sec_cust_favs')}</span>
                <h2 className="font-serif text-4xl sm:text-5xl font-medium text-[#0B1A28] leading-tight">{t('sec_bestsellers')}</h2>
              </div>
              <div className="flex items-center gap-6">
                {/* Left Arrow Button */}
                <button
                  onClick={handlePrev}
                  className="w-12 h-12 rounded-full border border-brand-dark/20 flex items-center justify-center text-brand-dark hover:bg-brand-cream-dark hover:text-white hover:border-brand-cream-dark transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                  aria-label="Scroll left"
                >
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Right Arrow Button */}
                <button
                  onClick={handleNext}
                  className="w-12 h-12 rounded-full border border-brand-dark/20 flex items-center justify-center text-brand-dark hover:bg-brand-cream-dark hover:text-white hover:border-brand-cream-dark transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                  aria-label="Scroll right"
                >
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Sliding Product list */}
            <div className="relative animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-500">
                {BEST_SELLERS.slice(startIndex, startIndex + 2).map((p) => {
                  const translatedName = t('prod_' + p.id + '_name') || p.name
                  const translatedDesc = t('prod_' + p.id + '_desc') || p.description
                  const activePrice = p.discountPrice || p.price

                  return (
                    <div
                      key={p.id}
                      onClick={() => navigate(getProductUrl(p))}
                      className="group relative flex flex-col h-full bg-white rounded-md overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 border border-brand-dark/5 cursor-pointer"
                    >
                      <div className="relative aspect-square w-full overflow-hidden flex items-center justify-center transition-all duration-500 bg-[#F1EDE9]">
                        <img
                          src={p.img}
                          alt={translatedName}
                          className="h-full w-full object-cover object-center transition-all duration-700 ease-out transform group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>

                      <div className="flex flex-col flex-1 p-6">
                        <p className="text-[10px] font-bold text-[#A68A56] uppercase tracking-widest mb-1.5">
                          {t('cat_' + p.category.toLowerCase()) || p.category}
                        </p>
                        <h3 className="text-lg md:text-xl font-serif font-medium text-[#0B1A28] mb-1.5 line-clamp-1 group-hover:text-[#A68A56] transition-colors">
                          {translatedName}
                        </h3>

                        <p className="text-[11px] text-gray-500 mb-6 line-clamp-1 font-light tracking-wide">
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
            </div>
          </div>


          {/* RIGHT SIDE: Static Image Showcase */}
          <div className="lg:col-span-6 relative h-full rounded-xl overflow-hidden shadow-xl border border-brand-dark/10 group">
            <img
              src="https://thewoomag.com/backend/images/blogs/cover-45-Korean_Beauty_Skincare_Products[1].webp"
              alt="Natural Skincare Ingredients"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Visual Glass Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent flex items-end p-6 sm:p-8">
              <div className="text-white">
                <span className="text-xs font-bold tracking-widest uppercase opacity-75">Clean Beauty</span>
                <h3 className="font-serif text-3xl sm:text-4xl font-normal mt-2 leading-tight">{t('sec_natural_glow')}</h3>
                <p className="text-sm mt-3 opacity-90 font-light max-w-sm">{t('sec_glow_desc')}</p>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
