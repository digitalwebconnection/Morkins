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
      theme: {
        accent: '#4E7A52',
        iconBg: 'bg-emerald-50/80 border-emerald-200/60 text-[#4E7A52]',
        badgeBg: 'bg-emerald-50 text-[#3E6541] border-emerald-200/70',
        hoverBorder: 'hover:border-emerald-500/50',
        hoverShadow: 'hover:shadow-[0_22px_50px_-10px_rgba(78,122,82,0.22)]',
        accentLine: 'bg-emerald-500',
        cornerOrb: 'bg-emerald-500/12 group-hover:bg-emerald-500/25',
        metricText: 'text-[#4E7A52]',
        metricBg: 'bg-emerald-100/80 text-[#3E6541]',
        hoverText: 'group-hover:text-[#4E7A52]',
        numColor: 'group-hover:text-emerald-800/15'
      }
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
      theme: {
        accent: '#B58234',
        iconBg: 'bg-amber-50/80 border-amber-200/60 text-[#B58234]',
        badgeBg: 'bg-amber-50 text-[#8C6221] border-amber-200/70',
        hoverBorder: 'hover:border-amber-500/50',
        hoverShadow: 'hover:shadow-[0_22px_50px_-10px_rgba(181,130,52,0.22)]',
        accentLine: 'bg-amber-500',
        cornerOrb: 'bg-amber-500/12 group-hover:bg-amber-500/25',
        metricText: 'text-[#B58234]',
        metricBg: 'bg-amber-100/80 text-[#8C6221]',
        hoverText: 'group-hover:text-[#B58234]',
        numColor: 'group-hover:text-amber-800/15'
      }
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
      theme: {
        accent: '#BD6338',
        iconBg: 'bg-orange-50/80 border-orange-200/60 text-[#BD6338]',
        badgeBg: 'bg-orange-50 text-[#964720] border-orange-200/70',
        hoverBorder: 'hover:border-orange-500/50',
        hoverShadow: 'hover:shadow-[0_22px_50px_-10px_rgba(189,99,56,0.22)]',
        accentLine: 'bg-orange-500',
        cornerOrb: 'bg-orange-500/12 group-hover:bg-orange-500/25',
        metricText: 'text-[#BD6338]',
        metricBg: 'bg-orange-100/80 text-[#964720]',
        hoverText: 'group-hover:text-[#BD6338]',
        numColor: 'group-hover:text-orange-800/15'
      }
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
      theme: {
        accent: '#4A6D88',
        iconBg: 'bg-sky-50/80 border-sky-200/60 text-[#4A6D88]',
        badgeBg: 'bg-sky-50 text-[#2D4D65] border-sky-200/70',
        hoverBorder: 'hover:border-sky-500/50',
        hoverShadow: 'hover:shadow-[0_22px_50px_-10px_rgba(74,109,136,0.22)]',
        accentLine: 'bg-sky-500',
        cornerOrb: 'bg-sky-500/12 group-hover:bg-sky-500/25',
        metricText: 'text-[#4A6D88]',
        metricBg: 'bg-sky-100/80 text-[#2D4D65]',
        hoverText: 'group-hover:text-[#4A6D88]',
        numColor: 'group-hover:text-sky-800/15'
      }
    }
  ];

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-[#FCFBF8] border-b border-[#D8CCB5]/40 overflow-hidden select-none">
      
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
      <div className="absolute -top-24 right-10 w-96 h-96 bg-[#4E7A52]/12 rounded-full blur-[100px] pointer-events-none highlight-pulse" />
      <div className="absolute -bottom-24 left-10 w-96 h-96 bg-[#B58234]/12 rounded-full blur-[100px] pointer-events-none highlight-pulse" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-180 h-90 bg-[#4E7A52]/8 rounded-full blur-[120px] pointer-events-none" />

      {/* ── Background Botanical Watermark ── */}
      <div className="absolute top-12 left-8 w-40 opacity-[0.035] pointer-events-none highlight-float-1">
        <img src={morkinsEmblem} alt="" className="w-full h-auto object-contain" />
      </div>
      <div className="absolute bottom-8 right-8 w-52 opacity-[0.035] pointer-events-none highlight-float-2">
        <img src={morkinsEmblem} alt="" className="w-full h-auto object-contain" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ── Section Header ── */}
        <div className="text-center max-w-5xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4EFE6] border border-[#C9B387]/50 text-[#8C6D34] text-[11px] font-bold tracking-[0.25em] uppercase mb-4 backdrop-blur-xs shadow-2xs">
            <span className="text-[#B58234]">✦</span>
            <span>The Morkins Standard</span>
            <span className="text-[#BD6338]">✦</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1C2E1A] tracking-tight leading-[1.18]">
            Why Our Best Sellers{' '}
            <span className="italic font-normal text-[#2D5A32]">
              Outperform
            </span>
          </h2>

          <p className="mt-3.5 text-sm sm:text-base text-[#464D3F] font-normal leading-relaxed max-w-4xl mx-auto">
            Every best-selling formulation adheres to uncompromising biological purity, clinical cellular efficacy thresholds, and sustainable apothecary craftsmanship.
          </p>
        </div>

        {/* ── 4 Multi-Color Luxury Pillar Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className={`relative p-7 sm:p-8 rounded-xl bg-white hover:bg-[#FAF9F5] backdrop-blur-md border border-[#DDD3C1]/80 ${pillar.theme.hoverBorder} shadow-[0_4px_22px_-4px_rgba(30,40,25,0.08)] ${pillar.theme.hoverShadow} transition-all duration-500 flex flex-col justify-between group hover:-translate-y-2 overflow-hidden cursor-default`}
            >
              {/* Top Accent Line on Hover */}
              <div className={`absolute top-0 left-0 right-0 h-[2.5px] ${pillar.theme.accentLine} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* 3. Ambient Corner Glow in Card Background */}
              <div className={`absolute -top-16 -right-16 w-40 h-40 ${pillar.theme.cornerOrb} rounded-full blur-2xl group-hover:scale-125 transition-all duration-700 pointer-events-none`} />

              {/* 4. Subtle Botanical Leaf Watermark inside Card */}
              <div className="absolute -bottom-6 -right-6 w-28 h-28 opacity-[0.03] group-hover:opacity-[0.09] group-hover:scale-115 group-hover:rotate-12 transition-all duration-700 pointer-events-none">
                <img src={morkinsEmblem} alt="" className="w-full h-full object-contain" />
              </div>

              {/* 5. Large Stylized Background Number Watermark */}
              <span className={`absolute -bottom-4 -left-1 font-serif text-7xl sm:text-8xl font-bold text-[#A68A56]/10 select-none pointer-events-none ${pillar.theme.numColor} transition-colors duration-500`}>
                {pillar.num}
              </span>

              <div className="relative z-10">
                {/* Top Row: Icon Stage + Badge */}
                <div className="flex items-center justify-between mb-6">
                  {/* Glowing Icon Stage */}
                  <div className="relative">
                    <div className={`w-13 h-13 rounded-2xl ${pillar.theme.iconBg} border flex items-center justify-center shadow-xs group-hover:shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      {pillar.icon}
                    </div>
                    {/* Pulsing Aura Ping on Hover */}
                    <div className={`absolute inset-0 rounded-2xl ${pillar.theme.iconBg} opacity-0 group-hover:opacity-100 group-hover:scale-125 blur-sm transition-all duration-500 -z-10`} />
                  </div>

                  {/* Shimmer Badge */}
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${pillar.theme.badgeBg} border px-3 py-1 rounded-full shadow-2xs transition-all duration-300`}>
                    {pillar.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className={`font-serif text-xl font-bold text-[#182617] mb-2.5 leading-snug ${pillar.theme.hoverText} transition-colors duration-300`}>
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-[#464D3F] font-normal leading-relaxed mb-4">
                  {pillar.description}
                </p>
              </div>

              {/* Card Footer: Verified Metric Proof */}
              <div className="relative z-10 mt-6 pt-4 border-t border-[#E5DEC9] flex items-center justify-between text-xs transition-colors">
                <div className={`flex items-center gap-1.5 font-bold ${pillar.theme.metricText} text-[11px]`}>
                  <span className={`w-4 h-4 rounded-full ${pillar.theme.metricBg} flex items-center justify-center text-[10px]`}>
                    ✓
                  </span>
                  <span>{pillar.metric}</span>
                </div>

                <span className="text-[10px] text-[#8C6221] font-mono tracking-wider opacity-70 group-hover:opacity-100 transition-opacity">
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
