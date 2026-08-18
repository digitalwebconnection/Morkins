import { useState, useRef, useEffect } from 'react'
import p1 from '../../assets/product/p1.jpg'
import p2 from '../../assets/product/p2.jpg'
import p4 from '../../assets/product/p4.jpg'
import p6 from '../../assets/product/p6.jpg'

interface Stat {
  id: number
  percentage: number
  label: string
  detail: string
}

interface StudyTab {
  id: string
  title: string
  description: string
  beforeImg: string
  afterImg: string
  beforeLabel: string
  afterLabel: string
  stats: Stat[]
}

const STUDY_TABS: StudyTab[] = [
  {
    id: 'clinical',
    title: '4-WEEK CLINICAL TRIAL',
    description: 'Independent clinical evaluation of 35 female participants aged 25-55, using the Morkins Botanical Radiance & Barrier protocol twice daily.',
    beforeImg: p1,
    afterImg: p4,
    beforeLabel: 'Day 0 • Initial Skin State',
    afterLabel: 'Day 28 • After Protocol',
    stats: [
      { id: 1, percentage: 98, label: 'Moisture Retention', detail: 'Measured by corneometer readings showing a significant increase in stratum corneum hydration.' },
      { id: 2, percentage: 92, label: 'Wrinkle Reduction', detail: 'Clinical grading showed visible smoothing of fine lines and reduction in wrinkles around the eyes.' },
      { id: 3, percentage: 95, label: 'Elasticity & Firmness', detail: 'Cutometer measurements showed significant improvement in skin biomechanical properties.' }
    ]
  },
  {
    id: 'consumer',
    title: 'CONSUMER PERCEPTION',
    description: 'Self-assessment study of 120 users reporting their personal results after 14 days of consistent application of Morkins Bio-Active Cream.',
    beforeImg: p2,
    afterImg: p6,
    beforeLabel: 'Day 1 • Baseline',
    afterLabel: 'Day 14 • Consumer Results',
    stats: [
      { id: 1, percentage: 96, label: 'Radiance & Brightness', detail: 'Agree skin looks visibly brighter, more luminous, and less fatigued.' },
      { id: 2, percentage: 94, label: 'Skin Smoothness', detail: 'Reported immediate softening and refining of uneven skin texture.' },
      { id: 3, percentage: 89, label: 'Redness Reduction', detail: 'Felt skin was calmer, less irritated, and skin tone appeared more uniform.' }
    ]
  },
  {
    id: 'barrier',
    title: 'LABORATORY TESTING',
    description: 'In-vitro and lab testing measuring Transepidermal Water Loss (TEWL) and cellular longevity under environmental stressors.',
    beforeImg: p4,
    afterImg: p1,
    beforeLabel: 'Untreated Cell Culture',
    afterLabel: 'Morkins Active Infused',
    stats: [
      { id: 1, percentage: 88, label: 'Barrier Acceleration', detail: 'Accelerated recovery rate of the skin lipid barrier under controlled stress testing.' },
      { id: 2, percentage: 99, label: 'pH Optimization', detail: 'Formula maintains skin acidity at a healthy, stable pH of 5.5 to prevent pathogen growth.' },
      { id: 3, percentage: 91, label: 'Cell Renewal Rate', detail: 'Stimulates epidermal cell proliferation for natural skin turnover and repair.' }
    ]
  }
]

const TESTED_PRODUCTS = [
  {
    id: 1,
    name: 'Botanical Radiance Glow Serum',
    step: 'STEP 01 • ACTIVE',
    img: p1,
    benefit: 'Cellular Renewal & Brightening',
  },
  {
    id: 2,
    name: 'Bio-Active Barrier Repair Cream',
    step: 'STEP 02 • HYDRATE',
    img: p2,
    benefit: '24h Lipid Shield & Moisture Lock',
  },
  {
    id: 6,
    name: 'Retinol Cellular Renewal Treatment',
    step: 'STEP 03 • RENEW',
    img: p6,
    benefit: 'Pure Encapsulated Retinol Care',
  }
]

