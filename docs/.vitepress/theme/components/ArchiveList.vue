<script setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps({
  posts: { type: Array, default: () => [] }
})

const groups = computed(() => {
  const map = new Map()
  for (const post of props.posts) {
    const year = new Date(post.time).getFullYear()
    if (!map.has(year)) map.set(year, [])
    map.get(year).push(post)
  }
  return [...map.entries()].sort((a, b) => b[0] - a[0])
})

const count = computed(() => props.posts.length)
</script>

<template>
  <div class="archive">
    <p class="archive__total">共 {{ count }} 篇文章</p>

    <section v-for="[year, list] in groups" :key="year" class="archive__year">
      <h2 :id="`year-${year}`">{{ year }} 年</h2>
      <ul>
        <li v-for="post in list" :key="post.url">
          <time>{{ post.displayDate }}</time>
          <a :href="withBase(post.url)">{{ post.title }}</a>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.archive__total {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 999px;
  background: var(--grad-brand-soft, rgba(56, 189, 248, 0.14));
  color: var(--vp-c-brand-1);
  font-size: 14px;
  font-weight: 500;
}

.archive__year h2 {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 20px;
}

/* 年份前的渐变小竖条 */
.archive__year h2::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 0.82em;
  margin-right: 10px;
  border-radius: 3px;
  background: var(--c-line, #8b5cf6);
  vertical-align: -0.06em;
}

.archive__year ul {
  list-style: none;
  padding: 0;
  margin: 12px 0 0;
}

.archive__year li {
  display: flex;
  gap: 16px;
  align-items: baseline;
  padding: 8px 12px;
  border-radius: 12px;
  background: var(--card-surface, transparent);
  box-shadow: 0 1px 2px rgba(139, 92, 246, 0.08);
  transition: background-color 0.2s, transform 0.2s, box-shadow 0.2s;
}

.archive__year li:hover {
  background: var(--grad-brand-soft, rgba(168, 85, 247, 0.12));
  transform: translateX(3px);
  box-shadow: var(--card-shadow, 0 8px 20px -12px rgba(139, 92, 246, 0.32));
}

.archive__year time {
  flex: none;
  font-size: 13px;
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
}

.archive__year a {
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.archive__year a::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-right: 10px;
  border-radius: 50%;
  background: var(--c-line, #8b5cf6);
  vertical-align: 0.15em;
}

.archive__year a:hover {
  color: var(--vp-c-brand-1);
}
</style>
