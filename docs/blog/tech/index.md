---
title: 编程笔记
---

# 编程笔记

技术相关的学习记录、踩坑总结与源码阅读。

<script setup>
import { data as posts } from '../../.vitepress/posts.data.mjs'

const techPosts = posts.filter((p) => p.category === '编程笔记')
</script>

<PostList :posts="techPosts" :show-category="false" />
