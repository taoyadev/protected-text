/**
 * Enhanced i18n system for Protected Text
 *
 * Supports 8 languages with locale-based routing (/en/, /zh/, etc.)
 * Provides both client-side hooks and server-side utilities
 */

import { en, type Translations } from './locales/en';
import { zh } from './locales/zh';
import { es } from './locales/es';
import { fr } from './locales/fr';
import { de } from './locales/de';
import { ja } from './locales/ja';
import { pt } from './locales/pt';
import { ru } from './locales/ru';

// Supported locales
export const locales = [
  'en',
  'zh',
  'es',
  'fr',
  'de',
  'ja',
  'pt',
  'ru',
] as const;
export type Locale = (typeof locales)[number];

// Default locale
export const defaultLocale: Locale = 'en';

// Language display names
export const languages: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  ja: '日本語',
  pt: 'Português',
  ru: 'Русский',
};

// All translations
const translations: Record<Locale, Translations> = {
  en,
  zh,
  es,
  fr,
  de,
  ja,
  pt,
  ru,
};

/**
 * Get translations for a specific locale
 */
export function getTranslations(locale: Locale): Translations {
  return translations[locale] || translations.en;
}

/**
 * Detect locale from browser/navigator
 */
export function detectBrowserLocale(): Locale {
  if (typeof navigator === 'undefined') return defaultLocale;

  const browserLang = navigator.language.split('-')[0];
  return locales.includes(browserLang as Locale)
    ? (browserLang as Locale)
    : defaultLocale;
}

/**
 * Get locale from localStorage
 */
export function getStoredLocale(): Locale | null {
  if (typeof window === 'undefined') return null;

  const stored = localStorage.getItem('locale');
  return stored && locales.includes(stored as Locale)
    ? (stored as Locale)
    : null;
}

/**
 * Store locale preference
 */
export function setStoredLocale(locale: Locale): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('locale', locale);
}

/**
 * Validate if a string is a valid locale
 */
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

/**
 * Format date according to locale
 */
export function formatDate(
  date: Date,
  locale: Locale,
  options?: Intl.DateTimeFormatOptions,
): string {
  return new Intl.DateTimeFormat(locale, options).format(date);
}

/**
 * Format time according to locale
 */
export function formatTime(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);
}

/**
 * Format number according to locale
 */
export function formatNumber(
  num: number,
  locale: Locale,
  options?: Intl.NumberFormatOptions,
): string {
  return new Intl.NumberFormat(locale, options).format(num);
}

/**
 * Simple string interpolation
 * Replaces {key} with values from params object
 */
export function interpolate(
  str: string,
  params?: Record<string, string | number>,
): string {
  if (!params) return str;

  return Object.entries(params).reduce((result, [key, value]) => {
    return result.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value));
  }, str);
}

/**
 * Type-safe translation key accessor
 * Supports nested keys like 'common.actions.save'
 */
type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? K | `${K}.${NestedKeyOf<T[K]>}`
          : K
        : never;
    }[keyof T]
  : never;

export type TranslationKey = NestedKeyOf<Translations>;

/**
 * Get nested value from object using dot notation
 */
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

/**
 * Server-side translation function
 * Use this in Server Components
 */
export function getT(locale: Locale) {
  const trans = getTranslations(locale);

  return (
    key: TranslationKey,
    params?: Record<string, string | number>,
  ): string => {
    const value = getNestedValue(trans, key);
    if (typeof value !== 'string') {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return interpolate(value, params);
  };
}

/**
 * Get alternate language URLs for SEO
 */
export function getAlternateUrls(
  pathname: string,
): Array<{ locale: Locale; href: string }> {
  // Remove leading locale if present
  const pathWithoutLocale =
    pathname.replace(/^\/(en|zh|es|fr|de|ja|pt|ru)/, '') || '/';

  return locales.map((locale) => ({
    locale,
    href: `/${locale}${pathWithoutLocale}`,
  }));
}
