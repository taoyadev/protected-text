# 🏗️ 技术架构设计文档

> 零知识加密笔记平台的完整技术方案

## 🎯 技术目标

```
性能: 首屏加载 < 1.5s, TTI < 2s
安全: AES-256-GCM客户端加密, 零知识架构
可扩展: 支持100K+ MAU
成本: 月成本 < $100 (Vercel Hobby + KV)
可维护: TypeScript + 现代工具链
```

---

## 📚 技术栈选择

### 前端技术栈

#### 核心框架
```typescript
框架: Next.js 15 (App Router)
语言: TypeScript 5.x
样式: Tailwind CSS 4.x + shadcn/ui
状态管理: Zustand (轻量，适合简单状态)
```

**选择理由**:
- Next.js: SSR + SSG, SEO友好，Vercel原生支持
- TypeScript: 类型安全，减少bug
- Tailwind: 快速开发，一致性
- shadcn/ui: 现代组件，可定制

#### 编辑器
```typescript
文本模式: Monaco Editor (VS Code内核)
Markdown模式: Tiptap (更轻量，更灵活)
代码高亮: Prism.js / Shiki
```

**对比分析**:
| 编辑器 | 优势 | 劣势 | 选择 |
|--------|------|------|------|
| Monaco Editor | 功能强大，代码补全 | 体积大(~3MB) | 代码模式 |
| Tiptap | 轻量，Markdown友好 | 代码功能弱 | Markdown模式 |
| CodeMirror | 中等大小，可定制 | 配置复杂 | ❌ |

#### 加密
```typescript
库: Web Crypto API (原生)
算法: AES-256-GCM
密钥派生: PBKDF2 (100,000 iterations)
```

**为什么不用第三方库**:
- 原生API速度快
- 浏览器内置，无需下载
- 安全审计过
- 支持度好 (96%+ 浏览器)

#### PWA
```typescript
框架: next-pwa
Service Worker: 自动生成
缓存策略: Network-first (内容), Cache-first (静态资源)
```

---

### 后端技术栈

#### 运行时
```typescript
平台: Vercel Serverless Functions
运行时: Node.js 20.x
框架: Next.js API Routes
```

#### 数据库
```typescript
主存储: Vercel KV (基于 Upstash Redis)
结构:
  site:{siteName} → {
    encrypted: string,
    salt: string,
    iv: string,
    createdAt: number,
    updatedAt: number,
    accessCount: number
  }

版本历史:
  versions:{siteName} → [
    { encrypted, timestamp, size }
  ]

Pro用户:
  user:{userId} → {
    email, subscription, sites[]
  }
```

**为什么选择 KV**:
- 简单 (key-value即可)
- 快速 (Redis性能)
- 便宜 (Hobby免费)
- Vercel原生集成

#### 认证
```typescript
框架: NextAuth.js v5
提供商:
  - Email (Magic Link)
  - Google OAuth
  - GitHub OAuth

Session: JWT (无状态)
```

#### 支付
```typescript
平台: Stripe
模式: Subscription
Webhook: /api/stripe/webhook
Products:
  - Pro Monthly ($4.99)
  - Pro Yearly ($49)
```

---

## 🔐 安全架构

### 零知识加密流程

#### 1. 创建/保存笔记
```typescript
// 客户端
async function saveNote(siteName: string, content: string, password: string) {
  // 1. 生成随机 salt 和 IV
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));

  // 2. 从密码派生密钥
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );

  // 3. 加密内容
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    new TextEncoder().encode(content)
  );

  // 4. 发送到服务器
  await fetch('/api/save', {
    method: 'POST',
    body: JSON.stringify({
      siteName,
      encrypted: arrayBufferToBase64(encrypted),
      salt: arrayBufferToBase64(salt),
      iv: arrayBufferToBase64(iv)
    })
  });
}

// 服务器
export async function POST(req: Request) {
  const { siteName, encrypted, salt, iv } = await req.json();

  // 服务器只存储加密数据，永远看不到明文
  await kv.set(`site:${siteName}`, {
    encrypted,
    salt,
    iv,
    updatedAt: Date.now()
  });

  return new Response('OK');
}
```

#### 2. 加载/解密笔记
```typescript
// 客户端
async function loadNote(siteName: string, password: string) {
  // 1. 从服务器获取加密数据
  const res = await fetch(`/api/load?site=${siteName}`);
  const { encrypted, salt, iv } = await res.json();

  // 2. 派生密钥 (同样的密码 + salt)
  const key = await deriveKey(password, base64ToArrayBuffer(salt));

  // 3. 解密
  try {
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: base64ToArrayBuffer(iv) },
      key,
      base64ToArrayBuffer(encrypted)
    );

    return new TextDecoder().decode(decrypted);
  } catch {
    throw new Error('Wrong password');
  }
}
```

