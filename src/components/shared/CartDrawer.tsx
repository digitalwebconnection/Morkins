import { useEffect, useRef, useState, useMemo } from 'react';
import { PRODUCTS_EXTENDED } from '../../features/products/data/products';

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
  lastAddedId?: number | null;
  onAddToCart?: (
    product: { id: number; name: string; price: number; discountPrice?: number; img: string },
    openCartAfter?: boolean
  ) => void;
}

const FREE_SHIPPING_THRESHOLD = 75;

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemove,
  lastAddedId,
  onAddToCart,
}: CartDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const itemsContainerRef = useRef<HTMLDivElement>(null);
  const [removingId, setRemovingId] = useState<number | null>(null);
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);
  const [addedUpsellIds, setAddedUpsellIds] = useState<number[]>([]);
  const [loadingUpsellId, setLoadingUpsellId] = useState<number | null>(null);
  const isAddingFromUpsellRef = useRef(false);

  // Smart Complementary Recommendations Engine
  const upsellProducts = useMemo(() => {
    const cartIds = new Set(cartItems.map((item) => item.id));
    // Items that were in cart before this upsell session
    const priorCartIds = new Set([...cartIds].filter(id => !addedUpsellIds.includes(id)));

    // Categorize cart contents
    const cartCategories = new Set(
      PRODUCTS_EXTENDED.filter(p => cartIds.has(p.id)).map(p => p.category)
    );

    // Candidates not already in cart (except those added via upsell in this session, to keep feedback visible)
    const available = PRODUCTS_EXTENDED.filter((p) => !priorCartIds.has(p.id) && p.inStock);

    // Score based on complementarity, popularity & discounts
    const scored = available.map(p => {
      let score = 0;
      // Keep items added via upsell at the top with "Added" state
      if (addedUpsellIds.includes(p.id)) {
        score += 100;
      }
      // Complementary pairings
      if (cartCategories.has('Serums') && (p.category === 'Moisturizers' || p.category === 'Cleansers')) {
        score += 15;
      }
      if (cartCategories.has('Cleansers') && (p.category === 'Serums' || p.category === 'Toners')) {
        score += 15;
      }
      if (cartCategories.has('Moisturizers') && (p.category === 'Serums' || p.category === 'Masks')) {
        score += 15;
      }
      // Bestsellers & ratings
      if (p.badge === 'Best Seller' || p.badge === 'Popular') score += 10;
      if (p.rating >= 4.8) score += 5;
      if (p.discountPrice) score += 8;

      return { product: p, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 3).map(s => s.product);
  }, [cartItems, addedUpsellIds]);

  const handleUpsellAdd = (product: (typeof PRODUCTS_EXTENDED)[0]) => {
    if (!onAddToCart || loadingUpsellId === product.id) return;
    const finalPrice = product.discountPrice || product.price;

    // Prevent scroll jump to top
    isAddingFromUpsellRef.current = true;
    setLoadingUpsellId(product.id);

    // 1-Click instant add to cart
    onAddToCart(
      {
        id: product.id,
        name: product.name,
        price: finalPrice,
        discountPrice: product.discountPrice,
        img: product.img,
      },
      false
    );

    // Retain item in upsell list with "Added" checkmark
    setAddedUpsellIds((prev) => (prev.includes(product.id) ? prev : [...prev, product.id]));

    setTimeout(() => {
      setLoadingUpsellId(null);
    }, 320);
  };

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      document.body.style.overflow = 'hidden';
      // Double RAF ensures initial off-screen transform is rendered before transitioning in
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
          if (itemsContainerRef.current) {
            itemsContainerRef.current.scrollTop = 0;
          }
        });
      });
      return () => cancelAnimationFrame(raf);
    } else {
      setIsVisible(false);
      document.body.style.overflow = '';
      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && lastAddedId) {
      if (isAddingFromUpsellRef.current) {
        // Prevent disorienting scroll jump when item is added via upsell at the bottom
        isAddingFromUpsellRef.current = false;
        return;
      }
      const timer = setTimeout(() => {
        const el = document.getElementById(`cart-item-${lastAddedId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isOpen, lastAddedId]);

  if (!isRendered && !isOpen) return null;

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingProgress = Math.min((cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const amountToFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - cartSubtotal, 0);

  const handleRemove = (id: number) => {
    setRemovingId(id);
    setTimeout(() => {
      onRemove(id);
      setRemovingId(null);
    }, 320);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      aria-labelledby="cart-drawer-title"
      role="dialog"
      aria-modal="true"
      style={{
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      {/* ── Dark Glass Backdrop ── */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: isVisible ? 'rgba(24, 20, 16, 0.52)' : 'rgba(24, 20, 16, 0)',
          backdropFilter: isVisible ? 'blur(10px)' : 'blur(0px)',
          WebkitBackdropFilter: isVisible ? 'blur(10px)' : 'blur(0px)',
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.42s cubic-bezier(0.22, 1, 0.36, 1)',
          cursor: 'pointer',
        }}
      />

      {/* ── Slide-Over Panel ── */}
      <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-6 sm:pl-10">
        <div
          ref={drawerRef}
          data-lenis-prevent
          className="pointer-events-auto w-screen max-w-105"
          style={{
            transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)',
            transition: 'transform 0.48s cubic-bezier(0.22, 1, 0.36, 1)',
            willChange: 'transform',
            boxShadow: isVisible ? '-24px 0 70px rgba(28, 25, 23, 0.22)' : 'none',
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
                transform: isVisible ? 'translateY(0)' : 'translateY(-10px)',
                opacity: isVisible ? 1 : 0,
                transition: 'transform 0.42s cubic-bezier(0.22, 1, 0.36, 1) 0.06s, opacity 0.42s cubic-bezier(0.22, 1, 0.36, 1) 0.06s',
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
                    transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
                    opacity: isVisible ? 1 : 0,
                    transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1) 0.12s, opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1) 0.12s',
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
                            ? 'linear-gradient(90deg, #10B981 0%, #34D399 50%, #059669 100%)'
                            : 'linear-gradient(90deg, #D4AF37 0%, #F5E5A4 50%, #C59B27 100%)',
                        backgroundSize: '200% 100%',
                        animation: 'progressShimmer 3s ease infinite',
                        transition: 'width 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* ─────── CART ITEMS LIST ─────── */}
            <div
              ref={itemsContainerRef}
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
                  {cartItems.map((item, index) => {
                    const isJustAdded = lastAddedId === item.id;
                    const delayMs = isVisible ? Math.min(index * 45 + 90, 320) : 0;
                    return (
                    <div
                      key={item.id}
                      id={`cart-item-${item.id}`}
                      style={{
                        borderRadius: '16px',
                        padding: '14px',
                        background: '#FFFFFF',
                        border: isJustAdded ? '1.5px solid #C59B27' : '1px solid rgba(197, 155, 39, 0.12)',
                        boxShadow: isJustAdded ? '0 6px 22px rgba(197, 155, 39, 0.22)' : '0 4px 16px rgba(28, 25, 23, 0.04)',
                        transition: 'transform 0.42s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease, border-color 0.3s ease, box-shadow 0.3s ease, max-height 0.35s ease, margin 0.35s ease, padding 0.35s ease',
                        opacity: removingId === item.id ? 0 : (isVisible ? 1 : 0),
                        transform: removingId === item.id 
                          ? 'translateX(50px) scale(0.9)' 
                          : isVisible 
                            ? 'translateY(0) scale(1)' 
                            : 'translateY(12px) scale(0.97)',
                        maxHeight: removingId === item.id ? '0px' : '220px',
                        overflow: 'hidden',
                        transitionDelay: `${delayMs}ms`,
                        position: 'relative',
                        animation: isJustAdded ? 'itemGlowPulse 2.4s ease-in-out infinite' : 'none',
                      }}
                      onMouseEnter={(e) => {
                        if (removingId !== item.id) {
                          e.currentTarget.style.borderColor = '#C59B27';
                          e.currentTarget.style.boxShadow = '0 8px 24px rgba(197, 155, 39, 0.18)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (removingId !== item.id) {
                          e.currentTarget.style.borderColor = isJustAdded ? '#C59B27' : 'rgba(197, 155, 39, 0.12)';
                          e.currentTarget.style.boxShadow = isJustAdded ? '0 6px 22px rgba(197, 155, 39, 0.22)' : '0 4px 16px rgba(28, 25, 23, 0.04)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }
                      }}
                    >
                      <div style={{ display: 'flex', gap: '14px' }}>
                        {/* Product Thumbnail (Fill in Box) */}
                        <div
                          style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            flexShrink: 0,
                            background: '#F5F3EF',
                            border: '1px solid rgba(28, 25, 23, 0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '0',
                            position: 'relative',
                          }}
                        >
                          <img
                            src={item.img}
                            alt={item.name}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              objectPosition: 'center',
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
                            {isJustAdded && (
                              <div style={{ marginBottom: '4px' }}>
                                <span
                                  style={{
                                    fontSize: '9px',
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.06em',
                                    color: '#C59B27',
                                    background: 'rgba(197, 155, 39, 0.1)',
                                    border: '1px solid rgba(197, 155, 39, 0.25)',
                                    padding: '2px 8px',
                                    borderRadius: '9999px',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                                  }}
                                >
                                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#C59B27' }} />
                                  Just Added
                                </span>
                              </div>
                            )}
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
                                disabled={item.qty >= 99}
                                aria-label="Increase quantity"

                                style={{
                                  width: '28px',
                                  height: '28px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  background: 'transparent',
                                  border: 'none',
                                  color: item.qty >= 99 ? '#D6D3D1' : '#44403C',
                                  cursor: item.qty >= 99 ? 'not-allowed' : 'pointer',
                                  opacity: item.qty >= 99 ? 0.4 : 1,
                                  fontSize: '14px',
                                  fontWeight: 700,
                                  transition: 'background 0.15s',
                                }}
                                onMouseEnter={(e) => {
                                  if (item.qty < 99) e.currentTarget.style.background = '#E7E5E4';
                                }}
                                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                              >
                                +
                              </button>
                            </div>

                            {item.qty >= 99 && (
                              <span
                                style={{
                                  fontSize: '10px',
                                  fontWeight: 700,
                                  color: '#13442C',
                                  background: '#D8EFE3',
                                  padding: '2px 6px',
                                  borderRadius: '6px',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.5px',
                                }}
                              >
                                Max 99 Limit
                              </span>
                            )}


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
                  );
                  })}
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

              {/* ─────── YOU MIGHT ALSO LIKE (IN-CART UPSELLING) ─────── */}
              {upsellProducts.length > 0 && (
                <div
                  style={{
                    marginTop: '22px',
                    marginBottom: '16px',
                    padding: '18px 16px',
                    borderRadius: '18px',
                    background: '#FFFFFF',
                    border: '1px solid rgba(197, 155, 39, 0.25)',
                    boxShadow: '0 6px 24px rgba(28, 25, 23, 0.05)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Subtle Top Gold Accent Line */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: 'linear-gradient(90deg, #D4AF37 0%, #F5E5A4 50%, #C59B27 100%)',
                    }}
                  />

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      marginBottom: '14px',
                      gap: '10px',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '13px' }}>✨</span>
                        <h4
                          style={{
                            margin: 0,
                            fontSize: '12px',
                            fontWeight: 800,
                            fontFamily: 'Plus Jakarta Sans, sans-serif',
                            color: '#1C1917',
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {cartItems.length > 0 ? 'You Might Also Like' : 'Trending Botanical Picks'}
                        </h4>
                      </div>
                      <p
                        style={{
                          margin: '3px 0 0',
                          fontSize: '10.5px',
                          color: '#78716C',
                          fontFamily: 'Plus Jakarta Sans, sans-serif',
                        }}
                      >
                        {cartItems.length > 0
                          ? 'Pairs harmoniously with your routine'
                          : '1-Click add our highest rated botanical formulas'}
                      </p>
                    </div>

                    <span
                      style={{
                        flexShrink: 0,
                        fontSize: '9px',
                        fontWeight: 800,
                        color: '#C59B27',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        background: 'rgba(197, 155, 39, 0.1)',
                        padding: '3px 9px',
                        borderRadius: '9999px',
                        border: '1px solid rgba(197, 155, 39, 0.28)',
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                      }}
                    >
                      1-Click Add
                    </span>
                  </div>

                  {/* Upsell Cards List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {upsellProducts.map((p) => {
                      const isAdded = addedUpsellIds.includes(p.id);
                      const isLoading = loadingUpsellId === p.id;
                      const activePrice = p.discountPrice || p.price;
                      const savings = p.discountPrice ? p.price - p.discountPrice : 0;

                      return (
                        <div
                          key={p.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '11px',
                            borderRadius: '14px',
                            background: isAdded ? '#F2FDF6' : '#FAF8F5',
                            border: isAdded ? '1.5px solid #10B981' : '1px solid rgba(197, 155, 39, 0.14)',
                            boxShadow: isAdded
                              ? '0 3px 12px rgba(16, 185, 129, 0.12)'
                              : '0 2px 8px rgba(28, 25, 23, 0.03)',
                            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                          }}
                        >
                          {/* Thumbnail with Hover Zoom */}
                          <div
                            style={{
                              width: '58px',
                              height: '58px',
                              borderRadius: '11px',
                              overflow: 'hidden',
                              flexShrink: 0,
                              background: '#F5F3EF',
                              border: isAdded ? '1px solid #A7F3D0' : '1px solid rgba(28, 25, 23, 0.08)',
                              position: 'relative',
                            }}
                          >
                            <img
                              src={p.img}
                              alt={p.name}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transition: 'transform 0.4s ease',
                              }}
                            />
                            {p.badge && !isAdded && (
                              <span
                                style={{
                                  position: 'absolute',
                                  top: '2px',
                                  left: '2px',
                                  fontSize: '7.5px',
                                  fontWeight: 800,
                                  background: 'rgba(28, 25, 23, 0.85)',
                                  color: '#FFFFFF',
                                  padding: '1px 4px',
                                  borderRadius: '4px',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.04em',
                                  lineHeight: 1.2,
                                }}
                              >
                                {p.badge}
                              </span>
                            )}
                          </div>

                          {/* Product Info */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                              <span
                                style={{
                                  fontSize: '9px',
                                  fontWeight: 800,
                                  color: '#A68A56',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.08em',
                                }}
                              >
                                {p.category}
                              </span>
                              {savings > 0 && (
                                <span
                                  style={{
                                    fontSize: '8.5px',
                                    fontWeight: 800,
                                    color: '#059669',
                                    background: '#ECFDF5',
                                    padding: '1px 5px',
                                    borderRadius: '4px',
                                  }}
                                >
                                  Save ${savings.toFixed(0)}
                                </span>
                              )}
                            </div>

                            <h5
                              style={{
                                margin: 0,
                                fontSize: '12.5px',
                                fontWeight: 700,
                                color: '#1C1917',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                fontFamily: 'Plus Jakarta Sans, sans-serif',
                              }}
                              title={p.name}
                            >
                              {p.name}
                            </h5>

                            {/* Key Ingredients Snippet */}
                            {p.keyIngredients && p.keyIngredients.length > 0 ? (
                              <p
                                style={{
                                  margin: '2px 0 4px',
                                  fontSize: '10px',
                                  color: '#78716C',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                }}
                              >
                                🌿 {p.keyIngredients.slice(0, 2).join(' • ')}
                              </p>
                            ) : (
                              <p
                                style={{
                                  margin: '2px 0 4px',
                                  fontSize: '10px',
                                  color: '#78716C',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                }}
                              >
                                {p.description}
                              </p>
                            )}

                            {/* Price */}
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                              <span
                                style={{
                                  fontSize: '13px',
                                  fontWeight: 800,
                                  color: isAdded ? '#059669' : '#13442C',
                                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                                }}
                              >
                                ${activePrice.toFixed(2)}
                              </span>
                              {p.discountPrice && (
                                <span
                                  style={{
                                    fontSize: '10px',
                                    color: '#A8A29E',
                                    textDecoration: 'line-through',
                                    fontFamily: 'monospace',
                                  }}
                                >
                                  ${p.price.toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* 1-Click Direct Add / Added CTA */}
                          {isAdded ? (
                            <button
                              type="button"
                              onClick={() => onUpdateQty(p.id, 1)}
                              title="Click to add another to cart"
                              style={{
                                flexShrink: 0,
                                padding: '7px 13px',
                                borderRadius: '9999px',
                                border: '1px solid #10B981',
                                fontSize: '10.5px',
                                fontWeight: 800,
                                letterSpacing: '0.04em',
                                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                                color: '#FFFFFF',
                                cursor: 'pointer',
                                boxShadow: '0 2px 10px rgba(16, 185, 129, 0.35)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontFamily: 'Plus Jakarta Sans, sans-serif',
                                animation: 'addedBounce 0.32s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                transition: 'all 0.2s ease',
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                            >
                              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                              <span>In Bag</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleUpsellAdd(p)}
                              disabled={isLoading}
                              style={{
                                flexShrink: 0,
                                padding: '7px 15px',
                                borderRadius: '9999px',
                                border: 'none',
                                fontSize: '11px',
                                fontWeight: 800,
                                letterSpacing: '0.04em',
                                background: 'linear-gradient(135deg, #1C1917 0%, #292524 100%)',
                                color: '#FFFFFF',
                                cursor: isLoading ? 'wait' : 'pointer',
                                boxShadow: '0 2px 8px rgba(28, 25, 23, 0.25)',
                                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                                fontFamily: 'Plus Jakarta Sans, sans-serif',
                              }}
                              onMouseEnter={(e) => {
                                if (!isLoading) {
                                  e.currentTarget.style.background = 'linear-gradient(135deg, #D4AF37 0%, #C59B27 100%)';
                                  e.currentTarget.style.transform = 'scale(1.04)';
                                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(197, 155, 39, 0.35)';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!isLoading) {
                                  e.currentTarget.style.background = 'linear-gradient(135deg, #1C1917 0%, #292524 100%)';
                                  e.currentTarget.style.transform = 'scale(1)';
                                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(28, 25, 23, 0.25)';
                                }
                              }}
                            >
                              {isLoading ? (
                                <>
                                  <svg
                                    style={{ animation: 'spinSlow 0.8s linear infinite' }}
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                  >
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" />
                                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeLinecap="round" />
                                  </svg>
                                  <span>Adding</span>
                                </>
                              ) : (
                                <>
                                  <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                  </svg>
                                  <span>+ Add</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
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
                  boxShadow: '0 -4px 24px rgba(28, 25, 23, 0.06)',
                  transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                  opacity: isVisible ? 1 : 0,
                  transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1) 0.16s, opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1) 0.16s',
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
                    background: 'linear-gradient(135deg, #1C1917 0%, #292524 100%)',
                    boxShadow: '0 6px 20px rgba(28, 25, 23, 0.28)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #D4AF37 0%, #C59B27 100%)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 10px 28px rgba(197, 155, 39, 0.38)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #1C1917 0%, #292524 100%)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(28, 25, 23, 0.28)';
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '40%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                      animation: 'buttonSheen 4s ease-in-out infinite',
                      pointerEvents: 'none',
                    }}
                  />
                  <span style={{ position: 'relative', zIndex: 2 }}>Proceed to Checkout</span>
                  <svg style={{ position: 'relative', zIndex: 2 }} width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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

      <style>{`
        @keyframes progressShimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes itemGlowPulse {
          0%, 100% {
            border-color: #C59B27;
            box-shadow: 0 4px 18px rgba(197, 155, 39, 0.16);
          }
          50% {
            border-color: #D4AF37;
            box-shadow: 0 8px 30px rgba(197, 155, 39, 0.34);
          }
        }
        @keyframes badgePopIn {
          0% { transform: scale(0.6); opacity: 0; }
          70% { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes buttonSheen {
          0% { transform: translateX(-150%) skewX(-20deg); }
          25%, 100% { transform: translateX(350%) skewX(-20deg); }
        }
        @keyframes addedBounce {
          0% { transform: scale(0.85); opacity: 0.8; }
          60% { transform: scale(1.08); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes spinSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
