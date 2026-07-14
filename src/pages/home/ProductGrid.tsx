import { useState } from 'react'
import { PRODUCTS } from './productsData'
// import type { Product } from './productsData'

interface ProductGridProps {
  onAddToCart: (product: { id: number; name: string; price: number; img: string }) => void
}

export default function ProductGrid({ onAddToCart }: ProductGridProps) {
  const [showAll, setShowAll] = useState(false)

  const visibleProducts = showAll ? PRODUCTS : PRODUCTS.slice(0, 4)

  return (
    <section id="products" className="py-5 ">
      <div className="max-w-7xl mx-auto px-6 lg:px-4">
        <div className="text-center max-w-3xl mx-auto mb-10 animate-fade-in">

          <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#17335A] mt-2 leading-tight">Shop Our Favorites</h2>

          <p className="text-brand-dark tracking-wide text-md">Clean, nutrient-rich formulations made to restore and nourish your skin barrier.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12">
          {visibleProducts.map((p) => {
            const isLocal = !p.img.startsWith('http')
            return (
              <div
                key={p.id}
                className="group relative flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(23,51,90,0.08)]  transition-all duration-500 border border-brand-dark/5"
              >
                {/* Image Wrapper */}
                <div className={`relative aspect-square w-full overflow-hidden flex items-center justify-center transition-all duration-500 ${isLocal ? 'bg-[#5c7886]/50 ' : 'bg-brand-cream-dark'
                  }`}>
                  {isLocal && (
                    <div className="absolute inset-0 bg-radial from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  )}

                  {/* Default Image (moves away, fades, blurs on hover) */}
                  <img
                    src={p.img}
                    alt={p.name}
                    className={`transition-all duration-700 ease-out transform ${isLocal
                      ? 'h-full w-auto max-h-full max-w-full object-fill group-hover:scale-90 drop-shadow-[0_10px_20px_rgba(0,0,0,0.05)]'
                      : 'h-full w-full object-cover object-center group-hover:scale-95'
                      }`}
                    loading="lazy"
                  />

                  {/* Hover Image (fades, sharpens, scales down to normal on hover) */}
                  {/* <img
                    src={p.hoverImg}
                    alt={`${p.name} texture`}
                    className="absolute inset-0 w-full h-full object-cover object-center opacity-0 scale-105  group-hover:opacity-100 group-hover:scale-100 group-hover:blur-0 transition-all duration-700 ease-out pointer-events-none"
                    loading="lazy"
                  /> */}

                  {p.badge && (
                    <span className={`absolute top-4 left-4 text-white text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-xs z-10 ${p.badge === 'Best Seller' ? 'bg-[#17335A]' : p.badge === 'New' ? 'bg-brand-light' : 'bg-brand-accent text-black font-bold'
                      }`}>
                      {p.badge}
                    </span>
                  )}
                  {/* Rating Badge */}
                  <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-md border border-white/10 text-brand-dark text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs z-10">
                    <span className="text-amber-500 text-xs">★</span>
                    <span>{p.rating}</span>
                    <span className="opacity-50">({p.reviewsCount})</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  <p className="text-[10px] font-bold text-brand-dark uppercase tracking-[0.2em]">{p.category}</p>
                  <h3 className="font-sans text-lg font-semibold text-brand-dark mt-2.5   duration-300">
                    {p.name}
                  </h3>

                  <div className="flex items-center justify-between  mt-3 pt-3 border-t border-[#17335A]/35">
                    <span className="text-base font-bold text-[#17335A]">${p.price.toFixed(2)}</span>
                    <button
                      onClick={() => onAddToCart({ id: p.id, name: p.name, price: p.price, img: p.img })}
                      className="group/btn flex items-center justify-center gap-0 hover:gap-1.5 px-3.5 py-2.5 bg-[#5c7886]  text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer active:scale-95"
                    >
                      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                      <span className="max-w-0 overflow-hidden opacity-0 group-hover/btn:max-w-[100px] group-hover/btn:opacity-100 transition-all duration-500 ease-in-out whitespace-nowrap">
                        Add to Cart
                      </span>
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
            className="inline-flex w-fit px-12 py-4.5 rounded-full bg-[#41677a] text-white font-semibold uppercase tracking-wider text-xs hover:bg-[#5f5e5e] transition-all duration-300 shadow-md hover:shadow-lg  cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
          >
            {showAll ? 'Show Fewer Products' : 'Show All Products'}
          </button>
        </div>
      </div>
    </section>
  )
}
