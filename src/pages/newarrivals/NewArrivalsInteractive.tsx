import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import p8 from '../../assets/product/p8.avif';
import p11 from '../../assets/product/p11.avif';
import p12 from '../../assets/product/p3.jpg';

interface Hotspot {
  x: string;
  y: string;
  value: string;
  label: string;
  tooltip: string;
}

interface NewReleaseItem {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  tag: string;
  tagColor: string;
  price: number;
  originalPrice: number;
  image: string;
  hotspots: Hotspot[];
  clinicalHighlights: string[];
  ingredientCount: number;
  researchMonths: number;
}

const NEW_RELEASES: NewReleaseItem[] = [
  {
    id: 8,
    title: 'Bakuchiol Natural Firming Elixir',
    subtitle: 'Gentle plant-derived retinol alternative that visibly restores firmness and refines skin architecture without irritation.',
    category: 'Targeted Serum',
    tag: 'DROP 01',
    tagColor: '#8B7443',
    price: 31.00,
    originalPrice: 38.00,
    image: p8,
    ingredientCount: 14,
    researchMonths: 28,
    clinicalHighlights: [
      'Reduces appearance of fine lines by 42% in 28 days',
      'Lipid-stabilized squalane for deep moisture retention',
      'Daily AM/PM application safe for sensitive skin'
    ],
    hotspots: [
      { x: '47%', y: '40%', value: '2.0%', label: 'Active Bakuchiol', tooltip: 'High-purity botanical extract clinically proven equivalent to retinol without the irritation.' },
      { x: '43%', y: '55%', value: '96%', label: 'Cellular Elasticity', tooltip: 'Dermal elasticity improvement score measured in a controlled 4-week clinical trial.' },
      { x: '52%', y: '68%', value: '100%', label: 'Cold Extracted', tooltip: 'Zero-thermal extraction preserves all live antioxidant enzymes and polyphenols.' }
    ]
  },
  {
    id: 11,
    title: 'Peptide Collagen Boost Fluid',
    subtitle: 'Multi-peptide matrix delivering transdermal cellular renewal and instant bouncy firmness across facial contours.',
    category: 'Regenerative Fluid',
    tag: 'DROP 02',
    tagColor: '#7A6536',
    price: 34.00,
    originalPrice: 40.00,
    image: p11,
    ingredientCount: 11,
    researchMonths: 24,
    clinicalHighlights: [
      'Hexapeptide complex stimulates natural collagen synthesis',
      'Ultra-lightweight watery texture with zero greasy residue',
      'Instantly plumps epidermal surface and enhances bounce'
    ],
    hotspots: [
      { x: '49%', y: '36%', value: '5-Peptides', label: 'Matrix Complex', tooltip: 'Multi-chain peptides precisely targeted at distinct dermal layer depths for maximum renewal.' },
      { x: '52%', y: '60%', value: '72h', label: 'Moisture Barrier', tooltip: 'Time-release hydration technology sustains continuous moisture barrier for 72 hours.' },
      { x: '45%', y: '76%', value: '99%', label: 'Bio-Identical', tooltip: 'Cellular recognition peptide sequence matching natural epidermal signaling paths.' }
    ]
  },
  {
    id: 12,
    title: 'Vitamin E Overnight Recovery Mask',
    subtitle: 'Rich antioxidant overnight treatment creating a protective moisture cocoon for waking up with dewy, revived skin.',
    category: 'Overnight Treatment',
    tag: 'DROP 03',
    tagColor: '#8C6C38',
    price: 24.00,
    originalPrice: 29.00,
    image: p12,
    ingredientCount: 9,
    researchMonths: 18,
    clinicalHighlights: [
      'Overnight restorative barrier replenishment while you sleep',
      'Stabilized Vitamin E + Ferulic acid neutralizes oxidative stress',
      'Melts into skin on contact with a silky, velvety finish'
    ],
    hotspots: [
      { x: '49%', y: '38%', value: '98%', label: 'Lipid Replenishment', tooltip: 'Restores depleted stratum corneum lipids overnight for complete barrier recovery.' },
      { x: '46%', y: '58%', value: '0%', label: 'Synthetic Fillers', tooltip: '100% active formulation with absolutely zero parabens, silicones, or synthetic fillers.' },
      { x: '53%', y: '74%', value: '12h', label: 'Deep Infusion', tooltip: 'Time-release nutrient cocoon acting continuously across REM cellular restoration phases.' }
    ]
  }
];

const CUSTOM_KEYFRAMES = `
@keyframes luxury-pulse {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(196, 172, 128, 0.5); }
  70% { transform: scale(1); box-shadow: 0 0 0 14px rgba(196, 172, 128, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(196, 172, 128, 0); }
}
@keyframes luxury-timer-fill {
  0% { transform: scaleX(0); }
  100% { transform: scaleX(1); }
}
`;

interface NewArrivalsInteractiveProps {
  onAddToCart: (product: { id: number; name: string; price: number; img: string }, openCart?: boolean) => void;
}

