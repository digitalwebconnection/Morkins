import { useState } from 'react'

interface JourneyStep {
  id: number
  number: string
  title: string
  subtitle: string
  description: string
  details: string[]
  iconSvg: React.ReactNode
  bgGradient: string
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 1,
    number: '01',
    title: 'Ethical Sourcing',
    subtitle: 'WILD-HARVESTED AT PEAK POTENCY',
    description: 'We source raw botanicals from high-altitude fields where plants develop stronger natural defense compounds.',
    details: [
      'Sustainably hand-picked at peak biological maturity',
      'Fair-trade partnerships supporting small agricultural cooperatives',
      'Zero exposure to heavy metals or synthetic pesticide sprays'
    ],
    bgGradient: 'from-[#195641]/5 to-[#fffef8]',
    iconSvg: (
      <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M5.318 7.318a4.5 4.5 0 000 6.364L12 20.364l6.682-6.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  },
  {
    id: 2,
    number: '02',
    title: 'Cold-Pressing',
    subtitle: 'PRESERVING ENZYMATIC VITALITY',
    description: 'Our sub-zero compression system extracts pure oils and lipids without thermal degradation or chemical solvents.',
    details: [
      'Maintains exact biological compounds of the living plant',
      '99.8% retention of sensitive antioxidants and vitamins',
      'Zero chemical residues or thermal cell destruction'
    ],
    bgGradient: 'from-[#5C7887]/5 to-[#fffef8]',
    iconSvg: (
      <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    )
  },
  {
    id: 3,
    number: '03',
    title: 'Bio-Calibration',
    subtitle: 'CLINICAL PH STABILIZATION',
    description: 'Our chemists calibrate every batch to target the acid mantle, stabilizing formulas at a biocompatible pH of 5.5.',
    details: [
      'Matches skin’s natural protective moisture layer',
      'Supports healthy skin microflora while curbing pathogens',
      'Hypoallergenic formulas verified safe for sensitive dermis'
    ],
    bgGradient: 'from-[#D4CDBC]/10 to-[#fffef8]',
    iconSvg: (
      <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: 4,
    number: '04',
    title: 'Eco-Glass Bottling',
    subtitle: 'SHIELDING MOLECULAR FRESHNESS',
    description: 'We pack formulas in biophotonic UV-filtering violet glass that protects active enzymes from light oxidation.',
    details: [
      'Filters out full visible light spectrum to prolong potency',
      '100% recyclable, premium weight protective glass',
      'Preservative requirements minimized by 60% due to bottle security'
    ],
    bgGradient: 'from-[#17335A]/5 to-[#fffef8]',
    iconSvg: (
      <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    )
  }
]

export default function SourcingTimeline() {
  const [activeStepIdx, setActiveStepIdx] = useState(0)
  const activeStep = JOURNEY_STEPS[activeStepIdx]

  return (
    <section 
      className="py-16 text-brand-dark border-b border-brand-dark/5 transition-all duration-1000"
      style={{
        background: `linear-gradient(to bottom, #fffef8, #F3F1E8)`
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-4">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-4">
          <div className="text-left">
            <span className="text-xs font-bold tracking-widest text-[#5c7886] uppercase">From Seed to Serum</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#17335A] mt-2 leading-tight uppercase">
              The Botanical Journey
            </h2>
          </div>
          <p className="text-gray-600 text-sm max-w-md text-left lg:text-right">
            Every bottle contains pure, bioactive nutrients extracted with state-of-the-art cold-press systems to deliver clinical efficacy directly to your skin.
          </p>
        </div>

        {/* Interactive Steps Grid & Detailed Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Side: Steps Column */}
          <div className="lg:col-span-6 flex flex-col gap-4 w-full">
            {JOURNEY_STEPS.map((step, idx) => {
              const isActive = idx === activeStepIdx
              return (
                <div
                  key={step.id}
                  onMouseEnter={() => setActiveStepIdx(idx)}
                  onClick={() => setActiveStepIdx(idx)}
                  className={`group relative flex items-center gap-6 p-6 rounded-xl border transition-all duration-500 cursor-pointer select-none ${
                    isActive
                      ? 'bg-white border-[#17335A] shadow-md translate-x-2'
                      : 'bg-white/40 border-brand-dark/10 hover:border-brand-dark/30 hover:bg-white/80'
                  }`}
                >
                  {/* Step Number Badge */}
                  <span className={`font-serif text-3xl font-light transition-colors duration-300 ${
                    isActive ? 'text-[#195641]' : 'text-gray-400 group-hover:text-brand-dark'
                  }`}>
                    {step.number}
                  </span>

                  {/* Icon Container with rotate on hover */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isActive 
                      ? 'bg-[#195641] text-white rotate-185 scale-110 shadow-sm' 
                      : 'bg-brand-cream-dark text-[#5C7887] group-hover:bg-brand-cream-dark/80 group-hover:scale-105'
                  }`}>
                    {step.iconSvg}
                  </div>

                  {/* Title & Short description */}
                  <div className="text-left flex-1 min-w-0">
                    <h3 className={`font-sans text-base font-bold transition-colors duration-300 ${
                      isActive ? 'text-[#17335A]' : 'text-brand-dark'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-xs mt-1 truncate">
                      {step.subtitle}
                    </p>
                  </div>

                  {/* Decorative indicator chevron */}
                  <div className={`transition-all duration-300 ${
                    isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                  }`}>
                    <svg className="w-5 h-5 text-[#195641]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Side: Detailed Card Panel */}
          <div className="lg:col-span-6 h-full">
            <div 
              className={`bg-white rounded-2xl p-8 sm:p-10 border border-brand-dark/5 shadow-lg min-h-[420px] flex flex-col justify-between text-left transition-all duration-700 ease-in-out bg-radial ${activeStep.bgGradient}`}
            >
              <div>
                <span className="text-[10px] font-extrabold tracking-widest text-[#195641] bg-[#195641]/10 px-3 py-1 rounded-full uppercase">
                  Step {activeStep.number} details
                </span>
                
                <h3 className="font-serif text-3xl font-normal text-[#17335A] mt-6 mb-2 leading-snug">
                  {activeStep.title}
                </h3>
                
                <span className="text-[11px] font-bold tracking-widest text-[#5c7886] uppercase block mb-6">
                  {activeStep.subtitle}
                </span>

                <p className="text-gray-700 text-sm leading-relaxed mb-8">
                  {activeStep.description}
                </p>

                {/* Bullets with animated tick checks */}
                <ul className="flex flex-col gap-4">
                  {activeStep.details.map((detail, idx) => (
                    <li key={idx} className="flex gap-3 items-start text-xs text-gray-600 leading-relaxed group/li">
                      <div className="w-5 h-5 rounded-full bg-[#195641]/15 text-[#195641] flex items-center justify-center shrink-0 mt-0.5 group-hover/li:bg-[#195641] group-hover/li:text-white transition-all duration-300">
                        <svg className="w-3 h-3 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Eco/Science commitment footer */}
              <div className="border-t border-brand-dark/10 pt-6 mt-8 flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                <span>Bio-Preserved Purity</span>
                <span>Batch Code: MK-2026</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
