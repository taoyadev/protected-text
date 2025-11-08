/**
 * Всё содержимое диалогов - защита паролем, смена пароля, удаление, история версий
 */

export const dialogs = {
  // Защита паролем
  passwordGate: {
    createPassword: 'Создать пароль',
    unlockNote: 'Разблокировать заметку',
    passwordsNeverLeave: 'Пароли никогда не покидают ваше устройство.',
    passwordLabel: 'Пароль',
    confirmPasswordLabel: 'Подтвердите пароль',
    startWriting: 'Начать писать',
    unlock: 'Разблокировать',
  },

  // Диалог смены пароля
  changePassword: {
    title: 'Сменить пароль',
    currentPasswordLabel: 'Текущий пароль',
    currentPasswordPlaceholder: 'Введите текущий пароль',
    newPasswordLabel: 'Новый пароль',
    newPasswordPlaceholder: 'Введите новый пароль',
    confirmNewPasswordLabel: 'Подтвердите новый пароль',
    confirmNewPasswordPlaceholder: 'Введите новый пароль ещё раз',
    cancel: 'Отмена',
    changePasswordButton: 'Сменить пароль',
  },

  // Диалог удаления заметки
  deleteNote: {
    title: 'Удалить заметку',
    warning1: 'Это **навсегда удалит** вашу заметку.',
    warning2: 'Это действие **нельзя отменить**. Без резервных копий, без восстановления.',
    confirmPrompt: 'Введите',
    confirmPromptSuffix: 'для подтверждения:',
    cancel: 'Отмена',
    deleteForever: 'Удалить навсегда',
  },

  // Диалог истории версий
  versionHistory: {
    title: 'История версий',
    loading: 'Загрузка версий...',
    noVersions: 'История версий пока недоступна',
    versionNumber: 'Версия',
    restore: 'Восстановить',
    charactersLabel: 'символов',
  },
};
