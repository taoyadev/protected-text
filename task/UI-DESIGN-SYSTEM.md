# 🎨 UI设计系统

> 现代化设计规范 | 简洁美学 | 以内容为中心

## 🎯 设计原则

### 1. 极简主义

```
Less is more
- 移除所有非必要元素
- 专注核心功能
- 大量留白
```

### 2. 以内容为中心

```
Content First
- 编辑器占据90%屏幕
- 工具栏最小化
- 无干扰写作体验
```

### 3. 性能优先

```
Speed Matters
- 即时反馈
- 流畅动画 (60fps)
- 快速加载
```

### 4. 可访问性

```
A11y First
- WCAG AA标准
- 键盘导航
- 屏幕阅读器支持
```

---

## 🎨 颜色系统

### 品牌色

```css
/* Primary - 深蓝色 (专业、安全、信任) */
--primary-50: #eff6ff;
--primary-100: #dbeafe;
--primary-500: #3b82f6; /* 主要使用 */
--primary-600: #2563eb;
--primary-700: #1d4ed8;

/* Success - 绿色 */
--success-500: #10b981;

/* Warning - 橙色 */
--warning-500: #f59e0b;

/* Error - 红色 */
--error-500: #ef4444;
```

### 中性色 (浅色模式)

```css
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-200: #e5e7eb;
--gray-300: #d1d5db;
--gray-400: #9ca3af;
--gray-500: #6b7280;
--gray-600: #4b5563;
--gray-700: #374151;
--gray-800: #1f2937;
--gray-900: #111827;
```

### 深色模式

```css
/* 背景 */
--dark-bg: #0a0a0a;
--dark-surface: #1a1a1a;
--dark-border: #2a2a2a;

/* 文本 */
--dark-text-primary: #ffffff;
--dark-text-secondary: #a0a0a0;
--dark-text-muted: #707070;
```

### 语义色彩

```css
/* 背景 */
--background: white;
--surface: #f9fafb;

/* 文本 */
--text-primary: #111827;
--text-secondary: #6b7280;
--text-muted: #9ca3af;

/* 边框 */
--border: #e5e7eb;
--border-focus: #3b82f6;

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  --background: #0a0a0a;
  --surface: #1a1a1a;
  --text-primary: #ffffff;
  --text-secondary: #a0a0a0;
  --border: #2a2a2a;
}
```

---

## 📐 间距系统

### Spacing Scale (基于4px)

```css
--spacing-0: 0px;
--spacing-1: 4px;
--spacing-2: 8px;
--spacing-3: 12px;
--spacing-4: 16px;
--spacing-5: 20px;
--spacing-6: 24px;
--spacing-8: 32px;
--spacing-10: 40px;
--spacing-12: 48px;
--spacing-16: 64px;
--spacing-20: 80px;
```

### 应用示例

```css
/* Padding */
.button {
  padding: var(--spacing-3) var(--spacing-6);
}

/* Margin */
.section {
  margin-bottom: var(--spacing-8);
}

/* Gap */
.flex-container {
  gap: var(--spacing-4);
}
```

---

## 🔤 字体系统

### 字体族

```css
/* 主字体 - Sans Serif */
--font-sans:
  'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica', 'Arial',
  sans-serif;

/* 等宽字体 - 编辑器/代码 */
--font-mono:
  'Jetbrains Mono', 'Fira Code', 'Monaco', 'Consolas', 'Courier New', monospace;

/* 衬线字体 - 可选 */
--font-serif: 'Georgia', 'Times New Roman', serif;
```

### 字体大小

```css
--text-xs: 12px; /* 0.75rem */
--text-sm: 14px; /* 0.875rem */
--text-base: 16px; /* 1rem */
--text-lg: 18px; /* 1.125rem */
--text-xl: 20px; /* 1.25rem */
--text-2xl: 24px; /* 1.5rem */
--text-3xl: 30px; /* 1.875rem */
--text-4xl: 36px; /* 2.25rem */
--text-5xl: 48px; /* 3rem */
```

### 字重

```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### 行高

```css
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

### 字体应用

