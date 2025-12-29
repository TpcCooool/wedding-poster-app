<template>
  <div class="seating-container">
    <!-- 顶部控制面板 -->
    <div class="controls">
      <div class="control-group">
        <span class="control-label">SCENARIO / 情景</span>
        <div class="btn-group">
          <button 
            class="btn-tab" 
            :class="{ active: state.scen === 'A' }"
            @click="setScenario('A')"
          >🎉 互动优先</button>
          <button 
            class="btn-tab" 
            :class="{ active: state.scen === 'B' }"
            @click="setScenario('B')"
          >🍵 长辈优先</button>
        </div>
      </div>

      <div class="control-group">
        <span class="control-label">VARIATION / 方案</span>
        <div class="btn-group">
          <button 
            v-for="v in [1, 2, 3]" 
            :key="v"
            class="btn-tab" 
            :class="{ active: state.vari === v }"
            @click="setVariation(v as any)"
          >方案 {{ v }}</button>
        </div>
      </div>

      <div class="control-group">
        <span class="control-label">VIEW / 视图</span>
        <div class="btn-group">
          <button 
            class="btn-tab" 
            :class="{ active: state.view === 'overview' }"
            @click="setView('overview')"
          >📍 概览标签</button>
          <button 
            class="btn-tab" 
            :class="{ active: state.view === 'names' }"
            @click="setView('names')"
          >👥 详细名单</button>
        </div>
      </div>
    </div>

    <!-- 画布 -->
    <div class="canvas-wrapper">
      <div class="layout-container" ref="layout">
        <div class="right-accent"></div>

        <div class="stage-area">婚礼主舞台 STAGE</div>
        <div class="runway"></div>
        <div class="runway-label">T-Walkway / 互动区</div>

        <!-- 动态生成的桌子层 -->
        <div id="tables-layer">
          <div 
            v-for="(groupKey, tableId) in currentLayout" 
            :key="tableId"
            class="table-group"
            :style="getTablePosition(tableId)"
          >
            <!-- 桌子圆圈 -->
            <div 
              class="table-circle"
              :style="{ borderColor: guestsDB[groupKey].color, color: guestsDB[groupKey].color }"
              @click="openModal(tableId, guestsDB[groupKey])"
            >
              {{ formatTableId(tableId) }}
            </div>

            <!-- 概览标签 -->
            <div v-if="state.view === 'overview'" class="label-pill">
              {{ guestsDB[groupKey].label }}
            </div>

            <!-- 卫星名单 -->
            <template v-else>
              <div 
                v-for="(name, idx) in getSatelliteNames(guestsDB[groupKey].list)"
                :key="idx"
                class="satellite-name"
                :style="getSatellitePosition(idx, guestsDB[groupKey].list.length)"
              >
                {{ name }}
              </div>
            </template>
          </div>
        </div>

        <!-- 装饰柱 -->
        <div class="pillar" style="top: 300px; left: 16%"></div>
        <div class="pillar" style="top: 600px; left: 16%"></div>
        <div class="pillar" style="top: 900px; left: 16%"></div>
        
        <div class="pillar" style="top: 300px; right: 16%"></div>
        <div class="pillar" style="top: 600px; right: 16%"></div>
        <div class="pillar" style="top: 900px; right: 16%"></div>

        <div class="entrance">Entrance 入口 →</div>
      </div>
    </div>

    <!-- 弹窗 -->
    <div 
      id="modal-overlay" 
      :class="{ active: showModal }"
      @click="closeModal"
    >
      <div class="modal-card" @click.stop>
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:20px;">
          <div>
            <h2 style="font-size:36px; font-weight:800; color:#1D1D1F; margin:0;">
              {{ modalTitle }}
            </h2>
            <p style="font-size:18px; margin:4px 0 0 0;" :style="{ color: modalColor }">
              {{ modalLabel }}
            </p>
          </div>
          <button 
            @click="closeModal" 
            style="background:#F2F2F7; border:none; width:40px; height:40px; border-radius:50%; font-size:20px; color:#86868B; cursor:pointer;"
          >×</button>
        </div>
        
        <div style="display:flex; flex-wrap:wrap; gap:10px;">
          <span 
            v-for="(name, idx) in modalList"
            :key="idx"
            :style="{ 
              background: modalColor + '20', 
              color: modalColor,
              padding: '8px 16px',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '16px'
            }"
          >
            {{ name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface GuestGroup {
  label: string
  color: string
  list: string[]
}

interface Position {
  top?: number
  left?: string
  right?: string
}

type ScenarioKey = 'A' | 'B'
type VariationKey = 1 | 2 | 3

// 颜色定义
const colors = {
  groom: '#007AFF',
  bride: '#FF2D55',
  family: '#AF52DE',
  elder: '#34C759',
  main: '#FF3B30'
}

// 宾客数据库
const guestsDB: Record<string, GuestGroup> = {
  main_groom: { label: '男方主桌', color: colors.main, list: ['新郎', '新娘', '新郎爸', '新郎妈', '舅舅', '外婆', '叔叔', '婶婶'] },
  main_bride: { label: '女方主桌', color: colors.main, list: ['虾仔舅', '娣舅', '岳父', '岳母', '姐姐x2', '哥哥x2', '陈湘怡'] },

  g_hs_1: { label: '高中同学 A', color: colors.groom, list: ['廖旺', '薛莹', '郭灏', '冯琪', '罗凯凯', '王思雨', '邱拓先', '汪思贝'] },
  g_hs_2: { label: '高中同学 B', color: colors.groom, list: ['黄培强', '强嫂', '郭宇翔', '王之韵', '梁刚耀', '徐许杨', '华建'] },
  g_uni: { label: '大学/小学', color: colors.groom, list: ['陈佳胜', '龚神', '朱晴宇', '俊凯夫妇', '谢泽伟', '奥瑞', '郑建宁', '唐浩天'] },
  
  g_fam_dad: { label: '男方父系亲戚', color: colors.family, list: ['敏丽姐一家', '佳萍姑姑家', '黄士杰'] },
  g_fam_mom1: { label: '男方母系亲戚 A', color: colors.family, list: ['三姨一家', '舅舅一家'] },
  g_fam_mom2: { label: '男方母系亲戚 B', color: colors.family, list: ['大姨一家', '小尚哥一家'] },
  
  g_dad_fri_all: { label: '父亲朋友 (大桌)', color: colors.elder, list: ['少龙', '景云', '俊科', '福兴', '军岚', '远明', '振忠', '渊洲', '运伟'] },
  g_mom_fri: { label: '母亲朋友', color: colors.elder, list: ['吴云', '苹果', '端妮', '红霞', '燕燕', '袁思灵'] },
  
  b_coll: { label: '一叶同事', color: colors.bride, list: ['瞬沿', '俊伟', '远辉', '攀哥', '楠哥', '小灰', '婷姐'] },
  b_fri_1: { label: '新娘朋友 A', color: colors.bride, list: ['胖妞', '玲玲', '贾萱', '戴德威'] },
  b_fri_2: { label: '新娘朋友 B', color: colors.bride, list: ['赖凤霞', '徐徐', '大曾', '桐桐', '崔玉', '陈捷'] },
  b_fam: { label: '女方亲戚', color: colors.family, list: ['虾仔舅家', '娣舅家', '姑妈家'] }
}

// 坐标系统
const coords: Record<string, Position> = {
  'main-L': { top: 200, left: '37%' },
  'main-R': { top: 200, right: '37%' },
  
  't-9': { top: 450, left: '37%' },
  't-11': { top: 700, left: '37%' },
  't-13': { top: 950, left: '37%' },
  't-15': { top: 1200, left: '37%' },

  't-1': { top: 450, right: '37%' },
  't-3': { top: 700, right: '37%' },
  't-6': { top: 950, right: '37%' },
  't-8': { top: 1200, right: '37%' },

  't-10': { top: 500, left: '15%' },
  't-12': { top: 850, left: '15%' },

  't-2': { top: 500, right: '15%' },
  't-5': { top: 850, right: '15%' }
}

// 方案配置
const scenarios: Record<ScenarioKey, Record<VariationKey, Record<string, string>>> = {
  A: {
    1: {
      'main-L': 'main_groom', 'main-R': 'main_bride',
      't-9': 'g_hs_1', 't-11': 'g_hs_2',
      't-1': 'b_fri_1', 't-3': 'b_fri_2',
      't-13': 'g_uni', 't-15': 'b_coll',
      't-10': 'g_fam_dad', 't-12': 'g_fam_mom1',
      't-2': 'g_dad_fri_all', 't-5': 'g_mom_fri',
      't-6': 'g_fam_mom2', 't-8': 'b_fam'
    },
    2: {
      'main-L': 'main_groom', 'main-R': 'main_bride',
      't-9': 'g_hs_1', 't-11': 'b_coll',
      't-1': 'b_fri_1', 't-3': 'g_uni',
      't-13': 'g_hs_2', 't-15': 'b_fri_2',
      't-10': 'g_fam_dad', 't-12': 'g_fam_mom1',
      't-2': 'g_mom_fri', 't-5': 'b_fam',
      't-6': 'g_dad_fri_all', 't-8': 'g_fam_mom2'
    },
    3: {
      'main-L': 'main_groom', 'main-R': 'main_bride',
      't-9': 'g_hs_1', 't-11': 'g_hs_2',
      't-13': 'g_uni', 't-15': 'b_coll',
      't-1': 'b_fri_1', 't-3': 'b_fri_2',
      't-10': 'g_fam_mom1', 't-12': 'g_fam_mom2',
      't-2': 'g_dad_fri_all', 't-5': 'g_mom_fri',
      't-6': 'b_fam', 't-8': 'g_fam_dad'
    }
  },
  B: {
    1: {
      'main-L': 'main_groom', 'main-R': 'main_bride',
      't-9': 'g_fam_dad', 't-11': 'g_fam_mom1',
      't-1': 'b_fam', 't-3': 'g_fam_mom2',
      't-10': 'g_dad_fri_all', 't-12': 'g_mom_fri',
      't-13': 'g_hs_1', 't-15': 'g_hs_2',
      't-6': 'b_fri_1', 't-8': 'b_fri_2',
      't-2': 'b_coll', 't-5': 'g_uni'
    },
    2: {
      'main-L': 'main_groom', 'main-R': 'main_bride',
      't-9': 'g_dad_fri_all', 't-11': 'g_mom_fri',
      't-1': 'b_fam', 't-3': 'g_fam_dad',
      't-13': 'g_fam_mom1', 't-15': 'g_fam_mom2',
      't-10': 'g_hs_1', 't-12': 'g_uni',
      't-2': 'b_fri_1', 't-5': 'b_fri_2',
      't-6': 'g_hs_2', 't-8': 'b_coll'
    },
    3: {
      'main-L': 'main_groom', 'main-R': 'main_bride',
      't-9': 'g_fam_mom1', 't-11': 'g_fam_mom2',
      't-1': 'g_dad_fri_all', 't-3': 'g_mom_fri',
      't-10': 'g_fam_dad', 't-12': 'b_fam',
      't-13': 'g_hs_1', 't-15': 'g_hs_2',
      't-2': 'b_fri_1', 't-5': 'b_fri_2',
      't-6': 'g_uni', 't-8': 'b_coll'
    }
  }
}

// 状态
const state = ref<{ scen: ScenarioKey; vari: VariationKey; view: string }>({ scen: 'A', vari: 1, view: 'overview' })
const showModal = ref(false)
const modalTitle = ref('')
const modalLabel = ref('')
const modalColor = ref('')
const modalList = ref<string[]>([])
const layout = ref<HTMLElement | null>(null)

// 计算属性
const currentLayout = computed(() => scenarios[state.value.scen][state.value.vari])

// 方法
function setScenario(v: ScenarioKey) {
  state.value.scen = v
}

function setVariation(v: VariationKey) {
  state.value.vari = v
}

function setView(v: string) {
  state.value.view = v
}

function formatTableId(id: string): string {
  return id.includes('主') ? id + '桌' : `No. ${id.replace('t-', '')}`
}

function getTablePosition(tableId: string) {
  const pos = coords[tableId]
  if (!pos) return {}
  const style: Record<string, string> = { top: (pos.top || 0) + 'px' }
  if (pos.left) style.left = pos.left
  if (pos.right) style.right = pos.right
  return style
}

function getSatelliteNames(list: string[]): string[] {
  return list.slice(0, 12).map(n => n.split('x')[0])
}

function getSatellitePosition(idx: number, total: number) {
  const radius = 115
  const step = 360 / total
  const angle = (step * idx) - 90
  const rad = angle * (Math.PI / 180)
  const x = Math.cos(rad) * radius
  const y = Math.sin(rad) * radius
  return {
    transform: `translate(${x}px, ${y}px)`
  }
}

function openModal(tableId: string, group: GuestGroup) {
  modalTitle.value = tableId.includes('主') ? tableId + '桌' : `No. ${tableId.replace('t-', '')}`
  modalLabel.value = group.label
  modalColor.value = group.color
  modalList.value = group.list
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

function handleResize() {
  if (!layout.value) return
  const wrap = layout.value.parentElement
  if (!wrap) return
  const scale = Math.min(
    (wrap.clientWidth - 40) / 1600,
    (wrap.clientHeight - 40) / 1400
  )
  const s = Math.max(scale, 0.25)
  layout.value.style.transform = `scale(${s})`
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
/* --- Apple System Fonts & Basics --- */
.seating-container {
  background: linear-gradient(135deg, #F5F5F7 0%, #E8E8ED 100%);
  color: #1D1D1F;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", "PingFang SC", "Microsoft YaHei", sans-serif;
  margin: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  -webkit-font-smoothing: antialiased;
}

/* --- 顶部控制栏 (Glassmorphism) --- */
.controls {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding: 20px 30px;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
}

.control-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.control-label {
  font-size: 11px;
  font-weight: 700;
  color: #86868B;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.btn-group {
  background: rgba(229, 229, 234, 0.6);
  backdrop-filter: blur(10px);
  padding: 6px;
  border-radius: 14px;
  display: flex;
  gap: 3px;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.04);
}

.btn-tab {
  padding: 10px 22px;
  border-radius: 10px;
  border: none;
  background: transparent;
  font-size: 14px;
  font-weight: 600;
  color: #1D1D1F;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  white-space: nowrap;
}

.btn-tab:hover:not(.active) {
  color: #000;
  background: rgba(255, 255, 255, 0.3);
}

.btn-tab.active {
  background: #FFFFFF;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.8);
  font-weight: 700;
  color: #007AFF;
}

/* --- 画布区域 --- */
.canvas-wrapper {
  flex: 1;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #F5F5F7 0%, #E8E8ED 100%);
  cursor: grab;
  display: flex;
  justify-content: center;
  align-items: center;
}

.canvas-wrapper:active {
  cursor: grabbing;
}

/* 布局容器 */
.layout-container {
  width: 1600px;
  height: 1400px;
  background: linear-gradient(135deg, #FFFFFF 0%, #F9F9FB 100%);
  border-radius: 80px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.12), 0 0 1px rgba(0, 0, 0, 0.05);
  position: relative;
  transform-origin: center center;
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  border: 1px solid rgba(255, 255, 255, 0.8);
}

/* 右侧装饰线 */
.right-accent {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 8px;
  background: linear-gradient(180deg, #BFDBFE 0%, #93C5FD 100%);
  border-top-right-radius: 80px;
  border-bottom-right-radius: 80px;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.08);
}

/* --- 舞台区域 --- */
.stage-area {
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 700px;
  height: 90px;
  background: linear-gradient(135deg, #FF3B30 0%, #FF2D55 100%);
  border-radius: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 32px;
  font-weight: 800;
  letter-spacing: 4px;
  box-shadow: 0 16px 40px rgba(255, 45, 85, 0.35), 0 0 1px rgba(0, 0, 0, 0.1);
  z-index: 10;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* T台 */
.runway {
  position: absolute;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  width: 140px;
  height: 750px;
  background: linear-gradient(180deg, #5AC8FA 0%, #007AFF 100%);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  opacity: 0.12;
  z-index: 1;
  pointer-events: none;
  box-shadow: 0 8px 24px rgba(0, 122, 255, 0.15);
}

.runway-label {
  position: absolute;
  top: 400px;
  left: 50%;
  transform: translateX(-50%);
  color: #007AFF;
  font-weight: 800;
  font-size: 24px;
  letter-spacing: 2px;
  opacity: 0.4;
  z-index: 1;
  pointer-events: none;
  white-space: nowrap;
}

/* --- 桌子组件 --- */
.table-group {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  z-index: 20;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* 桌子圆圈 */
.table-circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FFFFFF 0%, #F9F9FB 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: 800;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.14), 0 0 1px rgba(0, 0, 0, 0.08);
  border: 4px solid;
  cursor: pointer;
  z-index: 5;
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
}

.table-circle::before {
  content: '';
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.25s ease;
}

.table-circle:hover {
  transform: scale(1.15);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.2), 0 0 1px rgba(0, 0, 0, 0.1);
}

.table-circle:hover::before {
  opacity: 1;
}

/* 概览标签 */
.label-pill {
  margin-top: 18px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  padding: 12px 28px;
  border-radius: 99px;
  font-size: 18px;
  font-weight: 700;
  color: #1D1D1F;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1), 0 0 1px rgba(0, 0, 0, 0.08);
  white-space: nowrap;
  z-index: 10;
  border: 1px solid rgba(0, 0, 0, 0.06);
  max-width: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 0.25s ease;
}

.label-pill:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

/* 卫星名单 */
.satellite-name {
  position: absolute;
  font-size: 15px;
  font-weight: 700;
  color: #1D1D1F;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  padding: 7px 16px;
  border-radius: 14px;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.06);
  pointer-events: none;
  z-index: 2;
  transform-origin: center center;
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
}

/* 装饰元素 */
.pillar {
  position: absolute;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #F2F2F7 0%, #E8E8ED 100%);
  border: 2px solid rgba(0, 0, 0, 0.08);
  border-radius: 14px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.entrance {
  position: absolute;
  bottom: 80px;
  right: -40px;
  background: linear-gradient(135deg, #007AFF 0%, #0051D5 100%);
  color: white;
  padding: 16px 40px;
  border-radius: 24px;
  font-size: 24px;
  font-weight: 800;
  box-shadow: 0 12px 32px rgba(0, 122, 255, 0.35), 0 0 1px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  letter-spacing: 1px;
}

/* 弹窗 */
#modal-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(12px);
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  justify-content: center;
  align-items: center;
}

#modal-overlay.active {
  display: flex;
  opacity: 1;
}

.modal-card {
  background: linear-gradient(135deg, #FFFFFF 0%, #F9F9FB 100%);
  width: 480px;
  border-radius: 40px;
  padding: 40px;
  box-shadow: 0 50px 100px rgba(0, 0, 0, 0.25), 0 0 1px rgba(0, 0, 0, 0.1);
  transform: scale(0.9);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  border: 1px solid rgba(255, 255, 255, 0.8);
}

#modal-overlay.active .modal-card {
  transform: scale(1);
}
</style>
