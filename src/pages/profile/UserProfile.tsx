import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, ShoppingBag, Heart, Compass, MapPin, Gift, Globe, 
  LogOut, Award, Camera, ChevronRight, Activity, 
  ArrowRight, Check, Truck} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

// Import recreated subcomponents
import { DetailsTab } from './components/DetailsTab';
import { OrdersTab } from './components/OrdersTab';
import { TrackingTab } from './components/TrackingTab';
import { AddressesTab } from './components/AddressesTab';
import { WishlistTab } from './components/WishlistTab';
import { ReferralTab } from './components/ReferralTab';
import { SettingsTab } from './components/SettingsTab';
import { VaultScratchCard } from './components/VaultScratchCard';

interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  zip: string;
  phone: string;
  isDefault?: boolean;
}

interface OrderItem {
  id: number;
  name: string;
  qty: number;
  price: number;
  img: string;
}

interface Order {
  id: string;
  date: string;
  status: 'processing' | 'shipped' | 'out_for_delivery' | 'delivered';
  total: number;
  items: OrderItem[];
  trackingNumber: string;
  estimatedDelivery: string;
}

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
    isDefault: true
  },
  {
    id: 'addr-2',
    label: 'Creative Studio',
    street: '500 Forest Avenue, Suite 12',
    city: 'Portland, ME',
    zip: '04101',
    phone: '+1 (555) 9821',
    isDefault: false
  }
];

