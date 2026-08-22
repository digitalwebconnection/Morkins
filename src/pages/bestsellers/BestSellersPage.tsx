import { useState, useEffect } from 'react';
import BestSellersHero from './BestSellersHero';
import BestSellersGrid from './BestSellersGrid';
import BestSellersClinicalComparison from './BestSellersClinicalComparison';
import BestSellersReviews from './BestSellersReviews';
import BestSellersHighlights from './BestSellersHighlights';
import BestSellersFAQ from './BestSellersFAQ';
import BestSellersQuickView from './BestSellersQuickView';
import BestSellersLiveTicker from './BestSellersLiveTicker';
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
    <div className="min-h-screen bg-[#FCFBF8] text-brand-dark selection:bg-[#AFD971] selection:text-[#1C331B]">
      {/* 1. Editorial Hero Section */}
      <BestSellersHero />      

      {/* 4. Complete Filterable Master Best Sellers Collection */}
      <BestSellersGrid
        onAddToCart={onAddToCart}
        onOpenQuickView={handleOpenQuickView}
      />

      {/* 5. Clinical Trial Before & After Comparison Slider */}
      <BestSellersClinicalComparison />

      {/* 6. VIP Verified Reviews & Rating Breakdown */}
      <BestSellersReviews />

      {/* 7. The Morkins Botanical Standard & Craftsmanship */}
      <BestSellersHighlights />

      {/* 8. Frequently Asked Questions & Concierge */}
      <BestSellersFAQ />

      {/* 9. Interactive Quick View Modal */}
      <BestSellersQuickView
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={handleCloseQuickView}
        onAddToCart={onAddToCart}
      />

      {/* 10. Live Social Proof Purchase Ticker */}
      <BestSellersLiveTicker />
    </div>
  );
}
