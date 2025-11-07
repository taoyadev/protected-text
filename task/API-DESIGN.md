# 🌐 API设计文档

> RESTful API设计规范 | v1.0

## 📋 概览

```
Base URL: https://protected-text.app/api
协议: HTTPS only
格式: JSON
认证: 无 (MVP) / JWT (Pro)
Rate Limit: 10 req/min per IP
```

---

## 🔐 公共API (MVP)

### 1. 检查站点是否存在

```http
GET /api/check?site={siteName}
```

#### 请求参数
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| site | string | ✅ | 站点名称 (3-50字符) |

#### 响应
```json
{
  "exists": true,
  "createdAt": 1699999999999
}
```

#### 状态码
- `200` - 成功
- `400` - 参数错误

#### 示例
```bash
curl https://protected-text.app/api/check?site=mysecret
```

---

### 2. 加载笔记

```http
GET /api/load?site={siteName}
```

#### 请求参数
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| site | string | ✅ | 站点名称 |

#### 响应
```json
{
  "encrypted": "base64_encrypted_content",
  "salt": "base64_salt",
  "iv": "base64_iv",
  "size": 1024,
  "updatedAt": 1699999999999
}
```

#### 错误响应
```json
{
  "error": "Site not found"
}
```

#### 状态码
- `200` - 成功
- `400` - 参数错误
- `404` - 站点不存在
- `429` - 超出限流

#### 示例
```bash
curl https://protected-text.app/api/load?site=mysecret
```

---

### 3. 保存笔记

```http
POST /api/save
Content-Type: application/json
```

#### 请求体
```json
{
  "siteName": "mysecret",
  "encrypted": "base64_encrypted_content",
  "salt": "base64_salt",
  "iv": "base64_iv"
}
```

#### 字段说明
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| siteName | string | ✅ | 站点名称 (3-50字符，字母数字-_) |
| encrypted | string | ✅ | Base64加密内容 (max 100KB) |
| salt | string | ✅ | Base64 salt (16字节) |
| iv | string | ✅ | Base64 IV (12字节) |

#### 响应
```json
{
  "success": true,
  "updatedAt": 1699999999999
}
```

#### 错误响应
```json
{
  "error": "Content too large (max 100KB)"
}
```

#### 状态码
- `200` - 成功
- `400` - 参数错误
- `413` - 内容过大
- `429` - 超出限流

#### 示例
```bash
curl -X POST https://protected-text.app/api/save \
  -H "Content-Type: application/json" \
  -d '{
    "siteName": "mysecret",
    "encrypted": "...",
    "salt": "...",
    "iv": "..."
  }'
```

---

### 4. 删除笔记

```http
DELETE /api/delete
Content-Type: application/json
```

#### 请求体
```json
{
  "siteName": "mysecret",
  "password": "user_password"
}
```

#### 说明
- 需要提供密码验证
- 客户端先解密验证密码，再发送删除请求
- 或者生成特殊的删除凭证

#### 响应
```json
{
  "success": true
}
```

#### 状态码
- `200` - 成功
- `400` - 参数错误
- `403` - 验证失败
- `404` - 站点不存在

---

## 📊 统计API (内部)

### 5. 记录事件

```http
POST /api/analytics
Content-Type: application/json
```

#### 请求体
```json
{
  "event": "note_created",
  "properties": {
    "size": 1024,
    "hasPassword": true
  }
}
```

#### 事件类型
- `note_created` - 笔记创建
- `note_viewed` - 笔记查看
- `note_saved` - 笔记保存
- `note_deleted` - 笔记删除
- `password_failed` - 密码错误
- `export_clicked` - 导出点击

---

## 🔐 认证API (Pro版本)

### 6. 用户注册

```http
POST /api/auth/signup
Content-Type: application/json
```

#### 请求体
```json
{
  "email": "user@example.com",
  "password": "secure_password"
}
```

#### 响应
```json
{
  "user": {
    "id": "usr_xxx",
    "email": "user@example.com"
  },
  "token": "jwt_token"
}
```

---

### 7. 用户登录

```http
POST /api/auth/login
Content-Type: application/json
```

#### 请求体
```json
{
  "email": "user@example.com",
  "password": "secure_password"
}
```

#### 响应
```json
{
  "user": {
    "id": "usr_xxx",
    "email": "user@example.com",
    "subscription": {
      "plan": "pro",
      "status": "active"
    }
  },
  "token": "jwt_token"
}
```

---

### 8. 获取用户信息

```http
GET /api/auth/me
Authorization: Bearer {token}
```

#### 响应
```json
{
  "id": "usr_xxx",
  "email": "user@example.com",
  "subscription": {
    "plan": "pro",
    "status": "active",
    "periodEnd": 1699999999999
  },
  "sites": ["mysecret", "notes", "draft"],
  "usage": {
    "storageUsed": 1048576,
    "storageLimit": 10485760
  }
}
```

---

## 📝 版本历史API (Pro)

### 9. 获取版本列表

```http
GET /api/versions?site={siteName}
Authorization: Bearer {token}
```

#### 响应
```json
{
  "versions": [
    {
      "id": "ver_xxx",
      "timestamp": 1699999999999,
      "size": 1024,
      "label": "Before major edit"
    }
  ]
}
```

---

### 10. 恢复版本

```http
POST /api/versions/restore
Authorization: Bearer {token}
Content-Type: application/json
```

