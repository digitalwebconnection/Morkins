import React, { useState } from 'react';
import {
  ArrowLeft, Download, RotateCcw, Truck, MapPin,
  CreditCard, ShieldCheck, CheckCircle2, Copy, Check,
  ShoppingBag} from 'lucide-react';
import { downloadInvoicePdf } from '../../../../lib/utils/invoicePdf';
import type { Order } from '../../../../types';

interface OrderDetailViewProps {
  order: Order;
  onBack: () => void;
  onTrackOrder: (order: Order) => void;
  onReturnOrder: (order: Order) => void;
  onAddToCart?: (product: { id: number; name: string; price: number; img: string }) => void;
  t: (key: string) => string;
}

export const OrderDetailView: React.FC<OrderDetailViewProps> = ({
  order,
  onBack,
  onTrackOrder,
  onReturnOrder,
  onAddToCart,
}) => {
  const [copiedAwb, setCopiedAwb] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isReordering, setIsReordering] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const trackingAwb = order.trackingNumber || `BD-ECO-${order.id.replace(/[^0-9]/g, '') || '98211'}-IN`;
  const isDelivered = order.status.toLowerCase() === 'delivered';

  const handleCopyAwb = () => {
    navigator.clipboard.writeText(trackingAwb);
    setCopiedAwb(true);
    setTimeout(() => setCopiedAwb(false), 2000);
    showToast(`Tracking Code #${trackingAwb} copied.`);
  };

  const handleReorder = () => {
    if (onAddToCart) {
      order.items.forEach((item) => {
        onAddToCart({
          id: item.id,
          name: item.name,
          price: item.price,
          img: item.img,
        });
      });
    }
    setIsReordering(true);
    showToast(`All ${order.items.length} items added to your botanical cart!`);
    setTimeout(() => setIsReordering(false), 2500);
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200 flex items-center gap-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <span>Processing Cold Batch</span>
          </span>
        );
      case 'shipped':
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-100 text-blue-900 border border-blue-200 flex items-center gap-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>In Transit Linehaul</span>
          </span>
        );
      case 'out_for_delivery':
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-purple-100 text-purple-900 border border-purple-200 flex items-center gap-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
            <span>Out for Delivery</span>
          </span>
        );
      case 'delivered':
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#D8EFE3] text-[#0D3322] border border-[#13442C]/20 flex items-center gap-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#12602F]" />
            <span>✓ Delivered to Sanctuary</span>
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-stone-100 text-stone-700">
            {status}
          </span>
        );
    }
  };

  const itemsSubtotal = order.items.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="space-y-6 animate-fade-in text-[#1C2E1A]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-[#12602F] text-white text-xs font-bold rounded-lg shadow-2xl border border-[#AFD971]/30 flex items-center gap-3 animate-slide-up">
          <CheckCircle2 className="w-4 h-4 text-[#AFD971] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── 1. HEADER & TOP CONTROLS ── */}
      <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#DDD3C1] shadow-md relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-[#12602F] via-[#C49746] to-[#AFD971]" />

        {/* Back navigation & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5DEC9]">
          <div>
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#12602F] hover:underline mb-2 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Orders</span>
            </button>

            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C2E1A]">
                Order #{order.id}
              </h2>
              {getStatusBadge(order.status)}
            </div>

            <p className="text-xs text-[#464D3F] mt-1">
              Placed on <strong>{order.date}</strong> &bull; Total Paid: <strong className="font-mono text-[#12602F] font-extrabold text-sm sm:text-base">${order.total.toFixed(2)} USD</strong>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => onTrackOrder(order)}
              className="px-4 py-2.5 rounded-xl bg-[#12602F] hover:bg-[#1B6A45] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <Truck className="w-4 h-4 text-[#AFD971]" />
              <span>Track Live Radar</span>
            </button>

            <button
              type="button"
              onClick={() => {
                downloadInvoicePdf(order);
                showToast(`Invoice #${order.id}.pdf generated.`);
              }}
              className="px-3.5 py-2.5 rounded-xl bg-[#FAF8F2] hover:bg-white border border-[#DDD3C1] text-stone-700 hover:text-[#12602F] text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-2xs"
              title="Download Official Tax Invoice PDF"
            >
              <Download className="w-4 h-4 text-[#8C6221]" />
              <span>Download Invoice</span>
            </button>

            {isDelivered && (
              <button
                type="button"
                onClick={() => onReturnOrder(order)}
                className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-[#FAF8F2] border border-[#DDD3C1] text-[#1C2E1A] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#12602F]" />
                <span>Return Claim</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleReorder}
              className="px-3.5 py-2.5 rounded-xl bg-[#FAF8F2] hover:bg-white border border-[#DDD3C1] text-[#12602F] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{isReordering ? 'Added to Cart!' : 'Re-Order All'}</span>
            </button>
          </div>
        </div>

        {/* ── 3 INFO CARDS: ADDRESS, PAYMENT, CARRIER ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          
          {/* Card 1: Delivery Address */}
          <div className="p-4 rounded-2xl bg-linear-to-b from-[#FAF8F2] to-white border border-[#DDD3C1]/80 shadow-2xs space-y-2">
            <div className="flex items-center gap-2 text-[#8C6221]">
              <MapPin className="w-4 h-4 text-[#12602F]" />
              <span className="text-[10px] uppercase font-bold tracking-wider">
                Sanctuary Shipping Destination
              </span>
            </div>
            <p className="text-xs font-bold text-[#1C2E1A]">
              {order.shippingAddress || 'Plot 12, Gulmohar Avenue, Bandra West, Mumbai, MH 400050'}
            </p>
            <p className="text-[11px] text-stone-500 font-mono">
              Contact: +91 98*** **420 &bull; Standard Eco-Delivery
            </p>
          </div>

          {/* Card 2: Payment Details */}
          <div className="p-4 rounded-2xl bg-linear-to-b from-[#FAF8F2] to-white border border-[#DDD3C1]/80 shadow-2xs space-y-2">
            <div className="flex items-center gap-2 text-[#8C6221]">
              <CreditCard className="w-4 h-4 text-[#12602F]" />
              <span className="text-[10px] uppercase font-bold tracking-wider">
                Payment Method & Billing
              </span>
            </div>
            <p className="text-xs font-bold text-[#1C2E1A]">
              {order.paymentMethod || 'Visa ending in •••• 4242'}
            </p>
            <div className="flex items-center gap-1 text-[11px] text-[#12602F]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>256-Bit Encrypted & Verified</span>
            </div>
          </div>

          {/* Card 3: Courier & Telemetry */}
          <div className="p-4 rounded-2xl bg-linear-to-b from-[#FAF8F2] to-white border border-[#DDD3C1]/80 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#8C6221]">
                <Truck className="w-4 h-4 text-[#12602F]" />
                <span className="text-[10px] uppercase font-bold tracking-wider">
                  Eco-Carrier Logistics
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyAwb}
                className="text-stone-400 hover:text-[#12602F] cursor-pointer"
                title="Copy AWB Tracking Code"
              >
                {copiedAwb ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            <p className="text-xs font-bold text-[#1C2E1A] truncate">
              BlueDart Carbon-Neutral Air Fleet
            </p>
            <p className="text-[11px] font-mono text-stone-500 truncate">
              AWB: {trackingAwb}
            </p>
          </div>

        </div>
      </div>

      {/* ── 2. ORDERED FORMULATIONS TABLE & BREAKDOWN ── */}
      <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#DDD3C1] shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E5DEC9]">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#1C2E1A]">
              Botanical Formulas in this Harvest ({order.items.length})
            </h3>
            <p className="text-xs text-stone-500">
              Each formulation is batch-certified, cold-sealed, and backed by the 30-Day Guarantee.
            </p>
          </div>
          <span className="text-[10px] font-mono font-bold text-[#12602F] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            100% Bio-Active
          </span>
        </div>

        {/* Items List */}
        <div className="divide-y divide-[#E5DEC9]">
          {order.items.map((item) => (
            <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-16 h-16 rounded-2xl object-cover bg-[#FAF8F2] border border-[#DDD3C1] shrink-0 shadow-2xs"
                />
                <div className="min-w-0">
                  <h4 className="font-serif text-sm font-bold text-[#1C2E1A] truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs font-mono text-[#464D3F] mt-0.5">
                    Qty: <strong>{item.qty}</strong> &bull; ${item.price.toFixed(2)} USD each
                  </p>
                  <p className="text-[10px] text-stone-400 font-mono mt-0.5">
                    Clinical Lot: LOT-MRK-2026-B{item.id * 23} &bull; Sealed Cold Batch
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                <span className="font-mono text-base font-extrabold text-[#12602F]">
                  ${(item.price * item.qty).toFixed(2)} USD
                </span>

                <button
                  type="button"
                  onClick={() => {
                    if (onAddToCart) {
                      onAddToCart({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        img: item.img,
                      });
                      showToast(`${item.name} added to cart!`);
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#FAF8F2] hover:bg-[#12602F] text-[#1C2E1A] hover:text-[#AFD971] border border-[#DDD3C1] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-2xs"
                >
                  Buy Again
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Financial Calculation Breakdown */}
        <div className="pt-6 border-t border-[#E5DEC9] grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Botanical Guarantee Notice */}
          <div className="p-4 bg-[#FAF8F2] rounded-2xl border border-[#C9B387]/60 space-y-2">
            <div className="flex items-center gap-2 text-[#8C6221]">
              <ShieldCheck className="w-4 h-4 text-[#12602F]" />
              <span className="text-[10px] uppercase font-bold tracking-wider">
                30-Day Botanical Guarantee
              </span>
            </div>
            <p className="text-xs text-[#464D3F] leading-relaxed">
              If any formulation fails to deliver clinical radiance or causes skin sensitivity, you are protected with free doorstep returns and 100% reimbursement.
            </p>
            <div className="pt-1 flex items-center gap-3">
              <button
                type="button"
                onClick={() => onReturnOrder(order)}
                className="text-xs font-bold text-[#12602F] hover:underline cursor-pointer"
              >
                Initiate Return Claim &rarr;
              </button>
            </div>
          </div>

          {/* Summary Math */}
          <div className="space-y-2 text-xs text-[#464D3F] bg-[#FAF8F2]/60 p-4 rounded-2xl border border-[#DDD3C1]">
            <div className="flex justify-between">
              <span>Items Subtotal:</span>
              <span className="font-mono font-bold text-[#1C2E1A]">${itemsSubtotal.toFixed(2)} USD</span>
            </div>
            <div className="flex justify-between">
              <span>Carbon-Neutral Express Shipping:</span>
              <span className="font-bold text-[#12602F] uppercase">Free ($0.00)</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Botanical VAT / GST:</span>
              <span className="font-mono font-bold text-stone-600">Included</span>
            </div>
            <div className="pt-2 border-t border-[#E5DEC9] flex justify-between text-sm sm:text-base font-bold text-[#1C2E1A]">
              <span>Total Paid:</span>
              <span className="font-mono font-extrabold text-[#12602F]">${order.total.toFixed(2)} USD</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderDetailView;
