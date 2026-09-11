import { spawnSync } from 'node:child_process'

/**
 * 探测本机是否能用 git。
 *
 * VitePress 的 lastUpdated 需要调用 git 读取每个文件的最后提交时间；
 * 如果机器上没装 git，它不会降级而是直接抛 `spawn git ENOENT` 让构建失败。
 * 所以这里先探测一次，没有 git 就自动关闭 lastUpdated——
 * 这样"没装 git 也能本地跑起来"，装上 git 之后又会自动恢复显示。
 */
let cached

export function hasGit() {
  if (cached !== undefined) return cached
  try {
    const result = spawnSync('git', ['--version'], { stdio: 'ignore' })
    cached = !result.error && result.status === 0
  } catch {
    cached = false
  }
  return cached
}