### 安全特性

#### Rate Limiting
```typescript
// lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(10, '1 m'), // 10次/分钟
});

export async function checkRateLimit(identifier: string) {
  const { success } = await ratelimit.limit(identifier);
  return success;
}

// 使用
export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown';

  if (!await checkRateLimit(ip)) {
    return new Response('Too many requests', { status: 429 });
  }

  // 处理请求...
}
```

#### CSP Headers
```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline';
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https:;
      font-src 'self' data:;
      connect-src 'self' https://api.stripe.com;
      frame-src https://js.stripe.com;
    `.replace(/\s{2,}/g, ' ').trim()
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

---

## 📁 项目结构

```
protected-text/
├─ app/
│  ├─ (marketing)/
│  │  ├─ page.tsx                    # 首页 (landing)
│  │  ├─ pricing/page.tsx            # 定价页
│  │  ├─ about/page.tsx              # 关于页
│  │  └─ blog/
│  │     └─ [slug]/page.tsx          # 博客文章
│  │
│  ├─ (editor)/
│  │  └─ [sitename]/
│  │     ├─ page.tsx                 # 编辑器页面
│  │     └─ layout.tsx               # 编辑器布局 (全屏)
│  │
│  ├─ api/
│  │  ├─ save/route.ts               # 保存笔记
│  │  ├─ load/route.ts               # 加载笔记
│  │  ├─ versions/route.ts           # 版本历史
│  │  ├─ share/route.ts              # 生成分享链接
│  │  ├─ auth/[...nextauth]/route.ts # NextAuth
│  │  └─ stripe/
│  │     ├─ checkout/route.ts        # 创建结账会话
│  │     └─ webhook/route.ts         # Stripe webhook
│  │
│  ├─ dashboard/
│  │  ├─ page.tsx                    # Pro用户仪表板
│  │  └─ settings/page.tsx           # 用户设置
│  │
│  ├─ layout.tsx                     # 根布局
│  └─ globals.css                    # 全局样式
│
├─ components/
│  ├─ editor/
│  │  ├─ Editor.tsx                  # 核心编辑器组件
│  │  ├─ MonacoEditor.tsx            # Monaco编辑器
│  │  ├─ MarkdownEditor.tsx          # Tiptap编辑器
│  │  ├─ Toolbar.tsx                 # 工具栏
│  │  └─ StatusBar.tsx               # 状态栏 (字数/保存状态)
│  │
│  ├─ modals/
│  │  ├─ PasswordModal.tsx           # 密码输入/设置
│  │  ├─ ShareDialog.tsx             # 分享对话框
│  │  ├─ VersionHistory.tsx          # 版本历史
│  │  └─ UpgradeModal.tsx            # 升级提示
│  │
│  ├─ ui/                            # shadcn/ui 组件
│  │  ├─ button.tsx
│  │  ├─ dialog.tsx
│  │  ├─ input.tsx
│  │  └─ ...
│  │
│  └─ layout/
│     ├─ Header.tsx                  # 页头
│     ├─ Footer.tsx                  # 页脚
│     └─ Navigation.tsx              # 导航栏
│
├─ lib/
│  ├─ crypto.ts                      # 加密工具
│  ├─ storage.ts                     # KV存储抽象
│  ├─ rate-limit.ts                  # 限流
│  ├─ stripe.ts                      # Stripe集成
│  ├─ utils.ts                       # 通用工具
│  └─ constants.ts                   # 常量
│
├─ hooks/
│  ├─ useDebounce.ts                 # 防抖hook
│  ├─ useAutosave.ts                 # 自动保存
│  ├─ useEditor.ts                   # 编辑器状态
│  └─ useEncryption.ts               # 加密操作
│
├─ types/
│  ├─ editor.ts                      # 编辑器类型
│  ├─ crypto.ts                      # 加密类型
│  └─ api.ts                         # API类型
│
├─ public/
│  ├─ manifest.json                  # PWA manifest
│  ├─ sw.js                          # Service Worker
│  └─ icons/                         # 图标
│
├─ tests/
│  ├─ crypto.test.ts                 # 加密测试
│  ├─ editor.test.tsx                # 编辑器测试
│  └─ api.test.ts                    # API测试
│
├─ .env.example                      # 环境变量示例
├─ .env.local                        # 本地环境变量 (不提交)
├─ next.config.js                    # Next.js配置
├─ tailwind.config.ts                # Tailwind配置
├─ tsconfig.json                     # TypeScript配置
└─ package.json                      # 依赖
```

---

