/**
 * Métadonnées SEO, titres de page, descriptions
 */

export const metadata = {
  // Métadonnées de la mise en page racine
  root: {
    title: 'Protected Text – Notes Chiffrées qui Fonctionnent Vraiment',
    description:
      "Bloc-notes chiffré gratuit. Votre mot de passe ne quitte jamais votre appareil. Pas de publicités, pas de suivi, pas de conneries. Ça marche, c'est tout.",
    siteName: 'Protected Text',

    // Open Graph
    og: {
      title: 'Protected Text',
      description: 'Notes chiffrées. Personne ne peut les lire. Même pas nous.',
      siteName: 'Protected Text',
    },

    // Twitter
    twitter: {
      creator: '@protectedtext',
      site: '@protectedtext',
    },
  },

  // Page 404
  notFound: {
    title: 'Page non trouvée',
    description: "La note que vous recherchez n'existe pas ou a expiré.",
    goHome: "Retour à l'accueil",
  },

  // Spécifique à l'application
  app: {
    launchApp: "Lancer l'App",
  },

  // Accessibilité
  a11y: {
    openNavigation: 'Ouvrir la navigation',
  },
};
