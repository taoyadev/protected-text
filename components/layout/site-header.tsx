'use client';

import Link from 'next/link';
import { Shield, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/language-switcher';
import { useTranslation } from '@/lib/i18n-provider';

export function SiteHeader() {
  const { locale, t } = useTranslation();

  // Use root path for English, /{locale} for others
  const homeLink = locale === 'en' ? '/' : `/${locale}`;
  const proLink = locale === 'en' ? '/pro' : `/${locale}/pro`;

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl shadow-lg shadow-black/10">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <Link href={homeLink} className="group flex items-center gap-3 text-white transition-all duration-300 hover:scale-105">
          <div className="rounded-lg bg-primary-500/10 p-2 ring-1 ring-primary-400/30 group-hover:bg-primary-500/20 group-hover:ring-primary-400/50 transition-all duration-300">
            <Shield className="h-5 w-5 text-primary-400 group-hover:text-primary-300" />
          </div>
          <span className="font-bold tracking-tight bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">{t('common.brand.protectedText')}</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-white/70 md:flex">
          <Link href="#features" className="hover:text-white transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary-400 after:transition-all after:duration-300 hover:after:w-full">
            {t('common.navigation.features')}
          </Link>
          <Link href="#security" className="hover:text-white transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary-400 after:transition-all after:duration-300 hover:after:w-full">
            {t('common.navigation.security')}
          </Link>
          <Link href="#faq" className="hover:text-white transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary-400 after:transition-all after:duration-300 hover:after:w-full">
            {t('common.navigation.faq')}
          </Link>
          <Link href={proLink} className="hover:text-white transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary-400 after:transition-all after:duration-300 hover:after:w-full">
            {t('common.navigation.roadmap')}
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <div className="hidden md:block">
            <Button asChild className="font-semibold">
              <Link href="#create-note">{t('metadata.app.launchApp')}</Link>
            </Button>
          </div>
          <button className="md:hidden" aria-label={t('metadata.a11y.openNavigation')}>
            <Menu className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
    </header>
  );
}
