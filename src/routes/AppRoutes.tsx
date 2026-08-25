import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import HomeRoute from './HomeRoute';
import ProductsRoute from './ProductsRoute';
import ProductDetailsRoute from './ProductDetailsRoute';
import BestSellersRoute from './BestSellersRoute';
import NewArrivalsRoute from './NewArrivalsRoute';
import AboutRoute from './AboutRoute';
import ProfileRoute from './ProfileRoute';
import BlogRoute from './BlogRoute';
import BlogDetailsRoute from './BlogDetailsRoute';

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
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<HomeRoute />} />
      <Route path="/products" element={<ProductsRoute />} />
      <Route path="/products/:id" element={<ProductDetailsRoute />} />
      <Route path="/bestsellers" element={<BestSellersRoute />} />
      <Route path="/new-arrivals" element={<NewArrivalsRoute />} />
      <Route path="/about" element={<AboutRoute />} />
      <Route path="/profile" element={<ProfileRoute />} />

      {/* Support & Policies */}
      <Route path="/faqs" element={<FAQsRoute />} />
      <Route path="/faq" element={<FAQsRoute />} />
      <Route path="/return-refund-policy" element={<ReturnPolicyRoute />} />
      <Route path="/returns" element={<ReturnPolicyRoute />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyRoute />} />
      <Route path="/terms-conditions" element={<TermsRoute />} />
      <Route path="/terms" element={<TermsRoute />} />
      <Route path="/shipping-policy" element={<ShippingPolicyRoute />} />
      <Route path="/track-order" element={<TrackOrderRoute />} />
      <Route path="/tracking" element={<TrackOrderRoute />} />
      <Route path="/contact" element={<ContactRoute />} />
      <Route path="/contact-us" element={<ContactRoute />} />
      <Route path="/whatsapp-support" element={<WhatsAppSupportRoute />} />

      {/* Editorial Blog */}
      <Route path="/blog" element={<BlogRoute />} />
      <Route path="/blogs" element={<BlogRoute />} />
      <Route path="/blog/:slug" element={<BlogDetailsRoute />} />
      <Route path="/blogs/:slug" element={<BlogDetailsRoute />} />

      {/* Fallback route */}
      <Route path="*" element={<HomeRoute />} />
    </Routes>
  );
}
