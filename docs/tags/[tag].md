<script setup>
import { computed, unref } from 'vue'
import { useData, withBase } from 'vitepress'
import { data as tags } from '../.vitepress/tags.data.mjs'

// 一个标签一页，由同目录的 [tag].paths.mjs 在构建时枚举出所有标签
const { params } = useData()

// unref 兼容 params 是 ref 还是普通对象
const current = computed(() => {
  const tag = unref(params)?.tag
  return tags.find((item) => item.tag === tag)
})
</script>

<h1>{{ current ? `#${current.tag}` : '标签' }}</h1>

<template v-if="current">
  <p>
    共 {{ current.count }} 篇文章 ·
    <a :href="withBase('/tags/')">返回全部标签</a>
  </p>

  <PostList :posts="current.posts" :show-category="false" empty-text="这个标签下还没有文章。" />
</template>

<p v-else>
  没有找到这个标签，<a :href="withBase('/tags/')">看看全部标签</a>。
</p>
