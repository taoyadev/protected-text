/**
 * SEO метаданные, заголовки страниц, описания
 */

export const metadata = {
  // Метаданные корневого макета
  root: {
    title:
      'Protected Text – Зашифрованные заметки, которые действительно работают',
    description:
      'Бесплатный зашифрованный блокнот. Ваш пароль никогда не покидает ваше устройство. Без рекламы, без отслеживания, без ерунды. Просто работает.',
    siteName: 'Protected Text',

    // Open Graph
    og: {
      title: 'Protected Text',
      description:
        'Зашифрованные заметки. Никто не может их прочитать. Даже мы.',
      siteName: 'Protected Text',
    },

    // Twitter
    twitter: {
      creator: '@protectedtext',
      site: '@protectedtext',
    },
  },

  // Страница 404
  notFound: {
    title: 'Страница не найдена',
    description: 'Заметка, которую вы ищете, не существует или истекла.',
    goHome: 'На главную',
  },

  // Специфично для приложения
  app: {
    launchApp: 'Запустить приложение',
  },

  // Доступность
  a11y: {
    openNavigation: 'Открыть навигацию',
  },
};
