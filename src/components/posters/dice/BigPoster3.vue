<script setup lang="ts">
import { Scale, Crown, Shirt, Mic2 } from 'lucide-vue-next'
</script>

<template>
  <div class="poster-container" style="width: 794px; height: 1123px; box-sizing: border-box; padding: 24px; background-color: #fff; display: flex; flex-direction: column; position: relative; border: 8px solid #000;">
    
    <!-- 背景纹理 -->
    <div class="absolute inset-0 z-0 pointer-events-none" style="background-image: radial-gradient(#000 20%, transparent 20%); background-size: 16px 16px; opacity: 0.1;"></div>

    <!-- Header -->
    <header class="relative z-10 flex flex-col items-center mb-6">
      <div class="w-full flex justify-between items-center mb-4 border-b-4 border-black pb-2">
        <div class="flex gap-1">
          <div class="w-4 h-4 rounded-full bg-red-500 border-2 border-black"></div>
          <div class="w-4 h-4 rounded-full bg-yellow-400 border-2 border-black"></div>
          <div class="w-4 h-4 rounded-full bg-blue-500 border-2 border-black"></div>
        </div>
        <div class="font-black text-xl tracking-widest">LUCKY DICE</div>
        <div class="w-16 h-4 bg-black"></div>
      </div>

      <div class="relative">
        <h1 class="text-[6rem] leading-[0.9] font-black text-black tracking-tighter transform -rotate-2 relative z-10" style="text-shadow: 4px 4px 0 #fff, 8px 8px 0 rgba(0,0,0,0.2);">
          老婆说的<br><span class="text-red-600">都对！</span>
        </h1>
        <div class="absolute -top-4 -right-8 w-24 h-24 bg-yellow-400 rounded-full border-4 border-black -z-10"></div>
        <div class="absolute bottom-2 -left-6 w-full h-8 bg-blue-500 -z-10 transform -skew-x-12 border-2 border-black"></div>
      </div>

      <p class="mt-4 text-xl font-bold bg-black text-white px-6 py-2 transform skew-x-[-12deg] shadow-[6px_6px_0px_0px_#000]">
        <span class="inline-block transform skew-x-[12deg] tracking-[0.2em]">LUCKY DICE · 幸运骰子</span>
      </p>
    </header>

    <!-- 3D 骰子组 -->
    <div class="relative z-10 h-48 flex justify-center items-center gap-8 mb-8">
      <div class="absolute w-64 h-64 border-[12px] border-yellow-400 rounded-full opacity-50 z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      
      <div class="w-24 h-24 bg-blue-500 border-4 border-black rounded-2xl flex items-center justify-center text-4xl transform rotate-[10deg] shadow-[4px_4px_0px_0px_#000]">⚁</div>
      <div class="w-28 h-28 bg-red-500 border-4 border-black rounded-2xl flex items-center justify-center text-5xl transform -rotate-[15deg] shadow-[6px_6px_0px_0px_#000] z-10">⚅</div>
      <div class="w-24 h-24 bg-yellow-400 border-4 border-black rounded-2xl flex items-center justify-center text-4xl transform rotate-[25deg] shadow-[4px_4px_0px_0px_#000]">⚃</div>
    </div>

    <!-- 内容区 -->
    <main class="flex-1 grid grid-cols-12 grid-rows-6 gap-4 relative z-10">
      <!-- 买大/买小 -->
      <div class="col-span-7 row-span-3 bg-blue-500 border-4 border-black shadow-[6px_6px_0px_0px_#000] rounded-xl p-4 flex flex-col justify-between relative overflow-hidden">
        <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-400 rounded-full"></div>
        <div class="flex justify-between items-start">
          <h3 class="text-4xl font-black text-white leading-none">买大<br>买小</h3>
          <span class="bg-white text-black font-bold px-2 py-1 border-2 border-black rounded text-sm">1:1</span>
        </div>
        <div class="text-white font-bold text-lg mt-2 relative z-10">"选中就拿钱<br>简单就是福"</div>
        <Scale class="absolute bottom-2 right-2 text-blue-800 w-12 h-12 opacity-50" />
      </div>

      <!-- 豹子 -->
      <div class="col-span-5 row-span-3 bg-yellow-400 border-4 border-black shadow-[6px_6px_0px_0px_#000] rounded-xl p-4 flex flex-col items-center justify-center text-center relative overflow-hidden">
        <h3 class="text-4xl font-black text-black mb-1">🔥豹子</h3>
        <div class="text-xs font-bold bg-black text-white px-2 py-0.5 mb-2 rounded">三骰相同</div>
        <div class="text-5xl font-black text-red-600 bg-white px-4 py-1 border-2 border-black transform -rotate-3 shadow-[3px_3px_0px_0px_#000]">1:10</div>
      </div>

      <!-- NPC 规则 -->
      <div class="col-span-12 row-span-3 bg-red-500 border-4 border-black shadow-[6px_6px_0px_0px_#000] rounded-xl p-5 flex items-center gap-6 relative">
        <div class="w-32 flex-shrink-0 flex flex-col items-center justify-center border-r-4 border-black pr-4 h-full">
          <div class="w-16 h-16 bg-white border-4 border-black rounded-full flex items-center justify-center mb-2 shadow-[3px_3px_0px_0px_#000]">
            <Crown class="w-8 h-8 text-black" />
          </div>
          <span class="font-black text-white text-xl uppercase">NPC</span>
        </div>

        <div class="flex-1 grid grid-cols-2 gap-4">
          <div class="bg-white border-2 border-black p-2 rounded shadow-[3px_3px_0px_0px_#000]">
            <div class="flex items-center gap-2 mb-1">
              <Shirt class="w-5 h-5 text-red-600" />
              <span class="font-black text-lg">必需装备</span>
            </div>
            <p class="text-sm font-bold text-gray-800 leading-tight">必须佩戴 <span class="text-red-600">大金链子</span> & 哨子</p>
          </div>
          <div class="bg-white border-2 border-black p-2 rounded shadow-[3px_3px_0px_0px_#000]">
            <div class="flex items-center gap-2 mb-1">
              <Mic2 class="w-5 h-5 text-blue-600" />
              <span class="font-black text-lg">轮换机制</span>
            </div>
            <p class="text-sm font-bold text-gray-800 leading-tight">谁嗓门大谁就能当！</p>
          </div>
          <div class="col-span-2 bg-yellow-300 border-2 border-black p-2 rounded shadow-[3px_3px_0px_0px_#000] flex justify-between items-center">
            <div>
              <span class="font-black text-lg mr-2">🧧 喜钱规矩</span>
              <span class="text-xs font-bold">(出现豹子/大赢家)</span>
            </div>
            <div class="font-black text-xl">支付 10 筹码</div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="mt-8 relative z-10">
      <div class="bg-black text-white p-6 border-4 border-black flex flex-col items-center justify-center transform rotate-1 shadow-[6px_6px_0px_0px_#000]">
        <p class="text-2xl font-bold mb-2">" 无论开大开小 "</p>
        <div class="w-16 h-1 bg-yellow-400 mb-2"></div>
        <p class="text-5xl font-black text-yellow-400 font-art tracking-widest">听老婆的准没错</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.poster-container {
  font-family: 'Noto Sans SC', sans-serif;
}
.font-art {
  font-family: 'Ma Shan Zheng', cursive;
}
</style>
