import morkinsEmblem from '../../assets/morkins_leaf_icon.png';

export default function BestSellersHero() {
  return (
    <section className="relative bg-linear-to-b from-[#F4F3EE] via-[#FCFBF8] to-[#FCFBF8] border-b border-[#A68A56]/20 overflow-hidden py-6 sm:py-8 lg:py-12 select-none">
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
          background: linear-gradient(90deg, transparent 0%, rgba(166,138,86,0.3) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: shimmerLine 4s linear infinite;
        }
      `}</style>

      {/* ── Layered Atmospheric Lighting & Glowing Orbs ── */}
      <div className="absolute -top-24 right-1/4 w-96 h-96 bg-[#6F8C51]/15 rounded-full blur-3xl pointer-events-none hero-pulse-glow" />
      <div className="absolute -bottom-20 left-1/4 w-96 h-96 bg-[#A68A56]/15 rounded-full blur-3xl pointer-events-none hero-pulse-glow" style={{ animationDelay: '3.5s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-87.5 bg-linear-to-r from-[#6F8C51]/8 via-[#A68A56]/8 to-[#AFD971]/8 rounded-full blur-[100px] pointer-events-none" />

      {/* ── Background Emblem Watermarks (Transparent Botanical Leaf Icon) ── */}
      {/* 1. Large Centered Watermark behind the content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-30 sm:w-40 lg:w-50 opacity-[0.09] pointer-events-none ">
        <img
          src={morkinsEmblem}
          alt=""
          className="w-full h-auto object-contain select-none"
        />
      </div>


      {/* ── Geometric Diamond & Dot Accent Marks ── */}
      <div className="absolute top-1/3 left-6 sm:left-14 opacity-30 text-[#A68A56] text-xs pointer-events-none hero-float-2">
        ✦
      </div>
      <div className="absolute top-1/4 right-8 sm:right-16 opacity-30 text-[#6F8C51] text-xs pointer-events-none hero-float-1">
        ✦
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

        {/* ── Top Decorative Crown Accent Line ── */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 sm:w-20 bg-linear-to-r from-transparent via-[#A68A56]/40 to-[#6F8C51]/50" />
          <span className="w-1.5 h-1.5 rotate-45 bg-[#A68A56] ring-4 ring-[#A68A56]/15 rounded-[1px]" />
          <div className="h-px w-12 sm:w-20 bg-linear-to-l from-transparent via-[#A68A56]/40 to-[#6F8C51]/50" />
        </div>

        {/* ── Editorial Headline with Pure Text Gradients & Luminous Shadows ── */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl xl:text-[62px] text-brand-dark font-semibold tracking-tight max-w-4xl mx-auto leading-[1.12] mb-4">
          Our Most Coveted{' '}
          <span className=" bg-linear-to-r from-[#547038] via-[#7AA155] to-[#547038] bg-clip-text text-transparent drop-shadow-[0_2px_16px_rgba(111,140,81,0.32)]">
            Best Sellers
          </span>{' '}
          <span className="text-[#A68A56]">&</span> <br />
          <span className=" font-bold bg-linear-to-r from-[#8E713A] via-[#C4A76A] to-[#886B33] bg-clip-text text-transparent drop-shadow-[0_2px_18px_rgba(166,138,86,0.35)] relative inline-block">
            Botanical Masterpieces
            {/* Subtle glow underline effect */}
            <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] hero-shimmer rounded-full" />
          </span>
        </h1>

       

        {/* ── Concise Subtitle with Text Color Highlights & Subtle Glows (No BG Box) ── */}
        <p className="text-xs sm:text-sm lg:text-base text-black max-w-5xl mx-auto leading-relaxed font-light">
          Clinically engineered with{' '}
          <span className="text-[#4E6B34] font-semibold underline decoration-[#6F8C51]/40 underline-offset-4 drop-shadow-[0_1px_8px_rgba(111,140,81,0.25)]">
            cold-pressed bioactive enzymes
          </span>
          . Discover why these cult-favorite formulations have transformed over{' '}
          <strong className="font-bold text-[#8C6D34] drop-shadow-[0_1px_8px_rgba(166,138,86,0.28)]">
            50,000+ complexions worldwide
          </strong>
          .
        </p>

      </div>
    </section>
  );
}
