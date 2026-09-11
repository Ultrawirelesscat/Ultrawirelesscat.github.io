---
title: 生活随笔
---

# 生活随笔

读书、旅行和日常的碎碎念。

<script setup>
import { data as posts } from '../../.vitepress/posts.data.mjs'

const lifePosts = posts.filter((p) => p.category === '生活随笔')
</script>

<PostList :posts="lifePosts" :show-category="false" />
