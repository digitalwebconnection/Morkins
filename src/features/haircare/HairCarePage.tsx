import HairCareHero from './components/HairCareHero';
import HairCareMatrix from './components/HairCareMatrix';
import HairCareMechanism from './components/HairCareMechanism';
import HairCareKits from './components/HairCareKits';
import HairCarePress from './components/HairCarePress';
import HairCareAdvisory from './components/HairCareAdvisory';
import HairCareCatalog from './components/HairCareCatalog';

interface HairCarePageProps {
  onAddToCart: (product: { id: number; name: string; price: number; discountPrice?: number; img: string }, openCart?: boolean) => void;
}

export default function HairCarePage({ onAddToCart }: HairCarePageProps) {
  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 font-sans antialiased overflow-hidden selection:bg-[#E5B869] selection:text-black">
      {/* ── 1. SLEEK OBSIDIAN & GOLD HERO ── */}
      <HairCareHero />

      {/* ── 2. CLINICAL TRICHOLOGY MATRIX (Morkins vs Generic) ── */}
      <HairCareMatrix />

      {/* ── 3. INTERACTIVE 3-PHASE HAIR LOSS MECHANISM ── */}
      <HairCareMechanism />

      {/* ── 4. CURATED TRICHOLOGY GROWTH SYSTEMS ── */}
      <HairCareKits onAddToCart={onAddToCart} />

      {/* ── 5. MEN'S LUXURY EDITORIAL PRESS QUOTES ── */}
      <HairCarePress />

      {/* ── 6. TRICHOLOGY SURGEON ADVISORY PANEL ── */}
      <HairCareAdvisory />

      {/* ── 7. FULL FILTERABLE MEN'S HAIR CARE CATALOG ── */}
      <HairCareCatalog onAddToCart={onAddToCart} />
    </div>
  );
}
