/**
 * Metadados SEO, títulos de página, descrições
 */

export const metadata = {
  // Metadados do layout raiz
  root: {
    title: 'Protected Text – Notas Criptografadas que Realmente Funcionam',
    description:
      'Bloco de notas criptografado gratuito. Sua senha nunca sai do seu dispositivo. Sem anúncios, sem rastreamento, sem enrolação. Simplesmente funciona.',
    siteName: 'Protected Text',

    // Open Graph
    og: {
      title: 'Protected Text',
      description: 'Notas criptografadas. Ninguém pode lê-las. Nem mesmo nós.',
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
    title: 'Página não encontrada',
    description: 'A nota que você está procurando não existe ou expirou.',
    goHome: 'Ir para o início',
  },

  // Específico do aplicativo
  app: {
    launchApp: 'Lançar App',
  },

  // Acessibilidade
  a11y: {
    openNavigation: 'Abrir navegação',
  },
};
