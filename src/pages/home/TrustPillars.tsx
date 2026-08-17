import { useLanguage } from '../../context/LanguageContext'

interface PillarItem {
  id: number
  titleKey: string
  icon: React.ReactNode
}

const PILLARS: PillarItem[] = [
  {
    id: 1,
    titleKey: 'pillar_1_title',
    icon: (
      <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
  {
    id: 2,
    titleKey: 'pillar_2_title',
    icon: (
      <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    id: 3,
    titleKey: 'pillar_3_title',
    icon: (
      <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 4,
    titleKey: 'pillar_4_title',
    icon: (
      <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25V3.375c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v10.875" />
      </svg>
    ),
  },
]

export default function TrustPillars() {
  const { t } = useLanguage()

  return (
    <section className="bg-[#184433] text-white relative overflow-hidden border-y border-white/10 shadow-inner">
      {/* Background ambient luxury lighting */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#25634b]/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#112F24]/40 rounded-full blur-3xl pointer-events-none translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-4 py-2 sm:py-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-0 items-center">
          {PILLARS.map((p, idx) => (
            <div
              key={p.id}
              className={`group flex flex-col items-center text-center justify-center px-3 sm:px-4 lg:px-6 py-2 relative transition-all duration-300 hover:-translate-y-0.5 ${
                idx !== PILLARS.length - 1 ? 'lg:border-r lg:border-white/10' : ''
              }`}
            >
              {/* Icon Container with gold accent */}
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center text-[#E8D5B5] shadow-xs group-hover:bg-[#E8D5B5] group-hover:text-[#184433] group-hover:border-[#E8D5B5] group-hover:scale-105 group-hover:shadow-[0_4px_12px_rgba(232,213,181,0.25)] transition-all duration-300 mb-2">
                {p.icon}
              </div>

              {/* Title */}
              <h3 className="font-serif text-xs sm:text-[13px] lg:text-sm font-semibold tracking-[0.12em] uppercase text-white group-hover:text-[#E8D5B5] transition-colors duration-300 leading-snug">
                {t(p.titleKey)}
              </h3>

              {/* Subtle bottom hover line indicator */}
              <div className="w-0 group-hover:w-8 h-0.5 bg-[#E8D5B5] mt-2 transition-all duration-300 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
