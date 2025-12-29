<script setup lang="ts">
import { Crown, Gem, Dices, Box, Scale, Shirt, Coins, RefreshCw, Heart } from 'lucide-vue-next'
</script>

<template>
  <div class="poster-container" style="width: 794px; height: 1123px; box-sizing: border-box; padding: 20px; background-color: #1e3a8a; display: flex; flex-direction: column; position: relative; border: 8px solid #facc15;">
    
    <!-- Background -->
    <div class="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none z-0">
      <div class="grid grid-cols-4 gap-8 h-full p-8">
        <div class="flex flex-col justify-between items-center h-full">
          <Dices class="w-24 h-24" /><Box class="w-24 h-24" /><Dices class="w-24 h-24" /><Box class="w-24 h-24" />
        </div>
        <div class="flex flex-col justify-between items-center h-full mt-12">
          <Box class="w-24 h-24" /><Dices class="w-24 h-24" /><Box class="w-24 h-24" /><Dices class="w-24 h-24" />
        </div>
        <div class="flex flex-col justify-between items-center h-full">
          <Dices class="w-24 h-24" /><Box class="w-24 h-24" /><Dices class="w-24 h-24" /><Box class="w-24 h-24" />
        </div>
        <div class="flex flex-col justify-between items-center h-full mt-12">
          <Box class="w-24 h-24" /><Dices class="w-24 h-24" /><Box class="w-24 h-24" /><Dices class="w-24 h-24" />
        </div>
      </div>
    </div>

    <!-- Header -->
    <header class="bg-red-600 p-4 text-center border-b-8 border-yellow-400 relative z-10 flex-shrink-0 shadow-xl">
      <div class="absolute top-4 left-4 rotate-12 opacity-60">
        <Crown class="w-16 h-16 text-yellow-900" />
      </div>
      <div class="absolute top-4 right-4 -rotate-12 opacity-60">
        <Gem class="w-16 h-16 text-yellow-900" />
      </div>

      <div class="inline-block bg-yellow-400 px-6 py-1 rounded-full mb-1 transform -rotate-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <span class="text-black font-black text-lg tracking-[0.2em]">LUCKY DICE</span>
      </div>
      <h1 class="text-[5rem] text-yellow-300 font-art leading-none transform -rotate-1 mt-1 mb-2" style="text-shadow: 4px 4px 0px #000;">
        老婆说的<span class="text-white ml-4">都对</span>
      </h1>
      <div class="flex justify-center">
        <div class="bg-blue-900 text-white py-1 px-8 transform skew-x-[-10deg] border-2 border-yellow-400 shadow-[4px_4px_0px_0px_#FCD34D]">
          <p class="font-bold text-lg transform skew-x-[10deg] tracking-[0.3em] uppercase">
            LUCKY DICE 幸运骰子
          </p>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 relative z-10 flex flex-col gap-4 py-4 overflow-hidden text-white">
      <!-- Section A: 玩法 -->
      <div class="grid grid-cols-2 gap-4 flex-[2] min-h-[180px]">
        <!-- 买大买小 -->
        <div class="bg-yellow-400 p-4 rounded-xl border-4 border-black shadow-lg flex flex-col justify-center items-center text-center transform rotate-1 relative overflow-hidden">
          <Scale class="absolute -right-6 -bottom-6 w-36 h-36 text-yellow-600 opacity-20" />
          <div class="bg-red-600 text-white px-4 py-1 rounded-full border-2 border-black mb-2 font-black text-xs z-10 shadow-md">
            基础玩法
          </div>
          <h3 class="font-black text-black text-5xl mb-1 z-10 tracking-tighter">
            买大 / 买小
          </h3>
          <div class="text-xl font-bold text-black leading-none my-2 z-10 bg-white/80 px-4 py-1 rounded border-2 border-black">
            赔率 1:1
          </div>
          <span class="text-sm font-bold text-red-900 z-10">"选中就拿钱，简单就是福"</span>
        </div>

        <!-- 豹子 -->
        <div class="bg-black p-4 rounded-xl border-4 border-blue-400 shadow-lg text-white flex flex-col justify-center items-center text-center relative overflow-hidden transform -rotate-1">
          <div class="bg-blue-500 text-white px-4 py-1 rounded-full border-2 border-black mb-2 font-black text-xs z-10 shadow-md">
            进阶挑战
          </div>
          <div class="z-10 flex flex-col items-center">
            <h3 class="font-black text-yellow-400 text-5xl mb-1 tracking-tighter">
              🔥 买豹子
            </h3>
            <p class="text-xs text-gray-400 font-bold mb-2">三颗骰子点数相同</p>
          </div>
          <div class="text-3xl font-black text-red-500 leading-none z-10 bg-white px-6 py-2 rounded border-2 border-black transform scale-105 shadow-[4px_4px_0px_0px_#2563EB]">
            赔率 1:10
          </div>
        </div>
      </div>

      <!-- Section B: NPC 流程 -->
      <div class="bg-white/10 backdrop-blur-md rounded-xl p-4 border-4 border-yellow-400/30 flex-[3] flex flex-col justify-center min-h-[220px]">
        <h2 class="text-yellow-400 font-black text-2xl mb-4 flex items-center justify-center gap-3 shrink-0">
          <div class="bg-yellow-400 h-1 w-12 rounded-full"></div>
          <Crown class="fill-yellow-400 text-yellow-400 w-8 h-8" />
          NPC 摇骰官规矩
          <div class="bg-yellow-400 h-1 w-12 rounded-full"></div>
        </h2>

        <div class="relative flex-1 flex items-center">
          <div class="absolute top-6 left-[12%] right-[12%] h-1 bg-red-600 z-0"></div>

          <div class="grid grid-cols-4 gap-3 w-full relative z-10">
            <div class="flex flex-col items-center">
              <div class="w-14 h-14 bg-blue-600 rounded-full border-4 border-red-600 flex items-center justify-center shadow-lg mb-2 z-10">
                <Shirt class="w-7 h-7 text-white" />
              </div>
              <div class="bg-blue-800 p-2 rounded-lg border-2 border-yellow-400 w-full text-center flex-1 flex flex-col items-center shadow-md min-h-[110px]">
                <div class="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold inline-block mb-1">必需装备</div>
                <div class="text-white font-bold text-lg leading-none mb-1">大金链子</div>
                <div class="text-blue-200 text-xs mt-auto">& 哨子<br>气质拿捏死</div>
              </div>
            </div>

            <div class="flex flex-col items-center">
              <div class="w-14 h-14 bg-blue-600 rounded-full border-4 border-red-600 flex items-center justify-center shadow-lg mb-2 z-10">
                <Coins class="w-7 h-7 text-white" />
              </div>
              <div class="bg-blue-800 p-2 rounded-lg border-2 border-yellow-400 w-full text-center flex-1 flex flex-col items-center shadow-md min-h-[110px]">
                <div class="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold inline-block mb-1">喜钱规矩</div>
                <div class="text-white font-bold text-lg leading-none mb-1">豹子分红</div>
                <div class="text-blue-200 text-xs mt-auto">需支付 <span class="text-yellow-400 font-bold">10</span> 筹码<br>给摇骰官</div>
              </div>
            </div>

            <div class="flex flex-col items-center">
              <div class="w-14 h-14 bg-blue-600 rounded-full border-4 border-red-600 flex items-center justify-center shadow-lg mb-2 z-10">
                <RefreshCw class="w-7 h-7 text-white" />
              </div>
              <div class="bg-blue-800 p-2 rounded-lg border-2 border-yellow-400 w-full text-center flex-1 flex flex-col items-center shadow-md min-h-[110px]">
                <div class="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold inline-block mb-1">轮换机制</div>
                <div class="text-white font-bold text-lg leading-none mb-1">嗓门大者</div>
                <div class="text-blue-200 text-xs mt-auto">随时申请换人<br>掌控全场</div>
              </div>
            </div>

            <div class="flex flex-col items-center">
              <div class="w-14 h-14 bg-yellow-400 rounded-full border-4 border-red-600 flex items-center justify-center shadow-lg mb-2 z-10">
                <Heart class="w-7 h-7 text-red-600 fill-red-600" />
              </div>
              <div class="bg-red-600 p-2 rounded-lg border-2 border-yellow-400 w-full text-center shadow-lg flex-1 flex flex-col justify-center items-center min-h-[110px]">
                <div class="text-white font-black text-xl leading-tight">终极<br>奥义</div>
                <div class="text-yellow-100 font-bold text-[10px] mt-1">听老婆的<br>准没错</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section C: Slogan -->
      <div class="bg-white rounded-xl border-4 border-gray-900 overflow-hidden shadow-xl flex-[4] flex flex-col relative min-h-[250px]">
        <div class="bg-red-600 text-white p-2 text-center font-black text-xl border-b-4 border-gray-900 flex items-center justify-center gap-2 shrink-0">
          <Gem class="w-5 h-5" /> 获胜秘籍 <Gem class="w-5 h-5" />
        </div>

        <div class="flex-1 bg-yellow-400 flex flex-col justify-center items-center p-6 text-center relative overflow-hidden">
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[180px] font-black text-black opacity-5 pointer-events-none select-none whitespace-nowrap z-0">
            WINNER
          </div>

          <div class="relative z-10 border-4 border-black bg-white px-10 py-8 shadow-[12px_12px_0px_0px_#1e3a8a] transform -rotate-1 max-w-[90%]">
            <p class="text-5xl font-black text-black leading-tight tracking-tight mb-4 font-art">
              无论
              <span class="text-red-600 inline-block transform -rotate-2">开大</span>
              <span class="text-blue-600 inline-block transform rotate-2">开小</span>
            </p>
            <div class="w-full h-1.5 bg-black my-2 rounded-full opacity-20"></div>
            <p class="text-[4rem] font-black text-red-600 leading-[1.1] tracking-wide font-art" style="text-shadow: 4px 4px 0px #000;">
              听老婆的<br><span class="text-[3.5rem] text-black">准没错！</span>
            </p>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-red-600 p-4 text-center border-t-8 border-yellow-400 shrink-0 relative z-10 flex flex-col justify-center">
      <div class="flex justify-center gap-6 text-yellow-300 items-center">
        <div class="flex gap-2">
          <Dices class="w-6 h-6" />
        </div>
        <span class="text-white font-black tracking-[0.3em] text-sm uppercase border-2 border-yellow-400 px-6 py-2 inline-block bg-red-700 shadow-md">
          LUCKY DICE· DESIGNED BY TPC
        </span>
        <div class="flex gap-2">
          <Dices class="w-6 h-6" />
        </div>
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
