# 🚀 MVP开发计划

> 2周完成可发布的MVP版本 | 敏捷开发 | 快速迭代

## 📅 时间线总览

```
Week 1: 核心功能开发 (编辑器 + 加密)
Week 2: 完善体验 (UI优化 + 测试)
Week 3: Beta测试 + 修复
Week 4: 正式发布
```

---

## 🎯 MVP功能范围

### ✅ 包含功能 (Must Have)

```
1. 核心编辑器
   ✓ 纯文本编辑
   ✓ 自动保存 (2秒防抖)
   ✓ 字数统计

2. 加密系统
   ✓ 客户端AES-256-GCM加密
   ✓ 密码设置/验证
   ✓ 错误密码提示

3. URL路由
   ✓ /[sitename] 动态路由
   ✓ 首次访问设置密码
   ✓ 再次访问输入密码

4. 基础UI
   ✓ 响应式设计
   ✓ 深色/浅色模式
   ✓ 加载状态
   ✓ 错误提示

5. 导出功能
   ✓ 导出为 .txt
   ✓ 下载到本地
```

### ⏳ 暂不包含 (v1.1+)

```
- Markdown渲染
- 代码高亮
- 版本历史
- 分享链接
- 用户系统
- Pro功能
- PWA
```

---

## 📆 详细开发计划

### Day 1-2: 项目初始化 ⚙️

#### 任务清单

```bash
□ 创建Next.js项目
□ 配置TypeScript + ESLint + Prettier
□ 安装核心依赖
□ 配置Tailwind CSS + shadcn/ui
□ 设置Vercel KV (本地Redis测试)
□ 创建项目结构
□ 配置Git仓库
```

#### 具体命令

```bash
# 1. 创建项目
npx create-next-app@latest protected-text \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*"

cd protected-text

# 2. 安装依赖
npm install \
  @vercel/kv \
  zustand \
  clsx \
  tailwind-merge

npm install -D \
  @types/node \
  prettier \
  prettier-plugin-tailwindcss

# 3. 安装shadcn/ui
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input textarea dialog

# 4. Git初始化
git init
git add .
git commit -m "Initial commit: Project setup"
```

#### 交付物

- ✅ 可运行的Next.js应用
- ✅ 配置好的开发环境
- ✅ 基础UI组件库

---

### Day 3-4: 加密库实现 🔐

#### 任务清单

```typescript
□ 实现加密函数 (encrypt)
□ 实现解密函数 (decrypt)
□ 实现密钥派生 (deriveKey)
□ 工具函数 (Base64转换)
□ 单元测试
```

#### 核心代码 (`lib/crypto.ts`)

```typescript
export interface EncryptedData {
  encrypted: string; // Base64
  salt: string; // Base64
  iv: string; // Base64
}

// 加密
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

// 解密
export async function decrypt(
  encryptedData: EncryptedData,
  password: string,
): Promise<string> {
  const key = await deriveKey(
    password,
    base64ToArrayBuffer(encryptedData.salt),
  );

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: base64ToArrayBuffer(encryptedData.iv) },
    key,
    base64ToArrayBuffer(encryptedData.encrypted),
  );

  return new TextDecoder().decode(decrypted);
}

// 密钥派生
async function deriveKey(password: string, salt: Uint8Array) {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveKey'],
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
    ['encrypt', 'decrypt'],
  );
}
```

#### 测试 (`lib/crypto.test.ts`)

```typescript
describe('Crypto', () => {
  test('encrypt and decrypt', async () => {
    const plaintext = 'Hello, World!';
    const password = 'test123';

    const encrypted = await encrypt(plaintext, password);
    const decrypted = await decrypt(encrypted, password);

    expect(decrypted).toBe(plaintext);
  });

  test('wrong password fails', async () => {
    const encrypted = await encrypt('test', 'password1');
    await expect(decrypt(encrypted, 'password2')).rejects.toThrow();
  });
});
```

#### 交付物

