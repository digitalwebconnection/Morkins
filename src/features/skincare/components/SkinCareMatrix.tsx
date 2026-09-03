import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../lib/utils/cn';
import { ArrowLeft, ArrowRight, Sparkles, Check, X } from 'lucide-react';

import p1 from '../../../assets/images/product/p1.jpg';
import p2 from '../../../assets/images/product/p2.jpg';
import p4 from '../../../assets/images/product/p4.jpg';
import p6 from '../../../assets/images/product/p6.jpg';
import p8 from '../../../assets/images/product/p8.avif';

interface MatrixItem {
  id: string;
  num: string;
  tag: string;
  title: string;
  highlight: string;
  advantage: string;
  description: string;
  morkins: string;
  others: string;
  image: string;
  theme: {
    accentColor: string;
    highlightText: string;
    badge: string;
    advantagePill: string;
    morkinsBox: string;
    morkinsIconBg: string;
    morkinsTag: string;
    dotActive: string;
    cardRing: string;
    stageBg: string;
  };
}

const MATRIX_ITEMS: MatrixItem[] = [
  {
    id: 'extraction',
    num: '01',
    tag: 'Extraction Process',
    title: 'Zero-Heat Cold Bio-Extraction',
    highlight: '(<38°C Raw Potency)',
    advantage: '+400% Living Bio-Availability',
    description: 'Heat above 40°C denatures active plant enzymes and destroys vital vitamin polyphenols. Our sub-critical cold pressing preserves 100% living cellular potency.',
    morkins: '100% Raw Living Enzymatic Potency',
    others: 'High-Heat Boiled (>80°C, Enzymes Destroyed)',
    image: p8,
    theme: {
      accentColor: '#D95B00',
      highlightText: 'text-[#D95B00]',
      badge: 'bg-amber-50 text-[#8C6221] border-amber-200',
      advantagePill: 'bg-[#D95B00] text-white shadow-md shadow-orange-950/20',
      morkinsBox: 'bg-amber-50/70 border-amber-200/90 text-amber-950',
      morkinsIconBg: 'bg-[#D95B00] text-white',
      morkinsTag: 'text-[#B45309]',
      dotActive: 'bg-[#D95B00]',
      cardRing: 'ring-2 ring-[#D95B00]/40',
      stageBg: 'bg-amber-50',
    },
  },
  {
    id: 'delivery',
    num: '02',
    tag: 'Dermal Delivery',
    title: 'Lipid Nano-Carrier Cellular Fusion',
    highlight: '(Deep Basal Penetration)',
    advantage: 'Deep Trans-Epidermal Hydration',
    description: 'Biomimetic plant ceramides and phytosphingosine match human skin sebum, driving actives deep past the stratum corneum rather than evaporating superficially.',
    morkins: 'Deep Basal Cellular Lipid Fusion',
    others: 'Superficial Surface Coating Only',
    image: p2,
    theme: {
      accentColor: '#12602F',
      highlightText: 'text-[#12602F]',
      badge: 'bg-emerald-50 text-[#12602F] border-emerald-200',
      advantagePill: 'bg-[#12602F] text-white shadow-md shadow-emerald-950/20',
      morkinsBox: 'bg-emerald-50/70 border-emerald-200/90 text-emerald-950',
      morkinsIconBg: 'bg-[#12602F] text-white',
      morkinsTag: 'text-[#12602F]',
      dotActive: 'bg-[#12602F]',
      cardRing: 'ring-2 ring-[#12602F]/40',
      stageBg: 'bg-emerald-50',
    },
  },
  {
    id: 'clinicals',
    num: '03',
    tag: 'Clinical Validation',
    title: 'In-Vivo Dermatologist Human Trials',
    highlight: '(Quantified Spectrophotometry)',
    advantage: 'Documented Cellular Proof',
    description: 'Quantified bio-instrument capacitance measurements and spectrophotometry scans prove genuine barrier lipid recovery, melanin harmony, and reduced redness.',
    morkins: 'Corneometer & Spectrophotometry Proof',
    others: 'Subjective Self-Report Surveys Only',
    image: p1,
    theme: {
      accentColor: '#BE123C',
      highlightText: 'text-[#BE123C]',
      badge: 'bg-rose-50 text-[#9F1239] border-rose-200',
      advantagePill: 'bg-[#BE123C] text-white shadow-md shadow-rose-950/20',
      morkinsBox: 'bg-rose-50/70 border-rose-200/90 text-rose-950',
      morkinsIconBg: 'bg-[#BE123C] text-white',
      morkinsTag: 'text-[#9F1239]',
      dotActive: 'bg-[#BE123C]',
      cardRing: 'ring-2 ring-[#BE123C]/40',
      stageBg: 'bg-rose-50',
    },
  },
  {
    id: 'base',
    num: '04',
    tag: 'Clean Base Formulation',
    title: 'Zero Comedogenic Mineral Oils',
    highlight: '(100% Breathable Squalane)',
    advantage: 'Pores Breathe Freely 24/7',
    description: 'Silicones and petrolatum create a plastic-like film over pores that traps anaerobic bacteria. Our pure plant squalane allows 24/7 natural dermal respiration.',
    morkins: '100% Breathable Plant Squalane & Lipids',
    others: 'Cheap Petrochemicals & Dimethicone',
    image: p4,
    theme: {
      accentColor: '#0284C7',
      highlightText: 'text-[#0284C7]',
      badge: 'bg-sky-50 text-[#0369A1] border-sky-200',
      advantagePill: 'bg-[#0284C7] text-white shadow-md shadow-sky-950/20',
      morkinsBox: 'bg-sky-50/70 border-sky-200/90 text-sky-950',
      morkinsIconBg: 'bg-[#0284C7] text-white',
      morkinsTag: 'text-[#0369A1]',
      dotActive: 'bg-[#0284C7]',
      cardRing: 'ring-2 ring-[#0284C7]/40',
      stageBg: 'bg-sky-50',
    },
  },
  {
    id: 'preservation',
    num: '05',
    tag: 'Preservative Integrity',
    title: 'Bio-Fermented Clean Preservatives',
    highlight: '(Microbiome Nourishing)',
    advantage: 'Microbiome Friendly & Safe',
    description: 'Natural bio-fermented radish root antimicrobial peptides protect formulation purity while actively supporting and nourishing your natural skin acid mantle.',
    morkins: 'Radish Root & Ferment Filtrates',
    others: 'Synthetic Parabens & Phenoxyethanol',
    image: p6,
    theme: {
      accentColor: '#7C3AED',
      highlightText: 'text-[#7C3AED]',
      badge: 'bg-purple-50 text-[#6D28D9] border-purple-200',
      advantagePill: 'bg-[#7C3AED] text-white shadow-md shadow-purple-950/20',
      morkinsBox: 'bg-purple-50/70 border-purple-200/90 text-purple-950',
      morkinsIconBg: 'bg-[#7C3AED] text-white',
      morkinsTag: 'text-[#6D28D9]',
      dotActive: 'bg-[#7C3AED]',
      cardRing: 'ring-2 ring-[#7C3AED]/40',
      stageBg: 'bg-purple-50',
    },
  },
];

