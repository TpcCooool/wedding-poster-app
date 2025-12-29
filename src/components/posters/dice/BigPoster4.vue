<script setup lang="ts">
import { Scale, Crown, Shirt, Mic2, Coins } from 'lucide-vue-next'
</script>

<template>
  <div class="poster-container" style="width: 794px; height: 1123px; box-sizing: border-box; padding: 24px; background-color: #fff; display: flex; flex-direction: column; position: relative; border: 8px solid #1e3a8a; --dark-ink: #1e3a8a;">
    
    <!-- 背景纹理 -->
    <div class="absolute inset-0 z-0 pointer-events-none" style="background-image: radial-gradient(#1e3a8a 20%, transparent 20%); background-size: 16px 16px; opacity: 0.08;"></div>

    <!-- Header -->
    <header class="relative z-10 flex flex-col items-center mb-4">
      <div class="w-full flex justify-between items-center mb-2 border-b-4 pb-2" style="border-color: #1e3a8a;">
        <div class="flex gap-2">
          <div class="w-5 h-5 rounded-full bg-red-500 border-2" style="border-color: #1e3a8a;"></div>
          <div class="w-5 h-5 rounded-full bg-yellow-400 border-2" style="border-color: #1e3a8a;"></div>
          <div class="w-5 h-5 rounded-full bg-blue-500 border-2" style="border-color: #1e3a8a;"></div>
        </div>
        <div class="font-black text-2xl tracking-widest uppercase" style="color: #1e3a8a;">LUCKY DICE</div>
        <div class="w-20 h-5" style="background-color: #1e3a8a;"></div>
      </div>

      <div class="relative mt-2">
        <h1 class="text-[8rem] leading-[0.85] font-black tracking-tighter transform -rotate-2 relative z-10" style="color: #1e3a8a; text-shadow: 5px 5px 0 #fff, 10px 10px 0 rgba(30, 58, 138, 0.2);">
          老婆说的<br><span class="text-red-600 text-[9rem]">都对！</span>
        </h1>
        <div class="absolute -top-6 -right-10 w-32 h-32 bg-yellow-400 rounded-full border-4 -z-10" style="border-color: #1e3a8a;"></div>
        <div class="absolute bottom-4 -left-8 w-full h-10 bg-blue-500 -z-10 transform -skew-x-12 border-2" style="border-color: #1e3a8a;"></div>
      </div>

      <p class="mt-6 text-2xl font-bold text-white px-8 py-3 transform skew-x-[-12deg] shadow-[8px_8px_0px_0px_#1e3a8a]" style="background-color: #1e3a8a;">
        <span class="inline-block transform skew-x-[12deg] tracking-[0.2em] uppercase">WINNER TAKES ALL</span>
      </p>
    </header>

    <!-- 骰子组 -->
    <div class="relative z-10 h-44 flex justify-center items-center gap-10 mb-6">
      <div class="absolute w-72 h-72 border-[16px] border-yellow-400 rounded-full opacity-40 z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      
      <div class="w-28 h-28 bg-blue-500 border-5 rounded-2xl flex items-center justify-center text-5xl transform rotate-[10deg] shadow-[5px_5px_0px_0px_#1e3a8a]" style="border-color: #1e3a8a;">⚁</div>
      <div class="w-32 h-32 bg-red-500 border-5 rounded-2xl flex items-center justify-center text-6xl transform -rotate-[15deg] shadow-[6px_6px_0px_0px_#1e3a8a] z-10" style="border-color: #1e3a8a;">⚅</div>
      <div class="w-28 h-28 bg-yellow-400 border-5 rounded-2xl flex items-center justify-center text-5xl transform rotate-[25deg] shadow-[5px_5px_0px_0px_#1e3a8a]" style="border-color: #1e3a8a;">⚃</div>
    </div>

    <!-- 内容区 -->
    <main class="flex-1 grid grid-cols-12 grid-rows-7 gap-5 relative z-10">
      <!-- 买大/买小 -->
      <div class="col-span-7 row-span-4 bg-blue-500 border-4 shadow-[8px_8px_0px_0px_#1e3a8a] rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden" style="border-color: #1e3a8a;">
        <div class="absolute -right-6 -bottom-6 w-32 h-32 bg-blue-400 rounded-full"></div>
        <div class="flex justify-between items-start">
          <h3 class="text-7xl font-black text-white leading-[0.9] tracking-tighter">买大<br>买小</h3>
          <span class="bg-white font-black px-3 py-1 border-4 rounded-lg text-xl transform rotate-3" style="color: #1e3a8a; border-color: #1e3a8a;">1:1</span>
        </div>
        <div class="text-white font-bold text-3xl mt-2 relative z-10 leading-tight">"选中就拿钱<br>简单就是福"</div>
        <Scale class="absolute bottom-4 right-4 text-blue-800 w-20 h-20 opacity-40" />
      </div>

      <!-- 豹子 -->
      <div class="col-span-5 row-span-4 bg-yellow-400 border-4 shadow-[8px_8px_0px_0px_#1e3a8a] rounded-2xl p-5 flex flex-col items-center justify-center text-center relative overflow-hidden" style="border-color: #1e3a8a;">
        <h3 class="text-6xl font-black mb-2 tracking-tighter" style="color: #1e3a8a;">🔥豹子</h3>
        <div class="text-lg font-black text-white px-4 py-1 mb-4 rounded border-2 border-white transform -rotate-1" style="background-color: #1e3a8a;">三骰相同</div>
        <div class="text-7xl font-black text-red-600 bg-white px-6 py-2 border-4 transform -rotate-3 shadow-[4px_4px_0px_0px_#1e3a8a]" style="border-color: #1e3a8a;">1:10</div>
        <div class="mt-4 font-bold text-lg" style="color: #1e3a8a;">"单车变摩托"</div>
      </div>

      <!-- NPC 规则 -->
      <div class="col-span-12 row-span-3 bg-red-500 border-4 shadow-[8px_8px_0px_0px_#1e3a8a] rounded-2xl p-6 flex items-center gap-8 relative" style="border-color: #1e3a8a;">
        <div class="w-40 flex-shrink-0 flex flex-col items-center justify-center border-r-4 pr-6 h-full" style="border-color: #1e3a8a;">
          <div class="w-20 h-20 bg-white border-4 rounded-full flex items-center justify-center mb-3 shadow-[4px_4px_0px_0px_#1e3a8a]" style="border-color: #1e3a8a;">
            <Crown class="w-12 h-12" style="color: #1e3a8a;" />
          </div>
          <span class="font-black text-white text-4xl uppercase tracking-tighter">NPC</span>
        </div>

        <div class="flex-1 grid grid-cols-2 gap-5 h-full">
          <div class="bg-white border-4 p-3 rounded-xl shadow-[4px_4px_0px_0px_#1e3a8a] flex flex-col justify-center" style="border-color: #1e3a8a;">
            <div class="flex items-center gap-2 mb-1">
              <Shirt class="w-6 h-6 text-red-600" />
              <span class="font-black text-2xl" style="color: #1e3a8a;">必需装备</span>
            </div>
            <p class="text-xl font-bold leading-none" style="color: #1e3a8a;">金链子 & 哨子</p>
          </div>
          
          <div class="bg-white border-4 p-3 rounded-xl shadow-[4px_4px_0px_0px_#1e3a8a] flex flex-col justify-center" style="border-color: #1e3a8a;">
            <div class="flex items-center gap-2 mb-1">
              <Mic2 class="w-6 h-6 text-blue-600" />
              <span class="font-black text-2xl" style="color: #1e3a8a;">轮换机制</span>
            </div>
            <p class="text-xl font-bold leading-none" style="color: #1e3a8a;">谁嗓门大谁当！</p>
          </div>
          
          <div class="col-span-2 bg-yellow-300 border-4 p-3 rounded-xl shadow-[4px_4px_0px_0px_#1e3a8a] flex justify-between items-center px-6" style="border-color: #1e3a8a;">
            <div class="flex flex-col">
              <span class="font-black text-2xl flex items-center gap-2" style="color: #1e3a8a;">
                <Coins class="w-6 h-6" style="color: #1e3a8a;" /> 喜钱规矩
              </span>
              <span class="text-sm font-bold opacity-80" style="color: #1e3a8a;">(出现豹子/大赢家)</span>
            </div>
            <div class="font-black text-4xl underline decoration-4 decoration-red-500" style="color: #1e3a8a;">支付 10 筹码</div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="mt-6 relative z-10 w-full">
      <div class="text-white py-6 px-8 border-4 flex flex-col items-center justify-center transform rotate-1 shadow-[8px_8px_0px_0px_#1e3a8a] w-full" style="background-color: #1e3a8a; border-color: #1e3a8a;">
        <p class="text-3xl font-bold mb-2 tracking-widest text-blue-200">" 无论开大开小 "</p>
        <div class="w-24 h-2 bg-yellow-400 mb-2"></div>
        <p class="text-[4rem] leading-none font-black text-yellow-400 font-art tracking-widest uppercase">听老婆的准没错</p>
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
