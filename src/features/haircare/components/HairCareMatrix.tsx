import { ShieldCheck, Zap, Activity, Sparkles, ArrowRight } from 'lucide-react';

const MECHANISMS = [
  {
    id: 'dht',
    icon: ShieldCheck,
    tag: 'Phase 01 • Blockade',
    title: '5α-Reductase DHT Inhibition',
    desc: 'Targeted botanical sterols (Saw Palmetto & Pumpkin Seed) neutralize DHT binding at follicular androgen receptors, preventing root miniaturization and protecting hair papillae.',
    metric: '88%',
    metricLabel: 'Local DHT Binding Blocked',
    accent: '#8B5A2B',
  },
  {
    id: 'circulation',
    icon: Zap,
    tag: 'Phase 02 • Perfusion',
    title: 'Liposomal Micro-Circulation',
    desc: 'Pure nano-encapsulated caffeine penetrates 2mm deep into dermal capillaries within 120 seconds, delivering oxygen, biotin, and peptide nutrients directly to dormant bulbs.',
    metric: '120s',
    metricLabel: 'Trans-Follicular Delivery',
    accent: '#A67C52',
  },
  {
    id: 'activation',
    icon: Activity,
    tag: 'Phase 03 • Regeneration',
    title: 'Stem Cell Follicle Awakening',
    desc: 'Redensyl and Procapil dual-action peptide complex reactivates telogen stem cells in the hair matrix, switching them into rapid anagen growth and multiplying shaft diameter.',
    metric: '+214%',
    metricLabel: 'Fibroblast Division Rate',
    accent: '#C49A6C',
  },
];

export default function HairCareMatrix() {
  return (
    <section
      id="haircare-matrix"
      className="py-20 sm:py-28 select-none relative overflow-hidden bg-[#FDFCFA] border-y border-[#EDE4D8]/60"
    >
      {/* Subtle warm ambient glow in background */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-87.5 pointer-events-none opacity-40 blur-3xl"
        style={{
          background: 'radial-gradient(ellipse, rgba(196,154,108,0.15) 0%, rgba(245,238,230,0.05) 50%, transparent 80%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EF] border border-[#EDE4D8] mb-1 shadow-2xs">
            <Sparkles className="w-3 h-3 text-[#A67C52] animate-pulse" />
            <span className="text-[9px] font-bold text-[#A67C52] uppercase tracking-[0.25em] font-mono">
              The Men’s Trichology Benchmark
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1210] font-normal leading-tight">
            Hair Thinning & Density Loss{' '}
            <span
              className="italic"
              style={{
                background: 'linear-gradient(135deg, #8B5A2B 0%, #C49A6C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Can Be Reversed
            </span>
          </h2>

          <p className="text-[#7A6E64] text-sm font-light leading-relaxed max-w-2xl mx-auto">
            Doctor-formulated bio-active compounds designed to inhibit local 5α-reductase, stimulate micro-circulation, and awaken dormant follicles without chemical shedding or side effects.
          </p>
        </div>

        {/* 3-Phase Bio-Mechanics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {MECHANISMS.map((m, _idx) => {
            const Icon = m.icon;
            return (
              <div
                key={m.id}
                className="group relative rounded-2xl border border-[#EDE4D8] p-7 sm:p-8 bg-white/95 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#C49A6C]/70 hover:shadow-[0_20px_45px_rgba(44,24,16,0.08)] flex flex-col justify-between overflow-hidden"
                style={{ boxShadow: '0 8px 30px rgba(44,24,16,0.04)' }}
              >
                {/* Top Subtle Hover Gradient Shine */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at top right, rgba(196,154,108,0.08) 0%, transparent 70%)',
                  }}
                />

                <div className="space-y-4 relative z-10">
                  {/* Top Row: Icon & Tag */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#FAF5EF] border border-[#EDE4D8] flex items-center justify-center text-[#8B5A2B] group-hover:scale-110 group-hover:bg-[#2C1810] group-hover:text-white transition-all duration-300 shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-bold uppercase font-mono tracking-widest text-[#A67C52] bg-[#FAF5EF] group-hover:bg-[#FAF0E4] px-3 py-1 rounded-full border border-[#EDE4D8] transition-colors">
                      {m.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1210] group-hover:text-[#7A4E2D] transition-colors">
                    {m.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#6B5E55] font-light leading-relaxed">
                    {m.desc}
                  </p>
                </div>

                {/* Bottom Metric */}
                <div className="mt-8 pt-5 border-t border-[#F0E8DF] flex items-baseline justify-between relative z-10">
                  <div>
                    <span className="text-[9px] font-bold uppercase font-mono text-[#9B8F84] block">
                      {m.metricLabel}
                    </span>
                    <span className="text-[10px] text-[#A67C52] font-mono flex items-center gap-1 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>Clinical Study Verified</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </div>

                  <span
                    className="font-serif text-2xl sm:text-3xl font-bold transition-transform duration-300 group-hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #8B5A2B, #A67C52)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {m.metric}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
