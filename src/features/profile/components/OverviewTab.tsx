import React from 'react';
import {
  Sparkles, Truck, Heart, MapPin, CreditCard,
  RotateCcw, Gift, ArrowRight, ShieldCheck, 
  Award, ChevronRight, Compass, Star,
  ShoppingBag
} from 'lucide-react';
import type { User, Order, Address } from '../../../types';

interface OverviewTabProps {
  user: User;
  orders: Order[];
  addresses: Address[];
  wishlist: any[];
  returnCount: number;
  setActiveTab: (tab: any) => void;
  setSelectedTrackingOrder: (order: Order) => void;
  onAddToCart?: (product: { id: number; name: string; price: number; img: string }) => void;
  t: (key: string) => string;
}

const RECOMMENDED_FORMULAS = [
  {
    id: 1,
    name: 'Rosewater Facial Mist',
    price: 34.0,
    category: 'Bio-Active Toner',
    img: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Marula Nourishing Face Oil',
    price: 48.0,
    category: 'Cold-Pressed Lipid',
    img: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Aloe Vera Hydrating Gel',
    price: 42.0,
    category: 'Cellular Hydrator',
    img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=300&auto=format&fit=crop',
  },
];

export const OverviewTab: React.FC<OverviewTabProps> = ({
  user,
  orders,
  addresses,
  wishlist,
  returnCount,
  setActiveTab,
  setSelectedTrackingOrder,
  onAddToCart,
}) => {
  const activeOrder = orders.find((o) => ['processing', 'shipped', 'out_for_delivery'].includes(o.status)) || orders[0];
  const loyaltyLeaves = user.loyaltyPoints || 1450;
  const tierTarget = 2000;
  const tierProgress = Math.min(100, Math.round((loyaltyLeaves / tierTarget) * 100));

  return (
    <div className="space-y-7 animate-fade-in text-[#1C2E1A]">
      
      {/* ── 1. WELCOME & VIP TIER BANNER ── */}
      <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#DDD3C1] shadow-md relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-[#12602F] via-[#C49746] to-[#AFD971]" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E5DEC9]">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-linear-to-br from-[#12602F] to-[#1F7A3E] text-[#AFD971] flex items-center justify-center font-serif text-2xl font-bold shadow-md ring-4 ring-[#12602F]/15 shrink-0 overflow-hidden">
              {user.avatar || user.profileImage ? (
                <img
                  src={user.avatar || user.profileImage}
                  alt={user.fullName || 'User'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{(user.fullName || user.email || 'M').charAt(0).toUpperCase()}</span>
              )}
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D8EFE3] text-[#0D3322] text-[10px] font-extrabold uppercase tracking-widest mb-1 shadow-2xs">
                <Award className="w-3 h-3 text-[#12602F]" />
                <span>Botanical VIP Connoisseur</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C2E1A]">
                Welcome Back, {user.fullName ? user.fullName.split(' ')[0] : 'Patron'}
              </h2>
              <p className="text-xs text-[#464D3F] mt-0.5">
                Member ID: <span className="font-mono font-bold text-stone-600">MRK-VIP-{(user.email || '4829').substring(0, 7).toUpperCase()}</span> &bull; Sanctuary Portal Active
              </p>
            </div>
          </div>

          {/* Loyalty Leaves & Tier Progress */}
          <div className="p-4 rounded-xl bg-[#FAF8F2] border border-[#DDD3C1] min-w-65 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-[#8C6221]">
                Sanctuary Leaves
              </span>
              <strong className="font-mono text-base font-extrabold text-[#12602F]">
                {loyaltyLeaves.toLocaleString()} 🍃
              </strong>
            </div>

            <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-[#12602F] to-[#AFD971] rounded-full transition-all duration-700"
                style={{ width: `${tierProgress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[10px] text-stone-500 font-mono">
              <span>Gold Tier ({loyaltyLeaves} pts)</span>
              <span>Platinum Tier ({tierTarget} pts)</span>
            </div>
          </div>
        </div>

        {/* ── 4 QUICK METRIC PILLS ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5">
          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className="p-3 bg-linear-to-b from-[#FAF8F2] to-white rounded-xl border border-[#DDD3C1]/80 text-left hover:border-[#12602F] transition-all cursor-pointer shadow-2xs group"
          >
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#8C6221] block">
              Total Harvests
            </span>
            <div className="flex items-center justify-between mt-1">
              <span className="font-serif text-lg font-bold text-[#1C2E1A]">{orders.length} Orders</span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#12602F] group-hover:translate-x-0.5 transition-all" />
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('tracking')}
            className="p-3 bg-linear-to-b from-[#FAF8F2] to-white rounded-xl border border-[#DDD3C1]/80 text-left hover:border-[#12602F] transition-all cursor-pointer shadow-2xs group"
          >
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#8C6221] block">
              Active Shipments
            </span>
            <div className="flex items-center justify-between mt-1">
              <span className="font-serif text-lg font-bold text-[#12602F]">
                {orders.filter((o) => ['processing', 'shipped', 'out_for_delivery'].includes(o.status)).length} In Transit
              </span>
              <Compass className="w-3.5 h-3.5 text-[#12602F]" />
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('wishlist')}
            className="p-3 bg-linear-to-b from-[#FAF8F2] to-white rounded-xl border border-[#DDD3C1]/80 text-left hover:border-[#12602F] transition-all cursor-pointer shadow-2xs group"
          >
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#8C6221] block">
              Saved Formulations
            </span>
            <div className="flex items-center justify-between mt-1">
              <span className="font-serif text-lg font-bold text-[#1C2E1A]">{wishlist.length} Items</span>
              <Heart className="w-3.5 h-3.5 text-rose-500" />
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('returns')}
            className="p-3 bg-linear-to-b from-[#FAF8F2] to-white rounded-xl border border-[#DDD3C1]/80 text-left hover:border-[#12602F] transition-all cursor-pointer shadow-2xs group"
          >
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#8C6221] block">
              Guarantee Claims
            </span>
            <div className="flex items-center justify-between mt-1">
              <span className="font-serif text-lg font-bold text-[#1C2E1A]">{returnCount} Active/Resolved</span>
              <RotateCcw className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#12602F]" />
            </div>
          </button>
        </div>
      </div>

      {/* ── 2. LIVE ACTIVE RADAR SNAPSHOT ── */}
      {activeOrder && (
        <div className="bg-white rounded-lg p-6 sm:p-7 border border-[#DDD3C1] shadow-sm relative overflow-hidden space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5DEC9]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#12602F] text-[#AFD971] flex items-center justify-center shadow-xs">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-[#1C2E1A]">
                  Latest Dispatch Radar: Order #{activeOrder.id}
                </h3>
                <p className="text-[11px] text-stone-500">
                  Carrier: BlueDart Carbon-Neutral Air &bull; Est. Delivery: {activeOrder.estimatedDelivery || 'On Schedule'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedTrackingOrder(activeOrder);
                setActiveTab('tracking');
              }}
              className="px-3.5 py-1.5 rounded-xl bg-[#12602F] hover:bg-[#1B6A45] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <span>Live Telemetry</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex -space-x-3 shrink-0">
              {activeOrder.items.slice(0, 3).map((item) => (
                <img
                  key={item.id}
                  src={item.img}
                  alt={item.name}
                  className="w-12 h-12 rounded-xl object-cover bg-white border-2 border-[#DDD3C1] shadow-2xs"
                />
              ))}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-[#1C2E1A] truncate">
                {activeOrder.items.map((i) => i.name).join(', ')}
              </p>
              <p className="text-[11px] text-stone-500 font-mono mt-0.5">
                {activeOrder.items.length} formulas &bull; Total: ${activeOrder.total.toFixed(2)} USD
              </p>
            </div>

            <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-[#0D3322] border border-emerald-200">
              {activeOrder.status.replace(/_/g, ' ')}
            </span>
          </div>
        </div>
      )}

      {/* ── 3. QUICK ACTIONS HUB & RECOMMENDED FORMULATIONS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 5 Cols: Quick Hub Navigation */}
        <div className="lg:col-span-5 bg-white rounded-lg p-6 border border-[#DDD3C1] shadow-sm space-y-4">
          <h3 className="font-serif text-base font-bold text-[#1C2E1A] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#12602F]" />
            <span>Sanctuary Quick Hub</span>
          </h3>

          <div className="space-y-2">
            {[
              { id: 'payments', label: 'Manage Saved Cards & UPI', icon: CreditCard, desc: 'Secure 256-bit vault' },
              { id: 'addresses', label: 'Shipping & Delivery Addresses', icon: MapPin, desc: `${addresses.length} saved sanctuaries` },
              { id: 'reviews', label: 'My Clinical Reviews', icon: Star, desc: 'Earn +50 loyalty leaves' },
              { id: 'referral', label: 'Scratch Card & VIP Referrals', icon: Gift, desc: 'Invite friends & win vouchers' },
              { id: 'security', label: 'Account Security & Password', icon: ShieldCheck, desc: '2FA & active sessions' },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => setActiveTab(action.id)}
                  className="w-full p-3 rounded-2xl bg-[#FAF8F2] hover:bg-white border border-[#E5DEC9] hover:border-[#12602F] text-left transition-all cursor-pointer flex items-center justify-between group shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white text-[#12602F] border border-[#DDD3C1] flex items-center justify-center group-hover:bg-[#12602F] group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#1C2E1A] group-hover:text-[#12602F] transition-colors">
                        {action.label}
                      </h4>
                      <p className="text-[10px] text-stone-500">{action.desc}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-[#12602F] group-hover:translate-x-0.5 transition-all" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 7 Cols: Recommended Formulations */}
        <div className="lg:col-span-7 bg-white rounded-lg p-6 border border-[#DDD3C1] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E5DEC9]">
            <h3 className="font-serif text-base font-bold text-[#1C2E1A] flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#8C6221]" />
              <span>Tailored For Your Botanical Ritual</span>
            </h3>
            <span className="text-[10px] font-mono text-stone-400 uppercase font-bold">
              1-Click Re-Harvest
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {RECOMMENDED_FORMULAS.map((rec) => (
              <div
                key={rec.id}
                className="bg-[#FAF8F2] p-3.5 rounded-2xl border border-[#E5DEC9]/80 flex flex-col justify-between space-y-3 hover:border-[#12602F]/40 transition-all shadow-2xs"
              >
                <div>
                  <img
                    src={rec.img}
                    alt={rec.name}
                    className="w-full h-28 object-cover rounded-xl bg-white border border-[#DDD3C1] mb-2"
                  />
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#8C6221] block">
                    {rec.category}
                  </span>
                  <h4 className="font-serif text-xs font-bold text-[#1C2E1A] truncate mt-0.5">
                    {rec.name}
                  </h4>
                  <p className="text-xs font-mono font-extrabold text-[#12602F] mt-1">
                    ${rec.price.toFixed(2)} USD
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onAddToCart && onAddToCart(rec)}
                  className="w-full py-1.5 rounded-xl bg-white hover:bg-[#12602F] text-[#1C2E1A] hover:text-[#AFD971] border border-[#DDD3C1] text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-2xs"
                >
                  + Add to Bag
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default OverviewTab;
