/**
 * Todo o conteúdo de diálogos - porta de senha, alterar senha, excluir, histórico de versões
 */

export const dialogs = {
  // Porta de senha
  passwordGate: {
    createPassword: 'Criar senha',
    unlockNote: 'Desbloquear nota',
    passwordsNeverLeave: 'As senhas nunca saem do seu dispositivo.',
    passwordLabel: 'Senha',
    confirmPasswordLabel: 'Confirmar senha',
    startWriting: 'Começar a escrever',
    unlock: 'Desbloquear',
  },

  // Diálogo de alterar senha
  changePassword: {
    title: 'Alterar Senha',
    currentPasswordLabel: 'Senha Atual',
    currentPasswordPlaceholder: 'Digite a senha atual',
    newPasswordLabel: 'Nova Senha',
    newPasswordPlaceholder: 'Digite a nova senha',
    confirmNewPasswordLabel: 'Confirmar Nova Senha',
    confirmNewPasswordPlaceholder: 'Digite novamente a nova senha',
    cancel: 'Cancelar',
    changePasswordButton: 'Alterar Senha',
  },

  // Diálogo de excluir nota
  deleteNote: {
    title: 'Excluir Nota',
    warning1: 'Isso vai **excluir permanentemente** sua nota.',
    warning2:
      'Esta ação **não pode ser desfeita**. Sem backups, sem recuperação.',
    confirmPrompt: 'Digite',
    confirmPromptSuffix: 'para confirmar:',
    cancel: 'Cancelar',
    deleteForever: 'Excluir Para Sempre',
  },

  // Diálogo de histórico de versões
  versionHistory: {
    title: 'Histórico de Versões',
    loading: 'Carregando versões...',
    noVersions: 'Ainda não há histórico de versões disponível',
    versionNumber: 'Versão',
    restore: 'Restaurar',
    charactersLabel: 'caracteres',
  },
};
