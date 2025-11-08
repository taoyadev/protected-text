'use client';

import Link from 'next/link';
import { Menu, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/language-switcher';
import { useTranslation } from '@/lib/i18n-provider';
import { ShieldCheck } from '@/components/icons/shield-check';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function SiteHeader() {
  const { locale, t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Use root path for English, /{locale} for others
  const homeLink = locale === 'en' ? '/' : `/${locale}`;
  const proLink = locale === 'en' ? '/pro' : `/${locale}/pro`;

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 dark:border-white/10 bg-gradient-to-r from-white/95 via-gray-50/95 to-white/95 dark:from-slate-950/95 dark:via-slate-900/95 dark:to-slate-950/95 backdrop-blur-xl shadow-xl shadow-black/5 dark:shadow-black/20">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href={homeLink as any} className="group flex items-center gap-3 text-gray-900 dark:text-white transition-all duration-300 hover:scale-105">
          <div className="rounded-lg bg-gradient-to-br from-primary-500/10 to-indigo-500/10 p-2.5 ring-2 ring-primary-400/30 group-hover:from-primary-500/20 group-hover:to-indigo-500/20 group-hover:ring-primary-400/50 transition-all duration-300 shadow-lg shadow-primary-500/20">
            <ShieldCheck className="h-6 w-6 text-primary-600 dark:text-primary-400 group-hover:text-primary-500 dark:group-hover:text-primary-300 drop-shadow-sm" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-white/95 dark:to-white bg-clip-text text-transparent leading-none">{t('common.brand.protectedText')}</span>
            <span className="text-xs text-gray-500 dark:text-white/60 font-medium tracking-wide">Zero-Knowledge Encryption</span>
          </div>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-gray-600 dark:text-white/70 md:flex">
          <Link href={homeLink + '#features' as any} className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary-400 after:transition-all after:duration-300 hover:after:w-full">
            {t('common.navigation.features')}
          </Link>
          <Link href={homeLink + '#security' as any} className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary-400 after:transition-all after:duration-300 hover:after:w-full">
            {t('common.navigation.security')}
          </Link>
          <Link href={homeLink + '#faq' as any} className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary-400 after:transition-all after:duration-300 hover:after:w-full">
            {t('common.navigation.faq')}
          </Link>
          <Link href={proLink as any} className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary-400 after:transition-all after:duration-300 hover:after:w-full">
            {t('common.navigation.roadmap')}
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          {mounted && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="hidden md:flex"
              title={theme === 'dark' ? t('editor.toolbar.switchToLightMode') : t('editor.toolbar.switchToDarkMode')}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          )}
          <div className="hidden md:block">
            <Button asChild className="font-semibold">
              <Link href="#create-note">{t('metadata.app.launchApp')}</Link>
            </Button>
          </div>
          <button className="md:hidden" aria-label={t('metadata.a11y.openNavigation')}>
            <Menu className="h-6 w-6 text-gray-900 dark:text-white" />
          </button>
        </div>
      </div>
    </header>
  );
}
