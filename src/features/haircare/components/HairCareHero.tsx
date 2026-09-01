import { Zap, ArrowRight, Check } from 'lucide-react';

interface HairCareHeroProps {
  onExploreClick?: () => void;
  onKitsClick?: () => void;
}

export default function HairCareHero({ onExploreClick, onKitsClick }: HairCareHeroProps) {
  return (
    <section className="relative pt-12 pb-20 sm:pt-16 sm:pb-28 bg-[#09090B] border-b border-zinc-800/80 overflow-hidden text-zinc-100">
      {/* Radiant Glowing Ambient Light Cones (Gold & Amber on Deep Black) */}
      <div className="absolute -top-28 right-1/4 w-130 h-130 bg-[#E5B869]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-110 h-110 bg-[#D97706]/12 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-96 h-96 bg-zinc-700/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-[#E5B869]/40 text-[#E5B869] text-xs font-bold uppercase tracking-widest shadow-lg">
              <Zap className="w-3.5 h-3.5 text-[#E5B869]" />
              <span>Men’s Clinical Trichology & Scalp Labs</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.08] tracking-tight">
              Your Hair. Your Density.{' '}
              <span className="italic text-[#E5B869] font-normal block mt-1">
                Let’s Get You There.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-400 font-light leading-relaxed max-w-2xl">
              Advanced follicle-energizing biotechnology, encapsulated caffeine micro-sprays, natural botanical DHT blockers, and clinical peptide serums engineered for maximum root thickness, density, and zero prescription side effects.
            </p>

            {/* Metrics Chips Bar (Pure Dark Obsidian) */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg">
              <div className="bg-zinc-900/90 p-3.5 rounded-2xl border border-zinc-800 shadow-lg text-center hover:border-[#E5B869]/40 transition-colors">
                <span className="block text-xl font-bold font-mono text-[#E5B869]">0%</span>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Side Effects</span>
              </div>
              <div className="bg-zinc-900/90 p-3.5 rounded-2xl border border-zinc-800 shadow-lg text-center hover:border-zinc-600 transition-colors">
                <span className="block text-xl font-bold font-mono text-white">88%</span>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">DHT Blocked</span>
              </div>
              <div className="bg-zinc-900/90 p-3.5 rounded-2xl border border-zinc-800 shadow-lg text-center hover:border-[#E5B869]/40 transition-colors">
                <span className="block text-xl font-bold font-mono text-[#E5B869]">+214%</span>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Stem Cell Division</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#haircare-catalog"
                onClick={onExploreClick}
                className="px-8 py-4 rounded-full bg-linear-to-r from-[#E5B869] via-[#D97706] to-[#B45309] hover:from-[#FCD34D] hover:to-[#D97706] text-black text-xs font-bold uppercase tracking-[0.18em] transition-all shadow-xl hover:shadow-[#E5B869]/25 hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
              >
                <span>Explore Hair Formulations</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#haircare-kits"
                onClick={onKitsClick}
                className="px-7 py-4 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 text-xs font-bold uppercase tracking-[0.18em] transition-all shadow-md cursor-pointer"
              >
                View Growth Systems
              </a>
            </div>
          </div>

          {/* Right Hero Visual Stage */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] border border-zinc-800 aspect-4/5 group">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1000&q=85"
                alt="Morkins Men Hair Care"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />

              {/* Floating Verified Clinical Card (Obsidian Glass) */}
              <div className="absolute bottom-6 left-6 right-6 bg-zinc-950/90 backdrop-blur-md p-4 rounded-2xl border border-zinc-800 shadow-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#E5B869] block">
                    Trichology Trial #MK-HAIR-2026
                  </span>
                  <h4 className="font-serif text-sm font-bold text-white">
                    -64% Daily Shedding in 30 Days
                  </h4>
                  <p className="text-[10px] text-zinc-400 font-mono mt-0.5">Dermal Papillae Microscope Verified</p>
                </div>
                <span className="w-10 h-10 rounded-full bg-[#E5B869] text-black flex items-center justify-center font-bold text-sm shadow-md shrink-0">
                  <Check className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
