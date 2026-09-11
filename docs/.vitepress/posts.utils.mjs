/**
 * 文章相关的纯工具函数（不依赖 VitePress，可以随便 import）。
 */

function pad(n) {
  return String(n).padStart(2, '0')
}

/** frontmatter 日期 → 时间戳 */
export function toTime(value) {
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? 0 : d.getTime()
}

/** frontmatter 日期 → '2025-01-31' */
export function formatTime(value) {
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return String(value ?? '')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

/** 按年份分组，用于归档页 */
export function groupByYear(list) {
  const map = new Map()
  for (const post of list) {
    const year = new Date(post.time).getFullYear()
    if (!map.has(year)) map.set(year, [])
    map.get(year).push(post)
  }
  return [...map.entries()].sort((a, b) => b[0] - a[0])
}
