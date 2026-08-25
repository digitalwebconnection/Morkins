import { useState, useRef } from 'react';

export default function NewArrivalsNewsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 6000);
    }
  };

  return (
    <section className=" bg-white relative overflow-hidden">
      {/* Ambient shapes */}
      <div className="absolute top-10 left-1/4 w-100 h-100 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(196,172,128,0.05) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-10 w-75 h-75 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,240,230,0.4) 0%, transparent 70%)' }} />

      <div className=" relative z-10">
        <div
          className="p-10 sm:p-8 lg:p-8 overflow-hidden relative"
          style={{ background: 'linear-gradient(135deg, #FDFCFA 0%, #F8F5EF 30%, #F5F0E6 100%)' }}
        >
          {/* Corner decoration */}
          <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none">
            <svg viewBox="0 0 200 200" className="w-full h-full text-[#E8E3D8]" fill="none" stroke="currentColor" strokeWidth="0.5">
              <circle cx="200" cy="0" r="40" />
              <circle cx="200" cy="0" r="80" />
              <circle cx="200" cy="0" r="120" />
              <circle cx="200" cy="0" r="160" />
            </svg>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[#E0DAD0] mb-2"
              style={{ background: 'linear-gradient(135deg, white 0%, #FAF8F3 100%)' }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C4AC80] opacity-50" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C4AC80]" />
              </span>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8B7D65]">
                VIP Reservation List
              </span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.5rem] font-normal text-[#1A1A1A] leading-[1.15] tracking-[-0.01em] mb-4">
              Private Access to <br className="hidden sm:block" />
              <span className="text-[#184433] font-bold">Small-Batch </span>
              <span className="text-[#d69d2c] font-semibold italic">Drops</span>
            </h2>
            
            <p className="text-md text-[#111111]  leading-[1.8] max-w-4xl mx-auto mb-6">
              Be first in line for our seasonal formulation releases with 24-hour private laboratory access, complimentary shipping, and exclusive formulator notes on your first drop order.
            </p>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
              <div
                className="flex flex-col sm:flex-row gap-2.5  rounded-lg border transition-all duration-300"
                style={{
                  borderColor: isFocused ? '#C4AC80' : '#E0DAD0',
                  background: 'white',
                  boxShadow: isFocused
                    ? '0 8px 30px -10px rgba(196,172,128,0.2)'
                    : '0 2px 8px -4px rgba(0,0,0,0.04)',
                }}
              >
                <input
                  ref={inputRef}
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  required
                  className="flex-1 px-4 py-2.5 bg-transparent text-[13px] text-[#1A1A1A] placeholder-[#3a3937] outline-none"
                />
                <button
                  type="submit"
                  className="group px-7 py-2.5 bg-[#1A1A1A] hover:bg-[#333] text-white text-[11px] font-bold uppercase tracking-[0.15em] rounded-r-lg transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 shrink-0"
                >
                  <span>Get Private Access</span>
                  <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </form>

            {/* Success Message */}
            {subscribed && (
              <div className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#C4AC80]/30 bg-[#FAF8F3]"
                style={{
                  animation: 'fadeInUp 0.4s ease-out',
                }}>
                <svg className="w-4 h-4 text-[#C4AC80]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-[12px] font-semibold text-[#1A1A1A]">
                  You're on the VIP list. We'll notify you before public release.
                </span>
              </div>
            )}

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-4 text-xs font-semibold text-[#000000] uppercase tracking-[0.15em]">
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Secure & Private
              </span>
              <span>•</span>
              <span>No Spam Promise</span>
              <span>•</span>
              <span>Unsubscribe Anytime</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
