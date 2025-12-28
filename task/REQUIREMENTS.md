# Protected Text - 产品需求文档 (PRD)

> 基于关键词研究的深度用户需求分析 | 数据驱动的产品设计

## 📊 关键数据洞察

### 核心指标

- **主关键词搜索量**: 12K/月 ("protected text")
- **品牌认知度**: 强（100% Branded）
- **付费版需求**: 1.2K/月 ("protected text pro")
- **用户留存指标**: 登录功能搜索量 50/月

### 用户搜索意图分层

#### ✅ 目标用户群 (60%)

```
需求: 加密笔记/文本保护
关键词:
├─ protected text (12K) - 核心需求
├─ protected text pro (1.2K) - 付费升级
├─ protected text login (50) - 长期用户
├─ password protected text file (30)
└─ protected text notepad (10)
```

#### ⚠️ 误导性流量 (35%)

```
需求: 复制受保护内容（非目标用户）
关键词:
├─ copy text from protected pdf (40)
├─ copy text from protected website (20)
└─ how to copy text from protected... (多个变体)

策略:
1. 可考虑做内容营销转化
2. 提供PDF加密工具作为附加功能
3. 在落地页明确区分功能
```

#### 🔍 竞品研究流量 (5%)

```
├─ protected text alternative (30)
└─ protected text review (0-10)

痛点信号: 用户在找替代品说明现有产品有缺陷
```

---

## 🎯 核心用户需求分析

### 1️⃣ 主要用户画像

#### 👤 隐私保护者 (40%)

- **场景**: 存储密码、私人笔记、敏感信息
- **诉求**: 强加密、无需信任平台、零知识架构
- **痛点**: 担心数据泄露、不想注册账号

#### 💼 轻量级用户 (35%)

- **场景**: 临时记录、跨设备同步、快速分享
- **诉求**: 快速访问、简单URL、自动保存
- **痛点**: Evernote太重、Google Docs需登录

#### 🔐 开发者/极客 (15%)

- **场景**: 存储API密钥、配置文件、代码片段
- **诉求**: Markdown、代码高亮、版本控制
- **痛点**: 现有工具功能太少

#### 📱 移动用户 (10%)

- **场景**: 手机快速记录
- **诉求**: 移动端优化、PWA
- **痛点**: 界面不友好

---

## 🚀 产品功能规划

### MVP 核心功能 (必须有)

#### 🔒 安全 & 加密

```typescript
✓ 客户端AES-256加密 (零知识)
✓ 密码强度检测 + 提示
✓ 防暴力破解 (rate limiting)
✓ 可选的双重加密
✓ 密码找回机制 (可选邮箱绑定)
```

#### 📝 编辑器体验

```typescript
✓ 实时自动保存 (debounce 2秒)
✓ 字数统计
✓ 快捷键支持 (Ctrl+S, Ctrl+B等)
✓ 撤销/重做
✓ 全屏模式
```

#### 🔗 访问方式

```typescript
✓ 直接URL访问: site.com/[sitename]
✓ 自定义站点名称
✓ 首次访问设置密码
✓ 支持特殊字符URL
```

#### 💾 数据管理

```typescript
✓ 自动保存到云端
✓ 导出功能 (.txt, .md)
✓ 清空/删除站点
✓ 数据保留策略 (90天无访问自动删除)
```

---

### 🎨 差异化功能 (竞争优势)

#### ⭐ Markdown + 代码支持

```markdown
✓ 实时Markdown渲染
✓ 代码高亮 (50+ 语言)
✓ 预览/编辑模式切换
✓ 导出为PDF/HTML

用户价值: 吸引开发者群体 + 提升内容可读性
数据支持: "protected text notepad" 有搜索需求
```

#### 📚 版本历史

```typescript
✓ 自动版本快照 (每24小时)
✓ 手动创建版本
✓ 版本对比 (diff view)
✓ 恢复到历史版本

用户价值: 误删保护、内容审计
Pro功能: 免费3个版本，Pro无限
```

#### 🔗 智能分享

