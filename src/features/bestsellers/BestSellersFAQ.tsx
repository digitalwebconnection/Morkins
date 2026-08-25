import { useState } from 'react';

interface FAQItem {
  id: string;
  category: 'selection' | 'layering' | 'sensitive' | 'results' | 'guarantee';
  categoryLabel: string;
  q: string;
  a: string;
  tip?: string;
  badgeTheme: {
    bg: string;
    text: string;
    border: string;
  };
}


const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'selection',
    categoryLabel: 'Formula Selection',
    badgeTheme: {
      bg: 'bg-emerald-50/90',
      text: 'text-[#2D5A32]',
      border: 'border-emerald-200/80'
    },
    q: 'How do I choose the right best seller for my skin concern?',
    a: 'If you are seeking instant luminosity, tone refinement, and hyperpigmentation reduction, the Botanical Radiance Glow Serum is our #1 cult recommendation. For barrier repair, redness, and deep winter dryness, the Bio-Active Barrier Repair Cream works wonders. If plumping fine dehydration lines is your primary goal, the Hyaluronic Dew Plumping Elixir delivers immediate results.',
    tip: 'Take our 60-second Skin Quiz to receive a personalized day/night regimen matched to your specific cellular profile.'
  },
  {
    id: 'faq-2',
    category: 'layering',
    categoryLabel: 'Layering & Routine',
    badgeTheme: {
      bg: 'bg-amber-50/90',
      text: 'text-[#8C6221]',
      border: 'border-amber-200/80'
    },
    q: 'Can I safely layer multiple best-selling serums in one routine?',
    a: 'Yes! Our formulas are engineered to work synergistically without causing pilling or ingredient antagonism. Always apply in order of molecular consistency: start with water-based serums (Hyaluronic Dew or Niacinamide), follow with lipid-rich elixirs (Radiance Glow Serum), and seal with Bio-Active Barrier Repair Cream.',
    tip: 'Wait 30-45 seconds between layers to allow active botanical enzymes to absorb fully into the lipid barrier.'
  },
  {
    id: 'faq-3',
    category: 'sensitive',
    categoryLabel: 'Sensitive Skin',
    badgeTheme: {
      bg: 'bg-teal-50/90',
      text: 'text-[#235C53]',
      border: 'border-teal-200/80'
    },
    q: 'Are Morkins best sellers suitable for sensitive, eczema, or rosacea-prone skin?',
    a: 'Yes. Every best-selling formula is 100% free of synthetic fragrances, drying alcohols, parabens, sulfates, and known essential oil allergens. Every batch undergoes comprehensive Human Repeat Insult Patch Testing (HRIPT) on sensitive skin cohorts.',
    tip: 'For highly reactive skin, patch test behind the ear or inner wrist for 24 hours prior to full facial application.'
  },
  {
    id: 'faq-4',
    category: 'results',
    categoryLabel: 'Clinical Results',
    badgeTheme: {
      bg: 'bg-orange-50/90',
      text: 'text-[#964720]',
      border: 'border-orange-200/80'
    },
    q: 'How quickly can I expect to see visible improvements?',
    a: 'In clinical trials, 98% of participants measured an immediate surge in hydration within 2 hours. By Day 14, 94% reported visible improvements in radiance and reduction in texture irregularities with consistent AM/PM application.',
    tip: 'Cellular skin turnover occurs over 28 days—peak structural firmness and tone clarity are reached by week 4.'
  },
  {
    id: 'faq-5',
    category: 'guarantee',
    categoryLabel: '30-Day Guarantee',
    badgeTheme: {
      bg: 'bg-yellow-50/90',
      text: 'text-[#826019]',
      border: 'border-yellow-200/80'
    },
    q: 'What is the 30-Day Radiant Skin Guarantee?',
    a: 'We stand completely behind our botanical formulations. If you do not experience visibly healthier, more radiant skin within 30 days of daily use, simply reach out to our concierge for a full, hassle-free refund.',
    tip: 'No return shipping fees or difficult forms required—simply message our dedicated concierge team.'
  }
];

