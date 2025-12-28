# 🔐 Protected Text - 现代化加密笔记平台

> 基于数据驱动的下一代加密笔记工具 | 零知识架构 | 极简体验

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

## 🎯 项目愿景

打造比 ProtectedText.com 更现代、更强大的加密笔记平台：

- ✅ **零知识架构** - 服务器永远看不到你的数据
- ✅ **现代化UI** - 2025年的设计标准
- ✅ **开发者友好** - Markdown + 代码高亮
- ✅ **商业化清晰** - Free + Pro 双版本

## 📊 市场验证

基于真实搜索数据（Ahrefs）：

```
核心关键词:     12,000 月搜索量
付费版需求:     1,200 月搜索量
品牌认知:       强（100% Branded）
市场机会:       竞品替代搜索 30/月
```

👉 **详细需求分析**: [REQUIREMENTS.md](./REQUIREMENTS.md)

## 🚀 快速开始

### 技术栈

```typescript
前端:    Next.js 15 + TypeScript + Tailwind
编辑器:  Monaco Editor + Tiptap
加密:    Web Crypto API (AES-256-GCM)
部署:    Vercel + Vercel KV
支付:    Stripe
```

### 本地开发

```bash
# 1. 创建项目
npx create-next-app@latest protected-text \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir

cd protected-text

# 2. 安装依赖
npm install \
  @monaco-editor/react \
  @tiptap/react \
  @tiptap/starter-kit \
  zustand \
  @vercel/kv \
  next-pwa

# 3. 启动开发服务器
npm run dev
```

### 环境变量

```env
# .env.local
KV_URL=your_vercel_kv_url
KV_REST_API_URL=your_kv_api_url
KV_REST_API_TOKEN=your_kv_token

# Pro 版本
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## 📁 项目结构

```
protected-text/
├─ app/
│  ├─ page.tsx                 # 首页 (landing)
│  ├─ [sitename]/
│  │  └─ page.tsx              # 编辑器页面
│  ├─ api/
│  │  ├─ save/route.ts         # 保存API
│  │  ├─ load/route.ts         # 加载API
│  │  └─ stripe/webhook.ts     # 支付webhook
│  └─ layout.tsx
├─ components/
│  ├─ Editor.tsx               # 核心编辑器
│  ├─ PasswordModal.tsx        # 密码输入
│  ├─ VersionHistory.tsx       # 版本历史
│  └─ ShareDialog.tsx          # 分享对话框
├─ lib/
│  ├─ crypto.ts                # 加密工具
│  ├─ storage.ts               # KV存储
│  └─ stripe.ts                # 支付集成
└─ public/
   └─ manifest.json            # PWA配置
```

## 🔒 安全架构

### 零知识加密流程

```typescript
// 1. 用户输入密码
const password = userInput;

// 2. 派生密钥
const key = await deriveKey(password, salt);

// 3. 加密内容
const encrypted = await encrypt(content, key);

