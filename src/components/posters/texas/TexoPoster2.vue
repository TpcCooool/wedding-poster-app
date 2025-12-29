<script setup lang="ts">
import { Crown, Gem, Ticket, Glasses, Coins, RefreshCw, Zap, Trophy, AlignJustify } from 'lucide-vue-next'
</script>

<template>
  <div class="poster-container" style="width: 794px; height: 1123px; box-sizing: border-box; padding: 10px; background-color: #1e3a8a; display: flex; flex-direction: column; border: 8px solid #facc15;">
    
    <!-- Header -->
    <header class="bg-red-600 p-2 text-center border-b-8 border-yellow-400 relative z-10 shrink-0">
      <div class="absolute top-2 left-4 rotate-12 opacity-50">
        <Crown class="w-16 h-16 text-yellow-900" />
      </div>
      <div class="absolute top-2 right-4 -rotate-12 opacity-50">
        <Gem class="w-16 h-16 text-yellow-900" />
      </div>

      <div class="inline-block bg-yellow-400 px-8 py-1 rounded-full mb-1 transform -rotate-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
        <span class="text-black font-black text-xl tracking-[0.2em]">TEXAS HOLD'EM</span>
      </div>
      <h1 class="text-7xl text-yellow-300 font-art leading-none transform -rotate-1 mt-1" style="text-shadow: 3px 3px 0px #000;">
        私房钱<span class="text-white text-6xl ml-2">保卫战</span>
      </h1>
      <div class="mt-2 flex justify-center">
        <div class="bg-blue-900 text-white py-1 px-8 transform skew-x-[-10deg] border-2 border-yellow-400 shadow-[4px_4px_0px_0px_#FCD34D]">
          <p class="font-bold text-2xl transform skew-x-[10deg]">"赢了掌财权，输了回家跪键盘"</p>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 p-2 relative z-10 flex flex-col gap-2 text-white">
      <!-- Top Row -->
      <div class="grid grid-cols-2 gap-2 shrink-0 h-[180px]">
        <!-- Entry Fee -->
        <div class="bg-yellow-400 p-2 rounded-xl border-4 border-black shadow-lg flex flex-col justify-center items-center text-center transform rotate-1 h-full">
          <div class="bg-red-600 text-white p-1.5 rounded-full border-2 border-black mb-0">
            <Ticket class="w-6 h-6" />
          </div>
          <h3 class="font-black text-black text-2xl mb-0 leading-tight">入场门槛</h3>
          <div class="text-[4.5rem] font-black text-black leading-none my-0 -mt-1">≥15</div>
          <span class="text-sm font-bold text-red-900 uppercase tracking-widest bg-white/20 px-2 rounded">筹码 / CHIPS</span>
        </div>

        <!-- Dealer Rules -->
        <div class="bg-red-700 p-3 rounded-xl border-4 border-yellow-400 shadow-lg text-white flex flex-col justify-center relative h-full">
          <div class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-4 py-0.5 rounded-md text-sm font-black border-2 border-black shadow-md z-20 whitespace-nowrap">
            NPC 荷官规矩
          </div>
          <ul class="space-y-2 mt-3 w-full">
            <li class="flex items-center gap-2 bg-black/20 p-1.5 rounded-lg border border-red-500/30">
              <Glasses class="text-yellow-300 w-6 h-6 shrink-0" />
              <span class="text-lg font-bold">必须佩戴墨镜</span>
            </li>
            <li class="flex items-center gap-2 bg-black/20 p-1.5 rounded-lg border border-red-500/30">
              <Coins class="text-yellow-300 w-6 h-6 shrink-0" />
              <span class="text-lg font-bold">赢家分红 5 筹码</span>
            </li>
            <li class="flex items-center gap-2 bg-black/20 p-1.5 rounded-lg border border-red-500/30">
              <RefreshCw class="text-yellow-300 w-6 h-6 shrink-0" />
              <span class="text-lg font-bold">随时申请轮换</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Game Flow -->
      <div class="bg-white/10 backdrop-blur-md rounded-xl p-3 border-4 border-yellow-400/30 shrink-0">
        <h2 class="text-yellow-400 font-black text-2xl mb-3 flex items-center justify-center gap-2">
          <div class="bg-yellow-400 h-1 w-12"></div>
          <Zap class="fill-yellow-400 text-yellow-400 w-7 h-7" />
          下注流程
          <div class="bg-yellow-400 h-1 w-12"></div>
        </h2>

        <div class="relative mt-2">
          <div class="absolute top-[18px] left-[12.5%] right-[12.5%] h-[5px] bg-red-600 z-0"></div>

          <div class="grid grid-cols-4 gap-1.5 relative z-10">
            <div class="flex flex-col items-center">
              <div class="w-10 h-10 bg-blue-600 rounded-full border-4 border-red-600 flex items-center justify-center shadow-lg mb-2">
                <span class="text-white font-black text-xl">1</span>
              </div>
              <div class="bg-blue-800 p-1.5 rounded-lg border-2 border-yellow-400 w-full text-center h-full flex flex-col">
                <div class="bg-red-600 text-white text-sm px-2 py-0.5 rounded-full font-bold inline-block mb-1 mx-auto whitespace-nowrap">各 5 筹码</div>
                <div class="text-white font-black text-lg leading-tight mb-1">入局&翻牌</div>
                <div class="text-blue-100 text-xs font-bold leading-tight mt-auto">底牌2张<br>公牌 <span class="text-yellow-400 text-base">3张</span></div>
              </div>
            </div>

            <div class="flex flex-col items-center">
              <div class="w-10 h-10 bg-blue-600 rounded-full border-4 border-red-600 flex items-center justify-center shadow-lg mb-2">
                <span class="text-white font-black text-xl">2</span>
              </div>
              <div class="bg-blue-800 p-1.5 rounded-lg border-2 border-yellow-400 w-full text-center h-full flex flex-col">
                <div class="bg-red-600 text-white text-sm px-2 py-0.5 rounded-full font-bold inline-block mb-1 mx-auto whitespace-nowrap">加 5 筹码</div>
                <div class="text-white font-black text-lg leading-tight mb-1">转牌 Turn</div>
                <div class="text-blue-100 text-xs font-bold leading-tight mt-auto">翻开第<br><span class="text-yellow-400 text-base">4张</span> 公牌</div>
              </div>
            </div>

            <div class="flex flex-col items-center">
              <div class="w-10 h-10 bg-blue-600 rounded-full border-4 border-red-600 flex items-center justify-center shadow-lg mb-2">
                <span class="text-white font-black text-xl">3</span>
              </div>
              <div class="bg-blue-800 p-1.5 rounded-lg border-2 border-yellow-400 w-full text-center h-full flex flex-col">
                <div class="bg-red-600 text-white text-sm px-2 py-0.5 rounded-full font-bold inline-block mb-1 mx-auto whitespace-nowrap">加 5 筹码</div>
                <div class="text-white font-black text-lg leading-tight mb-1">河牌 River</div>
                <div class="text-blue-100 text-xs font-bold leading-tight mt-auto">翻开第<br><span class="text-yellow-400 text-base">5张</span> 公牌</div>
              </div>
            </div>

            <div class="flex flex-col items-center">
              <div class="w-10 h-10 bg-yellow-400 rounded-full border-4 border-red-600 flex items-center justify-center shadow-lg mb-2">
                <Trophy class="w-6 h-6 text-red-600 fill-red-600" />
              </div>
              <div class="bg-red-600 p-1.5 rounded-lg border-2 border-yellow-400 w-full text-center shadow-lg h-full flex flex-col justify-center">
                <div class="text-white font-black text-2xl leading-tight mb-1">通吃</div>
                <div class="text-yellow-100 font-bold text-xs mt-auto leading-tight">不再下注<br>直接亮牌</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Hand Rankings -->
      <div class="bg-white rounded-xl border-4 border-gray-900 overflow-hidden shadow-xl flex-1 flex flex-col min-h-0">
        <div class="bg-red-600 text-white p-2 text-center font-black text-xl border-b-4 border-gray-900 flex items-center justify-center gap-2 shrink-0">
          <AlignJustify class="w-6 h-6" />
          牌型大小 (从大到小)
        </div>
        <div class="grid grid-cols-2 text-gray-900 text-base flex-1">
          <!-- Column 1 -->
          <div class="border-r-2 border-gray-900 flex flex-col h-full">
            <div class="p-1 px-2 border-b border-gray-200 flex-1 flex flex-col justify-center bg-white/50">
              <div class="flex justify-between items-center font-black">
                <span class="text-red-700 text-lg">1. 皇家同花顺</span>
                <span class="text-xs text-gray-500 uppercase font-black bg-gray-200 px-1 rounded">MAX</span>
              </div>
              <div class="font-mono font-bold text-lg mt-0.5 tracking-tighter">
                <span class="text-gray-900">A♠ K♠ Q♠ J♠ 10♠</span>
              </div>
            </div>
            <div class="p-1 px-2 border-b border-gray-200 flex-1 flex flex-col justify-center">
              <div class="font-black text-black text-lg">2. 同花顺</div>
              <div class="font-mono font-bold text-lg mt-0.5 tracking-tighter text-red-600">9♥ 8♥ 7♥ 6♥ 5♥</div>
            </div>
            <div class="p-1 px-2 border-b border-gray-200 flex-1 flex flex-col justify-center bg-white/50">
              <div class="font-black text-black text-lg">3. 四条 (金刚)</div>
              <div class="font-mono font-bold text-lg mt-0.5 tracking-tighter">A♣ <span class="text-red-600">A♦ A♥</span> A♠ K♦</div>
            </div>
            <div class="p-1 px-2 border-b border-gray-200 flex-1 flex flex-col justify-center">
              <div class="font-black text-black text-lg">4. 葫芦 (3带2)</div>
              <div class="font-mono font-bold text-lg mt-0.5 tracking-tighter">K♠ K♣ <span class="text-red-600">K♥ 9♦</span> 9♣</div>
            </div>
            <div class="p-1 px-2 flex-1 flex flex-col justify-center bg-white/50">
              <div class="font-black text-black text-lg">5. 同花 (乱色)</div>
              <div class="font-mono font-bold text-lg mt-0.5 tracking-tighter text-red-600">J♦ 9♦ 7♦ 4♦ 2♦</div>
            </div>
          </div>

          <!-- Column 2 -->
          <div class="flex flex-col h-full">
            <div class="p-1 px-2 border-b border-gray-200 flex-1 flex flex-col justify-center bg-white/50">
              <div class="font-black text-black text-lg">6. 顺子 (杂色)</div>
              <div class="font-mono font-bold text-lg mt-0.5 tracking-tighter">Q♣ <span class="text-red-600">J♦</span> 10♠ <span class="text-red-600">9♥ 8♦</span></div>
            </div>
            <div class="p-1 px-2 border-b border-gray-200 flex-1 flex flex-col justify-center">
              <div class="font-black text-black text-lg">7. 三条</div>
              <div class="font-mono font-bold text-lg mt-0.5 tracking-tighter">8♣ <span class="text-red-600">8♦</span> 8♠ K♣ <span class="text-red-600">4♥</span></div>
            </div>
            <div class="p-1 px-2 border-b border-gray-200 flex-1 flex flex-col justify-center bg-white/50">
              <div class="font-black text-black text-lg">8. 两对</div>
              <div class="font-mono font-bold text-lg mt-0.5 tracking-tighter">J♠ J♣ <span class="text-red-600">5♦</span> 5♠ 9♣</div>
            </div>
            <div class="p-1 px-2 border-b border-gray-200 flex-1 flex flex-col justify-center">
              <div class="font-black text-black text-lg">9. 一对</div>
              <div class="font-mono font-bold text-lg mt-0.5 tracking-tighter"><span class="text-red-600">10♥</span> 10♣ <span class="text-red-600">K♦</span> 4♠ <span class="text-red-600">3♥</span></div>
            </div>
            <div class="p-1 px-2 flex-1 flex flex-col justify-center bg-white/50">
              <div class="flex justify-between items-center font-black">
                <span class="text-gray-600 text-lg">10. 高牌 (单张)</span>
                <span class="text-xs text-gray-400 uppercase font-black bg-gray-200 px-1 rounded">MIN</span>
              </div>
              <div class="font-mono font-bold text-lg mt-0.5 tracking-tighter">A♠ <span class="text-red-600">J♦</span> 8♣ <span class="text-red-600">6♥ 2♦</span></div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-red-600 p-2 text-center border-t-8 border-yellow-400 shrink-0 relative z-10">
      <div class="flex justify-center gap-6 text-yellow-300 items-center">
        <div class="flex gap-2 text-2xl"><span>♦</span><span>♣</span></div>
        <span class="text-white font-black tracking-[0.2em] text-xl uppercase border-2 border-yellow-400 px-6 py-1 inline-block bg-red-700">All In Or Go Home</span>
        <div class="flex gap-2 text-2xl"><span>♥</span><span>♠</span></div>
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
