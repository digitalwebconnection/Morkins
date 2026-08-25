import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  CheckCircle2, 
  MapPin, 
  MessageCircle,
  ShoppingBag,
  Copy,
  Check
} from 'lucide-react';
import { SupportHero } from './components/SupportHero';

interface TrackingMilestone {
  date: string;
  time: string;
  location: string;
  status: string;
  completed: boolean;
}

interface OrderRecord {
  id: string;
  datePlaced: string;
  status: 'processing' | 'shipped' | 'out_for_delivery' | 'delivered';
  currentStep: number;
  carrier: string;
  awbNumber: string;
  estimatedDelivery: string;
  recipientName: string;
  deliveryAddress: string;
  milestones: TrackingMilestone[];
  items: {
    id: number;
    name: string;
    qty: number;
    price: number;
    img: string;
  }[];
}

const MOCK_ORDERS: Record<string, OrderRecord> = {
  'MK-98211': {
    id: 'MK-98211',
    datePlaced: 'July 10, 2026',
    status: 'shipped',
    currentStep: 3,
    carrier: 'BlueDart Express Air',
    awbNumber: 'BD-884920194IN',
    estimatedDelivery: 'Tomorrow by 4:00 PM',
    recipientName: 'Ananya Sharma',
    deliveryAddress: 'Flat 402, Green Glen Sanctuary, Outer Ring Road, Bengaluru, KA 560103',
    milestones: [
      { date: 'Today', time: '08:45 AM', location: 'Bengaluru Sort Facility Hub', status: 'Arrived at destination transit center', completed: true },
      { date: 'Yesterday', time: '10:30 PM', location: 'Mumbai Air Cargo Terminal', status: 'Departed Mumbai fulfillment hub via express air', completed: true },
      { date: 'Yesterday', time: '03:15 PM', location: 'Morkins Cold-Storage Lab', status: 'Eco-packaged in temperature-controlled carton', completed: true },
      { date: 'July 10', time: '11:20 AM', location: 'Morkins Central Ordering', status: 'Order confirmed & biometric verification passed', completed: true },
    ],
    items: [
      { id: 1, name: 'Rosewater Facial Mist', qty: 1, price: 34.0, img: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=200&auto=format&fit=crop' },
      { id: 2, name: 'Marula Nourishing Face Oil', qty: 1, price: 48.0, img: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=200&auto=format&fit=crop' }
    ]
  },
  'MK-87102': {
    id: 'MK-87102',
    datePlaced: 'May 24, 2026',
    status: 'delivered',
    currentStep: 5,
    carrier: 'Delhivery Prime',
    awbNumber: 'DLV-551029482IN',
    estimatedDelivery: 'Delivered on May 28, 2026',
    recipientName: 'Rohit Mehta',
    deliveryAddress: 'Plot 12, Gulmohar Avenue, Bandra West, Mumbai, MH 400050',
    milestones: [
      { date: 'May 28', time: '02:15 PM', location: 'Mumbai Residence', status: 'Handed over directly to recipient. Signed & verified.', completed: true },
      { date: 'May 28', time: '09:30 AM', location: 'Bandra Delivery Hub', status: 'Out for doorstep delivery with executive Mr. Ramesh', completed: true },
      { date: 'May 27', time: '06:00 PM', location: 'Thane Central Hub', status: 'Inbound sorting completed', completed: true },
      { date: 'May 25', time: '04:00 PM', location: 'Morkins Cold-Storage Lab', status: 'Dispatched with Carbon-offset courier', completed: true },
    ],
    items: [
      { id: 3, name: 'Aloe Vera Hydrating Gel', qty: 1, price: 42.0, img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=200&auto=format&fit=crop' }
    ]
  }
};

export default function TrackOrderPage() {
  const [searchParams] = useSearchParams();
  const [searchId, setSearchId] = useState(searchParams.get('id') || 'MK-98211');
  const [activeOrder, setActiveOrder] = useState<OrderRecord | null>(MOCK_ORDERS['MK-98211']);
  const [copiedAwb, setCopiedAwb] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    const queryId = searchParams.get('id');
    if (queryId && MOCK_ORDERS[queryId.toUpperCase()]) {
      setSearchId(queryId.toUpperCase());
      setActiveOrder(MOCK_ORDERS[queryId.toUpperCase()]);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = searchId.trim().toUpperCase();
    if (MOCK_ORDERS[cleanId]) {
      setActiveOrder(MOCK_ORDERS[cleanId]);
    } else {
      setActiveOrder({
        id: cleanId,
        datePlaced: 'Recently Placed',
        status: 'processing',
        currentStep: 2,
        carrier: 'Express Air Logistics',
        awbNumber: `EXP-${Math.floor(10000000 + Math.random() * 90000000)}IN`,
        estimatedDelivery: '3 – 4 Business Days',
        recipientName: 'Morkins Customer',
        deliveryAddress: 'Shipping address registered during checkout',
        milestones: [
          { date: 'Today', time: 'Just now', location: 'Morkins Cold Extraction Lab', status: 'Formulation harvested and packed in insulated carton', completed: true },
          { date: 'Today', time: 'Earlier', location: 'Central Ordering System', status: 'Payment verified and inventory allocated', completed: true }
        ],
        items: [
          { id: 101, name: 'Squalane Radiance Glow Serum', qty: 1, price: 38.0, img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=200&q=80' }
        ]
      });
    }
  };

  const copyAwb = () => {
    if (activeOrder) {
      navigator.clipboard.writeText(activeOrder.awbNumber);
      setCopiedAwb(true);
      setTimeout(() => setCopiedAwb(false), 3000);
    }
  };

  const steps = [
    { title: 'Confirmed', desc: 'Order placed' },
    { title: 'Eco-Packed', desc: 'Cold protected' },
    { title: 'In Transit', desc: 'Air cargo' },
    { title: 'Out for Delivery', desc: 'Local courier' },
    { title: 'Delivered', desc: 'At doorstep' }
  ];

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-neutral-800 pb-20">
      {/* Redesigned Luxury Hero Banner */}
      <SupportHero
        badge="Real-Time Shipment Radar"
        title="Track My Order"
        subtitle="Check live GPS milestones, dispatch checkpoints, and estimated delivery dates for your botanical orders."
        breadcrumbCurrent="Track Order"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 relative z-20 space-y-10">
        
        {/* Search Bar & Test IDs Card */}
        <div className="bg-white/95 rounded-3xl p-6 sm:p-8 border border-[#184433]/10 shadow-xl shadow-[#184433]/5 max-w-4xl mx-auto backdrop-blur-md">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-[#184433]/60 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter Order ID (e.g. MK-98211 or MK-87102)..."
                className="w-full bg-[#f9faf7] text-neutral-900 placeholder:text-neutral-400 text-sm sm:text-base pl-12 pr-4 py-4 rounded-2xl border border-[#184433]/15 focus:outline-none focus:border-[#184433] focus:bg-white transition-all font-mono shadow-inner"
              />
            </div>
            <button
              type="submit"
              className="bg-[#184433] text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-2xl hover:bg-[#0F3822] transition-colors cursor-pointer shrink-0 shadow-md shadow-[#184433]/20"
            >
              Track Shipment
            </button>
          </form>

          {/* Quick Test Demo Chips */}
          <div className="mt-4 flex items-center gap-2 flex-wrap text-xs text-neutral-500">
            <span className="font-semibold text-[#184433]">Quick Test IDs:</span>
            <button
              onClick={() => { setSearchId('MK-98211'); setActiveOrder(MOCK_ORDERS['MK-98211']); }}
              className="px-3 py-1 rounded-full bg-[#184433]/5 text-[#184433] font-mono hover:bg-[#184433] hover:text-white transition-colors cursor-pointer border border-[#184433]/10 text-[11px]"
            >
              MK-98211 (In Transit)
            </button>
            <button
              onClick={() => { setSearchId('MK-87102'); setActiveOrder(MOCK_ORDERS['MK-87102']); }}
              className="px-3 py-1 rounded-full bg-[#184433]/5 text-[#184433] font-mono hover:bg-[#184433] hover:text-white transition-colors cursor-pointer border border-[#184433]/10 text-[11px]"
            >
              MK-87102 (Delivered)
            </button>
          </div>
        </div>

        {/* Order Details & Stepper */}
        {activeOrder && (
          <div className="space-y-8 animate-fade-in">
            {/* Header Status Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#184433]/10 shadow-xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-100 pb-6 mb-8">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="font-serif text-3xl sm:text-4xl text-[#184433] font-normal">
                      Order #{activeOrder.id}
                    </h2>
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full ${
                      activeOrder.status === 'delivered'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-[#AFD971]/20 text-[#184433] border border-[#AFD971]/40'
                    }`}>
                      {activeOrder.status === 'delivered' ? '✓ Delivered' : '● In Transit'}
                    </span>
                  </div>
                  <p className="text-neutral-500 text-xs font-light mt-1">
                    Placed on {activeOrder.datePlaced} • Express Air Delivery
                  </p>
                </div>

                <div className="sm:text-right bg-[#FAF9F5] sm:bg-transparent p-4 sm:p-0 rounded-2xl w-full sm:w-auto">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-400 block">Expected Arrival</span>
                  <span className="text-lg sm:text-xl font-bold text-[#184433]">{activeOrder.estimatedDelivery}</span>
                </div>
              </div>

              {/* Multi-Step Visual Progress Stepper */}
              <div className="py-4 px-2">
                <div className="grid grid-cols-5 gap-2 relative">
                  {/* Stepper Progress Connector Line */}
                  <div className="absolute top-4 left-[10%] right-[10%] h-1 bg-neutral-100 -z-0 rounded-full">
                    <div
                      className="h-full bg-[#184433] transition-all duration-700 rounded-full"
                      style={{ width: `${((activeOrder.currentStep - 1) / 4) * 100}%` }}
                    />
                  </div>

                  {steps.map((st, idx) => {
                    const stepNum = idx + 1;
                    const isCompleted = stepNum <= activeOrder.currentStep;
                    const isCurrent = stepNum === activeOrder.currentStep;

                    return (
                      <div key={idx} className="flex flex-col items-center text-center relative z-10">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                            isCompleted
                              ? 'bg-[#184433] text-[#AFD971] shadow-lg shadow-[#184433]/25 ring-4 ring-white'
                              : 'bg-neutral-200 text-neutral-500 ring-4 ring-white'
                          }`}
                        >
                          {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : stepNum}
                        </div>
                        <span className={`text-[11px] sm:text-xs font-bold mt-3 ${isCurrent ? 'text-[#184433]' : 'text-neutral-600'}`}>
                          {st.title}
                        </span>
                        <span className="hidden sm:block text-[10px] text-neutral-400 font-light mt-0.5 leading-tight">
                          {st.desc}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Carrier & AWB Details Bar */}
              <div className="mt-8 bg-[#FAF9F5] rounded-2xl p-5 border border-[#184433]/5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-neutral-400 uppercase tracking-wider font-bold block text-[10px]">Carrier Partner</span>
                  <span className="font-bold text-[#184433] text-sm mt-0.5 block">{activeOrder.carrier}</span>
                </div>
                <div>
                  <span className="text-neutral-400 uppercase tracking-wider font-bold block text-[10px]">AWB Tracking Code</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-mono font-bold text-neutral-800 text-sm">{activeOrder.awbNumber}</span>
                    <button
                      onClick={copyAwb}
                      className="p-1 hover:bg-neutral-200 rounded text-neutral-500 cursor-pointer"
                      title="Copy AWB Number"
                    >
                      {copiedAwb ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <span className="text-neutral-400 uppercase tracking-wider font-bold block text-[10px]">Delivery Destination</span>
                  <span className="text-neutral-700 font-medium text-xs mt-0.5 block truncate">{activeOrder.deliveryAddress}</span>
                </div>
              </div>
            </div>

            {/* Layout: Milestones Log + Package Items */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Milestone Timeline */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#184433]/10 shadow-xs space-y-6">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                  <h3 className="font-serif text-2xl text-[#184433] font-normal">Tracking Activity Log</h3>
                  <span className="text-xs text-neutral-400 font-medium">Real-time GPS Milestones</span>
                </div>

                <div className="space-y-6 relative border-l-2 border-[#184433]/15 ml-3 pl-6">
                  {activeOrder.milestones.map((m, idx) => (
                    <div key={idx} className="relative">
                      {/* Node Dot */}
                      <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#184433] ring-4 ring-[#184433]/15" />
                      <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                        <span className="font-bold text-[#6F8C51]">{m.date} • {m.time}</span>
                        <span className="flex items-center gap-1 text-neutral-500"><MapPin className="w-3 h-3 text-[#184433]" /> {m.location}</span>
                      </div>
                      <p className="text-sm font-semibold text-neutral-800 leading-snug">{m.status}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Package Items Card */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-8 sm:p-10 border border-[#184433]/10 shadow-xs space-y-6">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                  <h3 className="font-serif text-2xl text-[#184433] font-normal">Package Contents</h3>
                  <span className="text-xs bg-[#184433]/5 text-[#184433] px-3 py-1 rounded-full font-bold">
                    {activeOrder.items.length} {activeOrder.items.length === 1 ? 'Item' : 'Items'}
                  </span>
                </div>

                <div className="space-y-4 divide-y divide-neutral-100">
                  {activeOrder.items.map((item) => (
                    <div key={item.id} className="pt-4 first:pt-0 flex items-center gap-4">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-2xl border border-neutral-200 shadow-xs"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-sans text-sm font-bold text-[#184433] truncate">{item.name}</h4>
                        <p className="text-xs text-neutral-500 font-light mt-0.5">Qty: {item.qty} • Glass Bottle</p>
                      </div>
                      <span className="text-sm font-bold text-neutral-900">${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-neutral-100">
                  <Link
                    to="/products"
                    className="w-full flex items-center justify-center gap-2 bg-[#184433]/5 text-[#184433] text-xs font-bold uppercase tracking-wider py-3.5 rounded-2xl hover:bg-[#184433] hover:text-white transition-all duration-200"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Explore More Botanical Formulas</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Live Support Banner */}
        <div className="bg-gradient-to-br from-[#184433] via-[#0F3822] to-black text-white rounded-3xl p-8 sm:p-10 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#AFD971]">Concierge Assist</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white mt-1">Need help with this delivery?</h3>
            <p className="text-white/80 text-sm font-light mt-1 max-w-xl">
              Connect directly with our logistics team on WhatsApp to modify your delivery timing or provide special gate instructions.
            </p>
          </div>
          <Link
            to="/whatsapp-support"
            className="inline-flex items-center gap-2 bg-[#AFD971] text-[#0F3822] font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full hover:bg-white transition-colors cursor-pointer shrink-0 shadow-lg shadow-[#AFD971]/20"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Logistics Desk</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