```css
/* 标题 */
h1 {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
}

/* 正文 */
body {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
}

/* 编辑器 */
.editor {
  font-family: var(--font-mono);
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
}
```

---

## 🔲 圆角系统

```css
--radius-none: 0px;
--radius-sm: 4px;
--radius-md: 6px;
--radius-lg: 8px;
--radius-xl: 12px;
--radius-2xl: 16px;
--radius-full: 9999px;
```

### 应用

```css
/* 按钮 */
.button {
  border-radius: var(--radius-md);
}

/* 卡片 */
.card {
  border-radius: var(--radius-lg);
}

/* 模态框 */
.modal {
  border-radius: var(--radius-xl);
}
```

---

## ☁️ 阴影系统

```css
/* 轻微阴影 */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);

/* 普通阴影 */
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

/* 明显阴影 */
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

/* 强阴影 */
--shadow-xl:
  0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);

/* 焦点阴影 */
--shadow-focus: 0 0 0 3px rgb(59 130 246 / 0.5);
```

---

## 🧩 组件设计

### 1. 按钮

#### Primary Button

```css
.button-primary {
  background: var(--primary-500);
  color: white;
  padding: 10px 20px;
  border-radius: var(--radius-md);
  font-weight: var(--font-medium);
  transition: all 0.15s;
}

.button-primary:hover {
  background: var(--primary-600);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.button-primary:active {
  transform: translateY(0);
}
```

#### Secondary Button

```css
.button-secondary {
  background: white;
  color: var(--gray-700);
  border: 1px solid var(--border);
  padding: 10px 20px;
  border-radius: var(--radius-md);
}

.button-secondary:hover {
  background: var(--gray-50);
}
```

#### Ghost Button

```css
.button-ghost {
  background: transparent;
  color: var(--gray-700);
  padding: 10px 20px;
  border-radius: var(--radius-md);
}

.button-ghost:hover {
  background: var(--gray-100);
}
```

---

### 2. 输入框

```css
.input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-size: var(--text-base);
  transition: all 0.15s;
}

.input:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: var(--shadow-focus);
}

.input::placeholder {
  color: var(--text-muted);
}
```

---

### 3. 编辑器

```css
.editor {
  width: 100%;
  height: 100%;
  padding: 40px;
  font-family: var(--font-mono);
  font-size: 16px;
  line-height: 1.75;
  color: var(--text-primary);
  background: var(--background);
  border: none;
  resize: none;
}

.editor:focus {
  outline: none;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .editor {
    background: var(--dark-bg);
    color: var(--dark-text-primary);
    caret-color: var(--primary-500);
  }
}
```

---

### 4. 模态框

```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgb(0 0 0 / 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: white;
  border-radius: var(--radius-xl);
  padding: 32px;
  max-width: 500px;
  width: 90%;
  box-shadow: var(--shadow-xl);
  animation: modal-enter 0.2s ease-out;
}

@keyframes modal-enter {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

---

### 5. 状态栏

```css
.status-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px 24px;
  background: var(--surface);
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--text-sm);
  color: var(--text-secondary);
}
```

---

### 6. 工具栏

```css
.toolbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 12px 24px;
  background: var(--background);
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(8px);
  background: rgb(255 255 255 / 0.8);
}
```

---

## 🎭 动画效果

### 过渡时间

```css
--transition-fast: 0.15s;
--transition-normal: 0.2s;
--transition-slow: 0.3s;
```

### Easing

```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### 常用动画

```css
/* 淡入 */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* 滑入 */
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 脉冲 */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* 加载动画 */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

---

## 📱 响应式断点

```css
/* Mobile First */
/* xs: 0-640px (默认) */

/* sm: 640px+ */
@media (min-width: 640px) {
  /* 小屏幕 */
}

/* md: 768px+ */
@media (min-width: 768px) {
  /* 平板 */
}

/* lg: 1024px+ */
@media (min-width: 1024px) {
  /* 笔记本 */
}

/* xl: 1280px+ */
@media (min-width: 1280px) {
  /* 桌面 */
}
```

### 响应式字体

```css
/* 移动端 */
body {
  font-size: 14px;
}

