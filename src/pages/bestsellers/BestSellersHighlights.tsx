export default function BestSellersHighlights() {
  const pillars = [
    {
      icon: (
        <svg className="w-6 h-6 text-[#6F8C51]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      badge: 'Purity 99.9%',
      title: 'Pharmaceutical Purity',
      description: 'Tested in ISO-certified laboratories under clinical dermatology protocols to ensure zero micro-contaminants, heavy metals, or irritants.'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[#6F8C51]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      badge: 'Optimal Dosage',
      title: 'Clinical Peptide Concentration',
      description: 'Engineered at exact physiological concentrations proven in peer-reviewed dermatology literature to activate cellular collagen synthesis.'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[#6F8C51]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      badge: 'Enzyme-Active',
      title: 'Cold-Enzyme Extraction',
      description: 'Zero-thermal extraction technology preserves 99.4% of live raw botanical enzymes, flavonoids, and active polyphenol potency.'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[#6F8C51]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      badge: 'UV-Defended',
      title: 'Apothecary Shielded Glass',
      description: 'Heavyweight amber UV-filtering Italian apothecary glass shields delicate bio-compounds against light-induced oxidation.'
    }
  ];

  return (
    <section className="py-16 sm:py-22 bg-[#F4F3EE]/50 border-b border-[#A68A56]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold text-[#A68A56] uppercase tracking-[0.25em] mb-2 block">
            The Morkins Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-brand-dark tracking-tight">
            Why Our Best Sellers Outperform
          </h2>
          <p className="mt-3 text-sm sm:text-base text-brand-dark/70 font-light leading-relaxed">
            Every best-selling formula adheres to uncompromising biological purity, clinical efficacy thresholds, and sustainable apothecary craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-white border border-[#A68A56]/15 hover:border-[#6F8C51]/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#6F8C51]/10 text-[#6F8C51] flex items-center justify-center group-hover:scale-110 transition-transform">
                    {pillar.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A68A56] bg-[#A68A56]/10 px-2.5 py-1 rounded-full">
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-brand-dark mb-2 group-hover:text-[#6F8C51] transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-xs text-brand-dark/70 font-light leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-semibold text-[#6F8C51]">
                <span>✓ Standard Verified</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
