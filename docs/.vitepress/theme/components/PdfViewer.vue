<script setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps({
  /** PDF 路径，放在 docs/public 下，例如 /pdfs/aaa.pdf */
  src: { type: String, required: true },
  /** 顶部栏显示的标题，不填就只显示文件名 */
  title: { type: String, default: '' },
  /** 预览区高度，任意 CSS 长度，默认占视口 80% */
  height: { type: String, default: '80vh' },
  /** 是否显示顶部工具栏（标题 / 新窗口打开 / 下载） */
  toolbar: { type: Boolean, default: true }
})

// withBase 会把部署时的 base 前缀加上，保证子路径部署也不出错
const fileUrl = computed(() => withBase(props.src))

// 从路径里取出文件名，没给 title 时用它
const fileName = computed(() => props.src.split('/').pop() || props.src)

const displayTitle = computed(() => props.title || fileName.value)

/*
 * 加 #view=FitH 让 PDF 打开时自动适应宽度；
 * 不同浏览器对 hash 参数支持不一，但不支持时只是忽略，不影响显示。
 */
const embedUrl = computed(() => `${fileUrl.value}#view=FitH`)
</script>

<template>
  <div class="pdf-viewer">
    <div v-if="toolbar" class="pdf-viewer__bar">
      <span class="pdf-viewer__icon" aria-hidden="true">📄</span>
      <span class="pdf-viewer__title">{{ displayTitle }}</span>
      <span class="pdf-viewer__actions">
        <a :href="fileUrl" target="_blank" rel="noreferrer">新窗口打开</a>
        <a :href="fileUrl" :download="fileName">下载</a>
      </span>
    </div>

    <div class="pdf-viewer__frame" :style="{ height }">
      <iframe :src="embedUrl" :title="displayTitle" loading="lazy" />
    </div>

    <p class="pdf-viewer__tip">
      看不到内容？
      <a :href="fileUrl" target="_blank" rel="noreferrer">点这里在新窗口打开</a>
      或
      <a :href="fileUrl" :download="fileName">下载到本地</a>
      查看。手机浏览器可能不支持内嵌预览。
    </p>
  </div>
</template>

<style scoped>
.pdf-viewer {
  margin: 24px 0;
  border: 1px solid var(--card-border, var(--vp-c-divider));
  border-radius: 14px;
  overflow: hidden;
  background: var(--card-surface, var(--vp-c-bg-soft));
  box-shadow: var(--card-shadow, 0 8px 24px -12px rgba(96, 150, 96, 0.28));
}

.pdf-viewer__bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--grad-brand-soft, rgba(116, 198, 157, 0.14));
  font-size: 14px;
}

.pdf-viewer__icon {
  font-size: 16px;
}

.pdf-viewer__title {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.pdf-viewer__actions {
  flex: none;
  display: flex;
  gap: 12px;
  font-size: 13px;
}

.pdf-viewer__actions a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.pdf-viewer__actions a:hover {
  text-decoration: underline;
}

.pdf-viewer__frame {
  position: relative;
  width: 100%;
  background: var(--vp-c-bg-alt);
}

.pdf-viewer__frame iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}

.pdf-viewer__tip {
  margin: 0;
  padding: 10px 14px;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.pdf-viewer__tip a {
  color: var(--vp-c-brand-1);
}

@media (max-width: 640px) {
  .pdf-viewer__bar {
    flex-wrap: wrap;
  }

  .pdf-viewer__title {
    width: 100%;
  }
}
</style>
