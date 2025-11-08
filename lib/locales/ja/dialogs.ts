/**
 * すべてのダイアログコンテンツ - パスワードゲート、パスワード変更、削除、バージョン履歴
 */

export const dialogs = {
  // パスワードゲート
  passwordGate: {
    createPassword: 'パスワードを作成',
    unlockNote: 'ノートのロックを解除',
    passwordsNeverLeave: 'パスワードはあなたのデバイスを決して離れません。',
    passwordLabel: 'パスワード',
    confirmPasswordLabel: 'パスワードの確認',
    startWriting: '書き始める',
    unlock: 'ロック解除',
  },

  // パスワード変更ダイアログ
  changePassword: {
    title: 'パスワード変更',
    currentPasswordLabel: '現在のパスワード',
    currentPasswordPlaceholder: '現在のパスワードを入力',
    newPasswordLabel: '新しいパスワード',
    newPasswordPlaceholder: '新しいパスワードを入力',
    confirmNewPasswordLabel: '新しいパスワードの確認',
    confirmNewPasswordPlaceholder: '新しいパスワードを再入力',
    cancel: 'キャンセル',
    changePasswordButton: 'パスワードを変更',
  },

  // ノート削除ダイアログ
  deleteNote: {
    title: 'ノートを削除',
    warning1: 'これはあなたのノートを**完全に削除**します。',
    warning2: 'この操作は**元に戻せません**。バックアップなし、復元なし。',
    confirmPrompt: '入力してください',
    confirmPromptSuffix: '確認のため：',
    cancel: 'キャンセル',
    deleteForever: '完全に削除',
  },

  // バージョン履歴ダイアログ
  versionHistory: {
    title: 'バージョン履歴',
    loading: 'バージョンを読み込み中...',
    noVersions: 'まだバージョン履歴はありません',
    versionNumber: 'バージョン',
    restore: '復元',
    charactersLabel: '文字',
  },
};
