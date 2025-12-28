import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { I18nProvider } from '@/lib/i18n-provider';
import { isValidLocale, type Locale } from '@/lib/i18n';

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate locale - redirect to /en if invalid
  if (!isValidLocale(locale)) {
    redirect('/en');
  }

  return <I18nProvider locale={locale as Locale}>{children}</I18nProvider>;
}
