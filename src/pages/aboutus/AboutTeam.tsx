export default function AboutTeam() {
  const TEAM = [
    {
      name: 'Dr. Evelyn Morkin',
      role: 'Founder & Chief Medical Officer',
      credentials: 'M.D., Ph.D. Molecular Dermatology',
      bio: 'Board-certified molecular dermatologist with 15+ years of clinical research focused on transdermal delivery and lipid barriers.',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=500&q=80'
    },
    {
      name: 'Dr. Adrian Vance',
      role: 'Lead Formulation Scientist',
      credentials: 'Ph.D. Organic Bio-Chemistry',
      bio: 'Former biochemistry professor specialized in bio-compatible cosmetic syntheses and active peptide stabilization.',
      img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&h=500&q=80'
    },
    {
      name: 'Clara Dupont',
      role: 'Director of Botanical Sourcing',
      credentials: 'M.S. Agronomy & Sourcing',
      bio: 'Agricultural scientist dedicated to tracing, verifying, and cold-pressing clean raw active elements at peak botanical harvest periods.',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=500&q=80'
    }
  ];

  return (
    <section className="py-14  relative overflow-hidden">
      {/* Background glow decorators */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#17335a]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#5c7886]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
         
          <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#17335A] mt-2">Dermatology Experts</h2>
          <p className="text-neutral-800 mt-4 text-sm sm:text-base font-light leading-relaxed">
            The scientific pioneers committed to researching and engineering your daily skincare regimen.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {TEAM.map((member, idx) => (
            <div key={idx} className="group flex flex-col items-center text-center">
              
              {/* Image Container with Elegant Asymmetrical Arch shape */}
              <div className="relative w-full aspect-4/5 rounded-t-full  overflow-hidden shadow-xl border border-[#17335a]/5 bg-[#f4f1ea] group">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                />
                
                {/* Dark Overlay with details on hover */}
                <div className="absolute inset-0 bg-linear-to-t from-[#17335a]/90 via-[#17335a]/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 text-left">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#a8d5c0]">{member.credentials}</span>
                  <p className="text-white text-xs leading-relaxed font-light mt-1.5 opacity-90">{member.bio}</p>
                </div>
              </div>

              {/* Text Info */}
              <div className="mt-4 flex flex-col items-center">
                <h3 className="font-serif text-2xl font-normal text-[#17335A] tracking-wide">
                  {member.name}
                </h3>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5c7886] mt-1.5 block">
                  {member.role}
                </span>
                
                {/* Divider Line */}
                <div className="w-12 h-px bg-[#17335A]/10 mt-3 group-hover:w-20 transition-all duration-500" />
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
