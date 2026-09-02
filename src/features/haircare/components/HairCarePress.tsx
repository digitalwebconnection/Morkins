import { useState } from 'react';
import { Quote } from 'lucide-react';

const MEN_EDITORIAL_QUOTES = [
  {
    outlet: 'ROBB REPORT',
    quote: '"Morkins Revita Densifying Complex stimulates micro-circulation in the scalp thanks to pure encapsulated caffeine and Redensyl, promoting visibly thicker hair growth within 60 days."',
    author: 'Grooming & Style Editor, Robb Report',
    logoText: 'Robb Report',
  },
  {
    outlet: 'GQ',
    quote: '"The definitive upgrade in modern men\'s trichology. Morkins stripped away prescription side effects and replaced them with potent cold-pressed botanical DHT blockers that actually work."',
    author: 'Senior Grooming Director, GQ Magazine',
    logoText: 'GQ',
  },
  {
    outlet: "MEN'S HEALTH",
    quote: '"Clean scalp science that delivers serious follicle recovery. The DHT-Blocker Biotin Shampoo and Scalp Density Serum are permanent staples in our yearly grooming awards."',
    author: 'Health & Fitness Editor, Men\'s Health',
    logoText: "Men's Health",
  },
];

export default function HairCarePress() {
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden select-none bg-white">

      {/* Decorative large quote mark */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-none opacity-[0.04]">
        <Quote className="w-56 h-56 text-[#2C1810]" strokeWidth={1} />
      </div>

      {/* Warm ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-112.5 h-75 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(196,154,108,0.06) 0%, transparent 70%)' }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

        {/* Publication tabs */}
        <div className="flex justify-center items-center gap-4 sm:gap-8 mb-10">
          {MEN_EDITORIAL_QUOTES.map((q, idx) => (
            <button
              key={idx}
              onClick={() => setActiveQuoteIndex(idx)}
              className={`relative font-serif text-base sm:text-lg font-bold tracking-[0.15em] transition-all duration-300 cursor-pointer uppercase pb-2 ${
                activeQuoteIndex === idx
                  ? 'text-[#7A4E2D]'
                  : 'text-[#C4B8AC] hover:text-[#9B8F84]'
              }`}
            >
              {q.logoText}
              <span className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-all duration-300 ${
                activeQuoteIndex === idx ? 'opacity-100' : 'opacity-0'
              }`} style={{ background: 'linear-gradient(90deg, transparent, #A67C52, transparent)' }} />
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="w-16 h-px mx-auto mb-8" style={{ background: 'linear-gradient(90deg, transparent, #D9C7B6, transparent)' }} />

        {/* Quote */}
        <blockquote className="font-serif text-xl sm:text-2xl lg:text-[1.75rem] text-[#2C1810] font-normal leading-relaxed italic max-w-3xl mx-auto">
          {MEN_EDITORIAL_QUOTES[activeQuoteIndex].quote}
        </blockquote>

        {/* Author attribution */}
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] mt-8 font-mono text-[#A67C52]">
          — {MEN_EDITORIAL_QUOTES[activeQuoteIndex].author}
        </p>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {MEN_EDITORIAL_QUOTES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveQuoteIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeQuoteIndex === idx ? 'bg-[#A67C52] scale-125 shadow-sm' : 'bg-[#E8D9C8] hover:bg-[#D9C7B6]'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
