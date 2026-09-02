import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const HAIR_FAQS: FAQItem[] = [
  {
    question: 'How quickly will I notice reduced hair shedding and new growth?',
    answer: 'Most men notice a visible 60–70% reduction in shower hair fall within the first 14 to 30 days as botanical DHT blockers decongest hair pores. Between 60 and 90 days, micro-encapsulated caffeine and Redensyl activate dormant follicles, producing fine vellus hairs that mature into thicker, denser terminal hair shafts.',
    category: 'Results Timeline',
  },
  {
    question: 'Will I experience the dreaded "minoxidil shed" or rebound hair loss upon stopping?',
    answer: 'No. Pharmaceutical minoxidil forces artificial vasodilation, often causing a severe 4-week "dread shed" and rapid rebound loss if stopped. Morkins relies on botanical 5α-reductase phytosterols and liposomal caffeine to genuinely strengthen biological follicle cellular health without drug shock or withdrawal shedding.',
    category: 'Safety & Rebound',
  },
  {
    question: 'How do botanical DHT blockers work without systemic hormonal or sexual side effects?',
    answer: 'Unlike synthetic finasteride pills that circulate systemically through your entire bloodstream and suppress overall body DHT levels, Morkins topically targets 5α-reductase enzymes directly within scalp dermal papillae. This blocks DHT locally at the root follicle with zero impact on serum testosterone or sexual vitality.',
    category: 'Mechanism Science',
  },
  {
    question: 'Can I use Morkins alongside other styling products, waxes, or hats?',
    answer: 'Yes. Apply the Scalp Density Serum or Caffeine Tonic onto clean or towel-dry scalp first, allowing 2 minutes for complete trans-follicular liposomal absorption. Once absorbed, you can apply your preferred pomade, clay, or styling cream as normal. Wearing hats will not diminish formula bioavailability.',
    category: 'Daily Usage',
  },
];

export default function HairCareFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="haircare-faq" className="py-20 sm:py-14 select-none relative overflow-hidden bg-[#FDFCFA] border-t border-[#EDE4D8]/70">


      {/* Decorative ambient background glows */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-175 h-100 pointer-events-none opacity-35 blur-3xl"
        style={{
          background: 'radial-gradient(ellipse, rgba(196,154,108,0.2) 0%, rgba(245,238,230,0.05) 60%, transparent 80%)',
        }}
      />
      <div
        className="absolute bottom-0 right-10 w-96 h-96 pointer-events-none opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(139,90,43,0.15) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF5EF] border border-[#EDE4D8] mb-1 shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-[#A67C52]" />
            <span className="text-[9px] font-bold text-[#A67C52] uppercase tracking-[0.25em] font-mono">
              Trichology Knowledge Base
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1210] font-normal leading-tight">
            Frequently Asked{' '}
            <span
              className="italic"
              style={{
                background: 'linear-gradient(135deg, #8B5A2B 0%, #C49A6C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Questions
            </span>
          </h2>

          <p className="text-[#111111] text-sm font-light leading-relaxed max-w-3xl mx-auto">
            Everything you need to know about follicular DHT blocking, liposomal absorption, safety standards, and our 90-day growth guarantee.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {HAIR_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-xl border transition-all duration-400 ease-out overflow-hidden ${
                  isOpen
                    ? 'bg-white border-[#C49A6C]/80 shadow-[0_10px_30px_rgba(44,24,16,0.08)]'
                    : 'bg-white/80 backdrop-blur-xs border-[#d6d6d5] hover:border-[#D9C7B6] hover:bg-white shadow-xs hover:shadow-sm'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <span
                      className={`w-7 h-7 rounded-full text-xs font-mono font-bold flex items-center justify-center shrink-0 transition-colors duration-300 ${
                        isOpen
                          ? 'bg-[#2C1810] text-[#C49A6C] shadow-xs'
                          : 'bg-[#FAF5EF] text-[#A67C52] group-hover:bg-[#2C1810] group-hover:text-white'
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <span className="font-serif text-base sm:text-lg font-bold text-[#1A1210] group-hover:text-[#7A4E2D] transition-colors leading-snug">
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-400 ease-out ${
                      isOpen
                        ? 'bg-[#FAF5EF] text-[#8B5A2B] rotate-180 scale-105'
                        : 'bg-transparent text-[#9B8F84] group-hover:bg-[#FAF5EF] group-hover:text-[#2C1810]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 transition-transform duration-400" />
                  </div>
                </button>

                {/* Smooth CSS Grid Height & Opacity Transition */}
                <div
                  className={`grid transition-all duration-400 ease-in-out ${
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#0e0d0c] font-light leading-relaxed border-t border-[#F0E8DF] pl-14 sm:pl-16">
                      <p>{faq.answer}</p>
                      <div className="mt-3.5 flex items-center gap-2">
                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#8B5A2B] bg-[#FAF5EF] px-2.5 py-0.5 rounded-md border border-[#EDE4D8]">
                          {faq.category}
                        </span>
                      </div>
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
