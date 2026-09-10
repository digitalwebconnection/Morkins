import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks';

// Code-split route components using React.lazy
const HomeRoute = lazy(() => import('./HomeRoute'));
const ProductsRoute = lazy(() => import('./ProductsRoute'));
const ProductDetailsRoute = lazy(() => import('./ProductDetailsRoute'));
const SkinCareRoute = lazy(() => import('./SkinCareRoute'));
const HairCareRoute = lazy(() => import('./HairCareRoute'));
const BestSellersRoute = lazy(() => import('./BestSellersRoute'));
const NewArrivalsRoute = lazy(() => import('./NewArrivalsRoute'));
const AboutRoute = lazy(() => import('./AboutRoute'));
const ProfileRoute = lazy(() => import('./ProfileRoute'));
const BlogRoute = lazy(() => import('./BlogRoute'));
const BlogDetailsRoute = lazy(() => import('./BlogDetailsRoute'));
const SearchRoute = lazy(() => import('./SearchRoute'));
const ResetPasswordRoute = lazy(() => import('./ResetPasswordRoute'));
const OrderDetailsRoute = lazy(() => import('./OrderDetailsRoute'));
const NotFoundRoute = lazy(() => import('./NotFoundRoute'));


// Support Routes
const FAQsRoute = lazy(() => import('./support/FAQsRoute'));
const ReturnPolicyRoute = lazy(() => import('./support/ReturnPolicyRoute'));
const PrivacyPolicyRoute = lazy(() => import('./support/PrivacyPolicyRoute'));
const TermsRoute = lazy(() => import('./support/TermsRoute'));
const ShippingPolicyRoute = lazy(() => import('./support/ShippingPolicyRoute'));
const TrackOrderRoute = lazy(() => import('./support/TrackOrderRoute'));
const ContactRoute = lazy(() => import('./support/ContactRoute'));
const WhatsAppSupportRoute = lazy(() => import('./support/WhatsAppSupportRoute'));

function RouteLoading() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3 py-16">
      <div className="w-8 h-8 border-2 border-brand-accent/30 border-t-brand-accent rounded-full animate-spin" />
      <span className="text-xs uppercase tracking-widest text-brand-dark/50 font-medium">Loading...</span>
    </div>
  );
}

function CartRedirectRoute() {
  const { openCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    openCart();
    navigate('/', { replace: true });
  }, [openCart, navigate]);

  return null;
}

export default function AppRoutes() {
  const location = useLocation();

  // Scroll restoration: scroll to top on route change unless anchor hash exists
  useEffect(() => {
    if (!location.hash) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo(0, 0);
      document.documentElement.scrollTo(0, 0);
      document.body.scrollTo(0, 0);
    }
  }, [location.pathname, location.search, location.hash, location.key]);

  return (
    <Suspense fallback={<RouteLoading />}>
      <div key={location.pathname} className="page-smooth-open flex-1 flex flex-col w-full">
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

        {/* ── 12. AUTO SLIDE-CART PANEL FALLBACK (Opens slide-over cart drawer instead of separate page) ── */}
        <Route path="/cart" element={<CartRedirectRoute />} />

        {/* ── 13. 404 NOT FOUND FALLBACK ROUTE ── */}
        <Route path="*" element={<NotFoundRoute />} />
      </Routes>
      </div>

    </Suspense>
  );
}

