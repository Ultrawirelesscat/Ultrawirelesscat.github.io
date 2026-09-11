<script setup>
import { withBase } from 'vitepress'

defineProps({
  posts: { type: Array, default: () => [] },
  /** 是否显示分类标签 */
  showCategory: { type: Boolean, default: true }
})
</script>

<template>
  <div class="post-list">
    <p v-if="!posts.length" class="post-list__empty">还没有文章，去 docs/blog 下写一篇吧。</p>

    <article v-for="post in posts" :key="post.url" class="post-card">
      <h3 class="post-card__title">
        <a :href="withBase(post.url)">{{ post.title }}</a>
      </h3>

      <p class="post-card__meta">
        <time>{{ post.displayDate }}</time>
        <span v-if="showCategory && post.category" class="post-card__category">
          {{ post.category }}
        </span>
        <span v-for="tag in post.tags" :key="tag" class="post-card__tag">#{{ tag }}</span>
      </p>

      <p class="post-card__excerpt">{{ post.description || post.excerpt }}</p>
    </article>
  </div>
</template>

<style scoped>
.post-list {
  display: grid;
  gap: 16px;
  margin: 24px 0;
}

.post-list__empty {
  color: var(--vp-c-text-2);
}

.post-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 18px 20px;
  background: var(--vp-c-bg-soft);
  transition: border-color 0.25s, transform 0.25s;
}

.post-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}

.post-card__title {
  margin: 0 0 8px;
  font-size: 18px;
  line-height: 1.4;
  border: none;
  padding: 0;
}

.post-card__title a {
  color: var(--vp-c-text-1);
  text-decoration: none;
  font-weight: 600;
}

.post-card__title a:hover {
  color: var(--vp-c-brand-1);
}

.post-card__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin: 0 0 8px;
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.post-card__category {
  padding: 1px 8px;
  border-radius: 999px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.post-card__tag {
  color: var(--vp-c-text-3);
}

.post-card__excerpt {
  margin: 0;
  font-size: 14.5px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}
</style>
