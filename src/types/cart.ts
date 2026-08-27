export interface CartItem {
  id: number;
  name: string;
  price: number;
  img: string;
  qty: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  lastAddedItem: CartItem | null;
  showToast: boolean;
  cartCount: number;
  totalAmount: number;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: { id: number; name: string; price: number; discountPrice?: number; img: string }, openCartAfter?: boolean) => void;
  updateQty: (id: number, delta: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  closeToast: () => void;
}
