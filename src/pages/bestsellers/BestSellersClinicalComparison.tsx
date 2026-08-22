import { useState, useRef, useEffect, useCallback } from 'react';
import badSkinGirl from '../../assets/mild_bad_skin_girl_1787124110969.png';
import clearSkinGirl from '../../assets/clear_skin_girl_1787123224835.png';

interface StudyStat {
  metric: string;
  label: string;
  detail: string;
}

export default function BestSellersClinicalComparison() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(100, (x / width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (isDragging && e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  const stats: StudyStat[] = [
    {
      metric: '98%',
      label: 'Deep Dermal Hydration',
      detail: 'Corneometer evaluation showed significant increase in stratum corneum moisture.'
    },
    {
      metric: '94%',
      label: 'Radiance & Clarity',
      detail: 'Spectrophotometer analysis confirmed reduction in dullness and hyperpigmentation.'
    },
    {
      metric: '96%',
      label: 'Pore & Texture Refinement',
      detail: 'High-resolution dermatological imaging verified cellular surface smoothing.'
    },
    {
      metric: '0%',
      label: 'Adverse Reaction Rate',
      detail: '100% biocompatible on sensitive and reactive skin types in a 30-day cohort.'
    }
  ];

  return (
    <section className="py-16 sm:py-22 bg-[#1C331B] text-white relative overflow-hidden border-b border-[#A68A56]/30">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-[#6F8C51]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-[#A68A56]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#AFD971] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">
            <span>🔬 4-Week Blind Clinical Trial</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-tight">
            Visible Transformations. <br className="hidden sm:inline" />
            <span className="italic font-light text-[#AFD971]">Independently Documented.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/75 font-light leading-relaxed">
            Drag the interactive slider below to inspect the real clinical results of our Best Seller protocol across a 28-day regimen on 35 human participants.
          </p>
        </div>

        {/* Interactive Comparison & Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left: Interactive Before/After Slider */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div
              ref={containerRef}
              onMouseDown={() => setIsDragging(true)}
              onTouchStart={() => setIsDragging(true)}
              className="relative w-full max-w-md aspect-4/5 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 select-none cursor-ew-resize"
            >
              {/* After Image (Background) */}
              <img
                src={clearSkinGirl}
                alt="Day 28 After Protocol"
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
              <span className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-[#AFD971] text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/10">
                Day 28 • Radiance
              </span>

              {/* Before Image (Clipped Foreground) */}
              <div
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={badSkinGirl}
                  alt="Day 0 Initial State"
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable={false}
                />
                <span className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/10">
                  Day 0 • Initial State
                </span>
              </div>

              {/* Slider Divider Line */}
              <div
                style={{ left: `${sliderPosition}%` }}
                className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-20 pointer-events-none"
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white text-[#1C331B] shadow-2xl flex items-center justify-center border-2 border-[#1C331B]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" transform="rotate(90 12 12)" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-white/60 font-light">
              <span>⟵ Drag slider left or right to compare ⟶</span>
            </div>
          </div>

          {/* Right: Clinical Metrics Breakdown */}
          <div className="lg:col-span-6 space-y-5">
            <div className="border-b border-white/15 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#AFD971] block mb-1">
                Clinical Efficacy Scorecard
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                Scientifically Measured Transformation
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stats.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs hover:border-[#AFD971]/40 transition-colors"
                >
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-[#AFD971] mb-1">
                    {item.metric}
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-1.5">
                    {item.label}
                  </h4>
                  <p className="text-[11px] text-white/70 font-light leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Dermatologist Guarantee Callout */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#AFD971]/10 border border-[#AFD971]/30 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#AFD971] text-[#1C331B] flex items-center justify-center font-bold text-xl shrink-0">
                ✓
              </div>
              <div className="text-xs text-white/85 leading-relaxed">
                <strong className="text-white block font-medium">Board-Certified Dermatologist Approved</strong>
                Every formula in our Best Sellers collection undergoes rigorous microbiological, stability, and human repeat insult patch testing (HRIPT).
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
