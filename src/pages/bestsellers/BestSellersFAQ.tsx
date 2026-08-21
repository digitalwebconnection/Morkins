import { useState } from 'react';

export default function BestSellersFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How do I choose the right best seller for my skin concern?',
      a: 'If you are seeking instant luminosity and tone refinement, the Botanical Radiance Glow Serum is our #1 choice. For barrier repair and deep dryness, the Bio-Active Barrier Repair Cream works synergistically. You can also take our interactive Skin Quiz for personalized dosing.'
    },
    {
      q: 'Are Morkins best sellers suitable for sensitive skin?',
      a: 'Yes. All our best sellers are 100% free of synthetic fragrances, drying alcohols, parabens, and essential oil irritants. Every batch undergoes dermatological patch testing on sensitive skin cohorts.'
    },
    {
      q: 'How long until I see visible improvements?',
      a: 'In clinical user trials, 94% of participants reported heightened hydration within 24 hours, and 91% reported visibly refined texture and reduced dullness within 14 days of consistent morning and evening application.'
    },
    {
      q: 'Can I layer multiple best-selling serums together?',
      a: 'Yes! Apply in order of consistency from thinnest to thickest: start with water-based serums (Hyaluronic Dew or Niacinamide), follow with lipid elixirs (Radiance Glow Serum), and seal with Bio-Active Barrier Repair Cream.'
    }
  ];

  return (
    <section className="py-16 bg-[#F4F3EE]/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-[#A68A56] uppercase tracking-[0.2em] mb-2 block">
            Got Questions?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-brand-dark">
            Best Sellers Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-brand-dark/10 overflow-hidden transition-all duration-300 shadow-2xs"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-serif text-base sm:text-lg font-medium text-brand-dark hover:text-[#6F8C51] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center bg-gray-100 shrink-0 ml-4 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#6F8C51] text-white' : 'text-brand-dark'}`}>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-brand-dark/70 font-light leading-relaxed border-t border-brand-dark/5 animate-fade-in">
                    {faq.a}
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
