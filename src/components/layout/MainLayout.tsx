import React from 'react';
import { useNavigate } from 'react-router-dom';
import PromoBar from './PromoBar';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from '../shared/CartDrawer';
import CartToast from '../shared/CartToast';
import AuthModal from '../shared/AuthModal';
import { useCart, useAuth } from '../../hooks';

interface MainLayoutProps {
  children?: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const navigate = useNavigate();
  const {
    cartItems,
    isCartOpen,
    lastAddedItem,
    showToast,
    cartCount,
    openCart,
    closeCart,
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

  const handleUserClick = () => {
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      openAuthModal();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream text-brand-dark">
      {/* Top Banner Announcements */}
      <PromoBar />

      {/* Main Header Navigation */}
      <Navbar
        onCartClick={openCart}
        onUserClick={handleUserClick}
        cartCount={cartCount}
        lastAddedItem={lastAddedItem}
      />

      {/* Main Dynamic Page Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Shopping Bag Slide-over Panel */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={closeCart}
        cartItems={cartItems}
        onUpdateQty={updateQty}
        onRemove={removeItem}
      />

      {/* Global Add-to-Cart Toast */}
      <CartToast
        item={lastAddedItem}
        show={showToast}
        onClose={closeToast}
      />

      {/* User Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={closeAuthModal}
      />
    </div>
  );
}
