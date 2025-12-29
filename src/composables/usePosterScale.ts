import { ref, onMounted, onUnmounted } from 'vue'

export function usePosterScale(
  originalWidth: number = 794,
  originalHeight: number = 1123,
  margin: number = 40
) {
  const scale = ref(1)

  function calculateScale() {
    const viewportWidth = window.innerWidth - margin
    const viewportHeight = window.innerHeight - margin
    
    const scaleX = viewportWidth / originalWidth
    const scaleY = viewportHeight / originalHeight
    
    scale.value = Math.min(scaleX, scaleY, 1)
  }

  onMounted(() => {
    calculateScale()
    window.addEventListener('resize', calculateScale)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', calculateScale)
  })

  return { scale, calculateScale }
}
