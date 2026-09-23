import DefaultTheme from 'vitepress/theme'
import PostList from './components/PostList.vue'
import ArchiveList from './components/ArchiveList.vue'
import PdfViewer from './components/PdfViewer.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 全局注册，Markdown 里可直接写 <PostList :posts="posts" />
    app.component('PostList', PostList)
    app.component('ArchiveList', ArchiveList)
    // PDF 预览：<PdfViewer src="/pdfs/xxx.pdf" title="标题" />
    app.component('PdfViewer', PdfViewer)
  }
}
