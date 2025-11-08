'use client';

import { createContext, useContext, ReactNode } from 'react';
import { type Locale, type TranslationKey, getTranslations, interpolate } from './i18n';

// React Context for client components
const LocaleContext = createContext<{
  locale: Locale;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}>({
  locale: 'en',
  t: (key) => key,
});

/**
 * Get nested value from object using dot notation
 */
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

/**
 * Provider component for client-side i18n
 */
export function I18nProvider({
  children,
  locale
}: {
  children: ReactNode;
  locale: Locale;
}) {
  const trans = getTranslations(locale);

  const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
    const value = getNestedValue(trans, key);
    if (typeof value !== 'string') {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return interpolate(value, params);
  };

  return (
    <LocaleContext.Provider value={{ locale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

/**
 * Hook for client components to access translations
 */
export function useTranslation() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useTranslation must be used within I18nProvider');
  }
  return context;
}
