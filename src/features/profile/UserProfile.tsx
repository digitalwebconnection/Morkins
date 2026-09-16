import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, ShoppingBag, Compass, MapPin, Globe,
  LogOut, Camera,
  RotateCcw,
  ShieldCheck, X
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

// Import organized subcomponents
import { DetailsTab } from './components/DetailsTab';
import { AddressesTab } from './components/AddressesTab';
import { OrdersTab } from './components/OrdersTab';
import { OrderDetailView } from './components/OrderDetail/OrderDetailView';
import { TrackingTab } from './components/OrderDetail/TrackingTab';
import ReturnStatusTab from './components/OrderDetail/ReturnStatusTab';
import { WishlistTab } from './components/WishlistTab';
import { SecurityTab } from './components/SecurityTab';
import { SettingsTab } from './components/SettingsTab';

import type { Address, Order } from '../../types';
import { getUserOrders, getReturnRequests } from '../../lib/api';

interface UserProfileProps {
  onAddToCart: (product: { id: number; name: string; price: number; img: string }, openCart?: boolean) => void;
  onLogout: () => void;
}

const DEFAULT_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    label: 'Home Sanctuary',
    street: '742 Evergreen Terrace',
    city: 'Springfield, IL',
    zip: '62704',
    phone: '+1 (555) 0199',
    isDefault: true,
  },
  {
    id: 'addr-2',
    label: 'Creative Studio',
    street: '500 Forest Avenue, Suite 12',
    city: 'Portland, ME',
    zip: '04101',
    phone: '+1 (555) 9821',
    isDefault: false,
  },
];

const DEFAULT_ORDERS: Order[] = [
  {
    id: 'MK-98211',
    date: 'July 10, 2026',
    status: 'shipped',
    total: 82.0,
    trackingNumber: 'USPS-MK9821199',
    estimatedDelivery: 'July 16, 2026',
    items: [
      {
        id: 1,
        name: 'Rosewater Facial Mist',
        qty: 1,
        price: 34.0,
        img: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=200&auto=format&fit=crop',
      },
      {
        id: 2,
        name: 'Marula Nourishing Face Oil',
        qty: 1,
        price: 48.0,
        img: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=200&auto=format&fit=crop',
      },
    ],
    shippingAddress: 'Plot 12, Gulmohar Avenue, Bandra West, Mumbai, MH 400050',
    paymentMethod: 'Visa ending in •••• 4242',
  },
  {
    id: 'MK-87102',
    date: 'May 24, 2026',
    status: 'delivered',
    total: 42.0,
    trackingNumber: 'DHL-MK8710255',
    estimatedDelivery: 'May 28, 2026',
    items: [
      {
        id: 3,
        name: 'Aloe Vera Hydrating Gel',
        qty: 1,
        price: 42.0,
        img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=200&auto=format&fit=crop',
      },
    ],
    shippingAddress: 'Plot 12, Gulmohar Avenue, Bandra West, Mumbai, MH 400050',
    paymentMethod: 'DHL Express Payment',
  },
];

const DEFAULT_WISHLIST = [
  {
    id: 101,
    name: 'Squalane Radiance Glow Serum',
    price: 54.0,
    img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400&auto=format&fit=crop',
    description: 'Ultra-lightweight skin oil that deeply locks in essential moisture.',
    category: 'Face Serum',
  },
  {
    id: 102,
    name: 'Lavender Calming Hand Cream',
    price: 26.0,
    img: 'https://images.unsplash.com/photo-1601049676099-e7ed07d825b0?q=80&w=400&auto=format&fit=crop',
    description: 'Soothes rough, dry hands with nourishing organic lavender essence.',
    category: 'Hand & Body',
  },
];

export type ProfileTab =
  | 'details'
  | 'addresses'
  | 'orders'
  | 'order_detail'
  | 'tracking'
  | 'returns'
  | 'wishlist'
  | 'referral'
  | 'security'
  | 'settings';

export interface NavigationItem {
  id: ProfileTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: number;
  alert?: boolean;
  highlight?: boolean;
}

export interface NavigationGroup {
  group: string;
  items: NavigationItem[];
}

