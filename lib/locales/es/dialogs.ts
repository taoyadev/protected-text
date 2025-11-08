/**
 * Todo el contenido de diálogos - puerta de contraseña, cambiar contraseña, eliminar, historial de versiones
 */

export const dialogs = {
  // Puerta de contraseña
  passwordGate: {
    createPassword: 'Crear contraseña',
    unlockNote: 'Desbloquear nota',
    passwordsNeverLeave: 'Las contraseñas nunca salen de tu dispositivo.',
    passwordLabel: 'Contraseña',
    confirmPasswordLabel: 'Confirmar contraseña',
    startWriting: 'Empezar a escribir',
    unlock: 'Desbloquear',
  },

  // Diálogo de cambiar contraseña
  changePassword: {
    title: 'Cambiar Contraseña',
    currentPasswordLabel: 'Contraseña Actual',
    currentPasswordPlaceholder: 'Ingresa contraseña actual',
    newPasswordLabel: 'Nueva Contraseña',
    newPasswordPlaceholder: 'Ingresa nueva contraseña',
    confirmNewPasswordLabel: 'Confirmar Nueva Contraseña',
    confirmNewPasswordPlaceholder: 'Reingresa nueva contraseña',
    cancel: 'Cancelar',
    changePasswordButton: 'Cambiar Contraseña',
  },

  // Diálogo de eliminar nota
  deleteNote: {
    title: 'Eliminar Nota',
    warning1: 'Esto **eliminará permanentemente** tu nota.',
    warning2: 'Esta acción **no se puede deshacer**. Sin copias de seguridad, sin recuperación.',
    confirmPrompt: 'Escribe',
    confirmPromptSuffix: 'para confirmar:',
    cancel: 'Cancelar',
    deleteForever: 'Eliminar Para Siempre',
  },

  // Diálogo de historial de versiones
  versionHistory: {
    title: 'Historial de Versiones',
    loading: 'Cargando versiones...',
    noVersions: 'Aún no hay historial de versiones disponible',
    versionNumber: 'Versión',
    restore: 'Restaurar',
    charactersLabel: 'caracteres',
  },
};
