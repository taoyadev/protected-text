/**
 * 编辑器界面 - 工具栏、占位符、统计信息、键盘快捷键
 */

export const editor = {
  // 工具栏
  toolbar: {
    site: '站点',
    saving: '保存中…',
    lastSaved: '上次保存',
    switchToLightMode: '切换到浅色模式',
    switchToDarkMode: '切换到深色模式',
    toggleMarkdownPreview: '切换Markdown预览',
    search: '搜索（Ctrl+F）',
    versionHistory: '版本历史',
    reload: '重新加载',
    import: '导入（Ctrl+I）',
    export: '导出（Ctrl+E）',
    share: '分享',
    changePassword: '更改密码（Ctrl+K）',
    delete: '删除',
  },

  // 搜索
  search: {
    placeholder: '在笔记中搜索...（按Esc关闭）',
    clear: '清除',
  },

  // 编辑器
  editor: {
    placeholder: '开始输入…密码永不离开此浏览器标签。',
  },

  // Markdown预览
  markdownPreview: {
    emptyPlaceholder: '*开始输入以查看预览...*',
  },

  // 统计信息
  stats: {
    words: '字',
    characters: '字符',
    lines: '行',
    unsavedChanges: '未保存的更改',
  },

  // 密码强度
  passwordStrength: {
    weak: '弱',
    fair: '一般',
    okay: '可以',
    good: '好',
    strong: '强',
  },

  // 主题切换
  theme: {
    switchedToLight: '已切换到浅色模式',
    switchedToDark: '已切换到深色模式',
  },

  // 文件导入
  fileImport: {
    acceptedFormats: '.txt,.md,.text',
  },

  // Keyboard shortcuts
  shortcuts: {
    title: '键盘快捷键',
    description: '按 ? 打开此对话框',
    save: '保存笔记',
    search: '搜索笔记',
    closeDialogs: '关闭对话框',
    showShortcuts: '显示键盘快捷键',
    export: '导出笔记',
    import: '导入文件',
    changePassword: '修改密码',
  },

  // Autosave status
  autosave: {
    allChangesSaved: '所有更改已保存',
    saving: '保存中...',
    unsavedChanges: '未保存的更改',
  },
};
