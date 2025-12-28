import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { TabsManager } from '@/components/editor/tabs-manager';
import { isSiteNameValid } from '@/lib/site';
import { getT, type Locale } from '@/lib/i18n';
import { SiteHeader } from '@/components/layout/site-header';

interface Props {
  params: Promise<{ locale: string; siteName: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, siteName } = await params;
  const t = getT(locale as Locale);

  return {
    title: `${siteName} - ${t('common.brand.protectedText')}`,
    description: t('metadata.root.description'),
    // Prevent search engines from indexing user-generated encrypted content pages
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
      },
    },
  };
}

export default async function SitePage({ params }: Props) {
  const { siteName } = await params;

  if (!isSiteNameValid(siteName)) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <SiteHeader />
      <TabsManager initialSiteName={siteName} />
    </div>
  );
}
