<script setup lang="ts">
</script>

<template>
  <div class="poster-container" style="width: 210mm; height: 297mm; background-color: white; position: relative; box-shadow: 0 20px 50px rgba(0,0,0,0.15); overflow: hidden; display: flex; flex-direction: column; padding: 15px; box-sizing: border-box;">
    <!-- 内部主框架 -->
    <div class="poster-frame" style="width: 100%; height: 100%; border: 4px solid #000; display: flex; flex-direction: column; position: relative; background: #fff; overflow: hidden;">
      
      <!-- 背景纹理 -->
      <div style="background-image: radial-gradient(#000 1px, transparent 1px); background-size: 20px 20px; opacity: 0.05; position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 0; pointer-events: none;"></div>

      <!-- 顶部 Header -->
      <header class="bg-red-600 p-6 text-center border-b-4 border-black relative z-10">
        <div class="absolute top-4 left-4 transform skew-x-[-10deg] bg-yellow-400 border-2 border-black px-3 py-1 font-black text-black text-sm shadow-[2px_2px_0px_0px_#000]">
          GAME #02
        </div>
        
        <h1 class="text-6xl font-black text-white tracking-tighter mt-2 mb-1 uppercase" style="text-shadow: 3px 3px 0px #000;">
          老婆说的都对
        </h1>
        
        <div class="flex justify-center items-center gap-4 mt-2">
          <div class="h-1 w-12 bg-white"></div>
          <h2 class="text-3xl font-bold text-yellow-300 tracking-wide uppercase" style="filter: drop-shadow(0 1px 1px rgba(0,0,0,0.5));">
            LUCKY DICE
          </h2>
          <div class="h-1 w-12 bg-white"></div>
        </div>
      </header>

      <!-- Slogan 条 -->
      <div class="bg-yellow-400 border-b-4 border-black py-3 text-center z-10 relative">
        <div class="absolute top-1 bottom-1 left-0 w-2 bg-black opacity-10"></div>
        <div class="absolute top-1 bottom-1 right-0 w-2 bg-black opacity-10"></div>
        
        <p class="text-xl font-black text-black tracking-widest">
          " 无论开大开小 · 听老婆的准没错 "
        </p>
      </div>

      <!-- 主内容区域 -->
      <main class="flex-1 p-6 flex flex-col gap-6 relative z-10 bg-white/50">
        
        <!-- 模块1：极速下注 -->
        <section class="bg-white p-5 border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div class="flex justify-between items-center border-b-2 border-black pb-2 mb-4">
            <h3 class="text-2xl font-black flex items-center gap-2">
              <span class="bg-black text-white w-8 h-8 flex items-center justify-center rounded-full text-lg">1</span>
              极速下注
            </h3>
            <span class="text-sm font-bold bg-gray-200 px-2 py-1 rounded border border-black">赔率表</span>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <!-- 买大/小 -->
            <div class="bg-blue-600 p-4 border-2 border-black shadow-[4px_4px_0px_0px_#000] relative">
              <div class="flex justify-between items-start mb-2">
                <h4 class="text-xl font-black text-white">买大/小</h4>
                <span class="bg-white text-black text-xs font-bold px-1.5 py-0.5 border border-black">1:1</span>
              </div>
              <div class="text-white font-bold text-sm leading-relaxed opacity-90">
                选中就拿钱<br>简单就是福
              </div>
            </div>

            <!-- 豹子 -->
            <div class="bg-yellow-400 p-4 border-2 border-black shadow-[4px_4px_0px_0px_#000] relative">
              <div class="flex justify-between items-start mb-2">
                <h4 class="text-xl font-black text-red-600">买豹子</h4>
                <span class="bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 border border-black">1:10</span>
              </div>
              <div class="text-black font-bold text-sm leading-relaxed">
                三骰相同<br>单车变摩托!
              </div>
              <div class="flex gap-1 absolute bottom-2 right-2 opacity-80">
                <div class="w-4 h-4 bg-white border border-black rounded-sm"></div>
                <div class="w-4 h-4 bg-white border border-black rounded-sm"></div>
                <div class="w-4 h-4 bg-white border border-black rounded-sm"></div>
              </div>
            </div>
          </div>
        </section>

        <!-- 模块2：摇骰官 NPC -->
        <section class="bg-white p-5 flex-1 flex flex-col border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div class="flex justify-between items-center border-b-2 border-black pb-2 mb-4">
            <h3 class="text-2xl font-black flex items-center gap-2">
              <span class="bg-black text-white w-8 h-8 flex items-center justify-center rounded-full text-lg">2</span>
              NPC 规则
            </h3>
            <span class="text-3xl">🦁</span>
          </div>

          <div class="space-y-5 flex-1">
            <!-- 装备行 -->
            <div class="flex gap-3 items-start">
              <div class="w-12 h-12 flex-shrink-0 bg-red-100 border-2 border-black flex items-center justify-center text-2xl shadow-[2px_2px_0px_0px_#000]">
                📿
              </div>
              <div>
                <h5 class="font-black text-lg underline decoration-2 decoration-red-500 underline-offset-2">强制装备</h5>
                <p class="text-sm font-bold mt-1 text-gray-800">
                  必须佩戴 <span class="text-red-600">大金链子</span> & <span class="text-blue-600">口哨</span>。
                  <span class="text-gray-500 font-normal block text-xs mt-0.5">"气质这块必须拿捏死"</span>
                </p>
              </div>
            </div>

            <!-- 喜钱行 -->
            <div class="flex gap-3 items-start">
              <div class="w-12 h-12 flex-shrink-0 bg-yellow-100 border-2 border-black flex items-center justify-center text-2xl shadow-[2px_2px_0px_0px_#000]">
                🧧
              </div>
              <div>
                <h5 class="font-black text-lg underline decoration-2 decoration-yellow-500 underline-offset-2">喜钱规矩</h5>
                <p class="text-sm font-bold mt-1 text-gray-800">
                  出现豹子或大赢家，需支付 <span class="bg-black text-white px-1">10</span> 筹码给NPC。
                </p>
              </div>
            </div>

            <!-- 轮换行 -->
            <div class="flex gap-3 items-start">
              <div class="w-12 h-12 flex-shrink-0 bg-blue-100 border-2 border-black flex items-center justify-center text-2xl shadow-[2px_2px_0px_0px_#000]">
                📢
              </div>
              <div>
                <h5 class="font-black text-lg underline decoration-2 decoration-blue-500 underline-offset-2">轮换机制</h5>
                <p class="text-sm font-bold mt-1 text-gray-800">
                  <span class="bg-yellow-300 px-1">嗓门大</span> 者优先上位！随时可申请换人。
                </p>
              </div>
            </div>
          </div>

          <!-- 底部 Footer -->
          <div class="mt-auto pt-4 flex justify-between items-end border-t-2 border-dashed border-gray-300">
            <div class="flex gap-1">
              <div class="w-9 h-9 bg-white rounded-md border-2 border-black grid place-items-center text-xl shadow-[3px_3px_0px_rgba(0,0,0,1)]">⚀</div>
              <div class="w-9 h-9 bg-white rounded-md border-2 border-black grid place-items-center text-xl shadow-[3px_3px_0px_rgba(0,0,0,1)]">⚂</div>
              <div class="w-9 h-9 bg-white rounded-md border-2 border-black grid place-items-center text-xl shadow-[3px_3px_0px_rgba(0,0,0,1)]">⚅</div>
            </div>
            <div class="text-right">
              <div class="text-xs font-black tracking-widest text-gray-400">CASINO NIGHT</div>
              <div class="font-black text-xl text-black uppercase">DESIGNED BY TPC</div>
            </div>
          </div>
        </section>
      </main>

      <!-- 装饰色块条 -->
      <div class="h-3 w-full flex border-t-4 border-black">
        <div class="w-1/4 bg-red-600 border-r-2 border-black"></div>
        <div class="w-1/4 bg-blue-600 border-r-2 border-black"></div>
        <div class="w-1/4 bg-yellow-400 border-r-2 border-black"></div>
        <div class="w-1/4 bg-white"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.poster-container {
  font-family: 'Noto Sans SC', sans-serif;
}
</style>
