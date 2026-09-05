import React, { useState } from 'react';
import {
  CreditCard, Plus, ShieldCheck, CheckCircle2, Trash2,
  Lock, Sparkles, Smartphone, X
} from 'lucide-react';
import type { User } from '../../../types';

interface PaymentMethodsTabProps {
  user: User;
  t: (key: string) => string;
}

interface SavedCard {
  id: string;
  type: 'visa' | 'mastercard' | 'amex';
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  isDefault: boolean;
}

interface SavedUpi {
  id: string;
  vpa: string;
  provider: string;
  isDefault: boolean;
}

const DEFAULT_CARDS: SavedCard[] = [
  {
    id: 'card-1',
    type: 'visa',
    cardNumber: '•••• •••• •••• 4242',
    cardHolder: 'ANANYA SHARMA',
    expiry: '08/28',
    isDefault: true,
  },
  {
    id: 'card-2',
    type: 'mastercard',
    cardNumber: '•••• •••• •••• 8819',
    cardHolder: 'ANANYA SHARMA',
    expiry: '11/29',
    isDefault: false,
  },
];

const DEFAULT_UPIS: SavedUpi[] = [
  {
    id: 'upi-1',
    vpa: 'ananya@okhdfcbank',
    provider: 'Google Pay UPI',
    isDefault: true,
  },
  {
    id: 'upi-2',
    vpa: '9842019482@paytm',
    provider: 'Paytm UPI',
    isDefault: false,
  },
];

