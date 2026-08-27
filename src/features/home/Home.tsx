import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import BannerSlider from "./BannerSlider";
import TopFeaturesBar from "./TopFeaturesBar";
import ProductGrid from "./ProductGrid";
import IngredientsSpotlight from "./IngredientsSpotlight";
import FeaturedProductSection from "./FeaturedProductSection";
import BestSellers from "./BestSellers";
import Testimonials from "./Testimonials";
import ImageFeed from "./ImageFeed";
import New from "./New";
import SkinQuiz from "./SkinQuiz";
import ClinicalStudy from "./ClinicalStudy";
import Newsletter from "./Newsletter";

interface HomeProps {
  onAddToCart: (
    product: { id: number; name: string; price: number; discountPrice?: number; img: string },
    openCart?: boolean,
  ) => void;
}

export default function Home({ onAddToCart }: HomeProps) {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <main>
      {/* ── PART 1: HERO PROMOTIONAL BANNER SLIDER ── */}
      {/* Auto-advancing luxury carousel showcasing seasonal releases & top collections */}
      <BannerSlider />

      {/* ── PART 2: TOP TRUST & VALUE PILLARS ── */}
      {/* Badges strip: Cash on Delivery, Free Delivery, 100% Authentic, 7 Days Replacement, 100% Safe Payments */}
      <TopFeaturesBar />

      {/* ── PART 3: BIOACTIVE INGREDIENTS SPOTLIGHT ── */}
      {/* Interactive scientific cards highlighting key botanical actives (Niacinamide, Retinol, Hyaluronic Acid, etc.) */}
      <IngredientsSpotlight />

      {/* ── PART 4: FRESH BATCH RELEASE & BRAND PHILOSOPHY ── */}
      {/* Curated showcase with batch numbers, limited botanical extractions, and core values */}
      <New />

      {/* ── PART 5: CORE PRODUCT CATALOG GRID ── */}
      {/* Multi-category quick-filter grid with direct Add-to-Cart integration */}
      <ProductGrid onAddToCart={onAddToCart} />

      {/* ── PART 6: INTERACTIVE SKIN DIAGNOSTIC QUIZ ── */}
      {/* 3-step personalized routine recommendation builder */}
      <SkinQuiz onAddToCart={onAddToCart} />

      {/* ── PART 7: SIGNATURE BEST SELLERS SPLIT SECTION ── */}
      {/* Split layout showcase featuring highest rated serums and moisturizers */}
      <BestSellers onAddToCart={onAddToCart} />

      {/* ── PART 8: CLINICAL EFFICACY & BEFORE/AFTER STUDIES ── */}
      {/* Real clinical dermatologist metrics, percentages, and comparative slider results */}
      <ClinicalStudy />

      {/* ── PART 9: PARALLAX FEATURED PRODUCT HERO ── */}
      {/* Visual focal showcase for high-impact hero products with ingredient breakdown */}
      <FeaturedProductSection />

      {/* ── PART 10: PATRON REVIEWS & TESTIMONIALS ── */}
      {/* Verified customer feedback with direct 1-click cart triggers */}
      <Testimonials onAddToCart={onAddToCart} />

      {/* ── PART 11: SANCTUARY NEWSLETTER SUBSCRIPTION ── */}
      {/* VIP early-access signup with instant discount incentives */}
      <Newsletter />

      {/* ── PART 12: COMMUNITY LIFESTYLE IMAGE FEED ── */}
      {/* Modern social gallery showing real patrons and aesthetics */}
      <ImageFeed />
    </main>
  );
}
