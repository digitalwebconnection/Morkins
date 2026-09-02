import { useState } from 'react';
import { Droplets, Sparkles, Shield, Clock, CheckCircle2 } from 'lucide-react';

const ROUTINE_STEPS = [
  {
    step: '01',
    time: 'Morning • 2 Mins',
    icon: Droplets,
    title: 'Cleanse & DHT Detox',
    subtitle: 'DHT-Blocker Fortifying Biotin Shampoo',
    action: 'Massage vigorously into wet scalp for 120 seconds to allow cold-pressed Saw Palmetto and Biotin to decongest sebum plugs and block follicular DHT receptors.',
    proTip: 'Leave on for full 2 minutes before rinsing to maximize trans-follicular bio-absorption.',
    tag: 'Daily Foundation',
  },
  {
    step: '02',
    time: 'Daily • 1 Min',
    icon: Sparkles,
    title: 'Awaken & Stimulate',
    subtitle: 'Scalp & Hair Density Serum / Caffeine Tonic',
    action: 'Apply 1 full dropper (approx. 1ml) directly to thinning crown and temporal hairline. Gently tap with fingertips without rinsing out.',
    proTip: 'Encapsulated nano-liposomes penetrate hair bulbs to energize dormant follicles within 120s.',
    tag: 'Targeted Growth',
  },
  {
    step: '03',
    time: 'Evening • 2-3x / Week',
    icon: Shield,
    title: 'Fortify & Seal Barrier',
    subtitle: 'Rosemary & Cedarwood Follicle Oil + Amino Conditioner',
    action: 'Warm 3–4 drops between palms and massage into scalp perimeter and mid-shafts to lock in moisture, nourish lipid barrier, and seal hair shaft cuticle.',
    proTip: 'Acts as a natural botanical vasodilator equivalent to 2% minoxidil without scalp dryness.',
    tag: 'Barrier Defense',
  },
];

const TIMELINE_PHASES = [
  {
    id: 'phase-1',
    days: 'Days 1 – 30',
    title: 'Phase I: Root Detox & Shed Reduction',
    status: 'Cellular Reset',
    desc: 'Scalp micro-inflammation subsides as botanical DHT blockers decongest hair pores. Excessive shedding in the shower drops noticeably as hair bulb anchor sheaths stabilize.',
    stats: [
      { label: 'Reduction in Daily Shower Fall', value: '-64%' },
      { label: 'Scalp Sebum & Flake Normalization', value: '96%' },
    ],
    milestone: 'Stabilized follicle anchor points & refreshed scalp breathing.',
  },
  {
    id: 'phase-2',
    days: 'Days 31 – 60',
    title: 'Phase II: Dormant Follicle Awakening',
    status: 'Anagen Activation',
    desc: 'Redensyl and micro-encapsulated caffeine trigger dormant telogen follicles back into active anagen growth. Fine, soft vellus hairs begin emerging along temples and vertex.',
    stats: [
      { label: 'Follicles Shifted to Anagen Phase', value: '+82%' },
      { label: 'Dermal Micro-Capillary Flow', value: '+140%' },
    ],
    milestone: 'Visible baby hairs sprouting along temporal peaks and crown.',
  },
  {
    id: 'phase-3',
    days: 'Days 61 – 90+',
    title: 'Phase III: Keratin Densification & Volume',
    status: 'Terminal Density',
    desc: 'Newly sprouted hairs mature into robust terminal hair shafts. Individual strand diameter thickens, significantly increasing overall scalp coverage and touchable density.',
    stats: [
      { label: 'Hair Shaft Diameter Increase', value: '+48%' },
      { label: 'Overall Scalp Density Improvement', value: '89%' },
    ],
    milestone: 'Noticeably fuller, thicker hair with sustained biological vitality.',
  },
];

