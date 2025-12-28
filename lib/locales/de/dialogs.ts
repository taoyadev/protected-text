/**
 * Alle Dialog-Inhalte - Passwort-Gate, Passwort ändern, Löschen, Versionsverlauf
 */

export const dialogs = {
  // Passwort-Gate
  passwordGate: {
    createPassword: 'Passwort erstellen',
    unlockNote: 'Notiz entsperren',
    passwordsNeverLeave: 'Passwörter verlassen niemals Ihr Gerät.',
    passwordLabel: 'Passwort',
    confirmPasswordLabel: 'Passwort bestätigen',
    startWriting: 'Mit dem Schreiben beginnen',
    unlock: 'Entsperren',
  },

  // Passwort-ändern-Dialog
  changePassword: {
    title: 'Passwort ändern',
    currentPasswordLabel: 'Aktuelles Passwort',
    currentPasswordPlaceholder: 'Aktuelles Passwort eingeben',
    newPasswordLabel: 'Neues Passwort',
    newPasswordPlaceholder: 'Neues Passwort eingeben',
    confirmNewPasswordLabel: 'Neues Passwort bestätigen',
    confirmNewPasswordPlaceholder: 'Neues Passwort erneut eingeben',
    cancel: 'Abbrechen',
    changePasswordButton: 'Passwort ändern',
  },

  // Notiz-löschen-Dialog
  deleteNote: {
    title: 'Notiz löschen',
    warning1: 'Dies wird Ihre Notiz **dauerhaft löschen**.',
    warning2:
      'Diese Aktion **kann nicht rückgängig gemacht werden**. Keine Backups, keine Wiederherstellung.',
    confirmPrompt: 'Geben Sie',
    confirmPromptSuffix: 'zur Bestätigung ein:',
    cancel: 'Abbrechen',
    deleteForever: 'Für immer löschen',
  },

  // Versionsverlauf-Dialog
  versionHistory: {
    title: 'Versionsverlauf',
    loading: 'Versionen werden geladen...',
    noVersions: 'Noch kein Versionsverlauf verfügbar',
    versionNumber: 'Version',
    restore: 'Wiederherstellen',
    charactersLabel: 'Zeichen',
  },
};
