'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';
import { languages, locales, type Locale } from '@/lib/i18n';
import { useTranslation } from '@/lib/i18n-provider';

export function LanguageSwitcher() {
  const { locale } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageChange = (newLocale: Locale) => {
    setIsOpen(false);

    // Remove current locale from pathname
    const pathWithoutLocale =
      pathname.replace(/^\/(zh|es|fr|de|ja|pt|ru)/, '') || '/';

    // For English, use root path; for others, use /{locale}
    const newPath =
      newLocale === 'en'
        ? pathWithoutLocale
        : `/${newLocale}${pathWithoutLocale}`;

    router.push(newPath as any);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full border-2 border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-800 transition-colors hover:border-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-white"
        aria-label="Change language"
      >
        <Globe className="h-4 w-4" />
        <span>{languages[locale]}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full z-50 mt-2 w-40 rounded-xl border-2 border-gray-300 bg-white p-2 shadow-xl shadow-black/10 dark:border-white/10 dark:bg-slate-900 dark:shadow-black/50">
            {locales.map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                  locale === lang
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white'
                }`}
              >
                {languages[lang]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