export default function HairCareRoutine() {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);

  return (
    <section id="haircare-routine" className="py-20 sm:py-28 select-none relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] font-bold text-[#A67C52] uppercase tracking-[0.3em] block font-mono">
            Effortless Daily Protocol
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1210] font-normal leading-tight">
            The 3-Minute Daily{' '}
            <span
              className="italic"
              style={{
                background: 'linear-gradient(135deg, #8B5A2B, #C49A6C)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Trichology Regimen
            </span>
          </h2>
          <p className="text-[#7A6E64] text-sm font-light leading-relaxed max-w-2xl mx-auto">
            Maximum hair density requires consistent, targeted action. Three clinical steps calibrated to stop hair fall and stimulate continuous follicle regeneration.
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {ROUTINE_STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="group rounded-2xl border border-[#EDE4D8] p-6 sm:p-8 bg-[#FAF8F5] hover:bg-white hover:border-[#C49A6C]/60 transition-all duration-500 hover:shadow-xl flex flex-col justify-between"
                style={{ boxShadow: '0 6px 24px rgba(44,24,16,0.04)' }}
              >
                <div>
                  {/* Step Top Bar */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl font-bold text-[#2C1810]">
                      {step.step}
                    </span>
                    <span className="text-[9px] font-bold uppercase font-mono tracking-widest text-[#A67C52] bg-white px-3 py-1 rounded-full border border-[#EDE4D8]">
                      {step.tag}
                    </span>
                  </div>

                  {/* Icon & Time */}
                  <div className="flex items-center gap-2 text-xs font-mono text-[#8B5A2B] font-semibold mb-3">
                    <Clock className="w-3.5 h-3.5 text-[#A67C52]" />
                    <span>{step.time}</span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-serif text-xl font-bold text-[#1A1210] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-[11px] font-mono text-[#A67C52] font-semibold mb-4">
                    {step.subtitle}
                  </p>

                  {/* Action Description */}
                  <p className="text-xs text-[#5C4F46] font-light leading-relaxed mb-5">
                    {step.action}
                  </p>
                </div>

                {/* Pro-Tip Box */}
                <div className="pt-4 border-t border-[#EDE4D8] bg-white/70 p-3.5 rounded-xl border">
                  <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase font-mono text-[#2C1810] mb-1">
                    <Icon className="w-3 h-3 text-[#A67C52]" />
                    <span>Clinical Lab Tip</span>
                  </div>
                  <p className="text-[11px] text-[#7A6E64] font-light leading-relaxed">
                    {step.proTip}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 90-Day Clinical Transformation Timeline */}
        <div
          className="rounded-3xl border border-[#EDE4D8] p-6 sm:p-10 lg:p-12 bg-[#FAF7F2] overflow-hidden relative shadow-lg"
          style={{ boxShadow: '0 12px 40px rgba(44,24,16,0.06)' }}
        >
          {/* Timeline Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-[9px] font-bold uppercase font-mono tracking-[0.25em] text-[#A67C52] block mb-1.5">
                Quantified Clinical Progression
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1210]">
                What to Expect in 90 Days
              </h3>
            </div>

            {/* Timeline Phase Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              {TIMELINE_PHASES.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setActivePhaseIndex(idx)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    activePhaseIndex === idx
                      ? 'bg-[#2C1810] text-white shadow-md'
                      : 'bg-white text-[#7A6E64] border border-[#EDE4D8] hover:text-[#2C1810] hover:border-[#C49A6C]'
                  }`}
                >
                  {p.days}
                </button>
              ))}
            </div>
          </div>

          {/* Active Phase Display Card */}
          <div className="bg-white rounded-2xl border border-[#EDE4D8] p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-8 lg:items-center justify-between">
              {/* Left Details */}
              <div className="lg:w-7/12 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold uppercase font-mono tracking-widest px-3 py-1 rounded-full bg-[#FAF5EF] text-[#A67C52] border border-[#EDE4D8]">
                    {TIMELINE_PHASES[activePhaseIndex].status}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#2C1810]">
                    {TIMELINE_PHASES[activePhaseIndex].days}
                  </span>
                </div>

                <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1210]">
                  {TIMELINE_PHASES[activePhaseIndex].title}
                </h4>

                <p className="text-xs sm:text-sm text-[#5C4F46] font-light leading-relaxed">
                  {TIMELINE_PHASES[activePhaseIndex].desc}
                </p>

                <div className="flex items-center gap-2 text-xs text-[#16A34A] font-medium pt-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{TIMELINE_PHASES[activePhaseIndex].milestone}</span>
                </div>
              </div>

              {/* Right Stats Metrics */}
              <div className="lg:w-4/12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
                {TIMELINE_PHASES[activePhaseIndex].stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EDE4D8] flex items-center justify-between"
                  >
                    <div>
                      <p className="text-[9px] font-bold uppercase font-mono text-[#8C7E74]">
                        {stat.label}
                      </p>
                    </div>
                    <span
                      className="font-serif text-2xl font-bold ml-3"
                      style={{
                        background: 'linear-gradient(135deg, #8B5A2B, #A67C52)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
