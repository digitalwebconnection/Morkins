import HairCareHero from './components/HairCareHero';
import HairCareCatalog from './components/HairCareCatalog';
import HairCareKits from './components/HairCareKits';
import HairCareAdvisory from './components/HairCareAdvisory';
import HairCareFAQ from './components/HairCareFAQ';

interface HairCarePageProps {
  onAddToCart: (product: { id: number; name: string; price: number; discountPrice?: number; img: string }, openCart?: boolean) => void;
}

export default function HairCarePage({ onAddToCart }: HairCarePageProps) {
  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] font-sans antialiased overflow-hidden selection:bg-[#2C1810] selection:text-white">
      {/* ── 1. EDITORIAL HERO ── */}
      <HairCareHero />

      {/* ── 2. FULL FILTERABLE MEN'S HAIR CARE CATALOG ── */}
      <HairCareCatalog onAddToCart={onAddToCart} />

      {/* ── 3. TRICHOLOGY SURGEON ADVISORY PANEL ── */}
      <HairCareAdvisory />

      {/* ── 4. CURATED TRICHOLOGY GROWTH SYSTEMS ── */}
      <HairCareKits onAddToCart={onAddToCart} />

      {/* ── 5. TRICHOLOGY FAQ & 90-DAY GROWTH GUARANTEE ── */}
      <HairCareFAQ />
    </div>
  );
}
