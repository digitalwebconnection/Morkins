import { useState } from 'react';
import { ShoppingBag, Check, Gift, ShieldCheck } from 'lucide-react';
import { PRODUCTS_EXTENDED } from '../../products/data/products';

interface SkinCareKitsProps {
  onAddToCart: (product: { id: number; name: string; price: number; discountPrice?: number; img: string }, openCart?: boolean) => void;
}

interface KitItem {
  id: string;
  title: string;
  tagline: string;
  originalPrice: number;
  bundlePrice: number;
  savings: string;
  badge: string;
  img: string;
  productIds: number[];
  steps: { stepNum: string; stepName: string; name: string }[];
  clinicalResult: string;
  bonusGift: string;
}

const SKIN_TREATMENT_KITS: KitItem[] = [
  {
    id: 'kit-radiance',
    title: 'The Glass Skin Radiance Ritual',
    tagline: 'Luminosity • Dermal Bounce • Multi-Depth Hydration',
    originalPrice: 94.00,
    bundlePrice: 79.00,
    savings: '$15.00',
    badge: '★ Best-Selling Kit',
    img: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=800&q=80',
    productIds: [1, 3, 7],
    steps: [
      { stepNum: 'Step 01', stepName: 'Purify', name: 'Gentle Clarifying Foaming Wash (150ml)' },
      { stepNum: 'Step 02', stepName: 'Illuminate', name: 'Botanical Radiance Glow Serum (30ml)' },
      { stepNum: 'Step 03', stepName: 'Dewy Seal', name: 'Centella Soothing Calming Gel (50ml)' },
    ],
    clinicalResult: '98% noticed immediate dewy glass-skin bounce on Day 1',
    bonusGift: 'Includes Luxury Organic Cotton Travel Pouch',
  },
  {
    id: 'kit-barrier',
    title: 'The Deep Barrier Recovery System',
    tagline: 'Tri-Ceramides • Redness Relief • 24h TEWL Lock',
    originalPrice: 105.00,
    bundlePrice: 88.00,
    savings: '$17.00',
    badge: '✦ Clinical Grade',
    img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    productIds: [2, 10, 12],
    steps: [
      { stepNum: 'Step 01', stepName: 'Hydrate', name: 'Ceramide Deep Moisture Hydro-Gel (50ml)' },
      { stepNum: 'Step 02', stepName: 'Rebuild', name: 'Bio-Active Barrier Repair Cream (50ml)' },
      { stepNum: 'Step 03', stepName: 'Cocoon', name: 'Vitamin E Overnight Recovery Mask (60ml)' },
    ],
    clinicalResult: 'Stabilizes epidermal lipid capacitance index by +92% in 7 days',
    bonusGift: 'Includes Clinical Ceramic Applicator Spatula',
  },
  {
    id: 'kit-longevity',
    title: 'The Peptide & Bio-Retinol Master Kit',
    tagline: 'Collagen Synthesis • Contour Firming • Zero Irritation',
    originalPrice: 120.00,
    bundlePrice: 99.00,
    savings: '$21.00',
    badge: '✨ Longevity Master Kit',
    img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    productIds: [6, 8, 11],
    steps: [
      { stepNum: 'Step 01', stepName: 'Bio-Retinol', name: 'Bakuchiol Natural Firming Elixir (30ml)' },
      { stepNum: 'Step 02', stepName: 'Peptides', name: 'Peptide Collagen Boost Fluid (30ml)' },
      { stepNum: 'Step 03', stepName: 'Renew', name: 'Retinol Cellular Renewal Treatment (30ml)' },
    ],
    clinicalResult: '+82% visible firmness and -34% fine line depth in 28 days',
    bonusGift: 'Includes Rose Quartz Dermal Facial Sculpting Roller',
  },
];

