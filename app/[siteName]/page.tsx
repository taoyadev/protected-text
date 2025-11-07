import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { EncryptedEditor } from '@/components/editor/encrypted-editor';
import { isSiteNameValid } from '@/lib/site';

interface Props {
  params: Promise<{ siteName: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { siteName } = await params;
  return {
    title: `${siteName} – Protected Text`,
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
