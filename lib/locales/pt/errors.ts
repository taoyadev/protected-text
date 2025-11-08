/**
 * Todas as mensagens de erro e mensagens de validação
 */

export const errors = {
  // Erros de rede/servidor
  network: {
    unableToReachServer: 'Não foi possível alcançar o servidor.',
    failedToSaveNote: 'Falha ao salvar a nota',
    failedToLoadNote: 'Falha ao carregar a nota',
    failedToDeleteNote: 'Falha ao excluir a nota',
    failedToReloadNote: 'Falha ao recarregar a nota',
    failedToLoadVersionHistory: 'Falha ao carregar o histórico de versões',
    failedToRestoreVersion: 'Falha ao restaurar a versão',
    failedToRecordVote: 'Falha ao registrar o voto',
    failedToRecordVotePleaseTryAgain: 'Falha ao registrar o voto. Por favor, tente novamente.',
    failedToSubmitFeedback: 'Falha ao enviar feedback',
    failedToSubmitFeedbackPleaseTryAgain: 'Falha ao enviar feedback. Por favor, tente novamente.',
    clipboardUnavailable: 'Área de transferência indisponível',
    noNoteFoundOnServer: 'Nenhuma nota encontrada no servidor',
  },

  // Erros de senha
  password: {
    incorrectPassword: 'Senha incorreta',
    passwordsDoNotMatch: 'As senhas não coincidem',
    newPasswordsDoNotMatch: 'As novas senhas não coincidem',
    incorrectOldPassword: 'Senha antiga incorreta',
    failedToChangePassword: 'Falha ao alterar a senha',
    allFieldsRequired: 'Todos os campos são obrigatórios',
    newPasswordTooShort: 'A nova senha deve ter pelo menos 4 caracteres',
    failedToDecryptVersion: 'Falha ao descriptografar a versão',
  },

  // Erros de validação
  validation: {
    siteNameInvalid: 'Use 3-32 letras minúsculas, números ou hífens.',
    pleaseEnterMessage: 'Por favor, digite uma mensagem',
    pleaseTypeToConfirm: 'Por favor, digite "{siteName}" para confirmar',
  },

  // Erros de votação
  voting: {
    alreadyVoted: 'Você já votou nisso!',
  },

  // Mensagens de confirmação
  confirmations: {
    unsavedChangesReloadAnyway: 'Você tem alterações não salvas. Recarregar mesmo assim?',
  },
};
