import { 
  Recycle, 
  Globe2,
  TreePine,
  PackageCheck
} from 'lucide-react';

export default function AboutIngredientsEthics() {
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
