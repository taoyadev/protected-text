# (Legacy) Vercel 部署指南

## 前置要求

- GitHub/GitLab/Bitbucket 账号
- Vercel 账号（可以用 GitHub 账号登录）
- 项目已推送到 Git 仓库

## 部署步骤

### 1. 推送代码到 Git 仓库

```bash
# 如果还没有 Git 仓库，初始化一个
git init
git add .
git commit -m "Ready for Vercel deployment"

# 添加远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/your-username/protected-text.git
git push -u origin main
```

### 2. 导入项目到 Vercel

#### 方式 A: 通过 Vercel Dashboard（推荐）

1. 访问 [vercel.com](https://vercel.com)
2. 点击 "Add New..." → "Project"
3. 选择你的 Git 仓库
4. Vercel 会自动检测到 Next.js 项目

#### 方式 B: 通过 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel
```

### 3. 配置 Vercel KV 数据库

这是最关键的一步！

1. 在 Vercel 项目页面，进入 **Storage** 标签
2. 点击 **Create Database** → 选择 **KV**
3. 输入数据库名称（例如：`protected-text-kv`）
4. 选择区域（建议选择离用户最近的区域）
5. 点击 **Create**

**重要**: Vercel 会自动注入以下环境变量到你的项目：

- `KV_URL`
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`

无需手动配置这些变量！

### 4. 配置其他环境变量（可选）

如果你需要配置 Stripe 或 NextAuth：

1. 在项目页面，进入 **Settings** → **Environment Variables**
2. 添加以下变量：

```
# Stripe (如果启用 PRO 功能)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# NextAuth (如果启用用户认证)
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=生成一个随机字符串
```

生成 NEXTAUTH_SECRET:

```bash
openssl rand -base64 32
```

### 5. 触发部署

保存配置后，Vercel 会自动触发重新部署。

你也可以手动触发：

- Dashboard: **Deployments** → **Redeploy**
- CLI: `vercel --prod`

### 6. 验证部署

1. 等待部署完成（通常 1-2 分钟）
2. 访问 Vercel 提供的 URL（例如：`protected-text.vercel.app`）
3. 测试创建和加载笔记功能

### 7. 配置自定义域名（可选）

1. 在项目页面，进入 **Settings** → **Domains**
2. 添加你的域名（例如：`protected-text.com`）
3. 按照提示配置 DNS 记录：
   - **A 记录**: `76.76.21.21`
   - 或 **CNAME**: `cname.vercel-dns.com`
4. 等待 DNS 传播（可能需要几分钟到几小时）

## 环境变量清单

### 必需（自动配置）

- ✅ `KV_URL` - Vercel KV 自动注入
- ✅ `KV_REST_API_URL` - Vercel KV 自动注入
- ✅ `KV_REST_API_TOKEN` - Vercel KV 自动注入

### 可选

- ⚪ `STRIPE_SECRET_KEY` - 仅在启用付费功能时需要
- ⚪ `STRIPE_WEBHOOK_SECRET` - 仅在启用付费功能时需要
- ⚪ `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - 仅在启用付费功能时需要
- ⚪ `NEXTAUTH_URL` - 仅在启用用户认证时需要
- ⚪ `NEXTAUTH_SECRET` - 仅在启用用户认证时需要

## 持续部署

配置完成后，每次推送代码到主分支，Vercel 会自动：

1. 检测代码变更
2. 运行 `npm run build`
3. 执行部署
4. 提供预览 URL

### 分支预览

推送到非主分支会创建预览部署，不会影响生产环境。

## 监控和日志

- **实时日志**: Dashboard → **Deployments** → 选择部署 → **Function Logs**
- **Analytics**: Dashboard → **Analytics**（查看流量和性能）
- **错误追踪**: 集成 Sentry（可选）

## 常见问题

### Q: 部署成功但保存失败？

A: 检查 Vercel KV 是否正确配置，确保环境变量已自动注入。

### Q: 如何回滚到之前的版本？

A: Dashboard → **Deployments** → 选择之前的部署 → **Promote to Production**

### Q: 如何查看 KV 数据库内容？

A: Dashboard → **Storage** → 选择你的 KV 数据库 → **Data Browser**

### Q: 构建失败？

A: 检查 Function Logs，常见原因：

- TypeScript 错误
- 缺少依赖
- 环境变量未配置

## 性能优化建议

1. **启用缓存**: Vercel 自动缓存静态资源
2. **边缘函数**: API 路由会自动部署到 Edge
3. **图片优化**: 使用 Next.js `Image` 组件（已配置）
4. **PWA**: 生产环境自动启用 Service Worker

## 安全检查清单

- ✅ 环境变量不要提交到 Git（已配置 `.gitignore`）
- ✅ CSP 头已配置（`next.config.mjs:5-16`）
- ✅ 客户端加密已实现（`lib/crypto.ts`）
- ✅ Rate limiting 已启用（`lib/rate-limit.ts`）

## 成本估算

- **Hobby 计划**（免费）:
  - 100 GB 带宽/月
  - KV: 256 MB 存储，30k 请求/天
  - 适合个人项目和测试

- **Pro 计划**（$20/月）:
  - 1 TB 带宽/月
  - KV: 512 MB 存储，50k 请求/天
  - 商业项目推荐

详见 [Vercel 价格](https://vercel.com/pricing)

## 下一步

- [ ] 配置域名
- [ ] 启用 Analytics
- [ ] 设置邮件通知（部署失败时）
- [ ] 集成 GitHub Actions（可选 CI/CD）
- [ ] 添加备份策略（导出 KV 数据）

## 需要帮助？

- Vercel 文档: https://vercel.com/docs
- Next.js 部署: https://nextjs.org/docs/deployment
- Vercel KV 文档: https://vercel.com/docs/storage/vercel-kv
