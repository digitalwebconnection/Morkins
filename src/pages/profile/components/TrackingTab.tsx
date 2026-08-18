import React from 'react';
import { Check } from 'lucide-react';

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
  t: (key: string) => string;
}

export const TrackingTab: React.FC<TrackingTabProps> = ({
  selectedTrackingOrder,
  trackingSteps,
  t,
}) => {
  return (
    <div className="bg-white/80 rounded-[32px] p-6 md:p-8 border border-brand-dark/10 shadow-sm backdrop-blur-xs space-y-8 animate-modal-content">
      <div className="pb-4 border-b border-brand-dark/5 flex flex-wrap justify-between items-center gap-4">
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#184433]">{t('track_title')}</h3>
          <p className="text-[10px] uppercase font-bold tracking-widest text-[#184433]/70 mt-0.5">{t('track_ref')}: {selectedTrackingOrder.id}</p>
        </div>
        <div className="text-right">
          <span className="text-[9px] text-[#184433]/70 uppercase font-bold tracking-widest block">{t('track_est')}</span>
          <strong className="text-base font-extrabold text-[#184433]">{selectedTrackingOrder.estimatedDelivery}</strong>
        </div>
      </div>

      {/* Luxury Progress Timeline */}
      <div className="relative py-8 max-w-lg mx-auto px-4">
        {/* Connector Line */}
        <div className="absolute left-[31px] top-10 bottom-10 w-[3px] bg-brand-cream-dark rounded-full" />
        <div 
          className="absolute left-[31px] top-10 w-[3px] bg-[#184433] rounded-full transition-all duration-700" 
          style={{
            height: selectedTrackingOrder.status === 'delivered' 
              ? '100%' 
              : selectedTrackingOrder.status === 'out_for_delivery'
              ? '75%'
              : selectedTrackingOrder.status === 'shipped'
              ? '50%'
              : '0%'
          }}
        />

        <div className="space-y-8 relative">
          {trackingSteps.map((step, i) => (
            <div key={i} className="flex items-start space-x-6">
              {/* Node circle wrapper */}
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border-3 z-10 transition-all ${
                step.completed 
                  ? 'bg-[#184433] border-[#184433] text-white shadow-md scale-105' 
                  : 'bg-white border-brand-dark/15 text-gray-500'
              }`}>
                {step.completed ? (
                  <Check className="w-4.5 h-4.5 stroke-[2.5]" />
                ) : (
                  <span className="text-[10px] font-bold font-mono">{i + 1}</span>
                )}
              </div>
              
              <div className="min-w-0 grow pt-1.5">
                <div className="flex items-baseline justify-between gap-3">
                  <h4 className={`text-xs font-bold uppercase tracking-wider ${step.completed ? 'text-[#184433]' : 'text-[#184433]/70'}`}>
                    {step.label}
                  </h4>
                  <span className="text-[9px] text-[#184433]/70 font-mono font-medium shrink-0">{step.time}</span>
                </div>
                <p className="text-[10px] text-[#184433]/70 font-light mt-0.5 leading-normal">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Specifications */}
      <div className="p-5 bg-[#E8E9E4] border border-brand-dark/5 rounded-[24px] grid grid-cols-2 gap-6 text-xs">
        <div>
          <span className="text-[#184433]/70 uppercase text-[9px] tracking-wider block mb-0.5">{t('track_carrier')}</span>
          <strong className="text-[#184433] font-bold">Morkins Carbon-Neutral Express</strong>
        </div>
        <div>
          <span className="text-[#184433]/70 uppercase text-[9px] tracking-wider block mb-0.5">{t('track_code')}</span>
          <strong className="text-[#184433] font-bold select-all tracking-wider font-mono">{selectedTrackingOrder.trackingNumber}</strong>
        </div>
      </div>
    </div>
  );
};


