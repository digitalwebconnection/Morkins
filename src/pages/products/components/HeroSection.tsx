import { useLanguage } from '../../../context/LanguageContext';

interface HeroSectionProps {
  department: 'women' | 'men' | '';
  activeCategory: string;
  totalProducts: number;
  womenCount: number;
  menCount: number;
  categories: string[];
  onSelectDepartment: (dept: 'women' | 'men' | '') => void;
  onSelectCategory: (cat: string) => void;
}

export default function HeroSection({
  department,
  totalProducts,
  womenCount,
  menCount,
  onSelectDepartment,
}: HeroSectionProps) {
  const { t } = useLanguage();

  return (
    <div className="relative overflow-hidden bg-linear-to-b from-[#F7F6F2] via-[#FCFBF8] to-[#FCFBF8] border-b border-brand-dark/5 pt-10 pb-8">
      {/* Subtle Background Pattern & Glow */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-25 mix-blend-multiply pointer-events-none"

      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-[#6F8C51]/8 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title & Breadcrumb */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-brand-dark/10 shadow-2xs text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#6F8C51] mb-3">
            <span>Morkins Botanical Apothecary</span>
            <span className="w-1 h-1 rounded-full bg-[#6F8C51]"></span>
            <span>{totalProducts} Formulas</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1C2E1A] tracking-tight mb-3">
            {department === 'women'
              ? (t('sec_women_skincare_title') || "Women's Skincare Collection")
              : department === 'men'
              ? (t('sec_men_haircare_title') || "Men's Hair-Care Collection")
              : (t('nav_products') || "Botanical Skincare & Hair-Care")}
          </h1>

          <p className="text-sm sm:text-base text-stone-600 font-light max-w-2xl mx-auto">
            {department === 'women'
              ? "Bio-active serums, lipid-restoring creams, and gentle cleansers engineered for cellular luminosity."
              : department === 'men'
              ? "Clinical scalp vitality, DHT-blocker washes, and follicle-stimulating tonics engineered for hair density."
              : "Discover our dual science-backed collections: restorative skincare for women and high-potency hair-care for men."}
          </p>
        </div>

        {/* Dual Department Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-6">
          
          {/* WOMEN: SKINCARE CARD */}
          <div
            onClick={() => onSelectDepartment(department === 'women' ? '' : 'women')}
            className={`relative p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden group ${
              department === 'women'
                ? 'bg-white border-[#6F8C51] shadow-lg ring-2 ring-[#6F8C51]/20 scale-[1.01]'
                : 'bg-white/80 hover:bg-white border-stone-200/80 hover:border-[#6F8C51]/40 shadow-xs hover:shadow-md'
            }`}
          >
            {/* Top Accent Line */}
            <div className={`absolute top-0 left-0 right-0 h-1 transition-all duration-300 ${
              department === 'women' ? 'bg-[#6F8C51]' : 'bg-transparent group-hover:bg-[#6F8C51]/40'
            }`} />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                {/* Botanical Droplet Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                  department === 'women'
                    ? 'bg-[#6F8C51] text-white shadow-md'
                    : 'bg-[#6F8C51]/10 text-[#6F8C51] group-hover:bg-[#6F8C51]/20'
                }`}>
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                  </svg>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-serif font-bold text-brand-dark">Women's Skincare</h3>
                    {department === 'women' && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-[#6F8C51]/15 text-[#6F8C51] px-2 py-0.5 rounded-md">
                        Selected
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-500 font-light mt-0.5">Serums • Moisturizers • Cleansers • Masks</p>
                </div>
              </div>

              {/* Count Chip */}
              <div className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                department === 'women'
                  ? 'bg-[#6F8C51] text-white font-mono'
                  : 'bg-stone-100 text-stone-600 font-mono group-hover:bg-stone-200'
              }`}>
                {womenCount} Items
              </div>
            </div>
          </div>

          {/* MEN: HAIR CARE CARD */}
          <div
            onClick={() => onSelectDepartment(department === 'men' ? '' : 'men')}
            className={`relative p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden group ${
              department === 'men'
                ? 'bg-white border-[#1C2E1A] shadow-lg ring-2 ring-[#1C2E1A]/20 scale-[1.01]'
                : 'bg-white/80 hover:bg-white border-stone-200/80 hover:border-[#1C2E1A]/40 shadow-xs hover:shadow-md'
            }`}
          >
            {/* Top Accent Line */}
            <div className={`absolute top-0 left-0 right-0 h-1 transition-all duration-300 ${
              department === 'men' ? 'bg-[#1C2E1A]' : 'bg-transparent group-hover:bg-[#1C2E1A]/40'
            }`} />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                {/* Scalp & Follicle Care Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                  department === 'men'
                    ? 'bg-[#1C2E1A] text-white shadow-md'
                    : 'bg-stone-800/10 text-stone-800 group-hover:bg-stone-800/20'
                }`}>
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m-4-6l4 4 4-4m-7-6a4 4 0 1 1 6 0 4 4 0 0 1-6 0z" />
                  </svg>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-serif font-bold text-brand-dark">Men's Hair Care</h3>
                    {department === 'men' && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-800 text-white px-2 py-0.5 rounded-md">
                        Selected
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-500 font-light mt-0.5">Scalp Serums • DHT Shampoos • Tonics</p>
                </div>
              </div>

              {/* Count Chip */}
              <div className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                department === 'men'
                  ? 'bg-stone-900 text-white font-mono'
                  : 'bg-stone-100 text-stone-600 font-mono group-hover:bg-stone-200'
              }`}>
                {menCount} Items
              </div>
            </div>
          </div>

        </div>

      

      </div>
    </div>
  );
}