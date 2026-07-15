import React from 'react';

interface SettingsTabProps {
  language: string;
  setLanguage: (lang: any) => void;
  t: (key: string) => string;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  language,
  setLanguage,
  t,
}) => {
  return (
    <div className="bg-white/80 rounded-[32px] p-6 md:p-8 border border-brand-dark/10 shadow-sm backdrop-blur-xs space-y-6 animate-modal-content">
      <div>
        <h3 className="font-serif text-2xl font-bold text-brand-light">{t('profile_tab_prefs')}</h3>
        <p className="text-[10px] text-brand-dark/55 uppercase tracking-widest mt-0.5">Customize your localization and routine notification options</p>
      </div>

      <div className="space-y-6 max-w-sm">
        <div>
          <label className="block text-[9px] uppercase font-bold tracking-widest text-brand-light mb-2">{t('pref_language')}</label>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value as any)}
            className="w-full px-4 py-3 rounded-2xl border border-brand-dark/15 focus:border-brand-light focus:outline-none bg-white text-xs text-brand-light shadow-3xs cursor-pointer"
          >
            <option value="en">🇺🇸 English</option>
            <option value="hi">🇮🇳 हिन्दी (Hindi)</option>
            <option value="gu">🇮🇳 ગુજરાતી (Gujarati)</option>
          </select>
        </div>

        <div className="border-t border-brand-dark/5 pt-5 space-y-3.5">
          <h4 className="text-[10px] uppercase font-extrabold tracking-widest text-brand-light">Email Communications</h4>
          
          <label className="flex items-center space-x-3 text-xs text-brand-dark/85 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded text-brand-light focus:ring-brand-light/35 border-brand-dark/25 w-4.5 h-4.5 cursor-pointer" />
            <span className="font-medium">{t('pref_sub_drop')}</span>
          </label>
          
          <label className="flex items-center space-x-3 text-xs text-brand-dark/85 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded text-brand-light focus:ring-brand-light/35 border-brand-dark/25 w-4.5 h-4.5 cursor-pointer" />
            <span className="font-medium">{t('pref_sub_routine')}</span>
          </label>
        </div>
      </div>
    </div>
  );
};
