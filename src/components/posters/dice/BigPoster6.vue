<script setup lang="ts">
import { Crown, Shirt, Mic2, Coins, Scale } from 'lucide-vue-next'
</script>

<template>
  <div class="poster-container" style="width: 794px; height: 1123px; box-sizing: border-box; padding: 24px; background-color: #fff; display: flex; flex-direction: column; position: relative; border: 16px solid #881337;">
    
    <!-- 背景纹理 -->
    <div class="absolute inset-0 z-0 pointer-events-none" style="background-image: radial-gradient(#881337 20%, transparent 20%); background-size: 16px 16px; opacity: 0.06;"></div>

    <!-- Header Area -->
    <header class="relative z-10 flex flex-col items-center w-full shrink-0" style="height: 18%;">
      <div class="w-full flex justify-between items-center mb-1 border-b-4 border-[#881337] pb-1">
        <div class="flex gap-2">
          <div class="w-4 h-4 rounded-full bg-red-500 border-2 border-[#881337]"></div>
          <div class="w-4 h-4 rounded-full bg-yellow-400 border-2 border-[#881337]"></div>
          <div class="w-4 h-4 rounded-full bg-blue-500 border-2 border-[#881337]"></div>
        </div>
        <div class="font-black text-xl tracking-widest uppercase text-[#881337]">LUCKY DICE</div>
        <div class="w-16 h-4 bg-[#881337]"></div>
      </div>

      <div class="relative mt-2 flex-1 flex flex-col items-center justify-center">
        <h1 class="text-[6rem] leading-[0.85] font-black text-[#881337] tracking-tighter transform -rotate-2 relative z-10 whitespace-nowrap" style="text-shadow: 4px 4px 0 #fff, 8px 8px 0 rgba(136, 19, 55, 0.15);">
          骰宝<span class="text-red-600 text-[7rem]">老婆最大！</span>
        </h1>
        <div class="absolute -top-4 -right-1 w-24 h-24 bg-yellow-400 rounded-full border-4 border-[#881337] -z-10"></div>
      </div>

      <p class="text-base font-bold bg-[#881337] text-white px-6 py-1 transform translate-4 skew-x-[-12deg] shadow-[6px_6px_0px_0px_#881337]">
        <span class="inline-block transform skew-x-[12deg] tracking-[0.2em] uppercase">WINNER TAKES ALL</span>
      </p>
    </header>

    <!-- Visual Center -->
    <div class="relative z-10 flex justify-center items-center gap-8 shrink-0" style="height: 15%;">
      
      <!-- 骰子1 - 蓝色 6点 -->
      <div class="w-20 h-20 bg-blue-500 border-4 border-[#881337] rounded-xl transform rotate-10 shadow-[4px_4px_0px_0px_#881337] p-2 overflow-hidden">
        <div class="w-full h-full grid grid-cols-2 gap-1 place-items-center">
          <div class="w-4 h-4 bg-white rounded-full"></div>
          <div class="w-4 h-4 bg-white rounded-full"></div>
          <div class="w-4 h-4 bg-white rounded-full"></div>
          <div class="w-4 h-4 bg-white rounded-full"></div>
          <div class="w-4 h-4 bg-white rounded-full"></div>
          <div class="w-4 h-4 bg-white rounded-full"></div>
        </div>
      </div>
      <!-- 骰子2 - 红色 6点 (中间大) -->
      <div class="w-24 h-24 bg-red-500 border-4 border-[#881337] rounded-xl transform -rotate-15 shadow-[5px_5px_0px_0px_#881337] z-10 p-2.5 overflow-hidden">
        <div class="w-full h-full grid grid-cols-2 gap-1 place-items-center">
          <div class="w-5 h-5 bg-white rounded-full"></div>
          <div class="w-5 h-5 bg-white rounded-full"></div>
          <div class="w-5 h-5 bg-white rounded-full"></div>
          <div class="w-5 h-5 bg-white rounded-full"></div>
          <div class="w-5 h-5 bg-white rounded-full"></div>
          <div class="w-5 h-5 bg-white rounded-full"></div>
        </div>
      </div>
      <!-- 骰子3 - 黄色 6点 -->
      <div class="w-20 h-20 bg-yellow-400 border-4 border-[#881337] rounded-xl transform rotate-25 shadow-[4px_4px_0px_0px_#881337] p-2 overflow-hidden">
        <div class="w-full h-full grid grid-cols-2 gap-1 place-items-center">
          <div class="w-4 h-4 bg-[#881337] rounded-full"></div>
          <div class="w-4 h-4 bg-[#881337] rounded-full"></div>
          <div class="w-4 h-4 bg-[#881337] rounded-full"></div>
          <div class="w-4 h-4 bg-[#881337] rounded-full"></div>
          <div class="w-4 h-4 bg-[#881337] rounded-full"></div>
          <div class="w-4 h-4 bg-[#881337] rounded-full"></div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="flex-1 w-full grid grid-cols-12 grid-rows-7 gap-4 relative z-10 py-2">
      <!-- 买大/买小 -->
      <div class="col-span-7 row-span-4 bg-blue-500 border-4 border-[#881337] shadow-[6px_6px_0px_0px_#881337] rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden">
        <div class="absolute -right-6 -bottom-6 w-32 h-32 bg-blue-400 rounded-full"></div>
        <div class="flex justify-between items-start">
          <h3 class="text-5xl font-black text-white leading-[0.9] tracking-tighter">买大<br>买小</h3>
          <span class="bg-white text-[#881337] font-black px-2 py-0.5 border-4 border-[#881337] rounded-lg text-[4rem] transform rotate-3">1:1</span>
        </div>
        
        <div class="flex flex-col gap-2 mt-auto relative z-10 w-full">
          <div class="bg-white border-4 border-[#881337] rounded-xl px-3 py-1.5 flex justify-between items-center shadow-[3px_3px_0px_0px_#881337] transform -rotate-1">
            <span class="text-[#881337] font-black text-3xl tracking-tighter">4-10</span>
            <span class="bg-blue-600 text-white text-lg font-bold px-2 py-0.5 rounded-md border-2 border-[#881337]">小 SMALL</span>
          </div>
          <div class="bg-white border-4 border-[#881337] rounded-xl px-3 py-1.5 flex justify-between items-center shadow-[3px_3px_0px_0px_#881337] transform rotate-1">
            <span class="text-[#881337] font-black text-3xl tracking-tighter">11-17</span>
            <span class="bg-red-600 text-white text-lg font-bold px-2 py-0.5 rounded-md border-2 border-[#881337]">大 BIG</span>
          </div>
        </div>

        <Scale class="absolute top-2 right-2 text-blue-800 w-16 h-16 opacity-40" />
      </div>

      <!-- 豹子 -->
      <div class="col-span-5 row-span-4 bg-yellow-400 border-4 border-[#881337] shadow-[6px_6px_0px_0px_#881337] rounded-2xl p-4 flex flex-col items-center justify-center text-center relative overflow-hidden">
        <h3 class="text-6xl font-black text-[#881337] mb-1 tracking-tighter">🔥豹子</h3>
        <div class="text-2xl font-black bg-[#881337] text-white px-3 py-1 mb-2 rounded border-2 border-white transform -rotate-1 w-full leading-tight">三骰相同</div>
        <div class="text-5xl font-black text-red-600 bg-white px-4 py-1 border-4 border-[#881337] transform -rotate-3 shadow-[4px_4px_0px_0px_#881337]">1:30</div>
        <div class="mt-4 font-bold text-[#881337] text-lg">"单车变摩托"</div>
        <div class="mt-2 text-lg font-bold text-[#881337] opacity-80">(任意三子同号)</div>
      </div>

      <!-- NPC 规则 -->
      <div class="col-span-12 row-span-3 bg-red-500 border-4 border-[#881337] shadow-[6px_6px_0px_0px_#881337] rounded-2xl p-4 flex items-center gap-4 relative overflow-hidden">
        <div class="w-32 flex-shrink-0 flex flex-col items-center justify-center border-r-4 border-[#881337] pr-4 h-full">
          <div class="w-14 h-14 bg-white border-4 border-[#881337] rounded-full flex items-center justify-center mb-2 shadow-[3px_3px_0px_0px_#881337]">
            <Crown class="w-8 h-8 text-[#881337]" />
          </div>
          <span class="font-black text-white text-3xl uppercase tracking-tighter">NPC</span>
        </div>

        <div class="flex-1 grid grid-cols-2 gap-3 h-full">
          <div class="bg-white border-4 border-[#881337] p-2 rounded-xl shadow-[3px_3px_0px_0px_#881337] flex flex-col justify-center">
            <div class="flex items-center gap-1 mb-0.5">
              <Shirt class="w-5 h-5 text-red-600" />
              <span class="font-black text-xl text-[#881337]">必需装备</span>
            </div>
            <p class="text-lg font-bold text-[#881337] leading-none">金链子</p>
          </div>
          
          <div class="bg-white border-4 border-[#881337] p-2 rounded-xl shadow-[3px_3px_0px_0px_#881337] flex flex-col justify-center">
            <div class="flex items-center gap-1 mb-0.5">
              <Mic2 class="w-5 h-5 text-blue-600" />
              <span class="font-black text-xl text-[#881337]">轮换机制</span>
            </div>
            <p class="text-lg font-bold text-[#881337] leading-none">想当就当！带上金链子！</p>
          </div>
          
          <div class="col-span-2 bg-yellow-300 border-4 border-[#881337] p-2 rounded-xl shadow-[3px_3px_0px_0px_#881337] flex justify-between items-center px-4">
            <div class="flex flex-col">
              <span class="font-black text-xl text-[#881337] flex items-center gap-2">
                <Coins class="w-5 h-5 text-[#881337]" /> 喜钱规矩
              </span>
            </div>
            <div class="font-black text-2xl text-[#881337] underline decoration-4 decoration-red-500">豹子分红 NPC 30$</div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="w-full relative z-10 shrink-0" style="height: 12%;">
      <div class="h-full bg-[#881337] text-white px-6 border-4 border-[#881337] flex flex-col items-center justify-center transform rotate-1 shadow-[6px_6px_0px_0px_#881337] w-full">
        <p class="text-xl font-bold mb-1 tracking-widest text-red-200">" 无论开大开小 "</p>
        <div class="w-16 h-1 bg-yellow-400 mb-1"></div>
        <p class="text-[3.5rem] leading-none font-black text-yellow-400 font-art tracking-widest uppercase">听老婆的准没错</p>
      </div>
      <p class="text-[#881337]/30 text-[10px] mt-2 font-mono text-center">DESIGNED BY TPC © 2025</p>
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