export default function SkinCareMatrix() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const activeItem = MATRIX_ITEMS[activeIndex];

  // Auto-play effect (advances smoothly every 4.5 seconds when not hovered)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % MATRIX_ITEMS.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % MATRIX_ITEMS.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + MATRIX_ITEMS.length) % MATRIX_ITEMS.length);
  };

  // Pre-calculated rotations for the 3D card stack
  const rotations = useMemo(() => [4, -3, -8, 6, -5], []);

  return (
    <section id="skincare-matrix" className="py-8 sm:py-12 lg:py-14 bg-[#FAF8F5] border-b border-[#EAE3D2] relative overflow-hidden">
      {/* ── Dynamic Ambient Background Atmosphere ── */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Header ── */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50/90 border border-amber-200 text-[#8C6221] text-[11px] font-bold uppercase tracking-[0.2em] shadow-2xs mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D95B00]" />
            <span>Clinical Formulation Benchmark</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2C1810] font-normal leading-tight tracking-tight">
            The Botanical Apothecary{' '}
            <span className="font-bold italic text-[#D95B00]">
              Superiority Standards
            </span>
          </h2>

          <p className="text-[#0c0a08] text-sm sm:text-base font-light mt-2.5 max-w-2xl mx-auto leading-relaxed">
            Experience why cold-pressed botanical pharmacology outperforms generic mass-market synthetic formulations.
          </p>
        </div>

        {/* ── 3D Animated Card Stack & Multi-Color Editorial Showcase ── */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
        >

          {/* ── Left Column: 3D Layered Card Stack ── */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div
              className="relative w-full max-w-85 sm:max-w-95 aspect-square"
              style={{ perspective: '1400px' }}
            >
              <AnimatePresence custom={direction}>
                {MATRIX_ITEMS.map((item, index) => {
                  const isActive = index === activeIndex;
                  const offset = index - activeIndex;

                  return (
                    <motion.div
                      key={item.id}
                      className={cn(
                        'absolute inset-0 w-full h-full overflow-hidden rounded-xl border-4 bg-white border-white shadow-2xl transition-all duration-500',
                        isActive ? item.theme.cardRing : ''
                      )}
                      initial={{
                        x: offset * 15,
                        y: Math.abs(offset) * 6,
                        z: -150 * Math.abs(offset),
                        scale: 0.85 - Math.abs(offset) * 0.04,
                        rotateZ: rotations[index % rotations.length],
                        opacity: isActive ? 1 : 0.5,
                        zIndex: 10 - Math.abs(offset),
                      }}
                      animate={
                        isActive
                          ? {
                              x: [offset * 15, direction === 1 ? -180 : 180, 0],
                              y: [Math.abs(offset) * 6, 0, 0],
                              z: [-200, 150, 250],
                              scale: [0.85, 1.05, 1],
                              rotateZ: [rotations[index % rotations.length], -4, 0],
                              opacity: 1,
                              zIndex: 100,
                            }
                          : {
                              x: offset * 15,
                              y: Math.abs(offset) * 6,
                              z: -150 * Math.abs(offset),
                              rotateZ: rotations[index % rotations.length],
                              scale: 0.85 - Math.abs(offset) * 0.04,
                              opacity: 0.55,
                              zIndex: 10 - Math.abs(offset),
                            }
                      }
                      exit={{
                        x: direction === 1 ? -240 : 240,
                        z: -260,
                        scale: 0.75,
                        rotateZ: direction === 1 ? -10 : 10,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.75,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {/* Product Image Stage */}
                      <div className={cn('relative w-full h-full flex items-center justify-center  overflow-hidden', item.theme.stageBg)}>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition-transform duration-500 hover:scale-105"
                          draggable={false}
                        />

                        {/* Top Specimen Badge */}
                        <div className="absolute top-4 left-4 z-10">
                          <span className={cn('px-3 py-1 rounded-full backdrop-blur-xs border font-mono text-[10px] font-bold uppercase tracking-wider shadow-2xs', item.theme.badge)}>
                            Standard {item.num}
                          </span>
                        </div>

                        {/* Bottom Advantage Pill */}
                        <div className="absolute bottom-4 inset-x-4 text-center z-10">
                          <span className={cn('inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-md', item.theme.advantagePill)}>
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>{item.advantage}</span>
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* ── Right Column: Interactive Multi-Color Editorial Details ── */}
          <div className="lg:col-span-7 flex flex-col justify-center min-h-90 space-y-5">
            
            {/* Top Row: Counter & Category Tag */}
            <div className="flex items-center justify-between border-b border-[#EAE3D2] pb-3">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full animate-pulse transition-colors"
                  style={{ backgroundColor: activeItem.theme.accentColor }}
                />
                <span
                  className="text-[11px] font-mono font-bold uppercase tracking-widest transition-colors"
                  style={{ color: activeItem.theme.accentColor }}
                >
                  {activeItem.tag}
                </span>
              </div>

              <span className="font-mono text-xs font-bold text-[#8C7E74]">
                0{activeIndex + 1} / 0{MATRIX_ITEMS.length}
              </span>
            </div>

            {/* Animated Text Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="space-y-4"
              >
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C1810] leading-tight">
                    {activeItem.title}{' '}
                    <span className={cn('block sm:inline font-sans text-xl sm:text-2xl font-bold', activeItem.theme.highlightText)}>
                      {activeItem.highlight}
                    </span>
                  </h3>
                </div>

                <p className="text-[#5C4F46] text-sm sm:text-base font-light leading-relaxed">
                  {activeItem.description}
                </p>

                {/* Side-by-Side Comparison Strips with Themed Accents */}
                <div className="space-y-2.5 pt-2">
                  {/* Morkins Standard */}
                  <div className={cn('border rounded-2xl p-3.5 flex items-start gap-3 shadow-2xs transition-colors duration-300', activeItem.theme.morkinsBox)}>
                    <span className={cn('w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-xs', activeItem.theme.morkinsIconBg)}>
                      <Check className="w-3.5 h-3.5 stroke-3" />
                    </span>
                    <div>
                      <span className={cn('text-[10px] font-bold uppercase tracking-wider block', activeItem.theme.morkinsTag)}>
                        🌿 Morkins Botanical Pharmacology:
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-[#2C1810]">
                        {activeItem.morkins}
                      </span>
                    </div>
                  </div>

                  {/* Commercial Brands */}
                  <div className="bg-stone-100/80 border border-stone-200/80 rounded-2xl p-3.5 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-3.5 h-3.5 stroke-2" />
                    </span>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7E74] block">
                        ✕ Conventional Commercial Standard:
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-[#7A6D63] line-through decoration-stone-300">
                        {activeItem.others}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls & Themed Dots Indicator */}
            <div className="flex items-center justify-between pt-4 border-t border-[#EAE3D2]">
              {/* Pagination Dots */}
              <div className="flex items-center gap-1.5">
                {MATRIX_ITEMS.map((item, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => {
                      setDirection(dotIdx > activeIndex ? 1 : -1);
                      setActiveIndex(dotIdx);
                    }}
                    className={cn(
                      'h-2 rounded-full transition-all duration-300 cursor-pointer',
                      activeIndex === dotIdx
                        ? cn('w-7', item.theme.dotActive)
                        : 'w-2 bg-stone-300 hover:bg-stone-400'
                    )}
                    aria-label={`Go to standard ${dotIdx + 1}`}
                  />
                ))}
              </div>

              {/* Arrow Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-[#DDD3C1] bg-white text-[#2C1810] hover:bg-[#12602F] hover:text-white hover:border-[#12602F] transition-all cursor-pointer shadow-xs active:scale-95"
                  aria-label="Previous standard"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-[#DDD3C1] bg-white text-[#2C1810] hover:bg-[#12602F] hover:text-white hover:border-[#12602F] transition-all cursor-pointer shadow-xs active:scale-95"
                  aria-label="Next standard"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
