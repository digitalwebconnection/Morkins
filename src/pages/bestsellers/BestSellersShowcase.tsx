import { Link } from 'react-router-dom';
import p1 from '../../assets/product/p1.jpg';

interface BestSellersShowcaseProps {
  onAddToCart: (product: { id: number; name: string; price: number; img: string }, openCart?: boolean) => void;
}

export default function BestSellersShowcase({ onAddToCart }: BestSellersShowcaseProps) {
  const topProduct = {
    id: 1,
    name: 'Botanical Radiance Glow Serum',
    price: 28.00,
    originalPrice: 34.00,
    rating: 4.9,
    reviews: 148,
    img: p1,
    tagline: 'The #1 Best Selling Glow Multiplier',
    description: 'Formulated with cold-pressed biological botanical peptides and stabilized Vitamin C, this ultra-lightweight elixir locks in 72-hour dermal hydration while visibly refining tone in 14 days.',
    benefits: [
      'Visible luminosity & glass skin finish in 14 days',
      'Protects epidermal barrier against environmental stress',
      'Non-comedogenic & biocompatible with sensitive skin',
      'Clinical trial: 96% noticed refined pore texture'
    ]
  };

  return (
    <section className="py-16 bg-[#FCFBF8] border-b border-brand-dark/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1C331B] text-white rounded-3xl overflow-hidden shadow-2xl relative">
          {/* Decorative ambient background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#6F8C51]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#A68A56]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-8 sm:p-12 lg:p-16 relative z-10">
            
            {/* Left: Product Imagery & Floating Badges */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative group w-full max-w-md aspect-square rounded-2xl overflow-hidden bg-white/10 p-6 flex items-center justify-center border border-white/15 backdrop-blur-xs">
                <img
                  src={topProduct.img}
                  alt={topProduct.name}
                  className="max-h-full max-w-full object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Ranking Tag */}
                <span className="absolute top-4 left-4 bg-[#A68A56] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                  ★ #1 Best Seller
                </span>

                {/* Rating Tag */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-brand-dark px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5 text-xs font-bold font-sans">
                  <span className="text-yellow-500">★</span>
                  <span>{topProduct.rating}</span>
                  <span className="text-gray-400 font-normal">({topProduct.reviews})</span>
                </div>
              </div>
            </div>

            {/* Right: Info & CTA */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 text-[#AFD971] text-xs font-bold uppercase tracking-widest mb-3">
                <span className="w-2 h-2 rounded-full bg-[#AFD971] animate-pulse" />
                {topProduct.tagline}
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-white mb-4">
                {topProduct.name}
              </h2>

              <p className="text-white/80 text-sm sm:text-base font-light leading-relaxed mb-6">
                {topProduct.description}
              </p>

              {/* Bullet Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {topProduct.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-white/90">
                    <svg className="w-4 h-4 text-[#AFD971] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Pricing & CTA */}
              <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/10">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-3xl font-bold text-[#AFD971]">
                    ${topProduct.price.toFixed(2)}
                  </span>
                  <span className="font-mono text-lg text-white/40 line-through">
                    ${topProduct.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-xs bg-[#AFD971]/20 text-[#AFD971] font-semibold px-2 py-0.5 rounded">
                    Save ${(topProduct.originalPrice - topProduct.price).toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onAddToCart({
                      id: topProduct.id,
                      name: topProduct.name,
                      price: topProduct.price,
                      img: topProduct.img
                    }, true)}
                    className="px-6 py-3 bg-[#AFD971] hover:bg-[#9ec860] text-[#1C331B] font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md hover:shadow-xl active:scale-98 cursor-pointer flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                    <span>Add to Bag</span>
                  </button>

                  <Link
                    to={`/products/${topProduct.id}`}
                    className="px-5 py-3 border border-white/30 hover:border-white text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
