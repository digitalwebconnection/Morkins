import SkinCareHero from './components/SkinCareHero';
import SkinCareConcierge from './components/SkinCareConcierge';
import SkinCareHerbarium from './components/SkinCareHerbarium';
import SkinCareMatrix from './components/SkinCareMatrix';
import SkinCareMechanism from './components/SkinCareMechanism';
import SkinCareKits from './components/SkinCareKits';
import SkinCareClinicalProof from './components/SkinCareClinicalProof';
import SkinCarePress from './components/SkinCarePress';
import SkinCareAdvisory from './components/SkinCareAdvisory';
import SkinCareCatalog from './components/SkinCareCatalog';
import SkinCareFAQ from './components/SkinCareFAQ';

interface SkinCarePageProps {
  onAddToCart: (product: { id: number; name: string; price: number; discountPrice?: number; img: string }, openCart?: boolean) => void;
}

export default function SkinCarePage({ onAddToCart }: SkinCarePageProps) {
  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#162820] font-sans antialiased overflow-hidden selection:bg-[#AFD971] selection:text-[#123624]">
      
   

      {/* ── 1. GLOWING EDITORIAL HERO WITH CLINICAL STAT PILLARS ── */}
      <SkinCareHero />

      {/* ── 2. INTERACTIVE SKIN CONCERN & ROUTINE CONCIERGE ── */}
      <SkinCareConcierge onAddToCart={onAddToCart} />

     

      {/* ── 4. CLINICAL SUPERIORITY BENCHMARK MATRIX (Morkins vs Others) ── */}
      <SkinCareMatrix />

      {/* ── 5. INTERACTIVE 3-PHASE DERMAL CELL MECHANISM ── */}
      <SkinCareMechanism />

      {/* ── 6. CURATED DIAGNOSTIC TREATMENT KITS ── */}
      <SkinCareKits onAddToCart={onAddToCart} />

      {/* ── 7. QUANTIFIED IN-VIVO CLINICAL PROOF & 28-DAY TIMELINE ── */}
      <SkinCareClinicalProof />

      {/* ── 8. HIGH-FASHION EDITORIAL PRESS & VERIFIED PATRON REVIEWS ── */}
      <SkinCarePress />

      {/* ── 9. DERMATOLOGIST & BIOCHEMIST CLINICAL ADVISORY BOARD ── */}
      <SkinCareAdvisory />
       {/* ── 3. APOTHECARY HERBARIUM & BIO-ACTIVE INGREDIENT VAULT ── */}
      <SkinCareHerbarium />

      {/* ── 10. COMPLETE FILTERABLE APOTHECARY SKIN CARE CATALOG ── */}
      <SkinCareCatalog onAddToCart={onAddToCart} />

      {/* ── 11. APOTHECARY KNOWLEDGE BASE & 30-DAY GUARANTEE ── */}
      <SkinCareFAQ />

    </div>
  );
}
