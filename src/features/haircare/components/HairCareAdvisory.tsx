import { Award, CheckCircle2, ArrowRight } from 'lucide-react';



const CLINICAL_STATS = [
  { value: '20+ Yrs', label: 'Follicle Restoration Pathology' },
  { value: '15,000+', label: 'Clinical Scalp Consultations' },
  { value: '100%', label: 'Drug-Free • Zero Hormonal Impact' },
];

export default function HairCareAdvisory() {
  return (
    <section className=" select-none relative overflow-hidden ">

      {/* Atmospheric ambient lighting */}
      <div
        className="absolute top-1/2 left-1/3 -translate-y-1/2 w-175 h-100 pointer-events-none opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(ellipse, rgba(196,154,108,0.2) 0%, rgba(245,238,230,0.08) 50%, transparent 80%)',
        }}
      />
      <div
        className="absolute top-1/4 right-10 w-112.5 h-87.5 pointer-events-none opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(139,90,43,0.15) 0%, transparent 70%)',
        }}
      />

      <div className=" relative z-10">

        {/* Surgeon Advisory Card */}
        <div
          className="group  flex flex-col lg:flex-row items-stretch gap-0 overflow-hidden bg-white transition-all duration-500 hover:shadow-[0_20px_60px_rgba(44,24,16,0.08)] relative"
          style={{ boxShadow: '0 12px 45px rgba(44,24,16,0.05)' }}
        >
          {/* Doctor Image Stage (Left) */}
          <div className="lg:w-5/12 relative overflow-hidden aspect-4/3 sm:aspect-16/10 lg:aspect-auto min-h-95 lg:min-h-115 bg-[#FAF7F2] flex items-center justify-center shrink-0">
            <img
              src="https://wimpole.com/wp-content/uploads/2024/04/Hair-doctor-treating-male-pattern-hair-loss.jpg"
              alt="Dr. Marcus Sterling"
              className="w-full h-full object-cover  object-top transition-transform duration-700 ease-out "
            />

            {/* Soft Edge Blends */}
            <div
              className="absolute inset-0 lg:hidden"
              style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.9) 0%, transparent 40%)' }}
            />
            <div
              className="hidden lg:block absolute inset-0"
              style={{ background: 'linear-gradient(to right, transparent 65%, white 100%)' }}
            />

            {/* Floating verification badge */}
            <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#EDE4D8] text-[9px] font-bold uppercase font-mono tracking-wider text-[#2C1810] flex items-center gap-1.5 shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>Medical Board Verified</span>
            </div>

           
          </div>

          {/* Doctor Details & Content (Right) */}
          <div className="lg:w-8/12 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">

            {/* Top Header & Quote */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[9px] font-bold uppercase tracking-[0.15em] font-mono px-3.5 py-1 rounded-full bg-[#FAF5EF] border border-[#EDE4D8] text-[#A67C52] inline-flex items-center gap-1.5 shadow-2xs">
                  <Award className="w-3 h-3 text-[#A67C52]" />
                  Chief Trichology Advisor
                </span>

                <span className="text-[12px] font-mono text-[#313130] uppercase tracking-wider">
                  Harley St. Clinical Follicle Institute
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1210] group-hover:text-[#7A4E2D] transition-colors leading-tight">
                  Dr. Marcus Sterling, MD, FISHRS
                </h3>
                <p className="text-xs font-mono text-[#A67C52] mt-0.5">
                  Fellow, International Society of Hair Restoration Surgery • 20+ Years Clinical Practice
                </p>
              </div>

              <blockquote className="text-sm sm:text-lg text-[#0c0c0c] font-light leading-relaxed  font-serif border-l-2 border-[#C49A6C] pl-4 py-1 bg-[#FAF8F5]/80 rounded-r-xl">
                "In my 20+ years specializing in follicle restoration and hair loss pathology, Morkins represents the gold standard in non-invasive density recovery: blocking DHT at the follicular level while awakening dormant roots with encapsulated caffeine."
              </blockquote>
            </div>

            {/* Clinical Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {CLINICAL_STATS.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EDE4D8] flex flex-col justify-between"
                >
                  <span
                    className="font-serif text-xl sm:text-2xl font-bold"
                    style={{
                      background: 'linear-gradient(135deg, #8B5A2B 0%, #A67C52 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-[9px] font-mono font-medium text-[#7A6E64] uppercase tracking-wider mt-1 leading-snug">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

          

            {/* Bottom Recommendation CTA Bar */}
            <div className="pt-4 border-t border-[#F0E8DF] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#16A34A] font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>100% Physician-Formulated & Clean Trichology Approved</span>
              </div>

              <a
                href="#haircare-kits"
                className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-md flex items-center gap-2 shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #2C1810 0%, #4A2818 100%)',
                }}
              >
                <span>View Recommended Kits</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C49A6C]" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
