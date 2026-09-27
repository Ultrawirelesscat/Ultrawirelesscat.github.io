import { SECTIONS, scanPosts, scanTags } from './posts.scan.mjs'

/**
 * 侧边栏自动生成。
 *
 * 以前每写一篇文章都要回 config.mts 手动加一行，忘了就会出现
 * 「文章能打开、但侧边栏里找不到」。现在直接扫 docs/blog 下面的 Markdown，
 * 按 frontmatter 的 date 倒序排好，config 里只要写 sidebar: buildSidebar()。
 *
 * 栏目在 posts.scan.mjs 的 SECTIONS 里定义，新增栏目在那里加一行即可。
 */
export function buildSidebar() {
  const posts = scanPosts()

  const sidebar = {
    // '/blog/' 是兜底：/blog/tech/ 之类更长前缀会优先匹配
    '/blog/': [
      {
        text: '全部文章',
        items: SECTIONS.map(({ prefix, text }) => ({ text, link: prefix }))
      }
    ],
    '/tags/': [
      {
        text: '标签',
        items: [
          { text: '全部标签', link: '/tags/' },
          ...scanTags().map((tag) => ({ text: `#${tag}`, link: `/tags/${tag}` }))
        ]
      }
    ]
  }

  for (const section of SECTIONS) {
    const items = posts
      .filter((post) => post.link.startsWith(section.prefix))
      .map(({ text, link }) => ({ text, link }))

    sidebar[section.prefix] = [
      {
        text: section.text,
        items: [{ text: '全部文章', link: section.prefix }, ...items]
      }
    ]
  }

  return sidebar
}
