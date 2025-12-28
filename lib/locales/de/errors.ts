/**
 * Alle Fehlermeldungen und Validierungsmeldungen
 */

export const errors = {
  // Netzwerk-/Server-Fehler
  network: {
    unableToReachServer: 'Server kann nicht erreicht werden.',
    failedToSaveNote: 'Fehler beim Speichern der Notiz',
    failedToLoadNote: 'Fehler beim Laden der Notiz',
    failedToDeleteNote: 'Fehler beim Löschen der Notiz',
    failedToReloadNote: 'Fehler beim Neuladen der Notiz',
    failedToLoadVersionHistory: 'Fehler beim Laden des Versionsverlaufs',
    failedToRestoreVersion: 'Fehler beim Wiederherstellen der Version',
    failedToRecordVote: 'Fehler beim Aufzeichnen der Stimme',
    failedToRecordVotePleaseTryAgain:
      'Fehler beim Aufzeichnen der Stimme. Bitte versuchen Sie es erneut.',
    failedToSubmitFeedback: 'Fehler beim Absenden des Feedbacks',
    failedToSubmitFeedbackPleaseTryAgain:
      'Fehler beim Absenden des Feedbacks. Bitte versuchen Sie es erneut.',
    clipboardUnavailable: 'Zwischenablage nicht verfügbar',
    noNoteFoundOnServer: 'Keine Notiz auf dem Server gefunden',
  },

  // Passwort-Fehler
  password: {
    incorrectPassword: 'Falsches Passwort',
    passwordsDoNotMatch: 'Passwörter stimmen nicht überein',
    newPasswordsDoNotMatch: 'Neue Passwörter stimmen nicht überein',
    incorrectOldPassword: 'Altes Passwort ist falsch',
    failedToChangePassword: 'Fehler beim Ändern des Passworts',
    allFieldsRequired: 'Alle Felder sind erforderlich',
    newPasswordTooShort: 'Neues Passwort muss mindestens 4 Zeichen lang sein',
    failedToDecryptVersion: 'Fehler beim Entschlüsseln der Version',
  },

  // Validierungsfehler
  validation: {
    siteNameInvalid:
      'Verwenden Sie 3-32 Kleinbuchstaben, Zahlen oder Bindestriche.',
    pleaseEnterMessage: 'Bitte geben Sie eine Nachricht ein',
    pleaseTypeToConfirm: 'Bitte geben Sie "{siteName}" zur Bestätigung ein',
  },

  // Abstimmungsfehler
  voting: {
    alreadyVoted: 'Sie haben bereits dafür gestimmt!',
  },

  // Bestätigungsmeldungen
  confirmations: {
    unsavedChangesReloadAnyway:
      'Sie haben nicht gespeicherte Änderungen. Trotzdem neu laden?',
  },
};
