import { defineConfig } from 'vitepress'
import { hasGit } from './git.mjs'

/**
 * 部署到 GitHub Pages 时，base 取决于仓库类型：
 *  - 用户主页仓库 https://github.com/用户名/用户名.github.io
 *      → 站点在根路径，base 用 '/'
 *  - 项目型仓库 https://github.com/用户名/仓库名
 *      → 站点在子路径，base 必须是 '/仓库名/'
 *
 * 优先读环境变量 BASE_PATH（GitHub Actions 会注入）；
 * 本地开发默认 '/'，所以本地预览不会出现路径问题。
 *
 * 本项目当前部署到 Ultrawirelesscat.github.io（用户主页），因此用 '/'。
 */
const base = process.env.BASE_PATH || '/'

export default defineConfig({
  base,
  lang: 'zh-CN',
  title: 'Ultrawirelesscat的小站',
  description: '一名学生的笔记与生活随笔',

  // 文章放在 docs/blog 下，用干净的链接
  cleanUrls: true,
  /*
   * _drafts/ 里的东西完全不参与构建：草稿、模板都放这里。
   * 效果是「本地能看到文件，但不会被发布、不会被搜索索引、网址 404」。
   * 想发布时把文件移出 _drafts/ 即可。
   */
  srcExclude: ['_drafts/**'],
  // 需要 git 才能显示"最后更新于"；本机没装 git 时自动关闭，避免构建报错
  lastUpdated: hasGit(),
  ignoreDeadLinks: true,

  head: [
    ['link', { rel: 'icon', href: `${base}favicon.svg` }],
    ['meta', { name: 'theme-color', content: '#7cc4e8' }]  ],

  markdown: {
    lineNumbers: true,
    theme: { light: 'github-light', dark: 'github-dark' }
  },

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Ultrawirelesscat的小站',

    nav: [
      { text: '首页', link: '/' },
      { text: '笔记', link: '/blog/tech/', activeMatch: '/blog/tech/' },
      { text: '生活随笔', link: '/blog/life/', activeMatch: '/blog/life/' },
      { text: '归档', link: '/archive' },
      { text: '关于', link: '/about' }
    ],

    sidebar: {
      '/blog/tech/': [
        {
          text: '笔记',
          items: [
            { text: '全部文章', link: '/blog/tech/' },
            { text: '20260923物理', link: '/blog/tech/20260923物理' },
            { text: '20260922debug笔记', link: '/blog/tech/20260922debug笔记' },
            { text: '20260921数学', link: '/blog/tech/20260921数学' },
            { text: '20260920数学', link: '/blog/tech/20260920数学' },
            { text: 'PDF 预览演示', link: '/blog/tech/pdf-demo' },
            { text: 'whk', link: '/blog/tech/whk' }
          ]
        }
      ],
      '/blog/life/': [
        {
          text: '生活随笔',
          items: [
            { text: '全部文章', link: '/blog/life/' },
            { text: '我说最慢的快递就是寄宿高中生的快递了', link: '/blog/life/package' },
            { text: '感动哭了', link: '/blog/life/moved-to-tears' },
            { text: '十七岁啦！', link: '/blog/life/17birthday' }
          ]
        }
      ],
      '/blog/': [
        {
          text: '全部文章',
          items: [
            { text: '笔记', link: '/blog/tech/' },
            { text: '生活随笔', link: '/blog/life/' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Ultrawirelesscat' }
    ],

    outline: { level: [2, 3], label: '本页目录' },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },

    docFooter: { prev: '上一篇', next: '下一篇' },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: { dateStyle: 'short', timeStyle: 'short' }
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    footer: {
      message: '用 VitePress 构建 · 记录学习与生活',
      copyright: 'Copyright © 2025-present'
    }
  }
})
