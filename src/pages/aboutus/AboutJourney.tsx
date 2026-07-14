import ScrollStack, { ScrollStackItem } from './ScrollStack';

export default function AboutJourney() {
  const MILESTONES = [
    {
      year: '2021',
      title: 'The Scientific Genesis',
      desc: 'Morkins was founded by a collective of molecular biologists and leading dermatologists. Dissatisfied with the high rate of barrier damage in clients, they dedicated 18 months to isolating plant-lipid fractions that naturally mimic skin sebum.',
      img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&q=80',
      bgClass: 'bg-[#5c7886] text-white'
    },
    {
      year: '2022',
      title: 'Biocompatibility Patent',
      desc: 'Our labs patented the Liposome-Carrier Delivery System. This innovation wraps active botanical compounds inside a bio-compatible lecithin sheath, allowing deep absorption into the epidermis without causing sensitizing friction.',
      img: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=500&q=80',
      bgClass: 'bg-[#5c7886] text-white'
    },
    {
      year: '2023',
      title: 'The Core Catalog Launch',
      desc: 'We officially released our initial formulations: the Glow Boosting Serum and the Barrier Restore Moisturizer. Backed by rigorous peer-reviewed clinical studies, the line sold out within three weeks of its clinical release.',
      img: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=500&q=80',
      bgClass: 'bg-[#5c7886] text-white'
    },
    {
      year: '2024',
      title: 'Zero-Waste Mill Sourcing',
      desc: 'Committed to sustainability, we acquired cold-pressing mills in southern France. This gave us direct ownership of our ingredient extraction pipelines, ensuring that every plant lipid enters our formula fresh and at peak potency.',
      img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=500&q=80',
      bgClass: 'bg-[#5c7886] text-white'
    },
    {
      year: '2026',
      title: 'AI Diagnostics & Catalog Expansion',
      desc: 'Recognizing that skincare is not one-size-fits-all, we launched our smart AI Diagnosis Skin Quiz alongside 10 new specialized formulas (Products 12 to 24) to offer high-precision, customized regimens.',
      img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=500&q=80',
      bgClass: 'bg-[#5c7886] text-white'
    }
  ];

  return (
    <section className="py-14  relative overflow-hidden">
      {/* Background glow decorator */}
      <div className="absolute bottom-10 right-0 w-96 h-96 rounded-full bg-[#5c7886]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-0">
       
          <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#17335A] mt-2">Evolution of Morkins</h2>
          <p className="text-neutral-500 mt-4 text-sm sm:text-base font-light leading-relaxed">
            Scroll down to see the path we paved to redefine transdermal science.
          </p>
        </div>

        <ScrollStack
          useWindowScroll={true}
          className="use-window "
          itemDistance={30}
          itemScale={0.035}
          itemStackDistance={35}
          baseScale={0.86}
          // rotationAmount={-1.5}
          blurAmount={1}
        >
          {MILESTONES.map((stone, idx) => {
            const isImageRight = idx % 2 !== 0;
            return (
              <ScrollStackItem
                key={idx}
                itemClassName={`p-8 md:p-6 shadow-2xl shadow-black/40 rounded-3xl ${stone.bgClass} flex flex-col md:grid md:grid-cols-12 gap-8 items-stretch overflow-hidden border border-brand-dark/50`}
              >
                {/* Image Column */}
                <div className={`md:col-span-5 relative h-52 md:h-76 min-h-[220px] rounded-3xl overflow-hidden group/img ${isImageRight ? 'md:order-last' : ''}`}>
                  <img
                    src={stone.img}
                    alt={stone.title}
                    className="absolute inset-0 w-full h-full object-fill rounded-3xltransition-transform duration-[1.5s] group-hover/img:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
                </div>

                {/* Content Column */}
                <div className="md:col-span-7 flex flex-col justify-between text-left space-y-4 md:pl-2">
                  <div>
                    <div className="flex items-center gap-4">
                      <span className="font-serif text-5xl md:text-6xl font-light tracking-tight opacity-75">
                        {stone.year}
                      </span>
                      <div className="h-px flex-1 bg-current/20" />
                    </div>
                    <h3 className="font-serif text-2xl font-normal mt-4 tracking-wide leading-snug">
                      {stone.title}
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed font-light mt-3 opacity-90">
                      {stone.desc}
                    </p>
                  </div>
                  
                  {/* Card footer details */}
                  <div className="pt-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider opacity-60">
                    <span>Milestone Achieved</span>
                    <span>•</span>
                    <span>Verified Phase</span>
                  </div>
                </div>
              </ScrollStackItem>
            );
          })}
        </ScrollStack>
      </div>
    </section>
  );
}
