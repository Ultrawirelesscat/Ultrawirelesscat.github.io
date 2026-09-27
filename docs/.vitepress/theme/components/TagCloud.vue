<script setup>
import { withBase } from 'vitepress'

defineProps({
  /** [{ tag, count, posts }]，来自 tags.data.mjs */
  tags: { type: Array, default: () => [] },
  emptyText: { type: String, default: '还没有任何标签，在文章的 frontmatter 里写上 tags 就会出现在这里。' }
})
</script>

<template>
  <div class="tag-cloud">
    <p v-if="!tags.length" class="tag-cloud__empty">{{ emptyText }}</p>

    <a
      v-for="item in tags"
      :key="item.tag"
      class="tag-cloud__item"
      :href="withBase(`/tags/${item.tag}`)"
    >
      <span class="tag-cloud__hash">#</span>
      <span class="tag-cloud__name">{{ item.tag }}</span>
      <span class="tag-cloud__count">{{ item.count }}</span>
    </a>
  </div>
</template>

<style scoped>
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 24px 0;
}

.tag-cloud__empty {
  color: var(--vp-c-text-2);
}

.tag-cloud__item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: 1px solid var(--card-border, var(--vp-c-divider));
  border-radius: 999px;
  background: var(--card-surface, var(--vp-c-bg-soft));
  box-shadow: 0 4px 14px -10px rgba(96, 150, 96, 0.4);
  color: var(--vp-c-text-1);
  font-size: 15px;
  text-decoration: none;
  transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s, color 0.25s;
}

.tag-cloud__item:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  transform: translateY(-3px);
  box-shadow: var(--card-shadow-hover, 0 14px 30px -16px rgba(96, 150, 96, 0.45));
}

.tag-cloud__hash {
  color: var(--c-line, #6fae6f);
  font-weight: 600;
}

.tag-cloud__count {
  min-width: 22px;
  padding: 0 7px;
  border-radius: 999px;
  background: var(--grad-brand-soft, rgba(56, 189, 248, 0.16));
  color: var(--vp-c-brand-1);
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  text-align: center;
  line-height: 20px;
}
</style>
