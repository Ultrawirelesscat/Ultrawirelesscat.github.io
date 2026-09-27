import { createContentLoader } from 'vitepress'
import { toPost } from './posts.utils.mjs'

/**
 * 扫描 docs/blog 下所有文章，提取 frontmatter，
 * 供首页、列表页、归档页调用（自动按日期倒序）。
 *
 * 注意：VitePress 会把本文件默认导出的 loader 结果暴露成名为 `posts` 的具名导出，
 * 所以页面里写 `import { data as posts } from '.../posts.data.mjs'` 即可；
 * 不要在本文里再 `export { posts }`，那会引用到未声明的变量。
 *
 * 单篇文章 → 文章对象的转换放在 posts.utils.mjs 的 toPost()，
 * 标签页（tags.data.mjs）也复用它，保证各处字段完全一致。
 */
export default createContentLoader('blog/**/*.md', {
  excerpt: true,
  transform(raw) {
    return raw
      .map(toPost)
      .filter(Boolean)
      .sort((a, b) => b.time - a.time)
  }
})
