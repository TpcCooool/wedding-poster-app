import { ref } from 'vue'

declare global {
  interface Window {
    snapdom: {
      toPng: (element: HTMLElement, options?: any) => Promise<{ src: string }>
    }
  }
}

export function useDownload() {
  const isDownloading = ref(false)
  const error = ref<string | null>(null)

  async function downloadPoster(
    element: HTMLElement,
    filename: string,
    scale: number = 3
  ): Promise<void> {
    isDownloading.value = true
    error.value = null

    try {
      // 等待字体加载
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready
      }
      await new Promise(resolve => setTimeout(resolve, 300))

      if (!window.snapdom) {
        throw new Error('SnapDOM 库未加载')
      }

      // 直接调用 snapdom.toPng，模仿 HTML 里的方式
      const pngImg = await window.snapdom.toPng(element, {
        scale,
        embedFonts: true
      })

      // 创建下载链接
      const link = document.createElement('a')
      link.download = `${filename}.png`
      link.href = pngImg.src
      link.click()
    } catch (e) {
      error.value = '下载失败，请重试'
      console.error('Download failed:', e)
      throw e
    } finally {
      isDownloading.value = false
    }
  }

  return {
    isDownloading,
    error,
    downloadPoster
  }
}
