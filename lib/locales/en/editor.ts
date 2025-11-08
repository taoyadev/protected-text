/**
 * Editor interface - toolbar, placeholders, stats, keyboard shortcuts
 */

export const editor = {
  // Toolbar
  toolbar: {
    site: 'Site',
    saving: 'Saving…',
    lastSaved: 'Last saved',
    switchToLightMode: 'Switch to light mode',
    switchToDarkMode: 'Switch to dark mode',
    toggleMarkdownPreview: 'Toggle Markdown Preview',
    search: 'Search (Ctrl+F)',
    versionHistory: 'Version History',
    reload: 'Reload',
    import: 'Import (Ctrl+I)',
    export: 'Export (Ctrl+E)',
    share: 'Share',
    changePassword: 'Change Password (Ctrl+K)',
    delete: 'Delete',
  },

  // Search
  search: {
    placeholder: 'Search in note... (Press Esc to close)',
    clear: 'Clear',
  },

  // Editor
  editor: {
    placeholder: 'Start typing… Password never leaves this browser tab.',
  },

  // Markdown preview
  markdownPreview: {
    emptyPlaceholder: '*Start typing to see preview...*',
  },

  // Stats
  stats: {
    words: 'words',
    characters: 'characters',
    lines: 'lines',
    unsavedChanges: 'Unsaved changes',
  },

  // Password strength
  passwordStrength: {
    weak: 'Weak',
    fair: 'Fair',
    okay: 'Okay',
    good: 'Good',
    strong: 'Strong',
  },

  // Theme switching
  theme: {
    switchedToLight: 'Switched to light mode',
    switchedToDark: 'Switched to dark mode',
  },

  // File import
  fileImport: {
    acceptedFormats: '.txt,.md,.text',
  },
};
