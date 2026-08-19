import { useState, useRef, useEffect } from "react";
import badSkinGirl from "../../assets/mild_bad_skin_girl_1787124110969.png";
import clearSkinGirl from "../../assets/clear_skin_girl_1787123224835.png";

interface Stat {
  id: number;
  percentage: number;
  label: string;
  detail: string;
}

interface StudyTab {
  id: string;
  title: string;
  description: string;
  beforeImg: string;
  afterImg: string;
  beforeLabel: string;
  afterLabel: string;
  stats: Stat[];
}

const STUDY_TABS: StudyTab[] = [
  {
    id: "clinical",
    title: "4-WEEK CLINICAL TRIAL",
    description:
      "Independent clinical evaluation of 35 female participants aged 25-55, using the Morkins Botanical Radiance & Barrier protocol twice daily.",
    beforeImg: badSkinGirl,
    afterImg: clearSkinGirl,
    beforeLabel: "Day 0 • Initial Skin State",
    afterLabel: "Day 28 • After Protocol",
    stats: [
      {
        id: 1,
        percentage: 98,
        label: "Moisture Retention",
        detail:
          "Measured by corneometer readings showing a significant increase in stratum corneum hydration.",
      },
      {
        id: 2,
        percentage: 92,
        label: "Wrinkle Reduction",
        detail:
          "Clinical grading showed visible smoothing of fine lines and reduction in wrinkles around the eyes.",
      },
      {
        id: 3,
        percentage: 95,
        label: "Elasticity & Firmness",
        detail:
          "Cutometer measurements showed significant improvement in skin biomechanical properties.",
      },
    ],
  },
  {
    id: "consumer",
    title: "CONSUMER PERCEPTION",
    description:
      "Self-assessment study of 120 users reporting their personal results after 14 days of consistent application of Morkins Bio-Active Cream.",
    beforeImg: badSkinGirl,
    afterImg: clearSkinGirl,
    beforeLabel: "Day 1 • Baseline",
    afterLabel: "Day 14 • Consumer Results",
    stats: [
      {
        id: 1,
        percentage: 96,
        label: "Radiance & Brightness",
        detail:
          "Agree skin looks visibly brighter, more luminous, and less fatigued.",
      },
      {
        id: 2,
        percentage: 94,
        label: "Skin Smoothness",
        detail:
          "Reported immediate softening and refining of uneven skin texture.",
      },
      {
        id: 3,
        percentage: 89,
        label: "Redness Reduction",
        detail:
          "Felt skin was calmer, less irritated, and skin tone appeared more uniform.",
      },
    ],
  },
  {
    id: "barrier",
    title: "LABORATORY TESTING",
    description:
      "In-vitro and lab testing measuring Transepidermal Water Loss (TEWL) and cellular longevity under environmental stressors.",
    beforeImg: badSkinGirl,
    afterImg: clearSkinGirl,
    beforeLabel: "Untreated Cell Culture",
    afterLabel: "Morkins Active Infused",
    stats: [
      {
        id: 1,
        percentage: 88,
        label: "Barrier Acceleration",
        detail:
          "Accelerated recovery rate of the skin lipid barrier under controlled stress testing.",
      },
      {
        id: 2,
        percentage: 99,
        label: "pH Optimization",
        detail:
          "Formula maintains skin acidity at a healthy, stable pH of 5.5 to prevent pathogen growth.",
      },
      {
        id: 3,
        percentage: 91,
        label: "Cell Renewal Rate",
        detail:
          "Stimulates epidermal cell proliferation for natural skin turnover and repair.",
      },
    ],
  },
];

