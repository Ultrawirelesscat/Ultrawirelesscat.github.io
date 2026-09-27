import { createContentLoader } from 'vitepress'
import { collectTags, toPost } from './posts.utils.mjs'

/**
 * 按标签聚合所有已发布文章，供 /tags/ 总览页和每个标签的归档页使用。
 *
 * 结果是 [{ tag, count, posts }, ...]，其中 posts 与 posts.data.mjs 里的文章对象同构，
 * 所以标签页可以直接丢给 <PostList :posts="..." /> 渲染。
 *
 * 页面里这样取：
 *   import { data as tags } from '.../tags.data.mjs'
 */
export default createContentLoader('blog/**/*.md', {
  excerpt: true,
  transform(raw) {
    return collectTags(
      raw
        .map(toPost)
        .filter(Boolean)
        .sort((a, b) => b.time - a.time)
    )
  }
})
