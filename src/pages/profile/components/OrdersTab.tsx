import React from 'react';

interface OrderItem {
  id: number;
  name: string;
  qty: number;
  price: number;
  img: string;
}

interface Order {
  id: string;
  date: string;
  status: 'processing' | 'shipped' | 'out_for_delivery' | 'delivered';
  total: number;
  items: OrderItem[];
  trackingNumber: string;
  estimatedDelivery: string;
}

interface OrdersTabProps {
  orders: Order[];
  setSelectedTrackingOrder: (order: Order) => void;
  setActiveTab: (tab: any) => void;
  t: (key: string) => string;
}

export const OrdersTab: React.FC<OrdersTabProps> = ({
  orders,
  setSelectedTrackingOrder,
  setActiveTab,
  t,
}) => {
  return (
    <div className="bg-white/80 rounded-[32px] p-6 md:p-8 border border-brand-dark/10 shadow-sm backdrop-blur-xs space-y-6 animate-modal-content">
      <div>
        <h3 className="font-serif text-2xl font-bold text-brand-light">{t('profile_tab_orders')}</h3>
        <p className="text-[10px] text-brand-dark/55 uppercase tracking-widest mt-0.5">Trace and review your luxury skincare shipments</p>
      </div>
      
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="border border-brand-dark/10 rounded-[28px] overflow-hidden shadow-3xs bg-white/50 hover:border-brand-light/40 transition-colors">
            {/* Order Header */}
            <div className="bg-brand-cream-dark/30 px-5 py-4 border-b border-brand-dark/10 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div>
                <span className="text-brand-dark/50 uppercase text-[9px] tracking-wider block">Reference</span>
                <strong className="text-brand-light font-bold text-sm uppercase">{order.id}</strong>
              </div>
              <div>
                <span className="text-brand-dark/50 uppercase text-[9px] tracking-wider block">Ordered On</span>
                <strong className="text-brand-light/95 font-medium">{order.date}</strong>
              </div>
              <div>
                <span className="text-brand-dark/50 uppercase text-[9px] tracking-wider block">Order Value</span>
                <strong className="text-brand-light font-extrabold text-sm">${order.total.toFixed(2)}</strong>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-[9px] uppercase font-extrabold tracking-widest border ${
                  order.status === 'delivered' 
                    ? 'bg-green-50 border-green-200/50 text-green-700' 
                    : 'bg-brand-accent/20 border-brand-accent/30 text-brand-light'
                }`}>
                  {order.status.replace('_', ' ')}
                </span>
                <button 
                  onClick={() => {
                    setSelectedTrackingOrder(order);
                    setActiveTab('tracking');
                  }}
                  className="text-[9px] uppercase font-bold tracking-widest text-white bg-brand-light hover:bg-brand-light/95 px-3 py-1 rounded-full cursor-pointer shadow-3xs hover:scale-105 active:scale-95 transition-all"
                >
                  Track Package
                </button>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-5 divide-y divide-brand-dark/5">
              {order.items.map((item) => {
                const translatedName = t('prod_' + item.id + '_name') || item.name;
                return (
                  <div key={item.id} className="py-3 first:pt-0 last:pb-0 flex items-center space-x-4">
                    <img src={item.img} alt={translatedName} className="w-12 h-12 object-cover rounded-xl border border-brand-dark/10 shadow-3xs" />
                    <div className="grow min-w-0">
                      <h4 className="text-xs font-bold text-brand-light truncate">{translatedName}</h4>
                      <p className="text-[10px] text-brand-dark/60 mt-0.5">Quantity: {item.qty} • Price: ${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
