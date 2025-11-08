/**
 * Интерфейс редактора - панель инструментов, заполнители, статистика, горячие клавиши
 */

export const editor = {
  // Панель инструментов
  toolbar: {
    site: 'Сайт',
    saving: 'Сохранение…',
    lastSaved: 'Последнее сохранение',
    switchToLightMode: 'Переключиться на светлую тему',
    switchToDarkMode: 'Переключиться на тёмную тему',
    toggleMarkdownPreview: 'Переключить предпросмотр Markdown',
    search: 'Поиск (Ctrl+F)',
    versionHistory: 'История версий',
    reload: 'Перезагрузить',
    import: 'Импорт (Ctrl+I)',
    export: 'Экспорт (Ctrl+E)',
    share: 'Поделиться',
    changePassword: 'Сменить пароль (Ctrl+K)',
    delete: 'Удалить',
  },

  // Поиск
  search: {
    placeholder: 'Поиск в заметке... (Нажмите Esc для закрытия)',
    clear: 'Очистить',
  },

  // Редактор
  editor: {
    placeholder: 'Начните печатать… Пароль никогда не покидает эту вкладку браузера.',
  },

  // Предпросмотр Markdown
  markdownPreview: {
    emptyPlaceholder: '*Начните печатать, чтобы увидеть предпросмотр...*',
  },

  // Статистика
  stats: {
    words: 'слов',
    characters: 'символов',
    lines: 'строк',
    unsavedChanges: 'Несохранённые изменения',
  },

  // Надёжность пароля
  passwordStrength: {
    weak: 'Слабый',
    fair: 'Приемлемый',
    okay: 'Нормальный',
    good: 'Хороший',
    strong: 'Надёжный',
  },

  // Переключение темы
  theme: {
    switchedToLight: 'Переключено на светлую тему',
    switchedToDark: 'Переключено на тёмную тему',
  },

  // Импорт файла
  fileImport: {
    acceptedFormats: '.txt,.md,.text',
  },
};