- ✅ 完整的加密/解密库
- ✅ 通过所有单元测试
- ✅ 性能测试 (加密1KB < 50ms)

---

### Day 5-6: API路由实现 🌐

#### 任务清单

```
□ POST /api/save - 保存笔记
□ GET /api/load - 加载笔记
□ GET /api/check - 检查站点是否存在
□ Rate limiting中间件
```

#### API设计

##### 1. 保存笔记 (`app/api/save/route.ts`)

```typescript
// POST /api/save
// Body: { siteName, encrypted, salt, iv }

export async function POST(req: Request) {
  try {
    const { siteName, encrypted, salt, iv } = await req.json();

    // 验证
    if (!siteName || !encrypted || !salt || !iv) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    // 站点名称验证
    if (!/^[a-zA-Z0-9_-]{3,50}$/.test(siteName)) {
      return Response.json({ error: 'Invalid site name' }, { status: 400 });
    }

    // Rate limiting
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    if (!(await checkRateLimit(`save:${ip}`))) {
      return Response.json({ error: 'Too many requests' }, { status: 429 });
    }

    // 大小限制 (100KB)
    const size = encrypted.length;
    if (size > 100 * 1024) {
      return Response.json(
        { error: 'Content too large (max 100KB)' },
        { status: 413 },
      );
    }

    // 保存到KV
    await kv.set(`site:${siteName}`, {
      encrypted,
      salt,
      iv,
      size,
      updatedAt: Date.now(),
    });

    // 设置过期时间 (90天)
    await kv.expire(`site:${siteName}`, 90 * 24 * 60 * 60);

    return Response.json({ success: true });
  } catch (error) {
    console.error('Save error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

##### 2. 加载笔记 (`app/api/load/route.ts`)

```typescript
// GET /api/load?site=xxx

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const siteName = searchParams.get('site');

    if (!siteName) {
      return Response.json({ error: 'Missing site name' }, { status: 400 });
    }

    // Rate limiting
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    if (!(await checkRateLimit(`load:${ip}`))) {
      return Response.json({ error: 'Too many requests' }, { status: 429 });
    }

    // 从KV加载
    const data = await kv.get(`site:${siteName}`);

    if (!data) {
      return Response.json({ error: 'Site not found' }, { status: 404 });
    }

    return Response.json(data);
  } catch (error) {
    console.error('Load error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

##### 3. 检查站点 (`app/api/check/route.ts`)

```typescript
// GET /api/check?site=xxx
// 返回站点是否存在，用于判断是创建还是解锁

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const siteName = searchParams.get('site');

  if (!siteName) {
    return Response.json({ exists: false });
  }

  const exists = await kv.exists(`site:${siteName}`);

  return Response.json({ exists: !!exists });
}
```

#### 交付物

- ✅ 3个API端点
- ✅ 错误处理
- ✅ Rate limiting
- ✅ 数据验证

---

### Day 7-8: 编辑器UI 📝

#### 任务清单

```
□ 创建编辑器组件
□ 自动保存逻辑
□ 字数统计
□ 状态栏
□ 快捷键支持
```

#### 编辑器组件 (`components/Editor.tsx`)

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { StatusBar } from './StatusBar';

interface EditorProps {
  siteName: string;
  initialContent: string;
  onSave: (content: string) => Promise<void>;
}

export function Editor({ siteName, initialContent, onSave }: EditorProps) {
  const [content, setContent] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const debouncedContent = useDebounce(content, 2000);

  // 自动保存
  useEffect(() => {
    if (debouncedContent !== initialContent) {
      setIsSaving(true);
      onSave(debouncedContent)
        .then(() => {
          setLastSaved(new Date());
        })
        .finally(() => {
          setIsSaving(false);
        });
    }
  }, [debouncedContent]);

  // 快捷键
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+S / Cmd+S 保存
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        onSave(content);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [content]);

  return (
    <div className="flex flex-col h-screen">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 w-full p-6 font-mono text-base resize-none focus:outline-none dark:bg-gray-900 dark:text-gray-100"
        placeholder="Start typing..."
        spellCheck={false}
      />

      <StatusBar
        wordCount={content.split(/\s+/).filter(Boolean).length}
        charCount={content.length}
        isSaving={isSaving}
        lastSaved={lastSaved}
      />
    </div>
  );
}
```

#### 状态栏 (`components/StatusBar.tsx`)

```typescript
interface StatusBarProps {
  wordCount: number;
  charCount: number;
  isSaving: boolean;
  lastSaved: Date | null;
}

export function StatusBar({
  wordCount,
  charCount,
  isSaving,
  lastSaved
}: StatusBarProps) {
  return (
    <div className="flex items-center justify-between px-6 py-2 text-sm text-gray-500 border-t dark:border-gray-700">
      <div className="flex gap-4">
        <span>{wordCount} words</span>
        <span>{charCount} characters</span>
      </div>

      <div>
        {isSaving && <span>Saving...</span>}
        {!isSaving && lastSaved && (
          <span>Saved {formatTimeAgo(lastSaved)}</span>
        )}
      </div>
    </div>
  );
}
```

#### 交付物

- ✅ 可用的编辑器
- ✅ 自动保存
- ✅ 状态反馈

---

### Day 9-10: 密码模态框 🔑

#### 任务清单

```
□ 创建密码输入组件
□ 首次访问 - 设置密码
□ 再次访问 - 验证密码
□ 密码强度提示
□ 错误处理
```

#### 密码模态框 (`components/PasswordModal.tsx`)

```typescript
'use client';

import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface PasswordModalProps {
  isOpen: boolean;
  mode: 'create' | 'unlock';
  onSubmit: (password: string) => void;
  error?: string;
}

export function PasswordModal({
  isOpen,
  mode,
  onSubmit,
  error
}: PasswordModalProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'create' && password !== confirmPassword) {
      return;
    }

    onSubmit(password);
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold">
            {mode === 'create' ? 'Create Password' : 'Enter Password'}
          </h2>

          <p className="text-sm text-gray-500">
            {mode === 'create'
              ? 'This password will encrypt your note. Do not lose it!'
              : 'Enter your password to unlock this note.'}
          </p>

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />

          {mode === 'create' && (
            <Input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <Button type="submit" className="w-full">
            {mode === 'create' ? 'Create' : 'Unlock'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```

#### 交付物

- ✅ 密码输入界面
- ✅ 创建/解锁模式
- ✅ 错误提示

---

### Day 11-12: 页面整合 🎨

#### 任务清单

```
□ 首页 (Landing Page)
□ 编辑器页面路由
□ 深色模式切换
□ 响应式布局
□ 加载状态
```

#### 编辑器页面 (`app/[sitename]/page.tsx`)

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Editor } from '@/components/Editor';
import { PasswordModal } from '@/components/PasswordModal';
import { encrypt, decrypt } from '@/lib/crypto';

export default function EditorPage() {
  const { sitename } = useParams();
  const [isLocked, setIsLocked] = useState(true);
  const [mode, setMode] = useState<'create' | 'unlock'>('unlock');
  const [content, setContent] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // 检查站点是否存在
    checkSiteExists();
  }, [sitename]);

  async function checkSiteExists() {
    const res = await fetch(`/api/check?site=${sitename}`);
    const { exists } = await res.json();
    setMode(exists ? 'unlock' : 'create');
  }

  async function handlePasswordSubmit(pwd: string) {
    setPassword(pwd);

    if (mode === 'create') {
      setIsLocked(false);
      setContent('');
    } else {
      // 加载并解密
      try {
        const res = await fetch(`/api/load?site=${sitename}`);
        const data = await res.json();

        const decrypted = await decrypt(data, pwd);
        setContent(decrypted);
        setIsLocked(false);
      } catch {
        setError('Wrong password');
      }
    }
  }

  async function handleSave(newContent: string) {
    const encrypted = await encrypt(newContent, password);

    await fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        siteName: sitename,
        ...encrypted
      })
    });
  }

  return (
    <>
      <PasswordModal
        isOpen={isLocked}
        mode={mode}
        onSubmit={handlePasswordSubmit}
        error={error}
      />

      {!isLocked && (
        <Editor
          siteName={sitename as string}
          initialContent={content}
          onSave={handleSave}
        />
      )}
    </>
  );
}
```

#### 首页 (`app/page.tsx`)

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function HomePage() {
  const router = useRouter();
  const [siteName, setSiteName] = useState('');

  const handleStart = () => {
    if (siteName) {
      router.push(`/${siteName}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-5xl font-bold mb-4">Protected Text</h1>
      <p className="text-xl text-gray-600 mb-8">
        Encrypted notes. Zero knowledge.
      </p>

      <div className="flex gap-2 w-full max-w-md">
        <Input
          placeholder="Enter site name..."
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleStart()}
        />
        <Button onClick={handleStart}>Start</Button>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Or go to: protected-text.app/<strong>your-site-name</strong>
      </p>
    </div>
  );
}
```

#### 交付物

- ✅ 完整的用户流程
- ✅ 首页 → 设置密码 → 编辑 → 自动保存
- ✅ 响应式设计

---

### Day 13-14: 测试 & 优化 🧪

#### 任务清单

```
□ 单元测试 (加密库)
□ 集成测试 (API)
□ E2E测试 (用户流程)
□ 性能优化
□ 错误处理完善
□ SEO优化
```

#### 性能检查

```bash
# Lighthouse测试
npm run build
npm run start
# 访问 localhost:3000 运行Lighthouse

目标:
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 90
```

#### Bug修复

```
□ 加密失败处理
□ 网络错误重试
□ 大文本性能
□ 移动端适配
□ 浏览器兼容性
```

---

## 📋 发布前检查清单

### 功能测试

- [ ] 首次访问 - 创建新笔记
- [ ] 设置密码
- [ ] 输入内容
- [ ] 自动保存成功
- [ ] 关闭浏览器
- [ ] 重新打开
- [ ] 输入密码解锁
- [ ] 内容正确显示
- [ ] 编辑内容
- [ ] 再次自动保存
- [ ] 错误密码拒绝
- [ ] 导出功能
- [ ] 深色模式切换
- [ ] 移动端访问

### 性能测试

- [ ] 首屏加载 < 1.5s
- [ ] TTI < 2s
- [ ] 加密1KB < 50ms
- [ ] 解密1KB < 50ms
- [ ] 保存响应 < 500ms

### 安全测试

- [ ] 服务器看不到明文
- [ ] 错误密码无法解密
- [ ] XSS防护
- [ ] CSRF防护
- [ ] Rate limiting生效

### 兼容性测试

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] iOS Safari
- [ ] Android Chrome

---

## 🚀 部署计划

### 1. Vercel部署

```bash
# 安装Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel

# 生产部署
vercel --prod
```

### 2. 环境变量设置

```bash
# Vercel Dashboard
KV_URL=xxx
KV_REST_API_URL=xxx
KV_REST_API_TOKEN=xxx
```

### 3. 域名设置

```
- 添加域名: protected-text.app
- 配置DNS
- 等待SSL证书
```

---

## 📊 MVP成功指标

### 第一周目标

```
□ 10个测试用户
□ 50个笔记创建
□ 0个严重bug
□ 用户反馈收集
```

### 第一个月目标

```
□ 1,000个独立访问
□ 500个笔记创建
□ 20%+ 重复访问率
□ 用户推荐分享
```

---

## 🎯 下一步 (v1.1)

### 计划功能

1. Markdown支持
2. 代码高亮
3. 版本历史
4. 分享链接
5. PWA

---

**计划状态**: ✅ Ready to Execute
**预计完成**: 2周
**团队规模**: 1-2 开发者
**最后更新**: 2025-11-07