export default function ClinicalStudy() {
  const [activeTab, setActiveTab] = useState("clinical");
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);

    const handleMouseMoveGlobal = (e: MouseEvent) => {
      if (!isDragging || !sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    };

    const handleTouchMoveGlobal = (e: TouchEvent) => {
      if (!isDragging || !sliderRef.current) return;
      if (e.touches.length > 0) {
        const rect = sliderRef.current.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setSliderPosition(percentage);
      }
    };

    if (isDragging) {
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchend", handleMouseUp);
      window.addEventListener("mousemove", handleMouseMoveGlobal);
      window.addEventListener("touchmove", handleTouchMoveGlobal, {
        passive: false,
      });
    }
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMoveGlobal);
      window.removeEventListener("touchmove", handleTouchMoveGlobal);
    };
  }, [isDragging]);

  const currentTab =
    STUDY_TABS.find((t) => t.id === activeTab) || STUDY_TABS[0];

  return (
    <section className="py-8 sm:py-16 bg-white text-[#0B1A28] relative overflow-hidden border-b border-[#0B1A28]/10">
      {/* Ambient Luxury Lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#AFD971]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#B58A57]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-7xl mx-auto mb-14">
          <h2 className="font-serif text-4xl sm:text-5xl font-medium text-[#0B1A28] leading-tight">
            Clinical Efficacy & Results
          </h2>
          <p className="text-gray-700 tracking-wide text-sm mt-3 leading-relaxed max-w-4xl mx-auto">
            Morkins is committed to absolute transparency. Our formulas undergo
            rigorous testing under pharmaceutical standards to ensure high
            performance without compromising skin barrier health.
          </p>
        </div>

        {/* Two Column Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Interactive Before/After Image Slider using Real Product Photos */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#B58A57] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#0B1A28]">
                Interactive Clinical Comparison (Drag to Compare)
              </span>
            </div>

            <div
              ref={sliderRef}
              className="relative w-full max-w-120 aspect-4/3 sm:aspect-4/3 rounded-md overflow-hidden shadow-2xl border border-black/10 select-none cursor-ew-resize group bg-black/5"
              onMouseDown={() => setIsDragging(true)}
              onTouchStart={() => setIsDragging(true)}
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

              {/* "After" Image (Overlay Layer, Clipped) */}
              <div
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <img
                  src={currentTab.afterImg}
                  alt="Product After"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
                <div className="absolute top-4 left-4 z-10 bg-[#0B1A28]/90 backdrop-blur-xs text-[#F1EDE9] text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border border-white/20 shadow-md whitespace-nowrap">
                  {currentTab.afterLabel}
                </div>
              </div>

              {/* Slider Divider Line */}
              <div
                className="absolute inset-y-0 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.6)] z-20 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Handle Circle */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-[#0B1A28] border-gray-200 flex items-center justify-center shadow-xl pointer-events-auto transition-transform hover:scale-110 active:scale-95 cursor-ew-resize">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 9l-4 4 4 4m8 0l4-4-4-4"
                    />
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
                      ? "border-[#A68A56] text-[#A68A56]"
                      : "border-transparent text-gray-400 hover:text-[#0B1A28]"
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
                const radius = 26;
                const circumference = 2 * Math.PI * radius;
                const strokeDashoffset =
                  circumference - (stat.percentage / 100) * circumference;

                return (
                  <div
                    key={stat.id}
                    className="flex gap-4 items-start p-3 rounded-2xl hover:bg-white/60 transition-colors duration-300 group/stat"
                  >
                    {/* SVG Radial Progress Circle */}
                    <div className="relative w-14 h-14 shrink-0">
                      <svg
                        className="w-full h-full -rotate-90"
                        viewBox="0 0 64 64"
                      >
                        <circle
                          cx="32"
                          cy="32"
                          r={radius}
                          fill="none"
                          stroke="#F1EDE9"
                          strokeWidth="3.5"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r={radius}
                          fill="none"
                          stroke="#A68A56"
                          strokeWidth="3.5"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          strokeLinecap="round"
                          className="transition-[stroke-dashoffset] duration-1000 ease-out"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-extrabold text-[#0B1A28]">
                        {stat.percentage}%
                      </span>
                    </div>

                    {/* Stat Details */}
                    <div className="flex flex-col">
                      <h4 className="font-sans text-sm font-bold text-[#0B1A28] group-hover/stat:text-[#A68A56] transition-colors duration-300">
                        {stat.label}
                      </h4>
                      <p className="text-gray-600 text-xs mt-0.5 leading-relaxed">
                        {stat.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
