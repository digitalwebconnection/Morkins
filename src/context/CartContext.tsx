import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem, CartContextType } from '../types';

const CART_STORAGE_KEY = 'morkins_cart_items';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  const addToCart = (product: { id: number; name: string; price: number; img: string }, openCartAfter = false) => {
    let updatedItem: CartItem;
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        updatedItem = { ...existing, qty: existing.qty + 1 };
        return prev.map(item => (item.id === product.id ? updatedItem : item));
      }
      updatedItem = { ...product, qty: 1 };
      return [...prev, updatedItem];
    });

    setLastAddedItem(product ? { ...product, qty: 1 } : null);
    
    if (openCartAfter) {
      setIsCartOpen(true);
    } else {
      setShowToast(false);
      setTimeout(() => setShowToast(true), 50);
    }
  };

  const updateQty = (id: number, delta: number) => {
    setCartItems(prev =>
      prev
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

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const closeToast = () => setShowToast(false);

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        lastAddedItem,
        showToast,
        cartCount,
        totalAmount,
        openCart,
        closeCart,
        addToCart,
        updateQty,
        removeItem,
        clearCart,
        closeToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
