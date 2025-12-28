/**
 * Toast-/Benachrichtigungsmeldungen
 */

export const toasts = {
  // Erfolgsmeldungen
  success: {
    shareLinkCopied: 'Freigabe-Link kopiert',
    noteReloadedFromServer: 'Notiz vom Server neu geladen',
    passwordChangedSuccessfully: 'Passwort erfolgreich geändert',
    noteDeleted: 'Notiz gelöscht',
    fileImportedSuccessfully: 'Datei erfolgreich importiert',
    saved: 'Gespeichert!',
    versionRestored: 'Version wiederhergestellt',
    versionRestoredSaveToConfirm:
      'Version wiederhergestellt. Speichern zum Bestätigen.',
    voteRecorded: 'Stimme aufgezeichnet! Danke für Ihr Feedback.',
    thankYouForFeedback: 'Vielen Dank für Ihr Feedback!',
    contentCopied: 'Inhalt in die Zwischenablage kopiert',
  },

  // Informationsmeldungen
  info: {
    noChangesToSave: 'Keine Änderungen zum Speichern',
  },

  // Fehlermeldungen (aus errors.ts für Bequemlichkeit im Toast-Kontext dupliziert)
  error: {
    incorrectPassword: 'Falsches Passwort',
    failedToSaveNote: 'Fehler beim Speichern der Notiz',
    clipboardUnavailable: 'Zwischenablage nicht verfügbar',
    noNoteFoundOnServer: 'Keine Notiz auf dem Server gefunden',
    failedToReloadNote: 'Fehler beim Neuladen der Notiz',
    failedToDeleteNote: 'Fehler beim Löschen der Notiz',
    failedToSave: 'Fehler beim Speichern',
    alreadyVoted: 'Sie haben bereits dafür gestimmt!',
    failedToRecordVote: 'Fehler beim Aufzeichnen der Stimme',
    pleaseEnterMessage: 'Bitte geben Sie eine Nachricht ein',
    failedToSubmitFeedback: 'Fehler beim Absenden des Feedbacks',
    allFieldsRequired: 'Alle Felder sind erforderlich',
    newPasswordsDoNotMatch: 'Neue Passwörter stimmen nicht überein',
    newPasswordTooShort: 'Neues Passwort muss mindestens 4 Zeichen lang sein',
    failedToChangePassword: 'Fehler beim Ändern des Passworts',
    pleaseTypeToConfirm: 'Bitte geben Sie "{siteName}" zur Bestätigung ein',
    failedToLoadVersionHistory: 'Fehler beim Laden des Versionsverlaufs',
    failedToRestoreVersion: 'Fehler beim Wiederherstellen der Version',
  },
};