## 🗄️ 数据模型

### 1. 站点数据 (Site)
```typescript
interface Site {
  siteName: string;         // 唯一标识
  encrypted: string;        // Base64加密内容
  salt: string;             // Base64 salt
  iv: string;               // Base64 IV
  createdAt: number;        // 创建时间戳
  updatedAt: number;        // 最后更新时间戳
  accessCount: number;      // 访问次数
  size: number;             // 字节大小
  ownerId?: string;         // Pro用户ID (可选)
}

// KV存储
await kv.set(`site:${siteName}`, siteData);
await kv.expire(`site:${siteName}`, 60 * 60 * 24 * 90); // 90天过期
```

### 2. 版本历史 (Version)
```typescript
interface Version {
  id: string;               // UUID
  timestamp: number;        // 时间戳
  encrypted: string;        // 加密内容快照
  size: number;             // 大小
  label?: string;           // 用户标签
}

// KV存储 (列表)
await kv.lpush(`versions:${siteName}`, version);
await kv.ltrim(`versions:${siteName}`, 0, 2); // 免费版只保留3个
```

### 3. 用户数据 (User) - Pro版本
```typescript
interface User {
  id: string;               // UUID
  email: string;            // 邮箱
  name?: string;            // 姓名
  avatar?: string;          // 头像URL
  subscription: {
    plan: 'free' | 'pro' | 'team';
    status: 'active' | 'canceled' | 'past_due';
    periodEnd: number;      // 订阅结束时间
    stripeCustomerId: string;
    stripeSubscriptionId: string;
  };
  sites: string[];          // 拥有的站点列表
  createdAt: number;
}

// KV存储
await kv.set(`user:${userId}`, userData);
```

### 4. 分享链接 (Share)
```typescript
interface ShareLink {
  id: string;               // 短ID (6位)
  siteName: string;         // 关联的站点
  mode: 'readonly' | 'edit'; // 只读/编辑
  password?: string;        // 可选的额外密码
  expiresAt?: number;       // 过期时间
  maxViews?: number;        // 最大查看次数
  views: number;            // 当前查看次数
  createdAt: number;
}

// KV存储
await kv.set(`share:${shareId}`, shareData);
```

---

## 🚀 性能优化

### 1. 代码分割
```typescript
// 动态导入编辑器 (减少首屏加载)
const MonacoEditor = dynamic(() => import('@/components/editor/MonacoEditor'), {
  ssr: false,
  loading: () => <EditorSkeleton />
});

const MarkdownEditor = dynamic(() => import('@/components/editor/MarkdownEditor'), {
  ssr: false
});
```

### 2. 图片优化
```typescript
import Image from 'next/image';

<Image
  src="/hero.png"
  alt="Hero"
  width={1200}
  height={600}
  priority
  quality={85}
/>
```

### 3. 字体优化
```typescript
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});
```

### 4. 缓存策略
```typescript
// API Response
export async function GET(req: Request) {
  const data = await fetchData();

  return new Response(JSON.stringify(data), {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      'Content-Type': 'application/json'
    }
  });
}
```

### 5. 数据库优化
```typescript
// 批量操作
const pipeline = kv.pipeline();
pipeline.set(`site:${siteName}`, data);
pipeline.expire(`site:${siteName}`, 7776000); // 90天
pipeline.incr(`stats:saves:${today}`);
await pipeline.exec();

// 索引优化
await kv.zadd('sites:recent', { score: Date.now(), member: siteName });
```

---

## 📊 监控 & 分析

### 1. 性能监控
```typescript
// Vercel Analytics
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### 2. 错误追踪
```typescript
// Sentry (可选)
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
});
```

### 3. 自定义分析
```typescript
// lib/analytics.ts
export async function trackEvent(
  event: string,
  properties?: Record<string, any>
) {
  // 记录到KV (简单统计)
  const today = new Date().toISOString().split('T')[0];
  await kv.incr(`stats:${event}:${today}`);

  // 或发送到第三方
  if (process.env.NODE_ENV === 'production') {
    await fetch('https://analytics.example.com/track', {
      method: 'POST',
      body: JSON.stringify({ event, properties })
    });
  }
}

// 使用
await trackEvent('note_created', { siteName });
await trackEvent('note_saved', { size: content.length });
await trackEvent('upgrade_clicked');
```

---

## 🧪 测试策略

### 1. 单元测试
```typescript
// tests/crypto.test.ts
import { encrypt, decrypt } from '@/lib/crypto';

