import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Protected Text PRO – Roadmap & Feature Requests',
  description:
    'Vote on upcoming Protected Text PRO features: custom domains, team sharing, API access, file attachments, and more. Help shape the future of encrypted note-taking.',
  keywords: [
    'Protected Text PRO',
    'encrypted notes pro',
    'secure notepad premium',
    'encrypted note-taking features',
    'team collaboration encrypted',
    'custom domain notes',
    'encrypted file sharing',
    'API encrypted notes',
    'protected text roadmap',
    'feature requests encrypted notes',
  ],
  openGraph: {
    title: 'Protected Text PRO – Roadmap & Feature Requests',
    description:
      'Vote on upcoming Protected Text PRO features. Custom domains, team sharing, API access, and more. Free forever core, with optional pro features.',
    url: 'https://protected-text.com/pro',
    siteName: 'Protected Text',
    type: 'website',
    images: [
      {
        url: '/og-pro.png',
        width: 1200,
        height: 630,
        alt: 'Protected Text PRO Features',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Protected Text PRO – Roadmap & Feature Requests',
    description:
      'Vote on upcoming encrypted note features: custom domains, team sharing, API access. Help shape Protected Text PRO.',
    creator: '@protectedtext',
    site: '@protectedtext',
    images: ['/og-pro.png'],
  },
  alternates: {
    canonical: 'https://protected-text.com/pro',
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

export default function ProLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Protected Text PRO Features & Roadmap',
            description:
              'Vote on upcoming Protected Text PRO features including custom domains, team sharing, API access, file attachments, unlimited retention, and priority support.',
            url: 'https://protected-text.com/pro',
            isPartOf: {
              '@type': 'WebSite',
              name: 'Protected Text',
              url: 'https://protected-text.com',
            },
            about: {
              '@type': 'SoftwareApplication',
              name: 'Protected Text',
              applicationCategory: 'SecurityApplication',
              operatingSystem: 'Web',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                description: 'Free forever with optional PRO features',
              },
            },
            potentialAction: {
              '@type': 'InteractAction',
              name: 'Vote on Features',
              description: 'Vote on which Protected Text PRO features to build next',
            },
          }),
        }}
      />
      {children}
    </>
  );
}
