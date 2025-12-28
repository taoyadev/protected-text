# Cloudflare 部署指南 (Workers + D1)

本项目使用 Cloudflare Worker 提供 API，并用 D1 (SQLite) 做持久化存储；前端为静态页面，所有内容在浏览器端加密后再上传。

## 1) 安装 Wrangler

推荐直接用 `npx wrangler`（无需全局安装）。

## 2) 创建 D1 数据库

```bash
npx wrangler d1 create cloudnote-db
```

把输出里的 `database_id` 填到 `wrangler.toml:12`。

## 3) 初始化表结构

```bash
npx wrangler d1 execute cloudnote-db --file=./schema.sql
```

推荐使用 D1 migrations（可追踪变更）：

```bash
npx wrangler d1 migrations apply cloudnote-db
```

如果你想先在本地跑（本地 D1）：

```bash
npx wrangler d1 execute cloudnote-db --local --file=./schema.sql
```

## 4) 本地开发

```bash
npx wrangler dev
```

访问：

- `http://localhost:8787/`（Landing）
- `http://localhost:8787/my-note`（`my-note` 作为 slug / 笔记 ID）
- `http://localhost:8787/_/security`（安全说明）
- `http://localhost:8787/_/privacy`（隐私说明）

## 5) 部署到 Cloudflare

```bash
npx wrangler deploy
```

## 6) 数据结构

- 表：`notes`
- 主键：`slug`
- 字段：`content`（密文 Base64）、`iv`（Base64）、`salt`（Base64）、`size`（字符数）、`created_at`（ms）、`updated_at`（ms）
- 表：`note_versions`（历史版本，默认保留最近 10 条）
