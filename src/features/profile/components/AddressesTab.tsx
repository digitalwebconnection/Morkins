import React, { useState } from 'react';
import {
  MapPin, Plus, Edit3, Trash2, Phone, Check,
  Home, Building2, Briefcase, CheckCircle2, X
} from 'lucide-react';
import type { Address } from '../../../types';

interface AddressesTabProps {
  addresses: Address[];
  showAddressForm: boolean;
  setShowAddressForm: (val: boolean) => void;
  editingAddressId: string | null;
  addrLabel: string;
  setAddrLabel: (val: string) => void;
  addrStreet: string;
  setAddrStreet: (val: string) => void;
  addrCity: string;
  setAddrCity: (val: string) => void;
  addrZip: string;
  setAddrZip: (val: string) => void;
  addrPhone: string;
  setAddrPhone: (val: string) => void;
  handleSaveAddress: (e: React.FormEvent) => void;
  handleEditAddress: (addr: Address) => void;
  handleDeleteAddress: (id: string) => void;
  resetAddressForm: () => void;
  t: (key: string) => string;
}

export const AddressesTab: React.FC<AddressesTabProps> = ({
  addresses,
  showAddressForm,
  setShowAddressForm,
  editingAddressId,
  addrLabel,
  setAddrLabel,
  addrStreet,
  setAddrStreet,
  addrCity,
  setAddrCity,
  addrZip,
  setAddrZip,
  addrPhone,
  setAddrPhone,
  handleSaveAddress,
  handleEditAddress,
  handleDeleteAddress,
  resetAddressForm,
  t,
}) => {
  const [defaultId, setDefaultId] = useState<string>(addresses[0]?.id || 'addr-1');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const getLabelIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes('office') || l.includes('work')) return Briefcase;
    if (l.includes('studio') || l.includes('creative')) return Building2;
    return Home;
  };

  return (
    <div className="space-y-6 animate-fade-in">

      {/* ── Section Header ── */}
      <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#DDD3C1]/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#12602F] via-[#1F8242] to-[#C49746]" />

        <div className="flex flex-wrap justify-between items-center gap-4 pb-5 border-b border-[#E5DEC9]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-linear-to-r from-[#F4EFE6] to-[#EFE8D8] border border-[#C9B387]/50 text-[10px] font-bold uppercase tracking-widest text-[#8C6D34] mb-1">
              <span>✦</span>
              <span>Sanctuary Book</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#1C2E1A]">{t('profile_tab_addresses')}</h3>
            <p className="text-xs text-[#464D3F] mt-0.5">
              Manage saved home sanctuaries, creative studios, and international delivery locations
            </p>
          </div>

          {!showAddressForm && (
            <button
              onClick={() => {
                resetAddressForm();
                setShowAddressForm(true);
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-linear-to-r from-[#12602F] to-[#1F7A3E] hover:from-[#0E4F26] hover:to-[#176B37] text-[#AFD971] rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-xs active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>{t('addr_add')}</span>
            </button>
          )}
        </div>

        {/* ── Add / Edit Form Modal/Drawer ── */}
        {showAddressForm && (
          <form
            onSubmit={handleSaveAddress}
            className="mt-6 p-6 sm:p-7 rounded-lg bg-linear-to-b from-[#FAF8F2] to-[#FCFBF8] border border-[#DDD3C1] space-y-5 animate-slide-down shadow-xs"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DEC9]">
              <h4 className="text-xs uppercase font-extrabold tracking-wider text-[#1C2E1A] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#8C6221]" />
                <span>{editingAddressId ? 'Modify Address Sanctuary' : 'Register New Delivery Address'}</span>
              </h4>
              <button
                type="button"
                onClick={resetAddressForm}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase font-bold tracking-wider text-[#1C2E1A] mb-1">
                  Sanctuary Tag Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={addrLabel}
                  onChange={(e) => setAddrLabel(e.target.value)}
                  placeholder="e.g. Home Sanctuary, Creative Studio"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#DDD3C1] focus:border-[#12602F] focus:ring-2 focus:ring-[#12602F]/15 outline-none text-xs text-[#1C2E1A] bg-white font-medium transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold tracking-wider text-[#1C2E1A] mb-1">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  value={addrPhone}
                  onChange={(e) => setAddrPhone(e.target.value)}
                  placeholder="+1 (555) 0199"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#DDD3C1] focus:border-[#12602F] focus:ring-2 focus:ring-[#12602F]/15 outline-none text-xs text-[#1C2E1A] bg-white font-medium transition-all"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] uppercase font-bold tracking-wider text-[#1C2E1A] mb-1">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={addrStreet}
                  onChange={(e) => setAddrStreet(e.target.value)}
                  placeholder="Street name, suite, apt, floor"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#DDD3C1] focus:border-[#12602F] focus:ring-2 focus:ring-[#12602F]/15 outline-none text-xs text-[#1C2E1A] bg-white font-medium transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold tracking-wider text-[#1C2E1A] mb-1">
                  City & State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={addrCity}
                  onChange={(e) => setAddrCity(e.target.value)}
                  placeholder="e.g. Portland, ME"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#DDD3C1] focus:border-[#12602F] focus:ring-2 focus:ring-[#12602F]/15 outline-none text-xs text-[#1C2E1A] bg-white font-medium transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold tracking-wider text-[#1C2E1A] mb-1">
                  Postal / ZIP Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={addrZip}
                  onChange={(e) => setAddrZip(e.target.value)}
                  placeholder="e.g. 04101"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#DDD3C1] focus:border-[#12602F] focus:ring-2 focus:ring-[#12602F]/15 outline-none text-xs text-[#1C2E1A] bg-white font-medium transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-linear-to-r from-[#12602F] to-[#1F7A3E] hover:from-[#0E4F26] hover:to-[#176B37] text-[#AFD971] text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-xs active:scale-95 flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Address</span>
              </button>
              <button
                type="button"
                onClick={resetAddressForm}
                className="px-5 py-2.5 border border-[#DDD3C1] text-[#464D3F] hover:bg-gray-100 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* ── Saved Addresses Grid ── */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {addresses.map((addr) => {
            const isDefault = (addr.id === defaultId) || addr.isDefault;
            const Icon = getLabelIcon(addr.label || '');

            return (
              <div
                key={addr.id}
                className={`p-6 rounded-lg border transition-all duration-300 relative flex flex-col justify-between ${isDefault
                    ? 'bg-linear-to-b from-white via-[#FCFBF8] to-[#FAF8F2] border-[#12602F] shadow-[0_4px_20px_rgba(18,96,47,0.12)] ring-2 ring-[#12602F]/20'
                    : 'bg-white border-[#DDD3C1]/80 hover:border-[#12602F]/50 shadow-2xs hover:shadow-md'
                  }`}
              >
                <div>
                  {/* Top Bar with Icon, Label, and Default Badge */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-[#FAF8F2] border border-[#DDD3C1] flex items-center justify-center text-[#12602F] shadow-2xs">
                        <Icon className="w-4.5 h-4.5 text-[#12602F]" />
                      </div>
                      <div>
                        <h4 className="font-serif text-base font-bold text-[#1C2E1A] leading-tight">
                          {addr.label}
                        </h4>
                        <span className="text-[10px] font-mono text-[#8C6221] tracking-wider">
                          SAVED LOCATION
                        </span>
                      </div>
                    </div>

                    {isDefault && (
                      <span className="bg-[#12602F] text-[#AFD971] text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-[#AFD971]/30 shadow-2xs flex items-center gap-1">
                        <span>✓</span> Default
                      </span>
                    )}
                  </div>

                  {/* Address Body */}
                  <div className="space-y-1.5 text-xs text-[#464D3F] pt-2">
                    <p className="font-semibold text-[#1C2E1A]">
                      {addr.street}
                    </p>
                    <p>
                      {addr.city} • {addr.zip}
                    </p>
                    {addr.phone && (
                      <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-1">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <span>{addr.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Bottom Actions Bar */}
                <div className="mt-5 pt-4 border-t border-[#E5DEC9] flex items-center justify-between gap-2">
                  {!isDefault ? (
                    <button
                      onClick={() => setDefaultId(addr.id)}
                      className="text-[11px] font-bold uppercase tracking-wider text-[#8C6221] hover:text-[#1C331B] cursor-pointer transition-colors"
                    >
                      Set as Default
                    </button>
                  ) : (
                    <span className="text-[11px] font-medium text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Primary Delivery</span>
                    </span>
                  )}

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleEditAddress(addr)}
                      className="p-2 rounded-xl bg-[#FAF8F2] hover:bg-[#1C331B] text-[#1C2E1A] hover:text-[#AFD971] border border-[#DDD3C1] transition-all cursor-pointer shadow-2xs"
                      title="Edit Address"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    {deleteConfirmId === addr.id ? (
                      <div className="flex items-center gap-1 bg-red-50 p-1 rounded-xl border border-red-200 animate-fade-in">
                        <button
                          onClick={() => {
                            handleDeleteAddress(addr.id);
                            setDeleteConfirmId(null);
                          }}
                          className="px-2 py-1 bg-red-600 text-white text-[10px] font-bold rounded-lg cursor-pointer"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(null)}
                          className="px-2 py-1 text-gray-600 text-[10px] hover:bg-gray-200 rounded-lg cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirmId(addr.id)}
                        className="p-2 rounded-xl bg-[#FAF8F2] hover:bg-rose-50 text-gray-500 hover:text-rose-600 border border-[#DDD3C1] hover:border-rose-200 transition-all cursor-pointer shadow-2xs"
                        title="Delete Address"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
