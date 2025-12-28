/**
 * Éléments communs de l'interface - boutons, étiquettes, états, actions
 */

export const common = {
  // Actions
  actions: {
    save: 'Enregistrer',
    saving: 'Enregistrement…',
    saved: 'Enregistré !',
    cancel: 'Annuler',
    delete: 'Supprimer',
    confirm: 'Confirmer',
    close: 'Fermer',
    submit: 'Soumettre',
    export: 'Exporter',
    import: 'Importer',
    share: 'Partager',
    reload: 'Recharger',
    restore: 'Restaurer',
    clear: 'Effacer',
    sending: 'Envoi...',
    add: 'Ajouter',
    createNewTab: 'Nouvel onglet',
    closeTab: "Fermer l'onglet",
    showPassword: 'Afficher le mot de passe',
    hidePassword: 'Masquer le mot de passe',
    copyAll: 'Copier tout le contenu',
  },

  // États
  states: {
    loading: 'Chargement…',
    loadingNote: 'Chargement de la note…',
    notSavedYet: 'Pas encore enregistré',
    unsavedChanges: 'Modifications non enregistrées',
    noChangesToSave: 'Aucune modification à enregistrer',
    noTabsOpen: 'Aucun onglet ouvert',
  },

  // Relatif au temps
  time: {
    lastSaved: 'Dernier enregistrement',
  },

  // Statistiques
  stats: {
    words: 'mots',
    characters: 'caractères',
    lines: 'lignes',
    votes: 'votes',
    vote: 'vote',
  },

  // Navigation
  navigation: {
    features: 'Fonctionnalités',
    security: 'Sécurité',
    securityAndPrivacy: 'Sécurité et Confidentialité',
    faq: 'FAQ',
    roadmap: 'Feuille de Route',
    roadmapAndFeatureRequests:
      'Feuille de Route et Demandes de Fonctionnalités',
    quickLinks: 'Liens Rapides',
    getInTouch: 'Nous Contacter',
    openNavigation: 'Ouvrir la navigation',
  },

  // Marque
  brand: {
    protectedText: 'Protected Text',
    protectedTextPro: 'Protected Text PRO',
  },

  // Divers
  misc: {
    optional: 'facultatif',
    required: '*',
    characters: 'caractères',
  },

  // Espaces réservés
  placeholders: {
    enterSiteName: 'Entrez le nom du site…',
  },
};
