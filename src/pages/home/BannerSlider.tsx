import { useState, useEffect, useCallback, useRef } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import hero1 from '../../assets/hero/1.jpg'
import hero2 from '../../assets/hero/2.jpg'
import hero3 from '../../assets/hero/3.jpg'
import hero4 from '../../assets/hero/4.jpg'
import hero5 from '../../assets/hero/5.jpg'

const BANNERS_DATA: Record<string, { id: number; badge: string; headline: string; sub: string; cta: string; accent: string; bg: string }[]> = {
  en: [
    {
      id: 1,
      badge: 'New Launch',
      headline: 'Reveal Your Natural Glow',
      sub: 'Experience the ultimate hydration and brightening power. Our dermatologically tested serum penetrates deep into the skin layers for a smoother, younger-looking complexion.',
      cta: 'Shop Serums',
      accent: '#B8D5C8',
      bg: hero1,
    },
    {
      id: 2,
      badge: 'Best Seller',
      headline: 'Deep Hydration For All Skin',
      sub: 'Lock in moisture for up to 72 hours with our clinically-proven, lightweight formula. Perfect for daily nourishment, leaving skin plump, soft, and glowing all day.',
      cta: 'Explore Moisturizers',
      accent: '#a8d5c0',
      bg: hero2,
    },
    {
      id: 3,
      badge: 'SPF Collection',
      headline: 'Broad Spectrum SPF Protection',
      sub: 'Defend your skin against harmful UV rays and environmental damage. Our non-greasy sunscreen absorbs quickly with no white cast and all-day barrier protection.',
      cta: 'Shop Sunscreens',
      accent: '#d4c0f5',
      bg: hero3,
    },
    {
      id: 4,
      badge: 'Limited Offer',
      headline: 'Powerful Vitamin C Serum',
      sub: 'Fade dark spots and uneven tone with our highly stable antioxidant formula. Re-energize skin cells and boost collagen for a younger, healthier look every day.',
      cta: 'Shop Vitamin C',
      accent: '#f5d4a0',
      bg: hero4,
    },
    {
      id: 5,
      badge: 'New Launch',
      headline: 'Reveal Your Natural Glow',
      sub: 'Experience the ultimate hydration and brightening power. Our dermatologically tested serum penetrates deep into the skin layers for a smoother, younger-looking complexion.',
      cta: 'Shop Serums',
      accent: '#B8D5C8',
      bg: hero5,
    },
  ],
  hi: [
    {
      id: 1,
      badge: 'नया उत्पाद',
      headline: 'प्राकृतिक चमक प्रकट करें',
      sub: 'परम जलयोजन और चमकती त्वचा का अनुभव करें। हमारा फॉर्मूला त्वचा में गहराई से समाकर एक चिकना और युवा रंग प्रदान करता है।',
      cta: 'सीरम खरीदें',
      accent: '#B8D5C8',
      bg: hero1,
    },
    {
      id: 2,
      badge: 'सबसे लोकप्रिय',
      headline: 'सभी त्वचा के लिए गहरा हाइड्रेशन',
      sub: 'हमारे हल्के फॉर्मूले से त्वचा की नमी बनाए रखें। दैनिक पोषण के लिए बिल्कुल सही, जिससे त्वचा पूरे दिन कोमल बनी रहती है।',
      cta: 'मॉइस्चराइज़र देखें',
      accent: '#a8d5c0',
      bg: hero2,
    },
    {
      id: 3,
      badge: 'सनस्क्रीन संग्रह',
      headline: 'व्यापक स्पेक्ट्रम एसपीएफ सुरक्षा',
      sub: 'हानिकारक यूवी किरणों और पर्यावरणीय क्षति से अपनी त्वचा की रक्षा करें। हमारा गैर-चिपचिपा सनस्क्रीन जल्दी अवशोषित होता है।',
      cta: 'सनस्क्रीन खरीदें',
      accent: '#d4c0f5',
      bg: hero3,
    },
    {
      id: 4,
      badge: 'सीमित ऑफर',
      headline: 'शक्तिशाली विटामिन सी सीरम',
      sub: 'एंटीऑक्सीडेंट फॉर्मूले से काले धब्बे और असमान त्वचा टोन को दूर करें। त्वचा में जान फूंकें और नया निखार पाएं।',
      cta: 'विटामिन सी खरीदें',
      accent: '#f5d4a0',
      bg: hero4,
    },
    {
      id: 5,
      badge: 'नया उत्पाद',
      headline: 'प्राकृतिक चमक प्रकट करें',
      sub: 'परम जलयोजन और चमकती त्वचा का अनुभव करें। हमारा फॉर्मूला त्वचा में गहराई से समाकर एक चिकना और युवा रंग प्रदान करता है।',
      cta: 'सीरम खरीदें',
      accent: '#B8D5C8',
      bg: hero5,
    },
  ],
  gu: [
    {
      id: 1,
      badge: 'નવું લોન્ચ',
      headline: 'તમારી કુદરતી ચમક પ્રગટ કરો',
      sub: 'અંતિમ હાઇડ્રેશન અને ચમકતી ત્વચાનો અનુભવ કરો. અમારું સીરમ ત્વચામાં ઊંડે સુધી પ્રવેશીને ત્વચાને મુલાયમ અને યુવાન રાખે છે.',
      cta: 'સીરમ ખરીદો',
      accent: '#B8D5C8',
      bg: hero1,
    },
    {
      id: 2,
      badge: 'બેસ્ટ સેલર',
      headline: 'બધી ત્વચા માટે ઊંડું હાઇડ્રેશન',
      sub: 'અમારા હળવા ફોર્મ્યુલાથી ત્વચાની ભેજ જાળવી રાખો. દૈનિક પોષણ માટે યોગ્ય, ત્વચાને આખો દિવસ નરમ અને ચમકતી રાખે છે.',
      cta: 'મોઇશ્ચરાઇઝર જુઓ',
      accent: '#a8d5c0',
      bg: hero2,
    },
    {
      id: 3,
      badge: 'એસપીએફ કલેક્શન',
      headline: 'બ્રોડ સ્પેક્ટ્રમ એસપીએફ પ્રોટેક્શન',
      sub: 'હાનિકારક યુવી કિરણો અને પર્યાવરણીય નુકસાન સામે તમારી ત્વચાનું રક્ષણ કરો. આ બિન-ચીકણું સનસ્ક્રીન ઝડપથી શોષાઈ જાય છે.',
      cta: 'સનસ્ક્રીન ખરીદો',
      accent: '#d4c0f5',
      bg: hero3,
    },
    {
      id: 4,
      badge: 'મર્યાદિત ઓફર',
      headline: 'શક્તિશાળી વિટામિન સી સીરમ',
      sub: 'એન્ટીઑકિસડન્ટ ફોર્મ્યુલા વડે કાળા ડાઘ અને અસમાન ટોનને દૂર કરો. ત્વચામાં નવી ઉર્જા મેળવો અને ચમક વધારો.',
      cta: 'વિટામિન સી ખરીદો',
      accent: '#f5d4a0',
      bg: hero4,
    },
    {
      id: 5,
      badge: 'નવું લોન્ચ',
      headline: 'તમારી કુદરતી ચમક પ્રગટ કરો',
      sub: 'અંતિમ હાઇડ્રેશન અને ચમકતી ત્વચાનો અનુભવ કરો. અમારું સીરમ ત્વચામાં ઊંડે સુધી પ્રવેશીને ત્વચાને મુલાયમ અને યુવાન રાખે છે.',
      cta: 'સીરમ ખરીદો',
      accent: '#B8D5C8',
      bg: hero5,
    },
  ],
}

