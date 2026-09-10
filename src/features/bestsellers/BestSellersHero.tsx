import morkinsEmblem from '../../assets/images/logo/morkins_leaf_icon.png';

export default function BestSellersHero() {
  return (
    <section className="relative bg-white border-b border-[#0B1A28]/10 overflow-hidden py-8 sm:py-10 lg:py-14 select-none">
      {/* ── Keyframe Animations for Pure Visual Effects ── */}
      <style>{`
        @keyframes floatSlow1 {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          50% { transform: translate(-10px, -14px) rotate(6deg); }
        }
        @keyframes floatSlow2 {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          50% { transform: translate(12px, -16px) rotate(-8deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.75; transform: scale(1.12); }
        }
        .hero-float-1 { animation: floatSlow1 9s ease-in-out infinite; }
        .hero-float-2 { animation: floatSlow2 11s ease-in-out infinite; }
        .hero-pulse-glow { animation: pulseGlow 7s ease-in-out infinite; }
      `}</style>

      {/* ── Background Emblem Watermarks (Transparent Botanical Leaf Icon) ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 sm:w-44 lg:w-56 opacity-[0.04] pointer-events-none">
        <img
          src={morkinsEmblem}
          alt=""
          className="w-full h-auto object-contain select-none"
        />
      </div>

      {/* ── Geometric Diamond & Dot Accent Marks in Multi-Tones ── */}
      <div className="absolute top-1/3 left-6 sm:left-14 opacity-40 text-[#A68A56] text-xs pointer-events-none hero-float-2">
        ✦
      </div>
      <div className="absolute top-1/4 right-8 sm:right-16 opacity-40 text-[#12602F] text-xs pointer-events-none hero-float-1">
        ✦
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

        {/* ── Top Category Eyebrow Tag ── */}
        <p className="text-[16px] text-[#01442e] uppercase tracking-[0.2em] mb-3">
          AWARD-WINNING FORMULATIONS
        </p>

        {/* ── Editorial Headline ── */}
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-[#0C1B33] tracking-tight mt-2.5 max-w-4xl mx-auto mb-4">
          Our Most Coveted Best Sellers & Botanical Masterpieces
        </h1>

        {/* ── Concise Subtitle ── */}
        <p className="text-xs sm:text-sm lg:text-base text-gray-800 max-w-5xl mx-auto leading-relaxed font-normal">
          Clinically engineered with cold-pressed bioactive enzymes. Discover why these cult-favorite formulations have transformed over 50,000+ complexions worldwide.
        </p>

      </div>
    </section>
  );
}