export default function BestSellersFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [selectedCategory] = useState<string>('all');

  const filteredFaqs = selectedCategory === 'all'
    ? FAQS
    : FAQS.filter(faq => faq.category === selectedCategory);

  return (
    <section className="relative py-14 sm:py-8 lg:py-14 bg-linear-to-b from-[#FCFBF8] via-[#FAF8F2] to-[#F3EFE6]/90 border-b border-[#D8CCB5]/40 overflow-hidden select-none">
      
      <style>{`
        @keyframes faqFloat1 {
          0%, 100% { transform: translateY(0px) rotate(-10deg); }
          50% { transform: translateY(-10px) rotate(-6deg); }
        }
        @keyframes faqFloat2 {
          0%, 100% { transform: translateY(0px) rotate(10deg); }
          50% { transform: translateY(12px) rotate(14deg); }
        }
        @keyframes pulseAtmosphere {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.65; transform: scale(1.1); }
        }
        .faq-float-1 { animation: faqFloat1 10s ease-in-out infinite; }
        .faq-float-2 { animation: faqFloat2 12s ease-in-out infinite; }
        .faq-pulse { animation: pulseAtmosphere 8s ease-in-out infinite; }
      `}</style>

      <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-180 sm:w-220 h-96 bg-linear-to-b from-[#4E7A52]/14 via-[#6F8C51]/8 to-transparent rounded-full blur-[120px] pointer-events-none faq-pulse" />
      <div className="absolute -bottom-24 -left-20 w-96 h-96 bg-[#3E6541]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-20 w-96 h-96 bg-[#C49746]/12 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-3/4 bg-radial from-[#D4B574]/8 via-transparent to-transparent rounded-full blur-[100px] pointer-events-none" />

 

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-linear-to-r from-[#F4EFE6] via-[#EFE8D8] to-[#F4EFE6] border border-[#C9B387]/50 text-[#8C6D34] text-[11px] font-bold tracking-[0.25em] uppercase mb-4 backdrop-blur-xs shadow-[0_2px_10px_rgba(196,151,70,0.12)]">
            <span className="text-[#4E7A52]">✦</span>
            <span>Knowledge & Ritual Concierge</span>
            <span className="text-[#C49746]">✦</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1B2B19] tracking-tight leading-[1.18]">
            Frequently Asked{' '}
            <span className="italic  bg-linear-to-r from-[#2D5028] via-[#5B803E] to-[#B08535] bg-clip-text text-transparent drop-shadow-[0_1px_12px_rgba(111,140,81,0.22)]">
              Questions
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#464D3F] font-light max-w-4xl mx-auto leading-relaxed">
            Everything you need to know about our biological formulation standards, clinical efficacy, and application rituals.
          </p>
        </div>

        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;

            return (
              <div
                key={faq.id}
                className={`rounded-xl border transition-all duration-400 overflow-hidden relative ${
                  isOpen
                    ? 'bg-white border-[#547E3D] shadow-[0_16px_40px_-8px_rgba(78,122,82,0.22),0_4px_12px_rgba(0,0,0,0.04)] ring-2 ring-[#6F8C51]/20 -translate-y-0.5'
                    : 'bg-linear-to-r from-white via-[#FCFBF8] to-white border-[#DDD3C1]/80 hover:border-[#6F8C51]/60 shadow-[0_4px_22px_-6px_rgba(30,40,25,0.06)] hover:shadow-[0_12px_32px_-6px_rgba(78,122,82,0.15)] hover:-translate-y-0.5'
                }`}
              >
                {isOpen && (
                  <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-linear-to-r from-transparent via-[#6F8C51] to-transparent pointer-events-none" />
                )}

                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-serif text-base sm:text-lg font-medium text-[#182617] hover:text-[#3B622E] transition-colors cursor-pointer gap-4 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border shrink-0 ${faq.badgeTheme.bg} ${faq.badgeTheme.text} ${faq.badgeTheme.border}`}>
                      {faq.categoryLabel}
                    </span>
                    <span className="font-semibold leading-snug group-hover:text-[#3B622E] transition-colors">
                      {faq.q}
                    </span>
                  </div>

                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 border ${
                      isOpen
                        ? 'rotate-180 bg-linear-to-br from-[#1C331B] to-[#2B4B27] text-[#AFD971] border-[#AFD971]/40 shadow-[0_4px_14px_rgba(28,51,27,0.35)]'
                        : 'bg-[#F2ECE1] text-[#4A5543] border-[#D5CBB8] shadow-2xs hover:bg-[#6F8C51] hover:text-white hover:border-[#6F8C51]'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-3.5 border-t border-[#E5DEC9] bg-linear-to-b from-[#FAF8F3]/90 via-[#F7F4EC] to-white/95 shadow-[inset_0_2px_8px_rgba(0,0,0,0.025)] animate-fade-in space-y-3.5">
                    <p className="text-xs sm:text-sm text-[#30382E] font-normal leading-relaxed">
                      {faq.a}
                    </p>

                    {faq.tip && (
                      <div className="bg-emerald-50/80 border-l-3 border-[#4E7A52] text-[#244727] p-3 rounded-r-xl text-xs flex items-start gap-2.5 shadow-2xs">
                        <span className="text-[#4E7A52] font-bold text-sm shrink-0 leading-none mt-0.5">✦</span>
                        <span className="leading-relaxed">
                          <strong className="font-semibold text-[#1C3A1F]">Ritual Tip:</strong> {faq.tip}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>



      </div>
    </section>
  );
}
