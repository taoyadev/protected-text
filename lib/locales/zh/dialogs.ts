/**
 * 所有对话框内容 - 密码门、更改密码、删除、版本历史
 */

export const dialogs = {
  // 密码门
  passwordGate: {
    createPassword: '创建密码',
    unlockNote: '解锁笔记',
    passwordsNeverLeave: '密码永不离开您的设备。',
    passwordLabel: '密码',
    confirmPasswordLabel: '确认密码',
    startWriting: '开始写作',
    unlock: '解锁',
  },

  // 更改密码对话框
  changePassword: {
    title: '更改密码',
    currentPasswordLabel: '当前密码',
    currentPasswordPlaceholder: '输入当前密码',
    newPasswordLabel: '新密码',
    newPasswordPlaceholder: '输入新密码',
    confirmNewPasswordLabel: '确认新密码',
    confirmNewPasswordPlaceholder: '重新输入新密码',
    cancel: '取消',
    changePasswordButton: '更改密码',
  },

  // 删除笔记对话框
  deleteNote: {
    title: '删除笔记',
    warning1: '这将**永久删除**您的笔记。',
    warning2: '此操作**无法撤消**。没有备份，无法恢复。',
    confirmPrompt: '输入',
    confirmPromptSuffix: '以确认：',
    cancel: '取消',
    deleteForever: '永久删除',
  },

  // 版本历史对话框
  versionHistory: {
    title: '版本历史',
    loading: '加载版本中...',
    noVersions: '尚无版本历史可用',
    versionNumber: '版本',
    restore: '恢复',
    charactersLabel: '字符',
  },
};