export default function SkinCareKits({ onAddToCart }: SkinCareKitsProps) {
  const [addedKitId, setAddedKitId] = useState<string | null>(null);

  const handleAddKit = (kit: KitItem) => {
    // Add primary kit item or bundle items
    kit.productIds.forEach((pid, idx) => {
      const prod = PRODUCTS_EXTENDED.find((p) => p.id === pid);
      if (prod) {
        onAddToCart({
          id: prod.id,
          name: idx === 0 ? `${kit.title} - ${prod.name}` : prod.name,
          price: prod.discountPrice || prod.price,
          discountPrice: prod.discountPrice,
          img: prod.img,
        }, idx === 0);
      }
    });

    setAddedKitId(kit.id);
    setTimeout(() => setAddedKitId(null), 2000);
  };

  return (
    <section id="skincare-kits" className="py-16 sm:py-24 bg-white border-b border-[#EAE3D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#8C6221] uppercase tracking-[0.25em] mb-2 block">
            Curated Diagnostic Regimens
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#123624] font-normal leading-tight">
            Complete Botanical Protocols — Calibrated For Synergy
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-light mt-3">
            Save up to $21 when you bundle clinically matched formulations engineered to work sequentially for transformative cellular results.
          </p>
        </div>

        {/* 3-Column Kit Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SKIN_TREATMENT_KITS.map((kit) => (
            <div
              key={kit.id}
              className="bg-[#FAF8F4] rounded-3xl border border-[#DDD3C1] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between group"
            >
              <div>
                {/* Visual Stage */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100">
                  <img
                    src={kit.img}
                    alt={kit.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                  {/* Top Badge */}
                  <span className="absolute top-4 left-4 bg-[#12602F] text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    {kit.badge}
                  </span>

                  {/* Savings Pill */}
                  <span className="absolute bottom-4 left-4 bg-[#AFD971] text-[#123624] text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-md shadow-md">
                    Save {kit.savings}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-7 space-y-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C6221] block mb-1">
                      {kit.tagline}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C2E1A] group-hover:text-[#12602F] transition-colors leading-snug">
                      {kit.title}
                    </h3>
                  </div>

                  {/* Clinical Result Quote */}
                  <div className="p-3 bg-white rounded-xl border border-stone-200/80 text-xs text-[#123624] font-medium flex items-start gap-2 shadow-2xs">
                    <ShieldCheck className="w-4 h-4 text-[#12602F] shrink-0 mt-0.5" />
                    <p className="italic">"{kit.clinicalResult}"</p>
                  </div>

                  {/* Routine Steps Breakdown */}
                  <div className="space-y-2 pt-2 border-t border-[#EAE3D2]">
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                      Included Protocol Steps:
                    </p>
                    {kit.steps.map((st, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs bg-white/70 p-2 rounded-lg border border-[#E8DFC8]">
                        <span className="text-[10px] font-bold text-[#12602F] uppercase font-mono">{st.stepNum}: {st.stepName}</span>
                        <span className="text-[11px] font-medium text-stone-700 truncate max-w-[65%] text-right">{st.name}</span>
                      </div>
                    ))}
                  </div>

                  {/* Free Gift Badge */}
                  <div className="flex items-center gap-2 text-[11px] font-bold text-[#8C6221] bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                    <Gift className="w-4 h-4 text-[#8C6221] shrink-0" />
                    <span>{kit.bonusGift}</span>
                  </div>
                </div>
              </div>

              {/* Pricing & Add Kit CTA */}
              <div className="p-6 sm:p-7 pt-0 border-t border-[#EAE3D2]/50">
                <div className="flex items-center justify-between gap-4 pt-4">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-2xl font-bold text-[#12602F]">
                        ${kit.bundlePrice.toFixed(2)}
                      </span>
                      <span className="text-xs text-stone-400 font-mono line-through">
                        ${kit.originalPrice.toFixed(2)}
                      </span>
                    </div>
                    <span className="text-[10px] text-stone-500 font-mono">3 Full Size Formulas</span>
                  </div>

                  <button
                    onClick={() => handleAddKit(kit)}
                    disabled={addedKitId === kit.id}
                    className={`px-5 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 shadow-xs ${
                      addedKitId === kit.id
                        ? 'bg-emerald-700 text-white'
                        : 'bg-[#12602F] hover:bg-[#1B6A45] text-white hover:shadow-md active:scale-95'
                    }`}
                  >
                    {addedKitId === kit.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Kit Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5 text-[#AFD971]" />
                        <span>Add Kit</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
