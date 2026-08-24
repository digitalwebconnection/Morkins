import React, { useState } from 'react';
import { 
  Check, Truck, Package, MapPin, 
  Copy, ArrowLeft} from 'lucide-react';

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

interface TrackingStep {
  label: string;
  desc: string;
  time: string;
  completed: boolean;
}

interface TrackingTabProps {
  selectedTrackingOrder: Order;
  trackingSteps: TrackingStep[];
  setActiveTab?: (tab: any) => void;
  t: (key: string) => string;
}

export const TrackingTab: React.FC<TrackingTabProps> = ({
  selectedTrackingOrder,
  trackingSteps,
  setActiveTab,
  t,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyTracking = () => {
    navigator.clipboard.writeText(selectedTrackingOrder.trackingNumber);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const isDelivered = selectedTrackingOrder.status === 'delivered';

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* ── Section Header & Order Overview ── */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DDD3C1]/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#12602F] via-[#1F8242] to-[#C49746]" />

        <div className="flex flex-wrap justify-between items-center gap-4 pb-5 border-b border-[#E5DEC9]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-linear-to-r from-[#F4EFE6] to-[#EFE8D8] border border-[#C9B387]/50 text-[10px] font-bold uppercase tracking-widest text-[#8C6D34] mb-1">
              <span>✦</span>
              <span>Live Shipment Radar</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#1C2E1A]">{t('track_title')}</h3>
            <p className="text-xs text-[#464D3F] mt-0.5">
              Live cellular batch dispatch & temperature-controlled delivery timeline
            </p>
          </div>

          {setActiveTab && (
            <button
              onClick={() => setActiveTab('orders')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-[#DDD3C1] hover:border-[#12602F] text-[#1C2E1A] text-xs font-bold uppercase tracking-wider bg-[#FAF8F2] hover:bg-[#F4F1E8] transition-all cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Orders</span>
            </button>
          )}
        </div>

        {/* Top Info Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-linear-to-b from-[#FAF8F2] to-[#FCFBF8] border border-[#DDD3C1]/80 shadow-2xs">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C6221] block">
              Reference Code
            </span>
            <strong className="text-sm font-serif font-bold text-[#1C2E1A] mt-0.5 block uppercase">
              {selectedTrackingOrder.id}
            </strong>
          </div>

          <div className="p-4 rounded-xl bg-linear-to-b from-[#FAF8F2] to-[#FCFBF8] border border-[#DDD3C1]/80 shadow-2xs">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C6221] block">
              {t('track_est')}
            </span>
            <strong className="text-sm font-serif font-bold text-[#12602F] mt-0.5 block">
              {selectedTrackingOrder.estimatedDelivery}
            </strong>
          </div>

          <div className="p-4 rounded-xl bg-linear-to-b from-[#FAF8F2] to-[#FCFBF8] border border-[#DDD3C1]/80 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C6221] block">
                {t('track_status')}
              </span>
              <span className="text-xs font-bold text-[#1C2E1A] mt-0.5 block uppercase">
                {selectedTrackingOrder.status.replace(/_/g, ' ')}
              </span>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              isDelivered 
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                : 'bg-amber-50 text-amber-900 border border-amber-200'
            }`}>
              {isDelivered ? 'Delivered' : 'In Route'}
            </span>
          </div>
        </div>

        {/* ── Visual Timeline Tracker ── */}
        <div className="mt-8 pt-6 border-t border-[#E5DEC9]">
          <div className="relative pl-6 sm:pl-8 space-y-8 sm:space-y-10">
            {/* Vertical Connecting Line */}
            <div className="absolute left-4.75 top-4 bottom-4 w-1 bg-[#E5DEC9] rounded-full" />
            
            {/* Active Progress Fill */}
            <div
              className="absolute left-4.75 top-4 w-1 bg-linear-to-b from-[#12602F] to-[#2B7D46] rounded-full transition-all duration-700"
              style={{
                height: isDelivered
                  ? '100%'
                  : selectedTrackingOrder.status === 'out_for_delivery'
                  ? '75%'
                  : selectedTrackingOrder.status === 'shipped'
                  ? '50%'
                  : '15%'
              }}
            />

            {trackingSteps.map((step, idx) => {
              return (
                <div key={idx} className="flex items-start gap-4 sm:gap-6 relative z-10 group">
                  {/* Step Node */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-all duration-300 shadow-xs ${
                      step.completed
                        ? 'bg-[#12602F] border-[#AFD971]/60 text-[#AFD971] scale-105 ring-4 ring-[#12602F]/10'
                        : 'bg-white border-[#DDD3C1] text-gray-400'
                    }`}
                  >
                    {step.completed ? (
                      <Check className="w-5 h-5 stroke-[2.5]" />
                    ) : (
                      <span className="text-xs font-mono font-bold">{idx + 1}</span>
                    )}
                  </div>

                  {/* Step Details */}
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h5 className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${
                        step.completed ? 'text-[#1C2E1A]' : 'text-[#464D3F]/70'
                      }`}>
                        {step.label}
                      </h5>
                      <span className="text-[10px] sm:text-xs font-mono text-[#8C6221] bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60 shrink-0">
                        {step.time}
                      </span>
                    </div>
                    <p className="text-xs text-[#464D3F] font-light mt-1 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Carrier & Verification Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {/* Carrier Card */}
          <div className="p-5 rounded-xl bg-white border border-[#DDD3C1] shadow-2xs space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C6221] block">
              {t('track_carrier')}
            </span>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <Truck className="w-5 h-5 text-[#12602F]" />
                <strong className="text-xs sm:text-sm font-bold text-[#1C2E1A]">
                  Morkins Carbon-Neutral Express
                </strong>
              </div>
              <span className="bg-emerald-50 text-emerald-800 text-[9px] font-bold uppercase px-2 py-0.5 rounded border border-emerald-200">
                Eco-Certified
              </span>
            </div>

            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-500 uppercase font-bold block">
                  {t('track_code')}
                </span>
                <span className="font-mono text-xs font-bold text-[#1C2E1A]">
                  {selectedTrackingOrder.trackingNumber}
                </span>
              </div>
              <button
                onClick={handleCopyTracking}
                className="px-3 py-1 bg-[#FAF8F2] hover:bg-[#12602F] text-[#1C2E1A] hover:text-[#AFD971] border border-[#DDD3C1] rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Delivery Sanctuary Destination Preview */}
          <div className="p-5 rounded-xl bg-white border border-[#DDD3C1] shadow-2xs space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C6221] block">
              Delivery Destination Sanctuary
            </span>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-5 h-5 text-[#1C331B] shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs sm:text-sm font-bold text-[#1C2E1A] block">
                  Home Sanctuary Address
                </strong>
                <p className="text-xs text-[#464D3F] font-light mt-0.5 leading-relaxed">
                  742 Evergreen Terrace, Springfield, IL • 62704
                </p>
                <span className="text-[11px] text-[#8C6221] font-medium block mt-1">
                  Recipient: Signature required on delivery
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Items Inside This Shipment ── */}
        <div className="mt-6 p-5 rounded-xl bg-[#FAF8F2] border border-[#DDD3C1]">
          <h4 className="text-xs uppercase font-bold tracking-widest text-[#1C2E1A] mb-3 flex items-center gap-2">
            <Package className="w-4 h-4 text-[#8C6221]" />
            <span>Items Inside This Shipment ({selectedTrackingOrder.items.length})</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {selectedTrackingOrder.items.map((item) => {
              const translatedName = t('prod_' + item.id + '_name') || item.name;
              return (
                <div key={item.id} className="bg-white p-3 rounded-xl border border-[#DDD3C1] flex items-center gap-3 shadow-2xs">
                  <img
                    src={item.img}
                    alt={translatedName}
                    className="w-12 h-12 rounded-lg object-cover bg-[#FAF8F2] border border-[#DDD3C1] shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h5 className="text-xs font-bold text-[#1C2E1A] truncate">{translatedName}</h5>
                    <p className="text-[10px] text-[#464D3F] mt-0.5">Qty: {item.qty} • Sealed Cold Batch</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
