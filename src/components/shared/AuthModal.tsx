import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks';
import siteLogo from '../../assets/images/logo/logo.png';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setLoading(true);
    
    // Simulate simple perfect login that accepts anything
    setTimeout(() => {
      setLoading(false);
      login({
        id: 'patron-' + Date.now(),
        email: email,
        fullName: email.split('@')[0],
      });
      onClose();
      navigate('/profile');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1A10]/70 backdrop-blur-md animate-fade-in" onClick={onClose}>
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E5DEC9] relative">
          <div className="flex-1 flex justify-center">
            <img src={siteLogo} alt="Morkins Logo" className="h-8 object-contain" />
          </div>
          <button 
            onClick={onClose}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-100 text-stone-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#E5DEC9]">
          <div className="flex-1 py-4 text-center border-b-2 border-[#12602F] text-xs font-bold text-[#12602F] uppercase tracking-wider">
            Patron Login
          </div>
          <div className="flex-1 py-4 text-center text-xs font-bold text-stone-400 uppercase tracking-wider cursor-pointer hover:bg-stone-50 transition-colors">
            Create Account
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-bold text-rose-600 uppercase tracking-wider mb-2">Email Address *</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#EEF2F6] border-transparent rounded-lg text-sm focus:outline-none focus:bg-white focus:border-[#12602F] focus:ring-1 focus:ring-[#12602F] transition-all"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-rose-600 uppercase tracking-wider">Password *</label>
              <span className="text-[10px] font-bold text-[#12602F] uppercase cursor-pointer hover:underline">Forgot?</span>
            </div>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#EEF2F6] border-transparent rounded-lg text-sm focus:outline-none focus:bg-white focus:border-[#12602F] focus:ring-1 focus:ring-[#12602F] transition-all"
              required
            />
          </div>

          <button 
            type="submit"
            disabled={loading || !email || !password}
            className="w-full py-3.5 bg-[#12602F] hover:bg-[#1B6A45] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Sign In To Vault
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Social */}
        <div className="p-6 pt-0">
          <div className="relative flex items-center py-2 mb-4">
            <div className="flex-1 border-t border-[#E5DEC9]"></div>
            <span className="shrink-0 px-4 text-[10px] uppercase font-bold text-stone-400 bg-white tracking-wider">
              Or Connect With
            </span>
            <div className="flex-1 border-t border-[#E5DEC9]"></div>
          </div>

          <button 
            type="button"
            className="w-full py-3 bg-white border border-stone-200 hover:border-stone-300 text-stone-700 text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-3 shadow-xs"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4 grayscale opacity-70" />
            <span>Continue with Google</span>
          </button>
        </div>

      </div>
    </div>
  );
}
