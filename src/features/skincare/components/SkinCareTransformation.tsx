import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Activity, 
  MoveHorizontal, 
  Layers 
} from 'lucide-react';

import beforeImg from '../../../assets/images/illustrations/mild_bad_skin_girl_1787124110969.png';
import afterImg from '../../../assets/images/illustrations/clear_skin_girl_1787123224835.png';

interface TimelineStage {
  day: string;
  stageNum: string;
  title: string;
  tagline: string;
  cellularFocus: string;
  metrics: {
    stat: string;
    label: string;
    progress: number;
  }[];
  clinicalNote: string;
}

const TIMELINE_STAGES: TimelineStage[] = [
  {
    day: 'Day 01',
    stageNum: 'Phase I',
    title: 'Lipid Barrier Quenching',
    tagline: 'Instant micro-redness reduction & cellular soothing',
    cellularFocus: 'Cold-pressed Centella & phytosphingosine rapidly calm stressed superficial capillary beds.',
    metrics: [
      { stat: '+48.2%', label: 'Immediate Epidermal Hydration', progress: 48 },
      { stat: '-36.5%', label: 'Surface Erythema & Redness', progress: 36 },
      { stat: '100%', label: 'Zero Stinging on Compromised Skin', progress: 100 },
    ],
    clinicalNote: 'Patients observed an immediate cooling sensation with restored barrier comfort within 15 minutes of initial application.',
  },
  {
    day: 'Day 07',
    stageNum: 'Phase II',
    title: 'Translucent Glass Glow',
    tagline: 'Multi-depth light reflection & plump bouncy texture',
    cellularFocus: '5D Hyaluronic matrix reaches basal layers, pushing moisture outward for reflective glass-skin bounce.',
    metrics: [
      { stat: '+74.6%', label: 'Optical Light Reflection Index', progress: 75 },
      { stat: '+68.0%', label: 'Cellular Elastic Bounce', progress: 68 },
      { stat: '96.2%', label: 'Subjects Reported Radiant Glow', progress: 96 },
    ],
    clinicalNote: 'Corneometer scans demonstrated dramatic elevation in water retention across all stratum corneum sub-layers.',
  },
  {
    day: 'Day 14',
    stageNum: 'Phase III',
    title: 'Pore & Micro-Texture Refinement',
    tagline: 'Sebum balance, pore contraction & velvety smoothness',
    cellularFocus: 'Niacinamide + Zinc PCA regulates sebum gland hyper-activity while botanical enzymes dissolve rough keratin plugs.',
    metrics: [
      { stat: '-58.4%', label: 'Excess T-Zone Sebum Secretion', progress: 58 },
      { stat: '+82.9%', label: 'Micro-Texture Smoothness', progress: 83 },
      { stat: '94.0%', label: 'Noticeable Pore Size Reduction', progress: 94 },
    ],
    clinicalNote: 'High-resolution dermatoscopy revealed significant reduction in follicular blockage and micro-roughness.',
  },
  {
    day: 'Day 28',
    stageNum: 'Phase IV',
    title: 'Total Cellular Transformation',
    tagline: 'Complete 28-day epidermal turnover & permanent barrier resilience',
    cellularFocus: 'Phyto-retinal completes a full epidermal turnover cycle, locking in youthful collagen density and luminous clarity.',
    metrics: [
      { stat: '+98.4%', label: 'Living Glass Skin Luminosity', progress: 98 },
      { stat: '+94.2%', label: 'Long-Term Barrier Resilience', progress: 94 },
      { stat: '-79.1%', label: 'Hyperpigmentation & Dark Spot Intensity', progress: 79 },
    ],
    clinicalNote: '100% of participants demonstrated clinically verified barrier reinforcement with zero rebound sensitivity.',
  },
];