describe('Encryption', () => {
  it('should encrypt and decrypt correctly', async () => {
    const plaintext = 'Hello, World!';
    const password = 'test123';

    const { encrypted, salt, iv } = await encrypt(plaintext, password);
    const decrypted = await decrypt(encrypted, password, salt, iv);

    expect(decrypted).toBe(plaintext);
  });

  it('should fail with wrong password', async () => {
    const { encrypted, salt, iv } = await encrypt('test', 'password1');

    await expect(
      decrypt(encrypted, 'password2', salt, iv)
    ).rejects.toThrow();
  });
});
```

### 2. 集成测试
```typescript
// tests/api/save.test.ts
import { POST } from '@/app/api/save/route';

describe('Save API', () => {
  it('should save encrypted note', async () => {
    const req = new Request('http://localhost:3000/api/save', {
      method: 'POST',
      body: JSON.stringify({
        siteName: 'test',
        encrypted: 'xxx',
        salt: 'yyy',
        iv: 'zzz'
      })
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
  });
});
```

### 3. E2E测试
```typescript
// tests/e2e/editor.spec.ts (Playwright)
import { test, expect } from '@playwright/test';

test('create and save note', async ({ page }) => {
  // 访问站点
  await page.goto('/mysecret');

  // 设置密码
  await page.fill('[data-testid="password-input"]', 'test123');
  await page.click('[data-testid="unlock-button"]');

  // 输入内容
  await page.fill('[data-testid="editor"]', 'Hello, World!');

  // 等待自动保存
  await page.waitForSelector('[data-testid="saved-indicator"]');

  // 刷新页面
  await page.reload();

  // 重新解锁
  await page.fill('[data-testid="password-input"]', 'test123');
  await page.click('[data-testid="unlock-button"]');

  // 验证内容
  await expect(page.locator('[data-testid="editor"]')).toHaveText('Hello, World!');
});
```

---

## 🚢 部署流程

### 1. 环境变量
```bash
# .env.local (本地开发)
KV_URL=redis://localhost:6379
KV_REST_API_URL=http://localhost:8079
KV_REST_API_TOKEN=local_token

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_here

STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
```

### 2. Vercel部署
```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel

# 生产部署
vercel --prod
```

### 3. KV设置
```bash
# Vercel Dashboard
1. Project Settings → Storage
2. Create → KV Database
3. Connect to Project
4. 环境变量自动注入
```

### 4. Stripe设置
```bash
# Stripe Dashboard
1. Products → Create Product
   - Name: Protected Text Pro
   - Price: $4.99/month

2. Developers → Webhooks → Add endpoint
   - URL: https://your-domain.com/api/stripe/webhook
   - Events:
     - checkout.session.completed
     - customer.subscription.updated
     - customer.subscription.deleted
```

### 5. 自定义域名
```bash
# Vercel Dashboard
1. Domains → Add
2. 输入域名: protected-text.app
3. 配置DNS (A记录)
4. 等待验证
```

---

## 📈 扩展性考虑

### 1. 数据库迁移 (如果KV不够用)
```
Vercel KV (Redis)
  ↓
  迁移到
  ↓
Upstash Redis (独立)
或
PostgreSQL (Neon/Supabase)
```

### 2. 文件存储 (大文件支持)
```typescript
// 如果未来支持图片/附件
import { put } from '@vercel/blob';

const blob = await put('file.jpg', file, {
  access: 'public',
});
```

### 3. 搜索功能
```typescript
// 使用 Algolia 或 Typesense
import algoliasearch from 'algoliasearch';

const client = algoliasearch('APP_ID', 'API_KEY');
const index = client.initIndex('notes');

await index.saveObject({
  objectID: siteName,
  title: extractTitle(content),
  preview: content.substring(0, 200),
  updatedAt: Date.now()
});
```

### 4. CDN优化
```typescript
// next.config.js
module.exports = {
  images: {
    domains: ['cdn.protected-text.app'],
  },
  async headers() {
    return [
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

---

## 🔧 开发工具

### 推荐VS Code扩展
```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-playwright.playwright",
    "prisma.prisma"
  ]
}
```

### package.json 脚本
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "test:e2e": "playwright test",
    "type-check": "tsc --noEmit",
    "format": "prettier --write .",
    "analyze": "ANALYZE=true next build"
  }
}
```

---

## 📚 参考资源

### 官方文档
- [Next.js Docs](https://nextjs.org/docs)
- [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
- [Vercel KV](https://vercel.com/docs/storage/vercel-kv)
- [Stripe Docs](https://stripe.com/docs)

### 安全资源
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Web Security Academy](https://portswigger.net/web-security)
- [Crypto Best Practices](https://www.schneier.com/blog/)

---

**文档版本**: v1.0
**最后更新**: 2025-11-07
**架构师**: Engineering Team
**状态**: ✅ Ready for Implementation