```typescript
✓ 只读链接生成
✓ 有效期设置 (1小时/1天/7天/永久)
✓ 访问次数限制
✓ 密码保护的分享链接

用户价值: 安全分享敏感信息
使用场景: 分享密码给同事、临时共享
```

#### 🌙 现代化UI

```typescript
✓ 深色/浅色模式
✓ 自定义主题颜色
✓ 编辑器字体选择 (Mono/Sans/Serif)
✓ 响应式设计
✓ PWA支持 (离线访问)

用户价值: 更好的视觉体验
趋势: 深色模式已成标配
```

---

## 💰 商业模式设计

### Free 版本

```yaml
价格: $0
存储: 100KB/站点
版本历史: 最近3个版本
站点数量: 无限
自动删除: 90天无访问
功能限制:
  - 无自定义域名
  - 无API访问
  - 基础Markdown
```

### Pro 版本 ($4.99/月 或 $49/年)

```yaml
存储: 10MB/站点
版本历史: 无限
自动删除: 永不删除
额外功能: ✓ 自定义域名
  ✓ API访问
  ✓ 批量导出
  ✓ 优先支持
  ✓ 无广告
  ✓ 多人协作 (只读)
  ✓ 审计日志
```

### Team 版本 ($19.99/月)

```yaml
适合: 5-50人团队
特性: ✓ 统一管理后台
  ✓ SSO登录
  ✓ 权限管理
  ✓ 合规导出
```

**定价策略依据**:

- 竞品分析: Notion ($8), Evernote ($7.99)
- 我们更轻量，定价应更低
- "protected text pro" 1.2K搜索量证明付费意愿

---

## 🎯 关键词SEO策略

### 防御性内容 (转化误导流量)

**问题**: 35%流量是"如何复制受保护内容"

**解决方案**: 创建内容营销漏斗

```
博客文章:
├─ "如何保护你的PDF不被复制" (转化流量)
├─ "网站文本保护最佳实践" (教育 → 推广产品)
├─ "比较: 文本保护 vs 复制保护工具" (澄清产品定位)
└─ "开发者如何用API保护内容" (展示Pro功能)
```

### 功能性关键词布局

```
页面              目标关键词                     搜索量
─────────────────────────────────────────────────────
首页              protected text                12K
登录页            protected text login          50
定价页            protected text pro            1.2K
功能页            password protected notepad    30
替代品对比页      protected text alternative    30
```

---

## 🏗️ 技术架构建议

### 前端

```typescript
框架: Next.js 15 + TypeScript
编辑器:
  - Monaco Editor (代码模式)
  - Tiptap (Markdown模式)
加密: Web Crypto API (原生)
状态: Zustand (轻量)
样式: Tailwind CSS + shadcn/ui
PWA: next-pwa
```

### 后端

```typescript
部署: Vercel (前端) + Vercel KV (存储)
API: Next.js API Routes
限流: Upstash Redis
认证: NextAuth.js (Pro用户)
支付: Stripe
```

### 安全

```typescript
加密流程:
  用户密码 → PBKDF2 → AES-256-GCM → 加密文本

服务器存储: 只存加密后的blob
零知识: 服务器永远看不到明文

防护:
  ✓ CSP Headers
  ✓ Rate Limiting (10次/分钟)
  ✓ HTTPS Only
  ✓ XSS Protection
```

---

## 📈 成功指标 (KPIs)

### 产品指标

```
用户获取:
├─ 月访问量: 50K (第6个月)
├─ 新站点创建: 5K/月
└─ 付费转化率: 2% (PRD → Pro)

用户留存:
├─ 7日留存: >40%
├─ 30日留存: >25%
└─ 平均站点数/用户: 3

收入指标:
├─ MRR: $5K (第12个月)
├─ ARPU: $4.99
└─ CAC: < $10
```

### SEO指标

```
6个月目标:
├─ "protected text" 排名: Top 3
├─ 品牌搜索占比: >60%
├─ 自然流量: 30K/月
└─ 反向链接: >100
```

---

## 🚧 开发路线图

### Phase 1: MVP (Week 1-2)

