---
title: 隐藏分类
---

# 隐藏分类

这个目录下的文章不会出现在首页、全部文章、归档、标签页和侧边栏，
但可以通过网址直接访问，也可以把链接分享给别人。

<script setup>
import { data as posts } from '../../.vitepress/hidden.data.mjs'
</script>

<PostList :posts="posts" />