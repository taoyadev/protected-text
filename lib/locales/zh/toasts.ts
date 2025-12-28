/**
 * Toast/通知消息
 */

export const toasts = {
  // 成功消息
  success: {
    shareLinkCopied: '分享链接已复制',
    noteReloadedFromServer: '笔记已从服务器重新加载',
    passwordChangedSuccessfully: '密码更改成功',
    noteDeleted: '笔记已删除',
    fileImportedSuccessfully: '文件导入成功',
    saved: '已保存！',
    versionRestored: '版本已恢复',
    versionRestoredSaveToConfirm: '版本已恢复。保存以确认。',
    voteRecorded: '投票已记录！感谢您的反馈。',
    thankYouForFeedback: '感谢您的反馈！',
    contentCopied: '内容已复制到剪贴板',
  },

  // 信息消息
  info: {
    noChangesToSave: '没有需要保存的更改',
  },

  // 错误消息（为了在toast上下文中方便而从errors.ts复制）
  error: {
    incorrectPassword: '密码错误',
    failedToSaveNote: '保存笔记失败',
    clipboardUnavailable: '剪贴板不可用',
    noNoteFoundOnServer: '服务器上未找到笔记',
    failedToReloadNote: '重新加载笔记失败',
    failedToDeleteNote: '删除笔记失败',
    failedToSave: '保存失败',
    alreadyVoted: '您已经投票了！',
    failedToRecordVote: '记录投票失败',
    pleaseEnterMessage: '请输入消息',
    failedToSubmitFeedback: '提交反馈失败',
    allFieldsRequired: '所有字段都是必需的',
    newPasswordsDoNotMatch: '新密码不匹配',
    newPasswordTooShort: '新密码必须至少为4个字符',
    failedToChangePassword: '更改密码失败',
    pleaseTypeToConfirm: '请输入"{siteName}"以确认',
    failedToLoadVersionHistory: '加载版本历史失败',
    failedToRestoreVersion: '恢复版本失败',
  },
};
