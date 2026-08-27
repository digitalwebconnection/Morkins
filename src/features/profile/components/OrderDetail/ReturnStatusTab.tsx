import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  RotateCcw, ArrowRight, RefreshCw, Truck, CheckCircle2,
  ShieldCheck, CreditCard, Sparkles, Plus,
  Search, QrCode, Download, Calendar, X, AlertCircle,
  Copy, Check, ChevronDown, ChevronUp, MessageCircle,
  Box, HelpCircle
} from 'lucide-react';
import {
  getReturnRequests,
  getUserOrders,
  rescheduleReturnPickup,
  cancelReturnRequest,
  requestReturn
} from '../../../../lib/api/orders';
import { downloadReturnSlip } from '../../../../lib/utils/invoicePdf';
import type { ReturnRequest, Order, OrderItem } from '../../../../types';

interface ReturnStatusTabProps {
  onSelectOrderTab?: () => void;
}

const RETURN_REASONS = [
  'Skin sensitivity / allergic reaction',
  'Damaged or leaking bottle in transit',
  'Incorrect formulation or variant received',
  'Compromised seal or texture separation',
  'Formula did not meet clinical expectations',
  'Ordered by mistake / Change of mind',
];

const FAQS = [
  {
    q: 'How does the 30-Day Botanical Guarantee work?',
    a: 'Every Morkins formulation is backed by our 100% satisfaction promise. If you experience skin sensitivity or are not completely satisfied within 30 days of delivery, you can schedule a complimentary doorstep pickup for a 100% refund, +5% wallet bonus, or fresh replacement.',
  },
  {
    q: 'Do I need to print any return shipping labels?',
    a: 'No! Our eco-courier partner arrives at your doorstep with a pre-printed barcode and a biodegradable tamper-evident bag. You only need to provide the 4-digit Doorstep Security OTP displayed on your return card.',
  },
  {
    q: 'What is the Sanctuary Wallet +5% Bonus option?',
    a: 'When you choose store credit instead of a bank reversal, we instantly add an extra 5% shopping credit bonus to your Morkins Sanctuary Wallet. This credit never expires and can be used on any future botanical harvest.',
  },
  {
    q: 'How quickly are refunds disbursed?',
    a: 'Sanctuary Wallet credits are approved within 10 minutes of doorstep pickup. Bank reversals (UPI/Card/NetBanking) are transferred directly within 24–48 hours of laboratory batch check.',
  },
];

