import { useRef } from 'react'
import serumImg from '../../assets/skincare_serum.png'
import moisturizerImg from '../../assets/skincare_moisturizer.png'
// import sunscreenImg from '../../assets/skincare_sunscreen.png'
import vitamincImg from '../../assets/skincare_vitaminc.png'

interface Ingredient {
  id: number
  name: string
  benefit: string
  img: string
  hoverImg: string
  textColor: string
}

const INGREDIENTS: Ingredient[] = [
  {
    id: 1,
    name: 'RETINOL / AL',
    benefit: 'Target signs of aging & smooth fine lines',
    img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&h=600&q=80',
    hoverImg: serumImg,
    textColor: '#E2ECD5', // light sage green
  },
  {
    id: 2,
    name: 'VITAMIN C',
    benefit: 'Brighten complexion & fade dark spots',
    img: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&h=600&q=80',
    hoverImg: vitamincImg,
    textColor: '#FFFDF0', // light ivory cream
  },
  {
    id: 3,
    name: 'NIACINAMIDE',
    benefit: 'Refine skin texture & tighten pores',
    img: serumImg,
    hoverImg: moisturizerImg,
    textColor: '#E4F0EC', // pale ice blue/green
  },
  {
    id: 4,
    name: 'GLYCOLIC\nACID',
    benefit: 'Gently exfoliate & renew skin cells',
    img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&h=600&q=80',
    hoverImg: serumImg,
    textColor: '#E6F0DC', // pale green
  },
  {
    id: 5,
    name: 'HYALURONIC ACID',
    benefit: 'Deeply hydrate & plump skin layers',
    img: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&h=600&q=80',
    hoverImg: serumImg,
    textColor: '#F0F9FF', // pale water blue
  },
  {
    id: 6,
    name: 'SALICYLIC ACID',
    benefit: 'Clear pores & prevent breakout blemishes',
    img: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=600&h=600&q=80',
    hoverImg: serumImg,
    textColor: '#FDF2F8', // pale rose pink
  }
]

export default function IngredientsSpotlight() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const scrollTo = direction === 'left'
        ? scrollLeft - clientWidth / 2
        : scrollLeft + clientWidth / 2
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  return (
    <section className="py-10  text-brand-dark overflow-hidde ">
      {/* Self-contained styling to hide horizontal scrollbars across all browsers */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}} />

      <div className="max-w-7xl mx-auto px-6 lg:px-4 relative">
        {/* Section Header with Navigation Arrows in One Line */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-serif text-3xl  font-normal tracking-wider  text-[#17335A] uppercase">
            Skin-Loving Ingredients
          </h2>

          <div className="flex items-center gap-6">
            {/* Left Arrow Button */}
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-brand-dark/20 flex items-center justify-center text-brand-dark hover:bg-[#5c7886] hover:text-white hover:border-[#5c7886] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Scroll left"
            >
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Arrow Button */}
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-brand-dark/20 flex items-center justify-center text-brand-dark hover:bg-[#5c7886] hover:text-white hover:border-[#5c7886] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Scroll right"
            >
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Wrapper */}
        <div className="relative group/carousel">


          {/* Sliding Grid */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-4 px-1"
          >
            {INGREDIENTS.map((item) => {
              const isLocalHover = !item.hoverImg.startsWith('http')
              return (
                <div
                  key={item.id}
                  className="min-w-[270px] sm:min-w-[300px] md:min-w-[260px] lg:min-w-[calc(25%-18px)] h-85 flex-1 snap-start relative aspect-square rounded-xl overflow-hidden group  hover:shadow-[0_12px_30px_rgba(25,86,65,0.08)] bg-linear-to-br from-brand-cream-dark to-brand-accent/30 transition-all duration-500"
                >
                  {/* Texture Background Image (fades down on hover to reveal the product/gradient) */}
                  <img
                    src={item.img}
                    alt={item.name.replace('\n', ' ')}
                    className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:opacity-5 group-hover:scale-105 group-hover:blur-[1px] transition-all duration-700 ease-out"
                  />

                  {/* Product Image Overlay (appears on hover) */}
                  {isLocalHover ? (
                    <img
                      src={item.hoverImg}
                      alt="Skincare Product"
                      className="absolute bottom-30  right-0 h-[65%] w-auto object-contain opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 ease-out drop-shadow-[0_12px_24px_rgba(0,0,0,0.15)] z-10 pointer-events-none"
                    />
                  ) : (
                    <div className="absolute bottom-4 right-4 w-20 h-20 rounded-xl overflow-hidden bg-white border border-brand-dark/10 shadow-md opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 ease-out z-10 pointer-events-none">
                      <img
                        src={item.hoverImg}
                        alt="Product preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Overlay Gradient (slightly shifts intensity on hover) */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent group-hover:from-black/90 group-hover:via-black/30 transition-all duration-500" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end z-10 pointer-events-none">
                    {/* Ingredient Name */}
                    <h3
                      className="w-full font-sans text-3xl sm:text-4xl font-black tracking-wider uppercase leading-[0.9] whitespace-pre-line text-left filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] transition-transform duration-500 ease-out group-hover:-translate-y-14"
                      style={{ color: item.textColor }}
                    >
                      {item.name}
                    </h3>

                    {/* Benefit Subtext */}
                    <p className="absolute bottom-6  left-6 right-6 text-white text-[13px] sm:text-base font-semibold tracking-wide text-left opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out">
                      {item.benefit}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
