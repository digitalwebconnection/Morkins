import { useState } from 'react';

interface Review {
  id: number;
  author: string;
  location: string;
  rating: number;
  productBought: string;
  skinType: string;
  timeframe: string;
  headline: string;
  comment: string;
  verified: boolean;
}

const REVIEWS: Review[] = [
  {
    id: 1,
    author: 'Genevieve L.',
    location: 'Geneva, Switzerland',
    rating: 5,
    productBought: 'Botanical Radiance Glow Serum',
    skinType: 'Sensitive & Dull Skin',
    timeframe: 'Used for 3 weeks',
    headline: 'Truly transformed my skin texture within 14 days!',
    comment: 'I was skeptical because my skin reacts to almost every serum on the market. Morkins Botanical Radiance serum absorbed like a drink of water without a single trace of redness. My post-acne dark marks have visibly diminished and my skin has that lit-from-within glass glow.',
    verified: true
  },
  {
    id: 2,
    author: 'Clara M.',
    location: 'New York, USA',
    rating: 5,
    productBought: 'Bio-Active Barrier Repair Cream',
    skinType: 'Compromised Skin Barrier / Rosacea',
    timeframe: 'Used for 1 month',
    headline: 'Saved my peeling, winter-wrecked skin barrier.',
    comment: 'After over-exfoliating with harsh chemical peels, my barrier was in agony. This cream healed the stinging and tightness literally overnight. It is rich yet completely non-comedogenic. This is officially my holy grail staple product.',
    verified: true
  },
  {
    id: 3,
    author: 'Sophia R.',
    location: 'London, UK',
    rating: 5,
    productBought: 'Hyaluronic Dew Plumping Elixir',
    skinType: 'Dry & Dehydrated Skin',
    timeframe: 'Used for 2 weeks',
    headline: 'Fine lines around my eyes and forehead simply smoothed out.',
    comment: 'The 4D multi-molecular hyaluronic acid makes an undeniable difference compared to standard drugstore formulas. It keeps my face plumped and bouncy for a full 12-hour workday. Makeup goes on seamlessly without flaking.',
    verified: true
  },
  {
    id: 4,
    author: 'Evelyn K.',
    location: 'Stockholm, Sweden',
    rating: 5,
    productBought: '3-Step Holy Grail Ritual',
    skinType: 'Normal to Dry',
    timeframe: 'Used for 2 months',
    headline: 'The 3-step bundle is the best skincare investment I have ever made.',
    comment: 'Buying the full 3-step ritual saved me 20% and completely streamlined my morning routine. The wash is velvety, the serum gives high wattage radiance, and the barrier cream seals it all in. Constant compliments from coworkers!',
    verified: true
  }
];

export default function BestSellersReviews() {
  const [filterRating] = useState<number | 'all'>('all');

  const filteredReviews = filterRating === 'all'
    ? REVIEWS
    : REVIEWS.filter(r => r.rating === filterRating);

  return (
    <section className="py-16 sm:py-22 bg-[#FCFBF8] border-b border-[#A68A56]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#A68A56]/15 border border-[#A68A56]/30 text-[#8B7443] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">
            <span>💬 Real Verified Stories</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-brand-dark tracking-tight">
            Loved By Over <span className="italic font-light text-[#6F8C51]">50,000+ Patrons</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-brand-dark/70 font-light leading-relaxed">
            Read unfiltered accounts from our verified community who made Morkins best sellers an indispensable part of their daily life.
          </p>
        </div>

        {/* Rating Scorecard Overview */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#A68A56]/20 shadow-sm mb-12 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left Score */}
            <div className="md:col-span-5 text-center md:text-left md:border-r border-gray-100 md:pr-6">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="font-serif text-5xl sm:text-6xl font-bold text-brand-dark">4.9</span>
                <div>
                  <div className="flex text-amber-500 text-lg">★★★★★</div>
                  <span className="text-xs text-brand-dark/60 font-semibold">14,800+ Verified Ratings</span>
                </div>
              </div>
              <p className="text-xs text-brand-dark/70 font-light mt-3">
                98.4% of customers recommend these formulations to friends and family.
              </p>
            </div>

            {/* Right Breakdown Bars */}
            <div className="md:col-span-7 space-y-2">
              <div className="flex items-center gap-3 text-xs font-semibold text-brand-dark/70">
                <span className="w-12">5 Stars</span>
                <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#6F8C51] rounded-full w-[94%]" />
                </div>
                <span className="w-10 text-right font-mono font-bold text-brand-dark">94%</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold text-brand-dark/70">
                <span className="w-12">4 Stars</span>
                <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#A68A56] rounded-full w-[5%]" />
                </div>
                <span className="w-10 text-right font-mono font-bold text-brand-dark">5%</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold text-brand-dark/70">
                <span className="w-12">3 Stars</span>
                <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-300 rounded-full w-[1%]" />
                </div>
                <span className="w-10 text-right font-mono font-bold text-brand-dark">1%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#A68A56]/15 hover:border-[#6F8C51]/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header with stars & verified badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-500 text-sm">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  {review.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#6F8C51] bg-[#6F8C51]/10 px-2.5 py-0.5 rounded-full">
                      ✓ Verified VIP Buyer
                    </span>
                  )}
                </div>

                {/* Headline */}
                <h3 className="font-serif text-lg font-medium text-brand-dark mb-2 leading-snug">
                  "{review.headline}"
                </h3>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-brand-dark/75 font-light leading-relaxed mb-6">
                  {review.comment}
                </p>
              </div>

              {/* Footer Meta */}
              <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <strong className="text-brand-dark block">{review.author}</strong>
                  <span className="text-[11px] text-gray-400">{review.location}</span>
                </div>
                <div className="sm:text-right">
                  <span className="text-[11px] font-semibold text-[#A68A56] block">{review.productBought}</span>
                  <span className="text-[10px] text-gray-400">{review.skinType} • {review.timeframe}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
