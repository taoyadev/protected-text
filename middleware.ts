import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale, isValidLocale, type Locale } from './lib/i18n';

/**
 * Middleware for locale detection and routing
 *
 * Handles:
 * - Redirects root path (/) to user's preferred locale
 * - Detects locale from Accept-Language header
 * - Validates locale in URL and redirects if invalid
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for:
  // - API routes
  // - Static files (_next/static, _next/image, favicon.ico, etc.)
  // - Public files (manifest.json, robots.txt, etc.)
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('/icon') ||
    pathname.includes('/manifest') ||
    pathname.includes('/robots') ||
    pathname.includes('/sitemap') ||
    /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Check if pathname has a non-English locale
  const pathnameHasNonEnLocale = locales
    .filter((locale) => locale !== 'en')
    .some(
      (locale) =>
        pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
    );

  // If pathname has a valid non-English locale, let it through
  if (pathnameHasNonEnLocale) {
    const locale = pathname.split('/')[1];
    if (isValidLocale(locale)) {
      const response = NextResponse.next();
      response.cookies.set('NEXT_LOCALE', locale, {
        maxAge: 60 * 60 * 24 * 365, // 1 year
        path: '/',
      });
      return response;
    }
  }

  // For all other paths (/, /my-note, /pro, etc.), rewrite to /en
  // This makes English the default language at root path
  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === '/' ? '' : pathname}`;

  // Use rewrite instead of redirect to keep the URL clean
  const response = NextResponse.rewrite(url);
  response.cookies.set('NEXT_LOCALE', 'en', {
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
  });
  return response;
}

/**
 * Determine user's preferred locale from various sources
 * Priority: Cookie > Accept-Language header > Default
 */
function getPreferredLocale(request: NextRequest): Locale {
  // 1. Check cookie (user's previous selection)
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;
  if (localeCookie && isValidLocale(localeCookie)) {
    return localeCookie;
  }

  // 2. Check Accept-Language header (browser preference)
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    // Parse Accept-Language header (e.g., "en-US,en;q=0.9,zh;q=0.8")
    const languages = acceptLanguage
      .split(',')
      .map((lang) => {
        const [code, qValue] = lang.trim().split(';');
        const q = qValue ? parseFloat(qValue.replace('q=', '')) : 1.0;
        // Extract base language code (en-US -> en)
        const baseCode = code.split('-')[0];
        return { code: baseCode, q };
      })
      .sort((a, b) => b.q - a.q); // Sort by quality value (preference)

    // Find first supported locale
    for (const { code } of languages) {
      if (isValidLocale(code)) {
        return code;
      }
    }
  }

  // 3. Fall back to default locale
  return defaultLocale;
}

export const config = {
  // Match all pathnames except those starting with:
  // - api (API routes)
  // - _next (Next.js internals)
  // - static files with extensions
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (static files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
