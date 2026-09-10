import morkinsEmblem from '../../assets/images/logo/morkins_leaf_icon.png';

export default function BestSellersHighlights() {
  const pillars = [
    {
      num: '01',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      badge: 'Purity 99.9%',
      title: 'Pharmaceutical Purity',
      description: 'Tested in ISO-certified laboratories under clinical dermatology protocols to ensure zero micro-contaminants, heavy metals, or irritants.',
      metric: '0.00% Irritation Rate',
    },
    {
      num: '02',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      badge: 'Optimal Dosage',
      title: 'Clinical Peptide Concentration',
      description: 'Engineered at exact physiological concentrations proven in peer-reviewed dermatology literature to activate cellular collagen synthesis.',
      metric: '4x Bioavailability',
    },
    {
      num: '03',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      badge: 'Enzyme-Active',
      title: 'Cold-Enzyme Extraction',
      description: 'Zero-thermal extraction technology preserves 99.4% of live raw botanical enzymes, flavonoids, and active polyphenol potency.',
      metric: '99.4% Bio-Active Enzymes',
    },
    {
      num: '04',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      badge: 'UV-Defended',
      title: 'Apothecary Shielded Glass',
      description: 'Heavyweight amber UV-filtering Italian apothecary glass shields delicate bio-compounds against light-induced oxidation.',
      metric: '36-Month Potency Guard',
    }
  ];

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-white border-b border-gray-200 overflow-hidden select-none">

      {/* ── Keyframe Animations for Highlights Section ── */}
      <style>{`
        @keyframes floatHighlight1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(4deg); }
        }
        @keyframes floatHighlight2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(12px) rotate(-4deg); }
        }
        @keyframes pulseOrb {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.65; transform: scale(1.15); }
        }
        .highlight-float-1 { animation: floatHighlight1 8s ease-in-out infinite; }
        .highlight-float-2 { animation: floatHighlight2 10s ease-in-out infinite; }
        .highlight-pulse { animation: pulseOrb 6s ease-in-out infinite; }
      `}</style>

      {/* ── Multi-Tone Layered Atmospheric Ambient Glows ── */}
      <div className="absolute -top-24 right-10 w-96 h-96 bg-[#12602F]/5 rounded-full blur-[100px] pointer-events-none highlight-pulse" />
      <div className="absolute -bottom-24 left-10 w-96 h-96 bg-[#A68A56]/10 rounded-full blur-[100px] pointer-events-none highlight-pulse" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-180 h-90 bg-[#12602F]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* ── Background Botanical Watermark ── */}
      <div className="absolute top-12 left-8 w-40 opacity-[0.03] pointer-events-none highlight-float-1">
        <img src={morkinsEmblem} alt="" className="w-full h-auto object-contain" />
      </div>
      <div className="absolute bottom-8 right-8 w-52 opacity-[0.03] pointer-events-none highlight-float-2">
        <img src={morkinsEmblem} alt="" className="w-full h-auto object-contain" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Header ── */}
        <div className="text-center mb-5 sm:mb-18 max-w-5xl mx-auto">
          <p className="text-[16px] text-[#01442e] uppercase tracking-[0.2em] mb-3">
            THE MORKINS STANDARD
          </p>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-[#0C1B33] tracking-tight mt-2.5">
            Why Our Best Sellers Outperform
          </h2>

          <p className="mt-3.5 text-sm sm:text-base text-gray-600 font-normal leading-relaxed max-w-4xl mx-auto">
            Every best-selling formulation adheres to uncompromising biological purity, clinical cellular efficacy thresholds, and sustainable apothecary craftsmanship.
          </p>
        </div>

        {/* ── 4 Multi-Color Luxury Pillar Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="relative p-7 sm:p-8 rounded-md bg-[#F2F5F8] hover:bg-white border border-brand-dark/5 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between group hover:-translate-y-1.5 overflow-hidden cursor-default"
            >
              {/* Top Accent Line on Hover */}
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-[#A68A56] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Large Stylized Background Number Watermark */}
              <span className="absolute -bottom-4 -left-1 font-serif text-7xl sm:text-8xl font-bold text-[#A68A56]/15 select-none pointer-events-none group-hover:text-[#A68A56]/25 transition-colors duration-500">
                {pillar.num}
              </span>

              <div className="relative z-10">
                {/* Top Row: Icon Stage + Badge */}
                <div className="flex items-center justify-between mb-6">
                  {/* Glowing Icon Stage */}
                  <div className="relative">
                    <div className="w-13 h-13 rounded-xl bg-white border border-stone-200 text-[#12602F] flex items-center justify-center shadow-xs group-hover:shadow-md group-hover:scale-105 transition-all duration-500">
                      {pillar.icon}
                    </div>
                  </div>

                  {/* Shimmer Badge */}
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white text-[#0B1A28] border border-stone-200 px-3 py-1 rounded-none shadow-2xs transition-all duration-300">
                    {pillar.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl font-medium text-[#0B1A28] mb-2.5 leading-snug group-hover:text-[#A68A56] transition-colors duration-300">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-gray-500 font-light leading-relaxed mb-4">
                  {pillar.description}
                </p>
              </div>

              {/* Card Footer: Verified Metric Proof */}
              <div className="relative z-10 mt-6 pt-4 border-t border-stone-200 flex items-center justify-between text-xs transition-colors">
                <div className="flex items-center gap-1.5 font-bold text-[#12602F] text-[11px]">
                  <span className="w-4 h-4 rounded-full bg-[#12602F]/10 flex items-center justify-center text-[10px]">
                    ✓
                  </span>
                  <span>{pillar.metric}</span>
                </div>

                <span className="text-[10px] text-[#A68A56] font-mono tracking-wider opacity-70 group-hover:opacity-100 transition-opacity">
                  ISO-CERT
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
