import { useNavigate } from 'react-router-dom'
import p1 from '../../assets/product/p1.jpg'
import p3 from '../../assets/product/p3.jpg'
import p6 from '../../assets/product/p6.jpg'
import p13 from '../../assets/product/p13.avif'

interface CategoryCard {
  id: number
  tag: string
  titleLine1: string
  titleLine2: string
  subtext: string
  bgColor: string
  subtextColor: string
  link: string
  productImg: string
}

const CATEGORIES: CategoryCard[] = [
  {
    id: 1,
    tag: '01 • SERUMS',
    titleLine1: 'Face',
    titleLine2: 'Serums',
    subtext: '6 FORMULATIONS',
    bgColor: '#0D1E36', // Deep Navy Blue
    subtextColor: '#88A2C4',
    link: '/products',
    productImg: p1,
  },
  {
    id: 2,
    tag: '02 • HAIR CARE',
    titleLine1: 'Hair',
    titleLine2: 'Serums',
    subtext: '7 FORMULATIONS',
    bgColor: '#5C3D28', // Rich Earthy Warm Brown
    subtextColor: '#D9B89A',
    link: '/products',
    productImg: p13,
  },
  {
    id: 3,
    tag: '03 • CLEANSER',
    titleLine1: 'Face',
    titleLine2: 'Wash',
    subtext: '1 FORMULATION',
    bgColor: '#235E4F', // Deep Jade Forest Emerald
    subtextColor: '#A2CFC1',
    link: '/products',
    productImg: p3,
  },
  {
    id: 4,
    tag: '04 • MANIFESTO',
    titleLine1: 'Our',
    titleLine2: 'Story',
    subtext: 'FOUNDER & MANIFESTO',
    bgColor: '#423254', // Royal Plum Purple
    subtextColor: '#BFAED6',
    link: '/about',
    productImg: p6,
  },
]

export default function IngredientsSpotlight() {
  const navigate = useNavigate()

  return (
    <section className="py-8 sm:py-14 bg-[#ffffff] text-brand-dark relative overflow-hidden">
      {/* Background Ambient Luxury Glows */}
      <div className="absolute -top-24 left-1/4 w-125 h-125 bg-[#235E4F]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-125 h-125 bg-[#B58A57]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#423254]/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-5 sm:mb-8">
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
              className="group relative rounded-xl min-h-95 sm:min-h-80 flex flex-col justify-between p-6 sm:p-4 cursor-pointer transition-all duration-500 hover:-translate-y-2.5 shadow-[0_16px_36px_rgba(0,0,0,0.22)] hover:shadow-[0_28px_60px_rgba(0,0,0,0.42)] border border-white/20 hover:border-[#E8D5B5]/75 overflow-hidden"
            >
              {/* 1. Ambient Deep Colored Shadow Glow Behind Card */}
              <div
                className="absolute -inset-2 rounded-2xl opacity-35 group-hover:opacity-75 blur-xl transition-all duration-700 pointer-events-none -z-10"
                style={{ backgroundColor: cat.bgColor }}
              />

              {/* 2. Full Background Product Image */}
              <img
                src={cat.productImg}
                alt={`${cat.titleLine1} ${cat.titleLine2}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* 3. Deep Gradient Shadow Overlay inside Card */}
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/35 to-black/40 pointer-events-none transition-opacity duration-500 group-hover:opacity-90" />

              {/* 4. Subtle Radial Shadow Vignette for extra depth */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.45)_100%)] pointer-events-none" />

              {/* Card Top: Tag + Hover Arrow Button */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/50 text-white/90 border border-white/20 backdrop-blur-md shadow-md">
                  {cat.tag}
                </span>

                <div className="w-9 h-9 rounded-full bg-black/50 border border-white/25 flex items-center justify-center text-white/90 group-hover:bg-[#E8D5B5] group-hover:text-[#0C1B33] group-hover:border-[#E8D5B5] group-hover:scale-110 transition-all duration-300 shadow-lg backdrop-blur-md">
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>

              {/* Card Bottom: Titles & Formulations Count */}
              <div className="relative z-10 flex items-end justify-between gap-3 w-full pt-20">
                {/* 2-line Serif Title */}
                <h3 className="font-serif text-2xl sm:text-[30px] text-white font-normal leading-[1.08] tracking-tight group-hover:translate-x-1 transition-transform duration-300 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                  {cat.titleLine1}
                  <br />
                  {cat.titleLine2}
                </h3>

                {/* Formulations Count / Subtext */}
                <span
                  style={{ color: cat.subtextColor }}
                  className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest leading-tight shrink-0 pb-1 text-right group-hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
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
