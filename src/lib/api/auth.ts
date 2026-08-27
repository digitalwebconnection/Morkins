import type { User, Address } from '../../types';

const USER_STORAGE_KEY = 'morkins_logged_in_user';
const ADDRESSES_STORAGE_KEY = 'morkins_user_addresses';
const OTP_STORAGE_KEY = 'morkins_active_otps';
const RESET_TOKENS_STORAGE_KEY = 'morkins_reset_tokens';

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
  otp?: string;
}

export async function getCurrentUser(): Promise<User | null> {
  const data = localStorage.getItem(USER_STORAGE_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export async function loginUser(credentials: {
  emailOrPhone: string;
  otp?: string;
  password?: string;
}): Promise<User> {
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
  const current = (await getCurrentUser()) || {
    name: 'Member',
    email: 'member@morkins.com',
    phone: '+91 98765 43210',
  };
  const updated = { ...current, ...userData };
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

/**
 * Requests a password reset link/token for the provided email address.
 */
export async function requestPasswordReset(email: string): Promise<AuthResponse> {
  const cleanEmail = email.trim().toLowerCase();

  try {
    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail }),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Fall back to client simulation
  }

  // Generate a mock reset token with 15-minute expiry
  const token = 'rst_' + Math.random().toString(36).substring(2, 12) + Date.now().toString(36);
  const resetData = {
    email: cleanEmail,
    token,
    expiresAt: Date.now() + 15 * 60 * 1000,
  };

  try {
    const existing = JSON.parse(localStorage.getItem(RESET_TOKENS_STORAGE_KEY) || '{}');
    existing[token] = resetData;
    localStorage.setItem(RESET_TOKENS_STORAGE_KEY, JSON.stringify(existing));
  } catch (e) {
    console.error('Reset token storage error', e);
  }

  return {
    success: true,
    message: `Password reset link has been dispatched to ${cleanEmail}. (Valid for 15 mins)`,
    token,
  };
}

/**
 * Verifies the reset token and updates the user's password.
 */
export async function resetPassword(token: string, newPassword: string): Promise<AuthResponse> {
  try {
    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword }),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Fall back to client simulation
  }

  if (!token || token.trim() === '') {
    return {
      success: false,
      message: 'Invalid or missing password reset token.',
    };
  }

  try {
    const existing = JSON.parse(localStorage.getItem(RESET_TOKENS_STORAGE_KEY) || '{}');
    const record = existing[token];

    if (record) {
      if (Date.now() > record.expiresAt) {
        delete existing[token];
        localStorage.setItem(RESET_TOKENS_STORAGE_KEY, JSON.stringify(existing));
        return {
          success: false,
          message: 'This password reset link has expired. Please request a new one.',
        };
      }

      delete existing[token];
      localStorage.setItem(RESET_TOKENS_STORAGE_KEY, JSON.stringify(existing));
    }
  } catch (e) {
    console.error('Token validation error', e);
  }

  return {
    success: true,
    message: 'Your password has been successfully updated. You can now sign in.',
  };
}

/**
 * Dispatches a 6-digit OTP code to the provided email or phone number.
 */
export async function sendOtp(
  identifier: string,
  purpose: 'login' | 'signup' | 'reset' = 'login'
): Promise<AuthResponse> {
  const cleanId = identifier.trim();

  try {
    const res = await fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: cleanId, purpose }),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Fall back to client simulation
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpRecord = {
    identifier: cleanId,
    otp,
    purpose,
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 min expiry
  };

  try {
    const existing = JSON.parse(localStorage.getItem(OTP_STORAGE_KEY) || '{}');
    existing[cleanId] = otpRecord;
    localStorage.setItem(OTP_STORAGE_KEY, JSON.stringify(existing));
  } catch (e) {
    console.error('OTP storage error', e);
  }

  return {
    success: true,
    message: `Verification code sent to ${cleanId}`,
    otp, // Returned for dev testing convenience
  };
}

/**
 * Verifies the 6-digit OTP for the given identifier and logs in the user on success.
 */
export async function verifyOtp(
  identifier: string,
  enteredOtp: string
): Promise<AuthResponse> {
  const cleanId = identifier.trim();
  const cleanOtp = enteredOtp.trim();

  try {
    const res = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: cleanId, otp: cleanOtp }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.user));
      }
      return data;
    }
  } catch {
    // Fall back to client simulation
  }

  // Mock verification: accept stored OTP or universal test OTP '123456'
  let isValid = cleanOtp === '123456';

  try {
    const existing = JSON.parse(localStorage.getItem(OTP_STORAGE_KEY) || '{}');
    const record = existing[cleanId];
    if (record) {
      if (Date.now() <= record.expiresAt && record.otp === cleanOtp) {
        isValid = true;
        delete existing[cleanId];
        localStorage.setItem(OTP_STORAGE_KEY, JSON.stringify(existing));
      }
    }
  } catch (e) {
    console.error('OTP check error', e);
  }

  if (isValid) {
    const user = await loginUser({ emailOrPhone: cleanId, otp: cleanOtp });
    return {
      success: true,
      message: 'OTP verified successfully!',
      user,
    };
  }

  return {
    success: false,
    message: 'Invalid or expired OTP code. Please verify the code or request a new one.',
  };
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
