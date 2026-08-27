export interface Address {
  id: string;
  label?: string;
  type?: 'Home' | 'Work' | 'Other';
  name?: string;
  phone?: string;
  street: string;
  city: string;
  state?: string;
  pincode?: string;
  zip?: string;
  isDefault?: boolean;
}

export interface User {
  id?: string;
  name?: string;
  fullName?: string;
  email: string;
  phone?: string;
  country?: string;
  profileImage?: string;
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
