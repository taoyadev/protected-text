/**
 * Интерфейс редактора - панель инструментов, заполнители, статистика, сочетания клавиш
 */

export const editor = {
  // Панель инструментов
  toolbar: {
    site: 'Сайт',
    saving: 'Сохранение…',
    lastSaved: 'Последнее сохранение',
    switchToLightMode: 'Переключить на светлую тему',
    switchToDarkMode: 'Переключить на темную тему',
    toggleMarkdownPreview: 'Предпросмотр Markdown',
    search: 'Поиск (Ctrl+F)',
    versionHistory: 'История версий',
    reload: 'Перезагрузить',
    import: 'Импорт (Ctrl+I)',
    export: 'Экспорт (Ctrl+E)',
    share: 'Поделиться',
    changePassword: 'Изменить пароль (Ctrl+K)',
    delete: 'Удалить',
  },

  // Поиск
  search: {
    placeholder: 'Поиск в заметке... (Esc для закрытия)',
    clear: 'Очистить',
  },

  // Редактор
  editor: {
    placeholder:
      'Начните вводить текст… Пароль никогда не покидает эту вкладку браузера.',
  },

  // Предпросмотр Markdown
  markdownPreview: {
    emptyPlaceholder: '*Начните вводить текст, чтобы увидеть предпросмотр...*',
  },

  // Статистика
  stats: {
    words: 'слов',
    characters: 'символов',
    lines: 'строк',
    unsavedChanges: 'Несохраненные изменения',
  },

  // Сила пароля
  passwordStrength: {
    weak: 'Слабый',
    fair: 'Нормальный',
    okay: 'Хороший',
    good: 'Отличный',
    strong: 'Надежный',
  },

  // Смена темы
  theme: {
    switchedToLight: 'Переключено на светлую тему',
    switchedToDark: 'Переключено на темную тему',
  },

  // Импорт файла
  fileImport: {
    acceptedFormats: '.txt,.md,.text',
  },

  // Keyboard shortcuts
  shortcuts: {
    title: 'Сочетания клавиш',
    description: 'Нажмите ? чтобы открыть этот диалог',
    save: 'Сохранить заметку',
    search: 'Поиск в заметке',
    closeDialogs: 'Закрыть диалоги',
    showShortcuts: 'Показать сочетания клавиш',
    export: 'Экспорт заметки',
    import: 'Импорт файла',
    changePassword: 'Изменить пароль',
  },

  // Autosave status
  autosave: {
    allChangesSaved: 'Все изменения сохранены',
    saving: 'Сохранение...',
    unsavedChanges: 'Несохраненные изменения',
  },
};
