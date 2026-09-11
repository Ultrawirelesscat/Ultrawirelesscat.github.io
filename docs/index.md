---
layout: home

hero:
  name: 我的博客
  text: 编程笔记与生活随笔
  tagline: 把学到的东西写下来，才真正属于自己
  actions:
    - theme: brand
      text: 开始阅读
      link: /blog/
    - theme: alt
      text: 关于我
      link: /about

features:
  - icon: 💻
    title: 编程笔记
    details: 前端、Node、工具链……踩过的坑和想通的道理，都记在这里。
    link: /blog/tech/
    linkText: 查看笔记
  - icon: 🌱
    title: 生活随笔
    details: 读书、旅行、日常的一些碎碎念，写给未来的自己看。
    link: /blog/life/
    linkText: 看看随笔
  - icon: 📚
    title: 全部归档
    details: 按年份浏览所有文章，找什么都不用翻列表。
    link: /archive
    linkText: 前往归档
---

<script setup>
import { data as posts } from './.vitepress/posts.data.mjs'
</script>

## 最近更新

<PostList :posts="posts.slice(0, 5)" />

[查看全部文章 →](/blog/)
