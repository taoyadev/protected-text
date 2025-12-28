/**
 * Metadatos SEO, títulos de página, descripciones
 */

export const metadata = {
  // Metadatos del diseño raíz
  root: {
    title: 'Protected Text – Notas Encriptadas que Realmente Funcionan',
    description:
      'Bloc de notas encriptado gratis. Tu contraseña nunca sale de tu dispositivo. Sin anuncios, sin rastreo, sin tonterías. Simplemente funciona.',
    siteName: 'Protected Text',

    // Open Graph
    og: {
      title: 'Protected Text',
      description:
        'Notas encriptadas. Nadie puede leerlas. Ni siquiera nosotros.',
      siteName: 'Protected Text',
    },

    // Twitter
    twitter: {
      creator: '@protectedtext',
      site: '@protectedtext',
    },
  },

  // Página 404
  notFound: {
    title: 'Página no encontrada',
    description: 'La nota que buscas no existe o ha expirado.',
    goHome: 'Ir al inicio',
  },

  // Específico de la aplicación
  app: {
    launchApp: 'Lanzar App',
  },

  // Accesibilidad
  a11y: {
    openNavigation: 'Abrir navegación',
  },
};
