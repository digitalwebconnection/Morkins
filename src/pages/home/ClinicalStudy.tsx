import { useState, useRef, useEffect } from 'react'

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
  stats: Stat[]
}

const STUDY_TABS: StudyTab[] = [
  {
    id: 'clinical',
    title: '4-WEEK CLINICAL TRIAL',
    description: 'Independent clinical evaluation of 35 female participants aged 25-55, using the Morkins routine twice daily.',
    stats: [
      { id: 1, percentage: 98, label: 'Moisture Retention', detail: 'Measured by corneometer readings showing a significant increase in stratum corneum hydration.' },
      { id: 2, percentage: 92, label: 'Wrinkle Reduction', detail: 'Clinical grading showed visible smoothing of fine lines and reduction in wrinkles around the eyes.' },
      { id: 3, percentage: 95, label: 'Elasticity & Firmness', detail: 'Cutometer measurements showed significant improvement in skin biomechanical properties.' }
    ]
  },
  {
    id: 'consumer',
    title: 'CONSUMER PERCEPTION',
    description: 'Self-assessment study of 120 users reporting their personal results after 14 days of consistent application.',
    stats: [
      { id: 1, percentage: 96, label: 'Radiance & Brightness', detail: 'Agree skin looks visibly brighter, more luminous, and less fatigued.' },
      { id: 2, percentage: 94, label: 'Skin Smoothness', detail: 'Reported immediate softening and refining of uneven skin texture.' },
      { id: 3, percentage: 89, label: 'Redness Reduction', detail: 'Felt skin was calmer, less irritated, and skin tone appeared more uniform.' }
    ]
  },
  {
    id: 'barrier',
    title: 'LABORATORY TESTING',
    description: 'In-vitro and lab testing measuring Transepidermal Water Loss (TEWL) and dermal cell viability.',
    stats: [
      { id: 1, percentage: 88, label: 'Barrier Acceleration', detail: 'Accelerated recovery rate of the skin lipid barrier under controlled stress testing.' },
      { id: 2, percentage: 99, label: 'pH Optimization', detail: 'Formula maintains skin acidity at a healthy, stable pH of 5.5 to prevent pathogen growth.' },
      { id: 3, percentage: 91, label: 'Cell Renewal Rate', detail: 'Stimulates epidermal cell proliferation for natural skin turnover and repair.' }
    ]
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
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto px-6 lg:px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-7xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest text-[#5c7886] uppercase">Proven by Science</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#17335A] mt-2 leading-tight uppercase">
            Clinical Efficacy & Results
          </h2>
          <p className="text-gray-900 tracking-wide text-sm mt-3">
            Morkins is committed to absolute transparency. Our formulas undergo rigorous testing to ensure high clinical performance without compromising skin health.
          </p>
        </div>

        {/* Two Column Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive Before/After Image Slider */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5c7886] mb-4">
              Interactive Skin Progress (Drag to Compare)
            </span>
            
            <div 
              ref={sliderRef}
              className="relative w-full max-w-[500px] aspect-6/5 rounded-2xl overflow-hidden shadow-2xl border border-brand-dark/10 select-none cursor-ew-resize"
              onMouseDown={() => setIsDragging(true)}
              onTouchStart={() => setIsDragging(true)}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
            >
              {/* "Before" Image (Base Layer) */}
              <img 
                src="https://img.fannstar.tf.co.kr/2026/04/01/origin/cb5ed220ba5a1ef0aff1d83811f11a85.png`" 
                alt="Skin before treatment"
                className="absolute inset-0 w-full h-full object-fill pointer-events-none"
              />
              <div className="absolute top-4 left-4 z-10 bg-black/40 backdrop-blur-xs text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-white/10">
                Before Morkins
              </div>

              {/* "After" Image (Overlay Layer, Clipped) */}
              <div 
                className="absolute inset-0 h-full overflow-hidden transition-all duration-75 pointer-events-none"
                style={{ width: `${sliderPosition}%` }}
              >
                <img 
                  src="https://i.pinimg.com/736x/b0/76/86/b07686aa18ba8d895d04101529ede282.jpg" 
                  alt="Skin after treatment"
                  className="absolute inset-0 w-full h-full object-fill max-w-none pointer-events-none"
                  style={{ width: sliderRef.current?.getBoundingClientRect().width }}
                />
                <div className="absolute top-4 left-4 z-10 bg-[#17335A]/80 backdrop-blur-xs text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-white/10 whitespace-nowrap">
                  After 4 Weeks
                </div>
              </div>

              {/* Slider Divider Line */}
              <div 
                className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Handle Circle */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-[#17335A] border border-brand-dark/20 flex items-center justify-center shadow-lg pointer-events-auto transition-transform hover:scale-110 active:scale-95">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-4 4 4 4m8 0l4-4-4-4" />
                  </svg>
                </div>
              </div>
            </div>
            
    
          </div>

          {/* Right Column: Tabbed Clinical Results & Dynamic SVG Rings */}
          <div className="lg:col-span-6 flex flex-col text-left">
            
            {/* Tabs Navigation */}
            <div className="flex border-b border-brand-dark/10 mb-8 overflow-x-auto no-scrollbar gap-1">
              {STUDY_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? 'border-[#17335A] text-[#17335A]'
                      : 'border-transparent text-brand-dark/60 hover:text-[#17335A]'
                  }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>

            {/* Tab Description */}
            <p className="text-gray-700 text-sm leading-relaxed mb-10 transition-all duration-500">
              {currentTab.description}
            </p>

            {/* Statistics Display */}
            <div className="flex flex-col gap-8">
              {currentTab.stats.map((stat) => {
                const radius = 28
                const circumference = 2 * Math.PI * radius
                const strokeDashoffset = circumference - (stat.percentage / 100) * circumference

                return (
                  <div key={stat.id} className="flex gap-5 items-start group/stat">
                    {/* SVG Radial Progress Circle */}
                    <div className="relative w-16 h-16 shrink-0">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
                        {/* Background Ring */}
                        <circle
                          cx="32"
                          cy="32"
                          r={radius}
                          fill="none"
                          stroke="#E4F0EC"
                          strokeWidth="3.5"
                        />
                        {/* Foreground Progress Ring */}
                        <circle
                          cx="32"
                          cy="32"
                          r={radius}
                          fill="none"
                          stroke="#195641"
                          strokeWidth="3.5"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          strokeLinecap="round"
                          className="transition-[stroke-dashoffset] duration-1000 ease-out"
                        />
                      </svg>
                      {/* Inner Percentage Text */}
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-extrabold text-[#17335A]">
                        {stat.percentage}%
                      </span>
                    </div>

                    {/* Stat Copy */}
                    <div className="flex flex-col">
                      <h4 className="font-sans text-base font-bold text-[#17335A] group-hover/stat:text-brand-light transition-colors duration-300">
                        {stat.label}
                      </h4>
                      <p className="text-gray-600 text-xs mt-1 leading-relaxed">
                        {stat.detail}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