export default function ReturnStatusTab({ onSelectOrderTab }: ReturnStatusTabProps) {
  const [returns, setReturns] = useState<ReturnRequest[]>([]);
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed' | 'cancelled'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Accordion state: Track which return cards are expanded (like FAQ)
  const [expandedCardIds, setExpandedCardIds] = useState<{ [returnId: string]: boolean }>({});

  // Modal States
  const [selectedQrPass, setSelectedQrPass] = useState<ReturnRequest | null>(null);
  const [rescheduleTarget, setRescheduleTarget] = useState<ReturnRequest | null>(null);
  const [newPickupDate, setNewPickupDate] = useState('Tomorrow');
  const [newPickupSlot, setNewPickupSlot] = useState('Morning (9:00 AM – 1:00 PM)');
  const [cancelTarget, setCancelTarget] = useState<ReturnRequest | null>(null);
  const [cancelReason, setCancelReason] = useState('Found the formula worked well after adjustment');
  const [isNewReturnWizardOpen, setIsNewReturnWizardOpen] = useState(false);

  // New Return Wizard Form States
  const [wizardOrderId, setWizardOrderId] = useState('');
  const [wizardSelectedItems, setWizardSelectedItems] = useState<{ [itemId: number]: { selected: boolean; qty: number } }>({});
  const [wizardReason, setWizardReason] = useState(RETURN_REASONS[0]);
  const [wizardResolution, setWizardResolution] = useState<'wallet' | 'refund' | 'exchange'>('wallet');
  const [wizardPickupSlot, setWizardPickupSlot] = useState<'morning' | 'afternoon'>('morning');
  const [wizardNotes] = useState('');
  const [isSubmittingWizard, setIsSubmittingWizard] = useState(false);

  const selectedOrderForWizard = allOrders.find((o) => o.id === wizardOrderId);
  const wizardSubtotal = selectedOrderForWizard
    ? selectedOrderForWizard.items
        .filter((item) => wizardSelectedItems[item.id]?.selected)
        .reduce((sum, item) => sum + item.price * (wizardSelectedItems[item.id]?.qty || 1), 0)
    : 0;
  const wizardBonus = wizardResolution === 'wallet' ? wizardSubtotal * 0.05 : 0;

  // Copy helpers & FAQ state
  const [copiedOtp, setCopiedOtp] = useState<string | null>(null);
  const [copiedAwb, setCopiedAwb] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const fetchReturns = () => {
    setIsLoading(true);
    Promise.all([getReturnRequests(), getUserOrders()]).then(([returnData, orderData]) => {
      setReturns(returnData);
      setAllOrders(orderData);
      // Auto-expand first active return if available
      if (returnData.length > 0) {
        setExpandedCardIds((prev) => {
          if (Object.keys(prev).length === 0) {
            return { [returnData[0].returnId]: true };
          }
          return prev;
        });
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchReturns();
  }, []);

  const toggleCardExpand = (returnId: string) => {
    setExpandedCardIds((prev) => ({
      ...prev,
      [returnId]: !prev[returnId],
    }));
  };

  const handleCopyOtp = (otp: string) => {
    navigator.clipboard.writeText(otp);
    setCopiedOtp(otp);
    setTimeout(() => setCopiedOtp(null), 2000);
    showToast(`Security OTP #${otp} copied to clipboard.`);
  };

  const handleCopyAwb = (awb: string) => {
    navigator.clipboard.writeText(awb);
    setCopiedAwb(awb);
    setTimeout(() => setCopiedAwb(null), 2000);
    showToast(`Courier AWB #${awb} copied.`);
  };

  const handleRescheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rescheduleTarget) return;
    const res = await rescheduleReturnPickup(rescheduleTarget.returnId, newPickupDate, newPickupSlot);
    if (res.success) {
      showToast(res.message);
      setRescheduleTarget(null);
      fetchReturns();
    }
  };

  const handleCancelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cancelTarget) return;
    const res = await cancelReturnRequest(cancelTarget.returnId, cancelReason);
    if (res.success) {
      showToast(res.message);
      setCancelTarget(null);
      fetchReturns();
    }
  };

  // Open New Return Wizard
  const handleOpenWizard = () => {
    const delivered = allOrders.filter((o) => o.status.toLowerCase() === 'delivered');
    if (delivered.length > 0) {
      const firstOrder = delivered[0];
      setWizardOrderId(firstOrder.id);
      const map: { [itemId: number]: { selected: boolean; qty: number } } = {};
      firstOrder.items.forEach((item) => {
        map[item.id] = { selected: true, qty: item.qty };
      });
      setWizardSelectedItems(map);
    }
    setIsNewReturnWizardOpen(true);
  };

  const handleWizardOrderChange = (orderId: string) => {
    setWizardOrderId(orderId);
    const order = allOrders.find((o) => o.id === orderId);
    if (order) {
      const map: { [itemId: number]: { selected: boolean; qty: number } } = {};
      order.items.forEach((item) => {
        map[item.id] = { selected: true, qty: item.qty };
      });
      setWizardSelectedItems(map);
    }
  };

  const handleWizardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const order = allOrders.find((o) => o.id === wizardOrderId);
    if (!order) return;

    const payloadItems = order.items
      .filter((i) => wizardSelectedItems[i.id]?.selected)
      .map((i) => ({
        itemId: i.id,
        qty: wizardSelectedItems[i.id].qty,
        reason: wizardReason,
      }));

    if (payloadItems.length === 0) {
      alert('Please select at least one formulation to return.');
      return;
    }

    setIsSubmittingWizard(true);
    try {
      const res = await requestReturn(
        order.id,
        payloadItems,
        wizardReason,
        wizardResolution,
        wizardPickupSlot,
        order.shippingAddress,
        wizardNotes
      );
      if (res.success) {
        showToast(`Return Claim #${res.returnId} scheduled successfully!`);
        setIsNewReturnWizardOpen(false);
        // Expand the newly submitted return
        setExpandedCardIds((prev) => ({ ...prev, [res.returnId]: true }));
        fetchReturns();
      }
    } catch {
      alert('Failed to register return claim. Please try again.');
    } finally {
      setIsSubmittingWizard(false);
    }
  };

  // Filter calculations
  const filteredReturns = returns.filter((r) => {
    const isAct = ['requested', 'approved', 'picked_up', 'in_transit', 'inspected'].includes(r.status);
    const isComp = r.status === 'refunded';
    const isCanc = r.status === 'cancelled' || r.status === 'rejected';

    if (filterStatus === 'active' && !isAct) return false;
    if (filterStatus === 'completed' && !isComp) return false;
    if (filterStatus === 'cancelled' && !isCanc) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = r.returnId.toLowerCase().includes(q) || r.orderId.toLowerCase().includes(q);
      const matchItem = r.items.some((i) => i.name.toLowerCase().includes(q));
      const matchReason = r.reason.toLowerCase().includes(q);
      if (!matchId && !matchItem && !matchReason) return false;
    }
    return true;
  });

  const activeCount = returns.filter((r) =>
    ['requested', 'approved', 'picked_up', 'in_transit', 'inspected'].includes(r.status)
  ).length;
  const completedCount = returns.filter((r) => r.status === 'refunded').length;
  const totalRefundedSum = returns
    .filter((r) => r.status === 'refunded')
    .reduce((acc, r) => acc + r.refundAmount + (r.bonusAmount || 0), 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'requested':
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200 flex items-center gap-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <span>Under QA Review</span>
          </span>
        );
      case 'approved':
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-100 text-blue-900 border border-blue-200 flex items-center gap-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>Approved • Rider Assigned</span>
          </span>
        );
      case 'picked_up':
      case 'in_transit':
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-purple-100 text-purple-900 border border-purple-200 flex items-center gap-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
            <span>In Transit to Apothecary</span>
          </span>
        );
      case 'inspected':
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-200 flex items-center gap-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span>Lab Verification Passed</span>
          </span>
        );
      case 'refunded':
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#D8EFE3] text-[#0D3322] border border-[#13442C]/20 flex items-center gap-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#12602F]" />
            <span>✓ Reimbursement Processed</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-stone-100 text-stone-600 border border-stone-200">
            Cancelled
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


  return (
    <div className="space-y-7 animate-fade-in text-[#1C2E1A]">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-[#12602F] text-white text-xs font-bold rounded-lg shadow-2xl border border-[#AFD971]/30 flex items-center gap-3 animate-slide-up">
          <CheckCircle2 className="w-4 h-4 text-[#AFD971] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── 1. MAIN SANCTUARY HEADER & LIFECYCLE PIPELINE ── */}
      <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#DDD3C1] shadow-md relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-[#12602F] via-[#C49746] to-[#AFD971]" />

        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-6 border-b border-[#E5DEC9]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-linear-to-r from-[#D8EFE3] to-[#FAF8F2] border border-[#13442C]/20 text-[#0D3322] text-[10px] font-bold uppercase tracking-widest mb-2 shadow-2xs">
              <RotateCcw className="w-3 h-3 text-[#12602F]" />
              <span>30-Day Botanical Satisfaction Guarantee</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C2E1A]">
              Returns & Refund Lifecycle
            </h2>
            <p className="text-xs sm:text-sm text-[#464D3F] mt-1 max-w-2xl leading-relaxed">
              Trace transparent clinical claim approvals, verified doorstep eco-courier appointments with Security OTP, and instant payment reimbursements.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center flex-wrap gap-2.5">
            <button
              type="button"
              onClick={handleOpenWizard}
              className="px-4 py-2.5 rounded-lg bg-[#12602F] hover:bg-[#1B6A45] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-xs hover:shadow-md active:scale-98"
            >
              <Plus className="w-4 h-4 text-[#AFD971]" />
              <span>Initiate Return Claim</span>
            </button>

            <button
              type="button"
              onClick={fetchReturns}
              className="p-2.5 rounded-lg bg-[#FAF8F2] border border-[#DDD3C1] text-stone-700 hover:text-[#12602F] transition-colors cursor-pointer"
              title="Refresh Lifecycle Data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* ── 4-STAGE LIFECYCLE STEPPER PIPELINE ── */}
        <div className="pt-6 pb-2">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C6221]">
              Botanical Return Pipeline Protocol
            </span>
            <span className="text-[10px] font-mono text-stone-400 font-bold uppercase">
              Zero Hassle &bull; Free Doorstep Pickup
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                step: '01',
                title: 'Claim & QA Review',
                desc: 'Select formulas online under our 30-Day Guarantee. Reviewed in 24 hours.',
                icon: ShieldCheck,
                tag: 'Instant Setup',
              },
              {
                step: '02',
                title: 'Eco-Courier Pickup',
                desc: 'Rider arrives with zero-plastic tamper bag. Verify using 4-digit OTP.',
                icon: Truck,
                tag: 'Zero Label Needed',
              },
              {
                step: '03',
                title: 'Apothecary Lab Scan',
                desc: 'Formulation integrity and batch seal authenticated by botanical chemists.',
                icon: Box,
                tag: 'Purity Check',
              },
              {
                step: '04',
                title: '100% Payout / +5% Wallet',
                desc: 'Direct refund to UPI/Card (24-48h) or instant credit with 5% bonus.',
                icon: Sparkles,
                tag: 'Guaranteed Payout',
              },
            ].map((st, idx) => {
              const Icon = st.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#FAF8F2] p-3.5 rounded-lg border border-[#E5DEC9]/80 space-y-2 hover:border-[#12602F]/30 transition-all shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-extrabold text-[#8C6221] bg-white px-2 py-0.5 rounded-md border border-[#DDD3C1]">
                      STEP {st.step}
                    </span>
                    <span className="text-[9px] font-bold uppercase text-[#12602F] bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                      {st.tag}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 pt-0.5">
                    <div className="w-7 h-7 rounded-lg bg-[#12602F] text-[#AFD971] flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <h4 className="font-serif text-xs font-bold text-[#1C2E1A] truncate">{st.title}</h4>
                  </div>
                  <p className="text-[11px] text-[#464D3F] leading-snug font-light">{st.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── METRIC RIBBON ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 mt-4 border-t border-[#E5DEC9] text-xs">
          <div className="p-3 bg-linear-to-b from-[#FAF8F2] to-white rounded-lg border border-[#DDD3C1]/80">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#8C6221] block">
              Active Lifecycle Claims
            </span>
            <span className="font-serif text-lg font-bold text-[#1C2E1A]">{activeCount} In Transit / QA</span>
          </div>

          <div className="p-3 bg-linear-to-b from-[#FAF8F2] to-white rounded-lg border border-[#DDD3C1]/80">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#8C6221] block">
              Total Reimbursed
            </span>
            <span className="font-serif text-lg font-bold text-[#12602F]">
              ${totalRefundedSum.toFixed(2)} USD
            </span>
          </div>

          <div className="p-3 bg-linear-to-b from-[#FAF8F2] to-white rounded-lg border border-[#DDD3C1]/80">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#8C6221] block">
              Average Turnaround
            </span>
            <span className="font-serif text-lg font-bold text-[#1C2E1A]">36 Hours Avg</span>
          </div>

          <div className="p-3 bg-linear-to-b from-[#FAF8F2] to-white rounded-lg border border-[#DDD3C1]/80">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#8C6221] block">
              Carbon-Neutral Pickup
            </span>
            <span className="font-serif text-lg font-bold text-[#12602F]">100% Eco-Neutral</span>
          </div>
        </div>
      </div>

      {/* ── 2. FILTER & SEARCH CONTROL BAR ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-lg border border-[#DDD3C1] shadow-2xs">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-[#FAF8F2] p-1.5 rounded-lg border border-[#DDD3C1] w-full sm:w-auto overflow-x-auto">
          {[
            { id: 'all' as const, label: `All (${returns.length})` },
            { id: 'active' as const, label: `Active In Transit (${activeCount})` },
            { id: 'completed' as const, label: `Completed (${completedCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                filterStatus === tab.id
                  ? 'bg-[#12602F] text-[#AFD971] shadow-2xs'
                  : 'text-[#464D3F] hover:text-[#12602F]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search return ID, formula, order..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-stone-200 focus:border-[#12602F] focus:ring-2 focus:ring-[#12602F]/15 text-xs text-[#1C2E1A] bg-[#FAF8F2] outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ── 3. RETURN LIST CARDS (ACCORDION FAQ STYLE) ── */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="py-20 text-center space-y-3 bg-white rounded-lg border border-[#DDD3C1]">
            <div className="w-10 h-10 border-3 border-[#12602F] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-bold uppercase tracking-widest text-[#12602F]">
              Loading Botanical Return History...
            </p>
          </div>
        ) : filteredReturns.length > 0 ? (
          filteredReturns.map((ret) => {
            const isActive = ['requested', 'approved', 'picked_up', 'in_transit', 'inspected'].includes(ret.status);
            const totalCredit = ret.refundAmount + (ret.bonusAmount || 0);
            const isExpanded = Boolean(expandedCardIds[ret.returnId]);
            const primaryItem = ret.items[0];

            return (
              <div
                key={ret.returnId}
                className={`bg-white rounded-lg border transition-all duration-300 relative overflow-hidden shadow-xs ${
                  isExpanded
                    ? 'border-[#12602F]/60 shadow-md ring-1 ring-[#12602F]/20'
                    : 'border-[#DDD3C1] hover:border-[#12602F]/40 hover:shadow-sm'
                }`}
              >
                {/* Top Status Color Stripe */}
                <div
                  className={`h-1.5 w-full ${
                    ret.status === 'refunded'
                      ? 'bg-[#12602F]'
                      : ret.status === 'cancelled'
                      ? 'bg-stone-300'
                      : 'bg-linear-to-r from-amber-500 via-purple-500 to-[#12602F]'
                  }`}
                />

                {/* ── COLLAPSED UPPER HEADER (FAQ ACCORDION BAR - CLICK TO TOGGLE) ── */}
                <div
                  onClick={() => toggleCardExpand(ret.returnId)}
                  className="p-5 sm:p-6 cursor-pointer select-none transition-colors hover:bg-[#FAF8F2]/60"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    
                    {/* Left: Product Thumbnail & Core Claim Details */}
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="relative shrink-0">
                        {primaryItem?.img ? (
                          <img
                            src={primaryItem.img}
                            alt={primaryItem.name}
                            className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg bg-[#FAF8F2] border border-[#DDD3C1] shadow-2xs"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-lg bg-[#12602F]/10 text-[#12602F] flex items-center justify-center font-bold">
                            <Box className="w-6 h-6" />
                          </div>
                        )}
                        {ret.items.length > 1 && (
                          <span className="absolute -bottom-1 -right-1 bg-[#12602F] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-xs border border-white">
                            +{ret.items.length - 1}
                          </span>
                        )}
                      </div>

                      <div className="min-w-0 space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-sm sm:text-base font-extrabold text-[#1C2E1A]">
                            #{ret.returnId}
                          </span>
                          <span className="text-stone-300">•</span>
                          <span className="text-xs font-bold text-[#12602F] hover:underline">
                            Order #{ret.orderId}
                          </span>
                        </div>

                        <h4 className="font-serif text-sm sm:text-base font-bold text-[#1C2E1A] truncate max-w-md">
                          {primaryItem?.name} {ret.items.length > 1 ? `& ${ret.items.length - 1} other item` : ''}
                        </h4>

                        <p className="text-[11px] text-[#464D3F] truncate">
                          Submitted on {ret.date} &bull; Reason: <span className="text-[#1C2E1A] font-medium">{ret.reason}</span>
                        </p>
                      </div>
                    </div>

                    {/* Right: Status Badge, Amount & Accordion Chevron Toggle */}
                    <div className="flex items-center justify-between lg:justify-end gap-4 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#E5DEC9]/60">
                      <div className="text-left lg:text-right">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#8C6221] block">
                          Reimbursement
                        </span>
                        <span className="font-mono text-sm sm:text-base font-extrabold text-[#12602F]">
                          ${totalCredit.toFixed(2)} USD
                        </span>
                      </div>

                      <div>{getStatusBadge(ret.status)}</div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCardExpand(ret.returnId);
                        }}
                        className={`p-2 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${
                          isExpanded
                            ? 'bg-[#12602F] text-white border-[#12602F] shadow-xs'
                            : 'bg-white text-[#1C2E1A] border-[#DDD3C1] hover:border-[#12602F] hover:bg-[#FAF8F2]'
                        }`}
                        title={isExpanded ? 'Collapse Details' : 'Expand Details'}
                      >
                        <span className="hidden sm:inline text-[10px]">
                          {isExpanded ? 'Hide Details' : 'View Full Details'}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                  </div>
                </div>

                {/* ── EXPANDABLE BODY (OPENS WHEN CLICKED) ── */}
                {isExpanded && (
                  <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-2 border-t border-[#E5DEC9] space-y-5 bg-white animate-fade-in">
                    
                    {/* 1. Itemized Formulas in Return */}
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6221]">
                          Formulations in Claim ({ret.items.length}):
                        </span>
                        <span className="text-[10px] font-mono text-stone-400 font-bold uppercase">
                          100% Botanical Guarantee
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {ret.items.map((item) => (
                          <div
                            key={item.itemId}
                            className="flex items-center gap-3 p-3 bg-[#FAF8F2] rounded-lg border border-[#E5DEC9]/80"
                          >
                            {item.img && (
                              <img
                                src={item.img}
                                alt={item.name}
                                className="w-12 h-12 object-cover rounded-lg bg-white border border-[#DDD3C1] shrink-0 shadow-2xs"
                              />
                            )}
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-bold text-[#1C2E1A] truncate">{item.name}</p>
                              <p className="text-[11px] text-[#464D3F] font-mono mt-0.5">
                                Qty: {item.qty} × ${item.price.toFixed(2)} = ${(item.price * item.qty).toFixed(2)}
                              </p>
                              <p className="text-[10px] text-stone-400 truncate mt-0.5">
                                Batch: {item.batchNumber || `MRK-BOT-${item.itemId}`} &bull; {item.reason || ret.reason}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 2. Doorstep Courier & Security OTP Box */}
                    {isActive && (
                      <div className="bg-linear-to-r from-[#FAF8F2] via-[#F4EFE6] to-[#FAF8F2] p-4 rounded-lg border border-[#C9B387]/60 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        <div className="md:col-span-4 flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#12602F] text-[#AFD971] flex items-center justify-center shrink-0 shadow-xs">
                            <Truck className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6221] block">
                              Doorstep Eco-Courier
                            </span>
                            <p className="text-xs font-bold text-[#1C2E1A] truncate">
                              {ret.carrier || 'BlueDart Express Eco Fleet'}
                            </p>
                            {ret.trackingNumber && (
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="text-[10px] font-mono text-stone-500 truncate">
                                  AWB: {ret.trackingNumber}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleCopyAwb(ret.trackingNumber || '')}
                                  className="text-stone-400 hover:text-[#12602F] cursor-pointer"
                                  title="Copy Courier AWB"
                                >
                                  {copiedAwb === ret.trackingNumber ? (
                                    <Check className="w-3 h-3 text-emerald-600" />
                                  ) : (
                                    <Copy className="w-3 h-3" />
                                  )}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-[#E5DEC9] pt-2 md:pt-0 md:pl-4 space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6221] block">
                            Pickup Window & Address
                          </span>
                          <p className="text-xs font-bold text-[#1C2E1A]">
                            {ret.pickupDate || 'Tomorrow'} &bull; {ret.pickupSlot || 'Morning (9AM-1PM)'}
                          </p>
                          <p className="text-[10px] text-stone-500 truncate" title={ret.pickupAddress}>
                            {ret.pickupAddress || 'Default Sanctuary Address'}
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              setRescheduleTarget(ret);
                              setNewPickupDate(ret.pickupDate || 'Tomorrow');
                              setNewPickupSlot(ret.pickupSlot || 'Morning (9:00 AM – 1:00 PM)');
                            }}
                            className="text-[11px] font-bold text-[#12602F] hover:underline inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Calendar className="w-3 h-3" />
                            <span>Reschedule Appointment</span>
                          </button>
                        </div>

                        {/* Doorstep Security OTP */}
                        <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-[#E5DEC9] pt-2 md:pt-0 md:pl-4 flex items-center justify-between md:justify-start gap-4">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6221] block">
                              Doorstep Security OTP
                            </span>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="font-mono text-base sm:text-lg font-extrabold text-[#12602F] bg-white px-3 py-1 rounded-lg border border-[#DDD3C1] shadow-2xs">
                                {ret.pickupOtp || '8492'}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCopyOtp(ret.pickupOtp || '8492')}
                                className="p-1.5 rounded-lg bg-white border border-[#DDD3C1] text-stone-600 hover:text-[#12602F] cursor-pointer shadow-2xs"
                                title="Copy Security OTP"
                              >
                                {copiedOtp === (ret.pickupOtp || '8492') ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                            <span className="text-[9px] text-stone-400 block mt-1">
                              Share with rider at doorstep
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 3. Live Milestone Progression Timeline */}
                    <div className="pt-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6221] block mb-2.5">
                        Live Claim Progress Timeline:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                        {ret.timeline.map((step, idx) => (
                          <div
                            key={idx}
                            className={`p-3 rounded-lg border text-xs transition-all ${
                              step.completed
                                ? 'bg-white border-[#12602F]/25 shadow-2xs'
                                : step.current
                                ? 'bg-amber-50/70 border-amber-300 ring-1 ring-amber-300/50 shadow-xs'
                                : 'bg-[#FAF8F2]/60 border-stone-200/60 opacity-60'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-1.5 font-bold text-[#1C2E1A]">
                                <span
                                  className={`w-4.5 h-4.5 rounded-full flex items-center justify-center text-[10px] font-mono shrink-0 ${
                                    step.completed
                                      ? 'bg-[#12602F] text-white'
                                      : step.current
                                      ? 'bg-amber-500 text-white animate-pulse'
                                      : 'bg-stone-200 text-stone-500'
                                  }`}
                                >
                                  {step.completed ? '✓' : idx + 1}
                                </span>
                                <span className="truncate text-xs">{step.status}</span>
                              </div>
                            </div>
                            <span className="text-[10px] font-mono text-stone-400 block mb-1">{step.date}</span>
                            <p className="text-[10px] text-[#464D3F] leading-snug">{step.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 4. Action Buttons & Payout Bar */}
                    <div className="pt-4 border-t border-[#E5DEC9] flex flex-wrap items-center justify-between gap-3 text-xs bg-[#FAF8F2]/60 -mx-6 sm:-mx-7 -mb-6 sm:-mb-7 p-4 sm:p-5 rounded-b-3xl">
                      <div className="flex items-center flex-wrap gap-2 text-stone-600">
                        <span className="font-medium text-[11px]">Payout Mode:</span>
                        <span className="font-bold text-[#12602F]">{ret.refundMethod}</span>
                        {ret.bonusAmount && ret.bonusAmount > 0 ? (
                          <span className="px-2 py-0.5 rounded-md bg-[#AFD971]/30 text-[#0D3322] font-bold text-[10px]">
                            Includes +${ret.bonusAmount.toFixed(2)} Bonus
                          </span>
                        ) : null}
                      </div>

                      {/* Buttons */}
                      <div className="flex items-center flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedQrPass(ret)}
                          className="px-3.5 py-1.5 rounded-lg bg-white border border-[#DDD3C1] hover:border-[#12602F] text-[#1C2E1A] text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-2xs flex items-center gap-1.5"
                        >
                          <QrCode className="w-3.5 h-3.5 text-[#12602F]" />
                          <span>Digital QR Pass</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            downloadReturnSlip(ret);
                            showToast(`Return Pass #${ret.returnId}.html downloaded.`);
                          }}
                          className="px-3.5 py-1.5 rounded-lg bg-white border border-[#DDD3C1] hover:border-[#12602F] text-[#1C2E1A] text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-2xs flex items-center gap-1.5"
                          title="Download Official Return Authorization Pass"
                        >
                          <Download className="w-3.5 h-3.5 text-[#8C6221]" />
                          <span>Download Slip</span>
                        </button>

                        {isActive && (
                          <button
                            type="button"
                            onClick={() => setCancelTarget(ret)}
                            className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-rose-50 border border-stone-200 hover:border-rose-200 text-stone-600 hover:text-rose-700 text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-2xs"
                          >
                            Cancel Request
                          </button>
                        )}

                        <Link
                          to={`/orders/${ret.orderId}`}
                          className="px-3.5 py-1.5 rounded-lg bg-[#12602F] hover:bg-[#1B6A45] text-white text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-2xs flex items-center gap-1"
                        >
                          <span>Order Details</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-16 px-6 bg-white rounded-lg border border-[#DDD3C1] shadow-xs">
            <div className="w-16 h-16 rounded-full bg-[#D8EFE3] text-[#12602F] flex items-center justify-center mx-auto mb-3.5 shadow-sm">
              <RotateCcw className="w-8 h-8" />
            </div>
            <h4 className="font-serif text-xl font-bold text-[#1C2E1A]">
              No Return Claims Found
            </h4>
            <p className="text-xs sm:text-sm text-[#464D3F] max-w-md mx-auto mt-1 leading-relaxed">
              All delivered formulas are protected by our 30-Day Botanical Guarantee. You can start a new return claim anytime or browse your delivered orders.
            </p>

            <div className="flex items-center justify-center gap-3 mt-5">
              <button
                type="button"
                onClick={handleOpenWizard}
                className="px-5 py-2.5 rounded-lg bg-[#12602F] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#1B6A45] transition-colors cursor-pointer shadow-xs"
              >
                + Start Return Claim
              </button>
              {onSelectOrderTab && (
                <button
                  type="button"
                  onClick={onSelectOrderTab}
                  className="px-5 py-2.5 rounded-lg bg-[#FAF8F2] text-[#12602F] border border-[#DDD3C1] text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors cursor-pointer"
                >
                  Browse Delivered Orders
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── 4. BOTANICAL GUARANTEE FAQ ACCORDION ── */}
      <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#DDD3C1] shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5DEC9]">
          <div className="flex items-center gap-2.5">
            <HelpCircle className="w-4 h-4 text-[#12602F]" />
            <h3 className="font-serif text-lg font-bold text-[#1C2E1A]">
              Botanical Return Policy & Guidelines
            </h3>
          </div>
          <Link
            to="/whatsapp-support"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#12602F] hover:underline"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Concierge Desk</span>
          </Link>
        </div>

        <div className="divide-y divide-[#E5DEC9]">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="py-3.5 first:pt-1 last:pb-1">
              <button
                type="button"
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left font-serif text-sm font-bold text-[#1C2E1A] hover:text-[#12602F] cursor-pointer transition-colors"
              >
                <span>{faq.q}</span>
                {expandedFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-[#12602F] shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                )}
              </button>
              {expandedFaq === idx && (
                <p className="text-xs text-[#464D3F] mt-2 leading-relaxed font-light pl-1 animate-fade-in">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── MODALS (Digital Pass, Reschedule, Cancel, Wizard) ── */}
      {selectedQrPass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="fixed inset-0 bg-[#162820]/60 backdrop-blur-xs transition-opacity animate-fade-in"
            onClick={() => setSelectedQrPass(null)}
          />

          <div className="relative bg-white rounded-lg max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#DDD3C1] z-10 animate-scale-up text-center space-y-4">
            <button
              onClick={() => setSelectedQrPass(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D8EFE3] text-[#0D3322] text-[10px] font-bold uppercase tracking-widest">
              <span>Doorstep Verification Pass</span>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-bold text-[#1C2E1A]">
                Return Pass #{selectedQrPass.returnId}
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">Order Reference: #{selectedQrPass.orderId}</p>
            </div>

            <div className="p-4 bg-[#FAF8F2] rounded-lg border border-[#DDD3C1] mx-auto max-w-55 flex flex-col items-center justify-center shadow-inner">
              <svg className="w-36 h-36" viewBox="0 0 100 100" fill="none">
                <rect x="5" y="5" width="26" height="26" rx="4" stroke="#12602F" strokeWidth="4" />
                <rect x="11" y="11" width="14" height="14" rx="2" fill="#12602F" />
                <rect x="69" y="5" width="26" height="26" rx="4" stroke="#12602F" strokeWidth="4" />
                <rect x="75" y="11" width="14" height="14" rx="2" fill="#12602F" />
                <rect x="5" y="69" width="26" height="26" rx="4" stroke="#12602F" strokeWidth="4" />
                <rect x="11" y="75" width="14" height="14" rx="2" fill="#12602F" />
                <rect x="36" y="10" width="6" height="6" fill="#12602F" />
                <rect x="46" y="10" width="6" height="6" fill="#12602F" />
                <rect x="56" y="10" width="6" height="6" fill="#12602F" />
                <rect x="36" y="24" width="6" height="6" fill="#12602F" />
                <rect x="50" y="24" width="10" height="6" fill="#12602F" />
                <rect x="10" y="38" width="6" height="6" fill="#12602F" />
                <rect x="22" y="38" width="8" height="6" fill="#12602F" />
                <rect x="36" y="38" width="6" height="14" fill="#12602F" />
                <rect x="46" y="46" width="14" height="6" fill="#12602F" />
                <rect x="68" y="38" width="8" height="8" fill="#12602F" />
                <rect x="82" y="38" width="8" height="8" fill="#12602F" />
                <rect x="46" y="60" width="8" height="8" fill="#12602F" />
                <rect x="60" y="60" width="6" height="6" fill="#12602F" />
                <rect x="72" y="52" width="18" height="6" fill="#12602F" />
                <rect x="36" y="74" width="8" height="16" fill="#12602F" />
                <rect x="50" y="74" width="16" height="6" fill="#12602F" />
                <rect x="72" y="70" width="8" height="8" fill="#12602F" />
                <rect x="84" y="82" width="6" height="8" fill="#12602F" />
              </svg>
              <span className="text-[10px] font-mono font-bold text-stone-500 mt-2 tracking-widest">
                SCAN AT DOORSTEP
              </span>
            </div>

            <div className="p-3.5 bg-[#FAF8F2] rounded-lg border border-[#DDD3C1] flex items-center justify-between text-xs">
              <span className="text-stone-500 font-medium">Security Handshake OTP:</span>
              <span className="font-mono text-base font-extrabold text-[#12602F] tracking-widest bg-white px-3 py-1 rounded-lg border border-[#DDD3C1]">
                {selectedQrPass.pickupOtp || '8492'}
              </span>
            </div>

            <p className="text-[11px] text-stone-500 leading-relaxed">
              Show this QR code to the courier rider upon arrival. The rider will seal the product in an eco-tamper bag and verify the transaction instantly.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedQrPass(null)}
                className="w-1/2 py-2.5 rounded-lg border border-stone-200 text-stone-700 text-xs font-bold uppercase tracking-wider hover:bg-stone-50 transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  downloadReturnSlip(selectedQrPass);
                  showToast('Return Pass HTML saved.');
                }}
                className="w-1/2 py-2.5 rounded-lg bg-[#12602F] hover:bg-[#1B6A45] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
              >
                Print / Save Pass
              </button>
            </div>
          </div>
        </div>
      )}

      {rescheduleTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="fixed inset-0 bg-[#162820]/60 backdrop-blur-xs transition-opacity animate-fade-in"
            onClick={() => setRescheduleTarget(null)}
          />

          <div className="relative bg-white rounded-lg max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#DDD3C1] z-10 animate-scale-up">
            <button
              onClick={() => setRescheduleTarget(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F2] border border-[#DDD3C1] text-[#8C6221] text-[10px] font-bold uppercase tracking-widest mb-1.5">
                  <Calendar className="w-3 h-3 text-[#12602F]" />
                  <span>Reschedule Logistics</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#1C2E1A]">
                  Reschedule Courier Pickup
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Update your pickup appointment for Return #{rescheduleTarget.returnId}
                </p>
              </div>

              <form onSubmit={handleRescheduleSubmit} className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    Preferred Date
                  </label>
                  <select
                    value={newPickupDate}
                    onChange={(e) => setNewPickupDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 focus:border-[#12602F] text-xs font-medium text-[#1C2E1A] bg-[#FAF8F2] outline-none cursor-pointer"
                  >
                    <option value="Tomorrow">Tomorrow (Standard Expedited)</option>
                    <option value="In 2 Business Days">In 2 Business Days</option>
                    <option value="In 3 Business Days">In 3 Business Days</option>
                    <option value="Weekend Special Slot">Weekend Saturday Special Slot</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    Time Window
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      'Morning (9:00 AM – 1:00 PM)',
                      'Afternoon (2:00 PM – 7:00 PM)',
                    ].map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setNewPickupSlot(slot)}
                        className={`p-3 rounded-lg border text-xs font-semibold text-left transition-all cursor-pointer ${
                          newPickupSlot === slot
                            ? 'bg-[#12602F] text-white border-[#12602F] shadow-xs'
                            : 'bg-[#FAF8F2] text-stone-700 border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-[#FAF8F2] rounded-lg border border-[#DDD3C1] text-xs text-stone-600 space-y-1">
                  <p>
                    <strong>Address:</strong> {rescheduleTarget.pickupAddress || 'Default Sanctuary Address'}
                  </p>
                  <p className="text-[11px] text-stone-400">
                    Courier: {rescheduleTarget.carrier || 'BlueDart Eco-Neutral'}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setRescheduleTarget(null)}
                    className="w-1/3 py-2.5 rounded-lg border border-stone-200 text-stone-700 text-xs font-bold uppercase tracking-wider hover:bg-stone-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-2.5 rounded-lg bg-[#12602F] hover:bg-[#1B6A45] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
                  >
                    Confirm Reschedule
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {cancelTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="fixed inset-0 bg-[#162820]/60 backdrop-blur-xs transition-opacity animate-fade-in"
            onClick={() => setCancelTarget(null)}
          />

          <div className="relative bg-white rounded-lg max-w-md w-full p-6 sm:p-8 shadow-2xl border border-rose-200 z-10 animate-scale-up space-y-4">
            <button
              onClick={() => setCancelTarget(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-serif text-2xl font-bold text-[#1C2E1A]">
                Cancel Return Request?
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Are you sure you want to cancel Return Claim <strong>#{cancelTarget.returnId}</strong>?
              </p>
            </div>

            <form onSubmit={handleCancelSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Cancellation Reason
                </label>
                <select
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 text-xs font-medium text-[#1C2E1A] bg-[#FAF8F2] outline-none cursor-pointer"
                >
                  <option value="Found the formula worked well after adjustment">
                    Found the formula worked well after adjustment
                  </option>
                  <option value="Decided to gift or keep the product">Decided to gift or keep the product</option>
                  <option value="Submitted request by mistake">Submitted request by mistake</option>
                  <option value="Other reason">Other reason</option>
                </select>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCancelTarget(null)}
                  className="w-1/2 py-2.5 rounded-lg border border-stone-200 text-stone-700 text-xs font-bold uppercase tracking-wider hover:bg-stone-50 transition-colors cursor-pointer"
                >
                  Keep Request
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
                >
                  Yes, Cancel Claim
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isNewReturnWizardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="fixed inset-0 bg-[#162820]/60 backdrop-blur-xs transition-opacity animate-fade-in"
            onClick={() => setIsNewReturnWizardOpen(false)}
          />

          <div className="relative bg-white rounded-lg max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#DDD3C1] z-10 animate-scale-up max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsNewReturnWizardOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <form onSubmit={handleWizardSubmit} className="space-y-5">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D8EFE3] text-[#0D3322] text-[10px] font-bold uppercase tracking-widest mb-1.5">
                  <RotateCcw className="w-3 h-3 text-[#12602F]" />
                  <span>30-Day Botanical Guarantee Portal</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#1C2E1A]">
                  Initiate Return or Exchange
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Select your delivered order and choose preferred resolution and doorstep pickup window.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  1. Select Delivered Order
                </label>
                {allOrders.filter((o) => o.status.toLowerCase() === 'delivered').length === 0 ? (
                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 text-xs">
                    No delivered orders found in your archive. Returns can only be initiated on delivered orders.
                  </div>
                ) : (
                  <select
                    value={wizardOrderId}
                    onChange={(e) => handleWizardOrderChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 focus:border-[#12602F] text-xs font-semibold text-[#1C2E1A] bg-[#FAF8F2] outline-none cursor-pointer"
                  >
                    {allOrders
                      .filter((o) => o.status.toLowerCase() === 'delivered')
                      .map((ord) => (
                        <option key={ord.id} value={ord.id}>
                          Order #{ord.id} &bull; Delivered on {ord.date} &bull; ${ord.total.toFixed(2)}
                        </option>
                      ))}
                  </select>
                )}
              </div>

              {selectedOrderForWizard && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    2. Select Formulas to Return
                  </label>
                  <div className="space-y-2">
                    {selectedOrderForWizard.items.map((item: OrderItem) => {
                      const state = wizardSelectedItems[item.id] || { selected: false, qty: 1 };
                      return (
                        <div
                          key={item.id}
                          className={`p-3 rounded-lg border transition-all flex items-center justify-between gap-3 ${
                            state.selected
                              ? 'bg-[#FAF8F2] border-[#12602F] ring-1 ring-[#12602F]/20'
                              : 'bg-white border-stone-200 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <label className="flex items-center gap-3 cursor-pointer flex-1 min-w-0">
                            <input
                              type="checkbox"
                              checked={state.selected}
                              onChange={() =>
                                setWizardSelectedItems((prev) => ({
                                  ...prev,
                                  [item.id]: { ...prev[item.id], selected: !prev[item.id]?.selected },
                                }))
                              }
                              className="w-4 h-4 rounded text-[#12602F] focus:ring-[#12602F]"
                            />
                            <img
                              src={item.img}
                              alt={item.name}
                              className="w-10 h-10 object-cover rounded-lg bg-stone-100 shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-[#1C2E1A] truncate">{item.name}</p>
                              <p className="text-[11px] text-stone-500 font-mono">${item.price.toFixed(2)} each</p>
                            </div>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  3. Preferred Resolution
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    {
                      id: 'wallet' as const,
                      badge: '★ +5% Extra Bonus',
                      title: 'Wallet Credit',
                      desc: 'Instant store credit + 5% bonus',
                      icon: Sparkles,
                      isBonus: true,
                    },
                    {
                      id: 'refund' as const,
                      badge: 'Direct Reversal',
                      title: 'Bank Refund',
                      desc: '100% back to Card/UPI',
                      icon: CreditCard,
                      isBonus: false,
                    },
                    {
                      id: 'exchange' as const,
                      badge: 'Zero Delay',
                      title: 'Replacement',
                      desc: 'Fresh formulation bottle',
                      icon: RefreshCw,
                      isBonus: false,
                    },
                  ].map((opt) => {
                    const isSelected = wizardResolution === opt.id;
                    const Icon = opt.icon;
                    return (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => setWizardResolution(opt.id)}
                        className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#12602F] text-white border-[#12602F] shadow-sm'
                            : 'bg-[#FAF8F2] text-stone-800 border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span
                              className={`text-[8.5px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${
                                isSelected
                                  ? opt.isBonus
                                    ? 'bg-[#AFD971] text-[#0B2E1C]'
                                    : 'bg-white/20 text-white'
                                  : opt.isBonus
                                  ? 'bg-emerald-100 text-emerald-800 font-bold'
                                  : 'bg-stone-200 text-stone-600'
                              }`}
                            >
                              {opt.badge}
                            </span>
                            <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#AFD971]' : 'text-stone-500'}`} />
                          </div>
                          <p className="text-xs font-bold">{opt.title}</p>
                          <p
                            className={`text-[10px] mt-0.5 leading-snug ${
                              isSelected ? 'text-white/80' : 'text-stone-500'
                            }`}
                          >
                            {opt.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  4. Reason for Return
                </label>
                <select
                  value={wizardReason}
                  onChange={(e) => setWizardReason(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 text-xs font-medium text-[#1C2E1A] bg-[#FAF8F2] outline-none cursor-pointer"
                >
                  {RETURN_REASONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  5. Doorstep Courier Window
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'morning' as const, label: '🌅 Morning (9AM – 1PM)' },
                    { id: 'afternoon' as const, label: '🌇 Afternoon (2PM – 7PM)' },
                  ].map((slot) => (
                    <button
                      type="button"
                      key={slot.id}
                      onClick={() => setWizardPickupSlot(slot.id)}
                      className={`py-2.5 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer truncate ${
                        wizardPickupSlot === slot.id
                          ? 'bg-[#12602F] text-white border-[#12602F] shadow-xs'
                          : 'bg-[#FAF8F2] text-stone-700 border-stone-200'
                      }`}
                    >
                      {slot.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3.5 bg-[#FAF8F2] rounded-lg border border-[#DDD3C1] flex items-center justify-between text-xs">
                <div>
                  <p className="text-stone-500 font-medium">
                    {wizardResolution === 'wallet' ? 'Total Wallet Payout (+5% Bonus):' : 'Total Refund:'}
                  </p>
                  <p className="text-[11px] text-stone-400">Zero reverse delivery deduction ($0.00)</p>
                </div>
                <span className="font-mono text-base font-extrabold text-[#12602F]">
                  ${(wizardSubtotal + wizardBonus).toFixed(2)} USD
                </span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewReturnWizardOpen(false)}
                  className="w-1/3 py-3 rounded-lg border border-stone-200 text-stone-700 text-xs font-bold uppercase tracking-wider hover:bg-stone-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingWizard || wizardSubtotal === 0}
                  className="w-2/3 py-3 rounded-lg bg-[#12602F] hover:bg-[#1B6A45] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
                >
                  {isSubmittingWizard ? (
                    <span>Registering Claim...</span>
                  ) : (
                    <>
                      <span>Schedule Doorstep Pickup</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
