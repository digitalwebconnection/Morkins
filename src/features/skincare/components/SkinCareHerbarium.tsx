import { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowRight, Compass, FlaskConical, Dna, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS_EXTENDED, getProductUrl } from '../../products/data/products';

interface HerbariumIngredient {
  id: string;
  specimenNum: string;
  name: string;
  botanicalName: string;
  category: string;
  filterCategory: 'all' | 'antiaging' | 'barrier' | 'hydration' | 'clarifying';
  purity: string;
  origin: string;
  extractionMethod: string;
  cellularTarget: string;
  primaryBenefit: string;
  secondaryBenefit: string;
  pairedProductId: number;
  badgeColor: string;
  iconEmoji: string;
}

const INGREDIENTS: HerbariumIngredient[] = [
  {
    id: 'bakuchiol',
    specimenNum: 'SPECIMEN 01',
    name: 'Encapsulated Bio-Bakuchiol',
    botanicalName: 'Psoralea Corylifolia Seed Extract',
    category: 'Plant Bio-Retinol',
    filterCategory: 'antiaging',
    purity: '99.4% Active',
    origin: 'Himalayan Foothills',
    extractionMethod: 'Sub-Critical CO2 Isolation (<38°C)',
    cellularTarget: 'Fibroblast Gene Expression & Collagen Type I/IV',
    primaryBenefit: 'Accelerates cellular turnover with zero redness or flaking',
    secondaryBenefit: '100% non-photosensitizing for both AM and PM rituals',
    pairedProductId: 8,
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    iconEmoji: '🌿',
  },
  {
    id: 'ceramides',
    specimenNum: 'SPECIMEN 02',
    name: 'Tri-Ceramide 1:3:6 Matrix',
    botanicalName: 'Biomimetic Phytosphingosine Lipids',
    category: 'Lipid Reconstruction',
    filterCategory: 'barrier',
    purity: '100% Bio-Identical',
    origin: 'Bio-Fermented Safflower',
    extractionMethod: 'Enzymatic Bio-Fermentation Synthesis',
    cellularTarget: 'Stratum Corneum Intercellular Cement',
    primaryBenefit: 'Fills microscopic fissures in compromised skin barriers',
    secondaryBenefit: 'Halts Trans-Epidermal Water Loss (TEWL) for 24h+',
    pairedProductId: 2,
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    iconEmoji: '🛡️',
  },
  {
    id: 'centella',
    specimenNum: 'SPECIMEN 03',
    name: 'Centella Madecassoside',
    botanicalName: 'Centella Asiatica Triterpenic Fraction',
    category: 'Anti-Inflammatory',
    filterCategory: 'barrier',
    purity: '95% Pure Isolated',
    origin: 'Madagascar Highlands',
    extractionMethod: 'Cryogenic Ultrasonic Aqueous Extraction',
    cellularTarget: 'Pro-Inflammatory Cytokines (IL-6 & TNF-α)',
    primaryBenefit: 'Reduces visible micro-capillary redness by up to 48%',
    secondaryBenefit: 'Cools dermal reactivity and shields against PM2.5',
    pairedProductId: 7,
    badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
    iconEmoji: '💧',
  },
  {
    id: 'hyaluronic',
    specimenNum: 'SPECIMEN 04',
    name: '5D Multi-Hyaluronic Acid',
    botanicalName: 'Multi-Weight Sodium Hyaluronate',
    category: 'Deep Hydro-Plumping',
    filterCategory: 'hydration',
    purity: 'Pharma Clean Grade',
    origin: 'Botanical Fermentation',
    extractionMethod: 'Fractional Molecular Weight Precipitation',
    cellularTarget: 'Basal Epidermis to Surface Stratum Corneum',
    primaryBenefit: 'Binds up to 1,000x its molecular weight in water reserves',
    secondaryBenefit: 'Creates multi-depth bounce and an all-day dewy moisture veil',
    pairedProductId: 4,
    badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
    iconEmoji: '🌊',
  },
  {
    id: 'niacinamide',
    specimenNum: 'SPECIMEN 05',
    name: 'Clinical Niacinamide + Zinc',
    botanicalName: 'Vitamin B3 & Zinc Pyrrolidone Complex',
    category: 'Pore & Sebum Control',
    filterCategory: 'clarifying',
    purity: '10% Active USP',
    origin: 'Swiss Precision Synthesis',
    extractionMethod: 'Pharmaceutical Crystallization Process',
    cellularTarget: 'Sebocyte Receptors & Melanocyte Transfer',
    primaryBenefit: 'Refines stretched pore walls and regulates excess sebum',
    secondaryBenefit: 'Visibly fades post-inflammatory pigmentation and tone unevenness',
    pairedProductId: 5,
    badgeColor: 'bg-stone-100 text-stone-800 border-stone-300',
    iconEmoji: '⚡',
  },
  {
    id: 'rosehip',
    specimenNum: 'SPECIMEN 06',
    name: 'Wild Cold-Pressed Rosehip',
    botanicalName: 'Rosa Canina & Sclerocarya Birrea Seed Oils',
    category: 'Living Antioxidant',
    filterCategory: 'antiaging',
    purity: '100% Extra-Virgin',
    origin: 'Patagonian Andes',
    extractionMethod: 'Zero-Heat Single Batch Expeller Pressing',
    cellularTarget: 'Free Radical Scavenging & Lipid Peroxidation',
    primaryBenefit: 'Neutralizes up to 98% of oxidative free radicals',
    secondaryBenefit: 'Delivers immediate glass-skin luminosity with zero grease',
    pairedProductId: 1,
    badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
    iconEmoji: '🌸',
  },
];


