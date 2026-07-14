import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import PromoBar from './PromoBar'
import Navbar from './Navbar'
import Footer from './Footer'
import Home from '../pages/home/Home'
import AboutUs from '../pages/aboutus/AboutUs'
import CartDrawer from './CartDrawer'
import type { CartItem } from './CartDrawer'

export default function MainSection() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (product: { id: number; name: string; price: number; img: string }, openCart = true) => {
    setCartItems(prevItems => {
      const existing = prevItems.find(item => item.id === product.id);
      if (existing) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevItems, { ...product, qty: 1 }];
    });
    if (openCart) {
      setIsCartOpen(true);
    }
  };

  const handleUpdateQty = (id: number, delta: number) => {
    setCartItems(prevItems =>
      prevItems
        .map(item => {
          if (item.id === id) {
            const nextQty = item.qty + delta;
            return { ...item, qty: nextQty };
          }
          return item;
        })
        .filter(item => item.qty > 0)
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <>
      {/* Announcements Promo Slider */}
      <PromoBar />

      {/* Header Navigation Bar */}
      <Navbar onCartClick={() => setIsCartOpen(true)} cartCount={cartCount} />

      {/* Page Content */}
      <Routes>
        <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>

      {/* Page Footer */}
      <Footer />

      {/* Shopping Bag Slider Panel */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemoveItem}
      />
    </>
  )
}
