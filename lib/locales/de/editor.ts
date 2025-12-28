/**
 * Editor-Oberfläche - Symbolleiste, Platzhalter, Statistiken, Tastenkürzel
 */

export const editor = {
  // Symbolleiste
  toolbar: {
    site: 'Seite',
    saving: 'Speichern…',
    lastSaved: 'Zuletzt gespeichert',
    switchToLightMode: 'Zum hellen Modus wechseln',
    switchToDarkMode: 'Zum dunklen Modus wechseln',
    toggleMarkdownPreview: 'Markdown-Vorschau umschalten',
    search: 'Suchen (Strg+F)',
    versionHistory: 'Versionsverlauf',
    reload: 'Neu laden',
    import: 'Importieren (Strg+I)',
    export: 'Exportieren (Strg+E)',
    share: 'Teilen',
    changePassword: 'Passwort ändern (Strg+K)',
    delete: 'Löschen',
  },

  // Suche
  search: {
    placeholder: 'In Notiz suchen... (Esc zum Schließen)',
    clear: 'Löschen',
  },

  // Editor
  editor: {
    placeholder:
      'Fangen Sie an zu schreiben… Das Passwort verlässt nie diesen Browser-Tab.',
  },

  // Markdown-Vorschau
  markdownPreview: {
    emptyPlaceholder:
      '*Fangen Sie an zu schreiben, um die Vorschau zu sehen...*',
  },

  // Statistiken
  stats: {
    words: 'Wörter',
    characters: 'Zeichen',
    lines: 'Zeilen',
    unsavedChanges: 'Ungespeicherte Änderungen',
  },

  // Passwortstärke
  passwordStrength: {
    weak: 'Schwach',
    fair: 'Ausreichend',
    okay: 'Okay',
    good: 'Gut',
    strong: 'Stark',
  },

  // Themenwechsel
  theme: {
    switchedToLight: 'Zu hellem Modus gewechselt',
    switchedToDark: 'Zu dunklem Modus gewechselt',
  },

  // Datei-Import
  fileImport: {
    acceptedFormats: '.txt,.md,.text',
  },

  // Keyboard shortcuts
  shortcuts: {
    title: 'Tastenkürzel',
    description: 'Drücken Sie ? um diesen Dialog zu öffnen',
    save: 'Notiz speichern',
    search: 'In Notiz suchen',
    closeDialogs: 'Dialoge schließen',
    showShortcuts: 'Tastenkürzel anzeigen',
    export: 'Notiz exportieren',
    import: 'Datei importieren',
    changePassword: 'Passwort ändern',
  },

  // Autosave status
  autosave: {
    allChangesSaved: 'Alle Änderungen gespeichert',
    saving: 'Speichern...',
    unsavedChanges: 'Ungespeicherte Änderungen',
  },
};
