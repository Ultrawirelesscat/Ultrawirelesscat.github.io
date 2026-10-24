---
layout: home

hero:
  name: Ultrawirelesscat的小站
  text: 竞赛、文化课、随笔、听歌与小说
  tagline: 把学到的东西写下来，才真正属于自己
  actions:
    - theme: brand
      text: 开始阅读
      link: /blog/
    - theme: alt
      text: 关于我
      link: /about

features:
  - icon: 🏆
    title: 竞赛
    details: 竞赛复盘、题解与算法专题笔记。
    link: /blog/contest/
    linkText: 看看竞赛
  - icon: 📘
    title: 文化课
    details: 语文、数学、英语、物理……文化课上的碎片笔记和吐槽。
    link: /blog/whk/
    linkText: 看看文化课
  - icon: 🌱
    title: 生活随笔
    details: 读书、旅行、日常的一些碎碎念，写给未来的自己看。
    link: /blog/life/
    linkText: 看看随笔
  - icon: 🎧
    title: 听歌
    details: 歌单、循环过的曲子，以及那些听着听着就走神的时刻。
    link: /blog/listening/
    linkText: 去听歌
  - icon: 📖
    title: 小说
    details: 读过的故事、想写的桥段，和那些看完之后缓不过来的结尾。
    link: /blog/novel/
    linkText: 看小说
---

<script setup>
import { data as posts } from './.vitepress/posts.data.mjs'
</script>

<!-- 一篇文章都没有时，整块「最近更新」不显示，避免访客看到空标题 -->
<template v-if="posts.length">

## 最近更新

<PostList :posts="posts.slice(0, 5)" />

[查看全部文章 →](/blog/) · [按年份浏览归档 →](/archive)

</template>
