/**
 * Interfaz del editor - barra de herramientas, marcadores de posición, estadísticas, atajos de teclado
 */

export const editor = {
  // Barra de herramientas
  toolbar: {
    site: 'Sitio',
    saving: 'Guardando…',
    lastSaved: 'Último guardado',
    switchToLightMode: 'Cambiar a modo claro',
    switchToDarkMode: 'Cambiar a modo oscuro',
    toggleMarkdownPreview: 'Alternar Vista Previa de Markdown',
    search: 'Buscar (Ctrl+F)',
    versionHistory: 'Historial de Versiones',
    reload: 'Recargar',
    import: 'Importar (Ctrl+I)',
    export: 'Exportar (Ctrl+E)',
    share: 'Compartir',
    changePassword: 'Cambiar Contraseña (Ctrl+K)',
    delete: 'Eliminar',
  },

  // Búsqueda
  search: {
    placeholder: 'Buscar en la nota... (Presiona Esc para cerrar)',
    clear: 'Limpiar',
  },

  // Editor
  editor: {
    placeholder: 'Empieza a escribir… La contraseña nunca sale de esta pestaña del navegador.',
  },

  // Vista previa de Markdown
  markdownPreview: {
    emptyPlaceholder: '*Empieza a escribir para ver la vista previa...*',
  },

  // Estadísticas
  stats: {
    words: 'palabras',
    characters: 'caracteres',
    lines: 'líneas',
    unsavedChanges: 'Cambios sin guardar',
  },

  // Fortaleza de contraseña
  passwordStrength: {
    weak: 'Débil',
    fair: 'Aceptable',
    okay: 'Bien',
    good: 'Buena',
    strong: 'Fuerte',
  },

  // Cambio de tema
  theme: {
    switchedToLight: 'Cambiado a modo claro',
    switchedToDark: 'Cambiado a modo oscuro',
  },

  // Importación de archivo
  fileImport: {
    acceptedFormats: '.txt,.md,.text',
  },
};
