import { useState } from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';

const EDITORIAL_QUOTES = [
  {
    outlet: 'ELLE',
    quote: '"If you are seeking genuine dermal glass radiance without aggressive chemical peels, Morkins Botanical Glow Serum is simply the gold standard in clean, bio-active hydration."',
    author: 'Beauty & Wellness Editor, ELLE Magazine',
    logoText: 'ELLE',
  },
  {
    outlet: 'VOGUE',
    quote: '"The holy grail of cold-pressed apothecary. Morkins formulations blend European botanical traditions with pharmaceutical cellular delivery that visibly transforms skin in 14 days."',
    author: 'Senior Skincare Critic, VOGUE International',
    logoText: 'VOGUE',
  },
  {
    outlet: "HARPER'S BAZAAR",
    quote: '"Zero fillers, zero petrochemicals, and 100% active plant enzymes. The Bio-Active Barrier Cream has earned permanent sanctuary status on our beauty desk."',
    author: 'Executive Beauty Director, Harper’s BAZAAR',
    logoText: "HARPER'S BAZAAR",
  },
  {
    outlet: 'MARIE CLAIRE',
    quote: '"The rare skincare line that actually delivers on its high-science claims. Our testing panel reported undeniable plumping and pore refinement within a single week."',
    author: 'Editor-in-Chief of Clean Beauty, Marie Claire',
    logoText: 'MARIE CLAIRE',
  },
];

const PATRON_REVIEWS = [
  {
    name: 'Camille Laurent',
    location: 'Paris, France',
    skinType: 'Sensitive & Reactive Barrier',
    rating: 5,
    title: 'Healed my damaged skin barrier in 5 days!',
    review: 'After over-exfoliating with harsh acids, everything burned my skin. The Bio-Active Barrier Cream and Centella Gel literally saved my skin barrier. Zero stinging, just instant calming dewy moisture.',
    verified: true,
    productUsed: 'The Deep Barrier Recovery System',
  },
  {
    name: 'Sophia Chen',
    location: 'San Francisco, CA',
    skinType: 'Dull / Dehydrated Complexion',
    rating: 5,
    title: 'The glass skin glow is 100% real',
    review: 'I was skeptical of "glass skin" claims, but the Botanical Glow Serum and Hyaluronic Dew Elixir gave me that reflective, bouncy radiance without feeling heavy or oily under makeup.',
    verified: true,
    productUsed: 'The Glass Skin Radiance Ritual',
  },
  {
    name: 'Elena Rostova',
    location: 'London, UK',
    skinType: 'Combination / Fine Lines',
    rating: 5,
    title: 'Retinol results without any peeling!',
    review: 'The Bakuchiol Firming Elixir and Peptide Fluid smoothed my forehead fine lines and tightened my pores with zero flaking or sun sensitivity. My holy grail forever.',
    verified: true,
    productUsed: 'Bakuchiol Natural Firming Elixir',
  },
];

export default function SkinCarePress() {
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F4] border-b border-[#DDD3C1] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

        {/* Top Editorial Press Stage */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-[#DDD3C1] shadow-sm mb-16 relative">
          
          <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 text-[#8C6221] flex items-center justify-center mx-auto mb-6">
            <Quote className="w-6 h-6" />
          </div>

          {/* Magazine Logos Selector */}
          <div className="flex justify-center items-center gap-6 sm:gap-10 mb-8 flex-wrap">
            {EDITORIAL_QUOTES.map((q, idx) => (
              <button
                key={idx}
                onClick={() => setActiveQuoteIndex(idx)}
                className={`font-serif text-lg sm:text-2xl font-bold tracking-widest transition-all cursor-pointer ${
                  activeQuoteIndex === idx
                    ? 'text-[#12602F] scale-110 border-b-2 border-[#12602F] pb-1'
                    : 'text-stone-400 hover:text-stone-700'
                }`}
              >
                {q.logoText}
              </button>
            ))}
          </div>

          {/* Active Quote */}
          <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#123624] font-normal leading-relaxed italic max-w-3xl mx-auto min-h-[100px] flex items-center justify-center">
            {EDITORIAL_QUOTES[activeQuoteIndex].quote}
          </blockquote>

          <p className="text-xs font-bold uppercase tracking-widest text-[#8C6221] mt-6 font-mono">
            — {EDITORIAL_QUOTES[activeQuoteIndex].author}
          </p>
        </div>

        {/* Section Heading for Patron Reviews */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#8C6221] uppercase tracking-[0.25em] mb-2 block">
            Real Patron Transformations
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#123624] font-normal leading-tight">
            Verified Experiences From Our Community
          </h3>
        </div>

        {/* 3 Patron Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {PATRON_REVIEWS.map((review, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-[#DDD3C1] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Stars & Skin Type */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#8C6221] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {review.skinType}
                  </span>
                </div>

                <h4 className="font-serif text-base font-bold text-[#1C2E1A] leading-snug">
                  "{review.title}"
                </h4>

                <p className="text-xs text-stone-600 font-light leading-relaxed">
                  {review.review}
                </p>
              </div>

              <div className="pt-3 border-t border-[#EAE3D2] flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-[#1C2E1A] flex items-center gap-1.5">
                    <span>{review.name}</span>
                    {review.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
                    )}
                  </p>
                  <p className="text-[10px] text-stone-400 font-mono">{review.location}</p>
                </div>
                <span className="text-[9px] text-[#12602F] font-bold bg-[#12602F]/10 px-2 py-0.5 rounded">
                  Verified Buyer
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
