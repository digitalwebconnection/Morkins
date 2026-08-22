import { useState } from 'react';
import p1 from '../../assets/product/p1.jpg';
import p2 from '../../assets/product/p2.jpg';
import p3 from '../../assets/product/p3.jpg';

interface BestSellersRoutineBuilderProps {
  onAddToCart: (product: { id: number; name: string; price: number; img: string }, openCart?: boolean) => void;
}

interface RoutineStep {
  id: number;
  stepNumber: number;
  stepName: string;
  stepTagline: string;
  name: string;
  category: string;
  price: number;
  img: string;
  keyActive: string;
  benefit: string;
}

const ROUTINE_STEPS: RoutineStep[] = [
  {
    id: 3,
    stepNumber: 1,
    stepName: 'PURIFY & BALANCE',
    stepTagline: 'Morning & Evening Cleanse',
    name: 'Gentle Clarifying Foaming Wash',
    category: 'Cleanser',
    price: 19.00,
    img: p3,
    keyActive: 'Botanical Amino Acids + Green Tea Leaf',
    benefit: 'Gently dissolves sebum and impurities without disrupting acid mantle pH.'
  },
  {
    id: 1,
    stepNumber: 2,
    stepName: 'TREAT & RADIATE',
    stepTagline: 'Active Bio-Cellular Elixir',
    name: 'Botanical Radiance Glow Serum',
    category: 'Serum',
    price: 28.00,
    img: p1,
    keyActive: '15% Bio-Peptides + Stabilized Vit C',
    benefit: 'Penetrates deep into dermal layers to ignite cell renewal and luminosity.'
  },
  {
    id: 2,
    stepNumber: 3,
    stepName: 'LOCK & FORTIFY',
    stepTagline: 'Deep Epidermal Seal',
    name: 'Bio-Active Barrier Repair Cream',
    category: 'Moisturizer',
    price: 26.00,
    img: p2,
    keyActive: '5-Ceramides Complex + Squalane',
    benefit: 'Creates a breathable moisture seal that prevents trans-epidermal water loss.'
  }
];

