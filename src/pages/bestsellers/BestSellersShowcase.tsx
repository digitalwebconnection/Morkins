import { useState } from 'react';
import { Link } from 'react-router-dom';
import p1 from '../../assets/product/p1.jpg';
import p2 from '../../assets/product/p2.jpg';
import p4 from '../../assets/product/p4.jpg';

interface BestSellersShowcaseProps {
  onAddToCart: (product: { id: number; name: string; price: number; img: string }, openCart?: boolean) => void;
  onOpenQuickView?: (product: any) => void;
}

interface TopProduct {
  id: number;
  rank: number;
  rankTitle: string;
  rankBadge: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  img: string;
  tagline: string;
  textureNote: string;
  aromaNote: string;
  description: string;
  hotspots: { x: string; y: string; title: string; desc: string }[];
  benefits: string[];
  recentPurchases: number;
}

const TOP_PRODUCTS: TopProduct[] = [
  {
    id: 1,
    rank: 1,
    rankTitle: '🏆 #1 Global Best Seller',
    rankBadge: 'The Ultimate Glow Multiplier',
    name: 'Botanical Radiance Glow Serum',
    category: 'Targeted Bio-Active Serum',
    price: 28.00,
    originalPrice: 34.00,
    rating: 4.9,
    reviews: 148,
    img: p1,
    tagline: 'The #1 Best Selling Multi-Target Skin Perfector',
    textureNote: 'Weightless Silk Nectar • Instant Glass Skin Finish',
    aromaNote: 'Cold-Pressed Wild Damask Rose & Golden Bergamot',
    description: 'Engineered with cold-pressed biological botanicals and stabilized Vitamin C, this ultra-lightweight elixir locks in 72-hour dermal hydration while visibly fading hyperpigmentation and boosting natural glow in 14 days.',
    hotspots: [
      { x: '35%', y: '30%', title: '15% Bio-Active Peptides', desc: 'Stimulates collagen synthesis and cellular turnover.' },
      { x: '68%', y: '50%', title: '72h Micro-Hydration', desc: 'Triple-molecular lipid matrix locks deep moisture.' },
      { x: '45%', y: '75%', title: 'UV-Shielded Apothecary Glass', desc: 'Preserves 99.4% bioactive enzyme potency indefinitely.' }
    ],
    benefits: [
      'Visible luminosity & glass skin finish in 14 days',
      'Protects epidermal barrier against environmental oxidative stress',
      'Non-comedogenic & biocompatible with sensitive skin',
      'Clinical trial: 96% noticed refined pore texture'
    ],
    recentPurchases: 38
  },
  {
    id: 2,
    rank: 2,
    rankTitle: '🥈 #2 Most Loved Barrier Hero',
    rankBadge: 'Epidermal Lipid Fortifier',
    name: 'Bio-Active Barrier Repair Cream',
    category: 'Intensive Barrier Restorative',
    price: 26.00,
    originalPrice: 32.00,
    rating: 4.8,
    reviews: 112,
    img: p2,
    tagline: 'Deep Cellular Rescue for Stressed & Dehydrated Skin',
    textureNote: 'Whipped Cashmere Emulsion • Non-Greasy Shield',
    aromaNote: 'Calming Blue Chamomile & French Lavender Infusion',
    description: 'A nutrient-dense multi-ceramide restorative cream that rebuilds compromised skin barriers, soothes redness, and prevents trans-epidermal moisture loss within single application.',
    hotspots: [
      { x: '40%', y: '32%', title: '5 Ceramides Complex', desc: 'Identical to skin natural lipid architecture.' },
      { x: '65%', y: '55%', title: 'Centella Asiatica', desc: 'Instant calming relief for redness and irritation.' },
      { x: '42%', y: '72%', title: 'Cold-Pressed Squalane', desc: 'Provides weightless biocompatible nourishment.' }
    ],
    benefits: [
      'Rebuilds damaged barrier within 48 hours of use',
      'Continuous 24-hour moisture lock and protection',
      'Soothes reactivity, tightness, and redness',
      'Formulated for eczema and rosacea-prone skin'
    ],
    recentPurchases: 29
  },
  {
    id: 4,
    rank: 3,
    rankTitle: '🥉 #3 Plumping & Dew Icon',
    rankBadge: 'Multi-Depth Hydration',
    name: 'Hyaluronic Dew Plumping Elixir',
    category: 'High-Concentrate Hydrator',
    price: 30.00,
    originalPrice: 36.00,
    rating: 4.9,
    reviews: 180,
    img: p4,
    tagline: 'Transdermal 4D Hyaluronic Acid Quench',
    textureNote: 'Cooling Water-Gel Dew • Absorbs in Seconds',
    aromaNote: 'Fresh Cucumber Water & White Jasmine Blossoms',
    description: 'Four distinct molecular weights of pure hyaluronic acid penetrate every layer of the epidermis, creating an instant plumping effect, bouncy cushion softness, and smoothing fine dehydration lines.',
    hotspots: [
      { x: '38%', y: '28%', title: '4D Hyaluronic Complex', desc: 'Penetrates down to deep dermal layers.' },
      { x: '62%', y: '52%', title: 'Vitamin B5 Panthenol', desc: 'Soothes and accelerates skin healing.' },
      { x: '45%', y: '78%', title: 'Botanical Polyglutamic Acid', desc: 'Holds 5x more moisture than standard HA.' }
    ],
    benefits: [
      'Instant 140% moisture surge upon application',
      'Plumps fine dehydration lines and restores bounce',
      'Creates a flawless hydrated base under makeup',
      'Oil-free, non-pore-clogging biocompatible formula'
    ],
    recentPurchases: 22
  }
];

