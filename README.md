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

## 环境情况

- **Node 24 / npm 11**：可用
- **git 2.55.0**：已安装，装在 `C:\Program Files\Git\cmd`
  - 已写入系统 PATH，**装完后需要重开终端**才能全局生效
- **代理**：本机 `127.0.0.1:7890` 处有代理在运行。访问 github.com 必须走它，
  已在本仓库配置（只作用于 github.com，不影响国内源）：
  ```powershell
  git config http.https://github.com.proxy http://127.0.0.1:7890
  ```
- `npm install` 建议加 `--ignore-scripts`：本项目没有必须执行的安装脚本，跳过它可以避开部分权限报错


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

### 1. 仓库

<https://github.com/Ultrawirelesscat/Ultrawirelesscat.github.io>

这是**用户主页仓库**（仓库名 = `用户名.github.io`），所以站点部署在根路径，
线上地址就是：

```text
https://ultrawirelesscat.github.io/
```

### 2. 打开 Pages（只需做一次）

仓库页面 → **Settings → Pages → Build and deployment → Source** 选择
**GitHub Actions**。

之后每次 `git push` 到 `main`，`.github/workflows/deploy.yml` 会自动构建并发布，
无需任何手动操作。构建进度可以在仓库的 **Actions** 标签页看。

### 3. 关于 base 路径（重要）

`base` 决定站点资源的根路径，配错会导致线上样式全丢：

| 仓库类型 | base |
| --- | --- |
| `用户名.github.io`（用户主页，本项目） | `/` |
| `用户名/仓库名`（项目型） | `/仓库名/` |

本项目的 `BASE_PATH` 在 workflow 里写死为 `/`；`config.mts` 默认也是 `/`，
所以本地开发和线上表现一致。换成项目型仓库时改 workflow 里那一行即可。

### 4. 推送流程（日常）

```powershell
cd D:\agent-test\my-blog
git add .
git commit -m "post: 新文章标题"
git push
```

## 换成你自己的信息

站点当前信息：**Ultrawirelesscat的小站**（作者：Ultrawirelesscat，学生）

| 要改的东西 | 位置 |
| --- | --- |
| 站点标题、描述 | `docs/.vitepress/config.mts` 里的 `title` / `description`（`themeConfig.siteTitle` 要同步改） |
| 首页大标题 | `docs/index.md` 的 `hero.name` |
| 导航、侧边栏 | `docs/.vitepress/config.mts` 的 `themeConfig.nav` / `sidebar` |
| 主题色 | `docs/.vitepress/theme/custom.css` 里的 `--vp-c-brand-*`（当前是浅蓝色系） |
| GitHub 链接 | `docs/.vitepress/config.mts` 的 `socialLinks` |
| 个人介绍 | `docs/about.md` |
| 网站图标 | `docs/public/favicon.svg`、`docs/public/logo.svg` |

## 配色说明

当前是**水彩田野 · 治愈系**配色，取自 `docs/public/field.jpg` 那张草地插画。

| 变量 | 用途 | 浅色模式 | 深色模式 |
| --- | --- | --- | --- |
| `--vp-c-brand-1` | 链接、按钮（天空蓝） | `#4aa3dd` | `#9ed8f5` |
| `--c-line` | 所有横线装饰（导航栏、页脚、标题竖条、卡片顶边） | `#6fae6f` 草绿 | `#8fd694` |
| `--c-violet` | 分类标签「编程笔记」 | `#7fc97f` | `#8fd694` |
| `--c-pink` | 分类标签「生活随笔」 | `#f0c987` 暖奶油 | `#f2d09a` |
| `--vp-c-bg` | 页面底色（奶油白） | `#f7faf5` | `#101a14` 深墨绿 |

**首页背景**：`field.jpg` 由 `.VPHero` 铺成整条全宽 banner（浅色模式在上方压一层
0.76~0.9 的白蒙层形成文字区，中下部露出草地细节）；文章页只在 `body` 上留一层
很淡的透出，保证长文可读。

**Hero 文字**：三个层级全部用实色深墨绿（`#1f3d2b` / `#2e5138` / `#4a6b51`），
靠**字重和明度**区分，不用渐变也不用白色光晕——白色光晕在浅色水彩画上只会让
边缘发灰。改这里要连带检查 `--vp-home-hero-name-color` 别被设成 `transparent`
（那是做渐变文字时才需要的，留着会让站名直接消失）。

**换配色要注意**：`docs/public/favicon.svg` 和 `logo.svg` 里的填充色是**硬编码**的，
改主题色时容易漏掉，浏览器标签页和导航栏左上角会留下旧颜色。`config.mts` 里的
`theme-color` 也要一起改。

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

## 写文章的模板与草稿

模板文件在 `docs/_drafts/_模板.md`，里面每个字段都带注释说明。

**用法**：

1. 复制 `docs/_drafts/_模板.md` 到 `docs/blog/life/` 或 `docs/blog/tech/`
2. 文件名改成英文小写，例如 `my-first-post.md`
3. 改 `title` / `date` / `category` / `tags` / `description`，然后写正文
4. 保存后在浏览器刷新即可看到

**关于 `_drafts/`**：`config.mts` 里配了 `srcExclude: ['_drafts/**']`，
这个文件夹里的内容**完全不参与构建** —— 本地能看到文件，但不会被发布、
不会被站内搜索索引、网址也是 404。所以草稿和模板都可以放心提交到仓库备份。

想把草稿发布出去，把文件从 `_drafts/` 移动到 `docs/blog/life/`（或 `tech/`）即可。

**写文章常踩的三个坑**：

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| 文章不在任何列表里，只有直接输网址才能打开 | 漏写 `date` | frontmatter 里补上 `date: 2026-09-19` |
| 首页/列表没更新 | `.vitepress/cache` 缓存，或 dev 与 build 抢缓存 | 删掉 `docs/.vitepress/cache` 再刷新；构建前先关掉 dev |
| 文章列表里看不到，但站内搜索能搜到 | 用了 `date: false`，它只隐藏列表、不隐藏搜索 | 真要下架就直接删文件，或用 `srcExclude` 排除 |
