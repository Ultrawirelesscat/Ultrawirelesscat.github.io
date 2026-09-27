---
title: 生活随笔
---

# 生活随笔

读书、旅行和日常的碎碎念。

<script setup>
import { data as posts } from '../../.vitepress/posts.data.mjs'

// 按目录路径筛选，而不是按 frontmatter 的 category。
// 原因：category 是作者手写的，漏写就会默认成「随笔」，
// 文章会莫名其妙从栏目页消失（这个问题踩过两次）。
// 路径由文件位置决定，不会漏。
const lifePosts = posts.filter((p) => p.url.startsWith('/blog/life/'))
</script>

<PostList :posts="lifePosts" :show-category="false" />
