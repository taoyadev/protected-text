/**
 * Tous les messages d'erreur et messages de validation
 */

export const errors = {
  // Erreurs réseau/serveur
  network: {
    unableToReachServer: 'Impossible de joindre le serveur.',
    failedToSaveNote: "Échec de l'enregistrement de la note",
    failedToLoadNote: 'Échec du chargement de la note',
    failedToDeleteNote: 'Échec de la suppression de la note',
    failedToReloadNote: 'Échec du rechargement de la note',
    failedToLoadVersionHistory:
      "Échec du chargement de l'historique des versions",
    failedToRestoreVersion: 'Échec de la restauration de la version',
    failedToRecordVote: "Échec de l'enregistrement du vote",
    failedToRecordVotePleaseTryAgain:
      "Échec de l'enregistrement du vote. Veuillez réessayer.",
    failedToSubmitFeedback: "Échec de l'envoi des commentaires",
    failedToSubmitFeedbackPleaseTryAgain:
      "Échec de l'envoi des commentaires. Veuillez réessayer.",
    clipboardUnavailable: 'Presse-papiers non disponible',
    noNoteFoundOnServer: 'Aucune note trouvée sur le serveur',
  },

  // Erreurs de mot de passe
  password: {
    incorrectPassword: 'Mot de passe incorrect',
    passwordsDoNotMatch: 'Les mots de passe ne correspondent pas',
    newPasswordsDoNotMatch: 'Les nouveaux mots de passe ne correspondent pas',
    incorrectOldPassword: 'Ancien mot de passe incorrect',
    failedToChangePassword: 'Échec du changement de mot de passe',
    allFieldsRequired: 'Tous les champs sont obligatoires',
    newPasswordTooShort:
      'Le nouveau mot de passe doit contenir au moins 4 caractères',
    failedToDecryptVersion: 'Échec du déchiffrement de la version',
  },

  // Erreurs de validation
  validation: {
    siteNameInvalid: 'Utilisez 3-32 lettres minuscules, chiffres ou tirets.',
    pleaseEnterMessage: 'Veuillez entrer un message',
    pleaseTypeToConfirm: 'Veuillez taper "{siteName}" pour confirmer',
  },

  // Erreurs de vote
  voting: {
    alreadyVoted: 'Vous avez déjà voté pour ceci !',
  },

  // Messages de confirmation
  confirmations: {
    unsavedChangesReloadAnyway:
      'Vous avez des modifications non enregistrées. Recharger quand même ?',
  },
};
