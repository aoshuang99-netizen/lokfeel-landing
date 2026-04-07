# Nexus Landing Page — 部署指南

## 项目概览

| 项目 | 详情 |
|------|------|
| 项目名称 | Nexus — Relationship Matching Engine |
| 技术栈 | React + TypeScript + Vite + Tailwind CSS + shadcn/ui |
| 构建输出 | 静态站点（`dist/` 目录，328KB） |
| 页面区块 | Hero → Why Nexus → How It Works → Features → Comparison → Waitlist → Footer |
| 主题 | 亮色/暗色切换（默认暗色） |
| 响应式 | 移动端优先，完整适配 |

---

## 快速部署（3种方案）

### 方案1: Vercel（推荐，最快）

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 在项目根目录执行
cd nexus-landing
vercel

# 3. 按提示操作（全部回车用默认值即可）
# 4. 正式部署
vercel --prod

# 5. 绑定自定义域名（在 Vercel Dashboard → Settings → Domains）
```

**自定义域名**：在Vercel Dashboard添加域名，然后去域名注册商设置DNS：
- A Record: `76.76.21.21`（或CNAME: `cname.vercel-dns.com`）

### 方案2: Netlify（拖拽部署）

1. 访问 https://app.netlify.com/drop
2. 将 `dist/` 文件夹拖入页面
3. 等待部署完成
4. 在 Settings → Domain Management 绑定自定义域名

### 方案3: Cloudflare Pages

1. 将代码推送到 GitHub/GitLab
2. 访问 https://dash.cloudflare.com → Pages → Create
3. 连接 Git 仓库
4. 构建设置：
   - Framework: `Vite`
   - Build command: `npm run build`
   - Output directory: `dist`

---

## 数据收集配置

### Waitlist邮箱收集

目前表单提交到 Google Apps Script（需要配置）。

**配置步骤**：参见 `docs/google-forms-setup.md`

**快速替代方案（Formspree）**：
1. 注册 https://formspree.io
2. 创建表单，获取endpoint URL
3. 修改 `src/App.tsx` 中的 `scriptUrl` 为 Formspree endpoint

### 临时方案
如果暂时不配置后端，表单仍可正常使用——提交的邮箱会存储在用户浏览器的 localStorage 中。

---

## 域名配置建议

| 操作 | 平台 | 说明 |
|------|------|------|
| 购买域名 | Cloudflare / Namecheap | 推荐 `.co` 或 `.app` |
| DNS配置 | 平台自动处理 | 按平台指引设置 |
| SSL证书 | 自动 | 所有推荐平台都免费提供 |
| 预计费用 | ~$10-15/年 | 域名费用，托管免费 |

---

## 本地开发

```bash
cd nexus-landing

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npx vite preview
```

---

## 文件结构

```
nexus-landing/
├── src/
│   ├── App.tsx              # 主页面（所有sections）
│   ├── App.css              # 空文件
│   ├── index.css            # 全局样式 + 设计token
│   ├── main.tsx             # 入口
│   ├── components/ui/       # shadcn/ui 组件
│   └── lib/                 # 工具函数
├── docs/
│   └── google-forms-setup.md # Google Apps Script 配置指南
├── dist/                    # 构建输出（部署用）
├── index.html               # HTML模板 + SEO meta
├── tailwind.config.js       # Tailwind 配置
├── vite.config.ts           # Vite 配置
└── package.json
```

---

## SEO Meta

已配置的meta标签：
- `title`: Nexus — Real Matches. Real Connection. No Swiping.
- `description`: Nexus delivers 5 curated matches per week with explanations. Built for women who value quality.
- `og:*`: OpenGraph标签（Facebook/LinkedIn分享）
- `twitter:*`: Twitter Card标签

---

## 下一步

1. 部署到 Vercel/Netlify
2. 配置自定义域名
3. 设置 Google Forms 数据收集
4. 在 Reddit / Facebook / Instagram 发布引流
5. 监控 waitlist 数据增长
