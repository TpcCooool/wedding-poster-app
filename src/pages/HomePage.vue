<script setup lang="ts">
import { categories } from '@/data/posters'
import { useRouter } from 'vue-router'

const router = useRouter()

function goToCategory(type: string) {
  router.push(`/category/${type}`)
}

function goToSeating() {
  router.push('/seating')
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

      <!-- Wedding Seating Card -->
      <div class="mt-12 pt-12 border-t border-gray-700">
        <h2 class="text-3xl font-bold text-white mb-6 text-center">其他工具</h2>
        <div
          @click="goToSeating"
          class="bg-gradient-to-r from-pink-600 to-red-600 rounded-2xl p-8 cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl border-2 border-transparent hover:border-yellow-400"
        >
          <div class="text-6xl mb-4 text-center">💒</div>
          <h2 class="text-2xl font-bold text-white text-center mb-2">婚礼座位安排</h2>
          <p class="text-gray-100 text-center text-sm">Apple 风格的婚礼座位规划工具</p>
          <div class="mt-4 text-center">
            <span class="bg-white text-red-600 px-4 py-2 rounded-full text-sm font-bold">
              进入工具
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
