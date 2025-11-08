/**
 * Interface de l'éditeur - barre d'outils, espaces réservés, statistiques, raccourcis clavier
 */

export const editor = {
  // Barre d'outils
  toolbar: {
    site: 'Site',
    saving: 'Enregistrement…',
    lastSaved: 'Dernier enregistrement',
    switchToLightMode: 'Passer au mode clair',
    switchToDarkMode: 'Passer au mode sombre',
    toggleMarkdownPreview: 'Basculer l\'Aperçu Markdown',
    search: 'Rechercher (Ctrl+F)',
    versionHistory: 'Historique des Versions',
    reload: 'Recharger',
    import: 'Importer (Ctrl+I)',
    export: 'Exporter (Ctrl+E)',
    share: 'Partager',
    changePassword: 'Changer le Mot de Passe (Ctrl+K)',
    delete: 'Supprimer',
  },

  // Recherche
  search: {
    placeholder: 'Rechercher dans la note... (Appuyez sur Échap pour fermer)',
    clear: 'Effacer',
  },

  // Éditeur
  editor: {
    placeholder: 'Commencez à taper… Le mot de passe ne quitte jamais cet onglet du navigateur.',
  },

  // Aperçu Markdown
  markdownPreview: {
    emptyPlaceholder: '*Commencez à taper pour voir l\'aperçu...*',
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
    fair: 'Acceptable',
    okay: 'Correct',
    good: 'Bon',
    strong: 'Fort',
  },

  // Changement de thème
  theme: {
    switchedToLight: 'Passé au mode clair',
    switchedToDark: 'Passé au mode sombre',
  },

  // Importation de fichier
  fileImport: {
    acceptedFormats: '.txt,.md,.text',
  },
};
