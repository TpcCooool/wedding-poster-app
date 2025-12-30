<template>
  <div class="seating-container">
    <!-- 顶部控制面板 -->
    <div class="controls">
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

      <div class="control-group">
        <span class="control-label">EDIT / 编辑</span>
        <div class="btn-group">
          <button 
            class="btn-tab" 
            :class="{ active: editMode }"
            @click="editMode = !editMode"
          >✏️ {{ editMode ? '退出编辑' : '编辑模式' }}</button>
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
            v-for="(group, tableId) in guestsDB" 
            :key="tableId"
            class="table-group"
            :style="getTablePosition(tableId)"
          >
            <!-- 桌子圆圈 -->
            <div 
              class="table-circle"
              :style="{ borderColor: group.color, color: group.color }"
              @click="openModal(tableId, group)"
            >
              {{ formatTableId(tableId) }}
            </div>

            <!-- 概览标签 -->
            <div v-if="state.view === 'overview'" class="label-pill">
              {{ group.label }}
            </div>

            <!-- 卫星名单 -->
            <template v-else>
              <div 
                v-for="(name, idx) in getSatelliteNames(group.list)"
                :key="idx"
                class="satellite-name"
                :style="getSatellitePosition(idx, group.list.length)"
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
            <div v-if="editMode" style="margin-top:8px;">
              <input 
                v-model="editingLabel" 
                class="edit-input"
                placeholder="桌位标签"
                style="font-size:16px; padding:8px 12px; border:2px solid #E5E5EA; border-radius:8px; width:200px;"
              />
            </div>
            <p v-else style="font-size:18px; margin:4px 0 0 0;" :style="{ color: modalColor }">
              {{ modalLabel }}
            </p>
          </div>
          <button 
            @click="closeModal" 
            style="background:#F2F2F7; border:none; width:40px; height:40px; border-radius:50%; font-size:20px; color:#86868B; cursor:pointer;"
          >×</button>
        </div>
        
        <!-- 编辑模式 -->
        <div v-if="editMode">
          <div style="margin-bottom:16px;">
            <textarea 
              v-model="editingNames"
              class="edit-textarea"
              placeholder="每行一个名字，或用逗号/顿号分隔"
              style="width:100%; height:200px; padding:12px; border:2px solid #E5E5EA; border-radius:12px; font-size:15px; resize:vertical; font-family:inherit;"
            ></textarea>
          </div>
          <div style="display:flex; gap:12px; justify-content:flex-end;">
            <button @click="closeModal" class="modal-btn cancel">取消</button>
            <button @click="saveEdit" class="modal-btn save">保存</button>
          </div>
        </div>

        <!-- 查看模式 -->
        <div v-else style="display:flex; flex-wrap:wrap; gap:10px;">
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
import { ref, reactive, onMounted, onUnmounted } from 'vue'

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

// 颜色定义
const colors = {
  groom: '#007AFF',
  bride: '#FF2D55',
  family: '#AF52DE',
  elder: '#34C759',
  main: '#FF3B30'
}

// 宾客数据库 - 按新数据重新整理
const guestsDB = reactive<Record<string, GuestGroup>>({
  'main-L': { 
    label: '男方主桌 (10大)', 
    color: colors.main, 
    list: ['新郎', '新娘', '新郎爸', '新郎妈', '舅舅', '舅妈', '外婆', '叔叔', '婶婶', '黄士杰'] 
  },
  'main-R': { 
    label: '女方主桌 (9大+2小)', 
    color: colors.main, 
    list: ['虾仔舅', '娣舅', '岳父', '岳母', '姐姐x2', '哥哥x2', '陈湘怡', '宝宝椅x2'] 
  },
  't-1': { 
    label: '大姨家 (10人)', 
    color: colors.family, 
    list: ['大姨丈', '大尚哥', '大嫂', '大尚哥孩子x2', '小尚哥', '小嫂', '小尚哥孩子x3'] 
  },
  't-2': { 
    label: '三姨家 (9大1小)', 
    color: colors.family, 
    list: ['三姨', '三姨丈', '俊峰哥', '嫂子', '小孩', '俊哥', '瑶姐', '瑶姐夫', '燕燕', '燕燕丈夫'] 
  },
  't-3': { 
    label: '敏丽姐/佳萍姑姑 (9人)', 
    color: colors.family, 
    list: ['敏丽姐夫', '敏丽姐', '敏丽小孩x2', '圣圣', '佳萍姑姑', '姑丈', '佳萍小孩x2'] 
  },
  't-5': { 
    label: '高中同学B (9人)', 
    color: colors.groom, 
    list: ['邱拓先', '梁刚耀', '徐许杨', '华建', '陈佳胜', '龚神', '朱晴宇', '俊凯', '俊凯老婆'] 
  },
  't-6': { 
    label: '高中同学A (10人)', 
    color: colors.groom, 
    list: ['廖旺', '薛莹', '郭灏', '冯琪', '罗凯凯', '王思雨', '黄培强', '强嫂', '郭宇翔', '王之韵'] 
  },
  't-8': { 
    label: '大学/其他 (6人)', 
    color: colors.groom, 
    list: ['谢泽伟', '奥瑞', '郑建宁', '唐浩天', '朱哲聪', '徐渴望'] 
  },
  't-9': { 
    label: '女方亲戚 (10大)', 
    color: colors.bride, 
    list: ['姑妈', '姑夫', '碧倩', '春花舅妈', '丹丹', '大章', '小章', '明耀', '娣舅妈', '虾仔舅妈'] 
  },
  't-10': { 
    label: '父亲朋友A (11人)', 
    color: colors.elder, 
    list: ['少龙', '景云x2', '俊科x2', '福兴x2', '军岚x2', '远明x2'] 
  },
  't-11': { 
    label: '父亲朋友B (10人)', 
    color: colors.elder, 
    list: ['振忠', '渊洲x2', '运伟', '更晓', '袁思灵x2', '钟萍x2', '飞雁'] 
  },
  't-12': { 
    label: '母亲朋友 (8人)', 
    color: colors.elder, 
    list: ['吴云', '苹果', '端妮', '红霞', '戴德威x2', '玲玲x2'] 
  },
  't-13': { 
    label: '一叶同事 (11大+1小)', 
    color: colors.bride, 
    list: ['瞬沿x2', '俊伟x2', '远辉x2', '攀哥', '楠哥', '小灰', '婷姐x3'] 
  },
  't-15': { 
    label: '新娘朋友 (11大)', 
    color: colors.bride, 
    list: ['贾萱x2', '赖凤霞x2', '桐桐', '崔玉', '徐徐', '大曾', '胖妞x2', '陈捷'] 
  }
})

