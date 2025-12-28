'use client';

import Link from 'next/link';
import { Menu, Sun, Moon, X } from 'lucide-react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = '';
      };
    }
  }, [mobileMenuOpen]);

  // Use root path for English, /{locale} for others
  const homeLink = locale === 'en' ? '/' : `/${locale}`;
  const proLink = locale === 'en' ? '/pro' : `/${locale}/pro`;

  const navLinks = [
    { href: homeLink + '#features', label: t('common.navigation.features') },
    { href: homeLink + '#security', label: t('common.navigation.security') },
    { href: homeLink + '#faq', label: t('common.navigation.faq') },
    { href: proLink, label: t('common.navigation.roadmap') },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-gradient-to-r from-white/95 via-gray-50/95 to-white/95 shadow-xl shadow-black/5 backdrop-blur-xl dark:border-white/10 dark:from-slate-950/95 dark:via-slate-900/95 dark:to-slate-950/95 dark:shadow-black/20">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href={homeLink as any}
          className="group flex items-center gap-3 text-gray-900 transition-all duration-300 hover:scale-105 dark:text-white"
        >
          <div className="rounded-lg bg-gradient-to-br from-primary-500/10 to-indigo-500/10 p-2.5 shadow-lg shadow-primary-500/20 ring-2 ring-primary-400/30 transition-all duration-300 group-hover:from-primary-500/20 group-hover:to-indigo-500/20 group-hover:ring-primary-400/50">
            <ShieldCheck
              className="h-6 w-6 text-primary-600 drop-shadow-sm group-hover:text-primary-500 dark:text-primary-400 dark:group-hover:text-primary-300"
              aria-hidden="true"
            />
          </div>
          <div className="flex flex-col">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-lg font-bold leading-none tracking-tight text-transparent dark:from-white dark:via-white/95 dark:to-white">
              {t('common.brand.protectedText')}
            </span>
            <span className="text-xs font-medium tracking-wide text-gray-500 dark:text-white/60">
              Zero-Knowledge Encryption
            </span>
          </div>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-gray-600 dark:text-white/70 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href as any}
              className="relative transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary-400 after:transition-all after:duration-300 hover:text-gray-900 hover:after:w-full dark:hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          {mounted && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="hidden md:flex"
              title={
                theme === 'dark'
                  ? t('editor.toolbar.switchToLightMode')
                  : t('editor.toolbar.switchToDarkMode')
              }
              aria-label={
                theme === 'dark'
                  ? t('editor.toolbar.switchToLightMode')
                  : t('editor.toolbar.switchToDarkMode')
              }
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          )}
          <div className="hidden md:block">
            <Button asChild className="font-semibold">
              <Link href="#create-note">{t('metadata.app.launchApp')}</Link>
            </Button>
          </div>
          <button
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-white/70 dark:hover:bg-white/10 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={
              mobileMenuOpen
                ? t('common.actions.close')
                : t('metadata.a11y.openNavigation')
            }
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          {/* Drawer */}
          <div
            className="fixed right-0 top-0 z-50 h-full w-64 transform animate-slide-in-right bg-white shadow-xl dark:bg-slate-900 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label={t('metadata.a11y.openNavigation')}
          >
            <div className="flex h-full flex-col">
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-white/10">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t('common.brand.protectedText')}
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-white/70 dark:hover:bg-white/10"
                  aria-label={t('common.actions.close')}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto p-4">
                <div className="flex flex-col space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href as any}
                      onClick={() => setMobileMenuOpen(false)}
                      className="rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100 dark:text-white/80 dark:hover:bg-white/5"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <div className="my-4 border-t border-gray-200 dark:border-white/10" />

                {/* Theme Toggle in Mobile Menu */}
                {mounted && (
                  <button
                    onClick={() =>
                      setTheme(theme === 'dark' ? 'light' : 'dark')
                    }
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100 dark:text-white/80 dark:hover:bg-white/5"
                  >
                    {theme === 'dark' ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                    <span>
                      {theme === 'dark'
                        ? t('editor.toolbar.switchToLightMode')
                        : t('editor.toolbar.switchToDarkMode')}
                    </span>
                  </button>
                )}
              </nav>

              {/* Drawer Footer - CTA Button */}
              <div className="border-t border-gray-200 p-4 dark:border-white/10">
                <Button
                  asChild
                  className="w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link href="#create-note">{t('metadata.app.launchApp')}</Link>
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
