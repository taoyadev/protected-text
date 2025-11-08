'use client';

import Link from 'next/link';
import { useTranslation } from '@/lib/i18n-provider';
import { Button } from '@/components/ui/button';

export default function LocaleNotFound() {
  const { t, locale } = useTranslation();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-950 text-center text-white">
      <h1 className="text-4xl font-semibold">{t('metadata.notFound.title')}</h1>
      <p className="text-white/70">{t('metadata.notFound.description')}</p>
      <Button asChild>
        <Link href={`/${locale}`}>{t('metadata.notFound.goHome')}</Link>
      </Button>
    </main>
  );
}
