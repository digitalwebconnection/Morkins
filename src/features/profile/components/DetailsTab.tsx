import React, { useState } from 'react';
import {
  User, Mail, Phone, Edit3,
  Key, Check, X
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
  // Password reset simulation state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passSuccess, setPassSuccess] = useState(false);


  return (
    <div className="space-y-6 animate-fade-in">

      {/* ── 1. Personal Credentials Card ── */}
      <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#DDD3C1]/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] relative overflow-hidden">
        {/* Subtle top shimmer */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#12602F] via-[#1F8242] to-[#C49746]" />

        <div className="flex flex-wrap justify-between items-center gap-4 pb-5 border-b border-[#E5DEC9]">
          <div>
            
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