export default function BestSellersShowcase({ onAddToCart, onOpenQuickView }: BestSellersShowcaseProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [addFeedback, setAddFeedback] = useState(false);

  const product = TOP_PRODUCTS[selectedIndex];

  const handleAddToCart = () => {
    onAddToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img
    }, true);
    setAddFeedback(true);
    setTimeout(() => setAddFeedback(false), 1200);
  };

  return (
    <section id="top-icons" className="py-16 sm:py-20 bg-[#FCFBF8] border-b border-[#A68A56]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Podium Navigation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#A68A56] uppercase tracking-[0.25em] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#A68A56]" />
              The Crown Jewels
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-brand-dark tracking-tight">
              The Podium: <span className="italic font-light text-[#6F8C51]">Top 3 Cult Favorites</span>
            </h2>
          </div>

          {/* Podium Switcher Buttons */}
          <div className="flex items-center p-1.5 bg-[#F4F3EE] rounded-2xl border border-[#A68A56]/20 shadow-2xs">
            {TOP_PRODUCTS.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedIndex(idx);
                  setActiveHotspot(null);
                }}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                  selectedIndex === idx
                    ? 'bg-[#1C331B] text-[#AFD971] shadow-md scale-102'
                    : 'text-brand-dark/70 hover:text-brand-dark hover:bg-white/60'
                }`}
              >
                <span>{idx === 0 ? '👑 #1' : idx === 1 ? '🥈 #2' : '🥉 #3'}</span>
                <span className="hidden sm:inline">{p.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Hero Showcase Card */}
        <div className="bg-[#1C331B] text-white rounded-3xl overflow-hidden shadow-2xl relative border border-[#A68A56]/30">
          {/* Decorative ambient glowing orbs */}
          <div className="absolute top-0 right-0 w-125 h-125 bg-[#6F8C51]/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#A68A56]/25 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-10 lg:p-14 relative z-10">
            
            {/* Left: Product Stage with Interactive Hotspots */}
            <div className="lg:col-span-5 relative flex flex-col items-center">
              <div className="relative group w-full max-w-sm aspect-square rounded-2xl overflow-hidden bg-linear-to-b from-white/12 to-white/5 p-6 flex items-center justify-center border border-white/20 backdrop-blur-md shadow-2xl">
                
                {/* Ranking Ribbon */}
                <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5">
                  <span className="bg-[#A68A56] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg border border-white/20">
                    {product.rankTitle}
                  </span>
                  <span className="bg-black/40 backdrop-blur-md text-[#AFD971] text-[10px] font-semibold tracking-wider px-2.5 py-0.5 rounded-full">
                    {product.rankBadge}
                  </span>
                </div>

                {/* Rating Badge */}
                <div className="absolute bottom-4 right-4 z-20 bg-white/95 backdrop-blur-md text-brand-dark px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5 text-xs font-bold">
                  <span className="text-amber-500 text-sm">★</span>
                  <span>{product.rating}</span>
                  <span className="text-gray-400 font-normal">({product.reviews})</span>
                </div>

                {/* Main Product Image */}
                <img
                  src={product.img}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-106"
                />

                {/* Interactive Formula Hotspots */}
                {product.hotspots.map((spot, idx) => (
                  <div
                    key={idx}
                    style={{ top: spot.y, left: spot.x }}
                    className="absolute z-30"
                  >
                    <button
                      onClick={() => setActiveHotspot(activeHotspot === idx ? null : idx)}
                      onMouseEnter={() => setActiveHotspot(idx)}
                      className="relative w-7 h-7 rounded-full bg-[#AFD971] text-[#1C331B] font-bold text-xs flex items-center justify-center shadow-lg cursor-pointer transition-transform hover:scale-115 animate-pulse"
                      title={spot.title}
                    >
                      <span className="relative z-10 font-bold">+</span>
                      <span className="absolute inset-0 rounded-full bg-[#AFD971] opacity-75 animate-ping" />
                    </button>

                    {/* Tooltip Card */}
                    {activeHotspot === idx && (
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-56 p-3 rounded-xl bg-black/90 backdrop-blur-md text-white text-xs shadow-2xl border border-white/20 z-40 pointer-events-none">
                        <span className="font-bold text-[#AFD971] block mb-1">{spot.title}</span>
                        <p className="text-[11px] text-white/80 font-light leading-snug">{spot.desc}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Hotspot Hint */}
              <div className="mt-3 text-[11px] text-white/60 font-light flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#AFD971] animate-ping" />
                <span>Hover or tap the <strong>+</strong> markers to inspect active compounds</span>
              </div>
            </div>

            {/* Right: Info & Clinical Profile */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              
              {/* Category & Live Urgency */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <span className="text-[#AFD971] text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#AFD971]" />
                  {product.category}
                </span>

                <span className="inline-flex items-center gap-1.5 bg-[#A68A56]/20 border border-[#A68A56]/40 px-3 py-1 rounded-full text-[11px] text-[#FCFBF8] font-medium">
                  <span>🔥</span>
                  <span><strong>{product.recentPurchases} bottles</strong> claimed today</span>
                </span>
              </div>

              {/* Product Title */}
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-white mb-3">
                {product.name}
              </h3>

              {/* Tagline */}
              <p className="text-[#AFD971] text-sm sm:text-base font-medium mb-4 italic">
                "{product.tagline}"
              </p>

              {/* Description */}
              <p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Texture & Scent Profile Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3.5 rounded-xl bg-white/5 border border-white/10 mb-6 text-xs text-white/85">
                <div className="flex items-center gap-2">
                  <span className="text-[#AFD971]">💧</span>
                  <span><strong className="text-white font-medium">Texture:</strong> {product.textureNote}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#A68A56]">🌿</span>
                  <span><strong className="text-white font-medium">Aroma:</strong> {product.aromaNote}</span>
                </div>
              </div>

              {/* Clinical Bullet Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {product.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-white/90">
                    <svg className="w-4 h-4 text-[#AFD971] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Pricing & CTA Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-white/15">
                {/* Price Display */}
                <div className="flex items-baseline gap-2.5">
                  <span className="font-mono text-3xl font-bold text-[#AFD971]">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="font-mono text-lg text-white/40 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-[11px] bg-[#AFD971]/25 text-[#AFD971] font-bold px-2.5 py-0.5 rounded-full border border-[#AFD971]/40">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={addFeedback}
                    className={`px-6 sm:px-8 py-3.5 font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-lg cursor-pointer flex items-center gap-2 ${
                      addFeedback
                        ? 'bg-emerald-500 text-white scale-98'
                        : 'bg-[#AFD971] hover:bg-[#9ec860] text-[#1C331B] hover:shadow-2xl hover:scale-102 active:scale-98'
                    }`}
                  >
                    {addFeedback ? (
                      <>
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Added to Bag!</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="9" cy="21" r="1" />
                          <circle cx="20" cy="21" r="1" />
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        <span>Claim #1 Best Seller</span>
                      </>
                    )}
                  </button>

                  {onOpenQuickView && (
                    <button
                      onClick={() => onOpenQuickView(product)}
                      className="px-4 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                      title="Quick View"
                    >
                      Quick View
                    </button>
                  )}

                  <Link
                    to={`/products/${product.id}`}
                    className="p-3.5 border border-white/20 hover:border-white text-white/80 hover:text-white rounded-xl transition-colors"
                    title="View Full Product Details"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
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
