---
title: 文化课
---

# 文化课

语文、数学、英语、物理、化学……文化课上的碎片笔记和吐槽。

<script setup>
import { data as posts } from '../../.vitepress/posts.data.mjs'

// 按目录路径筛选，而不是按 frontmatter 的 category。
// 原因：category 是作者手写的，漏写就会默认成「随笔」，
// 文章会莫名其妙从栏目页消失（这个问题踩过两次）。
// 路径由文件位置决定，不会漏。
const whkPosts = posts.filter((p) => p.url.startsWith('/blog/whk/'))
</script>

<PostList :posts="whkPosts" :show-category="false" />