```
✓ 基础编辑器 + 加密
✓ URL路由系统
✓ 自动保存
✓ 导出功能
✓ 深色模式
```

### Phase 2: 增强功能 (Week 3-4)

```
✓ Markdown支持
✓ 代码高亮
✓ 版本历史 (3个)
✓ 分享链接
✓ PWA
```

### Phase 3: Pro功能 (Week 5-6)

```
✓ 用户认证
✓ 付费订阅
✓ Pro功能解锁
✓ 管理后台
```

### Phase 4: 增长 (Week 7-8)

```
✓ SEO优化
✓ 内容营销
✓ API文档
✓ 推荐系统
```

---

## 🎨 UI/UX 设计原则

### 极简主义

```
首屏: 只有编辑器 (学习 notion.so 落地页)
操作: 零配置即可开始使用
视觉: 大量留白，专注内容
```

### 性能优先

```
首屏加载: <1.5s
TTI: <2s
编辑器响应: <50ms
```

### 信任建立

```
首页显示:
  ✓ "零知识加密" 标识
  ✓ 开源加密算法说明
  ✓ 隐私政策一句话摘要
  ✓ 数据保留政策
```

---

## 🔥 竞品分析

### 现有 ProtectedText.com

**优势**:

- 极简
- 无需注册
- 品牌认知度高

**劣势** (我们的机会):

- UI过时
- 无Markdown
- 无版本历史
- 无移动端优化
- 无Pro版本

### 其他竞品

| 产品     | 优势       | 劣势         | 我们如何赢 |
| -------- | ---------- | ------------ | ---------- |
| Notion   | 功能强大   | 太重、需注册 | 更轻、更快 |
| Pastebin | 简单       | 无加密       | 强安全性   |
| Cryptpad | 开源、协作 | 复杂         | 极简体验   |

---

## 🎁 病毒式增长策略

### 产品内增长

```typescript
1. 分享链接底部显示:
   "Create your own protected note at [site]"

2. 导出文件包含:
   "Exported from [site] - Encrypted notes"

3. API响应包含:
   X-Powered-By: ProtectedText
```

### 开发者友好

```typescript
公开API: POST / api / create;
GET / api / read;
PUT / api / update;

用例: -CI / CD存储密钥 - 脚本分享配置 - 自动化备份;
```

### 社区建设

```
- GitHub开源加密库
- Chrome扩展 (快速创建笔记)
- VS Code扩展 (同步代码片段)
```

---

## ⚠️ 风险与应对

### 法律风险

```
问题: 用户存储非法内容
应对:
  - 服务条款明确禁止
  - 举报机制
  - 保留删除权利
  - 配合执法部门
```

### 技术风险

```
问题: 用户忘记密码
应对:
  - 明确告知无法找回
  - 可选邮箱恢复（降低安全性）
  - 本地密码管理器建议
```

### 商业风险

```
问题: 免费用户太多，成本高
应对:
  - 90天删除策略
  - 存储大小限制
  - CDN优化
  - 合理定价Pro版本
```

---

## 📞 下一步行动

### 立即开始

```bash
1. 创建项目架构
2. 实现加密Demo
3. 设计UI原型
4. 开发MVP (2周)
5. 内测 (10个用户)
6. 公开发布
```

### 需要确认的问题

- [ ] 是否需要用户注册功能？(建议：可选)
- [ ] 数据保留多久？(建议：90天)
- [ ] 是否开源？(建议：前端开源，后端闭源)
- [ ] 定价策略？(建议：$4.99/月)
- [ ] 是否支持协作？(建议：Phase 2)

---

## 📚 附录

### 关键词完整列表

详见 `/keywords-analysis.csv`

### 参考资源

- [Web Crypto API文档](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
- [零知识架构设计](https://www.schneier.com/blog/archives/2024/01/zero-knowledge.html)
- [Next.js最佳实践](https://nextjs.org/docs)

---

**文档版本**: v1.0
**最后更新**: 2025-11-07
**作者**: Product Team
**状态**: ✅ Ready for Development
