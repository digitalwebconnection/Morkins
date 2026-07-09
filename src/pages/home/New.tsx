import { useState, useEffect } from 'react'

import serumImg from '../../assets/skincare_serum.png'
import moisturizerImg from '../../assets/skincare_moisturizer.png'
// import sunscreenImg from '../../assets/skincare_sunscreen.png'
import vitamincImg from '../../assets/skincare_vitaminc.png'

interface Hotspot {
  x: string
  y: string
  value: string
  label: string
  tooltip: string
}

interface Slide {
  id: number
  title: string
  subtitle: string
  buttonText: string
  image: string
  themeColor: string
  titleColor: string
  hotspots: Hotspot[]
}

const SLIDES: Slide[] = [
  {
    id: 1,
    title: 'GET YOUR AI-POWERED SKIN DIAGNOSIS IN SECONDS',
    subtitle: 'Plus a 100% personalized, science-backed skincare regimen',
    buttonText: 'TAKE THE QUIZ',
    image: serumImg,
    themeColor: '#17335A', // Forest Green
    titleColor: 'text-[#195641]',
    hotspots: [
      { x: '58%', y: '26%', value: '90', label: 'Breakouts', tooltip: 'Dermal clarity index indicates minimal active congestion.' },
      { x: '45%', y: '64%', value: '77', label: 'Dryness', tooltip: 'Epidermal moisture retention level at cell boundaries.' },
      { x: '52%', y: '86%', value: '83', label: 'Firmness', tooltip: 'Collagen alignment and elasticity score in facial muscles.' }
    ]
  },
  {
    id: 2,
    title: 'CLINICALLY DOSED, BIOLOGICALLY ACTIVE FORMULAS',
    subtitle: 'High-efficacy active compounds calibrated to rebuild your dermal lipid barrier.',
    buttonText: 'EXPLORE CLINICAL STUDY',
    image: moisturizerImg,
    themeColor: '#17335A', // Navy Blue
    titleColor: 'text-[#17335A]',
    hotspots: [
      { x: '45%', y: '35%', value: '5.5', label: 'pH Balance', tooltip: 'Matches natural acidity levels for cell viability.' },
      { x: '60%', y: '65%', value: '98%', label: 'Absorption', tooltip: 'Deep lipid carrier penetration into basal cell layers.' }
    ]
  },
  {
    id: 3,
    title: 'PURE, COLD-PRESSED BOTANICAL EXTRACTS',
    subtitle: 'Sourcing pristine plants at peak potency to restore biocompatible cellular vitality.',
    buttonText: 'DISCOVER OUR HARVEST',
    image: vitamincImg,
    themeColor: '#17335A', // Forest Green
    titleColor: 'text-[#195641]',
    hotspots: [
      { x: '55%', y: '45%', value: '100%', label: 'Wildcrafted', tooltip: 'Ethically wild-harvested plant lipids.' },
      { x: '50%', y: '80%', value: '99%', label: 'Purity Retention', tooltip: 'Active plant enzymes preserved via cold-pressing.' }
    ]
  }
]

