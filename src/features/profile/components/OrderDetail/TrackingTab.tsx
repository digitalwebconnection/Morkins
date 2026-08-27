import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Check, Truck, Package, MapPin, Copy, ArrowLeft,
  ShieldCheck, Clock, Navigation, Phone,
  MessageCircle, RefreshCw, Thermometer, CheckCircle2,
  BellRing, Eye
} from 'lucide-react';
import type { Order } from '../../../../types';

interface TrackingStep {
  label: string;
  desc: string;
  time: string;
  completed: boolean;
}

interface TrackingTabProps {
  selectedTrackingOrder: Order;
  trackingSteps?: TrackingStep[];
  orders?: Order[];
  setSelectedTrackingOrder?: (order: Order) => void;
  setActiveTab?: (tab: any) => void;
  t: (key: string) => string;
}

export const TrackingTab: React.FC<TrackingTabProps> = ({
  selectedTrackingOrder,
  orders = [],
  setSelectedTrackingOrder,
  setActiveTab,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedOtp, setCopiedOtp] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Live Notification Preferences State
  const [notifyWhatsapp, setNotifyWhatsapp] = useState(true);
  const [notifySms, setNotifySms] = useState(true);


  // Driver Call Modal / Toast Simulator
  const [showDriverHelp, setShowDriverHelp] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyTracking = () => {
    const code = selectedTrackingOrder.trackingNumber || `TRK-MK-${selectedTrackingOrder.id}-ECO`;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
    showToast(`AWB Tracking Code #${code} copied.`);
  };

  const handleCopyOtp = (otp: string) => {
    navigator.clipboard.writeText(otp);
    setCopiedOtp(true);
    setTimeout(() => setCopiedOtp(false), 2000);
    showToast(`Doorstep Security OTP #${otp} copied.`);
  };

  const handleRefreshTelemetry = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Live GPS Telemetry & Waypoint data synchronized.');
    }, 800);
  };

  const isDelivered = selectedTrackingOrder.status === 'delivered';
  const isOutForDelivery = selectedTrackingOrder.status === 'out_for_delivery';
  const isShipped = selectedTrackingOrder.status === 'shipped';
  const isProcessing = selectedTrackingOrder.status === 'processing';

  // Realistic dynamic Doorstep OTP and AWB
  const orderOtp = (
    Math.abs(
      selectedTrackingOrder.id
        .split('')
        .reduce((acc, char) => acc + char.charCodeAt(0) * 17, 4829) % 9000
    ) + 1000
  ).toString();

  const trackingAwb =
    selectedTrackingOrder.trackingNumber ||
    `BD-ECO-${selectedTrackingOrder.id.replace(/[^0-9]/g, '') || '98211'}-IN`;

  // Comprehensive, realistic botanical telemetry milestones
  const detailedMilestones = [
    {
      id: 'step-1',
      title: 'Order Confirmed & Certified',
      facility: 'Morkins Central Botanical Ordering Desk',
      date: selectedTrackingOrder.date || 'July 10, 2026',
      time: '10:24 AM',
      desc: 'Formulation batch certified, phytochemical seal approved, and invoice registered.',
      completed: true,
      current: false,
      tag: 'Verified',
    },
    {
      id: 'step-2',
      title: 'Cold-Chain Harvest & Eco-Packaging',
      facility: 'Morkins Clean-Room Lab (Nilgiris Bio-Facility)',
      date: 'July 11, 2026',
      time: '02:40 PM',
      desc: 'Formulas sealed in 100% recyclable, temperature-buffered compostable cartons at 18°C.',
      completed: !isProcessing,
      current: isProcessing,
      tag: '18°C Shield',
    },
    {
      id: 'step-3',
      title: 'Dispatched via Carbon-Neutral Air Fleet',
      facility: 'Express Freight Transit Hub • Sort Bay 4',
      date: 'July 13, 2026',
      time: '09:12 AM',
      desc: 'Dispatched via BlueDart Carbon-Neutral EV / Express Cargo. Inbound line-haul active.',
      completed: isShipped || isOutForDelivery || isDelivered,
      current: isShipped,
      tag: 'AWB Scanned',
    },
    {
      id: 'step-4',
      title: 'Out for Doorstep Sanctuary Delivery',
      facility: 'Local Metropolitan Botanical Sort Hub',
      date: isDelivered ? 'July 15, 2026' : 'Today / Tomorrow',
      time: '08:30 AM',
      desc: 'Assigned to Eco-Rider Mr. Devendra Sharma. Recipient handshake OTP ready.',
      completed: isOutForDelivery || isDelivered,
      current: isOutForDelivery,
      tag: 'Rider In Transit',
    },
    {
      id: 'step-5',
      title: 'Delivered to Home Sanctuary',
      facility: selectedTrackingOrder.shippingAddress || 'Customer Sanctuary Address',
      date: selectedTrackingOrder.estimatedDelivery || 'Delivered',
      time: '04:00 PM',
      desc: 'Formulas received in pristine cellular condition. Digital signature recorded.',
      completed: isDelivered,
      current: false,
      tag: isDelivered ? 'Completed' : 'Expected',
    },
  ];

  // Calculate percentage of progress
  const progressPercentage = isDelivered
    ? 100
    : isOutForDelivery
      ? 75
      : isShipped
        ? 50
        : 25;

  return (
    <div className="space-y-6 animate-fade-in text-[#1C2E1A]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-[#12602F] text-white text-xs font-bold rounded-2xl shadow-2xl border border-[#AFD971]/30 flex items-center gap-3 animate-slide-up">
          <CheckCircle2 className="w-4 h-4 text-[#AFD971] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── 1. TOP SANCTUARY SHIPMENT RADAR HEADER ── */}
      <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#DDD3C1] shadow-md relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-[#12602F] via-[#C49746] to-[#AFD971]" />

        {/* Top Action Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#E5DEC9]">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-linear-to-r from-[#D8EFE3] to-[#FAF8F2] border border-[#13442C]/20 text-[#0D3322] text-[10px] font-extrabold uppercase tracking-widest shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#12602F] animate-ping" />
                <span>Live Cellular Dispatch Radar</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-[#8C6221] bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">
                100% Temperature Shielded (18°C)
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C2E1A]">
              Delivery & Shipment Telemetry
            </h2>
            <p className="text-xs sm:text-sm text-[#464D3F] mt-1 max-w-2xl leading-relaxed">
              Real-time cellular dispatch tracking, eco-courier route waypoints, climate stability metrics, and doorstep security handshake.
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-2.5">
            {/* Sync Telemetry Button */}
            <button
              type="button"
              onClick={handleRefreshTelemetry}
              className="px-3.5 py-2 rounded-lg bg-[#FAF8F2] hover:bg-[#F4EFE6] border border-[#DDD3C1] text-stone-700 hover:text-[#12602F] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-2xs flex items-center gap-1.5"
              title="Synchronize Live Telemetry"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#12602F] ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Sync GPS</span>
            </button>

            {/* Back to Orders Button */}
            {setActiveTab && (
              <button
                type="button"
                onClick={() => setActiveTab('orders')}
                className="px-3.5 py-2 rounded-xl border border-[#DDD3C1] hover:border-[#12602F] text-[#1C2E1A] text-xs font-bold uppercase tracking-wider bg-white hover:bg-[#FAF8F2] transition-all cursor-pointer shadow-2xs flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Orders</span>
              </button>
            )}

            {/* View Full Order Details Link */}
            <Link
              to={`/orders/${selectedTrackingOrder.id}`}
              className="px-4 py-2 rounded-xl bg-[#12602F] hover:bg-[#1B6A45] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs hover:shadow-md flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-[#AFD971]" />
              <span>Full Receipt</span>
            </Link>
          </div>
        </div>

        {/* ── ACTIVE SHIPMENT SWITCHER (QUICK ORDER TABS) ── */}
        {orders && orders.length > 0 && (
          <div className="pt-4 pb-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6221] block">
                Select Active Order to Track ({orders.length} in Sanctuary):
              </span>
              <span className="text-[10px] font-mono text-stone-400 font-bold uppercase">
                Instant Switcher
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {orders.map((ord) => {
                const isCurrent = ord.id === selectedTrackingOrder.id;
                const isOrdDelivered = ord.status === 'delivered';
                return (
                  <button
                    key={ord.id}
                    type="button"
                    onClick={() => setSelectedTrackingOrder && setSelectedTrackingOrder(ord)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 border ${isCurrent
                        ? 'bg-[#12602F] text-[#AFD971] border-[#12602F] shadow-xs ring-2 ring-[#12602F]/15'
                        : 'bg-[#FAF8F2] text-[#464D3F] border-[#DDD3C1] hover:border-[#12602F]/40 hover:bg-white'
                      }`}
                  >
                    <Package className={`w-3.5 h-3.5 ${isCurrent ? 'text-[#AFD971]' : 'text-stone-400'}`} />
                    <span>#{ord.id}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-md ${isCurrent
                          ? 'bg-white/20 text-white'
                          : isOrdDelivered
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-900'
                        }`}
                    >
                      {isOrdDelivered ? 'Delivered' : ord.status.replace(/_/g, ' ')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── 2. TELEMETRY VITAL METRICS RIBBON (4 LUXURY CARDS) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-5 mt-2 border-t border-[#E5DEC9]">
          {/* Card 1: Reference & AWB */}
          <div className="p-4 rounded-2xl bg-linear-to-b from-[#FAF8F2] to-white border border-[#DDD3C1]/80 shadow-2xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C6221] block">
                Reference & AWB
              </span>
              <button
                type="button"
                onClick={handleCopyTracking}
                className="text-stone-400 hover:text-[#12602F] cursor-pointer"
                title="Copy AWB Tracking Code"
              >
                {copiedCode ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            <strong className="text-sm font-serif font-extrabold text-[#1C2E1A] block truncate">
              Order #{selectedTrackingOrder.id}
            </strong>
            <p className="text-[11px] font-mono text-stone-500 truncate" title={trackingAwb}>
              AWB: {trackingAwb}
            </p>
          </div>

          {/* Card 2: Estimated Arrival */}
          <div className="p-4 rounded-2xl bg-linear-to-b from-[#FAF8F2] to-white border border-[#DDD3C1]/80 shadow-2xs space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C6221] block">
              Estimated Delivery
            </span>
            <strong className="text-sm font-serif font-extrabold text-[#12602F] block truncate">
              {selectedTrackingOrder.estimatedDelivery || (isDelivered ? 'Delivered' : 'Tomorrow by 4:00 PM')}
            </strong>
            <div className="flex items-center gap-1 text-[11px] text-[#464D3F]">
              <Clock className="w-3 h-3 text-[#8C6221]" />
              <span>{isDelivered ? 'Delivered & Verified' : 'Expedited On-Schedule'}</span>
            </div>
          </div>

          {/* Card 3: Waypoint & Climate Shield */}
          <div className="p-4 rounded-2xl bg-linear-to-b from-[#FAF8F2] to-white border border-[#DDD3C1]/80 shadow-2xs space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C6221] block">
              Current Waypoint Hub
            </span>
            <strong className="text-sm font-serif font-bold text-[#1C2E1A] block truncate">
              {isDelivered
                ? 'Sanctuary Destination'
                : isOutForDelivery
                  ? 'Local Transit Bay 2'
                  : 'Metro Sort Center'}
            </strong>
            <div className="flex items-center gap-1 text-[11px] text-[#12602F]">
              <Thermometer className="w-3 h-3 text-[#12602F]" />
              <span>18°C Controlled Climate</span>
            </div>
          </div>

          {/* Card 4: Doorstep Security OTP */}
          <div className="p-4 rounded-2xl bg-linear-to-b from-[#FAF8F2] to-[#FAF6EE] border border-[#C9B387]/80 shadow-2xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C6221] block">
                Doorstep Security OTP
              </span>
              <button
                type="button"
                onClick={() => handleCopyOtp(orderOtp)}
                className="text-stone-400 hover:text-[#12602F] cursor-pointer"
                title="Copy Security OTP"
              >
                {copiedOtp ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-extrabold text-[#12602F] bg-white px-2.5 py-0.5 rounded-lg border border-[#DDD3C1] shadow-2xs">
                {orderOtp}
              </span>
              <span className="text-[10px] text-stone-500 leading-tight">
                Share with rider upon handoff
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* ── 3. INTERACTIVE TRANSIT ROUTE RADAR VISUALIZER ── */}
      <div className="bg-white rounded-lg p-6 sm:p-7 border border-[#DDD3C1] shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E5DEC9]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#12602F] text-[#AFD971] flex items-center justify-center shadow-xs">
              <Navigation className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-[#1C2E1A]">
                Live Transit Route Radar
              </h3>
              <p className="text-[11px] text-stone-500">
                Eco-Certified Cold-Chain Linehaul • GPS Coordinate Tracking
              </p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-[#0D3322] border border-emerald-200 shadow-2xs flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#12602F] animate-ping" />
            <span>Telemetry Active</span>
          </span>
        </div>

        {/* Dynamic Route Waypoints Vector Graph */}
        <div className="py-4 px-2 sm:px-6">
          <div className="relative">
            {/* Background Line */}
            <div className="absolute top-5 left-6 right-6 h-1.5 bg-[#E5DEC9] rounded-full hidden md:block" />

            {/* Active Filled Progress Line */}
            <div
              className="absolute top-5 left-6 h-1.5 bg-linear-to-r from-[#12602F] via-[#2B7D46] to-[#AFD971] rounded-full hidden md:block transition-all duration-700 shadow-2xs"
              style={{ width: `calc(${progressPercentage}% - 3rem)` }}
            />

            {/* 4 Waypoints */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-2 relative z-10">

              {/* Waypoint 1 */}
              <div className="flex md:flex-col items-center md:text-center gap-3 md:gap-2">
                <div className="w-10 h-10 rounded-full bg-[#12602F] text-white flex items-center justify-center font-bold text-xs shadow-md ring-4 ring-[#12602F]/15 shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#AFD971]" />
                </div>
                <div>
                  <h4 className="font-serif text-xs font-bold text-[#1C2E1A]">
                    Botanical Labs
                  </h4>
                  <p className="text-[10px] text-stone-500 font-mono">Nilgiris Sanctuary</p>
                  <span className="text-[9px] font-bold text-[#12602F] bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 mt-1 inline-block">
                    Harvest Sealed
                  </span>
                </div>
              </div>

              {/* Waypoint 2 */}
              <div className="flex md:flex-col items-center md:text-center gap-3 md:gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-md shrink-0 ${!isProcessing
                      ? 'bg-[#12602F] text-white ring-4 ring-[#12602F]/15'
                      : 'bg-white border-2 border-stone-300 text-stone-400'
                    }`}
                >
                  <Package className={`w-5 h-5 ${!isProcessing ? 'text-[#AFD971]' : 'text-stone-400'}`} />
                </div>
                <div>
                  <h4 className="font-serif text-xs font-bold text-[#1C2E1A]">
                    Cold-Sort Center
                  </h4>
                  <p className="text-[10px] text-stone-500 font-mono">Central Lab Hub</p>
                  <span className="text-[9px] font-bold text-[#8C6221] bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200 mt-1 inline-block">
                    18°C Controlled
                  </span>
                </div>
              </div>

              {/* Waypoint 3 */}
              <div className="flex md:flex-col items-center md:text-center gap-3 md:gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-md shrink-0 ${isShipped || isOutForDelivery || isDelivered
                      ? 'bg-[#12602F] text-white ring-4 ring-[#12602F]/15'
                      : 'bg-white border-2 border-stone-300 text-stone-400'
                    }`}
                >
                  <Truck className={`w-5 h-5 ${isShipped || isOutForDelivery || isDelivered ? 'text-[#AFD971]' : 'text-stone-400'}`} />
                </div>
                <div>
                  <h4 className="font-serif text-xs font-bold text-[#1C2E1A]">
                    Express Linehaul
                  </h4>
                  <p className="text-[10px] text-stone-500 font-mono">Metro Air Cargo</p>
                  <span className="text-[9px] font-bold text-[#12602F] bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 mt-1 inline-block">
                    Zero-Emission EV
                  </span>
                </div>
              </div>

              {/* Waypoint 4 */}
              <div className="flex md:flex-col items-center md:text-center gap-3 md:gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-md shrink-0 ${isDelivered
                      ? 'bg-[#12602F] text-white ring-4 ring-[#12602F]/15'
                      : 'bg-white border-2 border-stone-300 text-stone-400'
                    }`}
                >
                  <MapPin className={`w-5 h-5 ${isDelivered ? 'text-[#AFD971]' : 'text-stone-400'}`} />
                </div>
                <div>
                  <h4 className="font-serif text-xs font-bold text-[#1C2E1A]">
                    Home Sanctuary
                  </h4>
                  <p className="text-[10px] text-stone-500 font-mono truncate max-w-35 sm:max-w-none">
                    Doorstep Delivery
                  </p>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.2 rounded border mt-1 inline-block ${isDelivered
                        ? 'text-[#12602F] bg-emerald-50 border-emerald-200'
                        : 'text-stone-600 bg-stone-100 border-stone-200'
                      }`}
                  >
                    {isDelivered ? 'Handed Over' : 'OTP Verification'}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ── 4. DETAILED LIVE MILESTONES & DISPATCH LOGS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left 7 Cols: Detailed Milestone Progression Timeline */}
        <div className="lg:col-span-7 bg-white rounded-lg p-6 sm:p-7 border border-[#DDD3C1] shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5DEC9]">
            <h3 className="font-serif text-base font-bold text-[#1C2E1A] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#12602F]" />
              <span>Detailed Telemetry Timeline</span>
            </h3>
            <span className="text-[10px] font-mono text-stone-400 font-bold uppercase">
              Chronological Dispatch
            </span>
          </div>

          <div className="relative pl-6 sm:pl-8 space-y-6 sm:space-y-7">
            {/* Background Line */}
            <div className="absolute left-4.75 top-3 bottom-3 w-1 bg-[#E5DEC9] rounded-full" />

            {/* Active Fill Line */}
            <div
              className="absolute left-4.75 top-3 w-1 bg-linear-to-b from-[#12602F] to-[#2B7D46] rounded-full transition-all duration-700"
              style={{ height: `${progressPercentage}%` }}
            />

            {detailedMilestones.map((step, idx) => (
              <div key={step.id} className="flex items-start gap-4 relative z-10 group">
                {/* Node Icon */}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border-2 transition-all shadow-xs ${step.completed
                      ? 'bg-[#12602F] border-[#AFD971]/60 text-[#AFD971] ring-4 ring-[#12602F]/10'
                      : step.current
                        ? 'bg-amber-500 border-amber-300 text-white animate-pulse'
                        : 'bg-white border-stone-200 text-stone-400'
                    }`}
                >
                  {step.completed ? (
                    <Check className="w-4 h-4 stroke-3" />
                  ) : (
                    <span className="text-xs font-mono font-bold">{idx + 1}</span>
                  )}
                </div>

                {/* Milestone Text Box */}
                <div
                  className={`flex-1 p-3.5 rounded-2xl border transition-all ${step.current
                      ? 'bg-amber-50/60 border-amber-300 ring-1 ring-amber-300/40 shadow-xs'
                      : step.completed
                        ? 'bg-[#FAF8F2] border-[#E5DEC9]/80'
                        : 'bg-[#FCFBF8] border-stone-200/60 opacity-60'
                    }`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-1.5 mb-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif text-xs sm:text-sm font-bold text-[#1C2E1A]">
                        {step.title}
                      </h4>
                      <span className="text-[8.5px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-white text-[#12602F] border border-[#DDD3C1]">
                        {step.tag}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#8C6221] bg-white px-2 py-0.5 rounded-md border border-[#DDD3C1]">
                      {step.date} &bull; {step.time}
                    </span>
                  </div>

                  <p className="text-[11px] font-mono text-stone-500 mb-1">
                    📍 {step.facility}
                  </p>

                  <p className="text-xs text-[#464D3F] leading-snug font-light">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 5 Cols: Carrier Logistics, Driver, Items & Notification Settings */}
        <div className="lg:col-span-5 space-y-5">

          {/* 1. Eco-Courier Partner & Driver Profile */}
          <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#DDD3C1] shadow-sm space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6221] block">
              Assigned Doorstep Courier Fleet
            </span>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#12602F] text-[#AFD971] flex items-center justify-center font-serif text-lg font-bold shadow-xs">
                DS
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-serif text-sm font-bold text-[#1C2E1A]">
                    Devendra Sharma
                  </h4>
                  <span className="bg-emerald-50 text-[#12602F] text-[9px] font-bold uppercase px-1.5 py-0.2 rounded border border-emerald-200">
                    5.0 ★ Eco-Rider
                  </span>
                </div>
                <p className="text-[11px] text-stone-500">
                  BlueDart Carbon-Neutral Fleet • EV Scooter #MH02-EK-8192
                </p>
              </div>
            </div>

            <div className="p-3 bg-[#FAF8F2] rounded-xl border border-[#DDD3C1] text-xs text-stone-600 space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-stone-500">AWB Tracking Code:</span>
                <span className="font-mono font-bold text-[#12602F]">{trackingAwb}</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-stone-500">Handoff Protocol:</span>
                <span className="font-semibold text-stone-700">Doorstep OTP & Signature</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowDriverHelp(true);
                  showToast('Connecting to Doorstep Logistics Concierge...');
                }}
                className="w-1/2 py-2 rounded-xl bg-white border border-[#DDD3C1] hover:border-[#12602F] text-[#1C2E1A] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-2xs flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#12602F]" />
                <span>Call Courier</span>
              </button>

              <Link
                to="/whatsapp-support"
                className="w-1/2 py-2 rounded-xl bg-[#12602F] hover:bg-[#1B6A45] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#AFD971]" />
                <span>WhatsApp Help</span>
              </Link>
            </div>
          </div>

          {/* 2. Items Inside Shipment Showcase */}
          <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#DDD3C1] shadow-sm space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6221] block">
                Formulas in Shipment ({selectedTrackingOrder.items.length})
              </span>
              <span className="text-[10px] font-mono text-stone-400 font-bold uppercase">
                Sealed Batch
              </span>
            </div>

            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {selectedTrackingOrder.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#FAF8F2] p-3 rounded-2xl border border-[#E5DEC9]/80 flex items-center gap-3 shadow-2xs"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-12 h-12 rounded-xl object-cover bg-white border border-[#DDD3C1] shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h5 className="text-xs font-bold text-[#1C2E1A] truncate">{item.name}</h5>
                    <p className="text-[11px] text-[#464D3F] font-mono">
                      Qty: {item.qty} &bull; ${item.price.toFixed(2)}
                    </p>
                    <p className="text-[10px] text-stone-400 truncate">
                      Lot: LOT-MRK-2026-B{item.id * 17} &bull; Bio-Active Cold Sealed
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Delivery Destination Address */}
          <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#DDD3C1] shadow-sm space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6221] block">
              Delivery Destination Sanctuary
            </span>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#12602F] shrink-0 mt-0.5" />
              <div className="text-xs text-[#464D3F]">
                <strong className="text-xs font-bold text-[#1C2E1A] block">
                  Home Sanctuary Address
                </strong>
                <p className="mt-0.5 leading-relaxed font-light">
                  {selectedTrackingOrder.shippingAddress || 'Plot 12, Gulmohar Avenue, Bandra West, Mumbai, MH 400050'}
                </p>
                <span className="text-[10px] text-[#8C6221] font-mono font-bold block mt-1">
                  Recipient Contact: +91 98*** **420
                </span>
              </div>
            </div>
          </div>

          {/* 4. Live Dispatch Alert Preferences */}
          <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#DDD3C1] shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <BellRing className="w-4 h-4 text-[#12602F]" />
              <h4 className="font-serif text-xs font-bold text-[#1C2E1A]">
                Dispatch & Arrival Alerts
              </h4>
            </div>

            <div className="space-y-2 text-xs">
              <label className="flex items-center justify-between p-2 rounded-xl bg-[#FAF8F2] border border-[#E5DEC9] cursor-pointer hover:bg-white transition-colors">
                <span className="text-stone-700 text-[11px] font-medium">WhatsApp Dispatch Alerts</span>
                <input
                  type="checkbox"
                  checked={notifyWhatsapp}
                  onChange={(e) => {
                    setNotifyWhatsapp(e.target.checked);
                    showToast(e.target.checked ? 'WhatsApp alerts enabled.' : 'WhatsApp alerts paused.');
                  }}
                  className="w-4 h-4 rounded text-[#12602F] focus:ring-[#12602F]"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded-xl bg-[#FAF8F2] border border-[#E5DEC9] cursor-pointer hover:bg-white transition-colors">
                <span className="text-stone-700 text-[11px] font-medium">SMS Out-For-Delivery Alerts</span>
                <input
                  type="checkbox"
                  checked={notifySms}
                  onChange={(e) => {
                    setNotifySms(e.target.checked);
                    showToast(e.target.checked ? 'SMS alerts enabled.' : 'SMS alerts paused.');
                  }}
                  className="w-4 h-4 rounded text-[#12602F] focus:ring-[#12602F]"
                />
              </label>
            </div>
          </div>

        </div>

      </div>

      {/* Driver Help Modal Simulator */}
      {showDriverHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="fixed inset-0 bg-[#162820]/60 backdrop-blur-xs transition-opacity animate-fade-in"
            onClick={() => setShowDriverHelp(false)}
          />

          <div className="relative bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#DDD3C1] z-10 animate-scale-up text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#12602F] text-[#AFD971] flex items-center justify-center mx-auto shadow-xs">
              <Phone className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-serif text-xl font-bold text-[#1C2E1A]">
                Courier Dispatch Concierge
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Connecting with rider Mr. Devendra Sharma for Order #{selectedTrackingOrder.id}
              </p>
            </div>

            <div className="p-3 bg-[#FAF8F2] rounded-2xl border border-[#DDD3C1] text-xs font-mono text-stone-700">
              <p>Direct Hot-Line: <strong>+91 1800-209-1234</strong></p>
              <p className="text-[10px] text-stone-400 mt-0.5">Ext: 8849 (Active until delivery)</p>
            </div>

            <button
              type="button"
              onClick={() => setShowDriverHelp(false)}
              className="w-full py-2.5 rounded-xl bg-[#12602F] hover:bg-[#1B6A45] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
            >
              Done / Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackingTab;
