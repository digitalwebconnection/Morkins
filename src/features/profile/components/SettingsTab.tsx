import React, { useState } from 'react';
import { 
  Globe, Bell, Shield, Download, 
  CheckCircle2, Sparkles, MessageSquare, Mail 
} from 'lucide-react';

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
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [vipDrops, setVipDrops] = useState(true);
  const [replenishReminders, setReplenishReminders] = useState(true);
  
  const [savedSettingsNotice, setSavedSettingsNotice] = useState(false);
  const [exportedDataNotice, setExportedDataNotice] = useState(false);

  const handleToggle = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter(prev => !prev);
    setSavedSettingsNotice(true);
    setTimeout(() => setSavedSettingsNotice(false), 2000);
  };

  const handleExportData = () => {
    setExportedDataNotice(true);
    setTimeout(() => setExportedDataNotice(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* ── Section Header ── */}
      <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#DDD3C1]/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#1C331B] via-[#4E7A52] to-[#C49746]" />

        <div className="flex flex-wrap justify-between items-center gap-4 pb-5 border-b border-[#E5DEC9]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-linear-to-r from-[#F4EFE6] to-[#EFE8D8] border border-[#C9B387]/50 text-[10px] font-bold uppercase tracking-widest text-[#8C6D34] mb-1">
              <span>✦</span>
              <span>Sanctuary Preferences</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#1C2E1A]">{t('profile_tab_prefs')}</h3>
            <p className="text-xs text-[#464D3F] mt-0.5">
              Customize your localization language, shipment notification alerts, and data settings
            </p>
          </div>
        </div>

        {savedSettingsNotice && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Preferences saved successfully!</span>
          </div>
        )}

        {exportedDataNotice && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-xs font-semibold flex items-center gap-2 animate-fade-in">
            <Download className="w-4 h-4 text-amber-600" />
            <span>Complete patron data dossier exported to encrypted archive (Morkins-Patron-Data.json).</span>
          </div>
        )}

        <div className="mt-6 space-y-8 max-w-2xl">
          
          {/* ── 1. Language & Regional Localization ── */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#8C6221] mb-3 flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#1C331B]" />
              <span>{t('pref_language')}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { code: 'en', label: 'English', native: 'United States', flag: '🇺🇸' },
                { code: 'hi', label: 'हिन्दी', native: 'Hindi', flag: '🇮🇳' },
                { code: 'gu', label: 'ગુજરાતી', native: 'Gujarati', flag: '🇮🇳' },
              ].map((lang) => {
                const isSelected = language === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code as any);
                      setSavedSettingsNotice(true);
                      setTimeout(() => setSavedSettingsNotice(false), 2000);
                    }}
                    className={`p-4 rounded-lg border text-left transition-all cursor-pointer shadow-2xs flex items-center justify-between ${
                      isSelected
                        ? 'bg-linear-to-b from-[#FAF8F2] to-white border-[#547E3D] ring-2 ring-[#6F8C51]/20'
                        : 'bg-white border-[#DDD3C1] hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{lang.flag}</span>
                      <div>
                        <strong className="text-xs font-bold text-[#1C2E1A] block">
                          {lang.label}
                        </strong>
                        <span className="text-[10px] text-gray-500">{lang.native}</span>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-[#1C331B] text-[#AFD971] flex items-center justify-center text-[10px]">
                        ✓
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── 2. Communication & Notification Toggles ── */}
          <div className="pt-6 border-t border-[#E5DEC9]">
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#8C6221] mb-4 flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#1C331B]" />
              <span>Communication & Alert Channels</span>
            </h4>

            <div className="space-y-4">
              {/* SMS Dispatch Alerts */}
              <div className="p-4 rounded-lg bg-[#FAF8F2] border border-[#DDD3C1] flex items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#DDD3C1] flex items-center justify-center text-[#1C331B] shrink-0 mt-0.5">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#1C2E1A]">SMS Dispatch Radar Alerts</h5>
                    <p className="text-[11px] text-[#464D3F] font-light mt-0.5">
                      Receive instant real-time cellular SMS updates when your fresh batch is en route.
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={smsAlerts}
                    onChange={() => handleToggle(setSmsAlerts)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1C331B]" />
                </label>
              </div>

              {/* VIP Early Drops */}
              <div className="p-4 rounded-lg bg-[#FAF8F2] border border-[#DDD3C1] flex items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#DDD3C1] flex items-center justify-center text-[#1C331B] shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-[#C49746]" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#1C2E1A]">{t('pref_sub_drop')}</h5>
                    <p className="text-[11px] text-[#464D3F] font-light mt-0.5">
                      Priority 24-hour early access reservation window for limited clinical harvest editions.
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={vipDrops}
                    onChange={() => handleToggle(setVipDrops)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1C331B]" />
                </label>
              </div>

              {/* Replenishment Reminders */}
              <div className="p-4 rounded-lg bg-[#FAF8F2] border border-[#DDD3C1] flex items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#DDD3C1] flex items-center justify-center text-[#1C331B] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#1C2E1A]">{t('pref_sub_routine')}</h5>
                    <p className="text-[11px] text-[#464D3F] font-light mt-0.5">
                      Timely notifications when your personalized 30-day or 60-day routine cycle is nearing completion.
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={replenishReminders}
                    onChange={() => handleToggle(setReplenishReminders)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1C331B]" />
                </label>
              </div>
            </div>
          </div>

          {/* ── 3. Data Governance & Privacy Vault ── */}
          <div className="pt-6 border-t border-[#E5DEC9]">
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#8C6221] mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#1C331B]" />
              <span>Patron Data & Privacy Dossier</span>
            </h4>

            <div className="p-5 rounded-lg bg-white border border-[#DDD3C1] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
              <div>
                <strong className="text-xs font-bold text-[#1C2E1A] block">
                  Export Your Personal Skincare History
                </strong>
                <p className="text-[11px] text-[#464D3F] font-light mt-0.5">
                  Download a complete portable archive of your skin diagnosis, order invoices, and saved formulations.
                </p>
              </div>

              <button
                onClick={handleExportData}
                className="px-4 py-2 bg-[#FAF8F2] hover:bg-[#1C331B] text-[#1C2E1A] hover:text-[#AFD971] border border-[#DDD3C1] rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-2xs flex items-center gap-1.5 shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Dossier</span>
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
