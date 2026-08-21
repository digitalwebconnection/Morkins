import { Link } from 'react-router-dom';

export default function BestSellersHero() {
  return (
    <section className="relative bg-[#F4F3EE] border-b border-brand-dark/10 overflow-hidden py-14 lg:py-20">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#6F8C51]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#A68A56]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Breadcrumb */}
        <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-dark/60 mb-4">
          <Link to="/" className="hover:text-[#6F8C51] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#6F8C51]">Best Sellers</span>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#A68A56]/15 border border-[#A68A56]/30 text-[#A68A56] text-[11px] font-bold tracking-widest uppercase mb-4 animate-fade-in">
          <svg className="w-3.5 h-3.5 text-[#A68A56]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Cult Favorites & Proven Results
        </div>

        {/* Headline */}
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brand-dark font-medium tracking-tight max-w-3xl mx-auto leading-tight">
          Our Most Coveted <span className="italic font-normal text-[#6F8C51]">Best Sellers</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-base sm:text-lg text-brand-dark/70 max-w-2xl mx-auto font-light leading-relaxed">
          Clinically engineered formulations that have transformed over 50,000+ complexions. Discover why these biological-grade botanical remedies never stay in stock for long.
        </p>

        {/* Quick Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-10 pt-8 border-t border-brand-dark/10">
          <div className="flex flex-col items-center">
            <span className="font-serif text-2xl lg:text-3xl font-bold text-brand-dark">50,000+</span>
            <span className="text-xs uppercase tracking-wider text-brand-dark/60 mt-0.5">Bottles Delivered</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-serif text-2xl lg:text-3xl font-bold text-[#6F8C51]">4.9 / 5.0</span>
            <span className="text-xs uppercase tracking-wider text-brand-dark/60 mt-0.5">Verified Reviews</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-serif text-2xl lg:text-3xl font-bold text-[#A68A56]">98%</span>
            <span className="text-xs uppercase tracking-wider text-brand-dark/60 mt-0.5">Repurchase Rate</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-serif text-2xl lg:text-3xl font-bold text-brand-dark">100%</span>
            <span className="text-xs uppercase tracking-wider text-brand-dark/60 mt-0.5">Dermatologist Tested</span>
          </div>
        </div>
      </div>
    </section>
  );
}
