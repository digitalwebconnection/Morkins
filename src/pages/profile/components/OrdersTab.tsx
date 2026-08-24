import React, { useState } from 'react';
import { 
Package, Truck, CheckCircle2, RotateCcw, 
  FileText, ArrowRight, Copy, Check
} from 'lucide-react';

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
  onAddToCart?: (product: { id: number; name: string; price: number; img: string }) => void;
  t: (key: string) => string;
}

export const OrdersTab: React.FC<OrdersTabProps> = ({
  orders,
  setSelectedTrackingOrder,
  setActiveTab,
  onAddToCart,
  t,
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'in_transit' | 'delivered'>('all');
  const [copiedOrderId, setCopiedOrderId] = useState<string | null>(null);
  const [reorderedId, setReorderedId] = useState<string | null>(null);
  const [downloadedInvoiceId, setDownloadedInvoiceId] = useState<string | null>(null);

  const filteredOrders = orders.filter((order) => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'in_transit') return ['processing', 'shipped', 'out_for_delivery'].includes(order.status);
    if (filterStatus === 'delivered') return order.status === 'delivered';
    return true;
  });

  const handleCopyOrderId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedOrderId(id);
    setTimeout(() => setCopiedOrderId(null), 2000);
  };

  const handleReorder = (order: Order) => {
    if (onAddToCart) {
      order.items.forEach((item) => {
        onAddToCart({
          id: item.id,
          name: item.name,
          price: item.price,
          img: item.img
        });
      });
    }
    setReorderedId(order.id);
    setTimeout(() => setReorderedId(null), 3000);
  };

  const handleDownloadInvoice = (orderId: string) => {
    setDownloadedInvoiceId(orderId);
    setTimeout(() => setDownloadedInvoiceId(null), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* ── Section Header ── */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DDD3C1]/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#12602F] via-[#1F8242] to-[#C49746]" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E5DEC9]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-linear-to-r from-[#F4EFE6] to-[#EFE8D8] border border-[#C9B387]/50 text-[10px] font-bold uppercase tracking-widest text-[#8C6D34] mb-1">
              <span>✦</span>
              <span>Purchase Archive</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#1C2E1A]">{t('profile_tab_orders')}</h3>
            <p className="text-xs text-[#464D3F] mt-0.5">
              Trace active clinical shipments, reorder previous formulas, and download official invoices
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-[#FAF8F2] p-1.5 rounded-xl border border-[#DDD3C1]">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                filterStatus === 'all'
                  ? 'bg-[#12602F] text-[#AFD971] shadow-2xs'
                  : 'text-[#464D3F] hover:text-[#12602F]'
              }`}
            >
              All ({orders.length})
            </button>
            <button
              onClick={() => setFilterStatus('in_transit')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                filterStatus === 'in_transit'
                  ? 'bg-[#12602F] text-[#AFD971] shadow-2xs'
                  : 'text-[#464D3F] hover:text-[#12602F]'
              }`}
            >
              In Transit
            </button>
            <button
              onClick={() => setFilterStatus('delivered')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                filterStatus === 'delivered'
                  ? 'bg-[#12602F] text-[#AFD971] shadow-2xs'
                  : 'text-[#464D3F] hover:text-[#12602F]'
              }`}
            >
              Delivered
            </button>
          </div>
        </div>

        {/* Reorder Notification Banner */}
        {reorderedId && (
          <div className="mt-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs font-semibold flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>All items from order #{reorderedId} added to your shopping bag!</span>
            </div>
            <span className="text-[11px] font-bold text-emerald-800">✓ In Bag</span>
          </div>
        )}

        {/* Invoice Download Simulation Banner */}
        {downloadedInvoiceId && (
          <div className="mt-4 p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs font-semibold flex items-center gap-2 animate-fade-in">
            <FileText className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Official Tax Invoice for #{downloadedInvoiceId} generated and downloaded.</span>
          </div>
        )}

        {/* ── Order Cards Output ── */}
        <div className="mt-6 space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16 bg-[#FAF8F2] rounded-2xl border border-[#DDD3C1]/80 p-8">
              <Package className="w-10 h-10 mx-auto mb-2 text-gray-400" />
              <h4 className="font-serif text-lg font-bold text-[#1C2E1A]">No orders found in this status</h4>
              <p className="text-xs text-[#464D3F] mt-1">Select "All" to review your complete transaction history.</p>
              <button
                onClick={() => setFilterStatus('all')}
                className="mt-4 px-5 py-2 bg-[#12602F] text-[#AFD971] text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer"
              >
                Show All Orders
              </button>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const isDelivered = order.status === 'delivered';
              const isInTransit = ['shipped', 'out_for_delivery'].includes(order.status);

              return (
                <div
                  key={order.id}
                  className="rounded-2xl border border-[#DDD3C1] overflow-hidden bg-white shadow-2xs hover:shadow-md hover:border-[#12602F]"
                >
                  {/* Order Card Header */}
                  <div className="bg-linear-to-r from-[#FAF8F2] via-[#F7F4EB] to-[#FAF8F2] p-4 sm:p-5 border-b border-[#E5DEC9] flex flex-wrap items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white border border-[#DDD3C1] flex items-center justify-center text-[#12602F] shadow-2xs shrink-0">
                        {isDelivered ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        ) : isInTransit ? (
                          <Truck className="w-5 h-5 text-[#8C6221] animate-pulse" />
                        ) : (
                          <Package className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-serif text-base font-bold text-[#1C2E1A]">
                            Order #{order.id}
                          </span>
                          <button
                            onClick={() => handleCopyOrderId(order.id)}
                            className="p-1 rounded hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
                            title="Copy Order ID"
                          >
                            {copiedOrderId === order.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                        <span className="text-[11px] text-[#464D3F] block mt-0.5">
                          Placed on {order.date}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <span className="text-[10px] uppercase font-bold text-[#8C6221] tracking-wider block">
                          Total Amount
                        </span>
                        <span className="font-serif text-base font-bold text-[#12602F]">
                          ${order.total.toFixed(2)}
                        </span>
                      </div>

                      {/* Status Badge */}
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1.5 shadow-2xs ${
                          isDelivered
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : isInTransit
                            ? 'bg-amber-50 text-amber-900 border-amber-200'
                            : 'bg-blue-50 text-blue-900 border-blue-200'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          isDelivered ? 'bg-emerald-500' : isInTransit ? 'bg-amber-500 animate-pulse' : 'bg-blue-500'
                        }`} />
                        <span>{order.status.replace(/_/g, ' ')}</span>
                      </span>
                    </div>
                  </div>

                  {/* Order Items List */}
                  <div className="p-5 divide-y divide-[#E5DEC9]/60">
                    {order.items.map((item) => {
                      const translatedName = t('prod_' + item.id + '_name') || item.name;
                      return (
                        <div key={item.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3.5 min-w-0">
                            <img
                              src={item.img}
                              alt={translatedName}
                              className="w-14 h-14 object-cover rounded-xl border border-[#DDD3C1] shadow-2xs bg-[#FAF8F2] shrink-0"
                            />
                            <div className="min-w-0">
                              <h4 className="text-xs sm:text-sm font-bold text-[#1C2E1A] truncate">
                                {translatedName}
                              </h4>
                              <p className="text-[11px] text-[#464D3F] mt-0.5">
                                Qty: {item.qty} × ${item.price.toFixed(2)}
                              </p>
                            </div>
                          </div>

                          <span className="font-serif text-xs sm:text-sm font-bold text-[#1C2E1A] shrink-0">
                            ${(item.price * item.qty).toFixed(2)}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Order Card Footer Actions */}
                  <div className="bg-[#FAF8F2]/60 px-5 py-3.5 border-t border-[#E5DEC9] flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-[#464D3F] font-mono">
                        Tracking: <strong>{order.trackingNumber}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Download Invoice Button */}
                      <button
                        onClick={() => handleDownloadInvoice(order.id)}
                        className="px-3.5 py-1.5 rounded-xl border border-[#DDD3C1] hover:border-[#12602F] text-[#1C2E1A] text-[11px] font-bold uppercase tracking-wider bg-white transition-all cursor-pointer shadow-2xs flex items-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#8C6221]" />
                        <span>Invoice</span>
                      </button>

                      {/* Buy Again Button */}
                      <button
                        onClick={() => handleReorder(order)}
                        className="px-3.5 py-1.5 rounded-xl border border-[#DDD3C1] hover:border-[#12602F] text-[#1C2E1A] text-[11px] font-bold uppercase tracking-wider bg-white transition-all cursor-pointer shadow-2xs flex items-center gap-1.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Buy Again</span>
                      </button>

                      {/* Track Package Button */}
                      <button
                        onClick={() => {
                          setSelectedTrackingOrder(order);
                          setActiveTab('tracking');
                        }}
                        className="px-4 py-1.5 bg-linear-to-r from-[#12602F] to-[#1F7A3E] hover:from-[#0E4F26] hover:to-[#176B37] text-[#AFD971] text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-xs active:scale-95 flex items-center gap-1.5"
                      >
                        <span>Track Package</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

    </div>
  );
};
