import { useState, useEffect } from 'react';
import p1 from '../../assets/product/p1.jpg';
import p2 from '../../assets/product/p2.jpg';
import p4 from '../../assets/product/p4.jpg';

interface PurchaseNotice {
  customer: string;
  location: string;
  productName: string;
  timeAgo: string;
  img: string;
}

const PURCHASES: PurchaseNotice[] = [
  {
    customer: 'Victoria H.',
    location: 'London, UK',
    productName: 'Botanical Radiance Glow Serum',
    timeAgo: '3 minutes ago',
    img: p1
  },
  {
    customer: 'Camille D.',
    location: 'Paris, France',
    productName: 'Bio-Active Barrier Repair Cream',
    timeAgo: '7 minutes ago',
    img: p2
  },
  {
    customer: 'Sophia M.',
    location: 'New York, USA',
    productName: 'Hyaluronic Dew Plumping Elixir',
    timeAgo: '12 minutes ago',
    img: p4
  }
];

export default function BestSellersLiveTicker() {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % PURCHASES.length);
        setIsVisible(true);
      }, 500);
    }, 7000);

    return () => clearInterval(interval);
  }, [isDismissed]);

  if (isDismissed) return null;

  const current = PURCHASES[index];

  return (
    <div
      className={`fixed bottom-6 left-6 z-40 max-w-xs sm:max-w-sm bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border border-[#A68A56]/25 shadow-2xl transition-all duration-500 hidden sm:flex items-center gap-3.5 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      {/* Product Image Thumbnail */}
      <div className="w-11 h-11 rounded-xl bg-[#F4F3EE] p-1 flex items-center justify-center shrink-0 border border-gray-100">
        <img src={current.img} alt={current.productName} className="max-h-full max-w-full object-contain" />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-bold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span>Recent Verified Purchase</span>
        </div>
        <h5 className="text-xs font-semibold text-brand-dark truncate">
          {current.productName}
        </h5>
        <div className="text-[11px] text-gray-500 font-light truncate">
          {current.customer} in {current.location} • <span className="text-[#A68A56] font-medium">{current.timeAgo}</span>
        </div>
      </div>

      {/* Dismiss */}
      <button
        onClick={() => setIsDismissed(true)}
        className="w-6 h-6 rounded-full hover:bg-gray-100 text-gray-400 hover:text-brand-dark flex items-center justify-center transition-colors cursor-pointer text-xs shrink-0"
        title="Dismiss notice"
      >
        ×
      </button>
    </div>
  );
}
