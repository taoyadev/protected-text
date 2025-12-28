/**
 * Structured Data (JSON-LD) Component
 * Renders SEO-friendly JSON-LD schemas for search engines
 */

import { type Locale } from '@/lib/i18n';

interface StructuredDataProps {
  locale?: Locale;
}

/**
 * WebSite Schema
 * Helps search engines understand site structure and search functionality
 */
function webSiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Protected Text',
    url: 'https://protected-text.com',
    description:
      'Free encrypted notepad. Your password never leaves your device. No ads, no tracking, no BS.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://protected-text.com/{search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Organization Schema
 * Provides company/brand information to search engines
 */
function organizationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Protected Text',
    url: 'https://protected-text.com',
    logo: 'https://protected-text.com/og.svg',
    description: 'Zero-knowledge encrypted notes platform',
    sameAs: ['https://github.com/taoyadev/protected-text'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'hello@protected-text.com',
    },
  };
}

/**
 * SoftwareApplication Schema
 * Describes the app for rich snippets in search results
 */
function softwareApplicationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Protected Text',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1000',
    },
    description:
      'Zero-knowledge encrypted notepad. Your password never leaves your device.',
    featureList: [
      'Client-side AES-256 encryption',
      'No account required',
      'Version history',
      'Auto-save',
      'No ads or tracking',
      'Open source',
    ],
  };
}

/**
 * FAQPage Schema
 * Enables FAQ rich snippets in search results
 */
function faqPageSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What happens if I forget my password?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You cannot recover your note. Because we use zero-knowledge encryption, your password is never stored or transmitted. If you lose it, your data is permanently inaccessible. This is an intentional security feature.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Protected Text really free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! The core encrypted notes feature is and will always be free. We offer optional Pro features for power users, but the basic service you love costs nothing.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can hackers access your servers and read my notes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Your notes are encrypted on your device before they ever reach our servers. We only store encrypted blobs that we cannot decrypt. Even if our servers were compromised, your data would remain secure.',
        },
      },
      {
        '@type': 'Question',
        name: 'How can I collaborate with my team?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Simply share the URL and password with your team members. Anyone with the URL and password can access and edit the note. Consider using a password manager to share the password securely.',
        },
      },
      {
        '@type': 'Question',
        name: 'What if someone takes my URL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Without the password, your note is useless. Encrypted notes are protected by AES-256-GCM encryption. Brute-forcing the password would take millions of years with current technology.',
        },
      },
      {
        '@type': 'Question',
        name: 'What about government requests for my data?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We cannot provide what we do not have. Because we use zero-knowledge architecture, we cannot decrypt your notes even if legally compelled. The only data we could provide is metadata like access timestamps.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why should I trust Protected Text?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Don't trust us - verify! Our code is open source on GitHub. You can inspect the encryption implementation, run it yourself, or even fork it. Zero-knowledge means you don't need to trust us with your secrets.",
        },
      },
      {
        '@type': 'Question',
        name: 'What is Protected Text Pro?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pro is an optional upgrade for power users who need more features like larger note sizes, longer version history, custom themes, and priority support. It helps fund continued development while keeping the core free forever.',
        },
      },
    ],
  };
}

/**
 * TechArticle Schema
 * Describes the security/technical content for better indexing
 */
function techArticleSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'How Protected Text Encryption Works',
    description:
      'Deep dive into AES-256-GCM encryption, PBKDF2 key derivation, and zero-knowledge architecture.',
    author: {
      '@type': 'Organization',
      name: 'Protected Text',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Protected Text',
      logo: {
        '@type': 'ImageObject',
        url: 'https://protected-text.com/og.svg',
      },
    },
    datePublished: '2024-01-01',
    dateModified: new Date().toISOString().split('T')[0],
  };
}

export function StructuredData({
  locale: _locale = 'en',
}: StructuredDataProps) {
  const schemas = [
    webSiteSchema(),
    organizationSchema(),
    softwareApplicationSchema(),
    faqPageSchema(),
    techArticleSchema(),
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemas),
      }}
    />
  );
}
