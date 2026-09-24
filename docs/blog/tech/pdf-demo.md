---
title: PDF 预览演示
date: 2026-09-18
category: 笔记
tags: [PDF, 演示]
description: 演示怎么在文章里嵌入 PDF，看效果就点进来。
---

# PDF 预览演示

下面这块就是嵌进来的 PDF。顶部有「新窗口打开」和「下载」，手机看不了的话用底部链接。

<PdfViewer src="/pdfs/sample.pdf" title="示例文档（可替换成你的 PDF）" height="70vh" />

## 怎么换成你自己的

1. 把 PDF 文件丢进 `docs/public/pdfs/`
2. 文章里写 `<PdfViewer src="/pdfs/你的文件名.pdf" title="标题" />`
3. 其他属性（`height`、`toolbar`）都可以不写

> 这是一个演示页，看完可以删掉。删的时候记得把侧边栏里对应那行也删掉。
