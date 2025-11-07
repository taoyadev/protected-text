# 🚀 快速开始指南

> 5分钟内启动项目开发

## 📋 前置要求

```bash
✓ Node.js 18+ (推荐20.x)
✓ npm 或 pnpm
✓ Git
✓ VS Code (推荐)
✓ Redis (本地开发)
```

---

## ⚡ 快速启动 (3步骤)

### 1️⃣ 创建项目
```bash
# 方法A: 使用create-next-app
npx create-next-app@latest protected-text \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*"

cd protected-text
```

### 2️⃣ 安装依赖
```bash
# 核心依赖
npm install @vercel/kv zustand clsx tailwind-merge

# 开发依赖
npm install -D @types/node prettier prettier-plugin-tailwindcss

# shadcn/ui
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input textarea dialog
```

### 3️⃣ 启动开发服务器
```bash
npm run dev
# 访问 http://localhost:3000
```

---

## 🔧 本地开发环境设置

### Redis安装 (本地KV存储)

#### macOS
```bash
# 使用Homebrew
brew install redis
brew services start redis

# 或使用Docker
docker run -d -p 6379:6379 redis:alpine
```

#### Windows
```bash
# 使用Docker
docker run -d -p 6379:6379 redis:alpine
```

#### Linux
```bash
sudo apt install redis-server
sudo systemctl start redis
```

---

## 📝 环境变量配置

创建 `.env.local` 文件：

```bash
# KV存储 (开发环境使用本地Redis)
KV_URL=redis://localhost:6379
KV_REST_API_URL=http://localhost:8079
KV_REST_API_TOKEN=local_dev_token

# NextAuth (后续添加)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_here_generate_with_openssl

# Stripe (后续添加)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

生成NextAuth Secret:
```bash
openssl rand -base64 32
```

---

## 📁 项目结构搭建

### 创建基础目录
```bash
mkdir -p app/api/{save,load,check}
mkdir -p components/{editor,modals,ui,layout}
mkdir -p lib
mkdir -p hooks
mkdir -p types
mkdir -p tests
```

### 目录说明
```
protected-text/
├─ app/                 # Next.js App Router
│  ├─ api/             # API路由
│  └─ [sitename]/      # 动态编辑器页面
├─ components/         # React组件
├─ lib/                # 工具函数
├─ hooks/              # 自定义Hooks
├─ types/              # TypeScript类型
└─ tests/              # 测试文件
```

---

## 🔐 实现加密库

### 1. 创建 `lib/crypto.ts`

```typescript
export interface EncryptedData {
  encrypted: string;
  salt: string;
  iv: string;
}

export async function encrypt(
  plaintext: string,
  password: string
): Promise<EncryptedData> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const key = await deriveKey(password, salt);

  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    new TextEncoder().encode(plaintext)
  );

  return {
    encrypted: arrayBufferToBase64(encrypted),
    salt: arrayBufferToBase64(salt),
    iv: arrayBufferToBase64(iv),
  };
}

export async function decrypt(
  data: EncryptedData,
  password: string
): Promise<string> {
  const key = await deriveKey(
    password,
    base64ToArrayBuffer(data.salt)
  );

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: base64ToArrayBuffer(data.iv) },
    key,
    base64ToArrayBuffer(data.encrypted)
  );

  return new TextDecoder().decode(decrypted);
}

async function deriveKey(password: string, salt: Uint8Array) {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}
```

### 2. 测试加密功能
```bash
# 创建测试文件
touch lib/crypto.test.ts

# 运行测试
npm run test
```

---

## 🌐 创建API路由

### 1. 保存API (`app/api/save/route.ts`)
```typescript
import { kv } from '@vercel/kv';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { siteName, encrypted, salt, iv } = await req.json();

  await kv.set(`site:${siteName}`, {
    encrypted,
    salt,
    iv,
    updatedAt: Date.now(),
  });

  return Response.json({ success: true });
}
```

### 2. 加载API (`app/api/load/route.ts`)
```typescript
import { kv } from '@vercel/kv';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const siteName = req.nextUrl.searchParams.get('site');

  if (!siteName) {
    return Response.json({ error: 'Missing site name' }, { status: 400 });
  }

  const data = await kv.get(`site:${siteName}`);

  if (!data) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }

  return Response.json(data);
}
```

### 3. 检查API (`app/api/check/route.ts`)
```typescript
import { kv } from '@vercel/kv';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const siteName = req.nextUrl.searchParams.get('site');
  const exists = siteName ? await kv.exists(`site:${siteName}`) : false;

  return Response.json({ exists: !!exists });
}
```

---

## 🎨 创建UI组件

### 1. 基础编辑器 (`components/editor/Editor.tsx`)
```typescript
'use client';

