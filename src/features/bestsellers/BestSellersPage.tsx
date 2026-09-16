import { useEffect } from 'react';
import BestSellersHero from './BestSellersHero';
import BestSellersGrid from './BestSellersGrid';
import BestSellersReviews from './BestSellersReviews';
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
    <div className="min-h-screen bg-[#F2F5F8] text-[#0B1A28] selection:bg-[#AFD971] selection:text-[#0B1A28]">
      {/* ── PART 1: EDITORIAL BEST SELLERS HERO (BestSellersHero) ── */}
      <BestSellersHero />

      {/* ── PART 2: BEST SELLERS GRID (BestSellersGrid) ── */}
      <BestSellersGrid onAddToCart={onAddToCart} />

      {/* ── PART 3: VIP VERIFIED CUSTOMER REVIEWS (BestSellersReviews) ── */}
      <BestSellersReviews onAddToCart={onAddToCart} />

      {/* ── PART 4: BOTANICAL STANDARD & CRAFTSMANSHIP (BestSellersHighlights) ── */}
      <BestSellersHighlights />

      {/* ── PART 5: FREQUENTLY ASKED QUESTIONS & CONCIERGE (BestSellersFAQ) ── */}
      <BestSellersFAQ />
    </div>
  );
}
