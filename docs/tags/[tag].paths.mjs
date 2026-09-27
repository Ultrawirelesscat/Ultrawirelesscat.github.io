import { scanTags } from '../.vitepress/posts.scan.mjs'

/**
 * 动态路由 tags/[tag].md 的路径清单。
 *
 * VitePress 1.x 要求动态路由旁边必须有这样一个 [xxx].paths.mjs，
 * 构建时先跑 paths() 拿到所有参数，再据此生成 N 个页面。
 *
 * 这里同步扫文件系统得到标签列表（paths() 阶段还不能用 content loader），
 * 所以新增标签只要写进文章 frontmatter 的 tags 就行，不用改这个文件。
 *
 * 注意：这里用 scanTags()，页面里用 tags.data.mjs，两边都从同一批 frontmatter
 * 取 tags，结果一致；改动标签解析规则时记得两处都看（解析逻辑都在 posts.scan.mjs）。
 */
export default {
  paths() {
    return scanTags().map((tag) => ({ params: { tag } }))
  }
}