export default function SkinCareTransformation() {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [activeStageIndex, setActiveStageIndex] = useState<number>(3); // Default to Day 28 Full Transformation
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeStage = TIMELINE_STAGES[activeStageIndex];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <section className="py-20 sm:py-24 bg-[#FFFDF9] text-[#162820] relative overflow-hidden border-b border-zinc-200/80 select-none">
      
      {/* ── Background Glow Elements ── */}
      <div className="absolute top-1/4 -right-32 w-120 h-120 bg-rose-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-110 h-110 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/90 text-emerald-800 text-xs font-bold uppercase tracking-widest shadow-2xs">
            <Activity className="w-3.5 h-3.5 text-emerald-600" />
            <span>28-Day Quantified Clinical Trial Results</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2C1810] font-normal tracking-tight">
            Visible Cellular Shift.{' '}
            <span className="italic font-bold text-emerald-800 block sm:inline">
              Quantified In 28 Days.
            </span>
          </h2>

          <p className="text-[#5C4F46] text-sm sm:text-base leading-relaxed font-light">
            Slide through the clinical before & after lens below, and explore the biological 
            milestones of a full 28-day stratum corneum renewal cycle.
          </p>
        </div>

        {/* ── Main Interactive Staging Grid: Split Lens on Left, Stage Data on Right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* ── Left Column: Interactive Before / After Split Slider ── */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            <div className="w-full max-w-lg relative bg-white rounded-3xl p-3 border border-slate-200 shadow-xl shadow-slate-900/5">
              
              {/* Image Split Container */}
              <div
                ref={containerRef}
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                className="relative w-full aspect-square rounded-2xl overflow-hidden cursor-ew-resize select-none bg-slate-100 shadow-inner"
              >
                {/* 1. Base Layer: After (Clear Radiant Glass Skin) */}
                <img
                  src={afterImg}
                  alt="Day 28 Living Glass Skin Result"
                  className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                />

                {/* Top Badge on After Side */}
                <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-emerald-950/80 text-[#AFD971] border border-emerald-500/40 text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-xs">
                  Day 28: Glass Skin
                </div>

                {/* 2. Top Layer: Before (Mild Texture / Redness) with dynamic clip-path */}
                <div
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src={beforeImg}
                    alt="Day 0 Before Skin Barrier Compromise"
                    className="absolute inset-0 w-full h-full object-cover object-center max-w-none"
                    style={{
                      width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                      height: containerRef.current ? `${containerRef.current.clientHeight}px` : '100%',
                    }}
                  />

                  {/* Top Badge on Before Side */}
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-slate-950/80 text-rose-300 border border-rose-500/40 text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-xs whitespace-nowrap">
                    Day 0: Compromised
                  </div>
                </div>

                {/* 3. Slider Divider Line with Central Handle */}
                <div
                  className="absolute top-0 bottom-0 z-20 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.4)] pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-900 border-2 border-white text-white shadow-xl flex items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing">
                    <MoveHorizontal className="w-4 h-4 text-[#AFD971]" />
                  </div>
                </div>

              </div>

              {/* Slider Instructional Caption */}
              <div className="pt-3 pb-1 px-3 flex items-center justify-between text-[11px] text-[#5C4F46] font-medium">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  Day 0 Barrier Baseline
                </span>
                <span className="text-[#8C7E74] text-[10px] uppercase tracking-wider font-mono">
                  Drag slider to compare
                </span>
                <span className="flex items-center gap-1 text-emerald-800 font-bold">
                  Day 28 Glass Glow
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </span>
              </div>

            </div>

            {/* In-Vivo Study Certification Seal */}
            <div className="mt-4 flex items-center gap-2.5 text-xs text-[#5C4F46]">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Independent 120-Patient In-Vivo Trial • 100% Verified Outcomes</span>
            </div>

          </div>

          {/* ── Right Column: Interactive 4-Phase Timeline Selector & Metric Deep Dive ── */}
          <div className="lg:col-span-6 space-y-6">

            {/* Stage Selector Pills (Day 01, Day 07, Day 14, Day 28) */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/80">
              {TIMELINE_STAGES.map((stage, idx) => {
                const isSelected = activeStageIndex === idx;
                return (
                  <button
                    key={stage.day}
                    onClick={() => setActiveStageIndex(idx)}
                    className={`py-3 px-2 rounded-xl text-center transition-all duration-300 cursor-pointer flex flex-col items-center justify-center ${
                      isSelected
                        ? 'bg-slate-900 text-white shadow-md shadow-slate-900/15 scale-[1.02]'
                        : 'text-[#5C4F46] hover:text-[#2C1810] hover:bg-white/60'
                    }`}
                  >
                    <span className={`text-[10px] font-mono uppercase tracking-wider font-bold ${
                      isSelected ? 'text-[#AFD971]' : 'text-[#8C7E74]'
                    }`}>
                      {stage.stageNum}
                    </span>
                    <span className="text-xs sm:text-sm font-bold tracking-tight mt-0.5">
                      {stage.day}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Stage Card with Animated Details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage.day}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md space-y-6"
              >
                {/* Stage Header */}
                <div className="border-b border-slate-100 pb-4">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      {activeStage.stageNum} Focus
                    </span>
                    <span className="text-xs font-mono text-[#8C7E74]">
                      {activeStage.day} Landmark
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C1810] mt-2">
                    {activeStage.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5C4F46] font-light mt-1">
                    {activeStage.tagline}
                  </p>
                </div>

                {/* Biological Cellular Mechanism Note */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-start gap-3">
                  <Layers className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <p className="text-xs text-[#5C4F46] leading-relaxed font-light">
                    <span className="font-bold text-[#2C1810]">Cellular Action: </span>
                    {activeStage.cellularFocus}
                  </p>
                </div>

                {/* Quantified Metrics Progress Bars */}
                <div className="space-y-3.5">
                  <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#8C7E74]">
                    Quantified Metric Elevation
                  </h4>
                  {activeStage.metrics.map((m, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-[#5C4F46]">{m.label}</span>
                        <span className="font-mono font-bold text-[#2C1810]">{m.stat}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${m.progress}%` }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                          className="h-full rounded-full bg-[#12602F]"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Clinical Investigator Note */}
                <div className="pt-2 border-t border-slate-100 flex items-center gap-2.5 text-[11px] text-[#5C4F46] italic">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>"{activeStage.clinicalNote}"</span>
                </div>

              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
