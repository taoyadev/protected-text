/**
 * SEO metadata, page titles, descriptions
 */

export const metadata = {
  // Root layout metadata
  root: {
    title: 'Protected Text – Encrypted Notes That Actually Work',
    description: 'Free encrypted notepad. Your password never leaves your device. No ads, no tracking, no BS. Just works.',
    siteName: 'Protected Text',

    // Open Graph
    og: {
      title: 'Protected Text',
      description: 'Encrypted notes. Nobody can read them. Not even us.',
      siteName: 'Protected Text',
    },

    // Twitter
    twitter: {
      creator: '@protectedtext',
      site: '@protectedtext',
    },
  },

  // 404 page
  notFound: {
    title: 'Page not found',
    description: "The note you are looking for doesn't exist or has expired.",
    goHome: 'Go home',
  },

  // App-specific
  app: {
    launchApp: 'Launch App',
  },

  // Accessibility
  a11y: {
    openNavigation: 'Open navigation',
  },
};
