import { useEffect } from 'react';
import NewArrivalsHero from './NewArrivalsHero';
import NewArrivalsInteractive from './NewArrivalsInteractive';
import NewArrivalsGrid from './NewArrivalsGrid';
import NewArrivalsNewsletter from './NewArrivalsNewsletter';

interface NewArrivalsPageProps {
  onAddToCart: (product: { id: number; name: string; price: number; img: string }, openCart?: boolean) => void;
}

export default function NewArrivalsPage({ onAddToCart }: NewArrivalsPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-white text-brand-dark">
      {/* ── PART 1: EDITORIAL RELEASE HERO (NewArrivalsHero) ── */}
      {/* Modern minimalist header introducing the newest clinical formulation drop */}
      <NewArrivalsHero />
      
      {/* ── PART 2: ACTIVE COMPOUND & FORMULA EXPLORER (NewArrivalsInteractive) ── */}
      {/* Interactive molecular map and ingredient breakdown with hotspot tooltips and direct add-to-cart */}
      <NewArrivalsInteractive onAddToCart={onAddToCart} />

      {/* ── PART 3: BATCH RELEASE CATALOG GRID (NewArrivalsGrid) ── */}
      {/* Cards displaying limited fresh releases, batch identifiers, availability, and cart triggers */}
      <NewArrivalsGrid onAddToCart={onAddToCart} />

      {/* ── PART 4: VIP PRIVATE BATCH RESERVATION (NewArrivalsNewsletter) ── */}
      {/* Early-access invitation box for upcoming limited botanical batches */}
      <NewArrivalsNewsletter />
    </div>
  );
}
