import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem, CartContextType } from '../types';

const CART_STORAGE_KEY = 'morkins_cart_items';

export const MAX_QTY_PER_PRODUCT = 99;

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

  const addToCart = (
    product: { id: number; name: string; price: number; discountPrice?: number; img: string },
    openCartAfter = false
  ) => {
    const finalPrice =
      typeof product.discountPrice === 'number' && product.discountPrice > 0
        ? product.discountPrice
        : product.price;

    const normalizedProduct: CartItem = {
      id: product.id,
      name: product.name,
      price: finalPrice,
      img: product.img,
      qty: 1,
    };

    let itemForToast: CartItem = { ...normalizedProduct, qty: 1 };
    setCartItems(prev => {
      const existing = prev.find(item => item.id === normalizedProduct.id);
      if (existing) {
        if (existing.qty >= MAX_QTY_PER_PRODUCT) {
          itemForToast = { ...existing, qty: MAX_QTY_PER_PRODUCT };
          return prev;
        }
        const nextQty = Math.min(MAX_QTY_PER_PRODUCT, existing.qty + 1);
        const updatedItem = { ...existing, price: finalPrice, qty: nextQty };
        itemForToast = updatedItem;
        return prev.map(item => (item.id === normalizedProduct.id ? updatedItem : item));
      }
      itemForToast = { ...normalizedProduct, qty: 1 };
      return [...prev, itemForToast];
    });

    setLastAddedItem(itemForToast);
    
    if (openCartAfter) {
      setIsCartOpen(true);
    }

    setShowToast(false);
    setTimeout(() => setShowToast(true), 50);
  };

  const updateQty = (id: number, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.id === id) {
            const nextQty = Math.min(MAX_QTY_PER_PRODUCT, Math.max(0, item.qty + delta));
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
