import React, { useState, useEffect, useRef } from 'react';
import { 
  User, Mail, Phone, Lock, ShieldCheck, 
  ArrowRight, KeyRound, CheckCircle2, 
  AlertCircle, X, ChevronDown, ArrowLeft, RefreshCw
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

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

interface AuthDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthDrawer({ isOpen, onClose }: AuthDrawerProps) {
  const { language, setLanguage, t } = useLanguage();

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

  // Reset states when opening/closing
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
    <div className="fixed inset-0 z-50 overflow-hidden font-sans" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        {/* Backdrop overlay */}
        <div className="absolute inset-0 bg-brand-dark/40 backdrop-blur-xs transition-opacity animate-fade-in" onClick={onClose} />

        {/* Slide-over panel */}
        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div className="pointer-events-auto w-screen max-w-md transform transition-transform duration-500 animate-slide-in-right">
            <div className="flex h-full flex-col bg-brand-cream shadow-2xl border-l border-brand-dark/10 text-brand-dark relative">
              
              {/* Toast Notification Container */}
              {activeToast && (
                <div className="absolute top-4 left-4 right-4 z-50 bg-white rounded-xl shadow-lg border border-brand-dark/15 p-3 flex items-start space-x-3 transition-all duration-300">
                  {activeToast.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-brand-light shrink-0 mt-0.5" />
                  ) : activeToast.type === 'error' ? (
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  ) : (
                    <KeyRound className="w-5 h-5 text-brand-light/80 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-neutral-700 font-medium">{activeToast.message}</p>
                    {activeToast.code && (
                      <div className="mt-1.5 bg-brand-cream-dark px-2.5 py-1 rounded-md border border-brand-dark/10 flex justify-between items-center">
                        <span className="text-[10px] font-mono font-bold tracking-wider text-brand-light">OTP Code: {activeToast.code}</span>
                        <span className="text-[8px] uppercase tracking-widest text-brand-light/75 font-bold px-1 py-0.5 bg-brand-light/10 rounded">Test Shortcut</span>
                      </div>
                    )}
                  </div>
                  <button onClick={() => setActiveToast(null)} className="text-neutral-400 hover:text-brand-dark shrink-0">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Form Loader overlay */}
              {loading && (
                <div className="absolute inset-0 bg-brand-cream/90 backdrop-blur-xs flex flex-col items-center justify-center z-40">
                  <RefreshCw className="w-8 h-8 text-brand-light animate-spin" />
                  <p className="text-[10px] font-bold tracking-widest uppercase text-brand-light mt-4">{t('auth_processing')}</p>
                </div>
              )}

              {/* Header block */}
              <div className="py-5 px-6 border-b border-brand-dark/10 flex items-center justify-between">
                <div>
                  <span className="font-serif text-2xl font-bold tracking-widest text-brand-light">MORKINS</span>
                  <p className="text-[8px] tracking-widest uppercase font-semibold text-brand-dark/60 mt-0.5">{t('auth_portal')}</p>
                </div>
                <div className="flex items-center gap-3">
                  {/* Language Selector Dropdown */}
                  <div className="relative">
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value as any)}
                      className="bg-transparent text-xs font-semibold uppercase tracking-wider text-brand-light hover:text-brand-light/80 border border-brand-dark/20 rounded-md py-1 px-2 focus:outline-none cursor-pointer"
                    >
                      <option value="en" className="text-black bg-white">EN</option>
                      <option value="hi" className="text-black bg-white">हिन्दी</option>
                      <option value="gu" className="text-black bg-white">ગુજરાતી</option>
                    </select>
                  </div>
                  <button type="button" className="p-2 text-brand-dark/60 hover:text-brand-dark cursor-pointer" onClick={onClose}>
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 overflow-y-auto py-6 px-6">
                
                {/* Mode toggle back buttons */}
                {['forgot', 'otp', 'reset-password'].includes(mode) && (
                  <button
                    onClick={() => {
                      if (mode === 'otp') {
                        setMode(otpPurpose === 'signup' ? 'signup' : 'login');
                      } else {
                        setMode('login');
                      }
                    }}
                    className="flex items-center text-[10px] font-bold text-brand-light/80 hover:text-brand-light uppercase tracking-widest mb-6 group"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 mr-1 transition-transform group-hover:-translate-x-0.5" />
                    {t('auth_back')}
                  </button>
                )}

                {/* Tabs selection: Only visible on Login & Signup modes */}
                {['login', 'signup'].includes(mode) && (
                  <div className="flex border-b border-brand-dark/15 mb-6">
                    <button
                      onClick={() => setMode('login')}
                      className={`flex-1 pb-3 text-xs uppercase tracking-wider font-bold text-center border-b-2 transition-all cursor-pointer ${
                        mode === 'login' 
                          ? 'border-brand-light text-brand-light font-extrabold' 
                          : 'border-transparent text-brand-dark/55 hover:text-brand-dark'
                      }`}
                    >
                      {t('auth_drawer_login')}
                    </button>
                    <button
                      onClick={() => setMode('signup')}
                      className={`flex-1 pb-3 text-xs uppercase tracking-wider font-bold text-center border-b-2 transition-all cursor-pointer ${
                        mode === 'signup' 
                          ? 'border-brand-light text-brand-light font-extrabold' 
                          : 'border-transparent text-brand-dark/55 hover:text-brand-dark'
                      }`}
                    >
                      {t('auth_drawer_signup')}
                    </button>
                  </div>
                )}

                {/* MODE: LOGIN */}
                {mode === 'login' && (
                  <div className="space-y-5">
                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                      <div>
                        <label className="block text-[9px] uppercase font-bold tracking-wider text-brand-light mb-1">{t('auth_drawer_email')}</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-dark/40" />
                          <input 
                            type="email" 
                            required 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-brand-dark/20 focus:border-brand-light focus:outline-none bg-white text-sm text-brand-light placeholder-brand-dark/30 shadow-xs transition-colors"
                            placeholder={t('auth_email_placeholder')}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="block text-[9px] uppercase font-bold tracking-wider text-brand-light">{t('auth_drawer_password')}</label>
                          <button 
                            type="button"
                            onClick={() => setMode('forgot')}
                            className="text-[9px] font-bold uppercase tracking-wider text-brand-light/75 hover:text-brand-light hover:underline cursor-pointer"
                          >
                            {t('auth_drawer_forgot')}
                          </button>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-dark/40" />
                          <input 
                            type="password" 
                            required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-brand-dark/20 focus:border-brand-light focus:outline-none bg-white text-sm text-brand-light placeholder-brand-dark/30 shadow-xs transition-colors"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>

                      <button 
                        type="submit"
                        className="w-full bg-brand-light hover:bg-brand-light/90 text-white py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all mt-4 cursor-pointer flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                      >
                        <span>{t('auth_drawer_login')}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </form>

                    <div className="relative flex py-2 items-center">
                      <div className="grow border-t border-brand-dark/10"></div>
                      <span className="shrink mx-3 text-[9px] font-bold uppercase tracking-widest text-brand-dark/45">{t('auth_or_continue')}</span>
                      <div className="grow border-t border-brand-dark/10"></div>
                    </div>

                    <button 
                      onClick={handleGoogleLogin}
                      className="w-full border border-brand-dark/20 hover:border-brand-light hover:bg-brand-cream-dark/50 py-2.5 rounded-full flex items-center justify-center space-x-3 text-xs font-bold uppercase tracking-wider text-brand-light transition-all cursor-pointer shadow-xs"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                      </svg>
                      <span>{t('auth_drawer_google')}</span>
                    </button>
                  </div>
                )}

                {/* MODE: SIGNUP */}
                {mode === 'signup' && (
                  <form onSubmit={handleSignupSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[9px] uppercase font-bold tracking-wider text-brand-light mb-1">{t('auth_fullname')}</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-dark/40" />
                        <input 
                          type="text" 
                          required 
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-brand-dark/20 focus:border-brand-light focus:outline-none bg-white text-sm text-brand-light placeholder-brand-dark/30 shadow-xs transition-colors"
                          placeholder={t('auth_fullname_placeholder')}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase font-bold tracking-wider text-brand-light mb-1">{t('auth_drawer_email')}</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-dark/40" />
                        <input 
                          type="email" 
                          required 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-brand-dark/20 focus:border-brand-light focus:outline-none bg-white text-sm text-brand-light placeholder-brand-dark/30 shadow-xs transition-colors"
                          placeholder={t('auth_email_placeholder')}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <label className="block text-[9px] uppercase font-bold tracking-wider text-brand-light mb-1">{t('auth_country')}</label>
                        <button
                          type="button"
                          onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                          className="w-full px-3 py-2.5 rounded-xl border border-brand-dark/20 bg-white text-xs text-brand-light flex justify-between items-center shadow-xs cursor-pointer focus:outline-none"
                        >
                          <span className="flex items-center space-x-1.5 min-w-0">
                            <span>{selectedCountry.flag}</span>
                            <span className="truncate">{selectedCountry.code}</span>
                          </span>
                          <ChevronDown className="w-3.5 h-3.5 text-brand-dark/65" />
                        </button>

                        {countryDropdownOpen && (
                          <div className="absolute left-0 right-0 mt-1 bg-white border border-brand-dark/15 rounded-xl shadow-2xl z-30 max-h-48 overflow-y-auto p-2">
                            <input
                              type="text"
                              value={countrySearch}
                              onChange={(e) => setCountrySearch(e.target.value)}
                              placeholder="Search..."
                              className="w-full px-2 py-1 mb-1.5 border border-brand-dark/10 rounded-lg text-xs focus:outline-none bg-brand-cream-dark/30 text-brand-light"
                            />
                            {filteredCountries.map((c) => (
                              <button
                                key={c.code}
                                type="button"
                                onClick={() => {
                                  setSelectedCountry(c);
                                  setCountryDropdownOpen(false);
                                }}
                                className="w-full text-left px-2 py-1 rounded text-xs hover:bg-brand-cream-dark flex items-center space-x-2 text-brand-light font-medium"
                              >
                                <span>{c.flag}</span>
                                <span className="grow truncate">{c.name}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-[9px] uppercase font-bold tracking-wider text-brand-light mb-1">{t('auth_drawer_phone')}</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brand-dark/40" />
                          <input 
                            type="tel" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-brand-dark/20 focus:border-brand-light focus:outline-none bg-white text-sm text-brand-light placeholder-brand-dark/30 shadow-xs transition-colors"
                            placeholder={t('auth_phone_placeholder')}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase font-bold tracking-wider text-brand-light mb-1">{t('auth_drawer_password')}</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-dark/40" />
                        <input 
                          type="password" 
                          required 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-brand-dark/20 focus:border-brand-light focus:outline-none bg-white text-sm text-brand-light placeholder-brand-dark/30 shadow-xs transition-colors"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase font-bold tracking-wider text-brand-light mb-1">{t('auth_confirm_password')}</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-dark/40" />
                        <input 
                          type="password" 
                          required 
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-brand-dark/20 focus:border-brand-light focus:outline-none bg-white text-sm text-brand-light placeholder-brand-dark/30 shadow-xs transition-colors"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-brand-light hover:bg-brand-light/90 text-white py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all mt-4 cursor-pointer flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                    >
                      <span>{t('auth_create_account')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}

                {/* MODE: FORGOT PASSWORD */}
                {mode === 'forgot' && (
                  <form onSubmit={handleForgotSubmit} className="space-y-4 pt-2">
                    <p className="text-xs text-brand-dark font-light leading-relaxed mb-4">
                      {t('auth_forgot_desc')}
                    </p>
                    <div>
                      <label className="block text-[9px] uppercase font-bold tracking-wider text-brand-light mb-1">{t('auth_drawer_email')}</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-dark/40" />
                        <input 
                          type="email" 
                          required 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-brand-dark/20 focus:border-brand-light focus:outline-none bg-white text-sm text-brand-light placeholder-brand-dark/30 shadow-xs transition-colors"
                          placeholder={t('auth_email_placeholder')}
                        />
                      </div>
                    </div>
                    <button 
                      type="submit"
                      className="w-full bg-brand-light hover:bg-brand-light/90 text-white py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all mt-4 cursor-pointer"
                    >
                      {t('auth_drawer_send_otp')}
                    </button>
                  </form>
                )}

                {/* MODE: OTP VERIFICATION */}
                {mode === 'otp' && (
                  <form onSubmit={handleOtpVerify} className="space-y-5 pt-2">
                    <p className="text-xs text-brand-dark font-light leading-relaxed mb-4">
                      {t('auth_otp_desc')} <strong className="text-brand-light">{email}</strong>.
                    </p>
                    <div className="flex justify-between gap-1.5 max-w-sm mx-auto">
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
                          className="w-10 h-12 border border-brand-dark/20 focus:border-brand-light focus:ring-2 focus:ring-brand-light/10 focus:outline-none rounded-lg text-center font-bold text-base text-brand-light bg-white"
                        />
                      ))}
                    </div>

                    <div className="flex items-center justify-between gap-4 pt-3">
                      <button 
                        type="submit"
                        className="bg-brand-light hover:bg-brand-light/90 text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-md"
                      >
                        {t('auth_verify')}
                      </button>
                      <div className="text-xs">
                        {timer > 0 ? (
                          <span className="text-brand-dark/60">{t('auth_resend_in')} <strong className="text-brand-light">{timer}s</strong></span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => sendMockOtp(email, otpPurpose)}
                            className="text-brand-light font-bold hover:underline cursor-pointer uppercase tracking-wider text-[10px]"
                          >
                            {t('auth_resend_code')}
                          </button>
                        )}
                      </div>
                    </div>
                  </form>
                )}

                {/* MODE: RESET PASSWORD */}
                {mode === 'reset-password' && (
                  <form onSubmit={handleResetPasswordSubmit} className="space-y-4 pt-2">
                    <div>
                      <label className="block text-[9px] uppercase font-bold tracking-wider text-brand-light mb-1">{t('auth_new_password')}</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-dark/40" />
                        <input 
                          type="password" 
                          required 
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-brand-dark/20 focus:border-brand-light focus:outline-none bg-white text-sm text-brand-light placeholder-brand-dark/30 shadow-xs transition-colors"
                          placeholder="Min 6 characters"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase font-bold tracking-wider text-brand-light mb-1">{t('auth_confirm_new_password')}</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-dark/40" />
                        <input 
                          type="password" 
                          required 
                          value={confirmNewPassword}
                          onChange={(e) => setConfirmNewPassword(e.target.value)}
                          className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-brand-dark/20 focus:border-brand-light focus:outline-none bg-white text-sm text-brand-light placeholder-brand-dark/30 shadow-xs transition-colors"
                          placeholder="Confirm password"
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-brand-light hover:bg-brand-light/90 text-white py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all mt-4"
                    >
                      {t('auth_update_password')}
                    </button>
                  </form>
                )}

                {/* MODE: SUCCESS */}
                {mode === 'success' && (
                  <div className="text-center space-y-6 py-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-light/10 text-brand-light mb-1">
                      <ShieldCheck className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl font-medium text-brand-light">{t('auth_welcome')}</h3>
                      <p className="text-xs text-brand-dark/70 font-light mt-1">{t('auth_logged_in')}</p>
                    </div>

                    <div className="p-4 bg-brand-cream-dark/50 border border-brand-dark/10 rounded-2xl text-left space-y-2 text-xs text-brand-light">
                      <div className="flex justify-between">
                        <span className="text-brand-dark/70 font-light">{t('auth_name_label')}</span>
                        <span className="font-bold">{fullName || 'Google User'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-brand-dark/70 font-light">{t('auth_email_label')}</span>
                        <span className="font-bold truncate max-w-[180px]">{email}</span>
                      </div>
                      {phone && (
                        <div className="flex justify-between">
                          <span className="text-brand-dark/70 font-light">{t('auth_phone_label')}</span>
                          <span className="font-bold">{phone}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-brand-dark/70 font-light">{t('auth_country_label')}</span>
                        <span className="font-bold">{selectedCountry.name}</span>
                      </div>
                    </div>

                    <div className="space-y-3 pt-4">
                      <button
                        onClick={onClose}
                        className="w-full bg-brand-light hover:bg-brand-light/95 text-white py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-md"
                      >
                        {t('auth_continue_shop')}
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
                        className="w-full text-xs font-bold uppercase tracking-wider text-brand-dark/70 hover:text-brand-light hover:underline cursor-pointer py-2"
                      >
                        {t('auth_logout')}
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
