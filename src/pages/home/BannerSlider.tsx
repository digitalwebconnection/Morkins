import { useState, useEffect, useCallback } from 'react'
import serumImg from '../../assets/skincare_serum.png'
import moisturizerImg from '../../assets/skincare_moisturizer.png'
// import sunscreenImg from '../../assets/skincare_sunscreen.png'
import vitamincImg from '../../assets/skincare_vitaminc.png'

const banners = [
  {
    id: 1,
    badge: 'New Launch',
    headline: 'Reveal Your Natural ',
    sub: 'Experience the ultimate hydration and brightening power. Our dermatologically tested serum penetrates deep into the skin layers to reveal a smoother, younger-looking complexion with every drop.',
    cta: 'Shop Serums',
    accent: '#C1D3DF',
    fromColor: '#8EADD0',
    toColor: '#AEC9E8',
    image: serumImg,
  },
  {
    id: 2,
    badge: 'Best Seller',
    headline: 'Deep Hydration For All Skin',
    sub: 'Lock in moisture for up to 72 hours with our clinically-proven, lightweight formula. Perfect for daily skin nourishment, leaving it feeling incredibly plump, soft, and glowing throughout the day.',
    cta: 'Explore Moisturizers',
    accent: '#a8d5c0',
    fromColor: '#8CBDA9',
    toColor: '#ACD4C3',
    image: moisturizerImg,
  },
  {
    id: 3,
    badge: 'SPF Collection',
    headline: 'Broad Spectrum SPF Protection ',
    sub: 'Defend your skin against harmful UV rays and environmental damage. Our non-greasy sunscreen formula absorbs quickly, leaving no white cast and providing all-day skin barrier protection.',
    cta: 'Shop Sunscreens',
    accent: '#d4c0f5',
    fromColor: '#AC9EC9',
    toColor: '#C9BEDE',
    image: serumImg,
  },
  {
    id: 4,
    badge: 'Limited Offer',
    headline: 'Powerful Vitamin C Serum ',
    sub: 'Fade dark spots, hyperpigmentation, and uneven tone with our highly stable antioxidant formula. Re-energize tired skin cells and boost collagen production for a younger and healthier look.',
    cta: 'Shop Vitamin C',
    accent: '#f5d4a0',
    fromColor: '#CCA58E',
    toColor: '#E3C2AE',
    image: vitamincImg,
  },
]

export default function BannerSlider() {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [progress, setProgress] = useState(0)

  const goTo = useCallback((idx: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrent(idx)
      setIsTransitioning(false)
      setProgress(0)
    }, 400)
  }, [isTransitioning])

  const next = useCallback(() => goTo((current + 1) % banners.length), [current, goTo])

  // Auto-advance every 3 seconds
  useEffect(() => {
    const interval = setInterval(next, 3000)
    return () => clearInterval(interval)
  }, [next])

  // Progress bar
  useEffect(() => {
    setProgress(0)
    const tick = setInterval(() => setProgress(p => Math.min(p + 0.6, 100)), 20)
    return () => clearInterval(tick)
  }, [current])

  const b = banners[current]

  return (
    <section 
      className="relative w-full h-[480px] sm:h-[620px] overflow-hidden transition-all duration-700"
      style={{ background: `linear-gradient(to right, ${b.fromColor}, ${b.toColor})` }}
    >

      {/* Slide Content */}
      <div className="absolute inset-0 flex items-center z-10 max-w-7xl mx-auto px-12 sm:px-16 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-center w-full h-full pt-0 pb-12">
          
          {/* Left Side Content */}
          <div className="flex flex-col ps-1+0 justify-center h-full text-black text-left z-10">
           
            <h2
              className={`font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mt-6 tracking-wide uppercase transition-all duration-700 ease-out whitespace-pre-line ${
                isTransitioning ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0 delay-300'
              }`}
              style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.06)' }}
            >
              {b.headline}
            </h2>
            <p
              className={`text-black/70 text-sm sm:text-xl leading-relaxed max-w-3xl mt-12 transition-all duration-700 ease-out ${
                isTransitioning ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0 delay-500'
              }`}
              style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.03)' }}
            >
              {b.sub}
            </p>
            <div
              className={`flex items-center  mt-12 transition-all duration-700 ease-out ${
                isTransitioning ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0 delay-700'
              }`}
            >
              <a
                href="#products"
                className="px-16 py-2 text-md font-samibold uppercase tracking-wider rounded-full  text-black bg-transparent hover:bg-black hover:text-white border border-black   shadow-md transition-all duration-200"
              >
                Shop Now
              </a>
             
            </div>
          </div>

          {/* Right Side Content: Clean Cutout Product Image with Ambient Glow */}
          <div className="flex items-center justify-center md:justify-end h-full relative">
            {/* Ambient Glow Aura */}
            <div 
              className="absolute w-72 h-72 rounded-full blur-[80px] opacity-45 mix-blend-screen animate-pulse pointer-events-none transition-all duration-700"
              style={{ background: b.accent }}
            />
            
            <div
              className={`relative max-w-xs sm:max-w-md md:max-w-full h-[280px] sm:h-[520px] md:h-[580px] flex items-center justify-center transition-all duration-700 ease-out z-10 ${
                isTransitioning ? 'opacity-0 scale-95 translate-x-10 rotate-2' : 'opacity-100 scale-100 translate-x-0 rotate-0 delay-300'
              }`}
            >
              <img
                src={b.image}
                alt={b.headline}
                className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white/10">
        <div
          className="h-full transition-none"
          style={{ width: `${progress}%`, background: b.accent }}
        />
      </div>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 cursor-pointer ${i === current ? 'w-6 h-2' : 'w-2 h-2 bg-white/30 hover:bg-white/50'}`}
            style={i === current ? { background: b.accent } : {}}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

  

     
    </section>
  )
}
