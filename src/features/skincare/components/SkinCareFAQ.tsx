import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'How should I layer Morkins skincare formulations for maximum bioavailability?',
    answer: 'The universal rule of dermal absorption is from lightest to heaviest viscosity: (1) Cleanse with Gentle Foaming Wash, (2) Apply aqueous treatments like Hyaluronic Dew or Niacinamide Serum onto damp skin, (3) Layer lipid bio-actives like Bakuchiol or Collagen Boost Fluid, and (4) Seal the lipid barrier with Barrier Repair Cream or Overnight Recovery Mask.',
    category: 'Application Routine',
  },
  {
    question: 'Why is zero-heat cold bio-extraction (<38°C) critical for skincare results?',
    answer: 'Conventional cosmetic factories heat ingredients to 70°C–90°C during emulsion, which irrevocably denatures fragile plant enzymes, destroys Vitamin C isomers, and oxidizes essential fatty acids. Morkins utilizes sub-critical cold extraction below 38°C, preserving 100% of living plant bio-actives in their bioactive native states.',
    category: 'Formulation Science',
  },
  {
    question: 'Are Morkins formulations safe for eczema, rosacea, and reactive sensitive skin?',
    answer: 'Yes. Our clinical formulations are 100% free from synthetic fragrances, drying alcohols, mineral oils, and harsh petrochemical emulsifiers. Formulas like our Centella Calming Gel and Bio-Active Barrier Cream are specifically in-vivo dermatologically tested on compromised skin barriers.',
    category: 'Skin Safety',
  },
  {
    question: 'Is Bakuchiol as effective as synthetic Retinol—and is it sun-safe?',
    answer: 'Clinical double-blind studies in the British Journal of Dermatology confirm that 1% natural Bakuchiol matches 0.5% Retinol in stimulating Collagen Type I and accelerating cell renewal, but without the flaking, redness, or photosensitivity. Bakuchiol does not degrade under UV light and is gentle enough for daytime use.',
    category: 'Bio-Actives',
  },
  {
    question: 'What is the 30-Day Dewy Glass Skin Guarantee?',
    answer: 'We stand behind our clinical botanical formulations. If you do not experience noticeable improvements in skin hydration, barrier comfort, and radiant glow within 30 days of consistent use, simply contact our concierge team for a 100% hassle-free refund.',
    category: 'Guarantee',
  },
];

export default function SkinCareFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-[#EAE3D2]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#8C6221] uppercase tracking-[0.25em] mb-2 block">
            Apothecary Knowledge Base
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2C1810] font-normal leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-[#5C4F46] text-sm sm:text-base font-light mt-3">
            Have questions about clinical layering, cold extraction purity, or sensitivity testing? Find answers from our lab experts.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#FAF8F4] rounded-2xl border border-[#DDD3C1] overflow-hidden transition-all duration-300 shadow-2xs hover:border-[#12602F]/40"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#12602F]/10 text-[#12602F] text-xs font-mono font-bold flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </span>
                    <span className="font-serif text-base sm:text-lg font-bold text-[#2C1810] leading-snug">
                      {faq.question}
                    </span>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 text-stone-500 shrink-0 transition-transform duration-400 ease-out ${
                      isOpen ? 'rotate-180 text-[#12602F]' : ''
                    }`}
                  />
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
                    <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-[#5C4F46] font-light leading-relaxed border-t border-[#EAE3D2]/60 pl-14">
                      <p>{faq.answer}</p>
                      <span className="inline-block mt-3 text-[10px] font-mono font-bold uppercase tracking-wider text-[#8C6221] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {faq.category}
                      </span>
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
