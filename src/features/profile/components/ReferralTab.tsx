import React, { useState } from 'react';
import { 
  Gift, Check, Copy, Share2, Award, 
  Users, DollarSign, MessageCircle, Mail 
} from 'lucide-react';

interface ReferralTabProps {
  user: any;
  copiedReferral: boolean;
  handleCopyReferral: () => void;
  t: (key: string) => string;
}

export const ReferralTab: React.FC<ReferralTabProps> = ({
  user,
  copiedReferral,
  handleCopyReferral,
  t,
}) => {
  const [copiedCodeOnly, setCopiedCodeOnly] = useState(false);

  const referralCode = user.fullName
    ? `MORKINS-${user.fullName.split(' ')[0].toUpperCase()}-GLOW`
    : 'MORKINS-MEMBER-GLOW';

  const referralUrl = `${window.location.origin}/?ref=${referralCode.toLowerCase()}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedCodeOnly(true);
    setTimeout(() => setCopiedCodeOnly(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Experience Morkins luxury clinical botanical skincare! Use my VIP patron invitation code "${referralCode}" for $15 OFF your first order: ${referralUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleShareEmail = () => {
    const subject = encodeURIComponent(`An exclusive Morkins Skincare invitation for you`);
    const body = encodeURIComponent(
      `Hello,\n\nI thought you'd love Morkins botanical skincare. Use my VIP invitation code "${referralCode}" to receive $15 off your first order:\n\n${referralUrl}\n\nEnjoy radiant skin!`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* ── Section Header ── */}
      <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#DDD3C1]/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#12602F] via-[#1F8242] to-[#C49746]" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E5DEC9]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-linear-to-r from-[#F4EFE6] to-[#EFE8D8] border border-[#C9B387]/50 text-[10px] font-bold uppercase tracking-widest text-[#8C6D34] mb-1">
              <span>✦</span>
              <span>VIP Patron Circle</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#1C2E1A]">{t('profile_tab_referral')}</h3>
            <p className="text-xs text-[#464D3F] mt-0.5">
              Gift $15 off clinical botanicals to your inner circle and earn $15 store credits automatically
            </p>
          </div>
        </div>

        {/* ── Luxury Gold/Emerald Foiled Gift Voucher Card ── */}
        <div className="mt-6 bg-linear-to-br from-[#12602F] via-[#1A6F37] to-[#0E4A24] text-white rounded-lg p-6 sm:p-10 text-center relative overflow-hidden border border-[#AFD971]/30 shadow-xl">
          {/* Ambient Glows */}
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-[#C49746]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-12 -top-12 w-64 h-64 bg-[#AFD971]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top Floating Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-4 shadow-inner">
            <Gift className="w-4 h-4 text-[#AFD971]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#AFD971]">
              Give $15 • Get $15 Credit
            </span>
          </div>

          <h4 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white max-w-lg mx-auto leading-snug">
            Share the Gift of Botanical Radiance
          </h4>

          <p className="text-xs sm:text-sm text-white/80 font-light max-w-lg mx-auto mt-2 leading-relaxed">
            When friends use your code on their first $50+ order, they receive an immediate $15 courtesy discount, and $15 store credit is deposited directly into your patron vault.
          </p>

          {/* Code Bar Container */}
          <div className="mt-8 bg-black/40 border border-white/25 rounded-lg p-2.5 sm:p-3 max-w-md mx-auto flex items-center justify-between gap-3 backdrop-blur-md shadow-2xl">
            <span className="font-mono text-xs sm:text-sm font-extrabold tracking-widest text-[#AFD971] pl-3 select-all">
              {referralCode}
            </span>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handleCopyCode}
                className="bg-white/15 hover:bg-white text-white hover:text-[#12602F] px-3.5 py-1.5 rounded-lg font-bold uppercase tracking-wider text-[10px] transition-all cursor-pointer shadow-xs active:scale-95 flex items-center gap-1"
              >
                {copiedCodeOnly ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Share Channels */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleCopyReferral}
              className="px-4 py-2 bg-white text-[#1C331B] hover:bg-[#FAF8F2] font-bold uppercase tracking-wider text-xs rounded-lg shadow-md transition-all cursor-pointer flex items-center gap-2 active:scale-95"
            >
              {copiedReferral ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Referral Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>Copy Full Link</span>
                </>
              )}
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="px-4 py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold uppercase tracking-wider text-xs rounded-lg shadow-md transition-all cursor-pointer flex items-center gap-2 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={handleShareEmail}
              className="px-4 py-2 bg-white/15 hover:bg-white text-white hover:text-[#1C331B] border border-white/30 font-bold uppercase tracking-wider text-xs rounded-lg transition-all cursor-pointer flex items-center gap-2 active:scale-95"
            >
              <Mail className="w-4 h-4" />
              <span>Email Invite</span>
            </button>
          </div>
        </div>

        {/* ── Referral Metrics & Rewards Balance ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          {/* Successful Referrals */}
          <div className="p-5 rounded-lg bg-[#FAF8F2] border border-[#DDD3C1] shadow-2xs">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-white border border-[#DDD3C1] flex items-center justify-center text-[#2D5A32] shadow-2xs">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C6221]">
                  Invited Patrons
                </span>
                <h4 className="font-serif text-xl font-bold text-[#1C2E1A]">2 Friends Joined</h4>
              </div>
            </div>
            <p className="text-[11px] text-[#464D3F] font-light">
              Both friends completed their initial clinical skincare ritual orders.
            </p>
          </div>

          {/* Credits Balance */}
          <div className="p-5 rounded-lg bg-[#FAF8F2] border border-[#DDD3C1] shadow-2xs">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-white border border-[#DDD3C1] flex items-center justify-center text-[#8C6221] shadow-2xs">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C6221]">
                  Available Store Credits
                </span>
                <h4 className="font-serif text-xl font-bold text-[#1C331B]">$30.00 Credit</h4>
              </div>
            </div>
            <p className="text-[11px] text-[#464D3F] font-light">
              Automatically applied at checkout on any recurring or new order.
            </p>
          </div>

          {/* Next Milestone */}
          <div className="p-5 rounded-lg bg-[#FAF8F2] border border-[#DDD3C1] shadow-2xs">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-white border border-[#DDD3C1] flex items-center justify-center text-[#C49746] shadow-2xs">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C6221]">
                  Next Milestone Tier
                </span>
                <h4 className="font-serif text-xl font-bold text-[#1C2E1A]">1 More for Diamond</h4>
              </div>
            </div>
            <p className="text-[11px] text-[#464D3F] font-light">
              Unlock complementary bespoke 30ml facial elixir at 3 referrals.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