export default function SkinCareHerbarium() {
  const [selectedFilter] = useState<string>('all');
  const [activeSlide, setActiveSlide] = useState(0);
  const [, setCanScrollLeft] = useState(false);
  const [, setCanScrollRight] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredIngredients = selectedFilter === 'all'
    ? INGREDIENTS
    : INGREDIENTS.filter((item) => item.filterCategory === selectedFilter);

  // Check scroll positions & current slide
  const checkScrollability = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const cardWidth = scrollRef.current.firstElementChild
      ? (scrollRef.current.firstElementChild as HTMLElement).offsetWidth + 24
      : 360;
    const currentSlide = Math.round(scrollLeft / cardWidth);
    setActiveSlide(Math.min(Math.max(0, currentSlide), filteredIngredients.length - 1));
  };

  useEffect(() => {
    checkScrollability();
  }, [filteredIngredients]);

  // Auto-slide interval: advances one by one every 3.5 seconds when not hovered
  useEffect(() => {
    if (isPaused || filteredIngredients.length <= 1) return;

    const interval = setInterval(() => {
      if (!scrollRef.current) return;

      const cardWidth = scrollRef.current.firstElementChild
        ? (scrollRef.current.firstElementChild as HTMLElement).offsetWidth + 24
        : 360;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

      // If reached the end, loop back to the beginning
      if (scrollLeft + clientWidth >= scrollWidth - 20) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused, filteredIngredients.length]);

  // Scroll to specific index
  const scrollToSlide = (index: number) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstElementChild
      ? (scrollRef.current.firstElementChild as HTMLElement).offsetWidth + 24
      : 360;
    scrollRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
  };



  return (
    <section id="skincare-herbarium" className="py-6 sm:py-10 lg:py-14 bg-[#FAF8F5] border-b border-[#EAE3D2] relative overflow-hidden">
      {/* ── Ambient Background Atmosphere ── */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-110 h-110 bg-emerald-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#D6CDBC_1.2px,transparent_1.2px)] bg-size-[28px_28px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Header ── */}
        <div className="text-center max-w-5xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50/90 border border-amber-200 text-[#8C6221] text-[11px] font-bold uppercase tracking-[0.2em] shadow-2xs mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D95B00]" />
            <span>Apothecary Herbarium Vault</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#123624] font-normal leading-tight tracking-tight">
            Bio-Active Botanical Specimen Library
          </h2>

          <p className="text-stone-900 text-sm sm:text-base font-light mt-2.5 leading-relaxed">
            Every formulation is anchored by cold-extracted, unheated raw botanicals isolated for peak cellular bioavailability.
          </p>
        </div>

     
        {/* ── Interactive Horizontal Slider Container ── */}
        <div
          ref={scrollRef}
          onScroll={checkScrollability}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredIngredients.map((item) => {
            const pairedProduct = PRODUCTS_EXTENDED.find((p) => p.id === item.pairedProductId);

            return (
              <div
                key={item.id}
                className="w-75 sm:w-90 lg:w-95 shrink-0 snap-start bg-white rounded-xl border border-[#DDD3C1] hover:border-[#12602F]/60 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 group relative overflow-hidden"
              >
                {/* Top Specimen Header */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8C6221]">
                      {item.specimenNum}
                    </span>

                    <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}>
                      {item.purity}
                    </span>
                  </div>

                  {/* Botanical Title & Taxonomy */}
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-2xl shrink-0 mt-0.5">{item.iconEmoji}</span>
                    <div>
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-[#123624] leading-snug group-hover:text-[#12602F] transition-colors line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-[11px] font-mono text-stone-400 italic line-clamp-1">
                        {item.botanicalName}
                      </p>
                    </div>
                  </div>

                  {/* Scientific Origin & Extraction Chips */}
                  <div className="bg-[#FAF8F5] rounded-2xl p-3 border border-[#EAE3D2] space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs gap-2">
                      <span className="text-stone-500 font-medium flex items-center gap-1">
                        <Compass className="w-3 h-3 text-[#8C6221]" />
                        Origin:
                      </span>
                      <span className="font-bold text-[#1C2E1A] truncate text-right">{item.origin}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs gap-2">
                      <span className="text-stone-500 font-medium flex items-center gap-1">
                        <FlaskConical className="w-3 h-3 text-[#12602F]" />
                        Method:
                      </span>
                      <span className="font-bold text-[#1C2E1A] truncate text-right">{item.extractionMethod}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs gap-2 pt-1 border-t border-[#EAE3D2]/70">
                      <span className="text-stone-500 font-medium flex items-center gap-1">
                        <Dna className="w-3 h-3 text-[#D95B00]" />
                        Target:
                      </span>
                      <span className="font-bold text-[#1C2E1A] truncate text-right text-[11px]">{item.cellularTarget}</span>
                    </div>
                  </div>

                  {/* Proven Dermal Benefits */}
                  <div className="space-y-2 mb-5">
                    <div className="flex items-start gap-2 text-xs text-stone-700 leading-relaxed">
                      <Check className="w-3.5 h-3.5 text-[#12602F] shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{item.primaryBenefit}</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-stone-600 leading-relaxed">
                      <Check className="w-3.5 h-3.5 text-emerald-600/70 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{item.secondaryBenefit}</span>
                    </div>
                  </div>
                </div>

                {/* Paired Product Spotlight Box in Card Footer */}
                {pairedProduct && (
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Link
                        to={getProductUrl(pairedProduct)}
                        className="w-11 h-11 rounded-xl bg-stone-50 border border-stone-200 p-1 shrink-0 overflow-hidden block"
                      >
                        <img
                          src={pairedProduct.img}
                          alt={pairedProduct.name}
                          className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-300"
                        />
                      </Link>

                      <div className="min-w-0">
                        <span className="text-[9px] uppercase font-bold text-stone-400 block tracking-wider">
                          Bottled In
                        </span>
                        <Link to={getProductUrl(pairedProduct)}>
                          <h4 className="text-xs font-bold text-[#1C2E1A] group-hover:text-[#12602F] transition-colors truncate">
                            {pairedProduct.name}
                          </h4>
                        </Link>
                        <span className="text-xs font-serif font-bold text-[#12602F]">
                          ${(pairedProduct.discountPrice || pairedProduct.price).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <Link
                      to={getProductUrl(pairedProduct)}
                      className="px-3 py-1.5 rounded-lg bg-[#123624] hover:bg-[#0E4723] text-white text-[11px] font-bold uppercase tracking-wider transition-all duration-200 shrink-0 flex items-center gap-1 shadow-2xs hover:shadow-xs active:scale-95"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3 text-[#AFD971]" />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Slider Pagination Dots Indicator ── */}
        <div className="flex items-center justify-center gap-2 mt-2 mb-10">
          {filteredIngredients.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => scrollToSlide(dotIdx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeSlide === dotIdx
                  ? 'w-7 bg-[#123624]'
                  : 'w-2 bg-stone-300 hover:bg-stone-400'
              }`}
              aria-label={`Go to slide ${dotIdx + 1}`}
            />
          ))}
        </div>

     

      </div>
    </section>
  );
}
