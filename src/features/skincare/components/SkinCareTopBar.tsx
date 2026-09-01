import { Sparkles, ShieldCheck, Droplets, Truck, Award } from 'lucide-react';

export default function SkinCareTopBar() {
  const highlights = [
    { icon: Sparkles, text: '100% Bio-Active Cold-Pressed (<38°C)' },
    { icon: ShieldCheck, text: 'Dermatologist In-Vivo Validated' },
    { icon: Droplets, text: 'Multi-Depth Glass Skin Luminosity' },
    { icon: Award, text: 'Zero Parabens, Phthalates & Silicones' },
    { icon: Truck, text: 'Complimentary Express Shipping Over $50' },
  ];

  return (
    <div className="bg-[#123624] text-[#E8DFC8] border-b border-[#1C4D34] py-2.5 px-4 overflow-hidden relative select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] uppercase font-bold tracking-[0.18em]">
        {/* Static Desktop Row */}
        <div className="hidden md:flex items-center justify-around w-full gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-2 text-stone-200 hover:text-[#AFD971] transition-colors">
                <Icon className="w-3.5 h-3.5 text-[#AFD971]" />
                <span className="text-[10.5px]">{item.text}</span>
              </div>
            );
          })}
        </div>

        {/* Mobile Marquee Ticker */}
        <div className="flex md:hidden items-center justify-center w-full overflow-x-auto no-scrollbar gap-5 text-[10px]">
          <div className="flex items-center gap-1.5 text-stone-200 whitespace-nowrap">
            <Sparkles className="w-3 h-3 text-[#AFD971]" />
            <span>100% Bio-Active Cold-Pressed</span>
          </div>
          <span className="text-stone-500">•</span>
          <div className="flex items-center gap-1.5 text-stone-200 whitespace-nowrap">
            <ShieldCheck className="w-3 h-3 text-[#AFD971]" />
            <span>Dermatologist Verified</span>
          </div>
          <span className="text-stone-500">•</span>
          <div className="flex items-center gap-1.5 text-stone-200 whitespace-nowrap">
            <Award className="w-3 h-3 text-[#AFD971]" />
            <span>14-Day Glass Skin Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
}