export default function BannerSlider() {
  const { language } = useLanguage();
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [, setProgress] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  const banners = BANNERS_DATA[language] || BANNERS_DATA['en'];

  const goTo = useCallback((idx: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrent(idx)
      setIsTransitioning(false)
      setProgress(0)
    }, 400)
  }, [isTransitioning])

  const next = useCallback(() => goTo((current + 1) % banners.length), [current, goTo, banners.length])

  // Auto-advance every 5 seconds
  useEffect(() => {
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [next])

  // Progress bar
  useEffect(() => {
    setProgress(0)
    const tick = setInterval(() => setProgress(p => Math.min(p + 0.34, 100)), 20)
    return () => clearInterval(tick)
  }, [current])

  // Scroll tracking for parallax brand title effect
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const sectionHeight = sectionRef.current.offsetHeight
        // How far we've scrolled past the top of the section
        const scrolled = Math.max(0, -rect.top)
        const progress = Math.min(1, scrolled / sectionHeight)
        setScrollY(progress)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const b = banners[current]

  // ── Scroll-driven values ──
  // Brand title: starts at scale(1) → shrinks to scale(0.25) as user scrolls
  const titleScale = Math.max(0.25, 1 - scrollY * 0.5)
  // Brand title opacity: fades out gradually
  const titleOpacity = Math.max(0, 1 - scrollY * 0.5)
  // Banner content: slides up and fades
  const contentOpacity = Math.max(0, 1 - scrollY * 0.5)
  const contentTranslateY = scrollY * 20
  // Parallax image: moves slightly slower than scroll
  const imageTranslateY = scrollY * 20

  return (
    <div ref={sectionRef} className="relative" style={{ zIndex: 1 }}>
      {/* Sticky wrapper — keeps the banner pinned while scrolling through it */}
      <section
        className="relative w-full overflow-hidden h-140  bg-[#0B1A28]"
        
      >
        <div
          className="sticky top-0 w-full h-full  overflow-hidden"
          
        >
          {/* Background Image with parallax offset */}
          <img
            key={b.id}
            src={b.bg}
            alt={b.headline}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
            style={{
              transform: `translateY(${imageTranslateY}px) scale(${1 + scrollY * 0.15})`,
              willChange: 'transform',
            }}
          />

          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-black/10 z-1" />

          {/* ── Giant Main Morkins Title (EADEM-style) ── */}
          <div
            className="absolute inset-0 z-5 flex items-center justify-center pointer-events-none px-6"
            style={{
              opacity: titleOpacity,
              transform: `scale(${titleScale})`,
              willChange: 'transform, opacity',
              transition: 'opacity 0.05s linear',
            }}
          >
            <h1 className="select-none text-white/90 font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] tracking-[0.2em] sm:tracking-[0.25em] uppercase font-light drop-shadow-[0_10px_40px_rgba(0,0,0,0.7)] text-center pl-[0.2em] sm:pl-[0.25em]">
              Morkins
            </h1>
          </div>

          {/* Slide Content (headline, subtext, CTA) */}
          <div
            className="absolute inset-0 flex items-end z-10 max-w-7xl mx-auto px-10 sm:px-16 md:px-4"
            style={{
              opacity: contentOpacity,
              transform: `translateY(-${contentTranslateY}px)`,
              willChange: 'transform, opacity',
            }}
          >
            <div className="flex flex-col justify-end h-full text-white text-left max-w-xl pb-24 sm:pb-28">

              {/* Headline */}
              {/* <h2
                className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight tracking-wide transition-all duration-700 ease-out ${
                  isTransitioning ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0 delay-200'
                }`}
              >
                {b.headline}
              </h2> */}

              {/* Subtext */}
              {/* <p
                className={`text-white/75 text-sm sm:text-base leading-relaxed max-w-lg mt-5 transition-all duration-700 ease-out ${
                  isTransitioning ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0 delay-300'
                }`}
              >
                {b.sub}
              </p> */}

              {/* CTA */}
              <div
                className={`flex items-center gap-4 mt-8 transition-all duration-700 ease-out ${
                  isTransitioning ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0 delay-500'
                }`}
              >
                <a
                  href="#products"
                  className="px-8 py-3 text-xs font-bold uppercase tracking-widest rounded-full bg-white text-[#184433] hover:bg-[#184433] hover:text-white shadow-lg transition-all duration-300"
                >
                  {b.cta}
                </a>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div
            className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20"
            style={{ opacity: contentOpacity }}
          >
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  i === current ? 'w-6 h-2' : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                }`}
                style={i === current ? { background: b.accent } : {}}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Scroll down hint arrow — only visible at top */}
          <div
            className="absolute bottom-8 right-8 z-20 flex flex-col items-center gap-1 text-white/50"
            style={{
              opacity: Math.max(0, 1 - scrollY * 8),
              transition: 'opacity 0.2s',
            }}
          >
            <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Scroll</span>
            <svg
              className="w-4 h-4 animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>
    </div>
  )
}
