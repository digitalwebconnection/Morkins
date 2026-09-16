import { useState } from 'react';
import {
  Check, Truck, Package, MapPin, Copy, ArrowLeft, CheckCircle2
} from 'lucide-react';
import type { Order } from '../../../../types';

interface TrackingTabProps {
  selectedTrackingOrder: Order;
  setActiveTab?: (tab: any) => void;
  t: (key: string) => string;
}

export const TrackingTab: React.FC<TrackingTabProps> = ({
  selectedTrackingOrder,
  setActiveTab,
  t,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const trackingAwb = selectedTrackingOrder.trackingNumber || `TRK-MK-${selectedTrackingOrder.id}-ECO`;

  const handleCopyTracking = () => {
    navigator.clipboard.writeText(trackingAwb);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
    showToast(`Tracking Code #${trackingAwb} copied.`);
  };

  const isDelivered = selectedTrackingOrder.status === 'delivered';
  const isOutForDelivery = selectedTrackingOrder.status === 'out_for_delivery';
  const isShipped = selectedTrackingOrder.status === 'shipped';
  const isProcessing = selectedTrackingOrder.status === 'processing';

  // Define simplified standard milestones
  const milestones = [
    {
      id: 'step-1',
      title: 'Order Placed',
      date: selectedTrackingOrder.date || 'Jul 10, 2026',
      completed: true,
      current: false,
    },
    {
      id: 'step-2',
      title: 'Processing',
      date: 'Jul 11, 2026',
      completed: !isProcessing,
      current: isProcessing,
    },
    {
      id: 'step-3',
      title: 'Shipped',
      date: 'Jul 13, 2026',
      completed: isShipped || isOutForDelivery || isDelivered,
      current: isShipped,
    },
    {
      id: 'step-4',
      title: 'Out for Delivery',
      date: isDelivered ? 'Jul 15, 2026' : 'Today',
      completed: isOutForDelivery || isDelivered,
      current: isOutForDelivery,
    },
    {
      id: 'step-5',
      title: 'Delivered',
      date: isDelivered ? 'Jul 15, 2026' : 'Pending',
      completed: isDelivered,
      current: false,
    },
  ];

  const getStatusDisplay = () => {
    if (isDelivered) return { label: 'Delivered', color: 'text-emerald-800', bg: 'bg-emerald-50', border: 'border-emerald-200', icon: CheckCircle2 };
    if (isOutForDelivery) return { label: 'Out for Delivery', color: 'text-amber-900', bg: 'bg-amber-50', border: 'border-amber-200', icon: Truck };
    if (isShipped) return { label: 'Shipped', color: 'text-blue-900', bg: 'bg-blue-50', border: 'border-blue-200', icon: Truck };
    return { label: 'Processing', color: 'text-gray-800', bg: 'bg-gray-100', border: 'border-gray-200', icon: Package };
  };

  const statusInfo = getStatusDisplay();
  const StatusIcon = statusInfo.icon;

  return (
    <div className="space-y-6 animate-fade-in text-[#1C2E1A]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-[#12602F] text-white text-xs font-bold rounded-2xl shadow-2xl border border-[#AFD971]/30 flex items-center gap-3 animate-slide-up">
          <CheckCircle2 className="w-4 h-4 text-[#AFD971] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          {setActiveTab && (
            <button
              type="button"
              onClick={() => setActiveTab('orders')}
              className="mb-2 text-[#464D3F] hover:text-[#12602F] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Orders</span>
            </button>
          )}
          <h2 className="font-serif text-2xl font-bold text-[#1C2E1A] flex items-center gap-3">
            Track Order
            <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1.5 ${statusInfo.bg} ${statusInfo.color} ${statusInfo.border}`}>
              <StatusIcon className="w-3 h-3" />
              {statusInfo.label}
            </span>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Tracking Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#DDD3C1] shadow-2xs">
            
            {/* Tracking Summary */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 mb-8 border-b border-[#E5DEC9]">
              <div>
                <p className="text-xs font-bold uppercase text-[#8C6221] tracking-wider mb-1">Estimated Delivery</p>
                <p className="font-serif text-2xl font-bold text-[#12602F]">
                  {selectedTrackingOrder.estimatedDelivery || (isDelivered ? 'Delivered' : 'Today by 8:00 PM')}
                </p>
              </div>
              <div className="bg-[#FAF8F2] rounded-lg p-4 border border-[#DDD3C1]/60 flex items-center justify-between gap-6 min-w-[240px]">
                <div>
                  <p className="text-[10px] uppercase font-bold text-[#464D3F] mb-0.5">Tracking Number</p>
                  <p className="font-mono text-sm font-bold text-[#1C2E1A]">{trackingAwb}</p>
                </div>
                <button
                  onClick={handleCopyTracking}
                  className="p-2 hover:bg-white rounded-md border border-transparent hover:border-[#DDD3C1] transition-all cursor-pointer text-[#12602F]"
                  title="Copy Tracking Number"
                >
                  {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Vertical Timeline */}
            <div className="relative pl-4 sm:pl-8">
              {/* Vertical Line */}
              <div className="absolute left-[27px] sm:left-[43px] top-4 bottom-8 w-0.5 bg-[#E5DEC9]" />
              
              <div className="space-y-8">
                {milestones.map((step, _index) => {
                  return (
                    <div key={step.id} className="relative flex gap-6">
                      {/* Step Indicator */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all ${
                          step.completed 
                            ? 'bg-[#12602F] border-[#12602F] text-white'
                            : step.current
                              ? 'bg-white border-[#12602F] text-[#12602F] shadow-[0_0_0_4px_rgba(18,96,47,0.1)]'
                              : 'bg-white border-[#DDD3C1] text-[#DDD3C1]'
                        }`}>
                          {step.completed ? (
                            <Check className="w-3.5 h-3.5" />
                          ) : (
                            <div className={`w-2 h-2 rounded-full ${step.current ? 'bg-[#12602F]' : 'bg-transparent'}`} />
                          )}
                        </div>
                      </div>

                      {/* Step Content */}
                      <div className={`flex-1 pt-1 ${!step.completed && !step.current ? 'opacity-50' : ''}`}>
                        <h4 className="text-sm font-bold text-[#1C2E1A]">{step.title}</h4>
                        <p className="text-xs text-[#464D3F] mt-0.5">{step.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
          </div>
        </div>

        {/* Right Column: Address and Items */}
        <div className="space-y-6">
          {/* Shipping Address */}
          <div className="bg-white rounded-xl p-6 border border-[#DDD3C1] shadow-2xs">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-[#8C6221]" />
              <h3 className="font-serif text-lg font-bold text-[#1C2E1A]">Delivery Address</h3>
            </div>
            <div className="bg-[#FAF8F2] rounded-lg p-4 border border-[#E5DEC9]">
              <p className="text-sm text-[#464D3F] leading-relaxed whitespace-pre-line">
                {selectedTrackingOrder.shippingAddress || 'Alex Johnson\n123 Eco Way, Suite 400\nGreen City, NY 10001\nUnited States'}
              </p>
            </div>
          </div>

          {/* Items Summary */}
          <div className="bg-white rounded-xl p-6 border border-[#DDD3C1] shadow-2xs">
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-4 h-4 text-[#8C6221]" />
              <h3 className="font-serif text-lg font-bold text-[#1C2E1A]">Shipment Contents</h3>
            </div>
            
            <div className="space-y-4">
              {selectedTrackingOrder.items.map((item) => {
                const translatedName = t('prod_' + item.id + '_name') || item.name;
                return (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.img}
                      alt={translatedName}
                      className="w-12 h-12 rounded-md object-cover border border-[#DDD3C1] bg-[#FAF8F2]"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-[#1C2E1A] truncate" title={translatedName}>
                        {translatedName}
                      </h4>
                      <p className="text-[11px] text-[#464D3F]">Qty: {item.qty}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
