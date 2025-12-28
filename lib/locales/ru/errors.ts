/**
 * Все сообщения об ошибках и сообщения валидации
 */

export const errors = {
  // Ошибки сети/сервера
  network: {
    unableToReachServer: 'Не удалось связаться с сервером.',
    failedToSaveNote: 'Не удалось сохранить заметку',
    failedToLoadNote: 'Не удалось загрузить заметку',
    failedToDeleteNote: 'Не удалось удалить заметку',
    failedToReloadNote: 'Не удалось перезагрузить заметку',
    failedToLoadVersionHistory: 'Не удалось загрузить историю версий',
    failedToRestoreVersion: 'Не удалось восстановить версию',
    failedToRecordVote: 'Не удалось записать голос',
    failedToRecordVotePleaseTryAgain:
      'Не удалось записать голос. Пожалуйста, попробуйте снова.',
    failedToSubmitFeedback: 'Не удалось отправить отзыв',
    failedToSubmitFeedbackPleaseTryAgain:
      'Не удалось отправить отзыв. Пожалуйста, попробуйте снова.',
    clipboardUnavailable: 'Буфер обмена недоступен',
    noNoteFoundOnServer: 'Заметка не найдена на сервере',
  },

  // Ошибки пароля
  password: {
    incorrectPassword: 'Неправильный пароль',
    passwordsDoNotMatch: 'Пароли не совпадают',
    newPasswordsDoNotMatch: 'Новые пароли не совпадают',
    incorrectOldPassword: 'Неправильный старый пароль',
    failedToChangePassword: 'Не удалось сменить пароль',
    allFieldsRequired: 'Все поля обязательны для заполнения',
    newPasswordTooShort: 'Новый пароль должен содержать не менее 4 символов',
    failedToDecryptVersion: 'Не удалось расшифровать версию',
  },

  // Ошибки валидации
  validation: {
    siteNameInvalid: 'Используйте 3-32 строчные буквы, цифры или дефисы.',
    pleaseEnterMessage: 'Пожалуйста, введите сообщение',
    pleaseTypeToConfirm: 'Пожалуйста, введите "{siteName}" для подтверждения',
  },

  // Ошибки голосования
  voting: {
    alreadyVoted: 'Вы уже проголосовали за это!',
  },

  // Подтверждения
  confirmations: {
    unsavedChangesReloadAnyway:
      'У вас есть несохранённые изменения. Всё равно перезагрузить?',
  },
};
