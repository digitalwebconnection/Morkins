export default function BestSellersHighlights() {
  const pillars = [
    {
      icon: (
        <svg className="w-6 h-6 text-[#6F8C51]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Pharmaceutical Purity',
      description: 'Tested in ISO-certified laboratories under clinical dermatology protocols to ensure zero contamination or microbial impurity.'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[#6F8C51]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      title: 'Optimal Clinical Dosing',
      description: 'We use exact concentration thresholds proven in peer-reviewed dermatology research to trigger cellular renewal.'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[#6F8C51]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      title: 'Cold-Pressed Botanicals',
      description: 'Enzyme-preserving extraction technology preserves 99.4% of raw antioxidant potency in every drop.'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[#6F8C51]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      title: 'Sustainable Packaging',
      description: 'Heavyweight amber UV-shielded apothecary glass bottles protect delicate bioactive compounds indefinitely.'
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-brand-dark/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#A68A56] uppercase tracking-[0.2em] mb-2 block">
            The Morkins Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-brand-dark">
            Why Our Best Sellers Outperform
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-[#FCFBF8] border border-brand-dark/5 hover:border-[#6F8C51]/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#6F8C51]/10 flex items-center justify-center mb-4">
                {pillar.icon}
              </div>
              <h3 className="font-serif text-lg font-bold text-brand-dark mb-2">
                {pillar.title}
              </h3>
              <p className="text-xs text-brand-dark/70 font-light leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
