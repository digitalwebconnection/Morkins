import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  FlaskConical,
  ArrowRight,
  Check,
  ShoppingBag,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS_EXTENDED, getProductUrl } from '../../products/data/products';

interface SkinCareBioActivesProps {
  onAddToCart: (
    product: { id: number; name: string; price: number; discountPrice?: number; img: string },
    openCart?: boolean
  ) => void;
}

interface BioActive {
  id: string;
  category: 'all' | 'glow' | 'barrier' | 'longevity';
  name: string;
  scientificName: string;
  origin: string;
  potency: string;
  molecularWeight: string;
  extraction: string;
  targetLayer: string;
  cellularAction: string;
  clinicalStat: {
    value: string;
    label: string;
  };
  synergyWith: string;
  featuredProductId: number;
  theme: {
    accent: string;
    lightBg: string;
    badgeBg: string;
    border: string;
    glow: string;
  };
}

const BIO_ACTIVES: BioActive[] = [
  {
    id: 'centella',
    category: 'barrier',
    name: 'Cold Bio-Fermented Centella',
    scientificName: 'Centella Asiatica (Madagascar)',
    origin: 'Madagascan Highland Valleys',
    potency: '99.4% Bio-Active Madecassoside',
    molecularWeight: 'Micro-Lipid Fractionated',
    extraction: 'Zero-Heat Bio-Fermentation (<38°C)',
    targetLayer: 'Stratum Corneum & Dermal Basal',
    cellularAction: 'Synthesizes structural Filaggrin protein, rapidly fusing compromised lipid bilayers to reverse redness and seal trans-epidermal moisture loss.',
    clinicalStat: {
      value: '+94.8%',
      label: 'Epidermal Barrier Restoration in 7 Days',
    },
    synergyWith: 'Triple-Lipid Ceramides & Phytosphingosine',
    featuredProductId: 2,
    theme: {
      accent: '#12602F',
      lightBg: 'bg-emerald-50/70',
      badgeBg: 'bg-emerald-100/80 text-emerald-900 border-emerald-200',
      border: 'border-emerald-200/80 hover:border-emerald-500/60',
      glow: 'shadow-emerald-900/10',
    },
  },
  {
    id: 'hyaluronic',
    category: 'glow',
    name: '5D Multi-Weight Hyaluronate',
    scientificName: 'Sodium Hyaluronate Crosspolymer Complex',
    origin: 'Fermented Botanical Glucose',
    potency: '5 Molecular Weights (2,000kDa to 5kDa)',
    molecularWeight: 'Multi-Depth Dual Spectrum',
    extraction: 'Enzymatic Bio-Synthesis',
    targetLayer: 'Multi-Layer (Surface to Deep Derm)',
    cellularAction: 'Ultra-low 5kDa micro-chains penetrate the deepest dermis for cellular plumping, while high molecular weight chains create a luminous, breathable glass shield.',
    clinicalStat: {
      value: '+98.4%',
      label: 'Instant 24-Hour Hydration Lock',
    },
    synergyWith: 'Wild Kakadu Plum Vitamin C',
    featuredProductId: 4,
    theme: {
      accent: '#0284C7',
      lightBg: 'bg-sky-50/70',
      badgeBg: 'bg-sky-100/80 text-sky-900 border-sky-200',
      border: 'border-sky-200/80 hover:border-sky-500/60',
      glow: 'shadow-sky-900/10',
    },
  },
  {
    id: 'bakuchiol',
    category: 'longevity',
    name: 'Cold-Pressed Phyto-Retinal & Bakuchiol',
    scientificName: 'Bakuchiol 2.0% + Phyto-Retinoid',
    origin: 'Psoralea Corylifolia Wild Seeds',
    potency: '2.0% Active Bio-Retinoid Complex',
    molecularWeight: 'Lipid-Soluble Trans-Carrier',
    extraction: 'Supercritical CO2 Cold Extraction',
    targetLayer: 'Cellular Basal Layer & Fibroblasts',
    cellularAction: 'Triggers Type I & III collagen synthesis and accelerates 28-day cellular turnover at retinal strength with zero peeling, redness, or photosensitivity.',
    clinicalStat: {
      value: '+86.2%',
      label: 'Fibroblast Cellular Turnover Speed',
    },
    synergyWith: 'Organic Cold-Pressed Rosehip Seed Oil',
    featuredProductId: 8,
    theme: {
      accent: '#7C3AED',
      lightBg: 'bg-purple-50/70',
      badgeBg: 'bg-purple-100/80 text-purple-900 border-purple-200',
      border: 'border-purple-200/80 hover:border-purple-500/60',
      glow: 'shadow-purple-900/10',
    },
  },
  {
    id: 'vitaminc',
    category: 'glow',
    name: 'Wild Kakadu Plum 20% Vitamin C',
    scientificName: 'Terminalia Ferdinandiana Bio-Extract',
    origin: 'Australian Pristine Outback',
    potency: '100x Vitamin C Concentration vs Orange',
    molecularWeight: 'Bio-Chelated Translucent Active',
    extraction: 'Sub-Zero Cryo-Bio Preservation',
    targetLayer: 'Melanocyte Layer & Upper Epidermis',
    cellularAction: 'Suppresses tyrosinase enzyme activity to fade persistent post-inflammatory marks, neutralizes environmental free-radicals, and ignites prismatic glass clarity.',
    clinicalStat: {
      value: '-78.6%',
      label: 'Visible Hyperpigmentation & Dark Spots',
    },
    synergyWith: 'Glutathione & Bio-Active Niacinamide',
    featuredProductId: 1,
    theme: {
      accent: '#D97706',
      lightBg: 'bg-amber-50/70',
      badgeBg: 'bg-amber-100/80 text-amber-900 border-amber-200',
      border: 'border-amber-200/80 hover:border-amber-500/60',
      glow: 'shadow-amber-900/10',
    },
  },
  {
    id: 'ceramides',
    category: 'barrier',
    name: 'Tri-Ceramides (NP, AP, EOP)',
    scientificName: 'Biomimetic Phytosphingosine Lipids',
    origin: 'Non-GMO Plant-Derived Ceramides',
    potency: 'Identical 3:1:1 Skin Lipid Ratio',
    molecularWeight: 'Biomimetic Lipid Bilayer',
    extraction: 'High-Purity Bio-Identical Fractionation',
    targetLayer: 'Intercellular Stratum Corneum Matrix',
    cellularAction: 'Rebuilds the biological "brick-and-mortar" lipid sheath, sealing micro-fissures and shielding the dermis against environmental irritants and pollutants.',
    clinicalStat: {
      value: '+92.1%',
      label: 'Resistance to Micro-Redness & Irritation',
    },
    synergyWith: 'Centella Asiatica & Plant Squalane',
    featuredProductId: 11,
    theme: {
      accent: '#059669',
      lightBg: 'bg-emerald-50/70',
      badgeBg: 'bg-emerald-100/80 text-emerald-900 border-emerald-200',
      border: 'border-emerald-200/80 hover:border-emerald-500/60',
      glow: 'shadow-emerald-900/10',
    },
  },
  {
    id: 'algae',
    category: 'longevity',
    name: 'Arctic Glacial Algae Ferment',
    scientificName: 'Chlamydomonas Nivalis Bio-Isolate',
    origin: 'Glacial Alpine Ice Sheets',
    potency: 'High-Concentration Extremophile Peptides',
    molecularWeight: 'Ultra-Fine Cellular Peptide Chains',
    extraction: 'Cryophilic Cold Fermentation',
    targetLayer: 'Mitochondrial Energy Network',
    cellularAction: 'Stimulates cellular Klotho longevity factors and revives ATP mitochondrial energy, restoring youthful elasticity and radiant dermal bounce.',
    clinicalStat: {
      value: '+91.4%',
      label: 'Skin Firmness & Elastic Rebound',
    },
    synergyWith: 'Multi-Molecular Hyaluronic Acid',
    featuredProductId: 6,
    theme: {
      accent: '#0D9488',
      lightBg: 'bg-teal-50/70',
      badgeBg: 'bg-teal-100/80 text-teal-900 border-teal-200',
      border: 'border-teal-200/80 hover:border-teal-500/60',
      glow: 'shadow-teal-900/10',
    },
  },
];

