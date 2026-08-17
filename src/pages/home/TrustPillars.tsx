import { useLanguage } from '../../context/LanguageContext'

interface PillarItem {
  id: number
  num: string
  tag: string
  titleKey: string
  descKey: string
  icon: React.ReactNode
}

const PILLARS: PillarItem[] = [
  {
    id: 1,
    num: '01',
    tag: 'Clinical Protocol',
    titleKey: 'pillar_1_title',
    descKey: 'pillar_1_desc',
    icon: (
      <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
  {
    id: 2,
    num: '02',
    tag: '100% Pure Actives',
    titleKey: 'pillar_2_title',
    descKey: 'pillar_2_desc',
    icon: (
      <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    id: 3,
    num: '03',
    tag: 'Targeted Efficacy',
    titleKey: 'pillar_3_title',
    descKey: 'pillar_3_desc',
    icon: (
      <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 4,
    num: '04',
    tag: 'Pan-India Delivery',
    titleKey: 'pillar_4_title',
    descKey: 'pillar_4_desc',
    icon: (
      <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25V3.375c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v10.875" />
      </svg>
    ),
  },
]

export default function TrustPillars() {
  const { t } = useLanguage()

  return (
    <section className="bg-[#184433] text-white relative overflow-hidden border-y border-[#B8D5C8]/15 shadow-inner">
      {/* Background ambient luxury lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#25634b]/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#112F24]/40 rounded-full blur-3xl pointer-events-none translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 sm:py-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 items-stretch">
          {PILLARS.map((p, idx) => (
            <div
              key={p.id}
              className={`group flex flex-col items-center text-center px-4 lg:px-6 relative transition-all duration-300 hover:-translate-y-1 ${
                idx !== PILLARS.length - 1 ? 'lg:border-r lg:border-white/10' : ''
              }`}
            >
              {/* Top small badge / index */}
              <div className="flex items-center gap-1.5 mb-3 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-mono text-[10px] font-bold text-[#E8D5B5] tracking-widest uppercase">
                  {p.num}
                </span>
                <span className="text-white/30 text-[10px]">•</span>
                <span className="text-[10px] font-semibold tracking-wider text-[#B8D5C8] uppercase">
                  {p.tag}
                </span>
              </div>

              {/* Icon Container with gold accent */}
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center text-[#E8D5B5] shadow-xs group-hover:bg-[#E8D5B5] group-hover:text-[#184433] group-hover:border-[#E8D5B5] group-hover:scale-110 group-hover:shadow-[0_8px_20px_rgba(232,213,181,0.25)] transition-all duration-500 mb-4">
                {p.icon}
              </div>

              {/* Title */}
              <h3 className="font-serif text-base sm:text-lg font-bold tracking-[0.14em] uppercase text-white group-hover:text-[#E8D5B5] transition-colors duration-300 leading-snug">
                {t(p.titleKey)}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-[13px] text-white/80 font-light leading-relaxed mt-2 max-w-[250px] group-hover:text-white transition-colors duration-300">
                {t(p.descKey)}
              </p>

              {/* Subtle bottom hover line indicator */}
              <div className="w-0 group-hover:w-12 h-0.5 bg-[#E8D5B5] mt-4 transition-all duration-500 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
