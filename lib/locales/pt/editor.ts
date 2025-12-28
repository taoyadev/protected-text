/**
 * Interface do editor - barra de ferramentas, espaços reservados, estatísticas, atalhos de teclado
 */

export const editor = {
  // Barra de ferramentas
  toolbar: {
    site: 'Site',
    saving: 'Salvando…',
    lastSaved: 'Último salvamento',
    switchToLightMode: 'Mudar para modo claro',
    switchToDarkMode: 'Mudar para modo escuro',
    toggleMarkdownPreview: 'Alternar Visualização de Markdown',
    search: 'Buscar (Ctrl+F)',
    versionHistory: 'Histórico de Versões',
    reload: 'Recarregar',
    import: 'Importar (Ctrl+I)',
    export: 'Exportar (Ctrl+E)',
    share: 'Compartilhar',
    changePassword: 'Alterar Senha (Ctrl+K)',
    delete: 'Excluir',
  },

  // Busca
  search: {
    placeholder: 'Buscar na nota... (Pressione Esc para fechar)',
    clear: 'Limpar',
  },

  // Editor
  editor: {
    placeholder: 'Comece a digitar… A senha nunca sai desta aba do navegador.',
  },

  // Visualização de Markdown
  markdownPreview: {
    emptyPlaceholder: '*Comece a digitar para ver a visualização...*',
  },

  // Estatísticas
  stats: {
    words: 'palavras',
    characters: 'caracteres',
    lines: 'linhas',
    unsavedChanges: 'Alterações não salvas',
  },

  // Força da senha
  passwordStrength: {
    weak: 'Fraca',
    fair: 'Razoável',
    okay: 'Ok',
    good: 'Boa',
    strong: 'Forte',
  },

  // Mudança de tema
  theme: {
    switchedToLight: 'Mudado para modo claro',
    switchedToDark: 'Mudado para modo escuro',
  },

  // Importação de arquivo
  fileImport: {
    acceptedFormats: '.txt,.md,.text',
  },

  // Keyboard shortcuts
  shortcuts: {
    title: 'Atalhos de Teclado',
    description: 'Pressione ? para abrir este diálogo',
    save: 'Salvar nota',
    search: 'Buscar na nota',
    closeDialogs: 'Fechar diálogos',
    showShortcuts: 'Mostrar atalhos de teclado',
    export: 'Exportar nota',
    import: 'Importar arquivo',
    changePassword: 'Alterar senha',
  },

  // Autosave status
  autosave: {
    allChangesSaved: 'Todas as alterações salvas',
    saving: 'Salvando...',
    unsavedChanges: 'Alterações não salvas',
  },
};
