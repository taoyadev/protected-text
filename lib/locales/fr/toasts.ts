/**
 * Messages de Toast/notification
 */

export const toasts = {
  // Messages de succès
  success: {
    shareLinkCopied: 'Lien de partage copié',
    noteReloadedFromServer: 'Note rechargée depuis le serveur',
    passwordChangedSuccessfully: 'Mot de passe changé avec succès',
    noteDeleted: 'Note supprimée',
    fileImportedSuccessfully: 'Fichier importé avec succès',
    saved: 'Enregistré !',
    versionRestored: 'Version restaurée',
    versionRestoredSaveToConfirm: 'Version restaurée. Enregistrez pour confirmer.',
    voteRecorded: 'Vote enregistré ! Merci pour vos commentaires.',
    thankYouForFeedback: 'Merci pour vos commentaires !',
  },

  // Messages informatifs
  info: {
    noChangesToSave: 'Aucune modification à enregistrer',
  },

  // Messages d'erreur (dupliqués de errors.ts pour plus de commodité dans le contexte des toasts)
  error: {
    incorrectPassword: 'Mot de passe incorrect',
    failedToSaveNote: 'Échec de l\'enregistrement de la note',
    clipboardUnavailable: 'Presse-papiers non disponible',
    noNoteFoundOnServer: 'Aucune note trouvée sur le serveur',
    failedToReloadNote: 'Échec du rechargement de la note',
    failedToDeleteNote: 'Échec de la suppression de la note',
    failedToSave: 'Échec de l\'enregistrement',
    alreadyVoted: 'Vous avez déjà voté pour ceci !',
    failedToRecordVote: 'Échec de l\'enregistrement du vote',
    pleaseEnterMessage: 'Veuillez entrer un message',
    failedToSubmitFeedback: 'Échec de l\'envoi des commentaires',
    allFieldsRequired: 'Tous les champs sont obligatoires',
    newPasswordsDoNotMatch: 'Les nouveaux mots de passe ne correspondent pas',
    newPasswordTooShort: 'Le nouveau mot de passe doit contenir au moins 4 caractères',
    failedToChangePassword: 'Échec du changement de mot de passe',
    pleaseTypeToConfirm: 'Veuillez taper "{siteName}" pour confirmer',
    failedToLoadVersionHistory: 'Échec du chargement de l\'historique des versions',
    failedToRestoreVersion: 'Échec de la restauration de la version',
  },
};
