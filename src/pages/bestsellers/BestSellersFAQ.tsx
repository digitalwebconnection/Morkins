import { useState } from 'react';

interface FAQItem {
  category: string;
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    category: 'selection',
    q: 'How do I choose the right best seller for my skin concern?',
    a: 'If you are seeking instant luminosity, tone refinement, and hyperpigmentation reduction, the Botanical Radiance Glow Serum is our #1 cult recommendation. For barrier repair, redness, and deep winter dryness, the Bio-Active Barrier Repair Cream works wonders. If plumping fine dehydration lines is your primary goal, the Hyaluronic Dew Plumping Elixir delivers immediate results.'
  },
  {
    category: 'layering',
    q: 'Can I safely layer multiple best-selling serums in one routine?',
    a: 'Yes! Our formulas are engineered to work synergistically without causing pilling or ingredient antagonism. Always apply in order of molecular consistency: start with water-based serums (Hyaluronic Dew or Niacinamide), follow with lipid-rich elixirs (Radiance Glow Serum), and seal with Bio-Active Barrier Repair Cream.'
  },
  {
    category: 'sensitive',
    q: 'Are Morkins best sellers suitable for sensitive, eczema, or rosacea-prone skin?',
    a: 'Yes. Every best-selling formula is 100% free of synthetic fragrances, drying alcohols, parabens, sulfates, and known essential oil allergens. Every batch undergoes comprehensive Human Repeat Insult Patch Testing (HRIPT) on sensitive skin cohorts.'
  },
  {
    category: 'results',
    q: 'How quickly can I expect to see visible improvements?',
    a: 'In clinical trials, 98% of participants measured an immediate surge in hydration within 2 hours. By Day 14, 94% reported visible improvements in radiance and reduction in texture irregularities with consistent AM/PM application.'
  },
  {
    category: 'guarantee',
    q: 'What is the 30-Day Radiant Skin Guarantee?',
    a: 'We stand completely behind our botanical formulations. If you do not experience visibly healthier, more radiant skin within 30 days of daily use, simply reach out to our concierge for a full, hassle-free refund.'
  }
];

export default function BestSellersFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredFaqs = selectedCategory === 'all'
    ? FAQS
    : FAQS.filter(faq => faq.category === selectedCategory);

  const categories = [
    { label: 'All Questions', value: 'all' },
    { label: 'Product Selection', value: 'selection' },
    { label: 'Layering & Ritual', value: 'layering' },
    { label: 'Sensitive Skin', value: 'sensitive' },
    { label: 'Results & Guarantee', value: 'guarantee' }
  ];

  return (
    <section className="py-16 sm:py-22 bg-[#FCFBF8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-[#A68A56] uppercase tracking-[0.25em] mb-2 block">
            Got Questions?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-brand-dark tracking-tight">
            Best Sellers Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm text-brand-dark/70 font-light max-w-xl mx-auto">
            Everything you need to know about our award-winning formulations, clinical safety, and daily rituals.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setSelectedCategory(cat.value);
                setOpenIdx(0);
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                selectedCategory === cat.value
                  ? 'bg-[#1C331B] text-[#AFD971] shadow-xs'
                  : 'bg-white text-brand-dark/70 hover:text-brand-dark hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#A68A56]/20 overflow-hidden transition-all duration-300 shadow-2xs hover:border-[#6F8C51]/40"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-serif text-base sm:text-lg font-medium text-brand-dark hover:text-[#6F8C51] transition-colors cursor-pointer"
                >
                  <span className="pr-4">{faq.q}</span>
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen ? 'rotate-180 bg-[#1C331B] text-[#AFD971]' : 'bg-[#F4F3EE] text-brand-dark'
                  }`}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-brand-dark/75 font-light leading-relaxed border-t border-gray-100 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Concierge Help Callout */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#F4F3EE] border border-[#A68A56]/20 text-center flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="font-serif text-xl font-medium text-brand-dark mb-1">
              Need a personalized prescription?
            </h4>
            <p className="text-xs text-brand-dark/70 font-light">
              Our clinical skincare advisors are on standby to evaluate your specific complexion goals.
            </p>
          </div>
          <a
            href="mailto:concierge@morkins.com"
            className="px-6 py-3 rounded-xl bg-[#1C331B] text-[#AFD971] text-xs font-bold uppercase tracking-widest hover:bg-[#284826] transition-all shadow-md shrink-0 cursor-pointer"
          >
            Chat with Concierge
          </a>
        </div>

      </div>
    </section>
  );
}