// 坐标系统 - 按图中位置
const coords: Record<string, Position> = {
  'main-L': { top: 200, right: '37%' },
  'main-R': { top: 200, left: '37%' },
  
  // 左侧内列 (原右侧)
  't-9': { top: 450, left: '37%' },
  't-11': { top: 700, left: '37%' },
  't-6': { top: 950, left: '37%' },

  // 右侧内列 (原左侧)
  't-1': { top: 450, right: '37%' },
  't-3': { top: 700, right: '37%' },
  't-5': { top: 950, right: '37%' },

  // 左侧外列 (原右侧)
  't-10': { top: 500, left: '15%' },
  't-12': { top: 800, left: '15%' },

  // 右侧外列 (原左侧)
  't-2': { top: 500, right: '15%' },
  't-8': { top: 800, right: '15%' },

  // 底部
  't-15': { top: 1150, left: '37%' },
  't-13': { top: 1150, right: '37%' }
}

// 状态
const state = ref<{ view: string }>({ view: 'overview' })
const editMode = ref(false)
const showModal = ref(false)
const modalTitle = ref('')
const modalLabel = ref('')
const modalColor = ref('')
const modalList = ref<string[]>([])
const currentTableId = ref('')
const editingLabel = ref('')
const editingNames = ref('')
const layout = ref<HTMLElement | null>(null)

// 方法
function setView(v: string) {
  state.value.view = v
}

function formatTableId(id: string): string {
  if (id === 'main-L') return '主L'
  if (id === 'main-R') return '主R'
  return id.replace('t-', '')
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
  const step = 360 / Math.min(total, 12)
  const angle = (step * idx) - 90
  const rad = angle * (Math.PI / 180)
  const x = Math.cos(rad) * radius
  const y = Math.sin(rad) * radius
  return {
    transform: `translate(${x}px, ${y}px)`
  }
}

function openModal(tableId: string, group: GuestGroup) {
  currentTableId.value = tableId
  if (tableId === 'main-L') {
    modalTitle.value = '主桌 L (男方)'
  } else if (tableId === 'main-R') {
    modalTitle.value = '主桌 R (女方)'
  } else {
    modalTitle.value = `${tableId.replace('t-', '')} 号桌`
  }
  modalLabel.value = group.label
  modalColor.value = group.color
  modalList.value = group.list
  editingLabel.value = group.label
  editingNames.value = group.list.join('\n')
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

function saveEdit() {
  const tableId = currentTableId.value
  if (!tableId || !guestsDB[tableId]) return
  
  // 解析名字（支持换行、逗号、顿号分隔）
  const names = editingNames.value
    .split(/[\n,、，]/)
    .map(n => n.trim())
    .filter(n => n.length > 0)
  
  guestsDB[tableId].label = editingLabel.value
  guestsDB[tableId].list = names
  modalLabel.value = editingLabel.value
  modalList.value = names
  
  closeModal()
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
  font-size: 28px;
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
  font-size: 16px;
  font-weight: 700;
  color: #1D1D1F;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1), 0 0 1px rgba(0, 0, 0, 0.08);
  white-space: nowrap;
  z-index: 10;
  border: 1px solid rgba(0, 0, 0, 0.06);
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
  width: 520px;
  max-height: 80vh;
  overflow-y: auto;
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

/* 编辑模式按钮 */
.modal-btn {
  padding: 12px 28px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.modal-btn.cancel {
  background: #F2F2F7;
  color: #1D1D1F;
}

.modal-btn.cancel:hover {
  background: #E5E5EA;
}

.modal-btn.save {
  background: #007AFF;
  color: white;
}

.modal-btn.save:hover {
  background: #0051D5;
}

.edit-input:focus,
.edit-textarea:focus {
  outline: none;
  border-color: #007AFF;
}
</style>
