/**
 * Всплывающие/уведомительные сообщения
 */

export const toasts = {
  // Сообщения об успехе
  success: {
    shareLinkCopied: 'Ссылка для совместного доступа скопирована',
    noteReloadedFromServer: 'Заметка перезагружена с сервера',
    passwordChangedSuccessfully: 'Пароль успешно изменён',
    noteDeleted: 'Заметка удалена',
    fileImportedSuccessfully: 'Файл успешно импортирован',
    saved: 'Сохранено!',
    versionRestored: 'Версия восстановлена',
    versionRestoredSaveToConfirm:
      'Версия восстановлена. Сохраните для подтверждения.',
    voteRecorded: 'Голос записан! Спасибо за отзыв.',
    thankYouForFeedback: 'Спасибо за ваш отзыв!',
  },

  // Информационные сообщения
  info: {
    noChangesToSave: 'Нет изменений для сохранения',
  },

  // Сообщения об ошибках (продублированы из errors.ts для удобства в контексте toast)
  error: {
    incorrectPassword: 'Неправильный пароль',
    failedToSaveNote: 'Не удалось сохранить заметку',
    clipboardUnavailable: 'Буфер обмена недоступен',
    noNoteFoundOnServer: 'Заметка не найдена на сервере',
    failedToReloadNote: 'Не удалось перезагрузить заметку',
    failedToDeleteNote: 'Не удалось удалить заметку',
    failedToSave: 'Не удалось сохранить',
    alreadyVoted: 'Вы уже проголосовали за это!',
    failedToRecordVote: 'Не удалось записать голос',
    pleaseEnterMessage: 'Пожалуйста, введите сообщение',
    failedToSubmitFeedback: 'Не удалось отправить отзыв',
    allFieldsRequired: 'Все поля обязательны для заполнения',
    newPasswordsDoNotMatch: 'Новые пароли не совпадают',
    newPasswordTooShort: 'Новый пароль должен содержать не менее 4 символов',
    failedToChangePassword: 'Не удалось сменить пароль',
    pleaseTypeToConfirm: 'Пожалуйста, введите "{siteName}" для подтверждения',
    failedToLoadVersionHistory: 'Не удалось загрузить историю версий',
    failedToRestoreVersion: 'Не удалось восстановить версию',
  },
};
