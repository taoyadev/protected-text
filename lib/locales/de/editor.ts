/**
 * Editor-Oberfläche - Symbolleiste, Platzhalter, Statistiken, Tastenkombinationen
 */

export const editor = {
  // Symbolleiste
  toolbar: {
    site: 'Site',
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
    placeholder: 'In Notiz suchen... (Esc zum Schließen drücken)',
    clear: 'Löschen',
  },

  // Editor
  editor: {
    placeholder: 'Fangen Sie an zu tippen… Passwort verlässt niemals diesen Browser-Tab.',
  },

  // Markdown-Vorschau
  markdownPreview: {
    emptyPlaceholder: '*Fangen Sie an zu tippen, um die Vorschau zu sehen...*',
  },

  // Statistiken
  stats: {
    words: 'Wörter',
    characters: 'Zeichen',
    lines: 'Zeilen',
    unsavedChanges: 'Nicht gespeicherte Änderungen',
  },

  // Passwortstärke
  passwordStrength: {
    weak: 'Schwach',
    fair: 'Akzeptabel',
    okay: 'Okay',
    good: 'Gut',
    strong: 'Stark',
  },

  // Themenwechsel
  theme: {
    switchedToLight: 'Zum hellen Modus gewechselt',
    switchedToDark: 'Zum dunklen Modus gewechselt',
  },

  // Dateiimport
  fileImport: {
    acceptedFormats: '.txt,.md,.text',
  },
};
