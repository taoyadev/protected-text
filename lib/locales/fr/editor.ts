/**
 * Interface de l'éditeur - barre d'outils, espaces réservés, statistiques, raccourcis clavier
 */

export const editor = {
  // Barre d'outils
  toolbar: {
    site: 'Site',
    saving: 'Enregistrement…',
    lastSaved: 'Dernier enregistrement',
    switchToLightMode: 'Passer en mode clair',
    switchToDarkMode: 'Passer en mode sombre',
    toggleMarkdownPreview: 'Aperçu Markdown',
    search: 'Rechercher (Ctrl+F)',
    versionHistory: 'Historique des versions',
    reload: 'Recharger',
    import: 'Importer (Ctrl+I)',
    export: 'Exporter (Ctrl+E)',
    share: 'Partager',
    changePassword: 'Changer le mot de passe (Ctrl+K)',
    delete: 'Supprimer',
  },

  // Recherche
  search: {
    placeholder: 'Rechercher dans la note... (Appuyez sur Esc pour fermer)',
    clear: 'Effacer',
  },

  // Éditeur
  editor: {
    placeholder:
      'Commencez à écrire… Le mot de passe ne quitte jamais cet onglet du navigateur.',
  },

  // Aperçu Markdown
  markdownPreview: {
    emptyPlaceholder: "*Commencez à écrire pour voir l'aperçu...*",
  },

  // Statistiques
  stats: {
    words: 'mots',
    characters: 'caractères',
    lines: 'lignes',
    unsavedChanges: 'Modifications non enregistrées',
  },

  // Force du mot de passe
  passwordStrength: {
    weak: 'Faible',
    fair: 'Moyen',
    okay: 'Correct',
    good: 'Bon',
    strong: 'Fort',
  },

  // Changement de thème
  theme: {
    switchedToLight: 'Passé en mode clair',
    switchedToDark: 'Passé en mode sombre',
  },

  // Importation de fichier
  fileImport: {
    acceptedFormats: '.txt,.md,.text',
  },

  // Keyboard shortcuts
  shortcuts: {
    title: 'Raccourcis Clavier',
    description: 'Appuyez sur ? pour ouvrir ce dialogue',
    save: 'Enregistrer la note',
    search: 'Rechercher dans la note',
    closeDialogs: 'Fermer les dialogues',
    showShortcuts: 'Afficher les raccourcis clavier',
    export: 'Exporter la note',
    import: 'Importer un fichier',
    changePassword: 'Changer le mot de passe',
  },

  // Autosave status
  autosave: {
    allChangesSaved: 'Toutes les modifications sont enregistrées',
    saving: 'Enregistrement...',
    unsavedChanges: 'Modifications non enregistrées',
  },
};
