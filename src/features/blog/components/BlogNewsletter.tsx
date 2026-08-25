import { useState } from 'react';
import { Leaf, Send, Check, Copy } from 'lucide-react';

export function BlogNewsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  const copyPromo = () => {
    navigator.clipboard.writeText('SANCTUARY10');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="bg-[#FAF9F5] rounded-3xl p-8 sm:p-12 border border-[#184433]/15 shadow-xs relative overflow-hidden text-neutral-900">
      {/* Subtle decorative background circles */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#184433]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#6F8C51]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-2xl mx-auto text-center relative z-10 space-y-4">
        
        {/* Badge */}
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#184433] bg-[#184433]/10 px-3.5 py-1 rounded-full border border-[#184433]/15">
          <Leaf className="w-3.5 h-3.5 text-[#6F8C51]" />
          <span>Bi-Weekly Botanical Intelligence</span>
        </span>

        {/* Title */}
        <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#184433] leading-tight">
          Subscribe to the <span className="italic font-light text-[#6F8C51]">Botanical Gazette</span>
        </h3>

        {/* Subtitle */}
        <p className="text-neutral-600 text-xs sm:text-sm font-light max-w-lg mx-auto leading-relaxed">
          Receive clinical breakthroughs on cellular lipid repair, exclusive early access to seasonal harvest batches, and <strong>10% off your next botanical regimen</strong>.
        </p>

        {submitted ? (
          <div className="bg-white border border-emerald-200 rounded-2xl p-6 shadow-sm max-w-md mx-auto space-y-2 animate-fade-in">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <Check className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-xl text-[#184433]">Welcome to the Gazette</h4>
            <p className="text-xs text-neutral-600 font-light">
              Here is your instant 10% welcome invitation code:
            </p>
            <div className="flex items-center justify-center gap-2 pt-1">
              <span className="font-mono text-sm font-bold bg-[#FAF9F5] text-[#184433] px-4 py-2 rounded-xl border border-[#184433]/20">
                SANCTUARY10
              </span>
              <button
                onClick={copyPromo}
                className="p-2 bg-[#184433]/10 hover:bg-[#184433]/20 rounded-xl text-[#184433] transition-colors cursor-pointer"
                title="Copy code"
              >
                {copiedCode ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto pt-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="w-full bg-white text-neutral-900 placeholder:text-neutral-400 text-xs sm:text-sm px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-[#184433] focus:ring-1 focus:ring-[#184433] transition-all shadow-xs"
            />
            <button
              type="submit"
              className="bg-[#184433] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl hover:bg-[#0F3822] transition-colors cursor-pointer shrink-0 shadow-md flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Subscribe</span>
            </button>
          </form>
        )}

        <p className="text-[10px] text-neutral-400 font-light">
          Zero spam. Unsubscribe anytime with 1 click.
        </p>

      </div>
    </div>
  );
}
