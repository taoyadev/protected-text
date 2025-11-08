/**
 * Pro页面内容 - 功能、投票、反馈表单
 */

export const pro = {
  // 标题
  header: {
    title: 'Protected Text PRO – 功能路线图',
    subtitle:
      '为即将推出的Protected Text PRO功能投票。免费版本将永远免费，但帮助我们决定首先构建哪些高级功能。',
    description:
      '加密笔记，支持自定义域名、团队共享、API访问、文件附件等即将推出。',
  },

  // 功能
  features: {
    sectionLabel: 'Protected Text PRO功能',
    customDomains: {
      title: '自定义域名',
      description: '使用您自己的域名，如notes.yourcompany.com，而不是protectedtext.com/yoursite',
    },
    teamSharing: {
      title: '团队共享',
      description: '与您的团队共享加密笔记。每个人都有自己的密码。',
    },
    apiAccess: {
      title: 'API访问',
      description: '与您的应用程序集成。以编程方式读取/写入笔记。',
    },
    fileAttachments: {
      title: '文件附件',
      description: '将加密文件、图像和文档上传到您的笔记。',
    },
    unlimitedRetention: {
      title: '无限保留',
      description: '永久保留您的笔记。无自动删除。',
    },
    prioritySupport: {
      title: '优先支持',
      description: '在需要时更快地获得帮助。',
    },
  },

  // 投票
  voting: {
    voteButton: '投票',
    votedButton: '已投票',
    voteForFeature: '为{featureName}投票',
    votesCount: '{count}票',
    votesSingular: '{count}票',
  },

  // 反馈表单
  feedbackForm: {
    title: '请求自定义Protected Text PRO功能',
    subtitle: '在下面分享您对Protected Text PRO的想法、建议或功能请求。',
    messageLabel: '您的消息',
    messagePlaceholder: '告诉我们您想看到什么...',
    messageRequired: '*',
    messageCounter: '{count}/2000字符',
    emailLabel: '电子邮件（可选）',
    emailPlaceholder: 'your@email.com',
    emailHelp: '如果您希望我们跟进，请留下您的电子邮件',
    featureLabel: '相关功能（可选）',
    featurePlaceholder: '选择一个功能...',
    featureOther: '其他',
    submitButton: '发送反馈',
    submittingButton: '发送中...',
    emailNote: '您也可以通过电子邮件联系我们',
  },

  // 页脚免责声明
  disclaimer: {
    text: '别担心 - 免费版本将永远免费。',
    subtext: '没有广告。没有跟踪。没有废话。',
  },
};
