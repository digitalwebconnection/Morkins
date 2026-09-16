import { useState, useEffect } from 'react';
import {
  Search, Download, X, Plus, CheckCircle2, ChevronDown, Package, ShieldCheck, Box, RefreshCw, Truck
} from 'lucide-react';
import {
  getReturnRequests,
  getUserOrders,
  cancelReturnRequest,
  requestReturn
} from '../../../../lib/api/orders';
import { downloadReturnSlip } from '../../../../lib/utils/invoicePdf';
import type { ReturnRequest, Order } from '../../../../types';

interface ReturnStatusTabProps {
  onSelectOrderTab?: () => void;
}

const RETURN_REASONS = [
  'Item damaged during shipping',
  'Incorrect item received',
  'Item does not match description',
  'No longer needed / Changed mind',
];

export default function ReturnStatusTab({ onSelectOrderTab: _onSelectOrderTab }: ReturnStatusTabProps) {
  const [returns, setReturns] = useState<ReturnRequest[]>([]);
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed' | 'cancelled'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Accordion State
  const [expandedReturnIds, setExpandedReturnIds] = useState<string[]>([]);
  
  // Wizard States
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [wizardOrderId, setWizardOrderId] = useState('');
  const [wizardSelectedItems, setWizardSelectedItems] = useState<{ [itemId: number]: { selected: boolean; qty: number; reason: string } }>({});
  const [wizardResolution, setWizardResolution] = useState<'refund' | 'exchange'>('refund');
  const [wizardReturnMethod, setWizardReturnMethod] = useState<'dropoff' | 'pickup'>('dropoff');
  const [isSubmittingWizard, setIsSubmittingWizard] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const fetchReturns = () => {
    setIsLoading(true);
    Promise.all([getReturnRequests(), getUserOrders()]).then(([returnData, orderData]) => {
      setReturns(returnData);
      setAllOrders(orderData);
      if (returnData.length > 0) {
        setExpandedReturnIds([returnData[0].returnId]);
      }
      setIsLoading(false);
    });
  };

  const toggleReturnExpanded = (id: string) => {
    setExpandedReturnIds(prev =>
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    fetchReturns();
  }, []);

  const handleCancelReturn = async (returnId: string) => {
    if (confirm('Are you sure you want to cancel this return request?')) {
      const res = await cancelReturnRequest(returnId, 'User cancelled');
      if (res.success) {
        showToast(res.message);
        fetchReturns();
      }
    }
  };

  const handleOpenWizard = () => {
    const delivered = allOrders.filter((o) => o.status.toLowerCase() === 'delivered');
    if (delivered.length > 0) {
      handleWizardOrderChange(delivered[0].id);
    } else {
      setWizardOrderId('');
      setWizardSelectedItems({});
    }
    setWizardStep(1);
    setIsWizardOpen(true);
  };

  const handleWizardOrderChange = (orderId: string) => {
    setWizardOrderId(orderId);
    const order = allOrders.find((o) => o.id === orderId);
    if (order) {
      const map: { [itemId: number]: { selected: boolean; qty: number; reason: string } } = {};
      order.items.forEach((item) => {
        map[item.id] = { selected: false, qty: item.qty, reason: RETURN_REASONS[0] };
      });
      setWizardSelectedItems(map);
    }
  };

  const handleWizardSubmit = async () => {
    const order = allOrders.find((o) => o.id === wizardOrderId);
    if (!order) return;

    const payloadItems = order.items
      .filter((i) => wizardSelectedItems[i.id]?.selected)
      .map((i) => ({
        itemId: i.id,
        qty: wizardSelectedItems[i.id].qty,
        reason: wizardSelectedItems[i.id].reason,
      }));

    if (payloadItems.length === 0) {
      alert('Please select at least one item to return.');
      return;
    }

    setIsSubmittingWizard(true);
    try {
      const res = await requestReturn(
        order.id,
        payloadItems,
        payloadItems[0]?.reason || 'User return',
        wizardResolution as any,
        wizardReturnMethod === 'pickup' ? 'morning' : ('dropoff' as any),
        order.shippingAddress,
        ''
      );
      if (res.success) {
        showToast(`Return Request #${res.returnId} submitted successfully!`);
        setIsWizardOpen(false);
        fetchReturns();
      }
    } catch {
      alert('Failed to submit return request. Please try again.');
    } finally {
      setIsSubmittingWizard(false);
    }
  };

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
      if (!matchId) return false;
    }
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'refunded': return { label: 'Refunded', color: 'text-emerald-800 bg-emerald-50 border-emerald-200' };
      case 'cancelled':
      case 'rejected': return { label: 'Cancelled', color: 'text-red-800 bg-red-50 border-red-200' };
      case 'requested': return { label: 'Requested', color: 'text-amber-800 bg-amber-50 border-amber-200' };
      default: return { label: status.replace('_', ' '), color: 'text-blue-800 bg-blue-50 border-blue-200' };
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-[#1C2E1A]">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-[#12602F] text-white text-xs font-bold rounded-2xl shadow-2xl flex items-center gap-3">
          <CheckCircle2 className="w-4 h-4 text-[#AFD971]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#DDD3C1] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">Returns & Refunds</h2>
          <p className="text-sm text-[#464D3F] mt-1">Manage your active returns and view refund status.</p>
        </div>
        <button
          onClick={handleOpenWizard}
          className="px-5 py-2.5 bg-[#12602F] hover:bg-[#1B6A45] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Start a Return</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {['all', 'active', 'completed', 'cancelled'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterStatus(tab as any)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                filterStatus === tab
                  ? 'bg-white border-2 border-[#12602F] text-[#12602F] shadow-xs'
                  : 'bg-transparent border border-transparent hover:bg-white hover:border-[#DDD3C1] text-[#464D3F]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search return ID or order..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 pl-9 pr-4 py-2 rounded-lg border border-[#DDD3C1] text-sm focus:outline-none focus:border-[#12602F] focus:ring-1 focus:ring-[#12602F] bg-white"
          />
        </div>
      </div>

      {/* Returns List */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-4 border-[#12602F] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-[#464D3F] mt-4">Loading returns...</p>
        </div>
      ) : filteredReturns.length === 0 ? (
        <div className="bg-white rounded-xl p-12 border border-[#DDD3C1] text-center shadow-2xs">
          <Package className="w-12 h-12 text-[#DDD3C1] mx-auto mb-4" />
          <h3 className="font-serif text-xl font-bold">No returns found</h3>
          <p className="text-sm text-[#464D3F] mt-2 max-w-md mx-auto">
            You don't have any returns matching the current criteria.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReturns.map((ret) => {
            const badge = getStatusBadge(ret.status);
            const isCancellable = ['requested', 'approved'].includes(ret.status);
            const isExpanded = expandedReturnIds.includes(ret.returnId);
            
            return (
              <div key={ret.returnId} className={`bg-white rounded-xl border transition-all overflow-hidden flex flex-col ${isExpanded ? 'border-[#12602F] shadow-sm' : 'border-[#DDD3C1] shadow-2xs hover:border-[#8C6221]'}`}>
                <div 
                  className={`p-5 sm:p-6 bg-[#FAF8F2] flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer transition-colors ${isExpanded ? 'border-b border-[#E5DEC9]' : ''}`}
                  onClick={() => toggleReturnExpanded(ret.returnId)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full bg-white border flex items-center justify-center shrink-0 transition-colors ${isExpanded ? 'border-[#12602F]' : 'border-[#DDD3C1]'}`}>
                      <RefreshCw className={`w-5 h-5 ${isExpanded ? 'text-[#12602F]' : 'text-[#8C6221]'}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">Return #{ret.returnId}</h3>
                      <p className="text-xs text-[#464D3F] mt-0.5">Order #{ret.orderId} • Requested on {ret.date}</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:items-end gap-2">
                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border capitalize ${badge.color}`}>
                        {badge.label}
                      </span>
                      <ChevronDown className={`w-5 h-5 text-stone-400 transition-transform ${isExpanded ? 'rotate-180 text-[#12602F]' : ''}`} />
                    </div>
                    <span className="text-xs font-bold text-[#1C2E1A]">Refund: ${(ret.refundAmount || 0).toFixed(2)}</span>
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-5 sm:p-6 flex flex-col sm:flex-row justify-between gap-6 animate-fade-in">
                    <div className="flex-1">
                      <h4 className="text-xs font-bold uppercase text-[#8C6221] tracking-wider mb-3">Returned Items</h4>
                      <div className="space-y-3">
                        {ret.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-md bg-[#FAF8F2] border border-[#DDD3C1] flex items-center justify-center overflow-hidden">
                              {item.img ? (
                                <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                              ) : (
                                <Box className="w-4 h-4 text-[#DDD3C1]" />
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-bold truncate max-w-[200px] sm:max-w-xs">{item.name}</p>
                              <p className="text-[11px] text-[#464D3F]">Qty: {item.qty} • {ret.reason}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end justify-center gap-3 border-t sm:border-t-0 sm:border-l border-[#E5DEC9] pt-4 sm:pt-0 sm:pl-6 min-w-[140px]">
                      <button
                        onClick={() => downloadReturnSlip(ret)}
                        className="w-full sm:w-auto px-4 py-2 bg-white border border-[#DDD3C1] hover:border-[#12602F] text-[#12602F] text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download Label</span>
                      </button>
                      {isCancellable && (
                        <button
                          onClick={() => handleCancelReturn(ret.returnId)}
                          className="w-full sm:w-auto px-4 py-2 bg-white border border-red-200 hover:border-red-400 text-red-600 text-xs font-bold rounded-lg transition-colors"
                        >
                          Cancel Return
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Start Return Wizard Modal */}
      {isWizardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-900/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-scale-up">
            <div className="px-6 py-4 border-b border-[#E5DEC9] flex items-center justify-between bg-[#FAF8F2]">
              <h3 className="font-serif text-xl font-bold">Start a Return (Step {wizardStep} of 3)</h3>
              <button onClick={() => setIsWizardOpen(false)} className="p-2 hover:bg-white rounded-full transition-colors">
                <X className="w-5 h-5 text-stone-500" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 bg-white">
              {wizardStep === 1 && (
                <div className="space-y-4">
                  <h4 className="font-bold text-sm text-[#1C2E1A]">Select an eligible order</h4>
                  <div className="grid gap-3">
                    {allOrders.filter(o => o.status === 'delivered').map(order => (
                      <label key={order.id} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${wizardOrderId === order.id ? 'border-[#12602F] bg-emerald-50/30' : 'border-[#DDD3C1] hover:bg-[#FAF8F2]'}`}>
                        <input type="radio" name="order" checked={wizardOrderId === order.id} onChange={() => handleWizardOrderChange(order.id)} className="w-4 h-4 text-[#12602F]" />
                        <div className="flex-1">
                          <p className="font-bold text-sm">Order #{order.id}</p>
                          <p className="text-xs text-[#464D3F] mt-0.5">Delivered on {order.date}</p>
                        </div>
                      </label>
                    ))}
                    {allOrders.filter(o => o.status === 'delivered').length === 0 && (
                      <p className="text-sm text-stone-500 p-4 bg-stone-50 rounded-lg text-center">No delivered orders available for return.</p>
                    )}
                  </div>
                </div>
              )}

              {wizardStep === 2 && (
                <div className="space-y-6">
                  <h4 className="font-bold text-sm text-[#1C2E1A]">Select items and tell us why you are returning them</h4>
                  <div className="space-y-4">
                    {allOrders.find(o => o.id === wizardOrderId)?.items.map(item => {
                      const isSelected = wizardSelectedItems[item.id]?.selected || false;
                      const currentReason = wizardSelectedItems[item.id]?.reason || RETURN_REASONS[0];
                      const currentQty = wizardSelectedItems[item.id]?.qty || 1;
                      
                      return (
                        <div key={item.id} className={`p-4 rounded-xl border transition-all ${isSelected ? 'border-[#12602F] bg-[#FAF8F2] shadow-sm' : 'border-[#DDD3C1]'}`}>
                          <div className="flex items-start gap-4">
                            <input 
                              type="checkbox" 
                              checked={isSelected}
                              onChange={(e) => setWizardSelectedItems(prev => ({ ...prev, [item.id]: { ...prev[item.id], selected: e.target.checked } }))}
                              className="w-5 h-5 mt-1 text-[#12602F] rounded border-[#DDD3C1] focus:ring-[#12602F] cursor-pointer"
                            />
                            <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded-lg border border-[#DDD3C1] bg-white" />
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-sm text-[#1C2E1A]">{item.name}</p>
                              <p className="text-xs text-[#464D3F] mt-1">${item.price.toFixed(2)}</p>
                            </div>
                          </div>
                          
                          {isSelected && (
                            <div className="mt-4 pt-4 border-t border-[#E5DEC9] grid sm:grid-cols-3 gap-4 animate-fade-in">
                              <div className="sm:col-span-1">
                                <label className="block text-xs font-bold text-[#464D3F] mb-1">Quantity</label>
                                <select 
                                  value={currentQty}
                                  onChange={(e) => setWizardSelectedItems(prev => ({ ...prev, [item.id]: { ...prev[item.id], qty: parseInt(e.target.value) } }))}
                                  className="w-full p-2.5 rounded-lg border border-[#DDD3C1] text-sm focus:outline-none focus:border-[#12602F] focus:ring-1 focus:ring-[#12602F] bg-white"
                                >
                                  {Array.from({ length: item.qty }, (_, i) => i + 1).map(n => (
                                    <option key={n} value={n}>{n}</option>
                                  ))}
                                </select>
                              </div>
                              <div className="sm:col-span-2">
                                <label className="block text-xs font-bold text-[#464D3F] mb-1">Reason for return</label>
                                <select 
                                  value={currentReason}
                                  onChange={(e) => setWizardSelectedItems(prev => ({ ...prev, [item.id]: { ...prev[item.id], reason: e.target.value } }))}
                                  className="w-full p-2.5 rounded-lg border border-[#DDD3C1] text-sm focus:outline-none focus:border-[#12602F] focus:ring-1 focus:ring-[#12602F] bg-white"
                                >
                                  {RETURN_REASONS.map(r => (
                                    <option key={r} value={r}>{r}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {wizardStep === 3 && (
                <div className="space-y-8">
                  <div>
                    <h4 className="font-bold text-sm text-[#1C2E1A] mb-4 flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#8C6221]" /> How will you return it?
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <label className={`p-5 rounded-xl border cursor-pointer transition-all flex flex-col gap-2 ${wizardReturnMethod === 'dropoff' ? 'border-[#12602F] bg-emerald-50/30 ring-1 ring-[#12602F]' : 'border-[#DDD3C1] hover:bg-[#FAF8F2]'}`}>
                        <div className="flex justify-between items-start">
                          <div className="w-8 h-8 rounded-full bg-white border border-[#DDD3C1] flex items-center justify-center">
                            <Box className={`w-4 h-4 ${wizardReturnMethod === 'dropoff' ? 'text-[#12602F]' : 'text-stone-400'}`} />
                          </div>
                          <input type="radio" name="method" checked={wizardReturnMethod === 'dropoff'} onChange={() => setWizardReturnMethod('dropoff')} className="w-4 h-4 text-[#12602F]" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-[#1C2E1A]">Courier Drop-off</p>
                          <p className="text-xs text-[#464D3F] mt-1 leading-relaxed">Print your label and drop it off at any authorized shipping center near you.</p>
                        </div>
                      </label>
                      <label className={`p-5 rounded-xl border cursor-pointer transition-all flex flex-col gap-2 ${wizardReturnMethod === 'pickup' ? 'border-[#12602F] bg-emerald-50/30 ring-1 ring-[#12602F]' : 'border-[#DDD3C1] hover:bg-[#FAF8F2]'}`}>
                        <div className="flex justify-between items-start">
                          <div className="w-8 h-8 rounded-full bg-white border border-[#DDD3C1] flex items-center justify-center">
                            <Truck className={`w-4 h-4 ${wizardReturnMethod === 'pickup' ? 'text-[#12602F]' : 'text-stone-400'}`} />
                          </div>
                          <input type="radio" name="method" checked={wizardReturnMethod === 'pickup'} onChange={() => setWizardReturnMethod('pickup')} className="w-4 h-4 text-[#12602F]" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-[#1C2E1A]">Home Pickup</p>
                          <p className="text-xs text-[#464D3F] mt-1 leading-relaxed">A courier will come to your address to collect the package next business day.</p>
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-sm text-[#1C2E1A] mb-4 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#8C6221]" /> How would you like your resolution?
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <label className={`p-5 rounded-xl border cursor-pointer transition-all flex flex-col gap-2 ${wizardResolution === 'refund' ? 'border-[#12602F] bg-emerald-50/30 ring-1 ring-[#12602F]' : 'border-[#DDD3C1] hover:bg-[#FAF8F2]'}`}>
                        <div className="flex justify-between items-start">
                          <div className="w-8 h-8 rounded-full bg-white border border-[#DDD3C1] flex items-center justify-center">
                            <CheckCircle2 className={`w-4 h-4 ${wizardResolution === 'refund' ? 'text-[#12602F]' : 'text-stone-400'}`} />
                          </div>
                          <input type="radio" name="res" checked={wizardResolution === 'refund'} onChange={() => setWizardResolution('refund')} className="w-4 h-4 text-[#12602F]" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-[#1C2E1A]">Original Payment Method</p>
                          <p className="text-xs text-[#464D3F] mt-1 leading-relaxed">Refund processed to your card within 3-5 business days after inspection.</p>
                        </div>
                      </label>
                      <label className={`p-5 rounded-xl border cursor-pointer transition-all flex flex-col gap-2 ${wizardResolution === 'exchange' ? 'border-[#12602F] bg-emerald-50/30 ring-1 ring-[#12602F]' : 'border-[#DDD3C1] hover:bg-[#FAF8F2]'}`}>
                        <div className="flex justify-between items-start">
                          <div className="w-8 h-8 rounded-full bg-white border border-[#DDD3C1] flex items-center justify-center">
                            <RefreshCw className={`w-4 h-4 ${wizardResolution === 'exchange' ? 'text-[#12602F]' : 'text-stone-400'}`} />
                          </div>
                          <input type="radio" name="res" checked={wizardResolution === 'exchange'} onChange={() => setWizardResolution('exchange')} className="w-4 h-4 text-[#12602F]" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-[#1C2E1A]">Instant Store Credit</p>
                          <p className="text-xs text-[#464D3F] mt-1 leading-relaxed">Get your refund immediately as store credit once the courier scans your item.</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-[#E5DEC9] bg-[#FAF8F2] flex items-center justify-between">
              <button 
                onClick={() => setWizardStep(prev => Math.max(1, prev - 1))}
                disabled={wizardStep === 1}
                className="px-4 py-2 text-sm font-bold text-[#464D3F] hover:text-[#12602F] disabled:opacity-50 cursor-pointer"
              >
                Back
              </button>
              {wizardStep < 3 ? (
                <button 
                  onClick={() => setWizardStep(prev => prev + 1)}
                  disabled={(wizardStep === 1 && !wizardOrderId) || (wizardStep === 2 && !Object.values(wizardSelectedItems).some(i => i.selected))}
                  className="px-6 py-2 bg-[#12602F] hover:bg-[#1B6A45] disabled:bg-stone-300 disabled:text-stone-500 disabled:hover:bg-stone-300 text-white text-sm font-bold rounded-lg disabled:opacity-50 transition-colors disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              ) : (
                <button 
                  onClick={handleWizardSubmit}
                  disabled={isSubmittingWizard}
                  className="px-6 py-2 bg-[#12602F] hover:bg-[#1B6A45] disabled:bg-stone-300 disabled:text-stone-500 disabled:hover:bg-stone-300 text-white text-sm font-bold rounded-lg disabled:opacity-50 transition-colors disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmittingWizard ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : null}
                  <span>Submit Return</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
