import { useState, useEffect } from 'react';
import BestSellersHero from './BestSellersHero';
import BestSellersGrid from './BestSellersGrid';
import BestSellersReviews from './BestSellersReviews';
import BestSellersHighlights from './BestSellersHighlights';
import BestSellersFAQ from './BestSellersFAQ';
import BestSellersQuickView from './BestSellersQuickView';
import type { ProductExtended } from '../products/data/products';

interface BestSellersPageProps {
  onAddToCart: (product: { id: number; name: string; price: number; img: string }, openCart?: boolean) => void;
}

export default function BestSellersPage({ onAddToCart }: BestSellersPageProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<ProductExtended | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenQuickView = (product: ProductExtended) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  return (
    <div className="min-h-screen bg-[#F2F5F8] text-[#0B1A28] selection:bg-[#AFD971] selection:text-[#0B1A28]">
      {/* ── PART 1: EDITORIAL BEST SELLERS HERO (BestSellersHero) ── */}
      {/* Visual luxury header with award accolades and signature curation intro */}
      <BestSellersHero />

      {/* ── PART 2: FILTERABLE BEST SELLERS GRID & QUICK VIEW (BestSellersGrid) ── */}
      {/* Dynamic catalog grid with category filters, badge overlays, and 1-click Add to Cart */}
      <BestSellersGrid
        onAddToCart={onAddToCart}
        onOpenQuickView={handleOpenQuickView}
      />

      {/* ── PART 3: VIP VERIFIED CUSTOMER REVIEWS (BestSellersReviews) ── */}
      {/* 5-star ratings breakdown, patron photos, and verified efficacy feedback */}
      <BestSellersReviews onAddToCart={onAddToCart} />

      {/* ── PART 4: BOTANICAL STANDARD & CRAFTSMANSHIP (BestSellersHighlights) ── */}
      {/* Cold-pressed extraction methods, clean formulation certifications, and lab testing standards */}
      <BestSellersHighlights />

      {/* ── PART 5: FREQUENTLY ASKED QUESTIONS & CONCIERGE (BestSellersFAQ) ── */}
      {/* Accordion FAQ answering common questions about usage routines, shelf life, and skin suitability */}
      <BestSellersFAQ />

      {/* ── PART 6: MODAL QUICK-VIEW POPUP (BestSellersQuickView) ── */}
      {/* Interactive modal for rapid product inspection, size selection, and instant bag addition */}
      <BestSellersQuickView
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={handleCloseQuickView}
        onAddToCart={onAddToCart}
      />
    </div>
  );
}
