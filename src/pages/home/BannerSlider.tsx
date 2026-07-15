import { useState, useEffect, useCallback } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import hero1 from '../../assets/hero/1.jpg'
import hero2 from '../../assets/hero/2.jpg'
import hero3 from '../../assets/hero/3.jpg'
import hero4 from '../../assets/hero/4.jpg'
import hero5 from '../../assets/hero/5.jpg'

const BANNERS_DATA = {
  en: [
    {
      id: 1,
      badge: 'New Launch',
      headline: 'Reveal Your Natural Glow',
      sub: 'Experience the ultimate hydration and brightening power. Our dermatologically tested serum penetrates deep into the skin layers for a smoother, younger-looking complexion.',
      cta: 'Shop Serums',
      accent: '#C1D3DF',
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
      accent: '#C1D3DF',
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
      accent: '#C1D3DF',
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
      accent: '#C1D3DF',
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
      accent: '#C1D3DF',
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
      accent: '#C1D3DF',
      bg: hero5,
    },
  ],
}

export default function BannerSlider() {
  const { language } = useLanguage();
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [progress, setProgress] = useState(0)

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

  const b = banners[current]

  return (
    <section className="relative w-full h-[480px] sm:h-[620px] overflow-hidden">

      {/* Full-bleed Background Image */}
      <img
        key={b.id}
        src={b.bg}
        alt={b.headline}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
          isTransitioning ? 'opacity-0 ' : 'opacity-100 scale-100'
        }`}
      />

      {/* Dark Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-black/10 z-1" />

      {/* Slide Content */}
      <div className="absolute inset-0 flex items-center z-10 max-w-7xl mx-auto px-10 sm:px-16 md:px-4">
        <div className="flex flex-col justify-center h-full text-white text-left max-w-xl pb-12">

          {/* Headline */}
          <h2
            className={`font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight tracking-wide transition-all duration-700 ease-out ${
              isTransitioning ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0 delay-200'
            }`}
          >
            {b.headline}
          </h2>

          {/* Subtext */}
          <p
            className={`text-white/75 text-sm sm:text-base leading-relaxed max-w-xl mt-10 transition-all duration-700 ease-out ${
              isTransitioning ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0 delay-300'
            }`}
          >
            {b.sub}
          </p>

          {/* CTA */}
          <div
            className={`flex items-center gap-4 mt-12 transition-all duration-700 ease-out ${
              isTransitioning ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0 delay-500'
            }`}
          >
            <a
              href="#products"
              className="px-8 py-3 text-xs font-bold uppercase tracking-widest rounded-full bg-white text-[#17335A] hover:bg-[#17335A] hover:text-white   shadow-lg transition-all duration-300"
            >
              {b.cta}
            </a>
           
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white/10 z-20">
        <div
          className="h-full transition-none"
          style={{ width: `${progress}%`, background: b.accent }}
        />
      </div>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
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

