import { ref } from 'vue'

// 截图功能暂时禁用
// declare global {
//   interface Window {
//     snapdom: {
//       toPng: (element: HTMLElement, options?: any) => Promise<{ src: string }>
//     }
//   }
// }

export function useDownload() {
  const isDownloading = ref(false)
  const error = ref<string | null>(null)

  async function downloadPoster(
    _element: HTMLElement,
    _filename: string,
    _scale: number = 3
  ): Promise<void> {
    // 截图功能暂时禁用
    error.value = '截图功能暂时不可用'
    console.warn('截图功能已禁用')
    
    // 原实现已注释
    // isDownloading.value = true
    // error.value = null
    // try {
    //   if (document.fonts && document.fonts.ready) {
    //     await document.fonts.ready
    //   }
    //   await new Promise(resolve => setTimeout(resolve, 300))
    //   if (!window.snapdom) {
    //     throw new Error('SnapDOM 库未加载')
    //   }
    //   const pngImg = await window.snapdom.toPng(element, {
    //     scale,
    //     embedFonts: true
    //   })
    //   const link = document.createElement('a')
    //   link.download = `${filename}.png`
    //   link.href = pngImg.src
    //   link.click()
    // } catch (e) {
    //   error.value = '下载失败，请重试'
    //   console.error('Download failed:', e)
    //   throw e
    // } finally {
    //   isDownloading.value = false
    // }
  }

  return {
    isDownloading,
    error,
    downloadPoster
  }
}
