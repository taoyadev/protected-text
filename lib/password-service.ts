import type { PasswordScore } from './types';

// Minimum password requirements
export const MIN_PASSWORD_LENGTH = 8;
export const MIN_SHORT_PASSWORD_LENGTH = 4;

// Password strength levels
export enum PasswordStrength {
  WEAK = 0,
  FAIR = 1,
  OKAY = 2,
  GOOD = 3,
  STRONG = 4,
}

// Calculate password strength score
export function getPasswordScore(password: string): PasswordScore {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  const labels = ['Weak', 'Fair', 'Okay', 'Good', 'Strong'];
  const colors = [
    'bg-red-400',
    'bg-orange-400',
    'bg-amber-400',
    'bg-lime-400',
    'bg-emerald-400',
  ];

  return {
    score,
    label: labels[Math.min(score, labels.length - 1)],
    color: colors[Math.min(score, colors.length - 1)],
  };
}

// Check if password meets minimum requirements
export function isPasswordValid(password: string): boolean {
  return password.length >= MIN_PASSWORD_LENGTH;
}

// Check if password meets short requirements (for password change)
export function isShortPasswordValid(password: string): boolean {
  return password.length >= MIN_SHORT_PASSWORD_LENGTH;
}

// Validate password requirements with detailed feedback
export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validatePassword(
  password: string,
  requireStrong: boolean = true,
): PasswordValidationResult {
  const errors: string[] = [];
  const minLength = requireStrong
    ? MIN_PASSWORD_LENGTH
    : MIN_SHORT_PASSWORD_LENGTH;

  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Compare two passwords for confirmation
export function passwordsMatch(password: string, confirm: string): boolean {
  return password === confirm && password.length > 0;
}
