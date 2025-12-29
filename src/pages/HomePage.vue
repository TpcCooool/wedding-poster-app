<script setup lang="ts">
import { categories } from '@/data/posters'
import { useRouter } from 'vue-router'

const router = useRouter()

function goToCategory(type: string) {
  router.push(`/category/${type}`)
}
</script>

<template>
  <div class="min-h-screen bg-gray-900 py-12 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold text-white mb-4 font-art">🎉 游戏规则海报</h1>
        <p class="text-gray-400 text-lg">选择游戏分类，查看和下载高清海报</p>
      </div>

      <!-- Category Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="category in categories"
          :key="category.type"
          @click="goToCategory(category.type)"
          class="bg-gray-800 rounded-2xl p-6 cursor-pointer transform transition-all hover:scale-105 hover:bg-gray-700 border-2 border-transparent hover:border-yellow-400"
        >
          <div class="text-6xl mb-4 text-center">{{ category.icon }}</div>
          <h2 class="text-2xl font-bold text-white text-center mb-2">{{ category.name }}</h2>
          <p class="text-gray-400 text-center text-sm">{{ category.description }}</p>
          <div class="mt-4 text-center">
            <span class="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
              {{ category.posters.length }} 款海报
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
