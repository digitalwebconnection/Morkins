import { useNavigate } from 'react-router-dom'

interface CategoryCard {
  id: number
  titleLine1: string
  titleLine2: string
  subtext: string
  bgColor: string
  subtextColor: string
  link: string
  accentColor: string
}

const CATEGORIES: CategoryCard[] = [
  {
    id: 1,
    titleLine1: 'Face',
    titleLine2: 'Serums',
    subtext: '6 FORMULATIONS',
    bgColor: '#0D1E36', // Deep Navy Blue
    subtextColor: '#88A2C4',
    accentColor: '#1A3359',
    link: '/products',
  },
  {
    id: 2,
    titleLine1: 'Hair',
    titleLine2: 'Serums',
    subtext: '7 FORMULATIONS',
    bgColor: '#5C3D28', // Rich Earthy Warm Brown
    subtextColor: '#D9B89A',
    accentColor: '#7A5236',
    link: '/products',
  },
  {
    id: 3,
    titleLine1: 'Face',
    titleLine2: 'Wash',
    subtext: '1 FORMULATION',
    bgColor: '#235E4F', // Deep Jade Forest Emerald
    subtextColor: '#A2CFC1',
    accentColor: '#2F7563',
    link: '/products',
  },
  {
    id: 4,
    titleLine1: 'Our',
    titleLine2: 'Story',
    subtext: 'FOUNDER & MANIFESTO',
    bgColor: '#423254', // Royal Plum Purple
    subtextColor: '#BFAED6',
    accentColor: '#58446E',
    link: '/about',
  },
]

export default function IngredientsSpotlight() {
  const navigate = useNavigate()

  return (
    <section className="py-14 sm:py-20 bg-[#F0F4F8] text-brand-dark relative overflow-hidden">
      {/* Background Ambient Luxury Glows */}
      <div className="absolute -top-24 left-1/4 w-[500px] h-[500px] bg-[#235E4F]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-[500px] h-[500px] bg-[#B58A57]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#423254]/6 rounded-full blur-3xl pointer-events-none" />


      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-[11px] sm:text-xs font-bold tracking-[0.28em] text-[#B58A57] uppercase">
            SHOP BY CATEGORY
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-[#0C1B33] font-normal tracking-tight mt-2.5">
            Three Ranges. One Active Each.
          </h2>
        </div>

        {/* 4 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(cat.link)}
              style={{ backgroundColor: cat.bgColor }}
              className="group relative rounded-3xl p-7 sm:p-8 min-h-[340px] sm:min-h-[380px] flex flex-col justify-end cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.22)] overflow-hidden"
            >
              {/* Subtle Ambient Radial Highlight inside Card */}
              <div
                className="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-2xl opacity-40 group-hover:opacity-70 group-hover:scale-125 transition-all duration-700 pointer-events-none"
                style={{ backgroundColor: cat.accentColor }}
              />

              {/* Decorative Subtle Watermark Outline */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-1 group-hover:translate-x-0">
                <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white backdrop-blur-xs">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>

              {/* Card Bottom Text & Formulations Count */}
              <div className="relative z-10 flex items-end justify-between gap-3 w-full">
                {/* 2-line Serif Title */}
                <h3 className="font-serif text-2xl sm:text-[28px] text-white font-normal leading-[1.08] tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                  {cat.titleLine1}
                  <br />
                  {cat.titleLine2}
                </h3>

                {/* Formulations Count / Subtext */}
                <span
                  style={{ color: cat.subtextColor }}
                  className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest leading-tight shrink-0 pb-1 text-right group-hover:opacity-100 transition-opacity duration-300"
                >
                  {cat.subtext}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
