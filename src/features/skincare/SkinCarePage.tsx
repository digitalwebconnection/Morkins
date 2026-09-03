import SkinCareHero from './components/SkinCareHero';
import SkinCareMatrix from './components/SkinCareMatrix';
import SkinCareConcierge from './components/SkinCareConcierge';
import SkinCareTransformation from './components/SkinCareTransformation';
import SkinCareFAQ from './components/SkinCareFAQ';

interface SkinCarePageProps {
  onAddToCart: (product: { id: number; name: string; price: number; discountPrice?: number; img: string }, openCart?: boolean) => void;
}

export default function SkinCarePage({ onAddToCart }: SkinCarePageProps) {
  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#2C1810] font-sans antialiased overflow-hidden selection:bg-[#AFD971] selection:text-[#2C1810]">

      {/* ── 1. GLOWING EDITORIAL HERO WITH CLINICAL STAT PILLARS ── */}
      <SkinCareHero />

      {/* ── 2. CLINICAL SUPERIORITY BENCHMARK MATRIX (Morkins vs Others) ── */}
      <SkinCareMatrix />

      {/* ── 4. INTERACTIVE SKIN CONCERN & ROUTINE CONCIERGE ── */}
      <SkinCareConcierge onAddToCart={onAddToCart} />

      {/* ── 5. QUANTIFIED 28-DAY CLINICAL TRANSFORMATION & BEFORE/AFTER LENS ── */}
      <SkinCareTransformation />

      {/* ── 6. APOTHECARY KNOWLEDGE BASE & 30-DAY GUARANTEE ── */}
      <SkinCareFAQ />

    </div>
  );
}