export default function UserProfile({ onAddToCart, onLogout }: UserProfileProps) {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState<any>(() => {
    try {
      const stored = localStorage.getItem('morkins_logged_in_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [activeTab, setActiveTab] = useState<ProfileTab>('details');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('morkins_logged_in_user');
    setUser(null);
    if (onLogout) {
      onLogout();
    }
    navigate('/', { replace: true });
  };

  // Address State
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [addrLabel, setAddrLabel] = useState('');
  const [addrStreet, setAddrStreet] = useState('');
  const [addrCity, setAddrCity] = useState('');
  const [addrZip, setAddrZip] = useState('');
  const [addrPhone, setAddrPhone] = useState('');

  // Wishlist State
  const [wishlist, setWishlist] = useState<any[]>(DEFAULT_WISHLIST);

  // Orders State
  const [orders, setOrders] = useState<Order[]>(DEFAULT_ORDERS);
  const [returnCount, setReturnCount] = useState<number>(0);
  const [selectedTrackingOrder, setSelectedTrackingOrder] = useState<Order>(DEFAULT_ORDERS[0]);
  const [selectedDetailOrder, setSelectedDetailOrder] = useState<Order | null>(null);


  // Edit user detail states
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');

  useEffect(() => {
    const loggedUser = localStorage.getItem('morkins_logged_in_user');
    if (!loggedUser) {
      navigate('/');
      return;
    }
    const parsed = JSON.parse(loggedUser);
    setUser(parsed);
    setEditName(parsed.fullName || '');
    setEditPhone(parsed.phone || '');

    // Load addresses
    const savedAddrs = localStorage.getItem(`morkins_addresses_${parsed.email}`);
    if (savedAddrs) {
      setAddresses(JSON.parse(savedAddrs));
    } else {
      setAddresses(DEFAULT_ADDRESSES);
      localStorage.setItem(`morkins_addresses_${parsed.email}`, JSON.stringify(DEFAULT_ADDRESSES));
    }

    // Load wishlist
    const savedWish = localStorage.getItem(`morkins_wishlist_${parsed.email}`);
    if (savedWish) {
      setWishlist(JSON.parse(savedWish));
    } else {
      setWishlist(DEFAULT_WISHLIST);
      localStorage.setItem(`morkins_wishlist_${parsed.email}`, JSON.stringify(DEFAULT_WISHLIST));
    }

    // Load orders
    getUserOrders().then((allOrders) => {
      if (allOrders && allOrders.length > 0) {
        setOrders(allOrders);
        setSelectedTrackingOrder(allOrders[0]);
      }
    });

    // Load returns count
    getReturnRequests().then((allReturns) => {
      if (allReturns) {
        setReturnCount(allReturns.length);
      }
    });
  }, [navigate]);

  if (!user) return null;

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { ...user, fullName: editName, phone: editPhone };
    setUser(updated);
    localStorage.setItem('morkins_logged_in_user', JSON.stringify(updated));

    // Update in simulated accounts list
    const accounts = JSON.parse(localStorage.getItem('morkins_simulated_users') || '[]');
    const newAccounts = accounts.map((acc: any) =>
      acc.email === user.email ? { ...acc, fullName: editName, phone: editPhone } : acc
    );
    localStorage.setItem('morkins_simulated_users', JSON.stringify(newAccounts));

    setIsEditingUser(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const updated = { ...user, avatar: base64String, profileImage: base64String };
        setUser(updated);
        localStorage.setItem('morkins_logged_in_user', JSON.stringify(updated));

        // Update in simulated accounts list
        const accounts = JSON.parse(localStorage.getItem('morkins_simulated_users') || '[]');
        const newAccounts = accounts.map((acc: any) =>
          acc.email === user.email ? { ...acc, avatar: base64String, profileImage: base64String } : acc
        );
        localStorage.setItem('morkins_simulated_users', JSON.stringify(newAccounts));
      };
      reader.readAsDataURL(file);
    }
  };

  // Address Handlers
  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addrStreet || !addrCity) return;

    if (editingAddressId) {
      const updated = addresses.map((a) =>
        a.id === editingAddressId
          ? {
            ...a,
            label: addrLabel || 'Saved Location',
            street: addrStreet,
            city: addrCity,
            zip: addrZip,
            phone: addrPhone,
          }
          : a
      );
      setAddresses(updated);
      localStorage.setItem(`morkins_addresses_${user.email}`, JSON.stringify(updated));
    } else {
      const newAddr: Address = {
        id: `addr-${Date.now()}`,
        label: addrLabel || 'New Location',
        street: addrStreet,
        city: addrCity,
        zip: addrZip,
        phone: addrPhone,
        isDefault: addresses.length === 0,
      };
      const updated = [...addresses, newAddr];
      setAddresses(updated);
      localStorage.setItem(`morkins_addresses_${user.email}`, JSON.stringify(updated));
    }

    resetAddressForm();
  };

  const handleEditAddress = (addr: Address) => {
    setEditingAddressId(addr.id);
    setAddrLabel(addr.label || '');
    setAddrStreet(addr.street || '');
    setAddrCity(addr.city || '');
    setAddrZip(addr.zip || '');
    setAddrPhone(addr.phone || '');
    setShowAddressForm(true);
  };

  const handleDeleteAddress = (id: string) => {
    const updated = addresses.filter((a) => a.id !== id);
    setAddresses(updated);
    localStorage.setItem(`morkins_addresses_${user.email}`, JSON.stringify(updated));
  };

  const resetAddressForm = () => {
    setEditingAddressId(null);
    setAddrLabel('');
    setAddrStreet('');
    setAddrCity('');
    setAddrZip('');
    setAddrPhone('');
    setShowAddressForm(false);
  };

  const handleRemoveWishlist = (id: number) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
    localStorage.setItem(`morkins_wishlist_${user.email}`, JSON.stringify(updated));
  };

  // Grouped Navigation Tabs Structure
  const navigationGroups: NavigationGroup[] = [
    {
      group: 'ACCOUNT & VAULT',
      items: [
        { id: 'details' as const, label: 'Personal Information', icon: User },
        { id: 'addresses' as const, label: 'Saved Addresses', icon: MapPin, count: addresses.length },
      ],
    },
    {
      group: 'ORDERS & TELEMETRY',
      items: [
        { id: 'orders' as const, label: 'Order History', icon: ShoppingBag, count: orders.length },
        { id: 'tracking' as const, label: 'Delivery Tracking', icon: Compass, alert: true },
        { id: 'returns' as const, label: 'Returns & Refunds', icon: RotateCcw, count: returnCount },
      ],
    },
    
    {
      group: 'SECURITY & SETTINGS',
      items: [
        { id: 'security' as const, label: 'Account Security & 2FA', icon: ShieldCheck },
        { id: 'settings' as const, label: 'Preferences & Settings', icon: Globe },
      ],
    },
  ];

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-[#FCFBF8] via-[#FAF8F2] to-[#F7F4EB] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 text-[#1C2E1A] selection:bg-[#AFD971] selection:text-[#1C331B]">

      {/* Hidden File Input for Avatar Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="hidden"
        accept="image/*"
      />

      <div className="max-w-7xl mx-auto space-y-8">

        {/* ── PART 1: TOP PROFILE HERO BANNER & PATRON VAULT SCRATCH CARD ── */}
        <div className="gap-6 items-stretch">

          {/* ── PART 1A: SANCTUARY PATRON HERO BANNER ── */}
          {/* Displays patron ID, avatar upload, VIP tier status, loyalty leaves, and carbon offset */}
          <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#DDD3C1] shadow-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              {/* Avatar with Camera Trigger */}
              <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-linear-to-br from-[#12602F] to-[#1F7A3E] text-[#AFD971] flex items-center justify-center font-serif text-3xl font-bold shadow-lg ring-4 ring-[#12602F]/15 overflow-hidden transition-all duration-300 group-hover:ring-[#12602F]/30">
                  {user.avatar || user.profileImage ? (
                    <img src={user.avatar || user.profileImage} alt={user.fullName || 'User'} className="w-full h-full object-cover" />
                  ) : (
                    <span>{(user.fullName || user.email || 'M').charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Profile Greeting */}
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C2E1A]">
                  {user.fullName || 'Botanical Patron'}
                </h1>
                <p className="text-xs text-[#464D3F] mt-0.5">{user.email}</p>
              </div>
            </div>
          </div>

          {/* ── PART 1B: PATRON VAULT SCRATCH CARD (VaultScratchCard) ── */}
          {/* Interactive scratch-to-reveal VIP coupon, flip card animations, and 1-click code copying */}
         

        </div>

        {/* ── PART 2: MAIN PROFILE DASHBOARD (SIDEBAR & TAB VIEWPORT) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* ── PART 2A: STICKY NAVIGATION SIDEBAR ── */}
          {/* Grouped menu items: Account, Purchases, Loyalty, Security */}
          <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="bg-white rounded-lg p-4 sm:p-5 border border-[#DDD3C1] shadow-sm space-y-5">

              {navigationGroups.map((grp, gIdx) => (
                <div key={gIdx} className="space-y-1.5 first:pt-0 pt-3 border-t first:border-t-0 border-[#E5DEC9]/70">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#8C6221] px-3 block">
                    {grp.group}
                  </span>

                  <div className="space-y-1">
                    {grp.items.map((tab) => {
                      const isActive = activeTab === tab.id;
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => {
                            if (tab.id === 'orders') setSelectedDetailOrder(null);
                            setActiveTab(tab.id);
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${isActive
                              ? 'bg-linear-to-r from-[#12602F] to-[#1F7A3E] text-[#AFD971] shadow-xs scale-100 ring-2 ring-[#12602F]/15'
                              : 'text-[#464D3F] hover:text-[#12602F] hover:bg-[#FAF8F2]'
                            }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#AFD971]' : 'text-[#8C6221]'}`} />
                            <span className="truncate">{tab.label}</span>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {tab.count !== undefined && (
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  isActive
                                    ? 'bg-[#AFD971]/20 text-[#AFD971]'
                                    : 'bg-stone-100 text-stone-600'
                                }`}
                              >
                                {tab.count}
                              </span>
                            )}
                            {tab.alert && (
                              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Logout Button */}
              <div className="pt-3 border-t border-[#E5DEC9]">
                <button
                  type="button"
                  onClick={() => setShowLogoutConfirm(true)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold text-rose-700 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <LogOut className="w-4 h-4 text-rose-600" />
                    <span>Log Out Sanctuary</span>
                  </div>
                </button>
              </div>

            </div>
          </div>

          {/* ── PART 2B: ACTIVE TAB DETAILS VIEWPORT ── */}
          <div className="lg:col-span-3 min-h-130">

            {/* ── TAB 2: PERSONAL CREDENTIALS (DetailsTab) ── */}
            {/* Full name, verified email, phone number, and avatar editing */}
            {activeTab === 'details' && (
              <DetailsTab
                user={user}
                isEditingUser={isEditingUser}
                setIsEditingUser={setIsEditingUser}
                editName={editName}
                setEditName={setEditName}
                editPhone={editPhone}
                setEditPhone={setEditPhone}
                handleUpdateProfile={handleUpdateProfile}
                t={t}
              />
            )}

            {/* ── TAB 3: SAVED DELIVERY ADDRESSES (AddressesTab) ── */}
            {/* Address book management (Home, Work, Other) with default address toggling and form editor */}
            {activeTab === 'addresses' && (
              <AddressesTab
                addresses={addresses}
                showAddressForm={showAddressForm}
                setShowAddressForm={setShowAddressForm}
                editingAddressId={editingAddressId}
                addrLabel={addrLabel}
                setAddrLabel={setAddrLabel}
                addrStreet={addrStreet}
                setAddrStreet={setAddrStreet}
                addrCity={addrCity}
                setAddrCity={setAddrCity}
                addrZip={addrZip}
                setAddrZip={setAddrZip}
                addrPhone={addrPhone}
                setAddrPhone={setAddrPhone}
                handleSaveAddress={handleSaveAddress}
                handleEditAddress={handleEditAddress}
                handleDeleteAddress={handleDeleteAddress}
                resetAddressForm={resetAddressForm}
                t={t}
              />
            )}

            {/* ── TAB 5: ORDER HISTORY (OrdersTab) ── */}
            {/* Complete order log with filterable status tabs, item cards, tracking triggers, and return claim buttons */}
            {activeTab === 'orders' && !selectedDetailOrder && (
              <OrdersTab
                orders={orders}
                setSelectedTrackingOrder={setSelectedTrackingOrder}
                setActiveTab={setActiveTab}
                onSelectOrderDetail={(order) => {
                  setSelectedDetailOrder(order);
                  setActiveTab('order_detail');
                }}
                onAddToCart={onAddToCart}
                t={t}
              />
            )}

            {/* ── TAB 6: EMBEDDED SINGLE ORDER DETAIL (OrderDetailView) ── */}
            {/* Itemized price breakdown, delivery address, digital invoice PDF download, and item review triggers */}
            {activeTab === 'order_detail' && selectedDetailOrder && (
              <OrderDetailView
                order={selectedDetailOrder}
                onBack={() => {
                  setSelectedDetailOrder(null);
                  setActiveTab('orders');
                }}
                onTrackOrder={(order) => {
                  setSelectedTrackingOrder(order);
                  setActiveTab('tracking');
                }}
                onReturnOrder={() => {
                  setActiveTab('returns');
                }}
                onAddToCart={onAddToCart}
                t={t}
              />
            )}

            {/* ── TAB 7: LIVE SHIPMENT TRACKING RADAR (TrackingTab) ── */}
            {/* Visual milestone tracker: Order Placed → In Transit → Out for Delivery → Delivered */}
            {activeTab === 'tracking' && (
              <TrackingTab
                selectedTrackingOrder={selectedTrackingOrder}
                setActiveTab={setActiveTab}
                t={t}
              />
            )}

            {/* ── TAB 8: 7-DAY RETURN & REFUND CLAIMS (ReturnStatusTab) ── */}
            {/* Active return requests, courier pickup status, and refunded amounts */}
            {activeTab === 'returns' && (
              <ReturnStatusTab
                onSelectOrderTab={() => setActiveTab('orders')}
              />
            )}

            {/* ── TAB 9: CURATED WISHLIST (WishlistTab) ── */}
            {/* Saved favorite botanical formulations with stock status and 1-click move to bag */}
            {activeTab === 'wishlist' && (
              <WishlistTab
                wishlist={wishlist}
                handleRemoveWishlist={handleRemoveWishlist}
                onAddToCart={onAddToCart}
                t={t}
              />
            )}

            {/* ── TAB 12: ACCOUNT SECURITY & 2FA (SecurityTab) ── */}
            {/* Two-factor authentication (SMS/App), active session management, and password update */}
            {activeTab === 'security' && (
              <SecurityTab user={user} onLogout={() => setShowLogoutConfirm(true)} t={t} />
            )}

            {/* ── TAB 13: PREFERENCES & LOCALIZATION (SettingsTab) ── */}
            {/* Multi-language selection (English, Hindi, Gujarati), replenishment alerts, and marketing preferences */}
            {activeTab === 'settings' && (
              <SettingsTab
                language={language}
                setLanguage={setLanguage}
                t={t}
              />
            )}

          </div>

        </div>

      </div>

      {/* ── MORKINS LUXURY BOTANICAL LOGOUT CONFIRMATION POPUP ── */}
      {showLogoutConfirm && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1A10]/70 backdrop-blur-md animate-fade-in"
          onClick={() => setShowLogoutConfirm(false)}
        >
          <div
            className="relative w-full max-w-sm bg-white rounded-2xl border border-stone-200 shadow-xl p-6 sm:p-8 text-center transition-all duration-200 animate-scale-up overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end mb-2">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="w-8 h-8 rounded-full hover:bg-stone-100 flex items-center justify-center text-stone-500 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mb-4">
                <LogOut className="w-8 h-8 text-rose-500 ml-1" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">
                Sign Out
              </h3>
              <p className="text-sm text-stone-500">
                Are you sure you want to sign out of your account?
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowLogoutConfirm(false);
                  handleLogout();
                }}
                className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold transition-colors cursor-pointer"
              >
                Sign Out
              </button>
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="w-full py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-900 text-sm font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
