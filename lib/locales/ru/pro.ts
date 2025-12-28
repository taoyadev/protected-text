/**
 * Содержимое страницы Pro - функции, голосование, форма обратной связи
 */

export const pro = {
  // Заголовок
  header: {
    title: 'Protected Text PRO – Дорожная карта функций',
    subtitle:
      'Голосуйте за предстоящие функции Protected Text PRO. Бесплатная версия останется бесплатной навсегда, но помогите нам решить, какие премиум-функции создавать в первую очередь.',
    description:
      'Зашифрованные заметки с пользовательскими доменами, командным доступом, доступом к API, вложениями файлов и многим другим скоро.',
  },

  // Функции
  features: {
    sectionLabel: 'Функции Protected Text PRO',
    customDomains: {
      title: 'Пользовательские домены',
      description:
        'Используйте свой собственный домен, например notes.yourcompany.com, вместо protectedtext.com/yoursite',
    },
    teamSharing: {
      title: 'Командный доступ',
      description:
        'Делитесь зашифрованными заметками с вашей командой. Каждый получает свой собственный пароль.',
    },
    apiAccess: {
      title: 'Доступ к API',
      description:
        'Интегрируйтесь с вашими приложениями. Читайте/записывайте заметки программно.',
    },
    fileAttachments: {
      title: 'Вложения файлов',
      description:
        'Загружайте зашифрованные файлы, изображения и документы в ваши заметки.',
    },
    unlimitedRetention: {
      title: 'Неограниченное хранение',
      description: 'Храните свои заметки вечно. Без автоматического удаления.',
    },
    prioritySupport: {
      title: 'Приоритетная поддержка',
      description: 'Получайте помощь быстрее, когда она вам нужна.',
    },
  },

  // Голосование
  voting: {
    voteButton: 'Голосовать',
    votedButton: 'Проголосовано',
    voteForFeature: 'Голосовать за {featureName}',
    votesCount: '{count} голосов',
    votesSingular: '{count} голос',
  },

  // Форма обратной связи
  feedbackForm: {
    title: 'Запросить пользовательские функции Protected Text PRO',
    subtitle:
      'Поделитесь своими мыслями, предложениями или запросами функций для Protected Text PRO ниже.',
    messageLabel: 'Ваше сообщение',
    messagePlaceholder: 'Расскажите нам, что вы хотели бы увидеть...',
    messageRequired: '*',
    messageCounter: '{count}/2000 символов',
    emailLabel: 'Email (необязательно)',
    emailPlaceholder: 'ваш@email.com',
    emailHelp: 'Оставьте свой email, если хотите, чтобы мы связались с вами',
    featureLabel: 'Связанная функция (необязательно)',
    featurePlaceholder: 'Выберите функцию...',
    featureOther: 'Что-то ещё',
    submitButton: 'Отправить отзыв',
    submittingButton: 'Отправка...',
    emailNote: 'Вы также можете написать нам на',
  },

  // Отказ от ответственности в подвале
  disclaimer: {
    text: 'Не волнуйтесь - бесплатная версия всегда будет бесплатной.',
    subtext: 'Без рекламы. Без отслеживания. Без ерунды.',
  },
};
