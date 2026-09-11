---
title: 用 VitePress 搭建个人博客
date: 2025-01-20
category: 编程笔记
tags: [VitePress, 博客, 建站]
description: 从零搭建一个能写中文、能搜索、能自动部署到 GitHub Pages 的静态博客。
---

# 用 VitePress 搭建个人博客

VitePress 是 Vue 团队出的静态站点生成器：Markdown 写作、内置搜索、构建快，
非常适合做个人博客和技术笔记站。

## 为什么选它

- **够快**：底层是 Vite，改完文件浏览器毫秒级刷新
- **专注写作**：文章就是 `.md` 文件，不用碰 HTML
- **自带主题**：导航、侧边栏、暗色模式、本地搜索全都内置
- **部署简单**：构建出来就是一堆静态文件，扔哪都能跑

## 目录结构

```text
my-blog/
├─ docs/
│  ├─ .vitepress/
│  │  ├─ config.mts        # 站点配置：标题、导航、侧边栏
│  │  ├─ posts.data.mjs    # 自动收集所有文章
│  │  └─ theme/            # 自定义主题与样式
│  ├─ blog/                # 所有文章都放这里
│  │  ├─ tech/             # 编程笔记
│  │  └─ life/             # 生活随笔
│  ├─ index.md             # 首页
│  └─ archive.md           # 归档页
└─ package.json
```

## 写一篇新文章

在 `docs/blog/tech/` 下新建 `my-post.md`，开头写上 frontmatter：

```md
---
title: 文章标题
date: 2025-01-20
category: 编程笔记
tags: [标签一, 标签二]
description: 一句话摘要，会显示在列表页。
---

正文从这里开始……
```

保存后列表页、归档页、侧边栏都会自动出现这篇文章——因为 `posts.data.mjs`
会扫描 `blog/**/*.md` 并把它们按日期倒序排好。

## 常用命令

```bash
npm run dev      # 本地预览，改文件自动刷新
npm run build    # 构建到 docs/.vitepress/dist
npm run preview  # 本地预览构建产物
```

## 部署到 GitHub Pages

把仓库推到 GitHub 后，在 **Settings → Pages → Build and deployment** 里
把 Source 选成 **GitHub Actions**，之后每次 `git push` 到 `main`
都会自动构建发布。仓库里已经带好了 `.github/workflows/deploy.yml`。

注意一个细节：项目型仓库（`用户名/仓库名`）的访问地址带子路径，
所以 `base` 必须是 `/仓库名/`。workflow 里已经自动处理，本地开发仍然是 `/`。

## 小结

搭博客最难的一步其实是"开始写"。工具选好了，剩下的就是坚持记录。
