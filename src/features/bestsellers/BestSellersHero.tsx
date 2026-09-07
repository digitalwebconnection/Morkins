import morkinsEmblem from '../../assets/images/logo/morkins_leaf_icon.png';

export default function BestSellersHero() {
  return (
    <section className="relative bg-[#FCFBF8] border-b border-[#D8CCB5]/40 overflow-hidden py-8 sm:py-10 lg:py-14 select-none">
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

      {/* ── Layered Multi-Color Atmospheric Lighting & Glowing Orbs ── */}
      {/* <div className="absolute -top-24 right-1/4 w-96 h-96 bg-[#4E7A52]/16 rounded-full blur-3xl pointer-events-none hero-pulse-glow" />
      <div className="absolute -bottom-20 left-1/4 w-96 h-96 bg-[#C49746]/16 rounded-full blur-3xl pointer-events-none hero-pulse-glow" style={{ animationDelay: '3.5s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-180 h-90 bg-[#4E7A52]/8 rounded-full blur-[110px] pointer-events-none" /> */}

      {/* ── Background Emblem Watermarks (Transparent Botanical Leaf Icon) ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 sm:w-44 lg:w-56 opacity-[0.05] pointer-events-none">
        <img
          src={morkinsEmblem}
          alt=""
          className="w-full h-auto object-contain select-none"
        />
      </div>

      {/* ── Geometric Diamond & Dot Accent Marks in Multi-Tones ── */}
      <div className="absolute top-1/3 left-6 sm:left-14 opacity-40 text-[#C49746] text-xs pointer-events-none hero-float-2">
        ✦
      </div>
      <div className="absolute top-1/4 right-8 sm:right-16 opacity-40 text-[#4E7A52] text-xs pointer-events-none hero-float-1">
        ✦
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

        {/* ── Top Decorative Crown Accent Line ── */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 sm:w-24 bg-[#C49746]/40" />
          <span className="w-1.5 h-1.5 rotate-45 bg-[#C49746] ring-4 ring-[#C49746]/20 rounded-[1px]" />
          <div className="h-px w-12 sm:w-24 bg-[#C49746]/40" />
        </div>

        {/* ── Editorial Headline with Solid Luxury Colors ── */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl xl:text-[62px] text-[#1B2B19] font-semibold tracking-tight max-w-4xl mx-auto leading-[1.14] mb-4">
          Our Most Coveted{' '}
          <span className="text-[#2D5A32]">
            Best Sellers
          </span>{' '}
          <span className="text-[#C49746] font-light">&</span> <br />
          <span className="font-bold text-[#8C6221] relative inline-block">
            Botanical Masterpieces
            {/* Subtle solid underline accent */}
            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#C49746]/40 rounded-full" />
          </span>
        </h1>

        {/* ── Concise Subtitle with Rich Color Highlights ── */}
        <p className="text-xs sm:text-sm lg:text-base text-[#3E463A] max-w-5xl mx-auto leading-relaxed font-normal">
          Clinically engineered with{' '}
          <span className="text-[#2D5A32] font-semibold underline decoration-[#4E7A52]/40 underline-offset-4 drop-shadow-[0_1px_8px_rgba(78,122,82,0.22)]">
            cold-pressed bioactive enzymes
          </span>
          . Discover why these cult-favorite formulations have transformed over{' '}
          <strong className="font-bold text-[#8C6221] drop-shadow-[0_1px_8px_rgba(196,151,70,0.25)]">
            50,000+ complexions worldwide
          </strong>
          .
        </p>

      </div>
    </section>
  );
}
