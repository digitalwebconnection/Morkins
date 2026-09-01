import { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';

interface HairCareKitsProps {
  onAddToCart: (product: { id: number; name: string; price: number; discountPrice?: number; img: string }, openCart?: boolean) => void;
}

const HAIR_TREATMENT_KITS = [
  {
    id: 'kit-growth',
    title: 'The Maximum Hair Density Growth System',
    tagline: 'DHT-Blocker • Stem Cell Activator • 24h Root Stimulator',
    originalPrice: 95.00,
    bundlePrice: 79.00,
    savings: '$16.00',
    badge: '★ #1 Best-Seller Kit',
    img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    productIds: [13, 14, 15],
    items: [
      'Botanical Scalp & Hair Density Serum (50ml)',
      'DHT-Blocker Biotin Fortifying Shampoo (250ml)',
      'Follicle Energizing Caffeine Tonic (100ml)',
    ],
    results: '82% increase in active anagen growth phase in 90 days',
  },
  {
    id: 'kit-scalp',
    title: 'The Scalp Detox & Flake-Free Defense Kit',
    tagline: 'Antimicrobial • Root Calming • Keratin Sealer',
    originalPrice: 85.00,
    bundlePrice: 69.00,
    savings: '$16.00',
    badge: '✦ Clinical Trichology',
    img: 'https://images.unsplash.com/photo-1585751119414-ef2636f8aede?auto=format&fit=crop&w=600&q=80',
    productIds: [18, 16, 17],
    items: [
      'Tea Tree Anti-Dandruff Scalp Treatment (50ml)',
      'Rosemary & Cedarwood Follicle Oil (60ml)',
      'Keratin & Amino Fortifying Conditioner (200ml)',
    ],
    results: '100% elimination of visible scalp flaking & itch in 14 days',
  },
];

export default function HairCareKits({ onAddToCart }: HairCareKitsProps) {
  const [addedKitId, setAddedKitId] = useState<string | null>(null);

  const handleAddKit = (kit: typeof HAIR_TREATMENT_KITS[0]) => {
    onAddToCart({
      id: kit.productIds[0],
      name: kit.title,
      price: kit.bundlePrice,
      discountPrice: kit.bundlePrice,
      img: kit.img,
    }, true);

    setAddedKitId(kit.id);
    setTimeout(() => setAddedKitId(null), 1800);
  };

  return (
    <section id="haircare-kits" className="py-16 sm:py-24 bg-[#0E0E11] border-b border-zinc-800/80 text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#E5B869] uppercase tracking-[0.25em] mb-2 block">
            Complete Hair Growth Protocols
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight">
            Choose How You Grow — No Prescription Required
          </h2>
          <p className="text-zinc-400 text-sm font-light mt-3">
            Doctor-formulated hair kits calibrated for maximum follicle stimulation, root density, and clean scalp hygiene.
          </p>
        </div>

        {/* Kits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {HAIR_TREATMENT_KITS.map((kit) => (
            <div
              key={kit.id}
              className="bg-zinc-950 rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl hover:border-[#E5B869]/60 transition-all flex flex-col md:flex-row group"
            >
              {/* Left Visual Stage */}
              <div className="md:w-5/12 relative aspect-square md:aspect-auto overflow-hidden bg-zinc-900">
                <img
                  src={kit.img}
                  alt={kit.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3.5 left-3.5 bg-black/85 text-[#E5B869] border border-[#E5B869]/40 text-[9px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  {kit.badge}
                </span>
              </div>

              {/* Right Kit Specs & CTA */}
              <div className="md:w-7/12 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#E5B869] block mb-1">
                    {kit.tagline}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    {kit.title}
                  </h3>
                  
                  <p className="text-xs text-[#E5B869] font-mono mt-1">
                    ✓ {kit.results}
                  </p>

                  {/* Included Items List */}
                  <div className="mt-4 pt-3 border-t border-zinc-800 space-y-1.5">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                      Included Regimen Formulations:
                    </p>
                    {kit.items.map((item, idx) => (
                      <p key={idx} className="text-xs text-zinc-200 font-medium flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E5B869]" />
                        <span>{item}</span>
                      </p>
                    ))}
                  </div>
                </div>

                {/* Pricing & Add Button */}
                <div className="pt-4 border-t border-zinc-800 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-2xl font-bold text-[#E5B869]">
                        ${kit.bundlePrice.toFixed(2)}
                      </span>
                      <span className="text-xs text-zinc-500 font-mono line-through">
                        ${kit.originalPrice.toFixed(2)}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-[#E5B869] bg-zinc-900 px-2 py-0.5 rounded-md border border-[#E5B869]/30 uppercase">
                      Save {kit.savings}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddKit(kit)}
                    disabled={addedKitId === kit.id}
                    className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 shadow-lg ${
                      addedKitId === kit.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-linear-to-r from-[#E5B869] to-[#D97706] hover:from-[#FCD34D] hover:to-[#D97706] text-black font-extrabold hover:shadow-xl active:scale-95'
                    }`}
                  >
                    {addedKitId === kit.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>System Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5 text-black" />
                        <span>Add System</span>
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
