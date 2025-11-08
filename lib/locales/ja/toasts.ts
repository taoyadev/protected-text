/**
 * トースト/通知メッセージ
 */

export const toasts = {
  // 成功メッセージ
  success: {
    shareLinkCopied: '共有リンクをコピーしました',
    noteReloadedFromServer: 'サーバーからノートを再読み込みしました',
    passwordChangedSuccessfully: 'パスワードを変更しました',
    noteDeleted: 'ノートを削除しました',
    fileImportedSuccessfully: 'ファイルをインポートしました',
    saved: '保存しました！',
    versionRestored: 'バージョンを復元しました',
    versionRestoredSaveToConfirm: 'バージョンを復元しました。保存して確認してください。',
    voteRecorded: '投票を記録しました！フィードバックありがとうございます。',
    thankYouForFeedback: 'フィードバックありがとうございます！',
  },

  // 情報メッセージ
  info: {
    noChangesToSave: '保存する変更はありません',
  },

  // エラーメッセージ（トーストコンテキストでの便宜のためerrors.tsから複製）
  error: {
    incorrectPassword: 'パスワードが間違っています',
    failedToSaveNote: 'ノートの保存に失敗しました',
    clipboardUnavailable: 'クリップボードが利用できません',
    noNoteFoundOnServer: 'サーバーにノートが見つかりません',
    failedToReloadNote: 'ノートの再読み込みに失敗しました',
    failedToDeleteNote: 'ノートの削除に失敗しました',
    failedToSave: '保存に失敗しました',
    alreadyVoted: 'すでに投票しています！',
    failedToRecordVote: '投票の記録に失敗しました',
    pleaseEnterMessage: 'メッセージを入力してください',
    failedToSubmitFeedback: 'フィードバックの送信に失敗しました',
    allFieldsRequired: 'すべてのフィールドが必須です',
    newPasswordsDoNotMatch: '新しいパスワードが一致しません',
    newPasswordTooShort: '新しいパスワードは4文字以上である必要があります',
    failedToChangePassword: 'パスワードの変更に失敗しました',
    pleaseTypeToConfirm: '確認のため"{siteName}"と入力してください',
    failedToLoadVersionHistory: 'バージョン履歴の読み込みに失敗しました',
    failedToRestoreVersion: 'バージョンの復元に失敗しました',
  },
};
