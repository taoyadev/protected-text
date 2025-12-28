import type { Metadata } from 'next';
import { getT, type Locale, getAlternateUrls } from '@/lib/i18n';

interface Props {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getT(locale as Locale);

  const alternates = getAlternateUrls('/pro');

  return {
    title: t('pro.header.title'),
    description: t('pro.header.subtitle'),
    alternates: {
      canonical: `/${locale}/pro`,
      languages: Object.fromEntries(
        alternates.map(({ locale: lang, href }) => [
          lang,
          `https://protected-text.com${href}`,
        ]),
      ),
    },
    openGraph: {
      title: t('pro.header.title'),
      description: t('pro.header.subtitle'),
      url: `https://protected-text.com/${locale}/pro`,
      siteName: t('common.brand.protectedText'),
      locale: locale,
      type: 'website',
      images: [
        {
          url: '/og-pro.png',
          width: 1200,
          height: 630,
          alt: t('pro.header.title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('pro.header.title'),
      description: t('pro.header.subtitle'),
      creator: '@protectedtext',
      site: '@protectedtext',
      images: ['/og-pro.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function ProLayout({ params, children }: Props) {
  const { locale } = await params;
  const t = getT(locale as Locale);

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: t('pro.header.title'),
            description: t('pro.header.subtitle'),
            url: `https://protected-text.com/${locale}/pro`,
            inLanguage: locale,
            isPartOf: {
              '@type': 'WebSite',
              name: t('common.brand.protectedText'),
              url: 'https://protected-text.com',
            },
            about: {
              '@type': 'SoftwareApplication',
              name: t('common.brand.protectedText'),
              applicationCategory: 'SecurityApplication',
              operatingSystem: 'Web',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                description: t('pro.disclaimer.text'),
              },
            },
            potentialAction: {
              '@type': 'InteractAction',
              name: t('pro.voting.voteButton'),
              description: t('pro.header.description'),
            },
          }),
        }}
      />
      {children}
    </>
  );
}