export default function NewArrivalsInteractive({ onAddToCart }: NewArrivalsInteractiveProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const current = NEW_RELEASES[activeIdx];
  const activeSpot = current.hotspots[activeHotspot] || current.hotspots[0];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSectionVisible(true);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const switchProduct = (idx: number) => {
    if (idx === activeIdx || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIdx(idx);
      setActiveHotspot(0);
      setTimerKey((k) => k + 1);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 280);
  };

  // 10-Second Auto Change Animation Timer
  useEffect(() => {
    if (!isSectionVisible || isPaused) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIdx((prev) => (prev + 1) % NEW_RELEASES.length);
        setActiveHotspot(0);
        setTimerKey((k) => k + 1);
        setTimeout(() => setIsTransitioning(false), 50);
      }, 280);
    }, 10000);

    return () => clearInterval(interval);
  }, [isSectionVisible, isPaused, activeIdx]);

  useEffect(() => {
    setActiveHotspot(0);
  }, [activeIdx]);

  const discountPercent = Math.round(((current.originalPrice - current.price) / current.originalPrice) * 100);

  return (
    <>
      <style>{CUSTOM_KEYFRAMES}</style>

      <section
        ref={sectionRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative bg-white text-[#1A1A1A] overflow-hidden lg:h-[90vh] lg:min-h-170 lg:max-h-230 flex flex-col justify-between py-6 sm:py-8 lg:py-6 border-b border-[#F0ECE1]"
      >
        {/* Subtle Ambient Light Gradients on White */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-24 right-1/4 w-125 h-125 rounded-full opacity-40 blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(244, 238, 226, 0.8) 0%, rgba(255, 255, 255, 0) 70%)' }}
          />
          <div
            className="absolute -bottom-32 left-10 w-150 h-150 rounded-full opacity-35 blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(230, 220, 205, 0.4) 0%, rgba(255, 255, 255, 0) 70%)' }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#1A1A1A 1px, transparent 1px)',
              backgroundSize: '32px 32px'
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-between">

          {/* ═══════════════ 1. COMPACT EDITORIAL TOP HEADER ═══════════════ */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#E5E0D5]">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-[#9e7427]" />
                <span className="text-[11px] font-extrabold tracking-[0.25em] uppercase text-[#9e7427]">
                  Formula Exploration Lab
                </span>
                <span className="text-[#A8A195]">·</span>
                <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#184433]">
                  Interactive Active Compound Analysis
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#1A1A1A] leading-none tracking-tight">
                Inspect The <span className="font-medium text-[#184433]">Formulation</span> In <span className="font-medium text-[#b48320]">Real-Time</span>
              </h2>
            </div>

            {/* Drop Segment Switcher with 10s Timer Indicator */}
            <div className="inline-flex items-center bg-[#F4F1EA] p-1 rounded-full border border-[#D8D2C4] shadow-sm self-start sm:self-auto">
              {NEW_RELEASES.map((item, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <button
                    key={item.id}
                    onClick={() => switchProduct(idx)}
                    className={`relative px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.12em] uppercase transition-all duration-300 cursor-pointer flex items-center gap-2 overflow-hidden ${isActive
                        ? 'bg-[#1A1A1A] text-white shadow-md'
                        : 'text-[#5A5245] hover:text-[#1A1A1A] hover:bg-white/80'
                      }`}
                  >
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C4AC80]" />
                    )}
                    <span>{item.tag}</span>

                    {/* Active 10s Timer Fill Animation */}
                    {isActive && (
                      <span
                        key={timerKey}
                        className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-[#C4AC80] origin-left"
                        style={{
                          animation: !isPaused ? 'luxury-timer-fill 10s linear forwards' : 'none'
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ═══════════════ 2. MAIN INTERACTIVE SHOWCASE STAGE (Fit in 90vh) ═══════════════ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center my-auto py-2 lg:py-0">

            {/* LEFT: Full Card Product Visual Stage (5 Cols) */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div
                className={`relative w-full h-95 sm:h-107.5 lg:h-115 rounded-xl overflow-hidden border border-[#DCD5C8] shadow-[0_12px_36px_rgba(0,0,0,0.06)] group bg-[#FAF8F5] transition-all duration-500 ${isTransitioning ? 'opacity-40 scale-95 blur-[1px]' : 'opacity-100 scale-100 blur-0'
                  }`}
              >
                {/* Full-Bleed Product Image */}
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle Luxury Gradient Overlays for High Contrast */}
                <div className="absolute inset-0 bg-linear-to-b from-black/25 via-transparent to-black/30 pointer-events-none" />

                {/* Floating Top-Right Batch Tag */}
                <div className="absolute top-4 right-4 z-20 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#C5BBAA] text-[11px] font-extrabold tracking-[0.15em] uppercase text-[#1A1A1A] shadow-md">
                  {current.researchMonths} MO CLINICAL R&D
                </div>
              </div>
            </div>

            {/* RIGHT: Formula Intelligence & Purchase Panel (7 Cols) */}
            <div
              className={`lg:col-span-7 flex flex-col justify-center transition-all duration-500 ${isTransitioning ? 'opacity-40 translate-x-2 blur-[1px]' : 'opacity-100 translate-x-0 blur-0'
                }`}
            >
              {/* Category & Status Pills */}
              <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                <span
                  className="px-3.5 py-1 rounded-full text-xs font-bold tracking-[0.18em] uppercase border bg-[#F8F5EE] border-[#C8BFA] text-[#6E5522]"
                >
                  {current.category}
                </span>
                <span className="text-xs font-bold tracking-[0.15em] uppercase text-[#1A1A1A]">
                  2026 Batch Release · Micro-Stabilized
                </span>
              </div>

              {/* Title & Narrative */}
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-[2.5rem] font-normal text-[#1A1A1A] leading-[1.12] tracking-tight mb-2">
                {current.title}
              </h3>
              <p className="text-sm sm:text-base text-[#2E2A24] font-normal leading-relaxed mb-4 max-w-xl">
                {current.subtitle}
              </p>

              {/* ── Active Compound Spotlight Card ── */}
              <div className="mb-4 rounded-xl p-4 sm:p-5 border border-[#D8D0C3] bg-linear-to-br from-[#FAF8F5] to-[#FFFFFF] shadow-sm relative overflow-hidden">
                {/* Top Bar */}
                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#E8E1D5]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#8B7443] animate-pulse" />
                    <span className="text-xs font-extrabold tracking-[0.18em] uppercase text-[#6B5930]">
                      Active Compound Specification
                    </span>
                  </div>

                  <span className="font-mono text-base sm:text-lg font-extrabold text-[#7A6028]">
                    {activeSpot.value}
                  </span>
                </div>

                {/* Selected Hotspot Content Grid */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <span className="block text-sm sm:text-base font-extrabold uppercase tracking-wide text-[#1A1A1A] mb-1">
                      {activeSpot.label}
                    </span>
                    <p className="text-sm text-[#2E2A24] font-normal leading-relaxed">
                      {activeSpot.tooltip}
                    </p>
                  </div>
                </div>
              </div>

              {/* ── Clinical Trial Highlights ── */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
                {current.clinicalHighlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-2.5 rounded-lg bg-[#F8F6F1] border border-[#D5CDC0]"
                  >
                    <div className="w-4 h-4 rounded-full bg-white border border-[#8B7443] flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5 text-[#7A6028]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="text-xs text-[#1A1A1A] font-medium leading-snug">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>

              {/* ── Price & Call to Actions ── */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#E5E0D5]">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-mono text-2xl sm:text-3xl font-bold text-[#1A1A1A] tracking-tight">
                    ${current.price.toFixed(2)}
                  </span>
                  <span className="font-mono text-sm text-[#736D64] line-through font-medium">
                    ${current.originalPrice.toFixed(2)}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#F5EEDD] text-[#5A481B] border border-[#D8CCA8] text-xs font-bold uppercase tracking-wider">
                    {discountPercent}% SAVING
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      onAddToCart(
                        {
                          id: current.id,
                          name: current.title,
                          price: current.price,
                          img: current.image
                        },
                        true
                      )
                    }
                    className="relative group overflow-hidden inline-flex items-center gap-2.5 px-6 sm:px-8 py-2.5 rounded-full bg-[#1A1A1A] hover:bg-[#2B2B2B] text-white text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer"
                  >
                    {/* Hover Light Sweep */}
                    <span
                      className="absolute top-0 left-0 w-20 h-full bg-white/15 skew-x-[-20deg] pointer-events-none group-hover:translate-x-60 transition-transform duration-700"
                    />
                    <svg className="w-4 h-4 text-[#C4AC80]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Add to Bag</span>
                  </button>

                  <Link
                    to={`/products/${current.id}`}
                    className="inline-flex items-center gap-1.5 px-4 sm:px-8 py-2 rounded-full border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300"
                  >
                    <span>Details</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </div>

            </div>

          </div>

          {/* ═══════════════ 3. BOTTOM BATCH METRIC RIBBON (Integrated into 90vh) ═══════════════ */}
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#E5E0D5]">
            {current.hotspots.map((spot, i) => {
              const isSelected = activeHotspot === i;
              return (
                <button
                  key={i}
                  onClick={() => setActiveHotspot(i)}
                  className={`p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer flex items-center justify-between gap-3 ${isSelected
                      ? 'bg-[#F9F7F2] border-[#8B7443] shadow-sm ring-1 ring-[#8B7443]/40'
                      : 'bg-white border-[#DCD5C8] hover:border-[#8B7443] hover:bg-[#FAF8F5]'
                    }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#8B7443]' : 'bg-[#C4AC80]'}`} />
                      <span className="block text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#1A1A1A] truncate">
                        {spot.label}
                      </span>
                    </div>
                    <span className="block text-xs text-[#3E3933] font-normal truncate">
                      {spot.tooltip}
                    </span>
                  </div>
                  <span className="font-mono text-sm sm:text-base font-extrabold text-[#7A6028] shrink-0 pl-2">
                    {spot.value}
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
}
