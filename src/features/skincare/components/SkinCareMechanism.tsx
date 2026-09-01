import { useState } from 'react';
import { Sparkles, Activity, Leaf, ArrowRight } from 'lucide-react';

const SKIN_MECHANISMS = {
  cause: {
    title: 'The Root Biological Drivers',
    subtitle: 'Why cellular barrier function and skin luminosity decline over time',
    phaseNumber: '01',
    badge: 'Phase 1 • Cellular Triggers',
    points: [
      {
        id: 'uv',
        label: 'Solar UV & Photo-Oxidative Stress',
        desc: 'UV-A & UV-B radiation penetrates deep into dermis, fragmenting structural collagen fibers and exhausting endogenous antioxidant reserves.',
        metric: '70% of premature skin aging',
      },
      {
        id: 'tewl',
        label: 'Trans-Epidermal Water Loss (TEWL)',
        desc: 'Depleted ceramides and intercellular lipid cement allow vital cellular hydration to evaporate rapidly into dry ambient air.',
        metric: 'Up to 300ml water lost daily',
      },
      {
        id: 'glycation',
        label: 'Cellular Glycation & Cross-Linking',
        desc: 'Metabolic sugar molecules bind with elastin proteins, hardening tissue structure and creating stubborn dullness and fine micro-creping.',
        metric: 'Stiffens collagen fibers',
      },
      {
        id: 'pollution',
        label: 'Urban Micro-Particulates (PM2.5)',
        desc: 'Microscopic atmospheric heavy metals infiltrate follicular openings, triggering chronic micro-inflammatory cytokine cascades.',
        metric: 'Triggers reactive redness',
      },
    ],
  },
  impact: {
    title: 'Observable Cellular Manifestation',
    subtitle: 'What happens across the 5 structural layers of your epidermis',
    phaseNumber: '02',
    badge: 'Phase 2 • Dermal Breakdown',
    points: [
      {
        id: 'thinning',
        label: 'Stratum Corneum Lipid Depletion',
        desc: 'Compromised outer lipid bilayer exposes sensitive epidermal nerve endings, causing immediate stinging, flaking, and rough texture.',
        metric: 'Leaves skin reactive',
      },
      {
        id: 'pigment',
        label: 'Melanocyte Hyper-Stimulation',
        desc: 'Localized micro-inflammation prompts overactive melanocytes to cluster pigment irregularly, forming dark spots and uneven tone.',
        metric: 'Stubborn discoloration',
      },
      {
        id: 'slackening',
        label: 'Fibroblast Synthesis Slowdown',
        desc: 'Dermal fibroblasts produce 1.5% less collagen each year past age 25, leading to softened facial contour firmness and fine lines.',
        metric: '-15% collagen per decade',
      },
      {
        id: 'dullness',
        label: 'Sluggish Keratinocyte Turnover',
        desc: 'Natural cell renewal cycle slows from 28 to 45+ days, leaving an opaque layer of dead keratinocytes that deflects ambient light.',
        metric: 'Loss of natural glow',
      },
    ],
  },
  solution: {
    title: 'How Morkins Bio-Actives Target & Repair',
    subtitle: 'Cold-pressed botanical pharmacology calibrated for deep dermal absorption',
    phaseNumber: '03',
    badge: 'Phase 3 • Botanical Restoration',
    points: [
      {
        id: 'peptides',
        label: 'Signal Peptides & Encapsulated Bakuchiol',
        desc: 'Stimulates fibroblast collagen synthesis and accelerates cell turnover with zero irritation, redness, or photosensitivity.',
        metric: '+82% visible firmness',
      },
      {
        id: 'ceramides',
        label: 'Tri-Ceramide 1:3:6 Biomimetic Matrix',
        desc: 'Bio-identical lipids fuse directly into cellular lipid gaps to permanently seal moisture and halt trans-epidermal evaporation.',
        metric: '+94% moisture lock in 14d',
      },
      {
        id: 'centella',
        label: 'Sub-Critical Centella Madecassoside',
        desc: 'High-potency triterpenic fractions quench inflammatory cytokines (IL-6), reducing visible micro-capillary redness by 48%.',
        metric: '-48% capillary redness',
      },
      {
        id: 'antioxidants',
        label: 'Cold-Pressed Polyphenol Shield',
        desc: 'Unheated Wild Rosehip & Marula oils neutralize 98% of free radicals before lipid peroxidation can begin.',
        metric: '98% free radical defense',
      },
    ],
  },
};