export default function SkinCareBioActives({ onAddToCart }: SkinCareBioActivesProps) {
  const [activeModalId, setActiveModalId] = useState<string | null>(null);
  const filteredActives = BIO_ACTIVES;

  const modalActive = activeModalId ? BIO_ACTIVES.find(a => a.id === activeModalId) : null;
  const modalProduct = modalActive ? PRODUCTS_EXTENDED.find(p => p.id === modalActive.featuredProductId) : null;

  return (
    <section className="py-10 sm:py-16 bg-[#FAFAF8] text-[#162820] relative overflow-hidden border-b border-zinc-200/80 select-none">

      {/* ── Background Aesthetics & Ambient Aura Shadows ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-125 bg-linear-to-r from-emerald-200/35 via-teal-100/25 to-amber-200/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -top-32 right-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] bg-size-[24px_24px] opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/90 text-emerald-800 text-xs font-bold uppercase tracking-widest shadow-xs">
            <FlaskConical className="w-3.5 h-3.5 text-emerald-600" />
            <span>Apothecary Science • Bio-Active Molecule Vault</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-slate-900 font-normal tracking-tight">
            Raw Living Actives.{' '}
            <span className="italic font-bold text-emerald-800 block sm:inline">
              Pure Cellular Potency.
            </span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
            Every Morkins botanical elixir is cold-extracted under 38°C to ensure 100% enzyme vitality,
            zero lipid degradation, and clinical-grade cellular penetration.
          </p>
        </div>

        {/* ── Bio-Active Cards Grid with Elevated Background Shadows ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredActives.map((active) => {
            const product = PRODUCTS_EXTENDED.find(p => p.id === active.featuredProductId);
            return (
              <div key={active.id} className="relative group">
                {/* Dynamic Ambient Backlight Glow behind card */}
                <div
                  className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl pointer-events-none"
                  style={{ backgroundColor: `${active.theme.accent}22` }}
                />

                <motion.div
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className={`relative bg-linear-to-b from-white via-white to-[#FBFBF9] rounded-2xl p-6 sm:p-7 border ${active.theme.border} shadow-[0_10px_30px_-5px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_22px_45px_-10px_rgba(18,96,47,0.18),0_10px_20px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden h-full`}
                >
                  {/* Top Subtle Tint Gradient Strip */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 ${active.theme.lightBg} border-b ${active.theme.border}`} />

                  <div>
                    {/* Top Metadata Badges */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${active.theme.badgeBg} shadow-2xs`}>
                        <Sparkles className="w-3 h-3" />
                        {active.potency}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {active.molecularWeight}
                      </span>
                    </div>

                    {/* Active Name & Scientific Origin */}
                    <h3 className="font-serif text-xl sm:text-2xl text-slate-900 font-bold tracking-tight mb-1 group-hover:text-emerald-800 transition-colors">
                      {active.name}
                    </h3>
                    <p className="text-xs text-slate-500 italic font-mono mb-4">
                      {active.scientificName}
                    </p>

                    {/* Action Description */}
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-5">
                      {active.cellularAction}
                    </p>

                    {/* Clinical Proof Box with Inner Depth */}
                    <div className={`p-3.5 rounded-xl ${active.theme.lightBg} border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] mb-6`}>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold font-mono tracking-tight text-slate-900">
                          {active.clinicalStat.value}
                        </span>
                        <span className="text-[11px] text-slate-600 font-medium leading-tight">
                          {active.clinicalStat.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Synergy & Action Footer */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setActiveModalId(active.id)}
                      className="text-xs font-bold text-slate-700 hover:text-emerald-700 flex items-center gap-1.5 transition-colors cursor-pointer group/btn"
                    >
                      <span>View Molecular Science</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>

                    {product && (
                      <button
                        onClick={() => onAddToCart(product, true)}
                        className="px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-emerald-800 text-white text-[11px] font-bold tracking-wider uppercase transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-0.5 flex items-center gap-1.5 cursor-pointer shrink-0"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Shop ${(product.discountPrice || product.price).toFixed(0)}</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>

      {/* ── Interactive Molecular Science Details Modal ── */}
      <AnimatePresence>
        {modalActive && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalId(null)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 sm:p-8 bg-slate-900 text-white relative">
                <button
                  onClick={() => setActiveModalId(null)}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-[#AFD971] text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3 h-3" />
                  <span>{modalActive.potency}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-1">
                  {modalActive.name}
                </h3>
                <p className="text-xs text-slate-300 font-mono italic">
                  {modalActive.scientificName} • Origin: {modalActive.origin}
                </p>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                    Biological Cellular Mechanism
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed font-light">
                    {modalActive.cellularAction}
                  </p>
                </div>

                {/* Science Matrix Breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Extraction</span>
                    <span className="text-xs font-semibold text-slate-900">{modalActive.extraction}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Target Depth</span>
                    <span className="text-xs font-semibold text-slate-900">{modalActive.targetLayer}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 col-span-2 sm:col-span-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Synergy Pair</span>
                    <span className="text-xs font-semibold text-slate-900">{modalActive.synergyWith}</span>
                  </div>
                </div>

                {/* Clinical Validation Highlight */}
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-700 shrink-0" />
                  <div>
                    <span className="text-sm font-bold text-emerald-950 block">
                      {modalActive.clinicalStat.value} {modalActive.clinicalStat.label}
                    </span>
                    <span className="text-[11px] text-emerald-800">
                      Validated in randomized 28-day double-blind clinical trials.
                    </span>
                  </div>
                </div>

                {/* Featured Product Card in Modal */}
                {modalProduct && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={modalProduct.img}
                        alt={modalProduct.name}
                        className="w-14 h-14 object-cover rounded-xl border border-slate-200 shadow-2xs shrink-0"
                      />
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-emerald-700 font-bold block">
                          Formulated In
                        </span>
                        <h5 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                          {modalProduct.name}
                        </h5>
                        <span className="text-xs text-slate-600 font-mono">
                          ${(modalProduct.discountPrice || modalProduct.price).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        to={getProductUrl(modalProduct)}
                        className="px-3 py-2 rounded-full border border-slate-300 text-xs font-bold text-slate-700 hover:text-slate-900 hover:border-slate-400 transition-colors"
                      >
                        Details
                      </Link>
                      <button
                        onClick={() => {
                          onAddToCart(modalProduct, true);
                          setActiveModalId(null);
                        }}
                        className="px-4 py-2 rounded-full bg-slate-900 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 shadow-sm cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
