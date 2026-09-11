# 我的博客

基于 [VitePress](https://vitepress.dev/) 的个人博客，包含**编程笔记**与**生活随笔**两个栏目，
支持全文搜索、归档页、暗色模式，并已配置 GitHub Pages 自动部署。

## 快速开始

```bash
npm install     # 首次运行，安装依赖
npm run dev     # 启动本地预览 http://localhost:5173
npm run build   # 构建静态文件到 docs/.vitepress/dist
npm run preview # 本地预览构建产物
```

> Windows 上如果 PowerShell 提示「禁止运行脚本」，把 `npm` 换成 `npm.cmd` 即可。
>
> 如果安装时报 `EPERM`（写全局缓存被权限拦下），可以指定项目内的缓存目录：
>
> ```powershell
> $env:npm_config_cache = "$PWD\.npm-cache"
> npm.cmd install --ignore-scripts
> ```

## 本机已知情况（2025-01 搭建时记录）

- **Node 24 / npm 11**：可用
- **git**：本机未安装。这不影响本地写作和构建，只影响两件事：
  1. 页面上的「最后更新于」不会显示 —— `config.mts` 会自动探测，没 git 就关掉该功能，装上 git 后自动恢复
  2. 无法用 `git push` 发布，需要先装 git（见文末）
- `npm install` 加了 `--ignore-scripts`：本项目没有必须执行的安装脚本，跳过它可以避开部分权限报错


## 目录结构

```text
my-blog/
├─ docs/
│  ├─ .vitepress/
│  │  ├─ config.mts              # 站点配置：标题、导航、侧边栏、搜索
│  │  ├─ posts.data.mjs          # 自动扫描并排序所有文章
│  │  └─ theme/
│  │     ├─ index.ts             # 主题入口，注册全局组件
│  │     ├─ custom.css           # 自定义样式（主题色在这里改）
│  │     └─ components/
│  │        ├─ PostList.vue      # 文章卡片列表
│  │        └─ ArchiveList.vue   # 按年份归档
│  ├─ blog/
│  │  ├─ tech/                   # 编程笔记
│  │  └─ life/                   # 生活随笔
│  ├─ public/                    # 静态资源（logo.svg、favicon.svg、图片）
│  ├─ index.md                   # 首页
│  ├─ archive.md                 # 归档页
│  └─ about.md                   # 关于页
├─ .github/workflows/deploy.yml  # GitHub Pages 自动部署
└─ package.json
```

## 怎么发一篇新文章

在 `docs/blog/tech/` 或 `docs/blog/life/` 下新建 `.md` 文件，开头写 frontmatter：

```md
---
title: 文章标题
date: 2025-01-20
category: 编程笔记      # 编程笔记 / 生活随笔
tags: [标签一, 标签二]
description: 一句话摘要，会显示在列表卡片上。
---

正文……（Markdown 语法）
```

保存后首页、列表页、归档页会自动更新（`posts.data.mjs` 扫描 `blog/**/*.md`
并按 `date` 倒序排列）。

> 加了 frontmatter 的页面才进入文章列表；像 `blog/tech/index.md` 这种栏目首页
> 没有 `date`，因此不会被当成文章。

### 文章里放图片

图片放在 `docs/public/images/` 下，正文里用绝对路径引用：

```md
![示意图](/images/demo.png)
```

## 本地预览效果

```bash
npm run dev
```

浏览器打开终端里输出的地址（默认 <http://localhost:5173>）。

## 部署到 GitHub Pages

### 0. 先装 git（本机还没有）

在 PowerShell 里执行：

```powershell
winget install --id Git.Git -e --source winget
```

装完**重开一个终端**（让 PATH 生效），用 `git --version` 确认。

### 1. 建仓库并推送

先在 GitHub 上新建一个仓库（例如 `my-blog`，**不要**勾选自动生成 README），然后：

```bash
cd my-blog
git init -b main
git add .
git commit -m "chore: init blog"
git remote add origin https://github.com/你的用户名/my-blog.git
git push -u origin main
```

### 2. 打开 Pages

仓库页面 → **Settings → Pages → Build and deployment → Source** 选择
**GitHub Actions**。

之后每次 `git push` 到 `main`，`.github/workflows/deploy.yml` 会自动构建并发布。
发布地址是：

```text
https://你的用户名.github.io/my-blog/
```

### 3. 关于 base 路径（重要）

项目型仓库的访问地址带子路径，所以构建时 `base` 必须是 `/my-blog/`。
workflow 里已经自动取仓库名注入，**本地开发不受影响**（默认 `/`）。

如果你的仓库名是 `你的用户名.github.io`（用户主页），请把 workflow 里
`BASE_PATH` 那一行删除或改成 `/`。

## 换成你自己的信息

| 要改的东西 | 位置 |
| --- | --- |
| 站点标题、描述 | `docs/.vitepress/config.mts` 里的 `title` / `description` |
| 导航、侧边栏 | `docs/.vitepress/config.mts` 的 `themeConfig.nav` / `sidebar` |
| 主题色 | `docs/.vitepress/theme/custom.css` 里的 `--vp-c-brand-*`（当前是浅蓝色系） |
| GitHub 链接 | `docs/.vitepress/config.mts` 的 `socialLinks` |
| 个人介绍 | `docs/about.md` |
| 网站图标 | `docs/public/favicon.svg`、`docs/public/logo.svg` |

## 配色说明

当前是**浅蓝色系**，分两套值：

| | 浅色模式 | 深色模式 |
| --- | --- | --- |
| 主色 `--vp-c-brand-1` | `#0284c7`（天蓝） | `#7dd3fc`（亮浅蓝） |
| 强调 `--vp-c-brand-soft` | 淡蓝底 | 淡蓝底 |

浅色模式没有直接用最淡的 `#38bdf8`，因为它在白底上对比度不足，链接和按钮文字会偏浅。
如果你就是想要更淡的感觉，把 `--vp-c-brand-1` 改成 `#0ea5e9` 即可（会牺牲一点可读性）。

换配色只需要改 `custom.css` 里这一组变量，`config.mts` 里的 `theme-color`、
`docs/public/favicon.svg` 和 `logo.svg` 的填充色也一并跟着主题走。

## 常见问题

**构建报 `[vitepress] spawn git ENOENT`**
本机没装 git。项目已用 `lastUpdated: hasGit()` 自动兜底，正常情况下不会出现；
如果出现，确认 `docs/.vitepress/git.mjs` 还在。

**dev 服务器突然退出，日志里是 `EBUSY: resource busy or locked, watch ...tmpdir`**
编辑器保存文件时先写临时文件再改名，Vite 的文件监听抓到了这个瞬间文件。
重新 `npm run dev` 即可；频繁出现可以改用 VS Code 直接保存（不要用"原子写入"类插件）。

**页面样式正常但所有文章列表是空的**
检查文章开头的 frontmatter 是否有 `date` 字段——没有 `date` 的页面不会被当成文章。

**部署后样式全丢 / 404**
`base` 配错了。项目型仓库必须是 `/仓库名/`，workflow 已自动注入；
仓库名如果是 `用户名.github.io`，把 workflow 里的 `BASE_PATH` 删掉或改成 `/`。
