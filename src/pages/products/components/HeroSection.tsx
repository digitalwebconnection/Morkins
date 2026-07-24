

export default function HeroSection() {
  return (
    <div className="relative bg-brand-cream overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-light/10 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute top-1/2 -left-24 w-72 h-72 bg-brand-dark/5 rounded-full blur-2xl opacity-50"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
         
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-brand-dark mb-6 tracking-tight">
            Our Collection
          </h1>
          
          <p className="text-lg md:text-xl text-brand-dark/80 mb-8 max-w-2xl mx-auto">
            Discover our carefully curated selection of premium skincare products designed to nourish, protect, and rejuvenate your skin naturally.
          </p>
        </div>
      </div>
    </div>
  );
}
