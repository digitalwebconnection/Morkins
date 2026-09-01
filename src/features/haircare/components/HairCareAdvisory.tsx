export default function HairCareAdvisory() {
  return (
    <section className="py-16 sm:py-24 bg-[#0E0E11] border-b border-zinc-800/80 text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Metric Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center pb-14 border-b border-zinc-800">
          <div>
            <span className="font-serif text-4xl sm:text-5xl font-bold text-[#E5B869]">1.8M+</span>
            <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider mt-1">Scalps Revitalized</p>
          </div>
          <div>
            <span className="font-serif text-4xl sm:text-5xl font-bold text-[#E5B869]">9.5K+</span>
            <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider mt-1">Trichology Trials</p>
          </div>
          <div>
            <span className="font-serif text-4xl sm:text-5xl font-bold text-[#E5B869]">14</span>
            <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider mt-1">Follicle Patents</p>
          </div>
          <div>
            <span className="font-serif text-4xl sm:text-5xl font-bold text-[#E5B869]">96.8%</span>
            <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider mt-1">Density Verified</p>
          </div>
        </div>

        {/* Surgeon Spotlight */}
        <div className="mt-14 max-w-4xl mx-auto bg-zinc-950 p-8 sm:p-10 rounded-3xl border border-zinc-800 flex flex-col sm:flex-row items-center gap-8 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&h=300&q=80"
            alt="Dr. Marcus Sterling"
            className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-zinc-800 shadow-xl shrink-0"
          />
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#E5B869] bg-zinc-900 px-2.5 py-1 rounded-md border border-[#E5B869]/30">
              Chief Trichology Advisor
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Dr. Marcus Sterling, MD, FISHRS
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
              "In my 20+ years specializing in follicle restoration and hair loss pathology, Morkins represents the gold standard in non-invasive density recovery: blocking DHT at the follicular level while awakening dormant roots with encapsulated caffeine."
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