const DEFAULT_ORDERS: Order[] = [
  {
    id: 'MK-98211',
    date: 'July 10, 2026',
    status: 'shipped',
    total: 82.00,
    trackingNumber: 'USPS-MK9821199',
    estimatedDelivery: 'July 16, 2026',
    items: [
      { id: 1, name: 'Rosewater Facial Mist', qty: 1, price: 34.00, img: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=200&auto=format&fit=crop' },
      { id: 2, name: 'Marula Nourishing Face Oil', qty: 1, price: 48.00, img: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=200&auto=format&fit=crop' }
    ]
  },
  {
    id: 'MK-87102',
    date: 'May 24, 2026',
    status: 'delivered',
    total: 42.00,
    trackingNumber: 'DHL-MK8710255',
    estimatedDelivery: 'May 28, 2026',
    items: [
      { id: 3, name: 'Aloe Vera Hydrating Gel', qty: 1, price: 42.00, img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=200&auto=format&fit=crop' }
    ]
  }
];

const DEFAULT_WISHLIST = [
  {
    id: 101,
    name: 'Squalane Radiance Glow Serum',
    price: 54.00,
    img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400&auto=format&fit=crop',
    description: 'Ultra-lightweight skin oil that deeply locks in essential moisture.',
    category: 'Face Serum'
  },
  {
    id: 102,
    name: 'Lavender Calming Hand Cream',
    price: 26.00,
    img: 'https://images.unsplash.com/photo-1601049676099-e7ed07d825b0?q=80&w=400&auto=format&fit=crop',
    description: 'Soothes rough, dry hands with nourishing organic lavender essence.',
    category: 'Hand & Body'
  }
];

export default function UserProfile({ onAddToCart, onLogout }: UserProfileProps) {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'addresses' | 'orders' | 'wishlist' | 'tracking' | 'referral' | 'settings'>('details');

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

  // Selected Order for Tracking tab
  const [selectedTrackingOrder, setSelectedTrackingOrder] = useState<Order>(DEFAULT_ORDERS[0]);

  // Settings states
  const [copiedReferral, setCopiedReferral] = useState(false);

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
  }, [navigate]);

  if (!user) return null;

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { ...user, fullName: editName, phone: editPhone };
    setUser(updated);
    localStorage.setItem('morkins_logged_in_user', JSON.stringify(updated));

    // Update in simulated accounts list
    const accounts = JSON.parse(localStorage.getItem('morkins_simulated_users') || '[]');
    const index = accounts.findIndex((a: any) => a.email?.toLowerCase() === user.email?.toLowerCase());
    if (index !== -1) {
      accounts[index].fullName = editName;
      accounts[index].phone = editPhone;
      localStorage.setItem('morkins_simulated_users', JSON.stringify(accounts));
    }

    setIsEditingUser(false);
  };

  // Profile Image Upload
  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const updated = { ...user, profileImage: base64String };
        setUser(updated);
        localStorage.setItem('morkins_logged_in_user', JSON.stringify(updated));

        // Update in simulated accounts list
        const accounts = JSON.parse(localStorage.getItem('morkins_simulated_users') || '[]');
        const index = accounts.findIndex((a: any) => a.email?.toLowerCase() === user.email?.toLowerCase());
        if (index !== -1) {
          accounts[index].profileImage = base64String;
          localStorage.setItem('morkins_simulated_users', JSON.stringify(accounts));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Addresses CRUD
  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addrLabel || !addrStreet || !addrCity || !addrZip) return;

    let updatedAddrs = [...addresses];
    if (editingAddressId) {
      updatedAddrs = updatedAddrs.map(addr =>
        addr.id === editingAddressId
          ? { id: addr.id, label: addrLabel, street: addrStreet, city: addrCity, zip: addrZip, phone: addrPhone, isDefault: addr.isDefault }
          : addr
      );
    } else {
      const newAddr: Address = {
        id: `addr-${Date.now()}`,
        label: addrLabel,
        street: addrStreet,
        city: addrCity,
        zip: addrZip,
        phone: addrPhone,
        isDefault: addresses.length === 0
      };
      updatedAddrs.push(newAddr);
    }

    setAddresses(updatedAddrs);
    localStorage.setItem(`morkins_addresses_${user.email}`, JSON.stringify(updatedAddrs));
    resetAddressForm();
  };

  const handleEditAddress = (addr: Address) => {
    setEditingAddressId(addr.id);
    setAddrLabel(addr.label);
    setAddrStreet(addr.street);
    setAddrCity(addr.city);
    setAddrZip(addr.zip);
    setAddrPhone(addr.phone);
    setShowAddressForm(true);
  };

  const handleDeleteAddress = (id: string) => {
    const updated = addresses.filter(addr => addr.id !== id);
    setAddresses(updated);
    localStorage.setItem(`morkins_addresses_${user.email}`, JSON.stringify(updated));
  };

  const resetAddressForm = () => {
    setShowAddressForm(false);
    setEditingAddressId(null);
    setAddrLabel('');
    setAddrStreet('');
    setAddrCity('');
    setAddrZip('');
    setAddrPhone('');
  };

  const handleRemoveWishlist = (id: number) => {
    const updated = wishlist.filter(item => item.id !== id);
    setWishlist(updated);
    localStorage.setItem(`morkins_wishlist_${user.email}`, JSON.stringify(updated));
  };

  const handleCopyReferral = () => {
    const referralLink = `${window.location.origin}/?ref=${user.fullName?.toLowerCase().replace(/\s+/g, '-') || 'patron'}`;
    navigator.clipboard.writeText(referralLink);
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2000);
  };

  const trackingSteps = [
    { label: t('track_placed'), desc: t('track_placed_desc'), time: 'July 10, 10:24 AM', completed: true },
    { label: t('track_processing'), desc: t('track_processing_desc'), time: 'July 11, 02:40 PM', completed: true },
    { label: t('track_shipped'), desc: t('track_shipped_desc'), time: 'July 13, 09:12 AM', completed: selectedTrackingOrder.status !== 'processing' },
    { label: t('track_out'), desc: t('track_out_desc'), time: 'July 15, 08:30 AM', completed: ['out_for_delivery', 'delivered'].includes(selectedTrackingOrder.status) },
    { label: t('track_delivered'), desc: t('track_delivered_desc'), time: 'July 16, Expected', completed: selectedTrackingOrder.status === 'delivered' }
  ];

  const navigationTabs = [
    { id: 'details', label: 'Personal Information', icon: User },
    { id: 'orders', label: 'Order History', icon: ShoppingBag, count: DEFAULT_ORDERS.length },
    { id: 'tracking', label: 'Order Tracking', icon: Compass, alert: true },
    { id: 'addresses', label: 'Saved Addresses', icon: MapPin, count: addresses.length },
    { id: 'wishlist', label: 'My Wishlist', icon: Heart, count: wishlist.length },
    { id: 'referral', label: 'VIP Rewards & Referrals', icon: Gift, highlight: true },
    { id: 'settings', label: 'Preferences & Settings', icon: Globe }
  ];

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

      <div className="max-w-7xl mx-auto">
        
        {/* ── 1. Unified Executive Patron Sanctuary Dashboard Container ── */}
        <div className="bg-white/95 rounded-xl border border-[#DDD3C1] shadow-[0_8px_32px_rgba(18,96,47,0.06)] mb-8 relative overflow-hidden backdrop-blur-md">
          {/* Top Gold & Emerald Gradient Shimmer Line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-[#12602F] via-[#C49746] to-[#AFD971]" />
          
          {/* Subtle Ambient Glows */}
          <div className="absolute -top-16 -right-16 w-60 h-60 bg-[#AFD971]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-60 h-60 bg-[#12602F]/5 rounded-full blur-3xl pointer-events-none" />

          {/* ── TOP SECTION: 3 Columns (Profile, Shipment Radar, Vault) ── */}
          <div className="p-6 sm:p-7 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Col 1 (5 cols): Patron Profile & Identity */}
              <div className="lg:col-span-5 flex items-center gap-4 sm:gap-5">
                {/* Double-Ring Luxury Avatar Stage */}
                <div className="relative shrink-0">
                  <div className="p-1 rounded-full bg-linear-to-br from-[#EFE8D8] via-[#FAF8F2] to-[#DDD3C1] shadow-md">
                    <div 
                      onClick={triggerImageUpload}
                      className="w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-[#FAF8F2] text-[#12602F] font-serif flex items-center justify-center text-3xl font-bold ring-2 ring-[#C49746]/40 shadow-inner relative overflow-hidden group cursor-pointer active:scale-95 transition-all"
                      title="Click to update photo"
                    >
                      {user.profileImage ? (
                        <img src={user.profileImage} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-bold text-[#12602F]">{user.fullName ? user.fullName[0].toUpperCase() : 'P'}</span>
                      )}
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-2xs flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Camera className="w-4.5 h-4.5 text-[#AFD971]" />
                        <span className="text-[8px] font-bold text-white uppercase mt-0.5 tracking-wider">Edit</span>
                      </div>
                    </div>
                  </div>
                  {/* Verified Dot */}
                  <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#12602F] border-2 border-white flex items-center justify-center text-[#AFD971] shadow-md" title="Verified Patron">
                    <Check className="w-3.5 h-3.5 stroke-3" />
                  </div>
                </div>

                {/* Identity Info */}
                <div className="min-w-0 flex-1 space-y-1">
                

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C2E1A] truncate tracking-tight">
                    {user.fullName || 'Valued Patron'}
                  </h2>

                  <p className="text-xs text-[#464D3F] font-mono truncate">
                    {user.email}
                  </p>

                  {/* Refined Action Pill Buttons */}
                  <div className="flex items-center gap-2 pt-1.5">
                    <button
                      onClick={() => {
                        setActiveTab('details');
                        setIsEditingUser(true);
                      }}
                      className="px-3 py-1 bg-[#FAF8F2] hover:bg-[#12602F] text-[#12602F] hover:text-[#AFD971] border border-[#DDD3C1] hover:border-[#12602F] rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-200 shadow-2xs active:scale-95 flex items-center gap-1.5 cursor-pointer"
                    >
                      <User className="w-3 h-3" />
                      <span>Edit Profile</span>
                    </button>

                    <button
                      onClick={onLogout}
                      className="px-3 py-1 bg-[#FAF8F2] hover:bg-rose-50 text-[#464D3F] hover:text-rose-700 border border-[#DDD3C1] hover:border-rose-200 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-200 shadow-2xs active:scale-95 flex items-center gap-1.5 cursor-pointer"
                    >
                      <LogOut className="w-3 h-3" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Col 2 (4 cols): Active Order Radar (Luminous Card) */}
              <div className="lg:col-span-4 bg-linear-to-br from-[#FAF8F2] via-white to-[#F7F4EB] p-4 sm:p-5 rounded-xl border border-[#DDD3C1] shadow-2xs hover:border-[#12602F]/40 transition-all space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#12602F] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#12602F]"></span>
                    </span>
                    <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#8C6221]">
                      Active Shipment Radar
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#1C2E1A] bg-white px-2 py-0.5 rounded-md border border-[#DDD3C1] shadow-2xs">
                    {selectedTrackingOrder.id}
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-[#E5DEC9]">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#12602F] shadow-2xs shrink-0">
                    <Truck className="w-4.5 h-4.5 text-[#12602F]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#1C2E1A] truncate">
                      {selectedTrackingOrder.status.replace(/_/g, ' ').toUpperCase()} • Arriving {selectedTrackingOrder.estimatedDelivery}
                    </p>
                    <p className="text-[11px] text-[#464D3F] truncate mt-0.5">
                      {selectedTrackingOrder.items[0]?.name || 'Botanical Formulation'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('tracking')}
                  className="w-full py-2 bg-[#12602F] hover:bg-[#0E4F26] text-[#AFD971] text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all duration-200 shadow-xs active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer group"
                >
                  <span>Track Live Delivery</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Col 3 (3 cols): 180° 3D Flippable Patron Vault & Scratch Coupon Card */}
              <VaultScratchCard 
                userEmail={user?.email || 'patron@morkins.com'} 
                points={380} 
                tier="Gold" 
                nextTierPoints={120} 
              />

            </div>
          </div>

          {/* ── BOTTOM SECTION: 4 KPI Metrics Integrated Row ── */}
          <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-2 border-t border-[#E5DEC9]/80 bg-linear-to-b from-[#FCFBF8] to-[#FAF8F2] relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 pt-4">
              {[
                {
                  id: 'referral',
                  label: 'Patron Loyalty Points',
                  value: '380 Pts',
                  desc: '$38.00 Reward Value',
                  icon: Award,
                  tag: 'Redeem',
                  accent: 'text-[#C49746] bg-amber-50 border-amber-200/80 hover:border-[#C49746]'
                },
                {
                  id: 'orders',
                  label: 'Total Orders Placed',
                  value: `${DEFAULT_ORDERS.length} Orders`,
                  desc: '1 Active In-Transit Shipment',
                  icon: ShoppingBag,
                  tag: 'Track',
                  accent: 'text-[#12602F] bg-emerald-50 border-emerald-200/80 hover:border-[#12602F]'
                },
                {
                  id: 'wishlist',
                  label: 'Saved Harvest Wishlist',
                  value: `${wishlist.length} Formulas`,
                  desc: 'Ready for Quick Bag Add',
                  icon: Heart,
                  tag: 'View',
                  accent: 'text-rose-600 bg-rose-50 border-rose-200/80 hover:border-rose-400'
                },
                {
                  id: 'tracking',
                  label: 'Sustainability Index',
                  value: '4.8 kg CO₂',
                  desc: '100% Eco-Neutral Delivery',
                  icon: Activity,
                  tag: 'Eco-Cert',
                  accent: 'text-sky-700 bg-sky-50 border-sky-200/80 hover:border-sky-400'
                }
              ].map((stat, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveTab(stat.id as any);
                    setShowAddressForm(false);
                  }}
                  className="bg-white rounded-2xl p-3.5 sm:p-4 border border-[#DDD3C1] shadow-2xs hover:shadow-md hover:border-[#12602F] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-3 text-left cursor-pointer group"
                >
                  <div className={`p-2.5 rounded-xl border ${stat.accent} shrink-0 shadow-2xs group-hover:scale-105 transition-transform`}>
                    <stat.icon className="w-4.5 h-4.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[9px] uppercase tracking-wider text-[#8C6221] font-bold truncate">
                        {stat.label}
                      </span>
                      <span className="text-[9px] font-mono font-bold text-gray-400 group-hover:text-[#12602F] transition-colors shrink-0">
                        {stat.tag} →
                      </span>
                    </div>
                    <h4 className="font-serif text-base sm:text-lg font-bold text-[#1C2E1A] mt-0.5">
                      {stat.value}
                    </h4>
                    <p className="text-[10px] text-[#464D3F] font-light truncate mt-0.5">
                      {stat.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* ── 3. Main Body: Sticky Sidebar Navigation & Tab Content ── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Left: Navigation Sidebar */}
          <div className="lg:col-span-1 bg-white border border-[#DDD3C1] rounded-2xl p-4 sm:p-5 shadow-2xs sticky top-24 space-y-3">
            <div className="px-3 pb-2 border-b border-[#E5DEC9] flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#8C6221]">
                SANCTUARY VAULT
              </span>
              <span className="w-2 h-2 rounded-full bg-[#12602F] animate-pulse" />
            </div>

            <nav className="flex flex-col gap-1.5">
              {navigationTabs.map(tab => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      setShowAddressForm(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      isActive 
                        ? 'bg-linear-to-r from-[#12602F] to-[#1F7A3E] text-[#AFD971] shadow-xs scale-100 border border-[#AFD971]/30' 
                        : 'text-[#464D3F] hover:text-[#12602F] hover:bg-[#FAF8F2]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <tab.icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#AFD971]' : 'text-[#8C6221]'}`} />
                      <span className="truncate">{tab.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {tab.count !== undefined && (
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                          isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {tab.count}
                        </span>
                      )}
                      {tab.highlight && !isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      )}
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${
                        isActive ? 'translate-x-0.5 text-[#AFD971]' : 'text-gray-400'
                      }`} />
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right: Active Tab Details Panel */}
          <div className="lg:col-span-3 min-h-[500px]">
            
            {/* TAB: PERSONAL DETAILS */}
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

            {/* TAB: ORDER HISTORY */}
            {activeTab === 'orders' && (
              <OrdersTab 
                orders={DEFAULT_ORDERS}
                setSelectedTrackingOrder={setSelectedTrackingOrder}
                setActiveTab={setActiveTab}
                onAddToCart={onAddToCart}
                t={t}
              />
            )}

            {/* TAB: ORDER TRACKING */}
            {activeTab === 'tracking' && (
              <TrackingTab 
                selectedTrackingOrder={selectedTrackingOrder}
                trackingSteps={trackingSteps}
                setActiveTab={setActiveTab}
                t={t}
              />
            )}

            {/* TAB: SAVED ADDRESSES */}
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

            {/* TAB: WISHLIST */}
            {activeTab === 'wishlist' && (
              <WishlistTab 
                wishlist={wishlist}
                handleRemoveWishlist={handleRemoveWishlist}
                onAddToCart={onAddToCart}
                t={t}
              />
            )}

            {/* TAB: REFERRALS & REWARDS */}
            {activeTab === 'referral' && (
              <ReferralTab 
                user={user}
                copiedReferral={copiedReferral}
                handleCopyReferral={handleCopyReferral}
                t={t}
              />
            )}

            {/* TAB: PREFERENCES & SETTINGS */}
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
    </div>
  );
}
