import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { PRODUCTS_EXTENDED, getProductUrl } from '../../products/data/products';

interface SkinCareConciergeProps {
  onAddToCart: (
    product: { id: number; name: string; price: number; discountPrice?: number; img: string },
    openCart?: boolean
  ) => void;
}

interface StepItem {
  stepNum: string;
  stepName: string;
  role: string;
  productId: number;
  note: string;
}

interface ConcernRoutine {
  id: string;
  name: string;
  icon: string;
  offerBadge: string;
  tagline: string;
  targetFocus: string;
  clinicalHighlight: string;
  amSteps: StepItem[];
  pmSteps: StepItem[];
}

const CONCERNS: ConcernRoutine[] = [
  {
    id: 'radiance',
    name: 'Glass Glow Routine',
    icon: '✨',
    offerBadge: 'SAVE 20%',
    tagline: 'Luminosity • Cellular Hydration • Translucent Bounce',
    targetFocus: 'Dullness, uneven texture & lack of inner cellular glow',
    clinicalHighlight: '98% noticed reflective glass-skin bounce in 7 days',
    amSteps: [
      { stepNum: 'Step 01', stepName: 'Purify', role: 'Cleanse', productId: 3, note: 'pH 5.5 botanical wash that lifts overnight residue without stripping' },
      { stepNum: 'Step 02', stepName: 'Illuminate', role: 'Brighten', productId: 1, note: 'Cold-pressed bioactive peptides for immediate cellular radiance' },
      { stepNum: 'Step 03', stepName: 'Plump', role: 'Hydrate', productId: 4, note: '5D multi-molecular hyaluronic acid for 24-hour bouncy dew' },
    ],
    pmSteps: [
      { stepNum: 'Step 01', stepName: 'Purify', role: 'Cleanse', productId: 3, note: 'Lifts makeup & environmental micro-pollution effortlessly' },
      { stepNum: 'Step 02', stepName: 'Renew', role: 'Smooth', productId: 8, note: '100% plant bio-retinol to boost cell turnover without peeling' },
      { stepNum: 'Step 03', stepName: 'Cocoon', role: 'Recovery', productId: 12, note: 'Antioxidant vitamin E seal locking deep moisture overnight' },
    ],
  },
  {
    id: 'barrier',
    name: 'Barrier Reconstruction',
    icon: '🛡️',
    offerBadge: 'SAVE 22%',
    tagline: 'Tri-Ceramides • Lipid Repair • 24h TEWL Lock',
    targetFocus: 'Compromised lipid barrier, micro-redness & sensitivity',
    clinicalHighlight: '+94% epidermal barrier stabilization in 14 days',
    amSteps: [
      { stepNum: 'Step 01', stepName: 'Cleanse', role: 'Soothe Wash', productId: 3, note: 'Gentle sulfate-free wash preserving natural acid mantle' },
      { stepNum: 'Step 02', stepName: 'Calm', role: 'Relief', productId: 7, note: '95% pure Madecassoside to rapidly cool reactive redness' },
      { stepNum: 'Step 03', stepName: 'Rebuild', role: 'Lipid Seal', productId: 2, note: 'Phytoceramides 1:3:6 matrix to heal micro-fissures' },
    ],
    pmSteps: [
      { stepNum: 'Step 01', stepName: 'Cleanse', role: 'Gentle Wash', productId: 3, note: 'Calming botanical wash for reactive dermal surfaces' },
      { stepNum: 'Step 02', stepName: 'Infuse', role: 'Deep Moisture', productId: 10, note: 'Bio-identical lipid hydration to quench deep dryness' },
      { stepNum: 'Step 03', stepName: 'Shield', role: 'Repair', productId: 2, note: 'Intensive overnight lipid reconstruction & protection' },
    ],
  },
  {
    id: 'antiaging',
    name: 'Cellular Age Defiance',
    icon: '🌿',
    offerBadge: 'SAVE 25%',
    tagline: 'Multi-Peptides • Collagen Synthesis • Firming Matrix',
    targetFocus: 'Fine lines, loss of dermal elasticity & collagen depletion',
    clinicalHighlight: '89% demonstrated firmer facial contours in 28 days',
    amSteps: [
      { stepNum: 'Step 01', stepName: 'Prepare', role: 'Cleanse', productId: 3, note: 'Botanical enzyme wash to prepare skin for peptide absorption' },
      { stepNum: 'Step 02', stepName: 'Stimulate', role: 'Firm', productId: 11, note: 'High-potency multi-peptide fluid for boosted elasticity' },
      { stepNum: 'Step 03', stepName: 'Protect', role: 'Barrier Cream', productId: 2, note: 'Antioxidant lipid defense shielding against external aging' },
    ],
    pmSteps: [
      { stepNum: 'Step 01', stepName: 'Purify', role: 'Cleanse', productId: 3, note: 'Deep cleansing to prepare dermal matrix for night treatment' },
      { stepNum: 'Step 02', stepName: 'Restore', role: 'Retinol', productId: 6, note: 'Pure encapsulated retinol for intensive cellular turnover' },
      { stepNum: 'Step 03', stepName: 'Replenish', role: 'Mask', productId: 12, note: 'Nutrient-rich moisture cocoon to wake up revitalized' },
    ],
  },
  {
    id: 'clarifying',
    name: 'Pore & Texture Clarity',
    icon: '💧',
    offerBadge: 'SAVE 18%',
    tagline: 'BHA Clarifying • Sebum Control • Micro-Exfoliation',
    targetFocus: 'Enlarged pores, excess oil & textured dermal buildup',
    clinicalHighlight: '-62% visible pore congestion within 10 days of use',
    amSteps: [
      { stepNum: 'Step 01', stepName: 'Clarify', role: 'Purify Wash', productId: 3, note: 'Balances sebum without stripping epidermal moisture' },
      { stepNum: 'Step 02', stepName: 'Refine', role: 'Pore Serum', productId: 5, note: '10% Niacinamide + Zinc PCA to tighten pores & even tone' },
      { stepNum: 'Step 03', stepName: 'Balance', role: 'Light Hydrate', productId: 7, note: 'Weightless calming gel providing soothing moisture' },
    ],
    pmSteps: [
      { stepNum: 'Step 01', stepName: 'Cleanse', role: 'Deep Wash', productId: 3, note: 'Dissolves impurities without tight or dry afterfeel' },
      { stepNum: 'Step 02', stepName: 'Exfoliate', role: '2% BHA Tonic', productId: 9, note: 'Salicylic clarifying solution to dissolve deep pore debris' },
      { stepNum: 'Step 03', stepName: 'Lock', role: 'Hydro-Gel', productId: 10, note: 'Non-comedogenic barrier hydration for smooth clarity' },
    ],
  },
];

