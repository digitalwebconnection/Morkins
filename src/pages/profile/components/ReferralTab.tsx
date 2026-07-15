import React from 'react';
import { Gift, Check, Copy } from 'lucide-react';

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
  return (
    <div className="bg-white/80 rounded-[32px] p-6 md:p-8 border border-brand-dark/10 shadow-sm backdrop-blur-xs space-y-6 animate-modal-content">
      <div>
        <h3 className="font-serif text-2xl font-bold text-brand-light">{t('profile_tab_referral')}</h3>
        <p className="text-[10px] text-brand-dark/55 uppercase tracking-widest mt-0.5">Spread organic luxury & earn skin rewards credits</p>
      </div>

      {/* VIP Foiled Gift Card Voucher */}
      <div className="bg-linear-to-tr from-[#134031] to-brand-light text-white rounded-[32px] p-6 md:p-8 text-center space-y-6 shadow-md relative overflow-hidden border border-brand-light/20">
        <div className="absolute right-0 bottom-0 translate-y-1/4 translate-x-1/4 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute left-0 top-0 -translate-y-1/4 -translate-x-1/4 w-36 h-36 bg-brand-accent/20 rounded-full blur-2xl" />

        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 border border-white/10 mb-1 backdrop-blur-sm shadow-inner">
          <Gift className="w-6 h-6 text-brand-accent" />
        </div>
        <div className="space-y-1.5">
          <h4 className="font-serif text-xl md:text-2xl font-bold tracking-wide">{t('ref_title')}</h4>
          <p className="text-xs text-white/80 font-light max-w-md mx-auto leading-relaxed">
            {t('ref_subtitle')}
          </p>
        </div>

        <div className="bg-white/10 border border-white/20 p-3.5 rounded-2xl max-w-sm mx-auto flex items-center justify-between gap-4 backdrop-blur-md shadow-inner">
          <span className="font-mono text-xs font-extrabold tracking-widest uppercase select-all text-brand-accent">
            {user.fullName ? `MORKINS-${user.fullName.split(' ')[0].toUpperCase()}-GLOW` : 'MORKINS-MEMBER-GLOW'}
          </span>
          <button 
            onClick={handleCopyReferral}
            className="bg-white text-brand-light hover:bg-brand-cream-dark px-4 py-1.5 rounded-full shrink-0 font-bold uppercase tracking-widest text-[9px] transition-all active:scale-95 cursor-pointer shadow-sm flex items-center space-x-1"
          >
            {copiedReferral ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-600" />
                <span className="text-green-600">{t('ref_copied')}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{t('ref_btn')}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Rewards Level Status */}
      <div className="p-5 bg-brand-cream-dark/20 border border-brand-dark/10 rounded-[28px] space-y-4">
        <h4 className="text-xs uppercase font-extrabold tracking-widest text-brand-light">{t('ref_successful')}</h4>
        <div className="grid grid-cols-2 gap-4 divide-x divide-brand-dark/10">
          <div className="px-2">
            <span className="text-brand-dark/50 text-[10px] uppercase font-bold tracking-wider block">{t('ref_successful')}</span>
            <strong className="text-brand-light font-serif text-xl font-bold block mt-1">2 Friends</strong>
          </div>
          <div className="px-4">
            <span className="text-brand-dark/50 text-[10px] uppercase font-bold tracking-wider block">{t('ref_balance')}</span>
            <strong className="text-brand-light font-serif text-xl font-bold block mt-1">$30.00 Credit</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
