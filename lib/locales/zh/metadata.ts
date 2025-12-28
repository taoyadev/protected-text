/**
 * SEO元数据、页面标题、描述
 */

export const metadata = {
  // 根布局元数据
  root: {
    title: 'Protected Text – 真正有效的加密笔记',
    description:
      '免费加密记事本。您的密码永不离开您的设备。没有广告，没有跟踪，没有废话。就是好用。',
    siteName: 'Protected Text',

    // Open Graph
    og: {
      title: 'Protected Text',
      description: '加密笔记。没人能读它们。包括我们。',
      siteName: 'Protected Text',
    },

    // Twitter
    twitter: {
      creator: '@protectedtext',
      site: '@protectedtext',
    },
  },

  // 404页面
  notFound: {
    title: '找不到页面',
    description: '您要查找的笔记不存在或已过期。',
    goHome: '返回首页',
  },

  // 应用程序特定
  app: {
    launchApp: '启动应用',
  },

  // 可访问性
  a11y: {
    openNavigation: '打开导航',
  },
};
