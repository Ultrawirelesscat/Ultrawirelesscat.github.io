import { createContentLoader } from 'vitepress'
import { isHidden, toPost } from './posts.utils.mjs'

/**
 * 只收集**隐藏分类**（docs/blog/private/）下的文章，按日期倒序。
 *
 * 只给隐藏分类自己的首页（docs/blog/private/index.md）使用。
 * 公开的列表（首页、全部文章、归档、标签）用的是 posts.data.mjs，那边会排除隐藏文章。
 *
 * 页面里这样取：
 *   import { data as posts } from '../../.vitepress/hidden.data.mjs'
 */
export default createContentLoader('blog/**/*.md', {
  excerpt: true,
  transform(raw) {
    return raw
      .map(toPost)
      .filter((post) => post && isHidden(post.url))
      .sort((a, b) => b.time - a.time)
  }
})
