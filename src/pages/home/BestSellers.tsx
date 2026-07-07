import { useState } from 'react'

interface Product {
  id: number
  name: string
  price: number
  rating: number
  category: string
  img: string
}

interface BestSellersProps {
  onAddToCart: (product: { id: number; name: string; price: number; img: string }) => void
}

const BEST_SELLERS: Product[] = [
  {
    id: 1,
    name: 'Glow Boosting Serum',
    price: 32.00,
    rating: 4.9,
    category: 'Serums',
    img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 9,
    name: 'Age-Defying Retinol Serum',
    price: 45.00,
    rating: 4.8,
    category: 'Treatments',
    img: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 10,
    name: 'Rosehip Replenishing Oil',
    price: 38.00,
    rating: 4.9,
    category: 'Facial Oils',
    img: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=400&q=80',
  },

]

export default function BestSellers({ onAddToCart }: BestSellersProps) {
  const [startIndex, setStartIndex] = useState(0)

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % (BEST_SELLERS.length - 1))
  }

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + (BEST_SELLERS.length - 1)) % (BEST_SELLERS.length - 1))
  }

  return (
    <section className="py-14 bg-brand-cream text-brand-dark overflow-hidden border-b border-brand-dark/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* LEFT SIDE: Best Sellers Carousel */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="text-xs font-bold tracking-widest text-[#5c7886] uppercase">Customer Favorites</span>
                <h2 className="font-serif text-4xl sm:text-5xl font-normal mt-2 leading-tight text-[#17335A]">Best Sellers</h2>
              </div>
                 <div className="flex items-center gap-6">
            {/* Left Arrow Button */}
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-brand-dark/20 flex items-center justify-center text-brand-dark hover:bg-[#5c7886] hover:text-white hover:border-[#5c7886] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Scroll left"
            >
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Arrow Button */}
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-brand-dark/20 flex items-center justify-center text-brand-dark hover:bg-[#5c7886] hover:text-white hover:border-[#5c7886] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
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
                {BEST_SELLERS.slice(startIndex, startIndex + 2).map((p) => (
                  <div
                    key={p.id}
                    className="group relative flex flex-col bg-white rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 border border-brand-dark/5  animate-scale-up"
                  >
                    <div className="relative aspect-4/4 w-full overflow-hidden bg-brand-cream-dark ">
                      <img
                        src={p.img}
                        alt={p.name}
                        className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <span className="absolute top-3 left-3 bg-[#5c7886] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                        {p.rating}★ Rating
                      </span>
                    </div>

                    <div className="flex flex-col flex-1 mt-4 p-4">
                      <p className="text-[10px] font-semibold text-brand-dark uppercase tracking-widest">{p.category}</p>
                      <h3 className="font-sans text-base font-normal text-brand-dark mt-1 leading-snug group-hover:text-brand-light transition-colors duration-200">
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
                ))}
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
                <h3 className="font-serif text-3xl sm:text-4xl font-normal mt-2 leading-tight">Naturally Radiant</h3>
                <p className="text-sm mt-3 opacity-90 font-light max-w-sm">Every bottle is packed with biological-grade botanicals that yield active results for your daily skin rejuvenation.</p>
                
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