export default function SkinCareMechanism() {
  const [activeTab, setActiveTab] = useState<'cause' | 'impact' | 'solution'>('cause');
  const currentMechanism = SKIN_MECHANISMS[activeTab];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F0] border-b border-[#EAE3D2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#8C6221] uppercase tracking-[0.25em] mb-2 block">
            Dermal Cell Biology & Pathway
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#123624] font-normal leading-tight">
            The Science of Skin Aging & Botanical Repair
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-light mt-3">
            Understand how environmental oxidative stress degrades the epidermal barrier—and how our cold bio-actives restore radiant cellular health.
          </p>
        </div>

        {/* 3-Step Phase Switcher */}
        <div className="flex justify-center max-w-2xl mx-auto mb-10">
          <div className="grid grid-cols-3 p-1.5 bg-white rounded-2xl border border-[#DDD3C1] shadow-2xs w-full gap-1">
            {[
              { id: 'cause', label: '01. The Cause', sub: 'Cellular Triggers' },
              { id: 'impact', label: '02. The Breakdown', sub: 'Dermal Layers' },
              { id: 'solution', label: '03. The Repair', sub: 'Bio-Active Solution' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer text-center ${activeTab === tab.id
                  ? 'bg-[#12602F] text-white shadow-md'
                  : 'text-stone-600 hover:text-[#12602F] hover:bg-[#FAF8F4]'
                  }`}
              >
                <span className="block font-bold">{tab.label}</span>
                <span className="text-[10px] opacity-80 font-normal hidden sm:block mt-0.5">{tab.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Stage */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#DDD3C1] shadow-sm space-y-8">

          {/* Header Banner of Tab */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#EAE3D2] gap-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8C6221] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                {currentMechanism.badge}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#123624] font-bold mt-2">
                {currentMechanism.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-light mt-1">
                {currentMechanism.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2 bg-[#FAF8F4] px-4 py-2 rounded-xl border border-[#E5DEC9] shrink-0">
              <Activity className="w-4 h-4 text-[#12602F]" />
              <span className="text-xs font-bold text-stone-700">Dermal Pathway Analysis</span>
            </div>
          </div>

          {/* Points Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentMechanism.points.map((pt, i) => (
              <div
                key={pt.id}
                className="p-6 rounded-2xl bg-[#FAF8F4] border border-[#E5DEC9] hover:border-[#12602F]/40 transition-all space-y-3 shadow-2xs group hover:bg-white"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-full bg-[#12602F]/10 text-[#12602F] text-xs font-mono font-bold flex items-center justify-center">
                      0{i + 1}
                    </span>
                    <h4 className="font-sans text-sm font-bold text-[#1C2E1A] group-hover:text-[#12602F] transition-colors">
                      {pt.label}
                    </h4>
                  </div>
                </div>

                <p className="text-xs text-stone-600 font-light leading-relaxed pl-9">
                  {pt.desc}
                </p>

                <div className="pl-9 pt-1">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8C6221] bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                    <Sparkles className="w-3 h-3 text-[#8C6221]" />
                    {pt.metric}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Action / CTA Banner */}
          <div className="p-5 rounded-2xl bg-linear-to-r from-[#123624] to-[#1C603E] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Leaf className="w-6 h-6 text-[#AFD971] shrink-0" />
              <div>
                <h4 className="font-serif text-base font-bold text-white">Target Your Cellular Pathway</h4>
                <p className="text-xs text-stone-300 font-light">Explore our doctor-formulated cold botanical treatments.</p>
              </div>
            </div>

            <a
              href="#skincare-catalog"
              className="px-6 py-2.5 rounded-full bg-[#AFD971] hover:bg-[#C2E88F] text-[#123624] text-xs font-bold uppercase tracking-widest transition-all shadow-sm text-center shrink-0 flex items-center justify-center gap-2"
            >
              <span>Explore Treatments</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
