/**
 * 文章相关的纯工具函数（不依赖 VitePress，可以随便 import）。
 */

/**
 * 「隐藏分类」的目录前缀。
 *
 * 放在 docs/blog/private/ 下的文章：
 *   - 网址正常，直接访问能打开，链接可以分享给别人
 *   - 不出现在首页「最近更新」、全部文章、归档页、标签页
 *   - 不进站内搜索索引
 *   - 不进侧边栏（侧边栏只扫 posts.scan.mjs 的 SECTIONS 里登记的栏目）
 *
 * 想公开发布：把文件从 private/ 移到 tech/ 或 life/ 即可。
 */
export const HIDDEN_PREFIX = '/blog/private/'

/** 判断一个文章的 url 是否属于隐藏分类 */
export function isHidden(url) {
  return typeof url === 'string' && url.startsWith(HIDDEN_PREFIX)
}

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

/**
 * frontmatter 里的 tags 可能是数组，也可能被写成单个字符串或逗号分隔的字符串。
 * 统一整理成去空、去重的字符串数组，避免页面上把 "随笔, 记录" 按字符拆开显示。
 */
export function normalizeTags(value) {
  if (!value) return []
  const list = Array.isArray(value) ? value : String(value).split(/[,，]/)
  return [...new Set(list.map((tag) => String(tag).trim()).filter(Boolean))]
}

/**
 * content loader 给出的原始条目 → 页面里使用的文章对象。
 *
 * 没写 date（或明确写成 false）的文章视为未发布；
 * 隐藏分类（blog/private/）下的文章也返回 null。
 * 两者都在这里拦掉，首页／归档／标签页的判断就始终一致。
 */
export function toPost({ url, frontmatter, excerpt }) {
  if (!frontmatter || !frontmatter.date || frontmatter.date === false) return null
  if (isHidden(url)) return null

  return {
    title: frontmatter.title || url,
    url,
    category: frontmatter.category || '随笔',
    date: frontmatter.date,
    tags: normalizeTags(frontmatter.tags),
    description: frontmatter.description || '',
    excerpt: (excerpt || '').replace(/<[^>]+>/g, '').trim(),
    time: toTime(frontmatter.date),
    displayDate: formatTime(frontmatter.date)
  }
}

/**
 * 把文章列表聚合成标签列表，每项形如 { tag, count, posts }。
 *
 * 传入的列表本身已按日期倒序，所以每个标签下的文章也保持倒序；
 * 排序规则：文章多的在前，同样多时按标签名排。
 */
export function collectTags(posts) {
  const map = new Map()

  for (const post of posts) {
    if (!post) continue
    for (const tag of normalizeTags(post.tags)) {
      if (!map.has(tag)) map.set(tag, [])
      map.get(tag).push(post)
    }
  }

  return [...map.entries()]
    .map(([tag, list]) => ({ tag, count: list.length, posts: list }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, 'zh-Hans-CN'))
}
