import { useState } from 'react';

const DOCTORS = [
  {
    name: 'Dr. Helena Moreau, MD, FAAD',
    role: 'Lead Clinical Dermatologist',
    credentials: '18+ Years Clinical Practice • Sorbonne Dermatology Paris',
    img: 'https://images.unsplash.com/photo-1594824813589-9831b2bbab94?auto=format&fit=crop&w=400&h=400&q=80',
    quote: '"Morkins represents a rare benchmark where bio-compatible cold botanical extracts deliver cellular hydration and barrier reconstruction that rivals invasive clinical treatments."',
  },
  {
    name: 'Dr. Julian Vance, PhD',
    role: 'Head of Bio-Botanical Pharmacognosy',
    credentials: 'PhD Phytochemistry • Swiss Botanical Research Institute',
    img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&h=400&q=80',
    quote: '"By keeping extraction temperatures strictly below 38°C, we preserve 100% of the active tertiary enzymes that conventional heated manufacturing invariably destroys."',
  },
  {
    name: 'Dr. Aurelie Fontaine, MD',
    role: 'Cosmetic Dermatologist & Allergen Specialist',
    credentials: 'Board Certified • European Society of Contact Dermatitis',
    img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&h=400&q=80',
    quote: '"Formulating with zero silicones, synthetic fragrances, or harsh petrochemicals ensures our treatments heal the skin barrier rather than creating a temporary superficial film."',
  },
];

export default function SkinCareAdvisory() {
  const [selectedDoctorIndex, setSelectedDoctorIndex] = useState(0);
  const activeDoc = DOCTORS[selectedDoctorIndex];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-[#EAE3D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Metric Counters Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center pb-14 border-b border-[#EAE3D2]">
          <div className="space-y-1">
            <span className="font-serif text-4xl sm:text-5xl font-bold text-[#12602F]">2.4M+</span>
            <p className="text-xs text-stone-500 font-bold uppercase tracking-wider">Formulas Harvested</p>
          </div>
          <div className="space-y-1">
            <span className="font-serif text-4xl sm:text-5xl font-bold text-[#12602F]">12K+</span>
            <p className="text-xs text-stone-500 font-bold uppercase tracking-wider">Clinical Trials</p>
          </div>
          <div className="space-y-1">
            <span className="font-serif text-4xl sm:text-5xl font-bold text-[#12602F]">16</span>
            <p className="text-xs text-stone-500 font-bold uppercase tracking-wider">Clean Beauty Awards</p>
          </div>
          <div className="space-y-1">
            <span className="font-serif text-4xl sm:text-5xl font-bold text-[#12602F]">98.4%</span>
            <p className="text-xs text-stone-500 font-bold uppercase tracking-wider">Dermatologist Verified</p>
          </div>
        </div>

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mt-14 mb-12">
          <span className="text-xs font-bold text-[#8C6221] uppercase tracking-[0.25em] mb-2 block">
            Clinical Advisory Board
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#123624] font-normal leading-tight">
            Formulated By Leading Dermatologists & Biochemists
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-light mt-3">
            Our formulations are guided by Europe's top clinical researchers to ensure pharmaceutical efficacy with clean botanical purity.
          </p>

          {/* Doctor Switcher Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {DOCTORS.map((doc, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedDoctorIndex(idx)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedDoctorIndex === idx
                    ? 'bg-[#12602F] text-white shadow-xs'
                    : 'bg-[#FAF8F4] text-stone-600 hover:bg-[#F2EFE7] border border-[#DDD3C1]'
                }`}
              >
                {doc.name.split(',')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Doctor Card */}
        <div className="max-w-4xl mx-auto bg-[#FAF8F4] p-8 sm:p-10 rounded-3xl border border-[#DDD3C1] flex flex-col sm:flex-row items-center gap-8 shadow-sm">
          <img
            src={activeDoc.img}
            alt={activeDoc.name}
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl object-cover border-4 border-white shadow-md shrink-0"
          />
          <div className="space-y-3 text-center sm:text-left">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C6221] bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 font-mono">
              {activeDoc.role}
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#1C2E1A]">
              {activeDoc.name}
            </h3>
            <p className="text-xs text-stone-500 font-mono">
              {activeDoc.credentials}
            </p>
            <p className="text-xs sm:text-sm text-stone-700 font-light italic leading-relaxed pt-1">
              {activeDoc.quote}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
