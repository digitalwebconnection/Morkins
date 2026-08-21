import { useEffect, useState } from 'react';

interface CartToastProps {
  item: { name: string; price: number; img: string; qty: number } | null;
  show: boolean;
  onClose: () => void;
}

export default function CartToast({ item, show, onClose }: CartToastProps) {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (show && item) {
      setExiting(false);
      requestAnimationFrame(() => setVisible(true));

      const timer = setTimeout(() => {
        handleClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, item]);

  const handleClose = () => {
    setExiting(true);
    setVisible(false);
    setTimeout(() => {
      setExiting(false);
      onClose();
    }, 400);
  };

  if (!show && !exiting) return null;
  if (!item) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        zIndex: 9999,
        pointerEvents: 'auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          padding: '14px 20px 14px 14px',
          borderRadius: '18px',
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(111, 140, 81, 0.12)',
          boxShadow: visible && !exiting
            ? '0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(111,140,81,0.08)'
            : '0 8px 24px rgba(0,0,0,0.06)',
          transform: visible && !exiting
            ? 'translateY(0) scale(1)'
            : 'translateY(20px) scale(0.95)',
          opacity: visible && !exiting ? 1 : 0,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          maxWidth: '380px',
          minWidth: '300px',
        }}
      >
        {/* Checkmark circle */}
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '14px',
          overflow: 'hidden',
          flexShrink: 0,
          border: '1px solid rgba(111,140,81,0.1)',
          position: 'relative',
        }}>
          <img
            src={item.img}
            alt={item.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          {/* Green check overlay */}
          <div style={{
            position: 'absolute',
            bottom: '-1px',
            right: '-1px',
            width: '18px',
            height: '18px',
            borderRadius: '6px 0 14px 0',
            background: 'linear-gradient(135deg, #6F8C51, #5a7342)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Text content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontSize: '11px',
            fontWeight: 600,
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            color: '#6F8C51',
            margin: 0,
            letterSpacing: '0.3px',
            textTransform: 'uppercase' as const,
          }}>
            Added to bag
          </p>
          <p style={{
            fontSize: '13px',
            fontWeight: 700,
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            color: '#3a4a2e',
            margin: '2px 0 0',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {item.name}
          </p>
          <p style={{
            fontSize: '12px',
            fontWeight: 600,
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            color: '#8C937D',
            margin: '1px 0 0',
          }}>
            Qty: {item.qty} · ${item.price.toFixed(2)}
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            border: 'none',
            background: 'rgba(111,140,81,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#8C937D',
            transition: 'all 0.2s',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(111,140,81,0.12)';
            e.currentTarget.style.color = '#3a4a2e';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(111,140,81,0.06)';
            e.currentTarget.style.color = '#8C937D';
          }}
        >
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Auto-dismiss progress bar */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '18px',
          right: '18px',
          height: '2px',
          borderRadius: '0 0 18px 18px',
          overflow: 'hidden',
        }}>
          <div
            style={{
              height: '100%',
              borderRadius: '2px',
              background: 'linear-gradient(90deg, #6F8C51, #AFD971)',
              animation: visible && !exiting ? 'toastProgress 3s linear forwards' : 'none',
              transformOrigin: 'left',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes toastProgress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}
