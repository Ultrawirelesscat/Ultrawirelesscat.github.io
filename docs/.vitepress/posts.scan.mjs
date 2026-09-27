import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { normalizeTags, toTime } from './posts.utils.mjs'

/**
 * 用 node 的 fs 直接扫描 docs/blog 下的文章。
 *
 * 为什么不用 posts.data.mjs 那套 createContentLoader：
 * 动态路由的 paths() 在「配置解析阶段」就要跑，那时 VitePress 的 content loader
 * 还没初始化（会报 content loader invoked without an active vitepress process），
 * 所以侧边栏和标签路由都改用这里的同步扫描。
 *
 * 判定「已发布」的规则和 posts.data.mjs 保持一致：必须有 date。
 */

const docsDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

/** 栏目定义：新增栏目只要在这里加一行 */
export const SECTIONS = [
  { dir: 'blog/tech', prefix: '/blog/tech/', text: '笔记' },
  { dir: 'blog/life', prefix: '/blog/life/', text: '生活随笔' }
]

/** 去掉包裹值的成对引号 */
function stripQuotes(value) {
  if (value.length >= 2) {
    const first = value[0]
    const last = value[value.length - 1]
    if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
      return value.slice(1, -1)
    }
  }
  return value
}

/**
 * 只解析需要的几个字段（title / date / tags / category / description）。
 * frontmatter 都是简单的 `key: value` 和行内数组，不值得为此引入 YAML 依赖。
 */
export function parseFrontmatter(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text)
  if (!match) return {}

  const data = {}
  for (const line of match[1].split(/\r?\n/)) {
    const kv = /^([A-Za-z_][\w-]*)\s*:\s*(.*)$/.exec(line)
    if (!kv) continue

    const raw = kv[2].trim()
    data[kv[1]] =
      raw.startsWith('[') && raw.endsWith(']')
        ? raw
            .slice(1, -1)
            .split(/[,，]/)
            .map((item) => stripQuotes(item.trim()))
            .filter(Boolean)
        : stripQuotes(raw)
  }
  return data
}

/** 读取一个栏目目录下的所有文章（不含 index.md），按日期倒序 */
function readSection(section) {
  const absDir = path.join(docsDir, section.dir)
  if (!fs.existsSync(absDir)) return []

  return fs
    .readdirSync(absDir)
    .filter((file) => file.endsWith('.md') && file !== 'index.md')
    .map((file) => {
      const slug = file.replace(/\.md$/, '')
      const data = parseFrontmatter(fs.readFileSync(path.join(absDir, file), 'utf8'))

      // 没写 date 的文章不算「已发布」
      if (!data.date) return null

      return {
        title: data.title || slug,
        link: `${section.prefix}${slug}`,
        text: data.title || slug, // 侧边栏用
        category: data.category || section.text,
        description: data.description || '',
        time: toTime(data.date),
        date: data.date,
        tags: normalizeTags(data.tags)
      }
    })
    .filter(Boolean)
    .sort((a, b) => b.time - a.time)
}

/** 所有栏目下的已发布文章，按日期倒序 */
export function scanPosts() {
  return SECTIONS.flatMap(readSection).sort((a, b) => b.time - a.time)
}

/** 所有文章用过的标签，去重后按名字排序 */
export function scanTags() {
  const names = scanPosts().flatMap((post) => post.tags)
  return [...new Set(names)].sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'))
}