export default function SkinCareConcierge({ onAddToCart }: SkinCareConciergeProps) {
  const navigate = useNavigate();
  const [selectedConcernId] = useState<string>('radiance');
  const [routineMode] = useState<'am' | 'pm'>('am');
  const [addedProductIds, setAddedProductIds] = useState<Record<number, boolean>>({});


  const activeConcern = CONCERNS.find((c) => c.id === selectedConcernId) || CONCERNS[0];
  const activeSteps = routineMode === 'am' ? activeConcern.amSteps : activeConcern.pmSteps;

  // Single step add to cart
  const handleAddProduct = (prodId: number) => {
    const prod = PRODUCTS_EXTENDED.find((p) => p.id === prodId);
    if (!prod) return;

    onAddToCart(
      {
        id: prod.id,
        name: prod.name,
        price: prod.discountPrice || prod.price,
        discountPrice: prod.discountPrice,
        img: prod.img,
      },
      true
    );

    setAddedProductIds((prev) => ({ ...prev, [prodId]: true }));
    setTimeout(() => {
      setAddedProductIds((prev) => ({ ...prev, [prodId]: false }));
    }, 2000);
  };

  // Add all 3 steps at once

  // Price calculations



  return (
    <section id="skincare-concierge" className="py-8 sm:py-12 lg:py-16 bg-[#FAF8F5] border-b border-[#EAE3D2] relative overflow-hidden">
      {/* ── Keyframe Animations for Botanical Background Atmosphere ── */}
      <style>{`
        @keyframes floatOrbSlow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-16px) scale(1.05); }
        }
        @keyframes floatOrbReverseSlow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(14px) scale(0.96); }
        }
        @keyframes rippleRingSlow {
          0%, 100% { transform: scale(0.92); opacity: 0.25; }
          50% { transform: scale(1.08); opacity: 0.6; }
        }
        @keyframes sparkleTwinkleSubtle {
          0%, 100% { opacity: 0.15; transform: scale(0.8); }
          50% { opacity: 0.85; transform: scale(1.2); }
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Header ── */}
        <div className="text-center max-w-5xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-[#8C6221] text-[11px] font-bold uppercase tracking-[0.18em] shadow-2xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D95B00]" />
            <span>Botanical Routine Concierge</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2C1810] font-normal leading-tight">
            Target Your Skin Concern
          </h2>

          <p className="text-[#5C4F46] text-sm sm:text-base mt-2.5 max-w-5xl mx-auto font-light leading-relaxed">
            Select your skin goal to discover the optimal 3-step morning & evening ritual formulated to unlock clinical luminosity.
          </p>
        </div>
        {/* ── 3-Step Sequence Product Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-8 relative">

          {/* Desktop Step Connector Bar */}
          <div className="hidden md:block absolute top-12 left-[18%] right-[18%] h-0.5 bg-[#DDD3C1] pointer-events-none z-0" />

          {activeSteps.map((stepItem, idx) => {
            const product = PRODUCTS_EXTENDED.find((p) => p.id === stepItem.productId);
            if (!product) return null;

            const activePrice = product.discountPrice || product.price;
            const isAdded = !!addedProductIds[product.id];
            
            return (
              <div
                key={`${selectedConcernId}-${routineMode}-${stepItem.productId}-${idx}`}
                onClick={() => navigate(getProductUrl(product))}
                className="group relative flex flex-col h-full bg-white rounded-md overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 border border-brand-dark/5 cursor-pointer"
              >
                {/* Product Image & Thumbnail Stage */}
                <div className="relative aspect-square w-full overflow-hidden flex items-center justify-center transition-all duration-500 bg-[#F1EDE9]">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="h-full w-full object-cover object-center transition-all duration-700 ease-out transform group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                {/* Content Area */}
                <div className="flex flex-col flex-1 p-6">
                  <p className="text-[10px] font-bold text-[#A68A56] uppercase tracking-widest mb-1.5">
                    {product.category}
                  </p>

                  <h3 className="text-lg md:text-xl font-serif font-medium text-[#0B1A28] mb-1.5 line-clamp-1 group-hover:text-[#A68A56] transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-[11px] text-gray-500 mb-6 line-clamp-1 font-light tracking-wide">
                    {stepItem.note || product.description}
                  </p>

                  <div className="flex items-end justify-between mt-auto pt-2">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-bold text-[#A68A56] leading-none">
                        ${activePrice.toFixed(2)}
                      </span>
                      {product.discountPrice && (
                        <span className="text-[11px] text-stone-400 line-through leading-none font-mono">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddProduct(product.id);
                      }}
                      className="shrink-0 w-16 h-8 flex items-center justify-center text-[9px] font-bold uppercase tracking-widest rounded-none transition-colors bg-[#0B1A28] text-white hover:bg-black cursor-pointer"
                    >
                      {isAdded ? 'ADDED' : 'ADD'}
                    </button>
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
