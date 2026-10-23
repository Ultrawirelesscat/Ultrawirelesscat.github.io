import { createContentLoader } from 'vitepress'
import { collectTags, isHidden, toPost } from './posts.utils.mjs'

/**
 * 按标签聚合所有已发布文章，供 /tags/ 总览页和每个标签的归档页使用。
 *
 * 隐藏分类（blog/private/）的文章被排除，所以它们的标签不会出现在标签页上。
 *
 * 结果是 [{ tag, count, posts }, ...]，其中 posts 与 posts.data.mjs 里的文章对象同构，
 * 所以标签页可以直接丢给 <PostList :posts="..." /> 渲染。
 *
 * 页面里这样取：
 *   import { data as tags } from '.../tags.data.mjs'
 */
export default createContentLoader('blog/**/*.md', {
  // 摘要分隔符显式指定，避免正文里的 `---` 被误当成摘要边界（见 posts.data.mjs 的说明）
  excerpt: '<!-- more -->',
  transform(raw) {
    return collectTags(
      raw
        .map(toPost)
        .filter((post) => post && !isHidden(post.url))
        .sort((a, b) => b.time - a.time)
    )
  }
})
