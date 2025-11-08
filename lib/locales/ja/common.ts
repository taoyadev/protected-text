/**
 * 共通UI要素 - ボタン、ラベル、状態、アクション
 */

export const common = {
  // アクション
  actions: {
    save: '保存',
    saving: '保存中…',
    saved: '保存しました！',
    cancel: 'キャンセル',
    delete: '削除',
    confirm: '確認',
    close: '閉じる',
    submit: '送信',
    export: 'エクスポート',
    import: 'インポート',
    share: '共有',
    reload: '再読み込み',
    restore: '復元',
    clear: 'クリア',
    sending: '送信中...',
  },

  // 状態
  states: {
    loading: '読み込み中…',
    loadingNote: 'ノートを読み込み中…',
    notSavedYet: 'まだ保存されていません',
    unsavedChanges: '未保存の変更',
    noChangesToSave: '保存する変更はありません',
  },

  // 時間関連
  time: {
    lastSaved: '最終保存',
  },

  // 統計
  stats: {
    words: '単語',
    characters: '文字',
    lines: '行',
    votes: '票',
    vote: '票',
  },

  // ナビゲーション
  navigation: {
    features: '機能',
    security: 'セキュリティ',
    securityAndPrivacy: 'セキュリティとプライバシー',
    faq: 'よくある質問',
    roadmap: 'ロードマップ',
    roadmapAndFeatureRequests: 'ロードマップと機能リクエスト',
    quickLinks: 'クイックリンク',
    getInTouch: 'お問い合わせ',
    openNavigation: 'ナビゲーションを開く',
  },

  // ブランド
  brand: {
    protectedText: 'Protected Text',
    protectedTextPro: 'Protected Text PRO',
  },

  // その他
  misc: {
    optional: '任意',
    required: '*',
    characters: '文字',
  },
};
