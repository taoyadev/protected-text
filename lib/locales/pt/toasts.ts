/**
 * Mensagens de Toast/notificação
 */

export const toasts = {
  // Mensagens de sucesso
  success: {
    shareLinkCopied: 'Link de compartilhamento copiado',
    noteReloadedFromServer: 'Nota recarregada do servidor',
    passwordChangedSuccessfully: 'Senha alterada com sucesso',
    noteDeleted: 'Nota excluída',
    fileImportedSuccessfully: 'Arquivo importado com sucesso',
    saved: 'Salvo!',
    versionRestored: 'Versão restaurada',
    versionRestoredSaveToConfirm: 'Versão restaurada. Salve para confirmar.',
    voteRecorded: 'Voto registrado! Obrigado pelo feedback.',
    thankYouForFeedback: 'Obrigado pelo seu feedback!',
  },

  // Mensagens informativas
  info: {
    noChangesToSave: 'Nenhuma alteração para salvar',
  },

  // Mensagens de erro (duplicadas de errors.ts para conveniência no contexto de toast)
  error: {
    incorrectPassword: 'Senha incorreta',
    failedToSaveNote: 'Falha ao salvar a nota',
    clipboardUnavailable: 'Área de transferência indisponível',
    noNoteFoundOnServer: 'Nenhuma nota encontrada no servidor',
    failedToReloadNote: 'Falha ao recarregar a nota',
    failedToDeleteNote: 'Falha ao excluir a nota',
    failedToSave: 'Falha ao salvar',
    alreadyVoted: 'Você já votou nisso!',
    failedToRecordVote: 'Falha ao registrar o voto',
    pleaseEnterMessage: 'Por favor, digite uma mensagem',
    failedToSubmitFeedback: 'Falha ao enviar feedback',
    allFieldsRequired: 'Todos os campos são obrigatórios',
    newPasswordsDoNotMatch: 'As novas senhas não coincidem',
    newPasswordTooShort: 'A nova senha deve ter pelo menos 4 caracteres',
    failedToChangePassword: 'Falha ao alterar a senha',
    pleaseTypeToConfirm: 'Por favor, digite "{siteName}" para confirmar',
    failedToLoadVersionHistory: 'Falha ao carregar o histórico de versões',
    failedToRestoreVersion: 'Falha ao restaurar a versão',
  },
};
