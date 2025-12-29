<script setup lang="ts">
import { computed, ref, defineAsyncComponent, shallowRef, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getCategoryByType, getPosterById } from '@/data/posters'
import { useDownload } from '@/composables/useDownload'
import { usePosterScale } from '@/composables/usePosterScale'

const props = defineProps<{
  type: string
  id: string
}>()

const router = useRouter()
const posterRef = ref<HTMLElement | null>(null)
const { isDownloading, error, downloadPoster } = useDownload()
const { scale } = usePosterScale()

const category = computed(() => getCategoryByType(props.type))
const poster = computed(() => getPosterById(props.type, props.id))

// 动态组件映射
const posterComponents: Record<string, ReturnType<typeof defineAsyncComponent>> = {
  BigPoster1: defineAsyncComponent(() => import('@/components/posters/dice/BigPoster1.vue')),
  BigPoster2: defineAsyncComponent(() => import('@/components/posters/dice/BigPoster2.vue')),
  BigPoster3: defineAsyncComponent(() => import('@/components/posters/dice/BigPoster3.vue')),
  BigPoster4: defineAsyncComponent(() => import('@/components/posters/dice/BigPoster4.vue')),
  BigPoster5: defineAsyncComponent(() => import('@/components/posters/dice/BigPoster5.vue')),
  BigPoster6: defineAsyncComponent(() => import('@/components/posters/dice/BigPoster6.vue')),
  TexoPoster1: defineAsyncComponent(() => import('@/components/posters/texas/TexoPoster1.vue')),
  TexoPoster2: defineAsyncComponent(() => import('@/components/posters/texas/TexoPoster2.vue')),
  TexoPoster3: defineAsyncComponent(() => import('@/components/posters/texas/TexoPoster3.vue')),
  MajiangPoster1: defineAsyncComponent(() => import('@/components/posters/mahjong/MajiangPoster1.vue')),
  MajiangPoster2: defineAsyncComponent(() => import('@/components/posters/mahjong/MajiangPoster2.vue')),
  MajiangPoster3: defineAsyncComponent(() => import('@/components/posters/mahjong/MajiangPoster3.vue')),
}

const currentComponent = shallowRef<ReturnType<typeof defineAsyncComponent> | null>(null)

watch(() => poster.value, (newPoster) => {
  if (newPoster && posterComponents[newPoster.component]) {
    currentComponent.value = posterComponents[newPoster.component]
  }
}, { immediate: true })

function goBack() {
  router.push(`/category/${props.type}`)
}

async function handleDownload() {
  if (!posterRef.value || !poster.value) return
  
  try {
    await downloadPoster(posterRef.value, poster.value.downloadName)
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-800 flex flex-col items-center py-8 px-4">
    <!-- Control Panel -->
    <div class="fixed top-4 left-4 right-4 z-50 flex justify-between items-center">
      <button
        @click="goBack"
        class="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
      >
        <span>←</span>
        <span>返回列表</span>
      </button>
      
      <button
        @click="handleDownload"
        :disabled="isDownloading"
        class="bg-yellow-400 text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        <span v-if="isDownloading">⏳ 处理中...</span>
        <span v-else>📸 下载海报</span>
      </button>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg">
      {{ error }}
    </div>

    <!-- Poster Preview -->
    <div 
      class="mt-20"
      :style="{ transform: `scale(${scale})`, transformOrigin: 'top center' }"
    >
      <div ref="posterRef" v-if="currentComponent">
        <component :is="currentComponent" />
      </div>
      
      <div v-else class="text-white text-center py-20">
        <p class="text-2xl">海报加载中...</p>
      </div>
    </div>

    <!-- Poster Info -->
    <div class="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-lg text-center" v-if="poster && category">
      <div class="font-bold">{{ category.name }} - {{ poster.name }}</div>
    </div>
  </div>
</template>
