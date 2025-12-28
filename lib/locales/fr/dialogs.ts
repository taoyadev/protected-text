/**
 * Tout le contenu des dialogues - porte mot de passe, changer mot de passe, supprimer, historique des versions
 */

export const dialogs = {
  // Porte mot de passe
  passwordGate: {
    createPassword: 'Créer un mot de passe',
    unlockNote: 'Déverrouiller la note',
    passwordsNeverLeave: 'Les mots de passe ne quittent jamais votre appareil.',
    passwordLabel: 'Mot de passe',
    confirmPasswordLabel: 'Confirmer le mot de passe',
    startWriting: 'Commencer à écrire',
    unlock: 'Déverrouiller',
  },

  // Dialogue de changement de mot de passe
  changePassword: {
    title: 'Changer le Mot de Passe',
    currentPasswordLabel: 'Mot de Passe Actuel',
    currentPasswordPlaceholder: 'Entrez le mot de passe actuel',
    newPasswordLabel: 'Nouveau Mot de Passe',
    newPasswordPlaceholder: 'Entrez le nouveau mot de passe',
    confirmNewPasswordLabel: 'Confirmer le Nouveau Mot de Passe',
    confirmNewPasswordPlaceholder: 'Réentrez le nouveau mot de passe',
    cancel: 'Annuler',
    changePasswordButton: 'Changer le Mot de Passe',
  },

  // Dialogue de suppression de note
  deleteNote: {
    title: 'Supprimer la Note',
    warning1: 'Cela **supprimera définitivement** votre note.',
    warning2:
      'Cette action **ne peut pas être annulée**. Pas de sauvegardes, pas de récupération.',
    confirmPrompt: 'Tapez',
    confirmPromptSuffix: 'pour confirmer :',
    cancel: 'Annuler',
    deleteForever: 'Supprimer Définitivement',
  },

  // Dialogue d'historique des versions
  versionHistory: {
    title: 'Historique des Versions',
    loading: 'Chargement des versions...',
    noVersions: 'Aucun historique de versions disponible pour le moment',
    versionNumber: 'Version',
    restore: 'Restaurer',
    charactersLabel: 'caractères',
  },
};
