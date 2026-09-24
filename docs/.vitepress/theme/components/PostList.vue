<script setup>
import { withBase } from 'vitepress'

defineProps({
  posts: { type: Array, default: () => [] },
  /** 是否显示分类标签 */
  showCategory: { type: Boolean, default: true },
  /**
   * 没有文章时的提示。这是给访客看的，不要写「去 docs/blog 写一篇」这种
   * 面向作者的话。
   */
  emptyText: { type: String, default: '这里还空着，文章正在路上。' }
})
</script>

<template>
  <div class="post-list">
    <p v-if="!posts.length" class="post-list__empty">{{ emptyText }}</p>

    <article
      v-for="post in posts"
      :key="post.url"
      class="post-card"
      :data-category="post.category"
    >
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
  border: 1px solid var(--card-border, var(--vp-c-divider));
  border-radius: 14px;
  padding: 20px 22px;
  /* 蓝底页面上的白色卡片，靠明度差形成层次 */
  background: var(--card-surface, var(--vp-c-bg-soft));
  box-shadow: var(--card-shadow, 0 8px 24px -12px rgba(96, 150, 96, 0.28));
  transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
}

/* 顶部色条：纯色，蓝 → 紫 → 粉 依次轮换 */
.post-card::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 5px;
  background: var(--c-line, #6fae6f);
}

.post-card:nth-child(3n + 1)::before {
  background: var(--c-sky, #4aa3dd);
}

.post-card:nth-child(3n + 2)::before {
  background: var(--c-leaf, #7fc97f);
}

.post-card:nth-child(3n)::before {
  background: var(--c-cream, #f0c987);
}

.post-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-4px);
  box-shadow: var(--card-shadow-hover, 0 18px 40px -18px rgba(96, 150, 96, 0.42));
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

/* 标题前的实心小点 */
.post-card__title a::before {
  content: '';
  display: inline-block;
  width: 7px;
  height: 7px;
  margin-right: 10px;
  border-radius: 50%;
  background: var(--c-line, #6fae6f);
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

/* 分类标签：纯色底。笔记=叶绿，生活随笔=天空蓝，都取自插画配色 */
.post-card__category {
  padding: 2px 10px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 12px;
  color: #ffffff;
  background: var(--c-notes, #4e9d5f);
}

.post-card[data-category='生活随笔'] .post-card__category {
  background: var(--c-life, #3f8fc4);
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