#### 请求体
```json
{
  "siteName": "mysecret",
  "versionId": "ver_xxx"
}
```

---

## 🔗 分享API (Pro)

### 11. 创建分享链接

```http
POST /api/share
Authorization: Bearer {token}
Content-Type: application/json
```

#### 请求体
```json
{
  "siteName": "mysecret",
  "mode": "readonly",
  "expiresIn": 86400,
  "maxViews": 10,
  "password": "optional_extra_password"
}
```

#### 响应
```json
{
  "shareId": "abc123",
  "shareUrl": "https://protected-text.app/s/abc123",
  "expiresAt": 1699999999999
}
```

---

### 12. 访问分享链接

```http
GET /api/share/{shareId}
```

#### 响应
```json
{
  "encrypted": "...",
  "salt": "...",
  "iv": "...",
  "mode": "readonly",
  "requiresPassword": false,
  "views": 3,
  "maxViews": 10
}
```

---

## 💳 订阅API (Pro)

### 13. 创建结账会话

```http
POST /api/stripe/checkout
Authorization: Bearer {token}
Content-Type: application/json
```

#### 请求体
```json
{
  "plan": "pro_monthly",
  "successUrl": "https://protected-text.app/success",
  "cancelUrl": "https://protected-text.app/pricing"
}
```

#### 响应
```json
{
  "sessionId": "cs_xxx",
  "url": "https://checkout.stripe.com/xxx"
}
```

---

### 14. 管理订阅

```http
POST /api/stripe/portal
Authorization: Bearer {token}
```

#### 响应
```json
{
  "url": "https://billing.stripe.com/xxx"
}
```

---

## 🔒 Rate Limiting

### 限流策略

| 端点 | 限制 | 时间窗口 |
|------|------|----------|
| /api/check | 30次 | 1分钟 |
| /api/load | 10次 | 1分钟 |
| /api/save | 10次 | 1分钟 |
| /api/delete | 5次 | 1分钟 |
| /api/auth/* | 5次 | 1分钟 |

### 限流响应
```json
{
  "error": "Too many requests",
  "retryAfter": 60
}
```

### Headers
```
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 5
X-RateLimit-Reset: 1699999999
```

---

## ⚠️ 错误处理

### 标准错误格式
```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {
    "field": "Additional info"
  }
}
```

### 错误码
| 状态码 | 说明 |
|--------|------|
| 400 | Bad Request - 参数错误 |
| 401 | Unauthorized - 未认证 |
| 403 | Forbidden - 无权限 |
| 404 | Not Found - 资源不存在 |
| 413 | Payload Too Large - 内容过大 |
| 429 | Too Many Requests - 限流 |
| 500 | Internal Server Error - 服务器错误 |

### 错误码列表
```typescript
enum ErrorCode {
  INVALID_SITE_NAME = 'invalid_site_name',
  SITE_NOT_FOUND = 'site_not_found',
  CONTENT_TOO_LARGE = 'content_too_large',
  RATE_LIMIT_EXCEEDED = 'rate_limit_exceeded',
  INVALID_PASSWORD = 'invalid_password',
  ENCRYPTION_FAILED = 'encryption_failed',
  STORAGE_QUOTA_EXCEEDED = 'storage_quota_exceeded',
  SUBSCRIPTION_REQUIRED = 'subscription_required',
}
```

---

## 🔧 客户端SDK (未来)

### JavaScript SDK示例
```typescript
import { ProtectedText } from 'protected-text-sdk';

const client = new ProtectedText({
  apiKey: 'your_api_key' // Pro only
});

// 保存笔记
await client.save({
  siteName: 'mysecret',
  content: 'Hello, World!',
  password: 'secure_password'
});

// 加载笔记
const content = await client.load({
  siteName: 'mysecret',
  password: 'secure_password'
});

// 创建分享链接
const shareUrl = await client.share({
  siteName: 'mysecret',
  mode: 'readonly',
  expiresIn: 86400
});
```

---

## 📊 API版本控制

### 版本策略
```
当前版本: v1
URL格式: /api/{endpoint}

未来版本:
/api/v2/{endpoint}
```

### 版本变更
- 破坏性更改 → 新版本
- 新增功能 → 同版本
- Bug修复 → 同版本

---

## 🧪 测试端点 (开发环境)

```http
POST /api/test/seed
```

创建测试数据

```http
DELETE /api/test/cleanup
```

清除测试数据

---

## 📝 Webhook (Pro)

### Stripe Webhooks

```http
POST /api/stripe/webhook
Stripe-Signature: {signature}
```

#### 处理事件
- `checkout.session.completed` - 订阅成功
- `customer.subscription.updated` - 订阅更新
- `customer.subscription.deleted` - 订阅取消
- `invoice.payment_failed` - 支付失败

---

## 🔐 安全建议

### 客户端最佳实践
1. **永远不要**在请求中发送明文密码到服务器
2. 所有加密在客户端完成
3. 使用HTTPS
4. 实施CORS策略
5. 验证所有输入

### 服务器最佳实践
1. Rate limiting
2. 输入验证
3. SQL注入防护 (虽然用KV)
4. XSS防护
5. CSRF防护

---

## 📈 监控指标

### 需要跟踪的指标
- API响应时间 (P50, P95, P99)
- 错误率
- 限流触发次数
- 存储使用量
- 活跃用户数

---

**文档版本**: v1.0
**最后更新**: 2025-11-07
**维护者**: Engineering Team
