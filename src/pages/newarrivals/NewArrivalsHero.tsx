import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import p10 from '../../assets/product/p9.avif';
import p12 from '../../assets/product/p11.avif';
import p11 from '../../assets/product/p6.jpg';

const HERO_PRODUCTS = [
  { img: p10, label: 'Retinol Micro-Capsule', delay: '0s' },
  { img: p11, label: 'Peptide Collagen Fluid', delay: '0.15s' },
  { img: p12, label: 'Vitamin E Recovery', delay: '0.3s' },
];

export default function NewArrivalsHero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative bg-white h-auto overflow-hidden">
      {/* Ambient Background Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-150 h-150 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(196,172,128,0.08) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-40 -left-40 w-125 h-125 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(196,172,128,0.06) 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-75 rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(245,240,230,0.5) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 pt-8 pb-6 lg:pt-20 lg:pb-2">

        {/* Top Row: Breadcrumb + Edition Tag */}
        {/* <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-14">
          <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#B5AFA3]">
            <Link to="/" className="hover:text-[#1A1A1A] transition-colors">Home</Link>
            <span className="text-[#D4CFC5]">—</span>
            <span className="text-[#C4AC80]">New Arrivals</span>
          </nav>

          <div className="flex items-center gap-2.5 px-8 py-2 rounded-full shadow-[#c5b591] shadow-lg border border-[#c5b591]"
            style={{ background: 'linear-gradient(335deg, #FDFCFA 80%, #F8F5EF 100%)' }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C4AC80] opacity-50" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C4AC80]" />
            </span>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8B7D65]">
              Edition 2026 · The New Batch
            </span>
          </div>
        </div> */}

        {/* Main Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-4 ">

          {/* Left: Editorial Copy */}
          <div className="lg:col-span-5 flex flex-col">
            <div
              className="transition-all duration-1000 ease-out"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(30px)'
              }}
            >
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-normal text-[#1A1A1A] leading-[1.1] tracking-[-0.02em]">
                Pioneering
                <br />
                <span className="relative inline-block text-[#184433]">
                  Formulas
                  <svg className="absolute -bottom-1 left-0 w-full" height="8" viewBox="0 0 200 8" preserveAspectRatio="none">
                    <path d="M0 7 Q50 0 100 4 Q150 8 200 1" stroke="#C4AC80" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.9" />
                  </svg>
                </span>
                <br />
                <em className="font-semibold text-[#b48320] not-italic" style={{ fontStyle: 'italic' }}>
                  Freshly Crafted.
                </em>
              </h1>

              <p className="mt-6 text-[15px] text-[#252523] leading-[1.8] max-w-md">
                Discover our newest breakthroughs in high-potency <strong className="font-semibold text-[#184433]">transdermal peptides</strong>, cold-pressed <strong className="font-semibold text-[#9e7427]">phyto-lipids</strong>, and biocompatible <strong className="font-semibold text-[#1A1A1A]">cellular rejuvenation systems</strong>.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 mt-8">
                <Link
                  to="/products"
                  className="group inline-flex items-center gap-3 px-7 py-2.5 bg-[#1A1A1A] hover:bg-[#333] text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-full shadow-[#c5b591] shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <span>Shop New Drops</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-8 py-2 border border-[#8b867b] hover:border-[#1A1A1A] text-[#1A1A1A] text-[11px] font-bold uppercase tracking-widest shadow-[#c5b591] shadow-lg rounded-full transition-all duration-300"
                >
                  Our Science
                </Link>
              </div>
            </div>


          </div>

          {/* Right: Product Showcase with Floating Cards */}
          <div className="lg:col-span-7 relative flex justify-center items-center min-h-105 lg:min-h-130">
            {HERO_PRODUCTS.map((prod, idx) => {
              const offsets = [
                { left: '2%', top: '8%', rotate: '-4deg', zIndex: 1 },
                { left: '28%', top: '-1%', rotate: '1deg', zIndex: 3 },
                { left: '56%', top: '12%', rotate: '5deg', zIndex: 2 },
              ];
              const pos = offsets[idx];

              return (
                <div
                  key={idx}
                  className="absolute w-[42%] sm:w-[38%] lg:w-[36%] transition-all duration-1000 ease-out"
                  style={{
                    left: pos.left,
                    top: pos.top,
                    zIndex: pos.zIndex,
                    transform: loaded
                      ? `rotate(${pos.rotate}) translateY(0)`
                      : `rotate(${pos.rotate}) translateY(60px)`,
                    opacity: loaded ? 1 : 0,
                    transitionDelay: prod.delay,
                    filter: 'drop-shadow(0 8px 30px rgba(196,172,128,0.25))',
                  }}
                >
                  {/* Background glow */}
                  <div className="absolute -inset-4 rounded-2xl blur-2xl opacity-40 pointer-events-none -z-10"
                    style={{ background: 'radial-gradient(circle, rgba(196,172,128,0.5) 0%, rgba(196,172,128,0.55) 90%, transparent 80%)' }} />

                  <div className="rounded-xl border border-[#E8E3D8] overflow-hidden group cursor-pointer relative"
                    style={{ boxShadow: '0 10px 40px -8px rgba(26,26,26,0.12), 0 4px 20px -4px rgba(196,172,128,0.2)' }}>
                    <div className="aspect-3/4 w-full">
                      <img
                        src={prod.img}
                        alt={prod.label}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 px-4 py-3 text-center bg-white">
                      <span className="text-xs font-bold  font-serif uppercase tracking-[0.15em] text-black drop-shadow-sm">{prod.label}</span>
                    </div>
                  </div>
                </div>
              );
            })}


          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent 0%, #E0DAD0 20%, #D4CFC5 50%, #E0DAD0 80%, transparent 100%)' }} />
    </section>
  );
}
