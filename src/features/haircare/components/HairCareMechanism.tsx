import { useState } from 'react';

const HAIR_MECHANISMS = {
  cause: {
    title: 'The Biological Triggers of Scalp Thinning',
    subtitle: 'Why hair follicles miniaturize and shed prematurely',
    points: [
      { id: 'dht', label: '5α-Reductase & DHT Binding', desc: 'Circulating testosterone converts to dihydrotestosterone (DHT), binding to androgen receptors on dermal papillae cells.' },
      { id: 'calcification', label: 'Perifollicular Calcification', desc: 'Chronic tension and micro-inflammation restrict blood vessels feeding the follicle bulb, choking off vital amino acids.' },
      { id: 'miniaturization', label: 'Progressive Follicle Miniaturization', desc: 'Anagen (growth) cycle shrinks from 5 years to 6 months, producing progressively thinner, unpigmented vellus hairs.' },
      { id: 'microbiome', label: 'Scalp Sebum Oxidation', desc: 'Malassezia yeast overgrowth and oxidized squalene build-up suffocate roots, triggering chronic itchy flaking.' },
    ],
  },
  impact: {
    title: 'Observable Trichology Progression',
    subtitle: 'What happens across the Norwood and Ludwig hair scales',
    points: [
      { id: 'receding', label: 'Receding Temporal Peaks & Crown', desc: 'Androgen-sensitive follicles along the frontal hairline enter premature telogen (resting/shedding) phase.' },
      { id: 'shower_fall', label: 'Increased Daily Shedding (>150 Hairs)', desc: 'Hair bulb anchor points weaken as connective tissue sheath degrades under hormonal stress.' },
      { id: 'loss_diameter', label: '50% Loss in Shaft Diameter', desc: 'Individual hair strands lose their keratin cortex density, becoming limp, fragile, and prone to mechanical breakage.' },
      { id: 'fibrosis', label: 'Dermal Follicle Fibrosis', desc: 'Untreated dormant follicles undergo fibrous tissue hardening, permanently closing pore openings if unaddressed.' },
    ],
  },
  solution: {
    title: 'How Morkins Trichology Bio-Actives Target & Regrow',
    subtitle: 'High-potency botanical actives with zero drug side-effects',
    points: [
      { id: 'saw_palmetto', label: 'Natural 5α-Reductase Blockers', desc: 'Cold-pressed Saw Palmetto and Pumpkin Seed phytosterols block up to 88% of local DHT receptor binding.' },
      { id: 'caffeine', label: 'Micro-Encapsulated Caffeine Delivery', desc: 'Liposomal caffeine penetrates deep into the follicle matrix within 2 minutes, counteracting DHT-induced dormancy.' },
      { id: 'redensyl', label: 'Redensyl & Procapil Stem Activators', desc: 'Re-activates dormant ORSc bulge stem cells, boosting active hair growth division rate by +214%.' },
      { id: 'rosemary', label: 'Cold-Pressed Rosemary & Cedarwood', desc: 'Clinically proven equivalent to 2% minoxidil in microcirculation stimulation, with zero scalp burning or dry flaking.' },
    ],
  },
};

export default function HairCareMechanism() {
  const [activeTab, setActiveTab] = useState<'cause' | 'impact' | 'solution'>('cause');

  return (
    <section className="py-16 sm:py-24 bg-[#09090B] border-b border-zinc-800/80 text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#E5B869] uppercase tracking-[0.25em] mb-2 block">
            Follicle Trichology Mechanics
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight">
            Understanding Your Hair Loss Pathway
          </h2>
          <p className="text-zinc-400 text-sm font-light mt-2">
            Select a stage to explore the root causes of male hair thinning and how Morkins restores follicle vitality.
          </p>
        </div>

        {/* 3 Mechanism Switcher Tabs (Obsidian Glass) */}
        <div className="flex justify-center max-w-xl mx-auto mb-10">
          <div className="grid grid-cols-3 p-1.5 bg-zinc-900 rounded-2xl border border-zinc-800 shadow-xl w-full">
            {[
              { id: 'cause', label: '01. Cause', desc: 'DHT & Enzymes' },
              { id: 'impact', label: '02. Impact', desc: 'Follicle Miniaturization' },
              { id: 'solution', label: '03. How We Target', desc: 'Targeted Bio-Actives' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer text-center ${
                  activeTab === tab.id
                    ? 'bg-linear-to-r from-[#E5B869] to-[#D97706] text-black font-extrabold shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <span className="block">{tab.label}</span>
                <span className="text-[9px] opacity-80 font-normal block hidden sm:block">{tab.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Cards */}
        <div className="bg-zinc-950 rounded-3xl p-6 sm:p-10 border border-zinc-800 shadow-2xl">
          <div className="mb-6 pb-4 border-b border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-serif text-2xl text-white font-bold">
                {HAIR_MECHANISMS[activeTab].title}
              </h3>
              <p className="text-xs text-zinc-400 font-light mt-0.5">
                {HAIR_MECHANISMS[activeTab].subtitle}
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold uppercase text-[#E5B869] bg-zinc-900 px-3 py-1 rounded-full border border-[#E5B869]/30">
              Phase {activeTab === 'cause' ? '1 of 3' : activeTab === 'impact' ? '2 of 3' : '3 of 3'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {HAIR_MECHANISMS[activeTab].points.map((pt, i) => (
              <div
                key={pt.id}
                className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-[#E5B869]/50 transition-all space-y-2 shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#E5B869]/20 text-[#E5B869] text-xs font-mono font-bold flex items-center justify-center">
                    0{i + 1}
                  </span>
                  <h4 className="font-sans text-sm font-bold text-white">
                    {pt.label}
                  </h4>
                </div>
                <p className="text-xs text-zinc-400 font-light leading-relaxed pl-8">
                  {pt.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