/* 桌面端 */
@media (min-width: 768px) {
  body {
    font-size: 16px;
  }
}
```

---

## 🌗 深色模式

### 自动切换

```css
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --surface: #1a1a1a;
    --text-primary: #ffffff;
    --text-secondary: #a0a0a0;
    --border: #2a2a2a;
  }
}
```

### 手动切换

```html
<html class="dark"></html>
```

```css
.dark {
  --background: #0a0a0a;
  --surface: #1a1a1a;
  --text-primary: #ffffff;
  /* ... */
}
```

---

## ♿ 可访问性

### 焦点样式

```css
*:focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}
```

### 屏幕阅读器

```html
<!-- 隐藏但保留给屏幕阅读器 -->
<span class="sr-only">Save note</span>
```

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### 键盘导航

```css
/* Skip to content */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--primary-500);
  color: white;
  padding: 8px;
}

.skip-link:focus {
  top: 0;
}
```

---

## 🎨 实际页面示例

### 首页 (Landing)

```
┌──────────────────────────────────┐
│  Protected Text         [Login]  │  ← Header
├──────────────────────────────────┤
│                                  │
│        🔐 Protected Text         │  ← Hero
│   Encrypted notes. Zero know.   │
│                                  │
│   ┌────────────┐  ┌────────┐   │
│   │ Site name  │  │  Start │   │  ← Input
│   └────────────┘  └────────┘   │
│                                  │
│   or go to: site.com/yourname   │
│                                  │
├──────────────────────────────────┤
│  Features  •  Pricing  •  About │  ← Footer
└──────────────────────────────────┘
```

### 编辑器页面

```
┌──────────────────────────────────┐
│  mysecret  [⚙️]  [🌙]  [📤]      │  ← Toolbar (可隐藏)
├──────────────────────────────────┤
│                                  │
│  Start typing...                │
│                                  │
│                                  │  ← Editor (全屏)
│                                  │
│                                  │
│                                  │
├──────────────────────────────────┤
│  1,234 words  •  Saved 2m ago   │  ← Status Bar
└──────────────────────────────────┘
```

### 密码模态框

```
      ┌──────────────────┐
      │  Enter Password  │
      │                  │
      │  This password   │
      │  encrypts your   │
      │  note.           │
      │                  │
      │  ┌────────────┐  │
      │  │ Password   │  │
      │  └────────────┘  │
      │                  │
      │  ┌────────────┐  │
      │  │   Unlock   │  │
      │  └────────────┘  │
      └──────────────────┘
```

---

## 🎯 设计检查清单

### 视觉一致性

- [ ] 使用统一的间距系统
- [ ] 使用统一的圆角
- [ ] 使用统一的阴影
- [ ] 使用统一的颜色
- [ ] 使用统一的字体

### 交互反馈

- [ ] 所有按钮有hover状态
- [ ] 所有按钮有active状态
- [ ] 加载时显示loading
- [ ] 成功时显示成功提示
- [ ] 错误时显示错误信息

### 性能

- [ ] 动画60fps
- [ ] 无布局抖动
- [ ] 图片优化
- [ ] 字体预加载

### 可访问性

- [ ] 键盘可导航
- [ ] 屏幕阅读器友好
- [ ] 对比度符合WCAG AA
- [ ] 焦点样式清晰

---

## 🛠️ Figma设计资源

### 组件库

```
- Buttons (Primary, Secondary, Ghost)
- Inputs (Text, Password, Search)
- Modals
- Tooltips
- Status Bar
- Toolbar
- Editor
```

### 页面模板

```
- Landing Page
- Editor Page
- Pricing Page
- Dashboard (Pro)
```

### 样式指南

```
- Colors
- Typography
- Spacing
- Icons
- Illustrations
```

---

## 📦 实现工具

### Tailwind配置

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          // ...
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
};
```

### shadcn/ui组件

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add textarea
```

---

**文档版本**: v1.0
**最后更新**: 2025-11-07
**设计师**: Design Team
**工具**: Figma, Tailwind CSS, shadcn/ui
