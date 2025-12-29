<script setup lang="ts">
import { defineAsyncComponent, shallowRef, watch } from 'vue'

interface Props {
  component: string
  name: string
}

const props = defineProps<Props>()

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

watch(() => props.component, (newComponent) => {
  if (newComponent && posterComponents[newComponent]) {
    currentComponent.value = posterComponents[newComponent]
  }
}, { immediate: true })
</script>

<template>
  <div class="w-full h-full bg-gray-950 overflow-hidden flex items-center justify-center relative">
    <!-- 缩略图容器 - 使用 viewport 缩放 -->
    <div class="thumbnail-wrapper">
      <component v-if="currentComponent" :is="currentComponent" />
      <div v-else class="w-full h-full flex items-center justify-center text-gray-500">
        加载中...
      </div>
    </div>
  </div>
</template>

<style scoped>
.thumbnail-wrapper {
  width: 794px;
  height: 1123px;
  transform: scale(0.43);
  /* transform-origin: top center; */
  pointer-events: none;
}
</style>
