import { useState } from 'react';
import { ShoppingBag, Check, Sparkles } from 'lucide-react';

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
    }, false);

    setAddedKitId(kit.id);
    setTimeout(() => setAddedKitId(null), 1800);
  };

  return (
    <section id="haircare-kits" className="py-8 sm:py-14 select-none relative overflow-hidden bg-[#FDFCFA] border-y border-[#EDE4D8]/60">

      {/* Subtle ambient light glow */}
      <div
        className="absolute top-1/2 left-1/3 -translate-y-1/2 w-150 h-87.5 pointer-events-none opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(ellipse, rgba(196,154,108,0.18) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 relative z-10">

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF5EF] border border-[#EDE4D8] mb-1 shadow-2xs">
            <Sparkles className="w-3 h-3 text-[#A67C52] animate-pulse" />
            <span className="text-[9px] font-bold text-[#A67C52] uppercase tracking-[0.25em] font-mono">
              Complete Hair Growth Protocols
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1210] font-semibold leading-tight">
            Choose How You{' '}
            <span
              className=""
              style={{
                background: 'linear-gradient(135deg, #8B5A2B 0%, #C49A6C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Grow
            </span>
          </h2>
          <p className="text-[#000000] text-sm font-light leading-relaxed max-w-4xl mx-auto">
            Doctor-formulated hair kits calibrated for maximum follicle stimulation, root density, and clean scalp hygiene. No prescription required.
          </p>
        </div>

        {/* Kits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {HAIR_TREATMENT_KITS.map((kit) => (
            <div
              key={kit.id}
              className="group rounded-xl border border-[#EDE4D8] overflow-hidden transition-all duration-500 hover:border-[#C49A6C]/70 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(44,24,16,0.08)] flex flex-col md:flex-row bg-white relative"
              style={{ boxShadow: '0 8px 30px rgba(44,24,16,0.24)' }}
            >
              {/* Visual Stage */}
              <div className="md:w-5/12 relative aspect-square md:aspect-auto overflow-hidden bg-[#FAF7F2]">
                <img
                  src={kit.img}
                  alt={kit.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out "
                />

                {/* Badge */}
                <span
                  className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 text-white"
                  style={{
                    background: 'linear-gradient(135deg, #2C1810 0%, #3D2516 100%)',
                    boxShadow: '0 4px 14px rgba(44,24,16,0.25)',
                  }}
                >
                  <Sparkles className="w-3 h-3 text-[#C49A6C]" />
                  {kit.badge}
                </span>
              </div>

              {/* Kit Details */}
              <div className="md:w-7/12 p-6 sm:p-8 flex flex-col justify-between space-y-5">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#A67C52] block mb-2 font-mono">
                    {kit.tagline}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1210] group-hover:text-[#7A4E2D] transition-colors">
                    {kit.title}
                  </h3>

                  <p className="text-xs text-[#16A34A] font-mono mt-2 font-semibold flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    {kit.results}
                  </p>

                  {/* Items */}
                  <div className="mt-5 pt-4 border-t border-[#F0E8DF] space-y-2">
                    <p className="text-[9px] font-bold text-[#9B8F84] uppercase tracking-wider">
                      Included Regimen Formulations:
                    </p>
                    {kit.items.map((item, idx) => (
                      <p key={idx} className="text-xs text-[#5C4F46] font-light flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#A67C52] shrink-0" />
                        <span>{item}</span>
                      </p>
                    ))}
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="pt-5 border-t border-[#F0E8DF] flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-baseline gap-2.5">
                      <span
                        className="font-serif text-2xl font-bold"
                        style={{
                          background: 'linear-gradient(135deg, #8B5A2B 0%, #A67C52 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        ${kit.bundlePrice.toFixed(2)}
                      </span>
                      <span className="text-xs text-[#C4B8AC] font-mono line-through">
                        ${kit.originalPrice.toFixed(2)}
                      </span>
                    </div>
                    <span className="text-[9px] font-bold uppercase font-mono px-2.5 py-0.5 rounded-md mt-1 inline-block text-[#16A34A] bg-[#F0FDF4] border border-[#BBF7D0]">
                      Save {kit.savings}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddKit(kit)}
                    disabled={addedKitId === kit.id}
                    className={`px-3 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 text-white ${addedKitId === kit.id
                        ? 'bg-[#16A34A] shadow-[0_4px_15px_rgba(22,163,74,0.25)]'
                        : ' hover:shadow-[0_6px_22px_rgba(44,24,16,0.2)] active:scale-95'
                      }`}
                    style={addedKitId !== kit.id ? {
                      background: 'linear-gradient(135deg, #2C1810 0%, #3D2516 100%)',
                    } : undefined}
                  >
                    {addedKitId === kit.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>System Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5 text-[#C49A6C]" />
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
