import { useState } from 'react';
import {
  RotateCcw, X, CheckCircle2, AlertCircle, Upload,
  Trash2, ArrowRight, Loader2, Sparkles, CreditCard,
  RefreshCw} from 'lucide-react';
import { requestReturn } from '../../lib/api/orders';
import type { Order, OrderItem } from '../../types';

interface ReturnRequestModalProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (returnId: string) => void;
}

const RETURN_REASONS = [
  'Damaged or leaking container in transit',
  'Incorrect formulation received',
  'Skin sensitivity / allergic reaction',
  'Compromised seal or texture defect',
  'Formula did not meet clinical expectations',
  'Ordered by mistake / Change of mind',
];

export default function ReturnRequestModal({
  order,
  isOpen,
  onClose,
  onSuccess,
}: ReturnRequestModalProps) {
  const [selectedItems, setSelectedItems] = useState<{ [itemId: number]: { selected: boolean; qty: number } }>(() => {
    const map: { [itemId: number]: { selected: boolean; qty: number } } = {};
    order.items.forEach((item) => {
      map[item.id] = { selected: true, qty: item.qty };
    });
    return map;
  });

  const [resolution, setResolution] = useState<'wallet' | 'refund' | 'exchange'>('wallet');
  const [pickupSlot, setPickupSlot] = useState<'morning' | 'afternoon'>('morning');
  const [reason, setReason] = useState(RETURN_REASONS[0]);
  const [notes, setNotes] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successData, setSuccessData] = useState<{ returnId: string; otp?: string; totalPayout?: number } | null>(null);

  if (!isOpen) return null;

  const handleItemToggle = (itemId: number) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        selected: !prev[itemId]?.selected,
      },
    }));
  };

  const handleQtyChange = (itemId: number, maxQty: number, delta: number) => {
    setSelectedItems((prev) => {
      const current = prev[itemId]?.qty || 1;
      const next = Math.max(1, Math.min(maxQty, current + delta));
      return {
        ...prev,
        [itemId]: {
          ...prev[itemId],
          qty: next,
        },
      };
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newUrls = Array.from(files).map((f) => URL.createObjectURL(f));
      setPhotos((prev) => [...prev, ...newUrls].slice(0, 3));
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  // Calculate estimated refund
  const baseRefund = order.items.reduce((acc, item) => {
    const sel = selectedItems[item.id];
    if (sel?.selected) {
      return acc + item.price * sel.qty;
    }
    return acc;
  }, 0);

  const bonusAmount = resolution === 'wallet' ? Number((baseRefund * 0.05).toFixed(2)) : 0;
  const totalPayout = baseRefund + bonusAmount;
  const selectedCount = Object.values(selectedItems).filter((s) => s.selected).length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (selectedCount === 0) {
      setErrorMessage('Please select at least one item to return.');
      return;
    }

    const payloadItems = order.items
      .filter((i) => selectedItems[i.id]?.selected)
      .map((i) => ({
        itemId: i.id,
        qty: selectedItems[i.id].qty,
        reason,
      }));

    setIsLoading(true);
    try {
      const res = await requestReturn(
        order.id,
        payloadItems,
        reason,
        resolution,
        pickupSlot,
        order.shippingAddress,
        notes,
        photos
      );
      if (res.success && res.returnRequest) {
        setSuccessData({
          returnId: res.returnId,
          otp: res.returnRequest.pickupOtp,
          totalPayout: res.returnRequest.refundAmount + (res.returnRequest.bonusAmount || 0),
        });
        if (onSuccess) onSuccess(res.returnId);
      } else {
        setErrorMessage(res.message || 'Failed to submit return request.');
      }
    } catch {
      setErrorMessage('A network error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#162820]/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#13442C]/15 z-10 animate-scale-up max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {successData ? (
          <div className="text-center py-6 space-y-4 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-[#D8EFE3] text-[#13442C] flex items-center justify-center mx-auto mb-2 shadow-sm">
              <CheckCircle2 className="w-8 h-8 text-[#1B6A45]" />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAFBF9] border border-[#13442C]/15 text-[11px] font-bold text-[#13442C] uppercase tracking-wider">
              <span>Return Claim #{successData.returnId}</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#162820]">
              Doorstep Pickup Scheduled
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
              Our verified eco-courier will arrive at your address with a tamper-evident botanical pouch within 24–48 hours. Zero printing or packaging required.
            </p>

            <div className="p-4 bg-[#F4F8F5] rounded-2xl border border-[#13442C]/15 text-left text-xs space-y-2 mt-4">
              <div className="flex justify-between items-center pb-2 border-b border-stone-200/60">
                <span className="text-stone-500 font-medium">Doorstep Security OTP:</span>
                <span className="font-mono text-sm font-extrabold text-[#12602F] bg-white px-2.5 py-0.5 rounded-md border border-[#13442C]/20 shadow-2xs">
                  {successData.otp || '8492'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Authorized Resolution:</span>
                <span className="font-extrabold text-[#13442C] capitalize">
                  {resolution === 'wallet' ? 'Sanctuary Wallet (+5% Bonus)' : resolution === 'exchange' ? 'Formula Replacement' : 'Direct 100% Bank Refund'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Total Credit:</span>
                <span className="font-mono font-extrabold text-[#162820]">
                  ${(successData.totalPayout || totalPayout).toFixed(2)} USD
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Pickup Slot:</span>
                <span className="font-semibold text-stone-700">
                  {pickupSlot === 'morning' ? 'Morning (9:00 AM – 1:00 PM)' : 'Afternoon (2:00 PM – 7:00 PM)'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3.5 rounded-xl bg-[#13442C] hover:bg-[#1B6A45] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs mt-2"
            >
              View in Returns & Refund Lifecycle
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D8EFE3] text-[#0D3322] text-[10px] font-bold uppercase tracking-widest mb-2">
                <RotateCcw className="w-3 h-3" />
                <span>30-Day Botanical Guarantee Portal</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#162820]">
                Request Return for Order #{order.id}
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Select items, choose resolution preference, and schedule a complimentary eco-courier pickup.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* 1. Item Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2.5">
                1. Select Products to Return
              </label>
              <div className="space-y-2.5">
                {order.items.map((item: OrderItem) => {
                  const state = selectedItems[item.id] || { selected: false, qty: 1 };
                  return (
                    <div
                      key={item.id}
                      className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                        state.selected
                          ? 'bg-[#FAFBF9] border-[#13442C] ring-1 ring-[#13442C]/20 shadow-2xs'
                          : 'bg-white border-stone-200 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <label className="flex items-center gap-3 cursor-pointer flex-1 min-w-0">
                        <input
                          type="checkbox"
                          checked={state.selected}
                          onChange={() => handleItemToggle(item.id)}
                          className="w-4 h-4 rounded border-stone-300 text-[#13442C] focus:ring-[#13442C]"
                        />
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-11 h-11 object-cover rounded-lg bg-stone-100 shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-[#162820] truncate">{item.name}</p>
                          <p className="text-[11px] text-stone-500 font-mono">${item.price.toFixed(2)} each</p>
                        </div>
                      </label>

                      {/* Quantity Controller */}
                      {state.selected && item.qty > 1 && (
                        <div className="flex items-center border border-stone-200 rounded-lg bg-white overflow-hidden shrink-0">
                          <button
                            type="button"
                            onClick={() => handleQtyChange(item.id, item.qty, -1)}
                            className="px-2 py-1 text-xs text-stone-600 hover:bg-stone-100 font-bold"
                          >
                            −
                          </button>
                          <span className="px-2.5 text-xs font-bold text-[#162820]">{state.qty}</span>
                          <button
                            type="button"
                            onClick={() => handleQtyChange(item.id, item.qty, 1)}
                            className="px-2 py-1 text-xs text-stone-600 hover:bg-stone-100 font-bold"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Resolution Mode */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                2. Preferred Resolution Option
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
                  const isSelected = resolution === opt.id;
                  const Icon = opt.icon;
                  return (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => setResolution(opt.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#12602F] text-white border-[#12602F] shadow-sm ring-2 ring-[#12602F]/20'
                          : 'bg-[#FAFBF9] text-stone-800 border-stone-200 hover:border-stone-300'
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
                        <p className={`text-[10px] mt-0.5 leading-snug ${isSelected ? 'text-white/80' : 'text-stone-500'}`}>
                          {opt.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Reason for Return */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                3. Reason for Return
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-[#13442C] focus:ring-2 focus:ring-[#13442C]/15 text-xs font-medium text-[#162820] bg-stone-50/50 outline-none cursor-pointer"
              >
                {RETURN_REASONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Preferred Pickup Window */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                4. Doorstep Courier Pickup Window
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'morning' as const, label: '🌅 Morning (9:00 AM – 1:00 PM)' },
                  { id: 'afternoon' as const, label: '🌇 Afternoon (2:00 PM – 7:00 PM)' },
                ].map((slot) => (
                  <button
                    type="button"
                    key={slot.id}
                    onClick={() => setPickupSlot(slot.id)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer truncate ${
                      pickupSlot === slot.id
                        ? 'bg-[#12602F] text-white border-[#12602F] shadow-xs'
                        : 'bg-[#FAFBF9] text-stone-700 border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    {slot.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Notes / Feedback */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                5. Feedback / Batch Notes (Optional)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Describe skin reaction or batch notes for our clinical lab..."
                className="w-full p-3 rounded-xl border border-stone-200 focus:border-[#13442C] focus:ring-2 focus:ring-[#13442C]/15 text-xs text-[#162820] bg-stone-50/50 outline-none resize-none"
              />
            </div>

            {/* 6. Photo Evidence (Optional) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                6. Photo of Product / Dropper Seal (Optional)
              </label>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-dashed border-[#13442C]/30 hover:border-[#13442C] bg-[#F0F6F2]/50 hover:bg-[#F0F6F2] text-[#13442C] text-xs font-bold cursor-pointer transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Photos (Max 3)</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>

                {photos.map((src, idx) => (
                  <div key={idx} className="relative w-11 h-11 rounded-lg border border-stone-200 overflow-hidden group">
                    <img src={src} alt="Uploaded preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(idx)}
                      className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-rose-300" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Refund Estimate Banner */}
            <div className="p-3.5 bg-[#FAFBF9] border border-[#13442C]/15 rounded-2xl flex items-center justify-between text-xs">
              <div>
                <p className="text-stone-500 font-medium">
                  {resolution === 'wallet' ? 'Total Wallet Credit (+5% Bonus):' : 'Estimated Refund Total:'}
                </p>
                <p className="text-[11px] text-stone-400">
                  {resolution === 'wallet'
                    ? `$${baseRefund.toFixed(2)} + $${bonusAmount.toFixed(2)} Bonus Credit`
                    : `Credited to ${order.paymentMethod}`}
                </p>
              </div>
              <span className="text-base font-extrabold text-[#13442C] font-mono">
                ${totalPayout.toFixed(2)}
              </span>
            </div>

            {/* Submit Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-1/3 py-3 rounded-xl border border-stone-200 text-stone-600 text-xs font-bold uppercase tracking-wider hover:bg-stone-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || selectedCount === 0}
                className="w-2/3 py-3 rounded-xl bg-[#13442C] hover:bg-[#1B6A45] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Return Claim</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

