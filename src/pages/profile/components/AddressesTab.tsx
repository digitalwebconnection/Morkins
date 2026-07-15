import React from 'react';
import { MapPinOff, Edit3, Trash2, Phone, Plus } from 'lucide-react';

interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  zip: string;
  phone: string;
}

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
  return (
    <div className="bg-white/80 rounded-[32px] p-6 md:p-8 border border-brand-dark/10 shadow-sm backdrop-blur-xs space-y-6 animate-modal-content">
      <div className="flex justify-between items-center pb-4 border-b border-brand-dark/5">
        <div>
          <h3 className="font-serif text-2xl font-bold text-brand-light">{t('profile_tab_addresses')}</h3>
          <p className="text-[10px] text-brand-dark/55 uppercase tracking-widest mt-0.5">Manage your home, studio, & office locations</p>
        </div>
        {!showAddressForm && (
          <button 
            onClick={() => {
              resetAddressForm();
              setShowAddressForm(true);
            }}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-brand-light hover:bg-brand-light/95 rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-3xs cursor-pointer transition-all active:scale-95 animate-fade-in"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t('addr_add')}</span>
          </button>
        )}
      </div>

      {showAddressForm ? (
        <form onSubmit={handleSaveAddress} className="space-y-5 bg-brand-cream-dark/15 p-6 rounded-[28px] border border-brand-dark/5 animate-slide-down">
          <h4 className="text-xs uppercase font-extrabold tracking-widest text-brand-light mb-2">
            {editingAddressId ? 'Modify Address' : 'Register New Address'}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[9px] uppercase font-bold tracking-widest text-brand-light mb-1.5">{t('addr_label')}</label>
              <input 
                type="text" 
                required 
                value={addrLabel}
                onChange={(e) => setAddrLabel(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-brand-dark/15 focus:border-brand-light focus:ring-2 focus:ring-brand-light/10 outline-none text-xs text-brand-light bg-white"
                placeholder="Home Address"
              />
            </div>
            <div>
              <label className="block text-[9px] uppercase font-bold tracking-widest text-brand-light mb-1.5">{t('profile_phone_lbl')}</label>
              <input 
                type="tel" 
                value={addrPhone}
                onChange={(e) => setAddrPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-brand-dark/15 focus:border-brand-light focus:ring-2 focus:ring-brand-light/10 outline-none text-xs text-brand-light bg-white"
                placeholder="+1 (555) 0000"
              />
            </div>
          </div>

          <div>
            <label className="block text-[9px] uppercase font-bold tracking-widest text-brand-light mb-1.5">{t('addr_street')}</label>
            <input 
              type="text" 
              required 
              value={addrStreet}
              onChange={(e) => setAddrStreet(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-brand-dark/15 focus:border-brand-light focus:ring-2 focus:ring-brand-light/10 outline-none text-xs text-brand-light bg-white"
              placeholder="123 Botanica Way"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[9px] uppercase font-bold tracking-widest text-brand-light mb-1.5">{t('addr_city')}</label>
              <input 
                type="text" 
                required 
                value={addrCity}
                onChange={(e) => setAddrCity(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-brand-dark/15 focus:border-brand-light focus:ring-2 focus:ring-brand-light/10 outline-none text-xs text-brand-light bg-white"
                placeholder="Seattle, WA"
              />
            </div>
            <div>
              <label className="block text-[9px] uppercase font-bold tracking-widest text-brand-light mb-1.5">{t('addr_zip')}</label>
              <input 
                type="text" 
                required 
                value={addrZip}
                onChange={(e) => setAddrZip(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-brand-dark/15 focus:border-brand-light focus:ring-2 focus:ring-brand-light/10 outline-none text-xs text-brand-light bg-white"
                placeholder="98101"
              />
            </div>
          </div>

          <div className="flex space-x-3 pt-2">
            <button 
              type="submit"
              className="bg-brand-light hover:bg-brand-light/95 text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-3xs"
            >
              {t('addr_save')}
            </button>
            <button 
              type="button"
              onClick={resetAddressForm}
              className="border border-brand-dark/15 text-brand-light px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white cursor-pointer"
            >
              {t('profile_cancel')}
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {addresses.length === 0 ? (
            <div className="col-span-2 text-center py-12 border-2 border-dashed border-brand-dark/15 rounded-[28px] text-brand-dark/45 text-xs font-light">
              <MapPinOff className="w-8 h-8 mx-auto mb-2 opacity-50 text-brand-light/60" />
              {t('addr_empty')}
            </div>
          ) : (
            addresses.map((addr) => (
              <div key={addr.id} className="p-5 bg-brand-cream-dark/25 border border-brand-dark/10 rounded-[28px] flex flex-col justify-between space-y-4 hover:border-brand-light/30 transition-all shadow-3xs">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] uppercase font-extrabold tracking-widest text-brand-light px-2.5 py-0.5 bg-brand-light/10 border border-brand-light/10 rounded-full">
                      {addr.label}
                    </span>
                    <div className="flex items-center space-x-2">
                      <button onClick={() => handleEditAddress(addr)} className="p-1.5 rounded-lg bg-white border border-brand-dark/5 hover:border-brand-light text-neutral-400 hover:text-brand-light transition-all cursor-pointer shadow-3xs">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDeleteAddress(addr.id)} className="p-1.5 rounded-lg bg-white border border-brand-dark/5 hover:border-red-500 text-neutral-400 hover:text-red-500 transition-all cursor-pointer shadow-3xs">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-brand-light font-extrabold mt-2">{addr.street}</p>
                  <p className="text-xs text-brand-dark/70 font-light mt-0.5">{addr.city}, {addr.zip}</p>
                </div>
                {addr.phone && (
                  <div className="text-[10px] text-brand-dark/65 font-mono border-t border-brand-dark/5 pt-2 flex items-center space-x-1">
                    <Phone className="w-3 h-3 text-brand-light/50" />
                    <span>{addr.phone}</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
