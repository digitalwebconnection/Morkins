import React from 'react';
import { User, Mail, Phone, Edit3, ShieldCheck } from 'lucide-react';

interface DetailsTabProps {
  user: any;
  isEditingUser: boolean;
  setIsEditingUser: (val: boolean) => void;
  editName: string;
  setEditName: (val: string) => void;
  editPhone: string;
  setEditPhone: (val: string) => void;
  handleUpdateProfile: (e: React.FormEvent) => void;
  t: (key: string) => string;
}

export const DetailsTab: React.FC<DetailsTabProps> = ({
  user,
  isEditingUser,
  setIsEditingUser,
  editName,
  setEditName,
  editPhone,
  setEditPhone,
  handleUpdateProfile,
  t,
}) => {
  return (
    <div className="bg-white/80 rounded-[32px] p-6 md:p-8 border border-brand-dark/10 shadow-sm backdrop-blur-xs space-y-8 animate-modal-content">
      <div className="flex justify-between items-center pb-4 border-b border-brand-dark/5">
        <div>
          <h3 className="font-serif text-2xl font-bold text-brand-light">{t('profile_tab_info')}</h3>
          <p className="text-[10px] text-brand-dark/55 uppercase tracking-widest mt-0.5">{t('profile_sub')}</p>
        </div>
        {!isEditingUser && (
          <button 
            onClick={() => setIsEditingUser(true)}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 border border-brand-dark/15 hover:border-brand-light rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-light hover:bg-brand-cream cursor-pointer transition-all active:scale-95"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{t('profile_edit')}</span>
          </button>
        )}
      </div>

      {isEditingUser ? (
        <form onSubmit={handleUpdateProfile} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[9px] uppercase font-bold tracking-widest text-brand-light mb-1.5">{t('profile_name_lbl')}</label>
              <input 
                type="text" 
                required 
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-brand-dark/15 focus:border-brand-light focus:ring-2 focus:ring-brand-light/10 outline-none text-xs text-brand-light bg-brand-cream/20 transition-all font-medium"
              />
            </div>
            <div>
              <label className="block text-[9px] uppercase font-bold tracking-widest text-brand-light mb-1.5">{t('profile_phone_lbl')}</label>
              <input 
                type="tel" 
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-brand-dark/15 focus:border-brand-light focus:ring-2 focus:ring-brand-light/10 outline-none text-xs text-brand-light bg-brand-cream/20 transition-all font-medium"
                placeholder="+1 (555) 0199"
              />
            </div>
          </div>

          <div className="flex space-x-3 pt-2">
            <button 
              type="submit"
              className="bg-brand-light hover:bg-brand-light/95 text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-sm active:scale-95"
            >
              {t('profile_save')}
            </button>
            <button 
              type="button"
              onClick={() => {
                setIsEditingUser(false);
                setEditName(user.fullName || '');
                setEditPhone(user.phone || '');
              }}
              className="border border-brand-dark/15 text-brand-light px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-cream-dark/50 cursor-pointer transition-all active:scale-95"
            >
              {t('profile_cancel')}
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: t('profile_name_lbl'), value: user.fullName || 'Not Provided', icon: User },
            { label: t('profile_email_lbl'), value: user.email, icon: Mail, truncate: true },
            { label: t('profile_phone_lbl'), value: user.phone || 'Not Available', icon: Phone }
          ].map((field, idx) => (
            <div key={idx} className="p-5 bg-brand-cream-dark/20 border border-brand-dark/5 rounded-[24px] flex items-center space-x-4 shadow-3xs">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-brand-dark/10 text-brand-light/65">
                <field.icon className="w-4.5 h-4.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[8px] uppercase tracking-wider text-brand-dark/50 font-bold">{field.label}</p>
                <p className={`text-xs font-bold text-brand-light mt-0.5 ${field.truncate ? 'truncate' : ''}`}>{field.value}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIP Member Box */}
      <div className="bg-linear-to-r from-brand-light/5 to-brand-accent/10 border border-brand-dark/10 p-5 rounded-[28px] flex items-start space-x-4 text-xs">
        <div className="w-10 h-10 rounded-xl bg-white border border-brand-dark/10 flex items-center justify-center shrink-0 text-brand-light">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="font-serif text-sm font-extrabold text-brand-light">{t('profile_vip_title')}</h4>
          <p className="font-light text-brand-dark/80 leading-relaxed">
            {t('profile_vip_desc')}
          </p>
        </div>
      </div>
    </div>
  );
};
