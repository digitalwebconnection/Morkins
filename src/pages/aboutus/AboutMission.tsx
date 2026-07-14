export default function AboutMission() {
  const VALUES = [
    {
      num: '01',
      title: 'Biocompatible Purity',
      desc: 'Our formulations mimic the skin’s natural lipid structures, ensuring active ingredients are readily absorbed without triggering irritation or immune response.',
      img: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=500&q=80',
      icon: (
        <svg className="w-5 h-5 text-[#17335A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      )
    },
    {
      num: '02',
      title: 'Clinical Efficacy',
      desc: 'We do not rely on marketing buzzwords. Every single product is subjected to clinical assessment under dermatologist supervision to guarantee quantifiable results.',
      img: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=500&q=80',
      icon: (
        <svg className="w-5 h-5 text-[#17335A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v17.792M14.25 3.104v17.792M4.5 12h15" />
        </svg>
      )
    },
    {
      num: '03',
      title: 'Zero-Waste Integrity',
      desc: 'From our cold-pressing mills to our glass bottles, we optimize our entire supply chain to leave minimal footprint while preserving formula potency.',
      img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=500&q=80',
      icon: (
        <svg className="w-5 h-5 text-[#17335A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m9-9H3M18.75 6.75l-13.5 13.5M18.75 17.25l-13.5-13.5" />
        </svg>
      )
    }
  ]

  return (
    <section className="py-14  relative overflow-hidden">
      {/* Abstract background circles */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-[#17335a]/5 blur-3xl pointer-events-none -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#17335A] mt-2">Driven by Purpose</h2>
          <p className="text-neutral-900 mt-4 text-base sm:text-lg font-light leading-relaxed">
            We operate with complete clarity. By stripping away fillers and focusing exclusively on science, we elevate your daily routine to clinical care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {VALUES.map((val, idx) => (
            <div
              key={idx}
              className="flex flex-col bg-white  overflow-hidden border border-brand-dark/5 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
            >
              {/* Card Image Cover with Overlaid Number */}
              <div className="relative h-60 w-full overflow-hidden bg-brand-cream-dark">
                <img
                  src={val.img}
                  alt={val.title}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                />
                {/* Index Number */}
                <div className="absolute top-4 left-6 font-serif text-5xl font-extralight text-white/40 group-hover:text-[#a8d5c0]/80 transition-colors duration-500">
                  {val.num}
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
              </div>

              {/* Text Card Body */}
              <div className="p-5 pt-10 text-left relative flex-1 flex flex-col justify-between">
                
                {/* Overlapping Icon Badge */}
                <div className="absolute top-0 left-8 -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-brand-dark/5 shadow-md flex items-center justify-center group-hover:border-[#17335A]/20 transition-colors duration-300">
                  {val.icon}
                </div>

                <div className="space-y-3">
                  <h3 className="font-serif text-2xl font-normal text-[#17335A]">
                    {val.title}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed font-light">
                    {val.desc}
                  </p>
                </div>

                {/* Subtle bottom accent line */}
                <div className="w-full h-px bg-brand-dark/5 mt-8 group-hover:bg-[#17335A]/20 transition-colors duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
