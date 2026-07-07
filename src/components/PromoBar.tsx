import { useState, useEffect } from 'react'

export default function PromoBar() {
  const promos = [
    "Free shipping on orders over $50 + 3 free samples with every order",
    "NEW Retinol Youth Renewal Eye Serum is here! Shop Now",
    "Take our 60-Second Skin Wellness Quiz to find your routine"
  ];
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromoIndex((prevIndex) => (prevIndex + 1) % promos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [promos.length]);

  return (
    <div className="w-full bg-brand-dark text-brand-cream py-2 px-4 text-center text-xs tracking-wider font-medium select-none overflow-hidden h-9 flex items-center justify-center transition-all duration-500">
      <div key={currentPromoIndex} className="animate-fade-in-up">
        {promos[currentPromoIndex]}
      </div>
    </div>
  )
}
