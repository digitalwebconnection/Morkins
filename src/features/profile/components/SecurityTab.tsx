import React, { useState } from 'react';
import {
  ShieldCheck, Lock, Smartphone, Laptop, 
  Download, CheckCircle2, KeyRound, Eye, EyeOff, LogOut
} from 'lucide-react';
import type { User } from '../../../types';

interface SecurityTabProps {
  user: User;
  onLogout?: () => void;
  t?: (key: string) => string;
}

export const SecurityTab: React.FC<SecurityTabProps> = ({ user, onLogout }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [is2FaEnabled, setIs2FaEnabled] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: 'None', color: 'bg-stone-200' };
    if (pass.length < 6) return { score: 1, label: 'Weak', color: 'bg-rose-500' };
    if (pass.length < 10) return { score: 2, label: 'Medium', color: 'bg-amber-500' };
    return { score: 3, label: 'Strong Botanical Vault Grade', color: 'bg-[#12602F]' };
  };

  const strength = getPasswordStrength(newPassword);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match.');
      return;
    }
    showToast('Sanctuary password updated successfully.');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleDownloadData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(user, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `morkins_sanctuary_archive_${user.email}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Sanctuary account data downloaded.');
  };

  return (
    <div className="space-y-7 animate-fade-in text-[#1C2E1A]">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-[#12602F] text-white text-xs font-bold rounded-lg shadow-2xl border border-[#AFD971]/30 flex items-center gap-3 animate-slide-up">
          <CheckCircle2 className="w-4 h-4 text-[#AFD971] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── 1. HEADER BANNER ── */}
      <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#DDD3C1] shadow-md relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-[#12602F] via-[#C49746] to-[#AFD971]" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 border-b border-[#E5DEC9]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-linear-to-r from-[#D8EFE3] to-[#FAF8F2] border border-[#13442C]/20 text-[#0D3322] text-[10px] font-bold uppercase tracking-widest mb-2 shadow-2xs">
              <ShieldCheck className="w-3 h-3 text-[#12602F]" />
              <span>Bio-Metric & Cryptographic Security</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C2E1A]">
              Account Security & Privacy Vault
            </h2>
            <p className="text-xs sm:text-sm text-[#464D3F] mt-1 max-w-2xl leading-relaxed">
              Manage your master credential credentials, two-factor authentication, active login devices, and GDPR data rights.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#12602F] bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200">
            <Lock className="w-4 h-4" />
            <span>Vault Status: Protected</span>
          </div>
        </div>

        {/* ── 2. PASSWORD UPDATE FORM ── */}
        <div className="pt-6 space-y-4">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-[#12602F]" />
            <h3 className="font-serif text-base font-bold text-[#1C2E1A]">
              Change Sanctuary Password
            </h3>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-xl">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPass ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 font-mono text-xs text-[#1C2E1A] bg-[#FAF8F2] outline-none pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPass(!showCurrentPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPass ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 font-mono text-xs text-[#1C2E1A] bg-[#FAF8F2] outline-none pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                  >
                    {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 font-mono text-xs text-[#1C2E1A] bg-[#FAF8F2] outline-none"
                  required
                />
              </div>
            </div>

            {newPassword && (
              <div className="p-3 bg-[#FAF8F2] rounded-lg border border-[#DDD3C1] space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                  <span className="text-stone-500 uppercase">Entropy Strength:</span>
                  <span className="text-[#12602F]">{strength.label}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-stone-200 overflow-hidden">
                  <div
                    className={`h-full ${strength.color} transition-all duration-300`}
                    style={{ width: `${(strength.score / 3) * 100}%` }}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-[#12602F] hover:bg-[#1B6A45] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>

      {/* ── 3. TWO-FACTOR AUTHENTICATION (2FA) ── */}
      <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#DDD3C1] shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5DEC9]">
          <h3 className="font-serif text-lg font-bold text-[#1C2E1A] flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-[#12602F]" />
            <span>Two-Factor Authentication (2FA)</span>
          </h3>
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            is2FaEnabled ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'
          }`}>
            {is2FaEnabled ? 'Enabled' : 'Disabled'}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-[#FAF8F2] border border-[#E5DEC9]">
          <div>
            <h4 className="font-serif text-sm font-bold text-[#1C2E1A]">
              Authenticator App (TOTP Verification)
            </h4>
            <p className="text-xs text-[#464D3F] mt-0.5 leading-relaxed">
              Require a 6-digit one-time passcode from Google Authenticator or Apple Keychain upon login.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setIs2FaEnabled(!is2FaEnabled);
              showToast(!is2FaEnabled ? '2FA Enabled.' : '2FA Disabled.');
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-2xs ${
              is2FaEnabled
                ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                : 'bg-[#12602F] text-white hover:bg-[#1B6A45]'
            }`}
          >
            {is2FaEnabled ? 'Disable 2FA' : 'Enable 2FA'}
          </button>
        </div>
      </div>

      {/* ── 4. ACTIVE LOGIN SESSIONS ── */}
      <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#DDD3C1] shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5DEC9]">
          <h3 className="font-serif text-lg font-bold text-[#1C2E1A] flex items-center gap-2">
            <Laptop className="w-4 h-4 text-[#12602F]" />
            <span>Active Login Sessions (2 Devices)</span>
          </h3>

          <button
            type="button"
            onClick={() => showToast('All other sessions revoked.')}
            className="text-xs font-bold text-rose-700 hover:underline cursor-pointer"
          >
            Log Out Other Devices
          </button>
        </div>

        <div className="space-y-3">
          {/* Current device */}
          <div className="p-4 rounded-lg bg-[#FAF8F2] border border-[#12602F]/30 flex items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white border border-[#DDD3C1] flex items-center justify-center text-[#12602F]">
                <Laptop className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-[#1C2E1A]">
                    Windows PC &bull; Chrome Browser
                  </h4>
                  <span className="px-2 py-0.2 rounded-md bg-[#D8EFE3] text-[#0D3322] font-bold text-[9px] uppercase">
                    Current Device
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 font-mono mt-0.5">
                  IP: 49.37.19.82 &bull; Mumbai, India &bull; Active Now
                </p>
              </div>
            </div>
          </div>

          {/* Secondary device */}
          <div className="p-4 rounded-lg bg-[#FAF8F2] border border-[#E5DEC9] flex items-center justify-between gap-3 shadow-2xs opacity-80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white border border-[#DDD3C1] flex items-center justify-center text-stone-600">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1C2E1A]">
                  Apple iPhone 15 Pro &bull; Safari iOS
                </h4>
                <p className="text-[11px] text-stone-500 font-mono mt-0.5">
                  IP: 103.21.44.11 &bull; Bengaluru, India &bull; 2 Days Ago
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => showToast('Session revoked.')}
              className="text-xs font-bold text-stone-500 hover:text-rose-600 cursor-pointer"
            >
              Revoke
            </button>
          </div>
        </div>
      </div>

      {/* ── 5. DATA PRIVACY & DATA DOWNLOAD ── */}
      <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#DDD3C1] shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5DEC9]">
          <h3 className="font-serif text-lg font-bold text-[#1C2E1A] flex items-center gap-2">
            <Download className="w-4 h-4 text-[#8C6221]" />
            <span>GDPR Data Portability & Account Governance</span>
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-[#FAF8F2] border border-[#E5DEC9]">
          <div>
            <h4 className="font-serif text-xs sm:text-sm font-bold text-[#1C2E1A]">
              Download My Botanical Sanctuary Data
            </h4>
            <p className="text-xs text-[#464D3F] mt-0.5">
              Export your profile parameters, saved addresses, purchase history, and reviews into a secure JSON archive.
            </p>
          </div>

          <button
            type="button"
            onClick={handleDownloadData}
            className="px-4 py-2 rounded-lg bg-white hover:bg-[#FAF8F2] border border-[#DDD3C1] text-[#1C2E1A] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5 text-[#12602F]" />
            <span>Export Archive</span>
          </button>
        </div>
      </div>

      {/* ── 6. DANGER ZONE & SESSION TERMINATION ── */}
      <div className="bg-white rounded-lg p-6 sm:p-8 border border-rose-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-rose-100">
          <h3 className="font-serif text-lg font-bold text-rose-800 flex items-center gap-2">
            <LogOut className="w-4 h-4 text-rose-600" />
            <span>Sanctuary Session & Termination</span>
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-rose-50/60 border border-rose-200">
          <div>
            <h4 className="font-serif text-xs sm:text-sm font-bold text-rose-950">
              Log Out of Sanctuary
            </h4>
            <p className="text-xs text-rose-700/90 mt-0.5">
              Securely terminate your active session and sign out of your account on this device.
            </p>
          </div>

          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-xs whitespace-nowrap"
            >
              <LogOut className="w-3.5 h-3.5 text-white" />
              <span>Log Out Sanctuary</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;
