<script setup lang="ts">
import { Ticket, Scroll, Zap, Layers, Undo2, Users } from "lucide-vue-next";
</script>

<template>
  <div
    class="poster-container"
    style="
      width: 794px;
      height: 1123px;
      box-sizing: border-box;
      padding: 32px;
      background-color: #0f4c3a;
      background-image: radial-gradient(
          rgba(255, 255, 255, 0.1) 1px,
          transparent 1px
        ),
        linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3));
      background-size: 20px 20px, 100% 100%;
      display: flex;
      flex-direction: column;
      border: 16px solid #5d4037;
      box-shadow: inset 0 0 80px rgba(0, 0, 0, 0.6);
      justify-content: space-between;
    "
  >
    <!-- Header -->
    <header class="relative z-10 text-center mb-6 flex-shrink-0">
      <div class="inline-block relative mt-4">
        <div
          class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-red-700 text-white px-6 py-1 rounded-full border-2 border-yellow-400 shadow-lg z-20"
        >
          <span class="font-bold tracking-widest text-lg"
            >🀄️ 雀神争霸赛 🀄️</span
          >
        </div>

        <h1
          class="text-[90px] font-art text-yellow-300 leading-none mt-2 drop-shadow-xl"
          style="text-shadow: 3px 3px 0px #000"
        >
          家和万事兴
        </h1>

        <div
          class="absolute top-4 -left-12 w-10 pt-3 pb-3 bg-red-800 border-2 border-yellow-600 rounded-lg shadow-xl flex flex-col items-center gap-1 text-yellow-200 font-art text-xl"
        >
          <span>手</span><span>气</span><span>如</span><span>虹</span>
        </div>
        <div
          class="absolute top-4 -right-12 w-10 pt-3 pb-3 bg-red-800 border-2 border-yellow-600 rounded-lg shadow-xl flex flex-col items-center gap-1 text-yellow-200 font-art text-xl"
        >
          <span>大</span><span>杀</span><span>四</span><span>方</span>
        </div>
      </div>

      <div
        class="mt-4 bg-black/40 inline-block px-8 py-2 rounded-lg border border-yellow-500/30 backdrop-blur-sm"
      >
        <p class="text-white text-xl font-bold tracking-wider">
          <span class="text-yellow-400">"</span> 广东鸡胡 · 只能碰 · 不能吃
          <span class="text-yellow-400">"</span>
        </p>
      </div>
    </header>

    <!-- Cards -->
    <section
      class="relative z-10 grid grid-cols-2 gap-6 mb-6 flex-shrink-0 h-[180px]"
    >
      <!-- Entry Fee -->
      <div
        class="tile-card p-4 transform -rotate-1 hover:rotate-0 transition-transform bg-white rounded-xl border-4 border-gray-900 shadow-lg"
      >
        <div
          class="absolute -top-3 -left-3 bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-black border-2 border-white shadow-md text-sm"
        >
          入
        </div>
        <h2 class="text-gray-500 font-bold text-lg mb-1">每人入场</h2>
        <div class="relative flex items-center justify-center">
          <Ticket
            class="w-16 h-16 text-yellow-500 fill-yellow-100 absolute opacity-20"
          />
          <span class="text-5xl font-black text-yellow-700 z-10">10</span>
        </div>
        <span
          class="mt-1 bg-gray-800 text-white px-3 py-0.5 rounded-full text-xs font-bold inline-block"
          >筹码 / Chips</span
        >
      </div>

      <!-- Prize -->
      <div
        class="tile-card p-4 transform rotate-1 hover:rotate-0 transition-transform border-yellow-200 bg-yellow-50 rounded-xl border-4 border-gray-900 shadow-lg"
      >
        <div
          class="absolute -top-3 -right-3 bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-black border-2 border-white shadow-md text-sm"
        >
          赢
        </div>
        <h2 class="text-red-800 font-bold text-lg mb-1">胡牌独揽</h2>
        <div class="flex items-baseline gap-1">
          <span
            class="text-6xl font-fun text-red-600 drop-shadow-sm leading-none"
            >40</span
          >
          <span class="text-sm font-bold text-red-400">ALL IN</span>
        </div>
        <div
          class="mt-2 border-4 border-red-600 text-red-600 rounded px-2 py-1 text-xs font-bold inline-block"
        >
          赢家通吃
        </div>
      </div>
    </section>

    <!-- Rules -->
    <section
      class="relative z-10 bg-white/95 rounded-xl p-4 shadow-2xl border-4 border-yellow-600/50 flex flex-col mb-4 overflow-hidden"
    >
      <!-- 装饰背景 -->
      <div class="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
        <div class="absolute top-2 left-4 text-6xl">🀄</div>
        <div class="absolute top-2 right-4 text-6xl">🀅</div>
        <div class="absolute bottom-2 left-4 text-6xl">🀆</div>
        <div class="absolute bottom-2 right-4 text-6xl">🀇</div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl">🀀</div>
      </div>

      <!-- Header -->
      <div class="flex items-center justify-center mb-3 flex-shrink-0 relative z-10">
        <div class="h-1 bg-gray-300 w-12 rounded"></div>
        <h3
          class="mx-3 text-xl font-black text-gray-800 flex items-center gap-2 whitespace-nowrap"
        >
          <Scroll class="w-5 h-5 text-red-600" />
          游戏规则
        </h3>
        <div class="h-1 bg-gray-300 w-12 rounded"></div>
      </div>

      <!-- List -->
      <div class="flex flex-col gap-2 relative z-10">
        <!-- Rule 1 -->
        <div
          class="flex items-center bg-green-50 p-2.5 rounded-lg border-l-4 border-green-600 shadow-sm"
        >
          <div
            class="bg-green-600 text-white w-7 h-7 rounded flex items-center justify-center font-black text-base mr-3 shadow shrink-0"
          >
            1
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="text-base font-bold text-green-900 leading-tight">
              核心玩法：广东鸡胡，只打一圈就定胜负！
            </h4>
            <p class="text-green-700 font-medium text-xs mt-0.5 truncate">
              平胡即可，无番数限制，节奏快！
            </p>
          </div>
          <Zap class="w-7 h-7 text-yellow-500 fill-yellow-400 ml-2 shrink-0" />
        </div>

        <!-- Rule 2 -->
        <div
          class="flex items-center bg-blue-50 p-2.5 rounded-lg border-l-4 border-blue-600 shadow-sm"
        >
          <div
            class="bg-blue-600 text-white w-7 h-7 rounded flex items-center justify-center font-black text-base mr-3 shadow shrink-0"
          >
            2
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="text-base font-bold text-blue-900 leading-tight">
              只能【碰】/ 不能【吃】
            </h4>
            <div class="flex gap-2 mt-1">
              <span
                class="bg-green-200 text-green-800 px-1.5 py-0.5 rounded text-[10px] font-bold"
                >✅ 可碰</span
              >
              <span
                class="bg-red-200 text-red-800 px-1.5 py-0.5 rounded text-[10px] font-bold"
                >❌ 禁吃</span
              >
            </div>
          </div>
          <Layers class="w-7 h-7 text-blue-500 ml-2 shrink-0" />
        </div>

        <!-- Rule 3 -->
        <div
          class="flex items-center bg-gray-100 p-2.5 rounded-lg border-l-4 border-gray-600 shadow-sm"
        >
          <div
            class="bg-gray-600 text-white w-7 h-7 rounded flex items-center justify-center font-black text-base mr-3 shadow shrink-0"
          >
            3
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="text-base font-bold text-gray-900 leading-tight">
              黄庄流局 = 全额退款
            </h4>
            <p class="text-gray-600 font-medium text-xs mt-0.5 truncate">
              筹码退回，重新来过。
            </p>
          </div>
          <Undo2 class="w-7 h-7 text-gray-500 ml-2 shrink-0" />
        </div>

        <!-- Rule 4 -->
        <div
          class="flex items-center bg-purple-50 p-2.5 rounded-lg border-l-4 border-purple-600 shadow-sm"
        >
          <div
            class="bg-purple-600 text-white w-7 h-7 rounded flex items-center justify-center font-black text-base mr-3 shadow shrink-0"
          >
            4
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="text-base font-bold text-purple-900 leading-tight">
              其余规则可4人共同协定
            </h4>
            <p class="text-purple-600 font-medium text-xs mt-0.5 truncate">
              友情第一，输赢第二
            </p>
          </div>
          <Users class="w-7 h-7 text-purple-500 ml-2 shrink-0" />
        </div>
      </div>
    </section>

    <!-- Footer Pact -->
    <footer
      class="relative z-10 text-center flex-shrink-0"
    >
      <div
        class="bg-red-900 text-yellow-200 p-4 rounded-xl border-4 border-yellow-500 shadow-2xl relative overflow-hidden"
      >
        <div
          class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12"
        ></div>

        <h3 class="text-2xl font-art mb-2 relative z-10">🤝 雀神和谐公约 🤝</h3>
        <div
          class="flex justify-center items-center gap-6 text-lg font-bold relative z-10"
        >
          <div class="flex flex-col items-center">
            <span
              class="text-white text-[10px] opacity-80 uppercase tracking-widest"
              >Rule No.1</span
            >
            <span class="text-yellow-400 text-xl">开心第一</span>
          </div>
          <div class="h-8 w-0.5 bg-yellow-500/50"></div>
          <div class="flex flex-col items-center">
            <span
              class="text-white text-[10px] opacity-80 uppercase tracking-widest"
              >Rule No.2</span
            >
            <span class="text-white">输赢第二</span>
          </div>
        </div>
      </div>
      <p class="text-white/30 text-[10px] mt-2 font-mono">
        DESIGNED BY TPC © 2025
      </p>
    </footer>
  </div>
</template>

<style scoped>
.poster-container {
  font-family: "Noto Sans SC", sans-serif;
}
.font-art {
  font-family: "Ma Shan Zheng", cursive;
}
.font-fun {
  font-family: "ZCOOL KuaiLe", cursive;
}
.tile-card {
  position: relative;
  box-shadow: 1px 1px 0px #ccc, 2px 2px 0px #ccc, 3px 3px 0px #ccc,
    4px 4px 6px rgba(0, 0, 0, 0.4);
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
