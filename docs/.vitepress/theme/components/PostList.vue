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
  position: relative;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 20px 22px;
  background: var(--vp-c-bg-soft);
  background-image: var(--grad-brand-soft, linear-gradient(135deg, rgba(56, 189, 248, 0.12), rgba(45, 212, 191, 0.12)));
  box-shadow: var(--card-shadow, 0 8px 24px -12px rgba(2, 132, 199, 0.28));
  transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
}

/* 顶部渐变色条 */
.post-card::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 4px;
  background: var(--grad-brand, linear-gradient(120deg, #38bdf8, #2dd4bf));
}

.post-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-3px);
  box-shadow: var(--card-shadow-hover, 0 18px 40px -18px rgba(2, 132, 199, 0.42));
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

/* 标题前的渐变小点 */
.post-card__title a::before {
  content: '';
  display: inline-block;
  width: 7px;
  height: 7px;
  margin-right: 10px;
  border-radius: 50%;
  background: var(--grad-brand, linear-gradient(120deg, #38bdf8, #2dd4bf));
  vertical-align: 0.18em;
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
  padding: 1px 9px;
  border-radius: 999px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 500;
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
