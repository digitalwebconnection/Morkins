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
      {/* 1. Clean Editorial Hero Section */}
      <NewArrivalsHero />
      
      {/* 2. Interactive Compound & Formula Explorer */}
      <NewArrivalsInteractive onAddToCart={onAddToCart} />

      {/* 3. New Arrivals Batch Release Grid */}
      <NewArrivalsGrid onAddToCart={onAddToCart} />

      {/* 4. VIP Private Release Reservation */}
      <NewArrivalsNewsletter />
    </div>
  );
}
