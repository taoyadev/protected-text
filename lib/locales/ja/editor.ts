/**
 * エディタインターフェース - ツールバー、プレースホルダー、統計、キーボードショートカット
 */

export const editor = {
  // ツールバー
  toolbar: {
    site: 'サイト',
    saving: '保存中…',
    lastSaved: '最終保存',
    switchToLightMode: 'ライトモードに切り替え',
    switchToDarkMode: 'ダークモードに切り替え',
    toggleMarkdownPreview: 'Markdownプレビューを切り替え',
    search: '検索（Ctrl+F）',
    versionHistory: 'バージョン履歴',
    reload: '再読み込み',
    import: 'インポート（Ctrl+I）',
    export: 'エクスポート（Ctrl+E）',
    share: '共有',
    changePassword: 'パスワード変更（Ctrl+K）',
    delete: '削除',
  },

  // 検索
  search: {
    placeholder: 'ノート内を検索...（Escキーで閉じる）',
    clear: 'クリア',
  },

  // エディタ
  editor: {
    placeholder: '入力を開始…パスワードはこのブラウザタブから決して離れません。',
  },

  // Markdownプレビュー
  markdownPreview: {
    emptyPlaceholder: '*入力を開始してプレビューを表示...*',
  },

  // 統計
  stats: {
    words: '単語',
    characters: '文字',
    lines: '行',
    unsavedChanges: '未保存の変更',
  },

  // パスワード強度
  passwordStrength: {
    weak: '弱い',
    fair: '普通',
    okay: 'まあまあ',
    good: '良い',
    strong: '強い',
  },

  // テーマ切り替え
  theme: {
    switchedToLight: 'ライトモードに切り替えました',
    switchedToDark: 'ダークモードに切り替えました',
  },

  // ファイルインポート
  fileImport: {
    acceptedFormats: '.txt,.md,.text',
  },
};
