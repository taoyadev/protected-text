'use client';

import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { languages, type Language } from '@/lib/i18n';

export function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Get language from localStorage or browser
    const saved = localStorage.getItem('language') as Language;
    if (saved && saved in languages) {
      setCurrentLang(saved);
      document.documentElement.lang = saved;
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0] as Language;
      const lang = browserLang in languages ? browserLang : 'en';
      setCurrentLang(lang);
      document.documentElement.lang = lang;
    }
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    setIsOpen(false);
    // Reload to apply translations
    window.location.reload();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        aria-label="Change language"
      >
        <Globe className="h-4 w-4" />
        <span>{languages[currentLang]}</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full z-50 mt-2 w-40 rounded-xl border border-white/10 bg-slate-900 p-2 shadow-xl">
            {(Object.keys(languages) as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  currentLang === lang
                    ? 'bg-primary-500 text-white'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
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
