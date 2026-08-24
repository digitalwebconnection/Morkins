import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck, ArrowRight, KeyRound, CheckCircle2,
  AlertCircle, X, ChevronDown, ArrowLeft, RefreshCw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const COUNTRIES = [
  { code: 'US', name: 'United States', flag: '🇺🇸', dialCode: '+1' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', dialCode: '+44' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', dialCode: '+1' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', dialCode: '+61' },
  { code: 'IN', name: 'India', flag: '🇮🇳', dialCode: '+91' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', dialCode: '+49' },
  { code: 'FR', name: 'France', flag: '🇫🇷', dialCode: '+33' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', dialCode: '+971' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', dialCode: '+65' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', dialCode: '+81' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', dialCode: '+64' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', dialCode: '+27' },
];

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  code?: string;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const navigate = useNavigate();
  // Auth Modes: 'login' | 'signup' | 'forgot' | 'reset-password' | 'otp' | 'success'
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot' | 'reset-password' | 'otp' | 'success'>('login');
  const [otpPurpose, setOtpPurpose] = useState<'login' | 'signup' | 'forgot'>('login');

  // Input states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // OTP inputs
  const [otpVal, setOtpVal] = useState<string[]>(Array(6).fill(''));
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // UI control states
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [activeToast, setActiveToast] = useState<Toast | null>(null);
  const [currentOtpCode, setCurrentOtpCode] = useState('');

  // Reset/load states when modal is toggled
  useEffect(() => {
    if (isOpen) {
      const loggedInUser = localStorage.getItem('morkins_logged_in_user');
      if (loggedInUser) {
        try {
          const user = JSON.parse(loggedInUser);
          if (user && user.email) {
            setEmail(user.email);
            setFullName(user.fullName || '');
            setPhone(user.phone || '');
            const countryMatch = COUNTRIES.find(c => c.name.toLowerCase() === (user.country || '').toLowerCase());
            if (countryMatch) setSelectedCountry(countryMatch);
            setMode('success');
          }
        } catch (e) {
          // ignore
        }
      } else {
        setMode('login');
      }
    }
  }, [isOpen]);

  // Countdown timer for OTP
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (mode === 'otp' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [mode, timer]);

  const triggerToast = (message: string, type: 'success' | 'error' | 'info', code?: string) => {
    const id = Date.now().toString();
    setActiveToast({ id, message, type, code });
    setTimeout(() => {
      setActiveToast((prev) => (prev?.id === id ? null : prev));
    }, 6000);
  };

  const sendMockOtp = (userEmail: string, purpose: 'login' | 'signup' | 'forgot') => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setCurrentOtpCode(code);
    setOtpPurpose(purpose);
    setOtpVal(Array(6).fill(''));
    setTimer(60);
    setMode('otp');
    triggerToast(`🔑 OTP code sent to ${userEmail}.`, 'success', code);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      triggerToast('Please complete all login fields.', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const localUsers = JSON.parse(localStorage.getItem('morkins_simulated_users') || '[]');
      const userMatch = localUsers.find((u: any) => u.email.toLowerCase() === email.toLowerCase());

      if (userMatch && userMatch.password !== password) {
        triggerToast('Invalid email or password.', 'error');
        return;
      }

      if (!userMatch) {
        const newUser = {
          fullName: 'Demo Customer',
          email,
          phone: '',
          country: 'United States',
          password
        };
        localUsers.push(newUser);
        localStorage.setItem('morkins_simulated_users', JSON.stringify(localUsers));
      }

      sendMockOtp(email, 'login');
    }, 1000);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password || !confirmPassword) {
      triggerToast('Please fill out all required fields.', 'error');
      return;
    }

    if (password !== confirmPassword) {
      triggerToast('Passwords do not match.', 'error');
      return;
    }

    if (password.length < 6) {
      triggerToast('Password must be at least 6 characters.', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const localUsers = JSON.parse(localStorage.getItem('morkins_simulated_users') || '[]');
      const userExists = localUsers.some((u: any) => u.email.toLowerCase() === email.toLowerCase());

      if (userExists) {
        triggerToast('An account with this email already exists.', 'error');
        return;
      }

      sendMockOtp(email, 'signup');
    }, 1200);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      triggerToast('Please enter your email address.', 'error');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      sendMockOtp(email, 'forgot');
    }, 1000);
  };

  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otpVal.join('');

    if (enteredOtp.length < 6) {
      triggerToast('Please enter the full 6-digit code.', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (enteredOtp === currentOtpCode || enteredOtp === '123456') {
        if (otpPurpose === 'signup') {
          const localUsers = JSON.parse(localStorage.getItem('morkins_simulated_users') || '[]');
          const newUser = {
            fullName,
            email,
            phone,
            country: selectedCountry.name,
            password
          };
          localUsers.push(newUser);
          localStorage.setItem('morkins_simulated_users', JSON.stringify(localUsers));
          localStorage.setItem('morkins_logged_in_user', JSON.stringify(newUser));
          setMode('success');
          triggerToast('Welcome! Your account has been verified and created.', 'success');
        } else if (otpPurpose === 'login') {
          const localUsers = JSON.parse(localStorage.getItem('morkins_simulated_users') || '[]');
          const userObj = localUsers.find((u: any) => u.email.toLowerCase() === email.toLowerCase()) || {
            fullName: 'Guest User',
            email,
            phone: '',
            country: 'United States'
          };
          localStorage.setItem('morkins_logged_in_user', JSON.stringify(userObj));
          setMode('success');
          triggerToast('Logged in successfully.', 'success');
        } else if (otpPurpose === 'forgot') {
          setMode('reset-password');
          triggerToast('OTP verified. Set new password.', 'success');
        }
      } else {
        triggerToast('Incorrect OTP code.', 'error');
      }
    }, 1000);
  };

  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !confirmNewPassword) {
      triggerToast('Please fill out all fields.', 'error');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      triggerToast('Passwords do not match.', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const localUsers = JSON.parse(localStorage.getItem('morkins_simulated_users') || '[]');
      const userIndex = localUsers.findIndex((u: any) => u.email.toLowerCase() === email.toLowerCase());

      if (userIndex !== -1) {
        localUsers[userIndex].password = newPassword;
        localStorage.setItem('morkins_simulated_users', JSON.stringify(localUsers));
      }

      setMode('login');
      setPassword('');
      setConfirmPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      triggerToast('Password updated. You can now log in.', 'success');
    }, 1000);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    triggerToast('Connecting to Google accounts...', 'info');
    setTimeout(() => {
      setLoading(false);
      const googleEmail = 'google.user@gmail.com';
      setEmail(googleEmail);
      setFullName('Google User');
      sendMockOtp(googleEmail, 'login');
    }, 1200);
  };

  const handleOtpChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otpVal];
    newOtp[index] = value.slice(-1);
    setOtpVal(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otpVal[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const filteredCountries = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
    c.code.toLowerCase().includes(countrySearch.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto font-sans" role="dialog" aria-modal="true">
      {/* Backdrop overlay with luxury glass blur */}
      <div className="fixed inset-0 bg-[#09170C]/65 backdrop-blur-md transition-opacity animate-modal-backdrop" onClick={onClose} />

      {/* Modal popup box */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(18,96,47,0.3)] border border-[#DDD3C1] text-[#1C2E1A] overflow-hidden transform transition-all duration-300 animate-modal-content">
        
        {/* Top Gold & Emerald Gradient Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-[#12602F] via-[#C49746] to-[#AFD971]" />

        {/* Ambient Corner Glows */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#AFD971]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#12602F]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Toast Notification Container */}
        {activeToast && (
          <div className="absolute top-4 left-4 right-4 z-50 bg-white rounded-2xl shadow-xl border border-[#DDD3C1] p-3 flex items-start space-x-3 transition-all duration-300">
            {activeToast.type === 'success' ? (
              <CheckCircle2 className="w-4.5 h-4.5 text-[#12602F] shrink-0 mt-0.5" />
            ) : activeToast.type === 'error' ? (
              <AlertCircle className="w-4.5 h-4.5 text-rose-600 shrink-0 mt-0.5" />
            ) : (
              <KeyRound className="w-4.5 h-4.5 text-[#C49746] shrink-0 mt-0.5" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-[#1C2E1A] font-semibold">{activeToast.message}</p>
              {activeToast.code && (
                <div className="mt-1.5 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200/80 flex justify-between items-center">
                  <span className="text-[11px] font-mono font-bold tracking-wider text-[#8C6221]">Code: {activeToast.code}</span>
                  <span className="text-[9px] uppercase tracking-widest text-[#12602F] font-bold">1-Click Auto Fill</span>
                </div>
              )}
            </div>
            <button onClick={() => setActiveToast(null)} className="text-gray-400 hover:text-gray-700 shrink-0 cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Form Loader overlay */}
        {loading && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-xs flex flex-col items-center justify-center z-40">
            <RefreshCw className="w-8 h-8 text-[#12602F] animate-spin" />
            <p className="text-[10px] font-extrabold tracking-widest uppercase text-[#12602F] mt-3">Verifying Sanctuary Credentials...</p>
          </div>
        )}

        {/* Header Block */}
        <div className="pt-7 pb-4 px-6 sm:px-8 flex items-center justify-between relative z-10 border-b border-[#E5DEC9]/60">
          <div>
            <div className="flex items-center gap-1.5">
            
              <span className="font-serif text-2xl font-bold tracking-wider text-[#12602F]">MORKINS</span>
            </div>
            <p className="text-[9px] tracking-widest uppercase font-extrabold text-[#8C6221] mt-0.5">
              Patron Sanctuary Portal
            </p>
          </div>
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-[#FAF8F2] hover:bg-[#F4F1E8] border border-[#DDD3C1] flex items-center justify-center text-gray-500 hover:text-[#1C2E1A] transition-colors cursor-pointer shadow-2xs"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="max-h-[75vh] overflow-y-auto py-5 px-6 sm:px-8 relative z-10">

          {/* Back button */}
          {['forgot', 'otp', 'reset-password'].includes(mode) && (
            <button
              onClick={() => {
                if (mode === 'otp') {
                  setMode(otpPurpose === 'signup' ? 'signup' : 'login');
                } else {
                  setMode('login');
                }
              }}
              className="flex items-center text-[10px] font-extrabold text-[#12602F] hover:text-brand-forest uppercase tracking-wider mb-4 group cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1 transition-transform group-hover:-translate-x-0.5" />
              <span>Back to Login</span>
            </button>
          )}

          {/* Login / Signup tabs toggles */}
          {['login', 'signup'].includes(mode) && (
            <div className="p-1 bg-[#FAF8F2] rounded-2xl mb-5 w-full border border-[#DDD3C1] flex shadow-2xs">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  mode === 'login'
                    ? 'bg-linear-to-r from-[#12602F] to-[#1F7A3E] text-[#AFD971] shadow-xs'
                    : 'text-[#464D3F] hover:text-[#12602F]'
                }`}
              >
                Patron Login
              </button>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  mode === 'signup'
                    ? 'bg-linear-to-r from-[#12602F] to-[#1F7A3E] text-[#AFD971] shadow-xs'
                    : 'text-[#464D3F] hover:text-[#12602F]'
                }`}
              >
                Create Account
              </button>
            </div>
          )}

          {/* MODE: LOGIN */}
          {mode === 'login' && (
            <div className="space-y-4">
              <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-[#8C6221] mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DDD3C1] focus:border-[#12602F] focus:ring-2 focus:ring-[#12602F]/15 outline-none bg-[#FCFBF8] text-xs text-[#1C2E1A] font-medium transition-all placeholder:text-gray-400 shadow-2xs"
                    placeholder="patron@morkins.com"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-[#8C6221]">
                      Password <span className="text-rose-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-[10px] font-bold uppercase tracking-wider text-[#12602F] hover:underline cursor-pointer"
                    >
                      Forgot?
                    </button>
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DDD3C1] focus:border-[#12602F] focus:ring-2 focus:ring-[#12602F]/15 outline-none bg-[#FCFBF8] text-xs text-[#1C2E1A] font-medium transition-all placeholder:text-gray-400 shadow-2xs"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-linear-to-r from-[#12602F] via-[#1A7338] to-[#12602F] hover:from-[#0E4F26] hover:to-[#176B37] text-[#AFD971] py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-200 active:scale-98 mt-4 cursor-pointer flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <span>Sign In to Vault</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>

              <div className="relative flex py-1 items-center">
                <div className="grow border-t border-[#E5DEC9]"></div>
                <span className="shrink mx-3 text-[9px] font-extrabold uppercase tracking-widest text-[#8C6221]/70">
                  Or Connect With
                </span>
                <div className="grow border-t border-[#E5DEC9]"></div>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full bg-white hover:bg-[#FAF8F2] border border-[#DDD3C1] hover:border-[#12602F]/50 py-2.5 rounded-xl flex items-center justify-center gap-2.5 text-xs font-bold text-[#1C2E1A] transition-all cursor-pointer shadow-2xs active:scale-98"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>
          )}

          {/* MODE: SIGNUP */}
          {mode === 'signup' && (
            <form onSubmit={handleSignupSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-[#8C6221] mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DDD3C1] focus:border-[#12602F] focus:ring-2 focus:ring-[#12602F]/15 outline-none bg-[#FCFBF8] text-xs text-[#1C2E1A] font-medium transition-all placeholder:text-gray-400 shadow-2xs"
                  placeholder="e.g. Eleanor Vance"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-[#8C6221] mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DDD3C1] focus:border-[#12602F] focus:ring-2 focus:ring-[#12602F]/15 outline-none bg-[#FCFBF8] text-xs text-[#1C2E1A] font-medium transition-all placeholder:text-gray-400 shadow-2xs"
                  placeholder="eleanor@example.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-[#8C6221] mb-1">Country</label>
                  <button
                    type="button"
                    onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#DDD3C1] bg-[#FCFBF8] text-xs text-[#1C2E1A] font-medium flex justify-between items-center shadow-2xs cursor-pointer focus:outline-none"
                  >
                    <span className="flex items-center space-x-1.5 min-w-0">
                      <span>{selectedCountry.flag}</span>
                      <span className="truncate">{selectedCountry.code}</span>
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                  </button>

                  {countryDropdownOpen && (
                    <div className="absolute left-0 right-0 mt-1 bg-white border border-[#DDD3C1] rounded-xl shadow-xl z-30 max-h-40 overflow-y-auto p-1.5 animate-scale-up">
                      <input
                        type="text"
                        value={countrySearch}
                        onChange={(e) => setCountrySearch(e.target.value)}
                        placeholder="Search country..."
                        className="w-full px-2.5 py-1 mb-1 border border-[#DDD3C1] rounded-lg text-xs focus:outline-none bg-[#FAF8F2] text-[#1C2E1A]"
                      />
                      {filteredCountries.map((c) => (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => {
                            setSelectedCountry(c);
                            setCountryDropdownOpen(false);
                          }}
                          className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-[#FAF8F2] flex items-center space-x-2 text-[#1C2E1A] font-medium cursor-pointer"
                        >
                          <span>{c.flag}</span>
                          <span className="grow truncate">{c.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-[#8C6221] mb-1">Phone (Optional)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DDD3C1] focus:border-[#12602F] focus:ring-2 focus:ring-[#12602F]/15 outline-none bg-[#FCFBF8] text-xs text-[#1C2E1A] font-medium transition-all placeholder:text-gray-400 shadow-2xs"
                    placeholder="+1 555-0199"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-[#8C6221] mb-1">
                  Password <span className="text-rose-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DDD3C1] focus:border-[#12602F] focus:ring-2 focus:ring-[#12602F]/15 outline-none bg-[#FCFBF8] text-xs text-[#1C2E1A] font-medium transition-all placeholder:text-gray-400 shadow-2xs"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-[#8C6221] mb-1">
                  Confirm Password <span className="text-rose-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DDD3C1] focus:border-[#12602F] focus:ring-2 focus:ring-[#12602F]/15 outline-none bg-[#FCFBF8] text-xs text-[#1C2E1A] font-medium transition-all placeholder:text-gray-400 shadow-2xs"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-linear-to-r from-[#12602F] via-[#1A7338] to-[#12602F] hover:from-[#0E4F26] hover:to-[#176B37] text-[#AFD971] py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-200 active:scale-98 mt-4 cursor-pointer flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <span>Create Patron Account</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* MODE: FORGOT PASSWORD */}
          {mode === 'forgot' && (
            <form onSubmit={handleForgotSubmit} className="space-y-4 pt-1">
              <p className="text-xs text-[#464D3F] font-light leading-relaxed mb-4">
                Enter your email address and we'll dispatch a secure OTP code to reset your password.
              </p>
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-[#8C6221] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DDD3C1] focus:border-[#12602F] focus:ring-2 focus:ring-[#12602F]/15 outline-none bg-[#FCFBF8] text-xs text-[#1C2E1A] font-medium transition-all placeholder:text-gray-400 shadow-2xs"
                  placeholder="skin@morkins.com"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-linear-to-r from-[#12602F] to-[#1F7A3E] hover:from-[#0E4F26] hover:to-[#176B37] text-[#AFD971] py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all mt-4 cursor-pointer shadow-md active:scale-98"
              >
                Send Reset OTP
              </button>
            </form>
          )}

          {/* MODE: OTP VERIFICATION */}
          {mode === 'otp' && (
            <form onSubmit={handleOtpVerify} className="space-y-5 pt-1">
              <p className="text-xs text-[#464D3F] font-light leading-relaxed mb-4">
                Please enter the 6-digit OTP code sent to <strong className="text-[#12602F] font-bold">{email}</strong>.
              </p>
              <div className="flex justify-between gap-2 max-w-xs mx-auto">
                {Array(6).fill(0).map((_, i) => (
                  <input
                    key={i}
                    ref={(el) => { otpRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={otpVal[i]}
                    onChange={(e) => handleOtpChange(e.target.value, i)}
                    onKeyDown={(e) => handleOtpKeyDown(e, i)}
                    className="w-10 h-12 border border-[#DDD3C1] focus:border-[#12602F] focus:ring-2 focus:ring-[#12602F]/20 focus:scale-105 transition-all outline-none rounded-xl text-center font-serif text-lg font-bold text-[#12602F] bg-white shadow-2xs"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  className="bg-linear-to-r from-[#12602F] to-[#1F7A3E] hover:from-[#0E4F26] hover:to-[#176B37] text-[#AFD971] px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-md active:scale-98"
                >
                  Verify
                </button>
                <div className="text-xs">
                  {timer > 0 ? (
                    <span className="text-[11px] text-[#464D3F]">Resend in <strong className="text-[#12602F] font-bold">{timer}s</strong></span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => sendMockOtp(email, otpPurpose)}
                      className="text-[#12602F] font-bold hover:underline cursor-pointer uppercase tracking-wider text-[10px]"
                    >
                      Resend Code
                    </button>
                  )}
                </div>
              </div>
            </form>
          )}

          {/* MODE: RESET PASSWORD */}
          {mode === 'reset-password' && (
            <form onSubmit={handleResetPasswordSubmit} className="space-y-3.5 pt-1">
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-[#8C6221] mb-1">New Password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DDD3C1] focus:border-[#12602F] focus:ring-2 focus:ring-[#12602F]/15 outline-none bg-[#FCFBF8] text-xs text-[#1C2E1A] font-medium transition-all placeholder:text-gray-400 shadow-2xs"
                  placeholder="Min 6 characters"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-[#8C6221] mb-1">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DDD3C1] focus:border-[#12602F] focus:ring-2 focus:ring-[#12602F]/15 outline-none bg-[#FCFBF8] text-xs text-[#1C2E1A] font-medium transition-all placeholder:text-gray-400 shadow-2xs"
                  placeholder="Confirm password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-linear-to-r from-[#12602F] to-[#1F7A3E] hover:from-[#0E4F26] hover:to-[#176B37] text-[#AFD971] py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all mt-4 active:scale-98 shadow-md cursor-pointer"
              >
                Update Password
              </button>
            </form>
          )}

          {/* MODE: SUCCESS */}
          {mode === 'success' && (
            <div className="text-center space-y-5 py-4 animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-[#12602F] shadow-sm mb-1">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#1C2E1A]">Welcome Back</h3>
                <p className="text-xs text-[#464D3F] mt-0.5">Authenticated into your Morkins VIP Sanctuary Profile</p>
              </div>

              <div className="p-4 bg-linear-to-b from-[#FAF8F2] to-[#FCFBF8] border border-[#DDD3C1] rounded-2xl text-left space-y-2 text-xs text-[#1C2E1A] shadow-2xs">
                <div className="flex justify-between">
                  <span className="text-[#8C6221] font-bold">Patron Name:</span>
                  <span className="font-bold">{fullName || 'Google Patron'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C6221] font-bold">Account Vault:</span>
                  <span className="font-bold truncate max-w-[190px]">{email}</span>
                </div>
                {phone && (
                  <div className="flex justify-between">
                    <span className="text-[#8C6221] font-bold">Phone:</span>
                    <span className="font-bold">{phone}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#8C6221] font-bold">Country:</span>
                  <span className="font-bold">{selectedCountry.name}</span>
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                <button
                  onClick={onClose}
                  className="w-full bg-linear-to-r from-[#12602F] via-[#1A7338] to-[#12602F] hover:from-[#0E4F26] hover:to-[#176B37] text-[#AFD971] py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-md active:scale-98"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={() => {
                    onClose();
                    navigate('/profile');
                  }}
                  className="w-full border border-[#DDD3C1] hover:border-[#12602F] text-[#1C2E1A] py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-2xs active:scale-98 bg-white flex items-center justify-center space-x-1.5"
                >
                  <span>Go to VIP Profile Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem('morkins_logged_in_user');
                    setFullName('');
                    setEmail('');
                    setPhone('');
                    setPassword('');
                    setConfirmPassword('');
                    setNewPassword('');
                    setConfirmNewPassword('');
                    setOtpVal(Array(6).fill(''));
                    setMode('login');
                  }}
                  className="w-full text-[10px] font-bold uppercase tracking-wider text-rose-600 hover:text-rose-800 hover:underline cursor-pointer py-1.5"
                >
                  Log Out
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
