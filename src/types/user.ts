export interface Address {
  id: string;
  type: 'Home' | 'Work' | 'Other';
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface User {
  id?: string;
  name: string;
  email: string;
  phone: string;
  gender?: string;
  dob?: string;
  skinType?: string;
  skinConcerns?: string[];
  loyaltyPoints?: number;
  referralCode?: string;
  avatar?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAuthOpen: boolean;
  isAuthDrawerOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  openAuthDrawer: () => void;
  closeAuthDrawer: () => void;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}
