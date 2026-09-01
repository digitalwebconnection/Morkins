import { useState } from 'react';

const MEN_EDITORIAL_QUOTES = [
  {
    outlet: 'ROBB REPORT',
    quote: '"Morkins Revita Densifying Complex stimulates micro-circulation in the scalp thanks to pure encapsulated caffeine and Redensyl, promoting visibly thicker hair growth within 60 days."',
    author: 'Grooming & Style Editor, Robb Report',
    logoText: 'Robb Report',
  },
  {
    outlet: 'GQ',
    quote: '"The definitive upgrade in modern men’s trichology. Morkins stripped away prescription side effects and replaced them with potent cold-pressed botanical DHT blockers that actually work."',
    author: 'Senior Grooming Director, GQ Magazine',
    logoText: 'GQ',
  },
  {
    outlet: "MEN'S HEALTH",
    quote: '"Clean scalp science that delivers serious follicle recovery. The DHT-Blocker Biotin Shampoo and Scalp Density Serum are permanent staples in our yearly grooming awards."',
    author: 'Health & Fitness Editor, Men’s Health',
    logoText: "Men'sHealth",
  },
];

export default function HairCarePress() {
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);

  return (
    <section className="py-16 sm:py-20 bg-[#09090B] border-b border-zinc-800/80 relative overflow-hidden text-zinc-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div className="flex justify-center items-center gap-6 mb-6">
          {MEN_EDITORIAL_QUOTES.map((q, idx) => (
            <button
              key={idx}
              onClick={() => setActiveQuoteIndex(idx)}
              className={`font-serif text-lg sm:text-xl font-bold tracking-widest transition-all cursor-pointer ${
                activeQuoteIndex === idx
                  ? 'text-[#E5B869] scale-110 border-b-2 border-[#E5B869] pb-0.5'
                  : 'text-zinc-500 hover:text-white'
              }`}
            >
              {q.logoText}
            </button>
          ))}
        </div>

        <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl text-white font-normal leading-relaxed italic max-w-3xl mx-auto">
          {MEN_EDITORIAL_QUOTES[activeQuoteIndex].quote}
        </blockquote>

        <p className="text-xs font-bold uppercase tracking-widest text-[#E5B869] mt-6">
          — {MEN_EDITORIAL_QUOTES[activeQuoteIndex].author}
        </p>

      </div>
    </section>
  );
}
