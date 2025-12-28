/**
 * Proページコンテンツ - 機能、投票、フィードバックフォーム
 */

export const pro = {
  // ヘッダー
  header: {
    title: 'Protected Text PRO – 機能ロードマップ',
    subtitle:
      '今後のProtected Text PRO機能に投票してください。無料版は永遠に無料ですが、どのプレミアム機能を最初に構築するかを決めるのを手伝ってください。',
    description:
      'カスタムドメイン、チーム共有、APIアクセス、ファイル添付などを備えた暗号化ノートが近日公開。',
  },

  // 機能
  features: {
    sectionLabel: 'Protected Text PRO機能',
    customDomains: {
      title: 'カスタムドメイン',
      description:
        'protectedtext.com/yoursiteの代わりにnotes.yourcompany.comのような独自のドメインを使用',
    },
    teamSharing: {
      title: 'チーム共有',
      description:
        '暗号化されたノートをチームと共有します。全員が独自のパスワードを取得します。',
    },
    apiAccess: {
      title: 'APIアクセス',
      description: 'アプリと統合します。プログラムでノートを読み書きします。',
    },
    fileAttachments: {
      title: 'ファイル添付',
      description:
        '暗号化されたファイル、画像、ドキュメントをノートにアップロードします。',
    },
    unlimitedRetention: {
      title: '無制限保持',
      description: 'ノートを永久に保持します。自動削除なし。',
    },
    prioritySupport: {
      title: '優先サポート',
      description: '必要なときに迅速にサポートを受けられます。',
    },
  },

  // 投票
  voting: {
    voteButton: '投票',
    votedButton: '投票済み',
    voteForFeature: '{featureName}に投票',
    votesCount: '{count}票',
    votesSingular: '{count}票',
  },

  // フィードバックフォーム
  feedbackForm: {
    title: 'カスタムProtected Text PRO機能をリクエスト',
    subtitle:
      'Protected Text PROについてのご意見、提案、機能リクエストを以下で共有してください。',
    messageLabel: 'あなたのメッセージ',
    messagePlaceholder: '見たいものを教えてください...',
    messageRequired: '*',
    messageCounter: '{count}/2000文字',
    emailLabel: 'メール（任意）',
    emailPlaceholder: 'your@email.com',
    emailHelp: 'フォローアップを希望する場合はメールを残してください',
    featureLabel: '関連機能（任意）',
    featurePlaceholder: '機能を選択...',
    featureOther: 'その他',
    submitButton: 'フィードバックを送信',
    submittingButton: '送信中...',
    emailNote: 'メールでも連絡できます',
  },

  // フッター免責事項
  disclaimer: {
    text: '心配しないでください - 無料版は永遠に無料です。',
    subtext: '広告なし。トラッキングなし。くだらないものなし。',
  },
};
