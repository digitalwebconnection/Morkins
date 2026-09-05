import React, { useState } from 'react';
import {
  User, Mail, Phone, Edit3, ShieldCheck,
  Sparkles, Droplets, CheckCircle2, Lock, Key, Check, X
} from 'lucide-react';

interface DetailsTabProps {
  user: any;
  isEditingUser: boolean;
  setIsEditingUser: (val: boolean) => void;
  editName: string;
  setEditName: (val: string) => void;
  editPhone: string;
  setEditPhone: (val: string) => void;
  handleUpdateProfile: (e: React.FormEvent) => void;
  t: (key: string) => string;
}

export const DetailsTab: React.FC<DetailsTabProps> = ({
  user,
  isEditingUser,
  setIsEditingUser,
  editName,
  setEditName,
  editPhone,
  setEditPhone,
  handleUpdateProfile,
  t,
}) => {
  // Skin consultation states
  const [skinType, setSkinType] = useState(user.skinType || 'Combination / Sensitive');
  const [skinConcerns, setSkinConcerns] = useState<string[]>(
    user.skinConcerns || ['Hydration Glow', 'Barrier Protection', 'Anti-Aging']
  );
  const [isEditingSkin, setIsEditingSkin] = useState(false);
  const [savedSkinFeedback, setSavedSkinFeedback] = useState(false);

  // Password reset simulation state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passSuccess, setPassSuccess] = useState(false);

  const availableConcerns = [
    'Hydration Glow',
    'Barrier Protection',
    'Anti-Aging',
    'Pore Clarifying',
    'Calming & Redness',
    'Brightening & Dark Spots'
  ];

  const toggleConcern = (concern: string) => {
    if (skinConcerns.includes(concern)) {
      setSkinConcerns(skinConcerns.filter(c => c !== concern));
    } else {
      setSkinConcerns([...skinConcerns, concern]);
    }
  };

  const handleSaveSkinProfile = () => {
    const updated = { ...user, skinType, skinConcerns };
    localStorage.setItem('morkins_logged_in_user', JSON.stringify(updated));
    setIsEditingSkin(false);
    setSavedSkinFeedback(true);
    setTimeout(() => setSavedSkinFeedback(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in">

      {/* ── 1. Personal Credentials Card ── */}
      <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#DDD3C1]/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] relative overflow-hidden">
        {/* Subtle top shimmer */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#12602F] via-[#1F8242] to-[#C49746]" />

        <div className="flex flex-wrap justify-between items-center gap-4 pb-5 border-b border-[#E5DEC9]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-linear-to-r from-[#F4EFE6] to-[#EFE8D8] border border-[#C9B387]/50 text-[10px] font-bold uppercase tracking-widest text-[#8C6D34] mb-1">
              <span>✦</span>
              <span>Account Credentials</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#1C2E1A]">{t('profile_tab_info')}</h3>
            <p className="text-xs text-[#464D3F] mt-0.5">Your official Morkins patron identity and contact details</p>
          </div>

          {!isEditingUser ? (
            <button
              onClick={() => setIsEditingUser(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#FAF8F2] hover:bg-[#12602F] text-[#1C2E1A] hover:text-[#AFD971] border border-[#DDD3C1] hover:border-[#12602F] rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-2xs active:scale-95"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{t('profile_edit')}</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setIsEditingUser(false);
                setEditName(user.fullName || '');
                setEditPhone(user.phone || '');
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>{t('profile_cancel')}</span>
            </button>
          )}
        </div>

        {isEditingUser ? (
          <form onSubmit={handleUpdateProfile} className="mt-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[11px] uppercase font-bold tracking-wider text-[#1C2E1A] mb-1.5">
                  {t('profile_name_lbl')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#DDD3C1] focus:border-[#12602F] focus:ring-2 focus:ring-[#12602F]/15 outline-none text-xs text-[#1C2E1A] bg-[#FCFBF8] font-medium transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold tracking-wider text-[#1C2E1A] mb-1.5">
                  {t('profile_phone_lbl')}
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    placeholder="+1 (555) 0199"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#DDD3C1] focus:border-[#12602F] focus:ring-2 focus:ring-[#12602F]/15 outline-none text-xs text-[#1C2E1A] bg-[#FCFBF8] font-medium transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="bg-linear-to-r from-[#12602F] to-[#1B783E] hover:from-[#0E4F26] hover:to-[#176B37] text-[#AFD971] px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs active:scale-95 flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{t('profile_save')}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditingUser(false);
                  setEditName(user.fullName || '');
                  setEditPhone(user.phone || '');
                }}
                className="border border-[#DDD3C1] text-[#464D3F] hover:bg-[#F4F1E8] px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-all"
              >
                {t('profile_cancel')}
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {/* Full Name Card */}
            <div className="p-4 rounded-xl bg-linear-to-b from-[#FAF8F2] to-[#FCFBF8] border border-[#DDD3C1]/80 flex items-center gap-3.5 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-[#DDD3C1] text-[#12602F] shadow-2xs shrink-0">
                <User className="w-4.5 h-4.5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C6221] block">
                  {t('profile_name_lbl')}
                </span>
                <p className="text-xs font-bold text-[#1C2E1A] mt-0.5 truncate">
                  {user.fullName || 'Valued Patron'}
                </p>
              </div>
            </div>

            {/* Email Card */}
            <div className="p-4 rounded-xl bg-linear-to-b from-[#FAF8F2] to-[#FCFBF8] border border-[#DDD3C1]/80 flex items-center gap-3.5 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-[#DDD3C1] text-[#12602F] shadow-2xs shrink-0">
                <Mail className="w-4.5 h-4.5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C6221]">
                    {t('profile_email_lbl')}
                  </span>
                  <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-1.5 py-0.2 rounded">
                    Verified
                  </span>
                </div>
                <p className="text-xs font-bold text-[#1C2E1A] mt-0.5 truncate">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Phone Card */}
            <div className="p-4 rounded-xl bg-linear-to-b from-[#FAF8F2] to-[#FCFBF8] border border-[#DDD3C1]/80 flex items-center gap-3.5 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-[#DDD3C1] text-[#12602F] shadow-2xs shrink-0">
                <Phone className="w-4.5 h-4.5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C6221] block">
                  {t('profile_phone_lbl')}
                </span>
                <p className="text-xs font-bold text-[#1C2E1A] mt-0.5 truncate">
                  {user.phone || '+1 (555) 0199'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── 2. Personalized Skin Consultation Diagnostic Profile ── */}
      <div className="bg-linear-to-b from-[#FAF8F2] via-white to-[#FAF8F2] rounded-lg p-6 sm:p-8 border border-[#DDD3C1] shadow-[0_4px_24px_rgba(0,0,0,0.04)] relative">
        <div className="flex flex-wrap justify-between items-center gap-4 pb-5 border-b border-[#E5DEC9]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-[#12602F] shadow-2xs shrink-0">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-xl font-bold text-[#1C2E1A]">Botanical Skin Profile</h3>
                <span className="bg-[#12602F] text-[#AFD971] text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-2xs">
                  Clinical Matched
                </span>
              </div>
              <p className="text-xs text-[#464D3F] mt-0.5">
                Personalized dermatology parameters powering your tailored routine recommendations
              </p>
            </div>
          </div>

          {!isEditingSkin ? (
            <button
              onClick={() => setIsEditingSkin(true)}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-white hover:bg-[#12602F] text-[#1C2E1A] hover:text-[#AFD971] border border-[#DDD3C1] rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C49746]" />
              <span>Update Skin Profile</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveSkinProfile}
                className="flex items-center gap-1 px-3.5 py-1.5 bg-[#12602F] text-[#AFD971] rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save</span>
              </button>
              <button
                onClick={() => setIsEditingSkin(false)}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {savedSkinFeedback && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Skin profile successfully updated! Routine recommendations recalibrated.</span>
          </div>
        )}

        {isEditingSkin ? (
          <div className="mt-6 space-y-6 animate-fade-in">
            {/* Skin Type Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1C2E1A] mb-2">
                Select Your Skin Biology Type:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {['Normal / Balanced', 'Dry / Dehydrated', 'Combination / Sensitive', 'Oily / Blemish-Prone'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSkinType(type)}
                    className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${skinType === type
                        ? 'bg-[#1C331B] text-[#AFD971] border-[#1C331B] shadow-xs'
                        : 'bg-white text-[#464D3F] border-[#DDD3C1] hover:bg-[#FAF8F2]'
                      }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Skin Concerns */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1C2E1A] mb-2">
                Primary Focus & Targets (Select Multiple):
              </label>
              <div className="flex flex-wrap gap-2">
                {availableConcerns.map((concern) => {
                  const isSelected = skinConcerns.includes(concern);
                  return (
                    <button
                      key={concern}
                      type="button"
                      onClick={() => toggleConcern(concern)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border flex items-center gap-1.5 ${isSelected
                          ? 'bg-amber-50 text-[#8C6221] border-[#C49746] shadow-2xs font-bold'
                          : 'bg-white text-[#464D3F] border-[#DDD3C1] hover:bg-gray-50'
                        }`}
                    >
                      <span>{isSelected ? '✓' : '+'}</span>
                      <span>{concern}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
            <div className="bg-white p-4 rounded-xl border border-[#DDD3C1]/80 shadow-2xs">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C6221] block">
                Bio Skin Type
              </span>
              <h4 className="text-sm font-bold text-[#1C2E1A] mt-1 flex items-center gap-1.5">
                <span>🌿</span> {skinType}
              </h4>
              <p className="text-[11px] text-[#464D3F] font-light mt-1">
                Optimized for cold-pressed lipids and lightweight hyaluronic absorption.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#DDD3C1]/80 shadow-2xs md:col-span-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C6221] block mb-1.5">
                Primary Targets & Ritual Goals
              </span>
              <div className="flex flex-wrap gap-1.5">
                {skinConcerns.map((concern, idx) => (
                  <span
                    key={idx}
                    className="bg-amber-50 text-[#8C6221] border border-amber-200/80 px-2.5 py-1 rounded-lg text-xs font-semibold shadow-2xs flex items-center gap-1"
                  >
                    <span className="text-[#C49746]">✦</span>
                    <span>{concern}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── 3. VIP Security & Data Assurance ── */}
      <div className="bg-linear-to-r from-[#1C331B] to-[#2B4B27] text-white rounded-lg p-6 sm:p-7 shadow-md relative overflow-hidden border border-[#AFD971]/20">
        <div className="absolute right-0 bottom-0 translate-y-1/3 translate-x-1/3 w-64 h-64 bg-[#AFD971]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 backdrop-blur-sm shadow-inner text-[#AFD971]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-serif text-lg font-bold text-white">{t('profile_vip_title')}</h4>
                <span className="bg-[#AFD971] text-[#1C331B] text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full">
                  Protected
                </span>
              </div>
              <p className="text-xs text-white/80 font-light mt-1 max-w-xl leading-relaxed">
                256-Bit Military Grade SSL Encryption active. Your personal formulation preferences, billing data, and skincare analytics are shielded under ISO-27001 data governance.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setShowPasswordModal(true);
              setPassSuccess(false);
            }}
            className="px-4 py-2 bg-white/15 hover:bg-white text-white hover:text-[#1C331B] border border-white/25 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shrink-0 shadow-xs active:scale-95 flex items-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Update Password</span>
          </button>
        </div>
      </div>

      {/* Password Update Modal Simulation */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full border border-[#DDD3C1] shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#1C331B] flex items-center justify-center border border-emerald-200">
                  <Key className="w-4.5 h-4.5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C2E1A]">Update Account Password</h3>
              </div>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {passSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-xl">
                  ✓
                </div>
                <h4 className="font-serif text-base font-bold text-[#1C2E1A]">Password Successfully Updated!</h4>
                <p className="text-xs text-[#464D3F]">Your patron credentials have been securely refreshed.</p>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="mt-4 px-6 py-2 bg-[#1C331B] text-[#AFD971] rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setPassSuccess(true);
                }}
                className="mt-5 space-y-4"
              >
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#1C2E1A] mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 focus:border-[#4E7A52] text-xs outline-none bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#1C2E1A] mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    placeholder="Minimum 8 characters"
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 focus:border-[#4E7A52] text-xs outline-none bg-gray-50"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="px-4 py-2 border border-gray-200 text-xs font-semibold rounded-xl hover:bg-gray-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#1C331B] text-[#AFD971] text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs cursor-pointer hover:bg-[#254424]"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
