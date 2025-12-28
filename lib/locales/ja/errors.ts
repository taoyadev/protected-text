/**
 * すべてのエラーメッセージと検証メッセージ
 */

export const errors = {
  // ネットワーク/サーバーエラー
  network: {
    unableToReachServer: 'サーバーに接続できません。',
    failedToSaveNote: 'ノートの保存に失敗しました',
    failedToLoadNote: 'ノートの読み込みに失敗しました',
    failedToDeleteNote: 'ノートの削除に失敗しました',
    failedToReloadNote: 'ノートの再読み込みに失敗しました',
    failedToLoadVersionHistory: 'バージョン履歴の読み込みに失敗しました',
    failedToRestoreVersion: 'バージョンの復元に失敗しました',
    failedToRecordVote: '投票の記録に失敗しました',
    failedToRecordVotePleaseTryAgain:
      '投票の記録に失敗しました。もう一度お試しください。',
    failedToSubmitFeedback: 'フィードバックの送信に失敗しました',
    failedToSubmitFeedbackPleaseTryAgain:
      'フィードバックの送信に失敗しました。もう一度お試しください。',
    clipboardUnavailable: 'クリップボードが利用できません',
    noNoteFoundOnServer: 'サーバーにノートが見つかりません',
  },

  // パスワードエラー
  password: {
    incorrectPassword: 'パスワードが間違っています',
    passwordsDoNotMatch: 'パスワードが一致しません',
    newPasswordsDoNotMatch: '新しいパスワードが一致しません',
    incorrectOldPassword: '古いパスワードが間違っています',
    failedToChangePassword: 'パスワードの変更に失敗しました',
    allFieldsRequired: 'すべてのフィールドが必須です',
    newPasswordTooShort: '新しいパスワードは4文字以上である必要があります',
    failedToDecryptVersion: 'バージョンの復号化に失敗しました',
  },

  // 検証エラー
  validation: {
    siteNameInvalid:
      '3〜32文字の小文字、数字、またはダッシュを使用してください。',
    pleaseEnterMessage: 'メッセージを入力してください',
    pleaseTypeToConfirm: '確認のため"{siteName}"と入力してください',
  },

  // 投票エラー
  voting: {
    alreadyVoted: 'すでに投票しています！',
  },

  // 確認プロンプト
  confirmations: {
    unsavedChangesReloadAnyway:
      '未保存の変更があります。とにかく再読み込みしますか？',
  },
};