export const PaymentMethodsTab: React.FC<PaymentMethodsTabProps> = ({ user }) => {
  const [cards, setCards] = useState<SavedCard[]>(() => {
    const saved = localStorage.getItem(`morkins_cards_${user.email}`);
    return saved ? JSON.parse(saved) : DEFAULT_CARDS;
  });

  const [upis, setUpis] = useState<SavedUpi[]>(() => {
    const saved = localStorage.getItem(`morkins_upis_${user.email}`);
    return saved ? JSON.parse(saved) : DEFAULT_UPIS;
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addMode, setAddMode] = useState<'card' | 'upi'>('card');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states
  const [newCardNumber, setNewCardNumber] = useState('');
  const [newCardHolder, setNewCardHolder] = useState(user.fullName || '');
  const [newCardExpiry, setNewCardExpiry] = useState('');
  const [newCardCvv, setNewCardCvv] = useState('');
  const [newUpiId, setNewUpiId] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSetDefaultCard = (id: string) => {
    const updated = cards.map((c) => ({ ...c, isDefault: c.id === id }));
    setCards(updated);
    localStorage.setItem(`morkins_cards_${user.email}`, JSON.stringify(updated));
    showToast('Default payment card updated.');
  };

  const handleDeleteCard = (id: string) => {
    const updated = cards.filter((c) => c.id !== id);
    setCards(updated);
    localStorage.setItem(`morkins_cards_${user.email}`, JSON.stringify(updated));
    showToast('Payment card removed from vault.');
  };

  const handleSetDefaultUpi = (id: string) => {
    const updated = upis.map((u) => ({ ...u, isDefault: u.id === id }));
    setUpis(updated);
    localStorage.setItem(`morkins_upis_${user.email}`, JSON.stringify(updated));
    showToast('Default UPI handle updated.');
  };

  const handleDeleteUpi = (id: string) => {
    const updated = upis.filter((u) => u.id !== id);
    setUpis(updated);
    localStorage.setItem(`morkins_upis_${user.email}`, JSON.stringify(updated));
    showToast('UPI handle removed.');
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (addMode === 'card') {
      if (!newCardNumber || !newCardExpiry) {
        alert('Please enter valid card details.');
        return;
      }
      const newCard: SavedCard = {
        id: `card-${Date.now()}`,
        type: newCardNumber.startsWith('4') ? 'visa' : 'mastercard',
        cardNumber: `•••• •••• •••• ${newCardNumber.slice(-4) || '9999'}`,
        cardHolder: (newCardHolder || 'SANCTUARY PATRON').toUpperCase(),
        expiry: newCardExpiry || '12/28',
        isDefault: cards.length === 0,
      };
      const updated = [...cards, newCard];
      setCards(updated);
      localStorage.setItem(`morkins_cards_${user.email}`, JSON.stringify(updated));
      showToast('New card encrypted & saved to Sanctuary Vault.');
    } else {
      if (!newUpiId.includes('@')) {
        alert('Please enter a valid UPI ID (e.g. user@okhdfcbank)');
        return;
      }
      const newUpi: SavedUpi = {
        id: `upi-${Date.now()}`,
        vpa: newUpiId.toLowerCase(),
        provider: 'Custom UPI Virtual ID',
        isDefault: upis.length === 0,
      };
      const updated = [...upis, newUpi];
      setUpis(updated);
      localStorage.setItem(`morkins_upis_${user.email}`, JSON.stringify(updated));
      showToast('UPI ID registered successfully.');
    }
    setIsAddModalOpen(false);
    setNewCardNumber('');
    setNewCardExpiry('');
    setNewCardCvv('');
    setNewUpiId('');
  };

  return (
    <div className="space-y-7 animate-fade-in text-[#1C2E1A]">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-[#12602F] text-white text-xs font-bold rounded-2xl shadow-2xl border border-[#AFD971]/30 flex items-center gap-3 animate-slide-up">
          <CheckCircle2 className="w-4 h-4 text-[#AFD971] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── 1. HEADER BANNER & SANCTUARY WALLET ── */}
      <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#DDD3C1] shadow-md relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-[#12602F] via-[#C49746] to-[#AFD971]" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-6 border-b border-[#E5DEC9]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-linear-to-r from-[#D8EFE3] to-[#FAF8F2] border border-[#13442C]/20 text-[#0D3322] text-[10px] font-bold uppercase tracking-widest mb-2 shadow-2xs">
              <Lock className="w-3 h-3 text-[#12602F]" />
              <span>256-Bit Encrypted Sanctuary Payment Vault</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C2E1A]">
              Payment Methods & Billing
            </h2>
            <p className="text-xs sm:text-sm text-[#464D3F] mt-1 max-w-2xl leading-relaxed">
              Safely manage tokenized credit cards, instant UPI handles, and Sanctuary Wallet store credits.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#12602F] hover:bg-[#1B6A45] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4 text-[#AFD971]" />
            <span>Add Payment Method</span>
          </button>
        </div>

        {/* Sanctuary Wallet Snapshot Card */}
        <div className="mt-6 p-5 rounded-2xl bg-linear-to-r from-[#FAF8F2] via-[#F4EFE6] to-[#FAF8F2] border border-[#C9B387]/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#12602F] text-[#AFD971] flex items-center justify-center font-bold shadow-xs">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6221] block">
                Morkins Sanctuary Wallet Balance
              </span>
              <h3 className="font-mono text-2xl font-extrabold text-[#12602F]">
                $74.10 <span className="text-xs font-serif font-normal text-stone-500">USD</span>
              </h3>
              <p className="text-[11px] text-stone-500">
                Includes +$4.10 extra Botanical Returns Bonus &bull; Auto-applies at checkout
              </p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-300">
            Active & Verified
          </span>
        </div>
      </div>

      {/* ── 2. SAVED CREDIT & DEBIT CARDS ── */}
      <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#DDD3C1] shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5DEC9]">
          <h3 className="font-serif text-lg font-bold text-[#1C2E1A] flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#12602F]" />
            <span>Saved Credit & Debit Cards ({cards.length})</span>
          </h3>
          <span className="text-[10px] font-mono font-bold text-stone-400 uppercase">
            Tokenized Storage
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`p-5 rounded-2xl border transition-all relative overflow-hidden flex flex-col justify-between space-y-4 ${card.isDefault
                  ? 'bg-linear-to-br from-[#1C2E1A] to-[#124423] text-white border-[#12602F] shadow-md ring-2 ring-[#12602F]/20'
                  : 'bg-linear-to-br from-[#FAF8F2] to-white text-[#1C2E1A] border-[#DDD3C1] hover:border-[#12602F]/50 shadow-2xs'
                }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-mono font-extrabold uppercase tracking-widest ${card.isDefault ? 'text-[#AFD971]' : 'text-[#8C6221]'
                  }`}>
                  {card.type.toUpperCase()}
                </span>
                {card.isDefault ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#AFD971] text-[#0B2E1C]">
                    Default Card
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSetDefaultCard(card.id)}
                    className="text-[10px] font-bold text-[#12602F] hover:underline cursor-pointer"
                  >
                    Set as Default
                  </button>
                )}
              </div>

              <div className="py-2">
                <span className={`font-mono text-base sm:text-lg font-extrabold tracking-widest block ${card.isDefault ? 'text-white' : 'text-[#1C2E1A]'
                  }`}>
                  {card.cardNumber}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-white/10">
                <div>
                  <span className={`text-[9px] uppercase tracking-wider block ${card.isDefault ? 'text-white/60' : 'text-stone-400'
                    }`}>
                    Cardholder
                  </span>
                  <span className="font-mono font-bold">{card.cardHolder}</span>
                </div>

                <div>
                  <span className={`text-[9px] uppercase tracking-wider block ${card.isDefault ? 'text-white/60' : 'text-stone-400'
                    }`}>
                    Expires
                  </span>
                  <span className="font-mono font-bold">{card.expiry}</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteCard(card.id)}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${card.isDefault
                      ? 'text-white/60 hover:text-rose-300 hover:bg-white/10'
                      : 'text-stone-400 hover:text-rose-600 hover:bg-rose-50'
                    }`}
                  title="Remove Card"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3. SAVED UPI HANDLES ── */}
      <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#DDD3C1] shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5DEC9]">
          <h3 className="font-serif text-lg font-bold text-[#1C2E1A] flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-[#12602F]" />
            <span>Saved UPI Virtual Payment IDs ({upis.length})</span>
          </h3>
          <span className="text-[10px] font-mono font-bold text-stone-400 uppercase">
            Instant Bank Reversal
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {upis.map((u) => (
            <div
              key={u.id}
              className="p-4 bg-[#FAF8F2] rounded-2xl border border-[#E5DEC9] flex items-center justify-between gap-3 shadow-2xs"
            >
              <div className="min-w-0">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#8C6221] block">
                  {u.provider}
                </span>
                <p className="font-mono text-xs font-bold text-[#1C2E1A] truncate mt-0.5">
                  {u.vpa}
                </p>
                {u.isDefault && (
                  <span className="text-[9px] font-bold text-[#12602F] bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 mt-1 inline-block">
                    Default for Refunds
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {!u.isDefault && (
                  <button
                    type="button"
                    onClick={() => handleSetDefaultUpi(u.id)}
                    className="text-[10px] font-bold text-[#12602F] hover:underline cursor-pointer"
                  >
                    Make Default
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteUpi(u.id)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                  title="Remove UPI"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 4. SECURITY & COMPLIANCE BADGES ── */}
      <div className="p-4 bg-white rounded-lg border border-[#DDD3C1] shadow-2xs flex flex-wrap items-center justify-between gap-4 text-xs text-stone-600">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#12602F]" />
          <span>PCI-DSS Level 1 Certified • Zero Card Number Storage</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-mono text-stone-400">
          <span>VISA SECURE</span>
          <span>•</span>
          <span>MASTERCARD ID CHECK</span>
          <span>•</span>
          <span>NPCI BHIM CERTIFIED</span>
        </div>
      </div>

      {/* ── MODAL: ADD PAYMENT METHOD ── */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="fixed inset-0 bg-[#162820]/60 backdrop-blur-xs transition-opacity animate-fade-in"
            onClick={() => setIsAddModalOpen(false)}
          />

          <div className="relative bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#DDD3C1] z-10 animate-scale-up space-y-4">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D8EFE3] text-[#0D3322] text-[10px] font-bold uppercase tracking-widest mb-1.5">
                <Lock className="w-3 h-3 text-[#12602F]" />
                <span>Vault Encryption</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1C2E1A]">
                Add Payment Method
              </h3>
            </div>

            {/* Switch Mode Tabs */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-[#FAF8F2] rounded-xl border border-[#DDD3C1]">
              <button
                type="button"
                onClick={() => setAddMode('card')}
                className={`py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${addMode === 'card'
                    ? 'bg-[#12602F] text-white shadow-xs'
                    : 'text-[#464D3F] hover:text-[#12602F]'
                  }`}
              >
                Credit / Debit Card
              </button>
              <button
                type="button"
                onClick={() => setAddMode('upi')}
                className={`py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${addMode === 'upi'
                    ? 'bg-[#12602F] text-white shadow-xs'
                    : 'text-[#464D3F] hover:text-[#12602F]'
                  }`}
              >
                UPI ID
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 pt-1">
              {addMode === 'card' ? (
                <>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={newCardNumber}
                      onChange={(e) => setNewCardNumber(e.target.value)}
                      placeholder="4532 8819 2840 4242"
                      maxLength={19}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 font-mono text-xs text-[#1C2E1A] bg-[#FAF8F2] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={newCardHolder}
                      onChange={(e) => setNewCardHolder(e.target.value)}
                      placeholder="ANANYA SHARMA"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs font-medium text-[#1C2E1A] bg-[#FAF8F2] outline-none uppercase"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={newCardExpiry}
                        onChange={(e) => setNewCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 font-mono text-xs text-[#1C2E1A] bg-[#FAF8F2] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                        CVV / CVC
                      </label>
                      <input
                        type="password"
                        value={newCardCvv}
                        onChange={(e) => setNewCardCvv(e.target.value)}
                        placeholder="•••"
                        maxLength={4}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 font-mono text-xs text-[#1C2E1A] bg-[#FAF8F2] outline-none"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    UPI Virtual ID (VPA)
                  </label>
                  <input
                    type="text"
                    value={newUpiId}
                    onChange={(e) => setNewUpiId(e.target.value)}
                    placeholder="username@okhdfcbank"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 font-mono text-xs text-[#1C2E1A] bg-[#FAF8F2] outline-none"
                  />
                  <p className="text-[10px] text-stone-400 mt-1">
                    Supports Google Pay, PhonePe, Paytm, BHIM, and bank UPI IDs.
                  </p>
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-1/3 py-2.5 rounded-xl border border-stone-200 text-stone-700 text-xs font-bold uppercase tracking-wider hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-xl bg-[#12602F] hover:bg-[#1B6A45] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
                >
                  Save to Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodsTab;
