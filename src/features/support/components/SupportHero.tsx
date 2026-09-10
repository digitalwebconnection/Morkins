import morkinsEmblem from '../../../assets/images/logo/morkins_leaf_icon.png';

interface SupportHeroProps {
  badge: string;
  title: string;
  subtitle: string;
  breadcrumbCurrent?: string;
}

export default function SupportHero({
  badge,
  title,
  subtitle,
  breadcrumbCurrent: _breadcrumbCurrent,
}: SupportHeroProps) {
  return (
    <section className="relative bg-linear-to-b from-[#FAF8F3] via-[#FCFBF8] to-[#FAF8F2] border-b border-[#D8CCB5]/40 overflow-hidden py-10 sm:py-14 select-none">
      {/* ── Keyframe Animations ── */}
      <style>{`
        @keyframes floatSlow1 {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          50% { transform: translate(-8px, -12px) rotate(5deg); }
        }
        @keyframes floatSlow2 {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          50% { transform: translate(10px, -14px) rotate(-6deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.65; transform: scale(1.1); }
        }
        @keyframes shimmerLine {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .hero-float-1 { animation: floatSlow1 9s ease-in-out infinite; }
        .hero-float-2 { animation: floatSlow2 11s ease-in-out infinite; }
        .hero-pulse-glow { animation: pulseGlow 7s ease-in-out infinite; }
        .hero-shimmer {
          background: linear-gradient(90deg, transparent 0%, rgba(196,151,70,0.4) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: shimmerLine 4s linear infinite;
        }
      `}</style>

      {/* ── Multi-Tone Atmospheric Lighting & Glowing Orbs ── */}
      <div className="absolute -top-24 right-1/4 w-80 h-80 bg-[#4E7A52]/12 rounded-full blur-3xl pointer-events-none hero-pulse-glow" />
      <div className="absolute -bottom-20 left-1/4 w-80 h-80 bg-[#C49746]/12 rounded-full blur-3xl pointer-events-none hero-pulse-glow" style={{ animationDelay: '3.5s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-140 h-72 bg-linear-to-r from-[#4E7A52]/8 via-[#C49746]/8 to-[#184433]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* ── Background Botanical Watermark ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 sm:w-40 opacity-[0.04] pointer-events-none">
        <img
          src={morkinsEmblem}
          alt=""
          className="w-full h-auto object-contain select-none"
        />
      </div>

      {/* ── Floating Diamond Accents ── */}
      <div className="absolute top-1/3 left-6 sm:left-14 opacity-40 text-[#C49746] text-xs pointer-events-none hero-float-2">
        ✦
      </div>
      <div className="absolute top-1/4 right-8 sm:right-16 opacity-40 text-[#4E7A52] text-xs pointer-events-none hero-float-1">
        ✦
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* ── Top Decorative Crown Line ── */}
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px w-10 sm:w-20 bg-linear-to-r from-transparent via-[#C49746]/50 to-[#4E7A52]/60" />
          <span className="w-1.5 h-1.5 rotate-45 bg-[#C49746] ring-4 ring-[#C49746]/20 rounded-[1px]" />
          <div className="h-px w-10 sm:w-20 bg-linear-to-l from-transparent via-[#C49746]/50 to-[#4E7A52]/60" />
        </div>

        {/* ── Floating Pill Badge ── */}
        <div className="flex justify-center mb-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-[#D8CCB5]/70 shadow-2xs text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#184433] backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C49746] animate-pulse" />
            <span>{badge}</span>
          </div>
        </div>

        {/* ── Editorial Headline with Cormorant Serif ── */}
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-[#0C1B33] tracking-tight mt-2.5 max-w-4xl mx-auto leading-tight mb-3">
          {title}
        </h1>

        {/* ── Subtitle ── */}
        <p className="text-xs sm:text-sm md:text-base text-[#3E463A] max-w-2xl mx-auto leading-relaxed font-light">
          {subtitle}
        </p>

        {/* ── Subtle Shimmer Accent Line ── */}
        <div className="w-24 h-0.5 hero-shimmer rounded-full mx-auto mt-5" />
      </div>
    </section>
  );
}

export { SupportHero };
