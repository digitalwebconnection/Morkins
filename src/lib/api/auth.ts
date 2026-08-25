import type { User, Address } from '../../types'

const USER_STORAGE_KEY = 'morkins_logged_in_user';
const ADDRESSES_STORAGE_KEY = 'morkins_user_addresses';

export async function getCurrentUser(): Promise<User | null> {
  const data = localStorage.getItem(USER_STORAGE_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export async function loginUser(credentials: { emailOrPhone: string; otp?: string; password?: string }): Promise<User> {
  // Mock login logic
  const isEmail = credentials.emailOrPhone.includes('@');
  const user: User = {
    id: 'usr_' + Math.random().toString(36).substr(2, 9),
    name: isEmail ? credentials.emailOrPhone.split('@')[0] : 'Member',
    email: isEmail ? credentials.emailOrPhone : `${credentials.emailOrPhone}@user.morkins.com`,
    phone: isEmail ? '+91 98765 43210' : credentials.emailOrPhone,
    gender: 'Prefer not to say',
    skinType: 'Combination',
    skinConcerns: ['Hydration', 'Glow'],
    loyaltyPoints: 350,
    referralCode: 'MORKINS' + Math.floor(1000 + Math.random() * 9000),
  };
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  return user;
}

export async function logoutUser(): Promise<void> {
  localStorage.removeItem(USER_STORAGE_KEY);
}

export async function updateProfile(userData: Partial<User>): Promise<User> {
  const current = await getCurrentUser() || {
    name: 'Member',
    email: 'member@morkins.com',
    phone: '+91 98765 43210',
  };
  const updated = { ...current, ...userData };
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export async function getUserAddresses(): Promise<Address[]> {
  const data = localStorage.getItem(ADDRESSES_STORAGE_KEY);
  if (!data) {
    return [
      {
        id: 'addr_1',
        type: 'Home',
        name: 'Aarav Sharma',
        phone: '+91 98765 43210',
        street: 'Flat 402, Lotus Grandeur, Linking Road',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400050',
        isDefault: true,
      },
    ];
  }
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function saveUserAddresses(addresses: Address[]): Promise<void> {
  localStorage.setItem(ADDRESSES_STORAGE_KEY, JSON.stringify(addresses));
}
