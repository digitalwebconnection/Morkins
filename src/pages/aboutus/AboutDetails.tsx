export default function AboutDetails() {
  return (
    <section className="py-14  `">
      <div className="max-w-7xl mx-auto px-6 sm:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Description Content */}
          <div className="lg:col-span-6 text-left space-y-6 animate-fade-in">
            <span className="text-xs font-bold tracking-widest text-[#5c7886] uppercase">OUR PHILOSOPHY</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#17335A] leading-tight">
              Honoring Your Skin’s <br />
              <span className="italic font-light text-[#303030]">Natural Intelligence</span>
            </h2>
            <p className="text-neutral-900 text-base leading-relaxed font-light">
              Your skin is a living, breathing ecosystem. Rather than stripping it with aggressive chemicals, Morkins supports its innate biological functions. We believe true radiance comes from a fully restored lipid barrier, protected by biocompatible nourishment.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4">
                <span className="shrink-0 w-6 h-6 rounded-full bg-[#17335A]/5 flex items-center justify-center text-[#17335A] font-bold text-xs mt-1">✓</span>
                <div>
                  <h4 className="font-sans text-base font-semibold text-[#17335A]">Cold-Pressed Botanical Lipids</h4>
                  <p className="text-neutral-800 text-sm font-light mt-0.5">Sourced under strict organic protocols to retain complete enzyme activity.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="shrink-0 w-6 h-6 rounded-full bg-[#17335A]/5 flex items-center justify-center text-[#17335A] font-bold text-xs mt-1">✓</span>
                <div>
                  <h4 className="font-sans text-base font-semibold text-[#17335A]">Dermatologist Verified</h4>
                  <p className="text-neutral-800 text-sm font-light mt-0.5">Every formula passes multi-level clinical safety testing for reactive skin.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="shrink-0 w-6 h-6 rounded-full bg-[#17335A]/5 flex items-center justify-center text-[#17335A] font-bold text-xs mt-1">✓</span>
                <div>
                  <h4 className="font-sans text-base font-semibold text-[#17335A]">Sustainable Extraction</h4>
                  <p className="text-neutral-800 text-sm font-light mt-0.5">Zero-waste mechanical processing prioritizing the earth as much as your skin.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-End Overlapping Collage */}
          <div className="lg:col-span-6 relative w-full h-[540px] md:h-[600px] lg:h-[560px] mt-12 lg:mt-0 flex items-center justify-center">
            
            {/* Background glowing aura */}
            <div className="absolute top-12 left-12 w-64 h-64 bg-[#5c7886]/5 blur-3xl pointer-events-none rounded-full" />
            
            {/* Thin Decorative Offset Brass/Gold Frame behind the Arch Image */}
            <div className="absolute left-[8%] bottom-4 w-[58%] h-[92%] rounded-t-full rounded-b-2xl border border-[#5c7886]/20 -translate-x-4 translate-y-4 pointer-events-none z-0" />
            
            {/* Image 1: Main Arch Image (Left Align) */}
            <div className="absolute left-[8%] bottom-4 w-[58%] h-[92%] rounded-t-full rounded-b-2xl overflow-hidden shadow-2xl shadow-black border border-brand-dark/5 z-10 group">
              <img
                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80"
                alt="Clean botanical skincare texture"
                className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
              />
            </div>

            {/* Image 2: Circle Image (Top Right Align) */}
            <div className="absolute right-[6%] top-0 w-[42%] aspect-square rounded-full overflow-hidden shadow-2xl border-4 border-brand-cream z-20 group">
              <img
                src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=450&q=80"
                alt="Active clinical extract dropping"
                className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
              />
            </div>

            {/* Image 3: Small Rectangle Image (Bottom Right Align) */}
            <div className="absolute right-[64%] -bottom-12 w-[38%] h-[36%] rounded-2xl overflow-hidden shadow-2xl border-4 border-brand-cream z-20 group">
              <img
                src="https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=450&q=80"
                alt="Sourced organic green botany setting"
                className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
              />
            </div>

            {/* Floating Golden Seal Badge */}
            <div className="absolute top-[32%] right-[32%] w-20 h-20 rounded-full bg-[#17335A] text-white border-2 border-brand-cream flex items-center justify-center shadow-2xl z-30 transition-transform duration-500 hover:rotate-12 hover:scale-110 select-none">
              <div className="text-center">
                <span className="block font-serif text-[10px] uppercase tracking-widest text-[#a8d5c0]">EST.</span>
                <span className="block font-serif text-base font-semibold leading-none">2021</span>
                <span className="block text-[8px] uppercase tracking-wider mt-1 opacity-85">Lab Pure</span>
              </div>
            </div>
            
          </div>

        </div>
      </div>
    </section>
  )
}