// 4. 服务器只存加密数据
await kv.set(siteName, {
  encrypted,
  salt,
  iv,
  // 服务器永远看不到 password 和 content
});
```

### 安全特性

- ✅ AES-256-GCM 加密
- ✅ PBKDF2 密钥派生 (100,000 iterations)
- ✅ 随机 salt 和 IV
- ✅ Rate limiting (防暴力破解)
- ✅ CSP Headers
- ✅ HTTPS Only

## 🎨 核心功能

### MVP (Week 1-2)

- [x] URL路由系统 (`/mysecret`)
- [x] 客户端加密/解密
- [x] 实时自动保存
- [x] 基础文本编辑器
- [x] 深色/浅色模式
- [x] 导出功能 (.txt)

### 增强功能 (Week 3-4)

- [ ] Markdown 支持
- [ ] 代码高亮 (50+ 语言)
- [ ] 版本历史 (免费3个)
- [ ] 分享链接 (只读 + 有效期)
- [ ] PWA (离线访问)
- [ ] 字数统计

### Pro 功能 (Week 5-6)

- [ ] 用户认证 (NextAuth)
- [ ] Stripe 订阅
- [ ] 无限版本历史
- [ ] 自定义域名
- [ ] API 访问
- [ ] 批量导出

## 💰 商业模式

| 功能       | Free           | Pro ($4.99/月) |
| ---------- | -------------- | -------------- |
| 存储大小   | 100KB/站点     | 10MB/站点      |
| 版本历史   | 3个            | 无限           |
| 站点数量   | 无限           | 无限           |
| 数据保留   | 90天无访问删除 | 永久           |
| Markdown   | ✅             | ✅             |
| 代码高亮   | ✅             | ✅             |
| 自定义域名 | ❌             | ✅             |
| API访问    | ❌             | ✅             |
| 优先支持   | ❌             | ✅             |

**定价依据**:

- Notion: $8/月 (太重)
- Evernote: $7.99/月 (太复杂)
- 我们: $4.99/月 (轻量化优势)

## 📈 增长策略

### SEO优化

1. **目标关键词**:
   - "protected text" (12K/月)
   - "protected text pro" (1.2K/月)
   - "password protected notepad" (30/月)

2. **内容营销**:
   - 博客: "如何保护你的在线笔记"
   - 教程: "Markdown加密笔记最佳实践"
   - 对比: "Protected Text vs 竞品"

3. **产品内增长**:

   ```typescript
   // 分享链接底部
   '📝 Create your own at protected-text.app';

   // 导出文件
   'Exported from Protected Text - Encrypted Notes';
   ```

### 病毒式传播

- Chrome 扩展 (右键 → 保存到 Protected Text)
- VS Code 扩展 (同步代码片段)
- API 集成 (CI/CD 密钥管理)

## 🛠️ 开发指南

### 核心代码示例

#### 加密工具 (`lib/crypto.ts`)

```typescript
export async function encrypt(
  plaintext: string,
  password: string,
): Promise<EncryptedData> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const key = await deriveKey(password, salt);

  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    new TextEncoder().encode(plaintext),
  );

  return {
    encrypted: arrayBufferToBase64(encrypted),
    salt: arrayBufferToBase64(salt),
    iv: arrayBufferToBase64(iv),
  };
}
```

#### 编辑器组件 (`components/Editor.tsx`)

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

export function Editor({ siteName }: { siteName: string }) {
  const [content, setContent] = useState('');
  const debouncedContent = useDebounce(content, 2000);

  useEffect(() => {
    // Auto-save when debounced
    if (debouncedContent) {
      saveToServer(siteName, debouncedContent);
    }
  }, [debouncedContent, siteName]);

  return (
    <textarea
      value={content}
      onChange={(e) => setContent(e.target.value)}
      className="w-full h-screen p-4 font-mono"
      placeholder="Start typing..."
    />
  );
}
```

### API 路由 (`app/api/save/route.ts`)

```typescript
import { kv } from '@vercel/kv';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(req: Request) {
  const { siteName, encrypted, salt, iv } = await req.json();

  // Rate limiting
  const { success } = await rateLimit(req);
  if (!success) {
    return new Response('Too many requests', { status: 429 });
  }

  // Save encrypted data
  await kv.set(`site:${siteName}`, {
    encrypted,
    salt,
    iv,
    updatedAt: Date.now(),
  });

  return new Response('OK');
}
```

## 📊 成功指标 (KPIs)

### 6个月目标

```
用户指标:
├─ 月活跃用户: 50,000
├─ 新站点创建: 5,000/月
└─ 付费转化率: 2%

收入指标:
├─ MRR: $5,000
├─ 付费用户: 1,000
└─ ARPU: $4.99

产品指标:
├─ 7日留存: >40%
├─ 30日留存: >25%
└─ 平均站点数/用户: 3
```

## 🔄 开发路线图

### Phase 1: MVP (2周) ✅

- 基础加密笔记
- URL路由
- 自动保存

### Phase 2: 增强 (2周) 🚧

- Markdown + 代码
- 版本历史
- 分享功能

### Phase 3: 商业化 (2周) 📅

- 用户系统
- Stripe集成
- Pro功能

### Phase 4: 增长 (持续) 📅

- SEO优化
- 内容营销
- API文档

## 🤝 贡献指南

欢迎贡献！请遵循：

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. Push到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📝 License

MIT License - 详见 [LICENSE](LICENSE)

## 📞 联系方式

- 需求文档: [REQUIREMENTS.md](./REQUIREMENTS.md)
- 关键词分析: [keywords-analysis.csv](./keywords-analysis.csv)
- Issues: [GitHub Issues](#)

---

**项目状态**: 🚀 Ready to Build
**预计发布**: 4-6周
**目标市场**: 全球（优先英文市场）

⭐ Star this repo if you find it useful!
