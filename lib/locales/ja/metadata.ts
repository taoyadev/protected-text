/**
 * SEOメタデータ、ページタイトル、説明
 */

export const metadata = {
  // ルートレイアウトメタデータ
  root: {
    title: 'Protected Text – 実際に機能する暗号化ノート',
    description:
      '無料の暗号化メモ帳。あなたのパスワードはあなたのデバイスを決して離れません。広告なし、トラッキングなし、くだらないものなし。ただ機能します。',
    siteName: 'Protected Text',

    // Open Graph
    og: {
      title: 'Protected Text',
      description:
        '暗号化されたノート。誰もそれらを読むことができません。私たちでさえも。',
      siteName: 'Protected Text',
    },

    // Twitter
    twitter: {
      creator: '@protectedtext',
      site: '@protectedtext',
    },
  },

  // 404ページ
  notFound: {
    title: 'ページが見つかりません',
    description: 'お探しのノートは存在しないか、期限切れです。',
    goHome: 'ホームに戻る',
  },

  // アプリ固有
  app: {
    launchApp: 'アプリを起動',
  },

  // アクセシビリティ
  a11y: {
    openNavigation: 'ナビゲーションを開く',
  },
};
