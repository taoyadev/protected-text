/**
 * Todos los mensajes de error y mensajes de validación
 */

export const errors = {
  // Errores de red/servidor
  network: {
    unableToReachServer: 'No se puede conectar con el servidor.',
    failedToSaveNote: 'Error al guardar la nota',
    failedToLoadNote: 'Error al cargar la nota',
    failedToDeleteNote: 'Error al eliminar la nota',
    failedToReloadNote: 'Error al recargar la nota',
    failedToLoadVersionHistory: 'Error al cargar el historial de versiones',
    failedToRestoreVersion: 'Error al restaurar la versión',
    failedToRecordVote: 'Error al registrar el voto',
    failedToRecordVotePleaseTryAgain: 'Error al registrar el voto. Por favor, inténtalo de nuevo.',
    failedToSubmitFeedback: 'Error al enviar comentarios',
    failedToSubmitFeedbackPleaseTryAgain: 'Error al enviar comentarios. Por favor, inténtalo de nuevo.',
    clipboardUnavailable: 'Portapapeles no disponible',
    noNoteFoundOnServer: 'No se encontró nota en el servidor',
  },

  // Errores de contraseña
  password: {
    incorrectPassword: 'Contraseña incorrecta',
    passwordsDoNotMatch: 'Las contraseñas no coinciden',
    newPasswordsDoNotMatch: 'Las nuevas contraseñas no coinciden',
    incorrectOldPassword: 'Contraseña anterior incorrecta',
    failedToChangePassword: 'Error al cambiar la contraseña',
    allFieldsRequired: 'Todos los campos son obligatorios',
    newPasswordTooShort: 'La nueva contraseña debe tener al menos 4 caracteres',
    failedToDecryptVersion: 'Error al desencriptar la versión',
  },

  // Errores de validación
  validation: {
    siteNameInvalid: 'Usa 3-32 letras minúsculas, números o guiones.',
    pleaseEnterMessage: 'Por favor, ingresa un mensaje',
    pleaseTypeToConfirm: 'Por favor, escribe "{siteName}" para confirmar',
  },

  // Errores de votación
  voting: {
    alreadyVoted: '¡Ya votaste por esto!',
  },

  // Mensajes de confirmación
  confirmations: {
    unsavedChangesReloadAnyway: 'Tienes cambios sin guardar. ¿Recargar de todos modos?',
  },
};
