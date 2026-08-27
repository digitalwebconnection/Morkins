export default function FeaturedProductSection() {
  return (
    <section 
      className="relative h-70 w-full overflow-hidden flex items-center bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: "url('https://kbeautyworld.com/cdn/shop/files/Korean_skin_care_new_K_Beauty_World.png?v=1741878413&width=3200')"
      }}
    >
      {/* Dark Forest Green Overlay */}
      <div className="absolute inset-0 bg-[#0D3322]/45 z-0 backdrop-blur-[1px]" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-4 w-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          
          {/* Left Column: Featured Copy */}
          <div className="lg:col-span-6 flex flex-col text-left justify-center">
            <span className="text-[12px] font-bold text-[#D8EFE3] uppercase tracking-[0.2em] mb-2 drop-shadow-sm">
              HERO FORMULATION
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-medium text-white mb-4 leading-tight drop-shadow-md">
              Signature Glow Serum
            </h2>
            <p className="text-[#FAFBF9]/90 text-sm sm:text-base leading-relaxed mb-6 max-w-lg drop-shadow-sm">
              Drench your skin in absolute brilliance. Our bio-active Vitamin C and Hyaluronic Acid complex works at a cellular level to target dark spots and smooth fine lines.
            </p>
            <button className="inline-flex items-center gap-2 w-fit px-8 py-3.5 rounded-full bg-white text-[#13442C] hover:bg-[#13442C] hover:text-[#D8EFE3] font-bold uppercase tracking-widest text-xs transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer hover:-translate-y-0.5 active:translate-y-0 border border-white/60">
              <span>SHOP NOW</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}
