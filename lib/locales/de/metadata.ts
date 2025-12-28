/**
 * SEO-Metadaten, Seitentitel, Beschreibungen
 */

export const metadata = {
  // Root-Layout-Metadaten
  root: {
    title:
      'Protected Text – Verschlüsselte Notizen, die tatsächlich funktionieren',
    description:
      'Kostenloser verschlüsselter Notizblock. Ihr Passwort verlässt niemals Ihr Gerät. Keine Werbung, kein Tracking, kein Unsinn. Es funktioniert einfach.',
    siteName: 'Protected Text',

    // Open Graph
    og: {
      title: 'Protected Text',
      description:
        'Verschlüsselte Notizen. Niemand kann sie lesen. Nicht einmal wir.',
      siteName: 'Protected Text',
    },

    // Twitter
    twitter: {
      creator: '@protectedtext',
      site: '@protectedtext',
    },
  },

  // 404-Seite
  notFound: {
    title: 'Seite nicht gefunden',
    description: 'Die gesuchte Notiz existiert nicht oder ist abgelaufen.',
    goHome: 'Zur Startseite',
  },

  // App-spezifisch
  app: {
    launchApp: 'App starten',
  },

  // Barrierefreiheit
  a11y: {
    openNavigation: 'Navigation öffnen',
  },
};
