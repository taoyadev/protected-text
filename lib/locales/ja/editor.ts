/**
 * エディターインターフェース - ツールバー、プレースホルダー、統計、キーボードショートカット
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
    search: '検索 (Ctrl+F)',
    versionHistory: 'バージョン履歴',
    reload: '再読み込み',
    import: 'インポート (Ctrl+I)',
    export: 'エクスポート (Ctrl+E)',
    share: '共有',
    changePassword: 'パスワード変更 (Ctrl+K)',
    delete: '削除',
  },

  // 検索
  search: {
    placeholder: 'ノート内を検索... (Escで閉じる)',
    clear: 'クリア',
  },

  // エディター
  editor: {
    placeholder:
      '入力を開始… パスワードはこのブラウザタブから離れることはありません。',
  },

  // Markdownプレビュー
  markdownPreview: {
    emptyPlaceholder: '*入力を開始してプレビューを確認...*',
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

  // Keyboard shortcuts
  shortcuts: {
    title: 'キーボードショートカット',
    description: '? を押してこのダイアログを開く',
    save: 'ノートを保存',
    search: 'ノート内を検索',
    closeDialogs: 'ダイアログを閉じる',
    showShortcuts: 'キーボードショートカットを表示',
    export: 'ノートをエクスポート',
    import: 'ファイルをインポート',
    changePassword: 'パスワードを変更',
  },

  // Autosave status
  autosave: {
    allChangesSaved: 'すべての変更を保存しました',
    saving: '保存中...',
    unsavedChanges: '未保存の変更',
  },
};
