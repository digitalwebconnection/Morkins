

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden min-h-[60vh] flex items-center justify-center bg-brand-cream">
      {/* Background Image & Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/center_offer_banner.png')" }}
      >
        {/* Soft radial overlay to ensure text readability in the center while keeping sides clear */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/70 via-white/40 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-3 md:py-6 w-full">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block py-1.5 px-4 rounded-full bg-brand-dark text-brand-cream font-bold text-xs md:text-sm mb-6 tracking-widest uppercase shadow-md animate-fade-in-up">
            Special Offer
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-brand-dark mb-2 tracking-tight drop-shadow-md">
            Summer Glow
          </h1>

          <p className="text-lg md:text-xl text-brand-dark/90 mb-5 max-w-2xl mx-auto font-medium drop-shadow-sm leading-relaxed">
            Discover our carefully curated selection of premium skincare products. Get up to <span className="font-bold">30% off</span> on our summer collection!
          </p>

          <button className="px-10 py-2 bg-brand-dark text-brand-cream rounded-full font-bold tracking-wide hover:bg-brand-dark/90 hover:scale-105 transition-all shadow-xl text-lg">
            Shop the Sale
          </button>
        </div>
      </div>
    </div>
  );
}

