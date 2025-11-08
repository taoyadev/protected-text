/**
 * 所有错误消息和验证消息
 */

export const errors = {
  // 网络/服务器错误
  network: {
    unableToReachServer: '无法连接到服务器。',
    failedToSaveNote: '保存笔记失败',
    failedToLoadNote: '加载笔记失败',
    failedToDeleteNote: '删除笔记失败',
    failedToReloadNote: '重新加载笔记失败',
    failedToLoadVersionHistory: '加载版本历史失败',
    failedToRestoreVersion: '恢复版本失败',
    failedToRecordVote: '记录投票失败',
    failedToRecordVotePleaseTryAgain: '记录投票失败。请重试。',
    failedToSubmitFeedback: '提交反馈失败',
    failedToSubmitFeedbackPleaseTryAgain: '提交反馈失败。请重试。',
    clipboardUnavailable: '剪贴板不可用',
    noNoteFoundOnServer: '服务器上未找到笔记',
  },

  // 密码错误
  password: {
    incorrectPassword: '密码错误',
    passwordsDoNotMatch: '密码不匹配',
    newPasswordsDoNotMatch: '新密码不匹配',
    incorrectOldPassword: '旧密码错误',
    failedToChangePassword: '更改密码失败',
    allFieldsRequired: '所有字段都是必需的',
    newPasswordTooShort: '新密码必须至少为4个字符',
    failedToDecryptVersion: '解密版本失败',
  },

  // 验证错误
  validation: {
    siteNameInvalid: '使用3-32个小写字母、数字或破折号。',
    pleaseEnterMessage: '请输入消息',
    pleaseTypeToConfirm: '请输入"{siteName}"以确认',
  },

  // 投票错误
  voting: {
    alreadyVoted: '您已经投票了！',
  },

  // 确认提示
  confirmations: {
    unsavedChangesReloadAnyway: '您有未保存的更改。仍然重新加载？',
  },
};
