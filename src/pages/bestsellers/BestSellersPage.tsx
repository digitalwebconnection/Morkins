import { useEffect } from 'react';
import BestSellersHero from './BestSellersHero';
import BestSellersShowcase from './BestSellersShowcase';
import BestSellersGrid from './BestSellersGrid';
import BestSellersHighlights from './BestSellersHighlights';
import BestSellersFAQ from './BestSellersFAQ';

interface BestSellersPageProps {
  onAddToCart: (product: { id: number; name: string; price: number; img: string }, openCart?: boolean) => void;
}

export default function BestSellersPage({ onAddToCart }: BestSellersPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#FCFBF8]">
      {/* 1. Hero Section */}
      <BestSellersHero />

      {/* 2. #1 Product Showcase Feature */}
      <BestSellersShowcase onAddToCart={onAddToCart} />

      {/* 3. Filterable Product Grid */}
      <BestSellersGrid onAddToCart={onAddToCart} />

      {/* 4. Brand Standards / Highlights */}
      <BestSellersHighlights />

      {/* 5. Frequently Asked Questions */}
      <BestSellersFAQ />
    </div>
  );
}