export default function BestSellersRoutineBuilder({ onAddToCart }: BestSellersRoutineBuilderProps) {
  const [selectedStepIds, setSelectedStepIds] = useState<number[]>([3, 1, 2]);
  const [bundleAdded, setBundleAdded] = useState(false);

  const toggleStep = (id: number) => {
    if (selectedStepIds.includes(id)) {
      if (selectedStepIds.length > 1) {
        setSelectedStepIds(selectedStepIds.filter(stepId => stepId !== id));
      }
    } else {
      setSelectedStepIds([...selectedStepIds, id]);
    }
  };

  const selectedItems = ROUTINE_STEPS.filter(step => selectedStepIds.includes(step.id));
  const rawSubtotal = selectedItems.reduce((acc, curr) => acc + curr.price, 0);

  // Discount rule: 3 items = 20% off, 2 items = 10% off, 1 item = 0% off
  const discountRate = selectedItems.length === 3 ? 0.20 : selectedItems.length === 2 ? 0.10 : 0;
  const discountAmount = rawSubtotal * discountRate;
  const finalPrice = rawSubtotal - discountAmount;

  const handleAddBundle = () => {
    selectedItems.forEach((item, index) => {
      // Calculate item price after bundle discount
      const discountedItemPrice = parseFloat((item.price * (1 - discountRate)).toFixed(2));
      onAddToCart({
        id: item.id,
        name: item.name,
        price: discountedItemPrice,
        img: item.img
      }, index === selectedItems.length - 1);
    });

    setBundleAdded(true);
    setTimeout(() => setBundleAdded(false), 1200);
  };

  return (
    <section id="routine-builder" className="py-16 sm:py-22 bg-[#F4F3EE]/60 border-b border-[#A68A56]/20 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#6F8C51]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-0 w-96 h-96 bg-[#A68A56]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#A68A56]/15 border border-[#A68A56]/30 text-[#8B7443] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">
            <span>✨ Synergistic Skincare Science</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-brand-dark tracking-tight">
            The 3-Step <span className="italic font-light text-[#6F8C51]">Holy Grail Ritual</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-brand-dark/70 font-light leading-relaxed">
            Formulated to work in biological harmony. When applied sequentially, these three best sellers amplify active ingredient absorption by up to <strong>300%</strong>.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative mb-12">
          {ROUTINE_STEPS.map((step) => {
            const isSelected = selectedStepIds.includes(step.id);

            return (
              <div
                key={step.id}
                onClick={() => toggleStep(step.id)}
                className={`group relative bg-white rounded-3xl p-6 sm:p-7 border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#6F8C51] shadow-xl shadow-[#6F8C51]/10 -translate-y-1'
                    : 'border-transparent bg-white/70 opacity-70 hover:opacity-100 hover:border-gray-200'
                }`}
              >
                {/* Step Header */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center font-mono ${
                        isSelected ? 'bg-[#1C331B] text-[#AFD971]' : 'bg-gray-200 text-gray-600'
                      }`}>
                        0{step.stepNumber}
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#A68A56]">
                        {step.stepName}
                      </span>
                    </div>

                    {/* Selection Checkbox */}
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-[#6F8C51] border-[#6F8C51] text-white' : 'border-gray-300 bg-white'
                    }`}>
                      {isSelected && (
                        <svg className="w-3.5 h-3.5 stroke-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Image Stage */}
                  <div className="relative aspect-square w-full rounded-2xl bg-[#FCFBF8] p-4 flex items-center justify-center mb-5 overflow-hidden border border-gray-100">
                    <img
                      src={step.img}
                      alt={step.name}
                      className="max-h-full max-w-full object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-106"
                    />
                    <span className="absolute bottom-2 left-2 text-[10px] bg-white/90 backdrop-blur-xs text-brand-dark/70 font-semibold px-2 py-0.5 rounded-md border border-gray-100">
                      {step.stepTagline}
                    </span>
                  </div>

                  {/* Details */}
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-brand-dark leading-snug mb-1">
                    {step.name}
                  </h3>

                  <p className="text-xs text-brand-dark/70 font-light leading-relaxed mb-4">
                    {step.benefit}
                  </p>
                </div>

                {/* Key Active & Price */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="text-[11px] text-[#6F8C51] font-semibold truncate max-w-42.5">
                    ★ {step.keyActive.split('+')[0]}
                  </div>
                  <div className="font-mono text-base font-bold text-brand-dark">
                    ${step.price.toFixed(2)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Bundle Calculation & 1-Click Buy Box */}
        <div className="bg-[#1C331B] text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-[#AFD971]/20 relative overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute top-0 right-1/3 w-80 h-80 bg-[#AFD971]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
            
            {/* Left: Summary & Tier Perks */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#AFD971] mb-2">
                <span className="w-2 h-2 rounded-full bg-[#AFD971] animate-pulse" />
                Bundle & Save Privilege
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white mb-2">
                {selectedItems.length === 3 ? 'Complete 3-Step Holy Grail Routine' : `${selectedItems.length} Products Selected`}
              </h3>

              <p className="text-xs sm:text-sm text-white/80 font-light mb-4">
                {selectedItems.length === 3 ? (
                  <span className="text-[#AFD971] font-medium">
                    ✓ Maximum 20% Bundle Savings Applied + Free Express Shipping + Complimentary Velvet Apothecary Bag
                  </span>
                ) : selectedItems.length === 2 ? (
                  <span>
                    ✓ 10% Duo Bundle Savings Applied. <strong className="text-[#AFD971]">Add 1 more step to unlock 20% OFF!</strong>
                  </span>
                ) : (
                  <span>Select at least 2 steps to unlock bundle discounts.</span>
                )}
              </p>

              {/* Progress Tier Indicators */}
              <div className="flex items-center gap-2 sm:gap-3 text-[11px] font-bold">
                <span className={`px-2.5 py-1 rounded-lg border ${
                  selectedItems.length >= 1 ? 'bg-white/15 border-white/30 text-white' : 'border-white/10 text-white/40'
                }`}>
                  1 Step
                </span>
                <span className="text-white/40">→</span>
                <span className={`px-2.5 py-1 rounded-lg border ${
                  selectedItems.length >= 2 ? 'bg-[#A68A56] border-[#A68A56] text-white' : 'border-white/10 text-white/40'
                }`}>
                  2 Steps (Save 10%)
                </span>
                <span className="text-white/40">→</span>
                <span className={`px-2.5 py-1 rounded-lg border ${
                  selectedItems.length === 3 ? 'bg-[#AFD971] border-[#AFD971] text-[#1C331B]' : 'border-white/10 text-white/40'
                }`}>
                  Full Ritual (Save 20% + Free Gift)
                </span>
              </div>
            </div>

            {/* Right: Pricing & CTA */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/15 lg:pl-8">
              
              <div className="text-left sm:text-right">
                <div className="flex items-baseline gap-2 justify-start sm:justify-end">
                  <span className="font-mono text-3xl sm:text-4xl font-bold text-[#AFD971]">
                    ${finalPrice.toFixed(2)}
                  </span>
                  {discountAmount > 0 && (
                    <span className="font-mono text-lg text-white/50 line-through">
                      ${rawSubtotal.toFixed(2)}
                    </span>
                  )}
                </div>
                {discountAmount > 0 && (
                  <div className="text-xs text-[#AFD971] font-semibold mt-0.5">
                    You Save ${discountAmount.toFixed(2)} ({discountRate * 100}% OFF)
                  </div>
                )}
              </div>

              <button
                onClick={handleAddBundle}
                disabled={bundleAdded || selectedItems.length === 0}
                className={`w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl cursor-pointer flex items-center justify-center gap-2 ${
                  bundleAdded
                    ? 'bg-emerald-500 text-white scale-98'
                    : 'bg-[#AFD971] hover:bg-[#9ec860] text-[#1C331B] hover:shadow-2xl hover:scale-102 active:scale-98'
                }`}
              >
                {bundleAdded ? (
                  <>
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Entire Ritual Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                    <span>Claim Complete Ritual • ${(finalPrice).toFixed(2)}</span>
                  </>
                )}
              </button>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
