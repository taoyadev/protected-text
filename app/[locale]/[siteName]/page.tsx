import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { EncryptedEditor } from '@/components/editor/encrypted-editor';
import { isSiteNameValid } from '@/lib/site';
import { getT, type Locale } from '@/lib/i18n';

interface Props {
  params: Promise<{ locale: string; siteName: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, siteName } = await params;
  const t = getT(locale as Locale);

  return {
    title: `${siteName} – ${t('common.brand.protectedText')}`,
    description: t('metadata.root.description'),
  };
}

export default async function SitePage({ params }: Props) {
  const { siteName } = await params;

  if (!isSiteNameValid(siteName)) {
    return notFound();
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 px-6 py-12">
      <EncryptedEditor siteName={siteName} />
    </main>
  );
}