import { useState } from 'react';

export function Editor() {
  const [content, setContent] = useState('');

  return (
    <textarea
      value={content}
      onChange={(e) => setContent(e.target.value)}
      className="w-full h-screen p-6 font-mono resize-none focus:outline-none"
      placeholder="Start typing..."
    />
  );
}
```

### 2. 测试运行
```bash
npm run dev
# 访问 http://localhost:3000
```

---

## ✅ 开发检查清单

### Day 1
- [ ] 项目初始化
- [ ] 安装依赖
- [ ] 配置环境变量
- [ ] 创建基础目录结构
- [ ] 加密库实现
- [ ] 加密库测试

### Day 2
- [ ] API路由实现
- [ ] Redis连接测试
- [ ] API测试

### Day 3-4
- [ ] 编辑器组件
- [ ] 密码模态框
- [ ] 自动保存逻辑
- [ ] 状态栏

### Day 5
- [ ] 首页设计
- [ ] 编辑器页面路由
- [ ] 深色模式
- [ ] 响应式布局

---

## 🧪 测试指南

### 运行测试
```bash
# 单元测试
npm run test

# E2E测试
npm run test:e2e

# 覆盖率
npm run test:coverage
```

### 手动测试流程
```
1. 访问 /mysecret
2. 输入密码 "test123"
3. 点击创建
4. 输入内容 "Hello World"
5. 等待自动保存
6. 刷新页面
7. 输入密码 "test123"
8. 验证内容显示 "Hello World"
```

---

## 🚀 部署到Vercel

### 1. 连接GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/protected-text.git
git push -u origin main
```

### 2. 导入到Vercel
```
1. 访问 vercel.com
2. 点击 "Import Project"
3. 选择GitHub仓库
4. 配置环境变量
5. 部署
```

### 3. 配置KV存储
```
1. Vercel Dashboard → Storage
2. Create → KV Database
3. Connect to Project
4. 环境变量自动注入
```

---

## 📚 推荐资源

### 文档
- [Next.js文档](https://nextjs.org/docs)
- [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
- [Vercel KV](https://vercel.com/docs/storage/vercel-kv)
- [Tailwind CSS](https://tailwindcss.com/docs)

### 工具
- [VS Code](https://code.visualstudio.com/)
- [Figma](https://figma.com)
- [Postman](https://postman.com) (API测试)

---

## 🤝 开发工作流

### Git工作流
```bash
# 创建功能分支
git checkout -b feature/editor

# 开发...

# 提交更改
git add .
git commit -m "feat: add editor component"

# 推送
git push origin feature/editor

# 创建PR
```

### 代码规范
```bash
# 格式化代码
npm run format

# 检查代码
npm run lint

# 类型检查
npm run type-check
```

---

## 🐛 常见问题

### Q: Redis连接失败
```bash
# 检查Redis是否运行
redis-cli ping
# 应返回 PONG

# 检查端口
lsof -i :6379
```

### Q: 加密失败
```
确保在客户端组件中使用 'use client'
确保浏览器支持Web Crypto API
```

### Q: Vercel部署失败
```
检查环境变量是否正确设置
检查Node.js版本 (需要18+)
查看Vercel日志
```

---

## 💡 开发技巧

### 1. 使用React DevTools
```bash
# 安装浏览器扩展
Chrome: React Developer Tools
```

### 2. 使用Vercel CLI预览
```bash
vercel dev
# 本地使用Vercel环境
```

### 3. 热重载
```bash
# Next.js自动热重载
# 修改代码后自动刷新
```

---

## 📞 获取帮助

遇到问题？

1. 查看文档: [SUMMARY.md](./SUMMARY.md)
2. 搜索Issues: GitHub Issues
3. 查看示例: 代码示例
4. 联系团队: team@example.com

---

## 🎉 下一步

准备好了？开始开发：

```bash
# 1. 阅读需求文档
cat REQUIREMENTS.md

# 2. 查看开发计划
cat MVP-PLAN.md

# 3. 开始编码！
code .
npm run dev
```

---

**祝开发愉快！** 🚀

**文档版本**: v1.0
**最后更新**: 2025-11-07
