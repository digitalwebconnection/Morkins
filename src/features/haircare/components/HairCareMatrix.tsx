import { Check } from 'lucide-react';

export default function HairCareMatrix() {
  const comparisonData = [
    {
      standard: 'Botanical DHT Blockers (Saw Palmetto + Pumpkin Seed)',
      morkins: true,
      others: false,
      why: 'Inhibits 5α-reductase locally in scalp without systemic hormonal disruption or sexual side-effects.',
    },
    {
      standard: 'Liposomal Caffeine 2-Minute Trans-Follicular Delivery',
      morkins: true,
      others: 'Surface Shampoos Only',
      why: 'Penetrates down to hair bulbs within 120 seconds to counteract follicle miniaturization.',
    },
    {
      standard: 'Redensyl + Procapil Dual Stem-Cell Complex',
      morkins: true,
      others: false,
      why: 'Increases dermal papilla fibroblast proliferation by +214% to switch follicles into active growth.',
    },
    {
      standard: 'Zero Sulfates, Silicones, or Mineral Oil Coatings',
      morkins: true,
      others: false,
      why: 'Prevents pore-choking silicone buildup that suffocates developing hair shafts.',
    },
    {
      standard: 'No "Dread Shed" or Rebound Loss Upon Stopping',
      morkins: true,
      others: 'Severe Rebound Risk',
      why: 'Strengthens genuine biological follicle vitality instead of chemically forcing temporary vasodilation.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#0E0E11] border-b border-zinc-800/80 text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold text-[#E5B869] uppercase tracking-[0.25em] mb-2 block">
            The Men’s Trichology Benchmark
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight">
            Hair Loss & Scalp Thinning Can Be Stopped
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base font-light mt-3">
            Morkins combines pharmaceutical-grade botanical 5α-reductase inhibitors with liposomal micro-caffeine, stimulating dormant follicles without shedding rebounds.
          </p>
        </div>

        {/* Matrix Table (Charcoal/Obsidian Dark Luxury) */}
        <div className="bg-zinc-950 rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900 text-xs font-bold uppercase tracking-wider text-zinc-300">
                  <th className="py-4 px-6 w-2/5">Formulation Standard</th>
                  <th className="py-4 px-6 text-center text-[#E5B869] bg-[#E5B869]/10 font-serif text-sm">
                    💈 Morkins Scalp Labs
                  </th>
                  <th className="py-4 px-6 text-center text-zinc-500">Generic Drug Brands</th>
                  <th className="py-4 px-6 text-zinc-400">Why It Matters</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-xs sm:text-sm">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-zinc-900/50 transition-colors">
                    <td className="py-4 px-6 font-bold text-white">{row.standard}</td>
                    <td className="py-4 px-6 text-center bg-[#E5B869]/5 font-bold text-[#E5B869]">
                      {row.morkins ? (
                        <span className="inline-flex items-center gap-1.5 text-black bg-[#E5B869] px-3 py-1 rounded-full text-xs font-extrabold shadow-sm">
                          <Check className="w-3.5 h-3.5" /> Bio-Active
                        </span>
                      ) : '—'}
                    </td>
                    <td className="py-4 px-6 text-center text-zinc-500 font-mono">
                      {typeof row.others === 'boolean' ? (row.others ? '✓' : '✕') : row.others}
                    </td>
                    <td className="py-4 px-6 text-zinc-400 font-light text-xs leading-relaxed">{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
