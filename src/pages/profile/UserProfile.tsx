import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, ShoppingBag, Heart, Compass, MapPin, Gift, Globe, 
  LogOut, Award, Camera, ChevronRight, Activity 
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

// Import subcomponents
import { DetailsTab } from './components/DetailsTab';
import { OrdersTab } from './components/OrdersTab';
import { TrackingTab } from './components/TrackingTab';
import { AddressesTab } from './components/AddressesTab';
import { WishlistTab } from './components/WishlistTab';
import { ReferralTab } from './components/ReferralTab';
import { SettingsTab } from './components/SettingsTab';

interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  zip: string;
  phone: string;
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
  onAddToCart: (product: { id: number; name: string; price: number; img: string }) => void;
  onLogout: () => void;
}

const DEFAULT_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    label: 'Home Sanctuary',
    street: '742 Evergreen Terrace',
    city: 'Springfield, IL',
    zip: '62704',
    phone: '+1 (555) 0199'
  },
  {
    id: 'addr-2',
    label: 'Creative Studio',
    street: '500 Forest Avenue, Suite 12',
    city: 'Portland, ME',
    zip: '04101',
    phone: '+1 (555) 9821'
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
    description: 'Ultra-lightweight skin oil that deeply locks in essential moisture.'
  },
  {
    id: 102,
    name: 'Lavender Calming Hand Cream',
    price: 26.00,
    img: 'https://images.unsplash.com/photo-1601049676099-e7ed07d825b0?q=80&w=400&auto=format&fit=crop',
    description: 'Soothes rough, dry hands with nourishing organic lavender essence.'
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

    // Also update in simulated accounts list
    const accounts = JSON.parse(localStorage.getItem('morkins_simulated_users') || '[]');
    const index = accounts.findIndex((a: any) => a.email.toLowerCase() === user.email.toLowerCase());
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
        const index = accounts.findIndex((a: any) => a.email.toLowerCase() === user.email.toLowerCase());
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
          ? { id: addr.id, label: addrLabel, street: addrStreet, city: addrCity, zip: addrZip, phone: addrPhone }
          : addr
      );
    } else {
      const newAddr: Address = {
        id: `addr-${Date.now()}`,
        label: addrLabel,
        street: addrStreet,
        city: addrCity,
        zip: addrZip,
        phone: addrPhone
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
    const referralLink = `${window.location.origin}/?ref=${user.fullName?.toLowerCase().replace(/\s+/g, '-') || 'member'}`;
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

  return (
    <div className="py-12 px-4 md:px-6 max-w-7xl mx-auto font-sans text-brand-dark animate-fade-in">
      
      {/* Hidden File Input for Avatar Upload */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImageUpload} 
        className="hidden" 
        accept="image/*" 
      />

      {/* Luxury Cover Header Banner */}
      <div className="relative h-48 md:h-84 rounded-lg overflow-hidden mb-12 shadow-md border border-brand-dark/10">
        <img
          src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80"
          alt="Botanical Background"
          className="w-full h-full object-cover brightness-[0.8] scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

        {/* Sign Out on Cover Header */}
        <button
          onClick={onLogout}
          className="absolute bottom-2 right-2 flex items-center space-x-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 border border-black/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md cursor-pointer transition-all active:scale-95"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>{t('nav_signout')}</span>
        </button>

        {/* Floating User Cover Badge */}
        <div className="absolute bottom-6 left-6 md:left-10 flex items-center space-x-4 md:space-x-6">
          {/* Avatar Container with Upload Feature */}
          <div 
            onClick={triggerImageUpload}
            className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-brand-cream text-brand-light font-serif flex items-center justify-center text-2xl md:text-4xl font-bold border-4 border-white/95 shadow-lg select-none relative overflow-hidden group cursor-pointer active:scale-95 transition-all"
          >
            {user.profileImage ? (
              <img 
                src={user.profileImage} 
                alt="Profile Avatar" 
                className="w-full h-full object-cover rounded-full" 
              />
            ) : (
              <span>{user.fullName ? user.fullName[0].toUpperCase() : 'U'}</span>
            )}
            
            {/* Upload Overlay on Hover */}
            <div className="absolute inset-0 bg-brand-dark/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Camera className="w-4 h-4 md:w-6 md:h-6 text-white" />
              <span className="text-[7px] md:text-[9px] uppercase font-bold text-white tracking-widest mt-1">Upload</span>
            </div>
          </div>

          <div className="text-white">
            <div className="flex items-center space-x-2">
              <h2 className="font-serif text-xl md:text-3xl font-extrabold tracking-wide">{user.fullName || 'Valued Member'}</h2>
              <span className="bg-brand-accent/25 border border-brand-accent/30 text-brand-accent text-[9px] uppercase font-extrabold tracking-widest px-2.5 py-0.5 rounded-full backdrop-blur-sm flex items-center space-x-1">
                <Award className="w-3 h-3 text-brand-accent" />
                <span>{t('profile_vip')}</span>
              </span>
            </div>
            <p className="text-[10px] md:text-xs text-white/70 font-mono tracking-widest uppercase mt-0.5">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Gamified Skincare Loyalty Stats Widget */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: t('profile_loyalty_pts'), value: '380 pts', desc: t('profile_pts_desc'), icon: Award },
          { label: t('profile_orders_placed'), value: '02 Orders', desc: t('profile_orders_desc'), icon: ShoppingBag },
          { label: t('profile_wishlist_rout'), value: `${wishlist.length} Items`, desc: t('profile_wishlist_desc'), icon: Heart },
          { label: t('profile_carbon'), value: '4.8 kg CO₂', desc: t('profile_carbon_desc'), icon: Activity }
        ].map((stat, i) => (
          <div key={i} className="bg-white/60 border border-brand-dark/10 p-5 rounded-3xl flex items-center space-x-4 shadow-3xs backdrop-blur-xs">
            <div className="p-3 bg-brand-cream rounded-2xl border border-brand-dark/5 text-brand-light">
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-wider text-brand-dark/50 font-bold">{stat.label}</p>
              <h4 className="font-serif text-lg font-bold text-brand-light">{stat.value}</h4>
              <p className="text-[9px] text-brand-dark/60 font-light mt-0.5">{stat.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Left Interactive Sidebar Menu matching the requested layout */}
        <div className="lg:col-span-1 bg-white border border-brand-dark/10 rounded-[32px] p-5 shadow-sm space-y-5">
          <p className="text-[10px] uppercase tracking-widest font-extrabold text-brand-dark/35 px-4">YOUR SANCTUARY</p>
          <nav className="flex flex-col space-y-2">
            {[
              { id: 'details', label: 'PERSONAL INFORMATION', icon: User },
              { id: 'orders', label: 'ORDER HISTORY', icon: ShoppingBag },
              { id: 'tracking', label: 'ORDER TRACKING', icon: Compass },
              { id: 'addresses', label: 'SAVED ADDRESSES', icon: MapPin },
              { id: 'wishlist', label: 'MY WISHLIST', icon: Heart },
              { id: 'referral', label: 'REFER A FRIEND', icon: Gift },
              { id: 'settings', label: 'PREFERENCES', icon: Globe }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setShowAddressForm(false);
                }}
                className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl text-left text-xs font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === tab.id 
                    ? 'bg-[#134031] text-white shadow-md scale-[1.01]' 
                    : 'text-brand-light/75 hover:text-[#134031] hover:bg-brand-cream-dark/30'
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  <tab.icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeTab === tab.id ? 'translate-x-0.5 text-white' : 'text-brand-light/50'}`} />
              </button>
            ))}
          </nav>
        </div>

        {/* Right Active Details Panel */}
        <div className="lg:col-span-3 min-h-[400px]">
          
          {/* TAB: DETAILS */}
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

          {/* TAB: ORDERS */}
          {activeTab === 'orders' && (
            <OrdersTab 
              orders={DEFAULT_ORDERS}
              setSelectedTrackingOrder={setSelectedTrackingOrder}
              setActiveTab={setActiveTab}
              t={t}
            />
          )}

          {/* TAB: TRACKING */}
          {activeTab === 'tracking' && (
            <TrackingTab 
              selectedTrackingOrder={selectedTrackingOrder}
              trackingSteps={trackingSteps}
              t={t}
            />
          )}

          {/* TAB: ADDRESSES */}
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

          {/* TAB: REFERRAL */}
          {activeTab === 'referral' && (
            <ReferralTab 
              user={user}
              copiedReferral={copiedReferral}
              handleCopyReferral={handleCopyReferral}
              t={t}
            />
          )}

          {/* TAB: SETTINGS & PREFERENCES */}
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
  );
}
