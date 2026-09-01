import { useState } from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';

const TIMELINE_DATA = [
  {
    day: 'Day 01',
    title: 'Instant Barrier Quench & Dewy Finish',
    desc: 'Immediate alleviation of surface tightness. 5D Hyaluronic matrix creates a non-greasy moisture shield, reflecting light for instant glass-skin radiance.',
    stat1: '+98%',
    stat1Label: 'Immediate Hydration Surge',
    stat2: '100%',
    stat2Label: 'Zero Stinging / Itching',
    highlight: 'Instant comfort for reactive or sensitive skin barriers.',
  },
  {
    day: 'Day 07',
    title: 'Lipid Intercellular Reconstruction',
    desc: 'Tri-Ceramides fuse into micro-lipid fissures. Trans-epidermal water loss (TEWL) is drastically suppressed, preventing daytime moisture evaporation.',
    stat1: '+76%',
    stat1Label: 'Barrier Integrity Recovered',
    stat2: '-38%',
    stat2Label: 'Surface Flaking / Redness',
    highlight: 'Makeup applies with zero clinging or dry patches.',
  },
  {
    day: 'Day 14',
    title: 'Melanin Harmony & Visible Pore Refinement',
    desc: 'Centella triterpenes and 10% Niacinamide soothe cytokine inflammation. Pores appear tightened, and localized dark spots begin noticeable fading.',
    stat1: '+94%',
    stat1Label: 'Dermal Moisture Retention',
    stat2: '-48%',
    stat2Label: 'Micro-Capillary Redness',
    highlight: 'Clearer, even-toned complexion without needing heavy foundation.',
  },
  {
    day: 'Day 28',
    title: 'Full Fibroblast Collagen & Cellular Transformation',
    desc: 'Completed one full epidermal keratinocyte renewal cycle. Dermal density is significantly elevated with bouncy firmness and lasting luminous glow.',
    stat1: '+82%',
    stat1Label: 'Dermal Elasticity & Firmness',
    stat2: '98.4%',
    stat2Label: 'Patron Repurchase Intent',
    highlight: 'Transformation verified with spectrophotometric scanning.',
  },
];

export default function SkinCareClinicalProof() {
  const [activeDayIndex, setActiveDayIndex] = useState(2); // Day 14 default
  const activeTimeline = TIMELINE_DATA[activeDayIndex];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F0] border-b border-[#EAE3D2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#8C6221] uppercase tracking-[0.25em] mb-2 block">
            Quantified Clinical In-Vivo Trials
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#123624] font-normal leading-tight">
            Documented Results You Can Measure
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-light mt-3">
            Evaluated on 120 subjects aged 22–58 across 28 days under strict double-blind dermatological supervision.
          </p>
        </div>

        {/* 4-Day Timeline Stepper */}
        <div className="flex justify-center max-w-3xl mx-auto mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 p-1.5 bg-white rounded-2xl border border-[#DDD3C1] shadow-2xs w-full gap-1">
            {TIMELINE_DATA.map((item, idx) => (
              <button
                key={item.day}
                onClick={() => setActiveDayIndex(idx)}
                className={`py-3 px-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer text-center ${
                  activeDayIndex === idx
                    ? 'bg-[#12602F] text-white shadow-md'
                    : 'text-stone-600 hover:text-[#12602F] hover:bg-[#FAF8F4]'
                }`}
              >
                <span className="block font-bold">{item.day}</span>
                <span className="text-[10px] opacity-80 font-normal hidden sm:block">
                  {idx === 0 ? 'Instant' : idx === 1 ? '7 Days' : idx === 2 ? '14 Days' : '28 Days'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Interactive Clinical Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#DDD3C1] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Stage Details */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-50 border border-amber-200 text-[#8C6221] text-[10px] font-bold uppercase tracking-wider font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Milestone: {activeTimeline.day} In-Vivo Dermal Assessment</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#123624] leading-snug">
              {activeTimeline.title}
            </h3>

            <p className="text-sm text-stone-600 font-light leading-relaxed">
              {activeTimeline.desc}
            </p>

            <div className="p-4 bg-[#FAF8F4] rounded-2xl border border-[#E5DEC9] text-xs text-[#12602F] font-bold flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#12602F] shrink-0" />
              <span>{activeTimeline.highlight}</span>
            </div>
          </div>

          {/* Right Stage Stats */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="bg-linear-to-b from-[#F2EFE7] to-[#FAF8F4] p-6 rounded-2xl border border-[#DDD3C1] text-center space-y-2 hover:border-[#12602F]/40 transition-colors shadow-2xs">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#12602F] block">
                {activeTimeline.stat1}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-700 block">
                {activeTimeline.stat1Label}
              </span>
              <span className="text-[9px] text-stone-400 font-mono block">Corneometer Capacitance</span>
            </div>

            <div className="bg-linear-to-b from-[#F2EFE7] to-[#FAF8F4] p-6 rounded-2xl border border-[#DDD3C1] text-center space-y-2 hover:border-[#8C6221]/40 transition-colors shadow-2xs">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#8C6221] block">
                {activeTimeline.stat2}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-700 block">
                {activeTimeline.stat2Label}
              </span>
              <span className="text-[9px] text-stone-400 font-mono block">Spectrophotometry Scan</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
