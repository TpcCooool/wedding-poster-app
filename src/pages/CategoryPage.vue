<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { getCategoryByType } from '@/data/posters'
import PosterThumbnail from '@/components/PosterThumbnail.vue'

const props = defineProps<{
  type: string
}>()

const router = useRouter()
const category = computed(() => getCategoryByType(props.type))

function goToPoster(posterId: string) {
  router.push(`/poster/${props.type}/${posterId}`)
}

function goBack() {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-gray-900 py-8 px-4">
    <div class="max-w-6xl mx-auto">
      <!-- Back Button -->
      <button
        @click="goBack"
        class="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <span>←</span>
        <span>返回首页</span>
      </button>

      <!-- Header -->
      <div class="text-center mb-10" v-if="category">
        <div class="text-6xl mb-4">{{ category.icon }}</div>
        <h1 class="text-4xl font-bold text-white mb-2 font-art">{{ category.name }}</h1>
        <p class="text-gray-400">{{ category.description }}</p>
      </div>

      <!-- Poster Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" v-if="category">
        <div
          v-for="poster in category.posters"
          :key="poster.id"
          @click="goToPoster(poster.id)"
          class="bg-gray-800 rounded-xl overflow-hidden cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl border-2 border-gray-700 hover:border-yellow-400 group"
        >
          <!-- Thumbnail with actual poster preview -->
          <div class="aspect-[794/1123] bg-gray-900 overflow-hidden relative flex items-center justify-center">
            <PosterThumbnail :component="poster.component" :name="poster.name" />
          </div>
          
          <!-- Info -->
          <div class="p-4 bg-gray-800 group-hover:bg-gray-700 transition-colors">
            <h3 class="text-white font-bold text-lg">{{ poster.name }}</h3>
            <p class="text-gray-400 text-sm mt-1">点击预览和下载</p>
          </div>
        </div>
      </div>

      <!-- Not Found -->
      <div v-else class="text-center text-gray-400 py-20">
        <p class="text-2xl">分类不存在</p>
        <button @click="goBack" class="mt-4 text-yellow-400 hover:underline">返回首页</button>
      </div>
    </div>
  </div>
</template>