export default function New() {
  const [selectedSlideIdx, setSelectedSlideIdx] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [hoveredHotspotIdx, setHoveredHotspotIdx] = useState<number | null>(0)
  const [isHoveredManually, setIsHoveredManually] = useState(false)
  const [tiltStyle] = useState<React.CSSProperties>({})
  const activeSlide = SLIDES[selectedSlideIdx]

  // Reset to first hotspot when slide changes
  useEffect(() => {
    setHoveredHotspotIdx(0)
  }, [selectedSlideIdx])

  // Automatically cycle active hotspots and advance to the next product slide
  useEffect(() => {
    if (isHoveredManually) return

    const timer = setInterval(() => {
      setHoveredHotspotIdx((prev) => {
        if (prev === null) return 0
        const next = prev + 1
        if (next >= activeSlide.hotspots.length) {
          // Advance slide product automatically
          const nextSlideIdx = (selectedSlideIdx + 1) % SLIDES.length
          setIsTransitioning(true)
          setTimeout(() => {
            setSelectedSlideIdx(nextSlideIdx)
            setIsTransitioning(false)
          }, 400)
          return 0
        }
        return next
      })
    }, 3500)
    return () => clearInterval(timer)
  }, [selectedSlideIdx, isHoveredManually, activeSlide.hotspots.length])

  const selectSlide = (idx: number) => {
    if (idx === selectedSlideIdx) return
    setIsTransitioning(true)
    setHoveredHotspotIdx(0)
    setIsHoveredManually(false)
    setTimeout(() => {
      setSelectedSlideIdx(idx)
      setIsTransitioning(false)
    }, 400)
  }


 

  return (
    <section 
      className=" text-brand-dark overflow-hidden border-b border-brand-dark/5 transition-all duration-1000 relative"
      style={{
        background: `radial-gradient(circle at 80% 20%, ${activeSlide.themeColor}08, #fffef8 75%)`
      }}
    >
      {/* CSS custom animations inline block */}
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes dash {
          to {
            stroke-dashoffset: -20;
          }
        }
        @keyframes progressRing {
          from {
            stroke-dashoffset: 88;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 sm:px-4">
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center min-h-[500px] relative">
            
            {/* Column 1: Info text panel with individual delay transitions */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              <h2 
                className={`font-serif text-3xl sm:text-4xl lg:text-4xl font-normal text-[#17335A] leading-tight tracking-wide mb-6 transition-all duration-700 transform ${
                  isTransitioning ? 'opacity-0 ' : 'opacity-100 translate-y-0'
                }`}
              >
                {activeSlide.title}
              </h2>
              
              <p 
                className={`text-gray-900 text-sm sm:text-base leading-relaxed mb-8 max-w-md transition-all duration-700 delay-75 transform ${
                  isTransitioning ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
                }`}
              >
                {activeSlide.subtitle}
              </p>

              <div 
                className={`flex flex-wrap gap-4 items-center transition-all duration-700 delay-150 transform ${
                  isTransitioning ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
                }`}
              >
                <button 
                  className="inline-flex border font-semibold tracking-widest text-xs uppercase px-8 py-3.5 rounded-full cursor-pointer text-white shadow-sm hover:shadow-md transition-all duration-300"
                  style={{
                    backgroundColor: activeSlide.themeColor,
                    borderColor: activeSlide.themeColor
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = activeSlide.themeColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = activeSlide.themeColor;
                    e.currentTarget.style.color = '#ffffff';
                  }}
                >
                  {activeSlide.buttonText}
                </button>

                <button 
                  className="inline-flex border rounded-full font-semibold tracking-widest text-xs uppercase px-8 py-3.5 cursor-pointer text-black border-neutral-600 hover:border-black shadow-sm transition-all duration-300 bg-transparent"
                >
                  LEARN MORE
                </button>
              </div>

              {/* Circular Carousel Controls */}
              <div 
                className={`flex gap-4 mt-8 items-center transition-all duration-700 delay-200 transform ${
                  isTransitioning ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
                }`}
              >
                {/* Left Arrow (Prev) */}
                <button 
                  onClick={() => selectSlide((selectedSlideIdx - 1 + SLIDES.length) % SLIDES.length)}
                  className="w-12 h-12 rounded-full border border-neutral-400 flex items-center justify-center cursor-pointer transition-all duration-300 bg-white hover:bg-[#5c7886]  hover:text-white shadow-sm hover:shadow-md"
                  aria-label="Previous slide"
                >
                  <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Right Arrow (Next) */}
                <button 
                  onClick={() => selectSlide((selectedSlideIdx + 1) % SLIDES.length)}
                  className="w-12 h-12 rounded-full border border-neutral-400 flex items-center justify-center cursor-pointer transition-all duration-300 bg-white hover:bg-[#5c7886] hover:text-white shadow-sm hover:shadow-md"
                  aria-label="Next slide"
                >
                  <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Column 2: Interactive scanning image with tilt & laser scan effect */}
            <div className="lg:col-span-5 pe-12  relative">
              <div 
                className="relative w-full aspect-4/3 sm:aspect-[1.1/1] group cursor-default"
      
                style={tiltStyle}
              >
                
                {/* Main Slide Image */}
                <img
                  src={activeSlide.image}
                  alt={activeSlide.title}
                  className="w-full h-full object-fill transition-transform duration-1000 ease-out"
                  loading="lazy"
                />

                {/* Hotspot Indicators */}
                {activeSlide.hotspots.map((spot, hIdx) => {
                  const isHovered = hoveredHotspotIdx === hIdx
                  const isLeft = parseInt(spot.x) > 50
                  return (
                    <div 
                      key={hIdx}
                      className="absolute group/spot z-20 transform -translate-x-1/2 -translate-y-1/2"
                      style={{ left: spot.x, top: spot.y }}
                      onMouseEnter={() => {
                        setHoveredHotspotIdx(hIdx)
                        setIsHoveredManually(true)
                      }}
                      onMouseLeave={() => {
                        setIsHoveredManually(false)
                      }}
                      onClick={() => {
                        setHoveredHotspotIdx(hIdx)
                        setIsHoveredManually(true)
                      }}
                    >
                      {/* Concentric Pulsing Rings */}
                      <span className="absolute inset-0 -m-3.5 rounded-full bg-white/20 animate-ping opacity-75 pointer-events-none" />
                      <span className="absolute inset-0 -m-2 rounded-full bg-white/30 animate-pulse pointer-events-none" />
                      
                      {/* Interactive Radar Ring on Hover/Click */}
                      <span 
                        className={`absolute inset-0 -m-6 rounded-full bg-white/50 pointer-events-none transition-all duration-500 scale-0 ${
                          isHovered ? 'scale-100 opacity-100 animate-ping' : ''
                        }`} 
                      />

                      {/* Rotating Dashed Scanner Radar Ring */}
                      <svg 
                        className={`absolute w-6 h-6 z-10 transition-all duration-500 pointer-events-none ${
                          isHovered ? 'scale-125 rotate-180 opacity-100' : 'scale-100 opacity-60'
                        }`}
                        viewBox="0 0 24 24"
                        style={{
                          left: 'calc(50% - 12px)',
                          top: 'calc(50% - 12px)',
                        }}
                      >
                        <circle 
                          cx="12" 
                          cy="12" 
                          r="9" 
                          fill="none" 
                          stroke={activeSlide.themeColor} 
                          strokeWidth="1.2" 
                          strokeDasharray="4,3" 
                        />
                      </svg>

                      {/* Animated SVG Leader Line (S-Curve path extending 160px) */}
                      <svg 
                        className="absolute overflow-visible pointer-events-none z-15"
                        style={{
                          width: '1px',
                          height: '1px',
                          left: '50%',
                          top: '50%',
                        }}
                      >
                         <path
                          id={`callout-path-${hIdx}`}
                          d={isLeft ? "M 0 0 C -120 -10, 0 -90, -160 -100" : "M 0 0 C 120 -10, 0 -90, 160 -100"}
                          fill="none"
                          stroke={activeSlide.themeColor}
                          strokeWidth="1.2"
                          strokeDasharray="260"
                          strokeDashoffset={isHovered ? 0 : 260}
                          className="transition-[stroke-dashoffset] duration-500 ease-in-out"
                        />
                        
                        {/* Glowing Laser Bead that travels along the path */}
                        {isHovered && (
                          <circle r="2" fill="#ffffff" className="shadow-[0_0_8px_#ffffff]">
                            <animateMotion 
                              path={isLeft ? "M 0 0 C -120 -10, 0 -90, -160 -100" : "M 0 0 C 120 -10, 0 -90, 160 -100"} 
                              dur="1.8s" 
                              repeatCount="indefinite" 
                            />
                          </circle>
                        )}

                        {/* Terminal vertical accent tick */}
                        <line
                          x1={isLeft ? -160 : 160}
                          y1={-105}
                          x2={isLeft ? -160 : 160}
                          y2={-95}
                          stroke={activeSlide.themeColor}
                          strokeWidth="1.5"
                          className={`transition-all duration-300 ${isHovered ? 'opacity-100 scale-100 delay-500' : 'opacity-0 scale-0'}`}
                        />
                      </svg>

                      {/* Interactive Circle Badge */}
                      <div 
                        className={`relative rounded-full bg-black/95 text-xs font-bold flex items-center justify-center shadow-lg border border-brand-dark/10 cursor-pointer transition-all duration-300 ${
                          isHovered ? 'w-4 h-4 scale-125  bg-white border-2' : 'w-2.5 h-2.5'
                        }`}
                        style={{ borderColor: activeSlide.themeColor }}
                      />

                      {/* Hotspot Label (Beside the point) */}
                      <div 
                        className={`absolute top-1/2 -translate-y-1/2 ml-12 left-0 whitespace-nowrap bg-black backdrop-blur-xs text-white text-[9px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded shadow-sm transition-all duration-300 pointer-events-none ${
                          isHovered ? 'opacity-100 scale-105' : 'opacity-90'
                        }`}
                      >
                        {spot.label}
                      </div>

                      {/* Rich Tooltip Detail Popup (Positions at end of callout line with transition delay) */}
                      <div 
                        className={`absolute w-52 mt-10 bg-[#17335A] text-[#17335A] rounded-lg p-3 shadow-xl border border-brand-dark/5 text-left transition-all duration-500 z-30 ${
                          isHovered 
                            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
                            : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
                        }`}
                        style={{
                          left: isLeft ? '-160px' : '160px',
                          top: '-100px',
                          transform: isLeft ? 'translate(-100%, -90%)' : 'translate(0%, -90%)',
                          transitionDelay: isHovered ? '600ms' : '0ms' // Displays after leader line fully draws
                        }}
                      >
                        <div className="text-[8px] font-bold uppercase tracking-wider text-white mb-0.5">SCAN INDEX</div>
                        <div className="font-semibold text-xs text-white">{spot.label}: {spot.value}</div>
                        <div className="text-[9px] text-gray-100 mt-1 leading-normal">{spot.tooltip}</div>
                      </div>
                    </div>
                  )
                })}

              </div>

              {/* Decorative Glow Ring behind the scanner */}
              <div 
                className="absolute -top-6 -left-6 w-32 h-32 rounded-full blur-3xl opacity-10 pointer-events-none transition-colors duration-500"
                style={{ backgroundColor: activeSlide.themeColor }}
              />
            </div>

        </div>
      </div>
    </section>
  )
}
