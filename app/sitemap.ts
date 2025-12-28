import { MetadataRoute } from 'next';
import { locales, type Locale } from '@/lib/i18n';

const baseUrl = 'https://protected-text.com';

/**
 * Generate alternate language URLs for a given path
 */
function generateAlternates(path: string): Record<Locale, string> {
  return Object.fromEntries(
    locales.map((locale) => [
      locale,
      locale === 'en' ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`,
    ]),
  ) as Record<Locale, string>;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Homepage with all language alternates
  const homepageEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: generateAlternates(''),
      },
    },
    // Add explicit locale URLs for non-English homepages
    ...locales
      .filter((locale) => locale !== 'en')
      .map((locale) => ({
        url: `${baseUrl}/${locale}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
        alternates: {
          languages: generateAlternates(''),
        },
      })),
  ];

  // Pro page with all language alternates
  const proPageEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/pro`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: generateAlternates('/pro'),
      },
    },
    // Add explicit locale URLs for non-English pro pages
    ...locales
      .filter((locale) => locale !== 'en')
      .map((locale) => ({
        url: `${baseUrl}/${locale}/pro`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        alternates: {
          languages: generateAlternates('/pro'),
        },
      })),
  ];

  return [...homepageEntries, ...proPageEntries];
}
