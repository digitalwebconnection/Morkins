import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PromoBar from './PromoBar';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from '../shared/CartDrawer';
import CartToast from '../shared/CartToast';
import AuthModal from '../shared/AuthModal';
import { useCart, useAuth, useLenis } from '../../hooks';

interface MainLayoutProps {
  children?: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const navigate = useNavigate();
  const { stop, start } = useLenis();
  const {
    cartItems,
    isCartOpen,
    lastAddedItem,
    showToast,
    cartCount,
    openCart,
    closeCart,
    addToCart,
    updateQty,
    removeItem,
    closeToast,
  } = useCart();

  const {
    isAuthenticated,
    isAuthOpen,
    openAuthModal,
    closeAuthModal,
  } = useAuth();

  // Pause smooth scroll when side panels or modals are active
  useEffect(() => {
    if (isCartOpen || isAuthOpen) {
      stop();
    } else {
      start();
    }
  }, [isCartOpen, isAuthOpen, stop, start]);

  const handleUserClick = () => {
    const loggedInUser = localStorage.getItem('morkins_logged_in_user');
    if (isAuthenticated || loggedInUser) {
      closeAuthModal();
      navigate('/profile');
    } else {
      openAuthModal();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream text-brand-dark">
      {/* ── PART 1: TOP PROMOTIONAL BANNER STRIP (PromoBar) ── */}
      {/* Displays announcements, free shipping countdowns, and quick coupon alerts */}
      <PromoBar />

      {/* ── PART 2: PRIMARY SITE HEADER & NAVIGATION (Navbar) ── */}
      {/* Brand logo, mega-menus (Women, Men, Skincare, Routine), search bar, language switch & cart trigger */}
      <Navbar
        onCartClick={openCart}
        onUserClick={handleUserClick}
        cartCount={cartCount}
        lastAddedItem={lastAddedItem}
      />

      {/* ── PART 3: MAIN DYNAMIC VIEWPORT ── */}
      {/* Renders the active route's page component */}
      <main className="flex-1">
        {children}
      </main>

      {/* ── PART 4: SITE FOOTER (Footer) ── */}
      {/* Brand mission, quick navigation links, legal/support policies, certifications & newsletter */}
      <Footer />

      {/* ── PART 5: GLOBAL SLIDE-OVER SHOPPING BAG (CartDrawer) ── */}
      {/* Slide-out cart with line items, quantity controls, tier free-shipping progress, and checkout button */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={closeCart}
        cartItems={cartItems}
        onUpdateQty={updateQty}
        onRemove={removeItem}
        lastAddedId={lastAddedItem?.id}
        onAddToCart={addToCart}
      />

      {/* ── PART 6: INSTANT ADD-TO-BAG POPUP TOAST (CartToast) ── */}
      {/* Floating notification showing recently added product with 1-click cart open */}
      <CartToast
        item={lastAddedItem}
        show={showToast && !isCartOpen}
        onClose={closeToast}
      />

      {/* ── PART 7: GLOBAL AUTHENTICATION & LOGIN MODAL (AuthModal) ── */}
      {/* Luxury modal for passwordless OTP verification, email/password login, registration, and password recovery */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={closeAuthModal}
      />
    </div>
  );
}
