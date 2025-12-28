/**
 * Mensajes de Toast/notificación
 */

export const toasts = {
  // Mensajes de éxito
  success: {
    shareLinkCopied: 'Enlace para compartir copiado',
    noteReloadedFromServer: 'Nota recargada desde el servidor',
    passwordChangedSuccessfully: 'Contraseña cambiada exitosamente',
    noteDeleted: 'Nota eliminada',
    fileImportedSuccessfully: 'Archivo importado exitosamente',
    saved: '¡Guardado!',
    versionRestored: 'Versión restaurada',
    versionRestoredSaveToConfirm: 'Versión restaurada. Guarda para confirmar.',
    voteRecorded: '¡Voto registrado! Gracias por tus comentarios.',
    thankYouForFeedback: '¡Gracias por tus comentarios!',
    contentCopied: 'Contenido copiado al portapapeles',
  },

  // Mensajes informativos
  info: {
    noChangesToSave: 'No hay cambios para guardar',
  },

  // Mensajes de error (duplicados de errors.ts para conveniencia en contexto de toast)
  error: {
    incorrectPassword: 'Contraseña incorrecta',
    failedToSaveNote: 'Error al guardar la nota',
    clipboardUnavailable: 'Portapapeles no disponible',
    noNoteFoundOnServer: 'No se encontró nota en el servidor',
    failedToReloadNote: 'Error al recargar la nota',
    failedToDeleteNote: 'Error al eliminar la nota',
    failedToSave: 'Error al guardar',
    alreadyVoted: '¡Ya votaste por esto!',
    failedToRecordVote: 'Error al registrar el voto',
    pleaseEnterMessage: 'Por favor, ingresa un mensaje',
    failedToSubmitFeedback: 'Error al enviar comentarios',
    allFieldsRequired: 'Todos los campos son obligatorios',
    newPasswordsDoNotMatch: 'Las nuevas contraseñas no coinciden',
    newPasswordTooShort: 'La nueva contraseña debe tener al menos 4 caracteres',
    failedToChangePassword: 'Error al cambiar la contraseña',
    pleaseTypeToConfirm: 'Por favor, escribe "{siteName}" para confirmar',
    failedToLoadVersionHistory: 'Error al cargar el historial de versiones',
    failedToRestoreVersion: 'Error al restaurar la versión',
  },
};
