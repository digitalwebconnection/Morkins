import { Sparkles, ArrowRight } from 'lucide-react';
import heroProductImg from '../../../assets/images/product/p11-removebg-preview.png';

interface SkinCareHeroProps {
  onExploreClick?: () => void;
  onKitsClick?: () => void;
}

export default function SkinCareHero({ onExploreClick, onKitsClick }: SkinCareHeroProps) {
  return (
    <section className="relative py-5 sm:py-10 bg-[#FAFAFA] border-b border-zinc-200/80 overflow-hidden select-none">

      {/* ── Keyframe Animations for Typography & Visual Stage ── */}
      <style>{`
        @keyframes floatBottle3D {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(-14px) rotate(-1deg) scale(1.02); }
        }
        @keyframes rippleRing {
          0%, 100% { transform: scale(0.9); opacity: 0.35; }
          50% { transform: scale(1.1); opacity: 0.75; }
        }
        @keyframes auraBreath {
          0%, 100% { transform: scale(0.94); opacity: 0.6; }
          50% { transform: scale(1.08); opacity: 0.95; }
        }
        @keyframes sparkleTwinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.7); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes shimmerText {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        @keyframes spinSparkle {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(18deg) scale(1.2); }
        }
      `}</style>

      {/* ── Soft Ambient Background Glow (Rose Blush & Ruby Dew) ── */}
      <div className="absolute -top-28 left-10 w-130 h-130 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-140 h-140 bg-rose-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-1/3 w-100 h-100 bg-rose-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* ── Left Column: Animated Title, Color Palette & CTAs ── */}
          <div className="lg:col-span-6 space-y-6 text-left">

            {/* Animated Floating Pill Badge */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/90 text-green-950 text-xs font-bold uppercase tracking-widest shadow-2xs backdrop-blur-xs"
              style={{ animation: 'floatBadge 4s ease-in-out infinite' }}
            >
              <Sparkles
                className="w-3.5 h-3.5 text-green-600"
                style={{ animation: 'spinSparkle 3s ease-in-out infinite' }}
              />
              <span>Clinical Apothecary • Cold Bio-Extraction</span>
            </div>

            {/* Grand Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#2C1810] leading-[1.08] tracking-tight font-normal">
              Awaken Your Skin’s{' '}
              <span className="font-bold text-green-800 block mt-1">
                Living Glass Skin{' '}
                <span className="italic font-bold text-yellow-600 inline-block">
                  Radiance.
                </span>
              </span>
            </h1>

            {/* Refined Subline */}
            <p className="text-[#5C4F46] text-base sm:text-md font-light leading-relaxed max-w-xl">
              Cold-pressed bioactive plant ceramides, unheated botanical enzymes, and 5D multi-molecular hyaluronic acid formulated to eliminate barrier redness, reverse oxidative dullness, and awaken all-day translucent luminosity.
            </p>

            {/* Dynamic CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <a
                href="#skincare-catalog"
                onClick={onExploreClick}
                className="px-8 py-3 rounded-full bg-slate-950 hover:bg-slate-900 text-white text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-rose-950/20 hover:-translate-y-0.5 cursor-pointer flex items-center gap-2 group"
              >
                <span>Explore Formulations</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-14.5" />
              </a>

              <a
                href="#skincare-concierge"
                onClick={onKitsClick}
                className="px-7 py-3 rounded-full bg-white hover:bg-rose-50/50 text-[#2C1810] hover:text-[#1E1B18] border border-slate-300/80 hover:border-rose-300 text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 shadow-xs hover:shadow-sm hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Custom Skin Routine</span>
              </a>
            </div>

          </div>

          {/* ── Right Column: Dynamic Splash Product Stage ── */}
          <div className="lg:col-span-6 relative flex items-center justify-center py-4">
            <div className="relative w-full max-w-lg mx-auto flex items-center justify-center min-h-110 sm:min-h-125">

              {/* 1. Ambient Ruby/Rose Glowing Halo */}
              <div className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-rose-200/30 blur-3xl pointer-events-none" />

              {/* 2. Concentric Water Ripple Rings */}
              <div
                className="absolute w-72 h-72 sm:w-88 sm:h-88 rounded-full border border-rose-200/60 pointer-events-none"
                style={{ animation: 'rippleRing 5.5s ease-in-out infinite' }}
              />
              <div
                className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full border border-white/80 pointer-events-none"
                style={{ animation: 'rippleRing 5.5s ease-in-out infinite 1.8s' }}
              />

              {/* 3. Soft Glowing Circular Pedestal Stage */}
              <div
                className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-rose-50/80 border border-white shadow-[0_20px_50px_-10px_rgba(225,29,72,0.18)] backdrop-blur-xs pointer-events-none"
                style={{ animation: 'auraBreath 6s ease-in-out infinite' }}
              />

              {/* 4. Twinkling Crystal Light Sparkles around the splash perimeter */}
              <div
                className="absolute top-8 right-12 w-2.5 h-2.5 rounded-full bg-rose-200 shadow-[0_0_12px_#F43F5E] pointer-events-none"
                style={{ animation: 'sparkleTwinkle 3s ease-in-out infinite' }}
              />
              <div
                className="absolute top-24 left-10 w-2 h-2 rounded-full bg-rose-200 shadow-[0_0_10px_#FDA4AF] pointer-events-none"
                style={{ animation: 'sparkleTwinkle 3.5s ease-in-out infinite 1s' }}
              />
              <div
                className="absolute bottom-16 right-8 w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_10px_#FCD34D] pointer-events-none"
                style={{ animation: 'sparkleTwinkle 4s ease-in-out infinite 0.5s' }}
              />
              <div
                className="absolute bottom-12 left-14 w-2 h-2 rounded-full bg-rose-200 shadow-[0_0_10px_#FDA4AF] pointer-events-none"
                style={{ animation: 'sparkleTwinkle 3.2s ease-in-out infinite 1.8s' }}
              />

              {/* 5. 3D Floating Splash Serum Bottle (Zero clipping) */}
              <div
                className="relative z-10 w-full flex items-center justify-center"
                style={{ animation: 'floatBottle3D 6s ease-in-out infinite' }}
              >
                <img
                  src={heroProductImg}
                  alt="Morkins Botanical Radiance Serum with Botanical Splash"
                  className="w-full max-w-105 sm:max-w-140 h-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.15)] transition-transform duration-700 hover:scale-105 cursor-pointer"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
