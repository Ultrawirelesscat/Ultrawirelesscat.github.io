import { createContentLoader } from 'vitepress'
import { formatTime, toTime } from './posts.utils.mjs'

/**
 * 扫描 docs/blog 下所有文章，提取 frontmatter，
 * 供首页、列表页、归档页调用（自动按日期倒序）。
 *
 * 注意：VitePress 会把本文件默认导出的 loader 结果暴露成名为 `posts` 的具名导出，
 * 所以页面里写 `import { data as posts } from '.../posts.data.mjs'` 即可；
 * 不要在本文里再 `export { posts }`，那会引用到未声明的变量。
 */
export default createContentLoader('blog/**/*.md', {
  excerpt: true,
  transform(raw) {
    return raw
      .filter(({ frontmatter }) => !!frontmatter.date && frontmatter.date !== false)
      .map(({ url, frontmatter, excerpt }) => ({
        title: frontmatter.title || url,
        url,
        category: frontmatter.category || '随笔',
        date: frontmatter.date,
        tags: frontmatter.tags || [],
        description: frontmatter.description || '',
        excerpt: (excerpt || '').replace(/<[^>]+>/g, '').trim(),
        time: toTime(frontmatter.date),
        displayDate: formatTime(frontmatter.date)
      }))
      .sort((a, b) => b.time - a.time)
  }
})
