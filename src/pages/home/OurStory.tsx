
export default function OurStory() {
  return (
    <section className="py-14 text-brand-dark ">
      <div className="max-w-7xl mx-auto px-6 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Dual Arch Images (Before/After) */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 sm:gap-6 relative">
            {/* Before Arch Image */}
            <div className="relative aspect-3/5 rounded-t-full rounded-b-[40px] sm:rounded-b-[80px] overflow-hidden group/before cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-[#17335A]/5">
              <img 
                src="https://images.unsplash.com/photo-1760488029475-41ff1eaa904b?w=1200" 
                alt="Skin before treatment"
                className="w-full h-full object-cover group-hover/before:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              {/* Blur/Dark overlay */}
              <div className="absolute inset-0 bg-black/10 group-hover/before:bg-black/20 transition-all duration-300 flex items-center justify-center">
             
              </div>
            </div>

            {/* After Arch Image (Slightly Offset) */}
            <div className="relative aspect-3/5 rounded-b-full  sm:rounded-b-full overflow-hidden group/after cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-[#17335A]/5 mt-8 lg:mt-30">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRErTHV6tiCCg8YABzY_KvfSblJMS_1gcUqokyjB8H8rDrhlsm18sNLuM6R&s=10" 
                alt="Skin after treatment"
                className="w-full h-full object-cover group-hover/after:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              {/* Soft overlay */}
              <div className="absolute inset-0 bg-black/5 group-hover/after:bg-black/10 transition-all duration-300 flex items-center justify-center">
                
              </div>
            </div>
          </div>

          {/* Right Column: Copy & Stats */}
          <div className="lg:col-span-6 flex flex-col text-left">
            <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-[#5c7886] uppercase">
              OUR SPECIALITY
            </span>
            
            <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#17335A] mt-3 mb-6 leading-tight">
              Science-Backed Skincare
            </h2>
            
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
              We engineer advanced formulations designed to restore your skin's biological health. Instead of mask-like cosmetic fixes, our focus is on replenishing cellular moisture, strengthening the natural acid mantle, and delivering potent active ingredients.
            </p>

            {/* 4 Feature Badges (Specialities) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              <div className="flex items-start gap-3 group/feat">
                <div className="w-8 h-8 rounded-full bg-brand-light/10 flex items-center justify-center text-[#5c7886] shrink-0 group-hover/feat:bg-[#5c7886] group-hover/feat:text-white transition-all duration-300">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[#17335A]">Clinical Potency</h4>
                  <p className="text-gray-500 text-xs mt-0.5">Optimal active dosages for targeted, visible transformation.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 group/feat">
                <div className="w-8 h-8 rounded-full bg-brand-light/10 flex items-center justify-center text-[#5c7886] shrink-0 group-hover/feat:bg-[#5c7886] group-hover/feat:text-white transition-all duration-300">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[#17335A]">Barrier Protection</h4>
                  <p className="text-gray-500 text-xs mt-0.5">Locks in hydration while reinforcing the protective acid mantle.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 group/feat">
                <div className="w-8 h-8 rounded-full bg-brand-light/10 flex items-center justify-center text-[#5c7886] shrink-0 group-hover/feat:bg-[#5c7886] group-hover/feat:text-white transition-all duration-300">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[#17335A]">Biocompatible Compounds</h4>
                  <p className="text-gray-500 text-xs mt-0.5">Approved formulas designed to prevent inflammation.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 group/feat">
                <div className="w-8 h-8 rounded-full bg-brand-light/10 flex items-center justify-center text-[#5c7886] shrink-0 group-hover/feat:bg-[#5c7886] group-hover/feat:text-white transition-all duration-300">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[#17335A]">100% Clean & Vegan</h4>
                  <p className="text-gray-500 text-xs mt-0.5">Ethically sourced ingredients free of artificial fillers.</p>
                </div>
              </div>
            </div>

            <button className="inline-flex w-fit px-12 py-3.5 rounded-full bg-[#41677a] text-white font-semibold uppercase tracking-wider text-xs hover:bg-[#5f5e5e] transition-all duration-300 shadow-md hover:shadow-lg  cursor-pointer hover:-translate-y-0.5 active:translate-y-0">
              GET STARTED
            </button>


          </div>
        </div>
      </div>
    </section>
  )
}
