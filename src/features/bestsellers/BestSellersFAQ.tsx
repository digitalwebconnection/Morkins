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
    <section className="relative py-14 sm:py-8 lg:py-14 bg-[#F4F8F5] border-b border-[#13442C]/10 overflow-hidden select-none">

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

      <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-180 sm:w-220 h-96 bg-[#12602F]/5 rounded-full blur-[120px] pointer-events-none faq-pulse" />
      <div className="absolute -bottom-24 -left-20 w-96 h-96 bg-[#A68A56]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-20 w-96 h-96 bg-[#12602F]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center mb-5 sm:mb-18">
          <p className="text-[16px] text-[#01442e] uppercase tracking-[0.2em] mb-3">
            COMMON INQUIRIES
          </p>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-[#0C1B33] tracking-tight mt-2.5">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 font-light max-w-4xl mx-auto leading-relaxed">
            Everything you need to know about our biological formulation standards, clinical efficacy, and application rituals.
          </p>
        </div>

        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;

            return (
              <div
                key={faq.id}
                className={`rounded-md border transition-all duration-400 overflow-hidden relative ${isOpen
                    ? 'bg-white border-[#0B1A28] shadow-md ring-1 ring-[#0B1A28]/10 -translate-y-0.5'
                    : 'bg-white border-stone-200 hover:border-[#A68A56]/60 shadow-xs hover:-translate-y-0.5'
                  }`}
              >
                <div
                  className={`absolute top-0 left-0 right-0 h-[2.5px] bg-[#A68A56] pointer-events-none transition-opacity duration-300 ${
                    isOpen ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-serif text-base sm:text-lg font-medium text-[#0B1A28] hover:text-[#A68A56] transition-colors cursor-pointer gap-4 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-none border shrink-0 bg-[#F2F5F8] text-[#A68A56] border-stone-200">
                      {faq.categoryLabel}
                    </span>
                    <span className="font-medium leading-snug group-hover:text-[#A68A56] transition-colors">
                      {faq.q}
                    </span>
                  </div>

                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-400 ease-out border ${isOpen
                        ? 'rotate-180 bg-[#0B1A28] text-white border-[#0B1A28]'
                        : 'bg-stone-100 text-stone-600 border-stone-200 hover:bg-[#0B1A28] hover:text-white'
                      }`}
                  >
                    <svg className="w-4 h-4 transition-transform duration-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                {/* Smooth CSS Grid Height & Opacity Transition */}
                <div
                  className={`grid transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-3.5 border-t border-stone-100 bg-white space-y-3.5">
                      <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed">
                        {faq.a}
                      </p>

                      {faq.tip && (
                        <div className="bg-[#F4F8F5] border-l-4 border-[#12602F] text-[#0B1A28] p-3.5 rounded-r-md text-xs flex items-start gap-2.5 shadow-2xs">
                          <span className="text-[#12602F] font-bold text-sm shrink-0 leading-none mt-0.5">✦</span>
                          <span className="leading-relaxed">
                            <strong className="font-semibold text-[#12602F]">Ritual Tip:</strong> {faq.tip}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>



      </div>
    </section>
  );
}