export default function ClinicalStudy() {
  const [activeTab, setActiveTab] = useState('clinical')
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  // Handlers for Before/After Slider dragging
  const handleMove = (clientX: number) => {
    if (!sliderRef.current) return
    const rect = sliderRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    handleMove(e.clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX)
    }
  }

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false)
    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp)
      window.addEventListener('touchend', handleMouseUp)
    }
    return () => {
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchend', handleMouseUp)
    }
  }, [isDragging])

  const currentTab = STUDY_TABS.find((t) => t.id === activeTab) || STUDY_TABS[0]

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F2] text-brand-dark relative overflow-hidden">
      {/* Ambient Luxury Lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#184433]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#B58A57]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#184433]/10 border border-[#184433]/20 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#184433]" />
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-[#184433] uppercase">
              PROVEN BY SCIENCE
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#184433]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal text-[#184433] leading-tight">
            Clinical Efficacy & Results
          </h2>
          <p className="text-gray-700 tracking-wide text-sm mt-3 leading-relaxed max-w-2xl mx-auto">
            Morkins is committed to absolute transparency. Our formulas undergo rigorous testing under pharmaceutical standards to ensure high performance without compromising skin barrier health.
          </p>
        </div>

        {/* Two Column Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Interactive Before/After Image Slider using Real Product Photos */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#B58A57] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#184433]">
                Interactive Clinical Comparison (Drag to Compare)
              </span>
            </div>

            <div
              ref={sliderRef}
              className="relative w-full max-w-120 aspect-4/3 sm:aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border border-black/10 select-none cursor-ew-resize group bg-black/5"
              onMouseDown={() => setIsDragging(true)}
              onTouchStart={() => setIsDragging(true)}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
            >
              {/* "Before" Image (Base Layer - with original product photo background) */}
              <img
                src={currentTab.beforeImg}
                alt="Product Before"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border border-white/20 shadow-md">
                {currentTab.beforeLabel}
              </div>

              {/* "After" Image (Overlay Layer, Clipped - with original product photo background) */}
              <div
                className="absolute inset-0 h-full overflow-hidden transition-all duration-75 pointer-events-none"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={currentTab.afterImg}
                  alt="Product After"
                  className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none"
                  style={{ width: sliderRef.current?.getBoundingClientRect().width || '100%' }}
                />
                <div className="absolute top-4 left-4 z-10 bg-[#184433]/90 backdrop-blur-xs text-[#E8D5B5] text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border border-[#E8D5B5]/30 shadow-md whitespace-nowrap">
                  {currentTab.afterLabel}
                </div>
              </div>

              {/* Slider Divider Line */}
              <div
                className="absolute inset-y-0 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.6)] z-20 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Handle Circle */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-[#184433] border border-[#184433]/20 flex items-center justify-center shadow-xl pointer-events-auto transition-transform hover:scale-110 active:scale-95 cursor-ew-resize">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-4 4 4 4m8 0l4-4-4-4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Tabbed Clinical Results & Dynamic SVG Rings */}
          <div className="lg:col-span-6 flex flex-col text-left">
            {/* Tabs Navigation */}
            <div className="flex border-b border-brand-dark/10 mb-6 overflow-x-auto no-scrollbar gap-2">
              {STUDY_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? 'border-[#184433] text-[#184433]'
                      : 'border-transparent text-brand-dark/50 hover:text-[#184433]'
                  }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>

            {/* Tab Description */}
            <p className="text-gray-700 text-sm leading-relaxed mb-8 transition-all duration-500">
              {currentTab.description}
            </p>

            {/* Statistics Display */}
            <div className="flex flex-col gap-6">
              {currentTab.stats.map((stat) => {
                const radius = 26
                const circumference = 2 * Math.PI * radius
                const strokeDashoffset = circumference - (stat.percentage / 100) * circumference

                return (
                  <div key={stat.id} className="flex gap-4 items-start p-3 rounded-2xl hover:bg-white/60 transition-colors duration-300 group/stat">
                    {/* SVG Radial Progress Circle */}
                    <div className="relative w-14 h-14 shrink-0">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
                        <circle
                          cx="32"
                          cy="32"
                          r={radius}
                          fill="none"
                          stroke="#E4F0EC"
                          strokeWidth="3.5"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r={radius}
                          fill="none"
                          stroke="#184433"
                          strokeWidth="3.5"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          strokeLinecap="round"
                          className="transition-[stroke-dashoffset] duration-1000 ease-out"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-extrabold text-[#184433]">
                        {stat.percentage}%
                      </span>
                    </div>

                    {/* Stat Details */}
                    <div className="flex flex-col">
                      <h4 className="font-sans text-sm font-bold text-[#184433] group-hover/stat:text-[#25634b] transition-colors duration-300">
                        {stat.label}
                      </h4>
                      <p className="text-gray-600 text-xs mt-0.5 leading-relaxed">
                        {stat.detail}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Tested Clinical Regimen Showcase (Bottom Row) */}
        <div className="mt-16 pt-12 border-t border-brand-dark/10">
          <div className="text-center mb-8">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B58A57]">
              EVALUATION REGIMEN
            </span>
            <h3 className="font-serif text-2xl text-[#184433] mt-1 font-normal">
              Formulations Featured in Clinical Testing
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TESTED_PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-brand-dark/10 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-black/5 bg-black/5">
                  <img
                    src={prod.img}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] font-mono font-bold tracking-widest text-[#B58A57] uppercase block">
                    {prod.step}
                  </span>
                  <h4 className="font-serif text-sm font-bold text-[#184433] truncate mt-0.5 group-hover:text-[#25634b] transition-colors">
                    {prod.name}
                  </h4>
                  <p className="text-[11px] text-gray-500 truncate mt-0.5">
                    {prod.benefit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
