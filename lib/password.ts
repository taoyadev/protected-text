export {
  getPasswordScore,
  isPasswordValid,
  isShortPasswordValid,
  validatePassword,
  passwordsMatch,
  MIN_PASSWORD_LENGTH,
  MIN_SHORT_PASSWORD_LENGTH,
} from './password-service';

// Re-export types from shared types file
export type { PasswordScore } from './types';
export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
}

export enum PasswordStrength {
  WEAK = 0,
  FAIR = 1,
  OKAY = 2,
  GOOD = 3,
  STRONG = 4,
}
