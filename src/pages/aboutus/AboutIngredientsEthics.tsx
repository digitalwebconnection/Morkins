import React from 'react';
import { 
  Sparkles, 
  Leaf, 
  ShieldCheck, 
  CheckCircle2, 
  Droplets, 
  Heart, 
  Recycle, 
  Award,
  Globe2,
  TreePine,
  Check,
  PackageCheck
} from 'lucide-react';

export default function AboutIngredientsEthics() {
  const INGREDIENTS = [
    {
      name: 'French Bakuchiol 99% Purity',
      origin: 'Provence, France',
      type: 'Cellular Renewal',
      desc: 'Clinically verified, 100% natural botanical alternative to synthetic Retinol. Boosts collagen type I synthesis and cellular turnover without photosensitivity or irritation.',
      benefits: ['Fine Line Smoothing', 'Cellular Turnover', 'Zero Redness / Safe for Sensitive Skin']
    },
    {
      name: 'Sugarcane Bio-Squalane',
      origin: 'São Paulo, Brazil (Sustainable Crop)',
      type: 'Lipid Biomimicry',
      desc: 'Ultra-lightweight, 100% plant-derived hydrocarbon that exactly replicates human skin sebum to instantly seal transepidermal water loss (TEWL).',
      benefits: ['Weightless Barrier Repair', 'Instant Dewy Radiance', 'Non-Comedogenic Hydration']
    },
    {
      name: 'Bulgarian Damask Rosewater',
      origin: 'Rose Valley, Bulgaria',
      type: 'Floral Cellular Hydrosol',
      desc: 'Steam-distilled at dawn during peak petal harvest to preserve volatile terpenes, calming dermal micro-inflammation and restoring natural epidermal pH.',
      benefits: ['Anti-Inflammatory Soothing', 'pH Balancing', 'Sensory Aromatherapeutic Calm']
    },
    {
      name: 'Wildcrafted Centella Asiatica',
      origin: 'Madagascar Highlands',
      type: 'Dermal Barrier Repair',
      desc: 'Extracted for high concentrations of madecassic acid and asiaticoside to accelerate wound recovery, strengthen fragile capillaries, and soothe reactive skin.',
      benefits: ['Rapid Barrier Calming', 'Capillary Support', 'Reduces Blemish Redness']
    },
    {
      name: 'Bio-Fermented Hyaluronic Acid',
      origin: 'Kyoto, Japan',
      type: 'Multi-Depth Hydration',
      desc: 'Engineered across 5 distinct molecular weights—from high molecular surface shields to nano-fragments that penetrate deep into the dermis.',
      benefits: ['5-Layer Dermal Plumping', 'Sustained Moisture Reservoir', 'Smooths Dehydration Lines']
    },
    {
      name: 'Cold-Pressed Wild Marula Oil',
      origin: 'Sub-Saharan Africa (Fair-Trade)',
      type: 'Antioxidant Lipid Shield',
      desc: 'Cold-pressed mechanically from wild harvest kernels. Rich in essential oleic fatty acids and 400% more Vitamin C/E antioxidant protection than argan oil.',
      benefits: ['Free-Radical Defense', 'Intensive Nutrient Replenishment', 'Silky Velveteen Finish']
    }
  ];

  const EXCLUSIONS = [
    '0% Parabens & Phenoxyethanol',
    '0% Sulfates (SLS / SLES)',
    '0% Synthetic Dyes & Artificial Pigments',
    '0% Phthalates & Plasticizers',
    '0% Artificial Fragrances / Perfumes',
    '0% Mineral Oils & Petrolatum',
    '0% Silicones (Cyclomethicone, Dimethicone)',
    '0% Microplastics & Nano-Fillers'
  ];

  const SUSTAINABILITY_PILLARS = [
    {
      icon: <Recycle className="w-6 h-6 text-[#AFD971]" />,
      title: 'Zero-Waste Cold Extraction',
      desc: 'Our mechanical cold-press extraction mills in southern France operate with zero chemical solvents, recycling 100% of seed pomace into agricultural compost.'
    },
    {
      icon: <TreePine className="w-6 h-6 text-[#AFD971]" />,
      title: '100% Recyclable Violet Glass',
      desc: 'We bottle exclusively in premium biophotonic and UV-protective amber glass that prevents light degradation and eliminates single-use plastic bottles.'
    },
    {
      icon: <Globe2 className="w-6 h-6 text-[#AFD971]" />,
      title: 'Plastic-Neutral Packaging',
      desc: 'All shipping boxes are made from FSC-certified recycled kraft paper cushioned with natural honeycomb padding and sealed with water-activated starch tape.'
    },
    {
      icon: <PackageCheck className="w-6 h-6 text-[#AFD971]" />,
      title: 'Carbon-Neutral Transit',
      desc: 'Every customer delivery across India is calculated and offset through registered regional mangrove restoration and renewable solar projects.'
    }
  ];

  return (
    <div className="space-y-20 py-8 bg-[#F7F6F2]">
      
      


      {/* ────────────────────────────────────────────────────────────
          SECTION 2: SUSTAINABILITY (#sustainability)
         ──────────────────────────────────────────────────────────── */}
      <section id="sustainability" className="scroll-mt-24 max-w-7xl mx-auto px-6 sm:px-8 pt-6">
        <div className=" ">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#6F8C51] bg-[#184433]/5 px-4 py-1.5 rounded-full">
              <TreePine className="w-3.5 h-3.5 text-[#6F8C51]" />
              <span>Ecological Responsibility</span>
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#184433] mt-3">
              Our Sustainability Mission
            </h2>
            <p className="text-neutral-600 mt-3 text-sm sm:text-base font-light leading-relaxed">
              True luxury must be regenerative. From sustainable farming partnerships to infinite glass recycling, we nurture the Earth with the same reverence we give your skin.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SUSTAINABILITY_PILLARS.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-[#FAF9F5] rounded-xl p-6 sm:p-7 border border-[#184433]/5 flex flex-col justify-between hover:border-[#184433]/20 transition-all group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#184433] flex items-center justify-center mb-5 shadow-md shadow-[#184433]/20 group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="font-sans text-base font-bold text-[#184433] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-[#184433]/10 flex items-center gap-1.5 text-[11px] font-bold text-[#184433]">
                  <span>Eco-Certified Standard</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>




    </div>
  );
}
