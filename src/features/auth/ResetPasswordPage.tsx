import { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { KeyRound, Lock, CheckCircle2, AlertCircle, ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react';
import { resetPassword } from '../../lib/api/auth';
import { useAuth } from '../../hooks';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const tokenFromUrl = searchParams.get('token') || '';

  const [token, setToken] = useState(tokenFromUrl);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();
  const { openAuthModal } = useAuth();

  // Password strength check
  const passwordCriteria = [
    { label: 'At least 8 characters', valid: newPassword.length >= 8 },
    { label: 'Contains a number (0-9)', valid: /\d/.test(newPassword) },
    { label: 'Contains a letter (a-z / A-Z)', valid: /[a-zA-Z]/.test(newPassword) },
    { label: 'Contains a special character (!@#$%^&*)', valid: /[^A-Za-z0-9]/.test(newPassword) },
  ];
  const passedCriteriaCount = passwordCriteria.filter((c) => c.valid).length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!token.trim()) {
      setErrorMessage('Please provide a valid recovery token.');
      return;
    }

    if (newPassword.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await resetPassword(token, newPassword);
      if (response.success) {
        setIsSuccess(true);
      } else {
        setErrorMessage(response.message || 'Failed to reset password.');
      }
    } catch {
      setErrorMessage('Network error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinish = () => {
    navigate('/');
    openAuthModal();
  };

  return (
    <div className="min-h-screen bg-[#FAFBF9] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 border border-[#13442C]/15 shadow-xl">
        {/* Header Icon */}
        <div className="w-14 h-14 rounded-2xl bg-[#D8EFE3] text-[#13442C] flex items-center justify-center mb-5 shadow-2xs">
          <KeyRound className="w-7 h-7" />
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#162820] mb-2">
          Create New Password
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mb-6 leading-relaxed">
          Choose a secure, complex password to protect your Morkins clinical account & purchase history.
        </p>

        {errorMessage && (
          <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {isSuccess ? (
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#D8EFE3] text-[#13442C] flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-8 h-8 text-[#1B6A45]" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#162820]">
              Password Updated Successfully!
            </h3>
            <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
              Your new password is now active. You can sign in immediately with your updated credentials.
            </p>
            <button
              type="button"
              onClick={handleFinish}
              className="w-full py-3.5 rounded-xl bg-[#13442C] hover:bg-[#1B6A45] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs mt-4"
            >
              <span>Sign In with New Password</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Token field (if missing from query) */}
            {!tokenFromUrl && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Recovery Token
                </label>
                <input
                  type="text"
                  required
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Paste your reset token (rst_...)"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#13442C] focus:ring-2 focus:ring-[#13442C]/15 text-sm text-[#162820] bg-stone-50/50 outline-none font-mono"
                />
              </div>
            )}

            {/* New Password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-stone-200 focus:border-[#13442C] focus:ring-2 focus:ring-[#13442C]/15 text-sm text-[#162820] bg-stone-50/50 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-600 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:border-[#13442C] focus:ring-2 focus:ring-[#13442C]/15 text-sm text-[#162820] bg-stone-50/50 outline-none"
                />
              </div>
            </div>

            {/* Password Strength Meter */}
            <div className="p-3.5 bg-[#FAFBF9] rounded-xl border border-stone-200/80 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-stone-600">
                <span>Password Strength:</span>
                <span
                  className={
                    passedCriteriaCount <= 1
                      ? 'text-rose-600'
                      : passedCriteriaCount <= 3
                      ? 'text-amber-600'
                      : 'text-[#1B6A45]'
                  }
                >
                  {passedCriteriaCount <= 1
                    ? 'Weak'
                    : passedCriteriaCount <= 3
                    ? 'Good'
                    : 'Strong'}
                </span>
              </div>
              <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden flex gap-1">
                <div
                  className={`h-full flex-1 transition-colors ${
                    passedCriteriaCount >= 1 ? 'bg-amber-500' : 'bg-transparent'
                  }`}
                />
                <div
                  className={`h-full flex-1 transition-colors ${
                    passedCriteriaCount >= 2 ? 'bg-amber-500' : 'bg-transparent'
                  }`}
                />
                <div
                  className={`h-full flex-1 transition-colors ${
                    passedCriteriaCount >= 3 ? 'bg-[#1B6A45]' : 'bg-transparent'
                  }`}
                />
                <div
                  className={`h-full flex-1 transition-colors ${
                    passedCriteriaCount >= 4 ? 'bg-[#13442C]' : 'bg-transparent'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-1 pt-1 text-[10px] text-stone-500">
                {passwordCriteria.map((c) => (
                  <div key={c.label} className="flex items-center gap-1">
                    <span className={c.valid ? 'text-[#1B6A45] font-bold' : 'text-stone-300'}>
                      {c.valid ? '✓' : '•'}
                    </span>
                    <span className={c.valid ? 'text-[#162820]' : ''}>{c.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-[#13442C] hover:bg-[#1B6A45] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Updating Password...</span>
                </>
              ) : (
                <>
                  <span>Save New Password</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        <div className="mt-6 pt-4 border-t border-stone-100 text-center">
          <Link
            to="/"
            className="text-xs font-bold text-[#13442C] hover:underline"
          >
            ← Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
