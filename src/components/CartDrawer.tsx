import { useEffect, useRef, useState } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  img: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

const FREE_SHIPPING_THRESHOLD = 75;

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemove,
}: CartDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [removingId, setRemovingId] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => setIsVisible(true));
    } else {
      setIsVisible(false);
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingProgress = Math.min((cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const amountToFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - cartSubtotal, 0);

  const handleRemove = (id: number) => {
    setRemovingId(id);
    setTimeout(() => {
      onRemove(id);
      setRemovingId(null);
    }, 280);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      aria-labelledby="cart-drawer-title"
      role="dialog"
      aria-modal="true"
    >
      {/* ── Dark Glass Backdrop ── */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(28, 25, 23, 0.45)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* ── Slide-Over Panel ── */}
      <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-6 sm:pl-10">
        <div
          ref={drawerRef}
          className="pointer-events-auto w-screen max-w-[420px]"
          style={{
            transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              background: '#F5F3EF',
              boxShadow: '-20px 0 60px rgba(28, 25, 23, 0.15)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* ─────── HEADER ─────── */}
            <div
              style={{
                padding: '24px 24px 18px',
                position: 'relative',
                zIndex: 10,
                background: '#FFFFFF',
                borderBottom: '1px solid rgba(197, 155, 39, 0.12)',
                boxShadow: '0 2px 12px rgba(28, 25, 23, 0.03)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  {/* Champagne Gold Icon Badge */}
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, #D4AF37 0%, #C59B27 100%)',
                      color: '#FFFFFF',
                      boxShadow: '0 4px 14px rgba(197, 155, 39, 0.35)',
                      position: 'relative',
                    }}
                  >
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    {cartCount > 0 && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '-2px',
                          right: '-2px',
                          minWidth: '20px',
                          height: '20px',
                          padding: '0 5px',
                          borderRadius: '10px',
                          background: '#E11D48',
                          color: '#FFFFFF',
                          fontSize: '11px',
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 2px 6px rgba(225, 29, 72, 0.4)',
                          fontFamily: 'Plus Jakarta Sans, sans-serif',
                          border: '2px solid #FFFFFF',
                        }}
                      >
                        {cartCount}
                      </span>
                    )}
                  </div>

                  <div>
                    <h2
                      id="cart-drawer-title"
                      style={{
                        fontSize: '20px',
                        fontWeight: 800,
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        color: '#1C1917',
                        margin: 0,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      Shopping Bag
                    </h2>
                    <p
                      style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        color: '#C59B27',
                        margin: '2px 0 0',
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                      }}
                    >
                      {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart
                    </p>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close cart"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '1px solid #E7E5E4',
                    background: '#FAFAF9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    color: '#57534E',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#1C1917';
                    e.currentTarget.style.color = '#FFFFFF';
                    e.currentTarget.style.borderColor = '#1C1917';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#FAFAF9';
                    e.currentTarget.style.color = '#57534E';
                    e.currentTarget.style.borderColor = '#E7E5E4';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* ── Free Shipping Progress Card ── */}
              {cartItems.length > 0 && (
                <div
                  style={{
                    marginTop: '16px',
                    padding: '12px 16px',
                    borderRadius: '14px',
                    background: '#FFFFFF',
                    border: '1px solid rgba(197, 155, 39, 0.2)',
                    boxShadow: '0 2px 10px rgba(197, 155, 39, 0.05)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '8px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        color: amountToFreeShipping <= 0 ? '#059669' : '#44403C',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      {amountToFreeShipping <= 0 ? (
                        <>
                          <span
                            style={{
                              width: '18px',
                              height: '18px',
                              borderRadius: '50%',
                              background: '#10B981',
                              color: '#FFFFFF',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          Free Standard Shipping Unlocked!
                        </>
                      ) : (
                        <>
                          <span
                            style={{
                              width: '18px',
                              height: '18px',
                              borderRadius: '50%',
                              background: 'linear-gradient(135deg, #D4AF37, #C59B27)',
                              color: '#FFFFFF',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2-1 2 1 2-1 2 1zm6-1V8.5a2.5 2.5 0 00-5 0V15m-1 0h7a1 1 0 001-1v-1.5" />
                            </svg>
                          </span>
                          Add <strong style={{ color: '#C59B27', margin: '0 2px' }}>${amountToFreeShipping.toFixed(2)}</strong> for Free Shipping
                        </>
                      )}
                    </span>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 800,
                        color: amountToFreeShipping <= 0 ? '#059669' : '#C59B27',
                      }}
                    >
                      {Math.round(shippingProgress)}%
                    </span>
                  </div>

                  {/* Progress bar track */}
                  <div
                    style={{
                      height: '6px',
                      borderRadius: '9999px',
                      background: '#E7E5E4',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        borderRadius: '9999px',
                        width: `${shippingProgress}%`,
                        background:
                          shippingProgress >= 100
                            ? 'linear-gradient(90deg, #10B981, #059669)'
                            : 'linear-gradient(90deg, #D4AF37, #C59B27)',
                        transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* ─────── CART ITEMS LIST ─────── */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '16px 20px',
                scrollbarWidth: 'thin',
                scrollbarColor: '#D6D3D1 transparent',
              }}
            >
              {cartItems.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        borderRadius: '16px',
                        padding: '14px',
                        background: '#FFFFFF',
                        border: '1px solid rgba(197, 155, 39, 0.12)',
                        boxShadow: '0 4px 16px rgba(28, 25, 23, 0.04)',
                        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                        opacity: removingId === item.id ? 0 : 1,
                        transform: removingId === item.id ? 'translateX(30px) scale(0.96)' : 'translateX(0) scale(1)',
                      }}
                      onMouseEnter={(e) => {
                        if (removingId !== item.id) {
                          e.currentTarget.style.borderColor = '#C59B27';
                          e.currentTarget.style.boxShadow = '0 8px 24px rgba(197, 155, 39, 0.12)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (removingId !== item.id) {
                          e.currentTarget.style.borderColor = 'rgba(197, 155, 39, 0.12)';
                          e.currentTarget.style.boxShadow = '0 4px 16px rgba(28, 25, 23, 0.04)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }
                      }}
                    >
                      <div style={{ display: 'flex', gap: '14px' }}>
                        {/* Product Thumbnail */}
                        <div
                          style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            flexShrink: 0,
                            background: '#F5F3EF',
                            border: '1px solid rgba(28, 25, 23, 0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '6px',
                          }}
                        >
                          <img
                            src={item.img}
                            alt={item.name}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                          />
                        </div>

                        {/* Product Details */}
                        <div
                          style={{
                            flex: 1,
                            minWidth: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div>
                            <h3
                              style={{
                                fontSize: '14px',
                                fontWeight: 700,
                                fontFamily: 'Plus Jakarta Sans, sans-serif',
                                color: '#1C1917',
                                margin: 0,
                                lineHeight: 1.35,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {item.name}
                            </h3>
                            <p
                              style={{
                                fontSize: '15px',
                                fontWeight: 800,
                                margin: '4px 0 0',
                                fontFamily: 'Plus Jakarta Sans, sans-serif',
                                color: '#C59B27',
                              }}
                            >
                              ${(item.price * item.qty).toFixed(2)}
                              {item.qty > 1 && (
                                <span
                                  style={{
                                    fontSize: '11px',
                                    fontWeight: 500,
                                    color: '#78716C',
                                    marginLeft: '6px',
                                  }}
                                >
                                  (${item.price.toFixed(2)} ea)
                                </span>
                              )}
                            </p>
                          </div>

                          {/* Action Row: Quantity + Trash */}
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              marginTop: '8px',
                            }}
                          >
                            {/* Quantity Pill */}
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: '9999px',
                                background: '#F5F5F4',
                                border: '1px solid #E7E5E4',
                                overflow: 'hidden',
                              }}
                            >
                              <button
                                type="button"
                                onClick={() => onUpdateQty(item.id, -1)}
                                aria-label="Decrease quantity"
                                style={{
                                  width: '28px',
                                  height: '28px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  background: 'transparent',
                                  border: 'none',
                                  color: '#44403C',
                                  cursor: 'pointer',
                                  fontSize: '14px',
                                  fontWeight: 700,
                                  transition: 'background 0.15s',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = '#E7E5E4')}
                                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                              >
                                −
                              </button>
                              <span
                                style={{
                                  width: '26px',
                                  textAlign: 'center',
                                  fontSize: '12px',
                                  fontWeight: 800,
                                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                                  color: '#1C1917',
                                }}
                              >
                                {item.qty}
                              </span>
                              <button
                                type="button"
                                onClick={() => onUpdateQty(item.id, 1)}
                                aria-label="Increase quantity"
                                style={{
                                  width: '28px',
                                  height: '28px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  background: 'transparent',
                                  border: 'none',
                                  color: '#44403C',
                                  cursor: 'pointer',
                                  fontSize: '14px',
                                  fontWeight: 700,
                                  transition: 'background 0.15s',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = '#E7E5E4')}
                                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                              >
                                +
                              </button>
                            </div>

                            {/* Trash Delete Button */}
                            <button
                              type="button"
                              onClick={() => handleRemove(item.id)}
                              aria-label="Remove item"
                              style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                border: '1px solid transparent',
                                background: '#F5F5F4',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: '#A8A29E',
                                transition: 'all 0.2s',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = '#E11D48';
                                e.currentTarget.style.background = '#FFE4E6';
                                e.currentTarget.style.borderColor = '#FDA4AF';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = '#A8A29E';
                                e.currentTarget.style.background = '#F5F5F4';
                                e.currentTarget.style.borderColor = 'transparent';
                              }}
                            >
                              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* ─────── EMPTY STATE ─────── */
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    padding: '40px 16px',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '76px',
                      height: '76px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#FFFFFF',
                      boxShadow: '0 4px 16px rgba(197, 155, 39, 0.15)',
                      marginBottom: '18px',
                      color: '#C59B27',
                      border: '1px solid rgba(197, 155, 39, 0.2)',
                    }}
                  >
                    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: 800,
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                      color: '#1C1917',
                      margin: 0,
                    }}
                  >
                    Your shopping bag is empty
                  </h3>
                  <p
                    style={{
                      fontSize: '13px',
                      color: '#78716C',
                      margin: '6px 0 22px',
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                    }}
                  >
                    Discover our botanical skincare essentials.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    style={{
                      padding: '12px 28px',
                      borderRadius: '9999px',
                      border: 'none',
                      background: '#1C1917',
                      color: '#FFFFFF',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(28, 25, 23, 0.25)',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#C59B27';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#1C1917';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Start Shopping
                  </button>
                </div>
              )}
            </div>

            {/* ─────── FOOTER / CHECKOUT ─────── */}
            {cartItems.length > 0 && (
              <div
                style={{
                  padding: '20px 24px 24px',
                  background: '#FFFFFF',
                  borderTop: '1px solid rgba(197, 155, 39, 0.15)',
                  boxShadow: '0 -4px 20px rgba(28, 25, 23, 0.04)',
                }}
              >
                {/* Subtotal Display */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    marginBottom: '4px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: '#78716C',
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                    }}
                  >
                    Subtotal
                  </span>
                  <span
                    style={{
                      fontSize: '24px',
                      fontWeight: 800,
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                      color: '#1C1917',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    ${cartSubtotal.toFixed(2)}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: '11px',
                    color: '#A8A29E',
                    margin: '0 0 16px',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                  }}
                >
                  Taxes and shipping calculated at checkout
                </p>

                {/* Primary Checkout Button (Matte Dark Charcoal with Gold Hover) */}
                <button
                  type="button"
                  onClick={() => alert('Proceeding to checkout simulation!')}
                  style={{
                    width: '100%',
                    padding: '15px 24px',
                    borderRadius: '9999px',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: 800,
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    background: '#1C1917',
                    boxShadow: '0 6px 20px rgba(28, 25, 23, 0.28)',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#C59B27';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 10px 28px rgba(197, 155, 39, 0.38)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#1C1917';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(28, 25, 23, 0.28)';
                  }}
                >
                  <span>Proceed to Checkout</span>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>

                {/* Continue Shopping Button */}
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    width: '100%',
                    marginTop: '10px',
                    padding: '11px 20px',
                    background: 'transparent',
                    border: '1px solid #E7E5E4',
                    borderRadius: '9999px',
                    fontSize: '11px',
                    fontWeight: 700,
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#44403C',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#C59B27';
                    e.currentTarget.style.color = '#C59B27';
                    e.currentTarget.style.background = '#FAF8F5';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E7E5E4';
                    e.currentTarget.style.color = '#44403C';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  Continue Shopping
                </button>

                {/* Trust Badges */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '16px',
                    marginTop: '16px',
                    paddingTop: '12px',
                    borderTop: '1px solid #F5F5F4',
                  }}
                >
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '10px',
                      fontWeight: 600,
                      color: '#78716C',
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                    }}
                  >
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#C59B27" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Secure Checkout
                  </span>
                  <span style={{ width: '1px', height: '10px', background: '#E7E5E4' }} />
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '10px',
                      fontWeight: 600,
                      color: '#78716C',
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                    }}
                  >
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#C59B27" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    100% Authentic Guarantee
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
