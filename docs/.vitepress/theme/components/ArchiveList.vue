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
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.archive__year h2 {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 20px;
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
  padding: 6px 0;
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

.archive__year a:hover {
  color: var(--vp-c-brand-1);
}
</style>
