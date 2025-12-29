<script setup lang="ts">
import { Ticket, Scroll } from 'lucide-vue-next'
</script>

<template>
  <div class="poster-container" style="width: 794px; height: 1123px; box-sizing: border-box; padding: 20px; background-color: #1e3a8a; display: flex; flex-direction: column; border: 8px solid #facc15;">
    
    <!-- Header -->
    <header class="bg-red-600 p-6 text-center border-b-8 border-yellow-400 relative z-10 shrink-0">
      <div class="absolute top-4 left-4 rotate-12 opacity-50">
        <Trophy class="w-16 h-16 text-yellow-900" />
      </div>
      <div class="absolute top-4 right-4 -rotate-12 opacity-50">
        <Ticket class="w-16 h-16 text-yellow-900" />
      </div>

      <div class="inline-block bg-yellow-400 px-6 py-2 rounded-full mb-2 transform -rotate-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <span class="text-black font-black text-lg tracking-[0.2em]">GAME NO.3</span>
      </div>
      <h1 class="text-7xl text-yellow-300 font-art text-shadow-hard leading-none transform -rotate-1 mt-2">
        家和<span class="text-white ml-2">万事兴</span>
      </h1>
      <div class="mt-4 flex justify-center">
        <div class="bg-blue-900 text-white py-2 px-8 transform skew-x-[-10deg] border-2 border-yellow-400 shadow-[6px_6px_0px_0px_#FCD34D]">
          <p class="font-bold text-xl transform skew-x-[10deg]">"广东鸡胡，只能碰，不能吃！"</p>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 p-6 relative z-10 flex flex-col gap-6">

      <!-- Top Row: Entry & Pact -->
      <div class="grid grid-cols-2 gap-6 shrink-0 h-40">
        <!-- Entry Fee -->
        <div class="bg-yellow-400 p-4 rounded-xl border-4 border-black shadow-lg flex flex-col justify-center items-center text-center transform rotate-1 h-full">
          <div class="bg-red-600 text-white p-2 rounded-full border-2 border-black mb-1">
            <Ticket class="w-8 h-8" />
          </div>
          <h3 class="font-black text-black text-xl mb-0">入场门槛</h3>
          <div class="text-5xl font-black text-black leading-none my-1">10</div>
          <span class="text-sm font-bold text-red-900 uppercase">筹码 / Chips</span>
        </div>

        <!-- Pact -->
        <div class="bg-black p-4 rounded-xl border-4 border-blue-400 shadow-lg text-white flex flex-col justify-center items-center relative h-full text-center">
          <div class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-0.5 rounded text-sm font-bold border-2 border-black">
            雀神公约
          </div>
          <Trophy class="text-yellow-400 w-12 h-12 mb-2" />
          <h2 class="text-3xl font-art text-yellow-300 mb-1">开心第一</h2>
          <p class="text-lg font-bold text-gray-300">输赢第二</p>
        </div>
      </div>
      
      <!-- Game Flow -->
      <div class="bg-white/10 backdrop-blur-md rounded-xl p-5 border-4 border-yellow-400/30 shrink-0">
        <h2 class="text-yellow-400 font-black text-xl mb-6 flex items-center justify-center gap-2">
          <div class="bg-yellow-400 h-1 w-10"></div>
          <Zap class="fill-yellow-400 text-yellow-400 w-6 h-6" />
          核心玩法流程
          <div class="bg-yellow-400 h-1 w-10"></div>
        </h2>
        
        <div class="relative">
          <div class="absolute top-[22px] left-[12.5%] right-[12.5%] h-[4px] bg-red-600 z-0"></div>

          <div class="grid grid-cols-4 gap-2 relative z-10">
            <!-- Step 1 -->
            <div class="flex flex-col items-center">
              <div class="w-12 h-12 bg-blue-600 rounded-full border-4 border-red-600 flex items-center justify-center shadow-lg mb-3">
                <span class="text-white font-black text-xl">1</span>
              </div>
              <div class="bg-blue-800 p-2 rounded-lg border-2 border-yellow-400 w-full text-center h-full">
                <div class="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-bold inline-block mb-1">基础规则</div>
                <div class="text-white font-bold text-base leading-tight">广东鸡胡</div>
                <div class="text-blue-200 text-[10px] mt-1">经典玩法<br>简单刺激</div>
              </div>
            </div>

            <!-- Step 2 -->
            <div class="flex flex-col items-center">
              <div class="w-12 h-12 bg-blue-600 rounded-full border-4 border-red-600 flex items-center justify-center shadow-lg mb-3">
                <span class="text-white font-black text-xl">2</span>
              </div>
              <div class="bg-blue-800 p-2 rounded-lg border-2 border-yellow-400 w-full text-center h-full">
                <div class="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-bold inline-block mb-1">关键限制</div>
                <div class="text-white font-bold text-base leading-tight">只能【碰】</div>
                <div class="text-blue-200 text-[10px] mt-1 text-yellow-400 font-bold">严禁【吃】牌</div>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="flex flex-col items-center">
              <div class="w-12 h-12 bg-blue-600 rounded-full border-4 border-red-600 flex items-center justify-center shadow-lg mb-3">
                <span class="text-white font-black text-xl">3</span>
              </div>
              <div class="bg-blue-800 p-2 rounded-lg border-2 border-yellow-400 w-full text-center h-full">
                <div class="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-bold inline-block mb-1">流局处理</div>
                <div class="text-white font-bold text-base leading-tight">黄庄退款</div>
                <div class="text-blue-200 text-[10px] mt-1">筹码退回<br>重新来过</div>
              </div>
            </div>

            <!-- Step 4 -->
            <div class="flex flex-col items-center">
              <div class="w-12 h-12 bg-yellow-400 rounded-full border-4 border-red-600 flex items-center justify-center shadow-lg mb-3">
                <Trophy class="w-6 h-6 text-red-600 fill-red-600" />
              </div>
              <div class="bg-red-600 p-2 rounded-lg border-2 border-yellow-400 w-full text-center shadow-lg h-full flex flex-col justify-center">
                <div class="text-white font-black text-lg leading-tight">赢家通吃</div>
                <div class="text-yellow-100 font-bold text-xs mt-1">独揽 40 筹码</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Detailed Rules List -->
      <div class="bg-white rounded-xl border-4 border-gray-900 overflow-hidden shadow-xl flex-1 flex flex-col">
        <div class="bg-red-600 text-white p-3 text-center font-black text-xl border-b-4 border-gray-900 flex items-center justify-center gap-2 shrink-0">
          <Scroll class="w-6 h-6" />
          详细规则清单
        </div>
        <div class="flex flex-col text-gray-900 flex-1 bg-gray-50">
          
          <!-- Row 1 -->
          <div class="rule-row p-4 border-b border-gray-300 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="bg-black text-yellow-400 rounded-full w-8 h-8 flex items-center justify-center font-black">1</div>
              <span class="font-bold text-xl">一局一结制度</span>
            </div>
            <span class="font-bold text-red-600 text-xl">不拖欠</span>
          </div>

          <!-- Row 2 -->
          <div class="rule-row p-4 border-b border-gray-300 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="bg-black text-yellow-400 rounded-full w-8 h-8 flex items-center justify-center font-black">2</div>
              <span class="font-bold text-xl">赢家奖励</span>
            </div>
            <span class="bg-yellow-400 text-black px-3 py-1 rounded font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">拿走桌上 40 筹码</span>
          </div>

          <!-- Row 3 -->
          <div class="rule-row p-4 border-b border-gray-300 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="bg-black text-yellow-400 rounded-full w-8 h-8 flex items-center justify-center font-black">3</div>
              <span class="font-bold text-xl">流局（黄庄）</span>
            </div>
            <span class="font-bold text-blue-800 text-lg">筹码全额退回</span>
          </div>

           <!-- Row 4 -->
           <div class="rule-row p-4 border-b border-gray-300 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="bg-black text-yellow-400 rounded-full w-8 h-8 flex items-center justify-center font-black">4</div>
              <span class="font-bold text-xl">特殊限制</span>
            </div>
            <div class="flex gap-2">
               <span class="text-green-700 font-bold">✅ 可碰</span>
               <span class="text-red-600 font-bold decoration-wavy underline">❌ 禁吃</span>
            </div>
          </div>

          <!-- Decorative Filler Area -->
          <div class="flex-1 flex items-center justify-center p-4 bg-gray-100">
            <p class="text-gray-400 text-center italic font-bold">
              * 最终解释权归"大喜日子"筹委会所有
            </p>
          </div>

        </div>
      </div>

    </main>

    <!-- Footer -->
    <footer class="bg-red-600 p-4 text-center border-t-8 border-yellow-400 shrink-0 relative z-10">
      <div class="flex justify-center gap-8 text-yellow-300 items-center">
        <div class="flex gap-2 text-3xl">
          <span>🀄️</span><span>🀅</span>
        </div>
        <span class="text-white font-black tracking-[0.2em] text-xl uppercase border-2 border-yellow-400 px-6 py-2 inline-block bg-red-700 transform -skew-x-12 shadow-lg">
          <span class="transform skew-x-12 inline-block">大吉大利 今晚胡牌</span>
        </span>
        <div class="flex gap-2 text-3xl">
          <span>🀆</span><span>🀀</span>
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
.text-shadow-hard {
  text-shadow: 4px 4px 0px #000;
}
.rule-row:nth-child(odd) {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
