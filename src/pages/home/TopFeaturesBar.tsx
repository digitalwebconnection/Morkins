import { useLanguage } from '../../context/LanguageContext'

interface FeatureItem {
  icon: React.ReactNode
  titleKey: string
}

const topFeatures: FeatureItem[] = [
  {
    icon: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#E8D5B5] group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    titleKey: 'feat_cod_title',
  },
  {
    icon: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#E8D5B5] group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25V3.375c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v10.875" />
      </svg>
    ),
    titleKey: 'feat_deliv_title',
  },
  {
    icon: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#E8D5B5] group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    titleKey: 'feat_auth_title',
  },
  {
    icon: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#E8D5B5] group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 2 2 2-2 2 2 2-2 4 2z" />
      </svg>
    ),
    titleKey: 'feat_return_title',
  },
  {
    icon: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#E8D5B5] group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    titleKey: 'feat_pay_title',
  },
]

export default function TopFeaturesBar() {
  const { t } = useLanguage()

  return (
    <section className="relative bg-[#6F8C51] text-white py-1.5 sm:py-2.5 overflow-hidden border-t border-[#8C937D]/20">
      {/* Background Ambient Glows */}
      <div className="absolute -top-16 left-1/5 w-80 h-40 bg-[#2D6A4F]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 right-1/5 w-80 h-40 bg-[#E8D5B5]/12 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-28 bg-[#184433]/50 rounded-full blur-2xl pointer-events-none" />

      {/* Subtle Luxury Micro Dot Matrix Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #E8D5B5 1px, transparent 0)`,
          backgroundSize: '28px 28px',
        }}
      />

      {/* Left Botanical Branch Graphic */}
      <svg
        className="absolute -left-8 -top-8 w-44 h-44 text-[#E8D5B5]/70 pointer-events-none -rotate-12 select-none"
        viewBox="0 0 120 120"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 110 Q50 60 105 15" />
        <path d="M45 70 Q25 50 20 65 Q35 75 45 70" fill="currentColor" fillOpacity="0.04" />
        <path d="M68 47 Q55 25 40 38 Q56 52 68 47" fill="currentColor" fillOpacity="0.04" />
        <path d="M88 28 Q98 10 82 10 Q82 25 88 28" fill="currentColor" fillOpacity="0.04" />
        <path d="M28 88 Q12 80 18 95 Q28 92 28 88" fill="currentColor" fillOpacity="0.04" />
      </svg>

      {/* Right Botanical Branch Graphic */}
      <svg
        className="absolute -right-8 -bottom-8 w-44 h-44 text-brand-sage/70 pointer-events-none rotate-165 select-none"
        viewBox="0 0 120 120"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 110 Q50 60 105 15" />
        <path d="M45 70 Q25 50 20 65 Q35 75 45 70" fill="currentColor" fillOpacity="0.04" />
        <path d="M68 47 Q55 25 40 38 Q56 52 68 47" fill="currentColor" fillOpacity="0.04" />
        <path d="M88 28 Q98 10 82 10 Q82 25 88 28" fill="currentColor" fillOpacity="0.04" />
        <path d="M28 88 Q12 80 18 95 Q28 92 28 88" fill="currentColor" fillOpacity="0.04" />
      </svg>

      {/* Top & Bottom Subtle Gold Accent Hairlines */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-[#E8D5B5]/25 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-[#E8D5B5]/15 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 items-center">
          {topFeatures.map((f, idx) => (
            <div
              key={f.titleKey}
              className={`group flex flex-col items-center text-center px-2 transition-all duration-300 hover:-translate-y-0.5 ${idx === topFeatures.length - 1 ? 'col-span-2 sm:col-span-1' : ''
                }`}
            >
              {/* Gold Outline Icon */}
              <div className="mb-2.5 flex items-center justify-center">
                {f.icon}
              </div>

              {/* Title */}
              <h3 className="font-serif text-xs sm:text-[13px] lg:text-sm font-bold tracking-[0.12em] uppercase text-white group-hover:text-[#E8D5B5] transition-colors duration-300 leading-snug">
                {t(f.titleKey)}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
