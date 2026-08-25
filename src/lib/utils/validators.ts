/**
 * Validate an email address
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validate a phone number (standard 10-digit Indian/US phone)
 */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 15;
}

/**
 * Validate standard 6-digit Indian PIN code or 5-digit US ZIP code
 */
export function isValidPostalCode(code: string): boolean {
  const cleaned = code.trim();
  return /^\d{5,6}$/.test(cleaned);
}
