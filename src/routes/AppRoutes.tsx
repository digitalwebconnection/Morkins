import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import HomeRoute from './HomeRoute';
import ProductsRoute from './ProductsRoute';
import ProductDetailsRoute from './ProductDetailsRoute';
import SkinCareRoute from './SkinCareRoute';
import HairCareRoute from './HairCareRoute';
import BestSellersRoute from './BestSellersRoute';
import NewArrivalsRoute from './NewArrivalsRoute';
import AboutRoute from './AboutRoute';
import ProfileRoute from './ProfileRoute';
import BlogRoute from './BlogRoute';
import BlogDetailsRoute from './BlogDetailsRoute';
import SearchRoute from './SearchRoute';
import ResetPasswordRoute from './ResetPasswordRoute';
import OrderDetailsRoute from './OrderDetailsRoute';

// Support Routes
import FAQsRoute from './support/FAQsRoute';
import ReturnPolicyRoute from './support/ReturnPolicyRoute';
import PrivacyPolicyRoute from './support/PrivacyPolicyRoute';
import TermsRoute from './support/TermsRoute';
import ShippingPolicyRoute from './support/ShippingPolicyRoute';
import TrackOrderRoute from './support/TrackOrderRoute';
import ContactRoute from './support/ContactRoute';
import WhatsAppSupportRoute from './support/WhatsAppSupportRoute';

export default function AppRoutes() {
  const location = useLocation();

  // Scroll restoration: scroll to top on route change unless anchor hash exists
  useEffect(() => {
    if (!location.hash) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    }
  }, [location.pathname]);

  return (
    <Routes>
      {/* ── 1. HOME / LANDING PAGE ── (Hero slider, feature bar, ingredients spotlight, product showcase, quiz) */}
      <Route path="/" element={<HomeRoute />} />

      {/* ── 2. DEDICATED SKIN CARE & HAIR CARE EXPERIENCES ── */}
      {/* Women's Radiant Colorful Clinical Skin Care Experience */}
      <Route path="/skincare" element={<SkinCareRoute />} />
      <Route path="/women" element={<SkinCareRoute />} />
      {/* Men's Sleek Black & Brown Trichology Hair Care Experience */}
      <Route path="/haircare" element={<HairCareRoute />} />
      <Route path="/men" element={<HairCareRoute />} />

      {/* ── 3. PRODUCT CATALOG & DETAIL ── */}
      {/* Catalog Listing Page with multi-filter sidebar & sort controls */}
      <Route path="/products" element={<ProductsRoute />} />
      {/* Single Product Details Page with high-res gallery, angle switcher, specs, and reviews */}
      <Route path="/products/:id" element={<ProductDetailsRoute />} />

      {/* ── 3. BEST SELLERS CURATION ── (Award-winning formulas, customer favorites, quick view) */}
      <Route path="/bestsellers" element={<BestSellersRoute />} />

      {/* ── 4. NEW ARRIVALS & RELEASES ── (Interactive active compound explorer & batch drops) */}
      <Route path="/new-arrivals" element={<NewArrivalsRoute />} />

      {/* ── 5. ABOUT US / HERITAGE ── (Brand philosophy, mission, botanical ethics, evolution timeline, team) */}
      <Route path="/about" element={<AboutRoute />} />

      {/* ── 6. USER PROFILE & SANCTUARY VAULT ── (Order history, addresses, payment vault, rewards scratch card, 2FA) */}
      <Route path="/profile" element={<ProfileRoute />} />

      {/* ── 7. SEARCH & DISCOVERY ── (Live keyword search, instant suggestions, categorized result grid) */}
      <Route path="/search" element={<SearchRoute />} />

      {/* ── 8. AUTHENTICATION FLOWS ── (Password reset token verification & credential recovery) */}
      <Route path="/reset-password" element={<ResetPasswordRoute />} />

      {/* ── 9. ORDER TRACKING & INVOICE MANAGEMENT ── (Live status radar, digital invoice PDF download, return claims) */}
      <Route path="/orders/:orderId" element={<OrderDetailsRoute />} />
      <Route path="/order/:orderId" element={<OrderDetailsRoute />} />
      <Route path="/invoice/:orderId" element={<OrderDetailsRoute />} />
      <Route path="/invoices/:orderId" element={<OrderDetailsRoute />} />

      {/* ── 10. CUSTOMER CARE, FAQS & LEGAL POLICIES ── */}
      {/* Frequently Asked Questions knowledge base */}
      <Route path="/faqs" element={<FAQsRoute />} />
      <Route path="/faq" element={<FAQsRoute />} />

      {/* 7-Day Botanical Return & Refund Guarantee Policy */}
      <Route path="/return-refund-policy" element={<ReturnPolicyRoute />} />
      <Route path="/returns" element={<ReturnPolicyRoute />} />

      {/* Privacy Policy & GDPR/CCPA Compliance */}
      <Route path="/privacy-policy" element={<PrivacyPolicyRoute />} />

      {/* Terms & Conditions / Botanical Service Agreement */}
      <Route path="/terms-conditions" element={<TermsRoute />} />
      <Route path="/terms" element={<TermsRoute />} />

      {/* Shipping Policy & Doorstep Carbon-Neutral Logistics */}
      <Route path="/shipping-policy" element={<ShippingPolicyRoute />} />

      {/* Dedicated Package Tracking Portal */}
      <Route path="/track-order" element={<TrackOrderRoute />} />
      <Route path="/tracking" element={<TrackOrderRoute />} />

      {/* Contact Concierge & Appointment Booking */}
      <Route path="/contact" element={<ContactRoute />} />
      <Route path="/contact-us" element={<ContactRoute />} />

      {/* Instant WhatsApp Support Chat */}
      <Route path="/whatsapp-support" element={<WhatsAppSupportRoute />} />

      {/* ── 11. CLINICAL EDITORIAL JOURNAL / BLOG ── */}
      {/* Blog list view with tag filters & search */}
      <Route path="/blog" element={<BlogRoute />} />
      <Route path="/blogs" element={<BlogRoute />} />
      {/* Blog single article reader view */}
      <Route path="/blog/:slug" element={<BlogDetailsRoute />} />
      <Route path="/blogs/:slug" element={<BlogDetailsRoute />} />

      {/* ── 12. 404 FALLBACK ROUTE ── */}
      <Route path="*" element={<HomeRoute />} />
    </Routes>
  );
}

