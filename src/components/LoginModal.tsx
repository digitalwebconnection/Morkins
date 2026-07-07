import { useState } from 'react'

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [loginMode, setLoginMode] = useState<'signin' | 'signup'>('signin');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-dark/40 backdrop-blur-xs animate-fade-in" onClick={onClose} />
      <div className="bg-brand-cream w-full max-w-md rounded-2xl shadow-2xl p-8 border border-brand-dark/10 z-10 animate-scale-up text-brand-dark">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-serif text-2.5xl font-bold">
            {loginMode === 'signin' ? 'Sign In' : 'Create Account'}
          </h3>
          <button 
            onClick={onClose}
            className="text-brand-dark/60 hover:text-brand-dark cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onClose(); alert("Auth Success Simulation!"); }} className="space-y-4">
          {loginMode === 'signup' && (
            <div>
              <label className="block text-xs uppercase font-bold tracking-wider text-brand-dark/60 mb-1.5">Full Name</label>
              <input 
                type="text" 
                required 
                className="w-full px-4 py-2.5 rounded-lg border border-brand-dark/25 focus:border-brand-dark focus:outline-none bg-transparent text-sm text-brand-dark"
                placeholder="Enter your name"
              />
            </div>
          )}
          <div>
            <label className="block text-xs uppercase font-bold tracking-wider text-brand-dark/60 mb-1.5">Email Address</label>
            <input 
              type="email" 
              required 
              className="w-full px-4 py-2.5 rounded-lg border border-brand-dark/25 focus:border-brand-dark focus:outline-none bg-transparent text-sm text-brand-dark"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label className="block text-xs uppercase font-bold tracking-wider text-brand-dark/60 mb-1.5">Password</label>
            <input 
              type="password" 
              required 
              className="w-full px-4 py-2.5 rounded-lg border border-brand-dark/25 focus:border-brand-dark focus:outline-none bg-transparent text-sm text-brand-dark"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-brand-dark text-brand-cream hover:bg-brand-light py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-colors mt-6 cursor-pointer"
          >
            {loginMode === 'signin' ? 'Sign In' : 'Register'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-brand-dark/10 text-center">
          {loginMode === 'signin' ? (
            <p className="text-xs text-brand-dark/70">
              Don't have an account?{' '}
              <button 
                onClick={() => setLoginMode('signup')}
                className="font-bold underline hover:text-brand-dark text-brand-dark cursor-pointer"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p className="text-xs text-brand-dark/70">
              Already have an account?{' '}
              <button 
                onClick={() => setLoginMode('signin')}
                className="font-bold underline hover:text-brand-dark text-brand-dark cursor-pointer"
              >
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
