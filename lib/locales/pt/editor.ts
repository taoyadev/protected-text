/**
 * Interface do editor - barra de ferramentas, marcadores de posição, estatísticas, atalhos de teclado
 */

export const editor = {
  // Barra de ferramentas
  toolbar: {
    site: 'Site',
    saving: 'Salvando…',
    lastSaved: 'Último salvamento',
    switchToLightMode: 'Mudar para modo claro',
    switchToDarkMode: 'Mudar para modo escuro',
    toggleMarkdownPreview: 'Alternar Visualização Markdown',
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

  // Visualização Markdown
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
    okay: 'Aceitável',
    good: 'Boa',
    strong: 'Forte',
  },

  // Mudança de tema
  theme: {
    switchedToLight: 'Mudou para modo claro',
    switchedToDark: 'Mudou para modo escuro',
  },

  // Importação de arquivo
  fileImport: {
    acceptedFormats: '.txt,.md,.text',
  },
};
