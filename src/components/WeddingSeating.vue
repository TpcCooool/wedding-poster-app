<template>
  <div class="seating-container">
    <!-- 左侧名单面板 -->
    <div class="sidebar">
      <div class="sidebar-header">
        <h2>宾客名单</h2>
        <span class="guest-count">共 {{ totalGuests }} 人</span>
      </div>
      
      <div class="guest-categories">
        <div 
          v-for="(category, catKey) in allGuestsByCategory" 
          :key="catKey"
          class="category-section"
        >
          <div 
            class="category-header"
            :style="{ borderLeftColor: category.color }"
            @click="toggleCategory(catKey)"
          >
            <span>{{ category.label }}</span>
            <span class="category-count">{{ category.guests.length }}</span>
          </div>
          
          <div v-show="expandedCategories[catKey]" class="category-guests">
            <div
              v-for="guestInfo in category.guests"
              :key="guestInfo.name"
              class="guest-chip"
              :class="{ assigned: guestInfo.tableId }"
              :style="{ backgroundColor: category.color + '20', color: category.color }"
              draggable="true"
              @dragstart="onDragStart($event, guestInfo.name, catKey, guestInfo.tableId)"
            >
              {{ guestInfo.name }}
              <span v-if="guestInfo.tableId" class="table-badge">{{ formatTableId(guestInfo.tableId) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 操作教程 -->
      <div class="tutorial">
        <div class="tutorial-title">📖 操作指南</div>
        <div class="tutorial-item">🖱️ <b>点击桌子</b> 查看/编辑宾客</div>
        <div class="tutorial-item">✋ <b>拖拽桌子</b> 移动位置</div>
        <div class="tutorial-item">👆 <b>拖拽宾客</b> 换座位</div>
        <div class="tutorial-item">💾 <b>保存方案</b> 记录布局</div>
        <div class="tutorial-item">↩️ <b>撤销/重做</b> 回退操作</div>
      </div>
    </div>

    <!-- 主内容区 -->
    <div class="main-content">
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
              :disabled="historyStack.length === 0"
              @click="undo"
            >↩️ 撤销</button>
            <button 
              class="btn-tab" 
              :disabled="redoStack.length === 0"
              @click="redo"
            >↪️ 重做</button>
          </div>
        </div>

        <div class="control-group">
          <span class="control-label">DATA / 数据</span>
          <div class="btn-group">
            <button class="btn-tab" @click="showSaveDialog = true">💾 保存方案</button>
            <button class="btn-tab" @click="showHistoryPanel = !showHistoryPanel">📋 历史记录</button>
            <button class="btn-tab" @click="resetToDefault">🔄 重置</button>
          </div>
        </div>
      </div>

      <!-- 历史记录面板 -->
      <div v-if="showHistoryPanel" class="history-panel">
        <div class="history-header">
          <h3>保存的方案</h3>
          <button class="close-btn" @click="showHistoryPanel = false">×</button>
        </div>
        <div v-if="savedRecords.length === 0" class="history-empty">暂无保存记录</div>
        <div v-else class="history-list">
          <div 
            v-for="(record, idx) in savedRecords" 
            :key="idx"
            class="history-item"
            @click="loadRecord(record)"
          >
            <div class="history-info">
              <span class="history-name">{{ record.name }}</span>
              <span class="history-time">{{ formatTime(record.time) }}</span>
            </div>
            <button class="delete-btn" @click.stop="deleteRecord(idx)">🗑</button>
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
          <div id="tables-layer" ref="tablesLayer">
            <div 
              v-for="(table, tableId) in tables" 
              :key="tableId"
              class="table-group"
              :class="{ 'dragging-table': draggingTableId === tableId }"
              :style="getTablePosition(tableId)"
              @dragover.prevent
              @drop="onDropToTable($event, tableId)"
            >
              <!-- 桌子圆圈 -->
              <div 
                class="table-circle"
                :class="{ 'drag-over': dragOverTable === tableId }"
                :style="{ borderColor: table.color, color: table.color }"
                @dragenter="dragOverTable = tableId"
                @dragleave="dragOverTable = ''"
                @mousedown="startTableDrag($event, tableId)"
                @touchstart="startTableDrag($event, tableId)"
              >
                {{ formatTableId(tableId) }}
              </div>

              <!-- 概览标签 -->
              <div v-if="state.view === 'overview'" class="label-pill">
                {{ table.label }} ({{ countGuests(table.guests) }})
              </div>

              <!-- 卫星名单 -->
              <template v-else>
                <div 
                  v-for="(name, idx) in getSatelliteNames(table.guests)"
                  :key="idx"
                  class="satellite-name"
                  :style="getSatellitePosition(idx, Math.min(table.guests.length, 12))"
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
    </div>

    <!-- 弹窗 -->
    <div 
      id="modal-overlay" 
      :class="{ active: showModal }"
      @click="closeModal"
    >
      <div class="modal-card" @click.stop>
        <div class="modal-header">
          <div>
            <h2>{{ modalTitle }}</h2>
            <p :style="{ color: modalColor }">{{ modalLabel }}</p>
          </div>
          <button class="close-btn" @click="closeModal">×</button>
        </div>
        
        <div class="modal-guests">
          <div
            v-for="(name, idx) in modalGuests"
            :key="idx"
            class="modal-guest-chip"
            :style="{ backgroundColor: modalColor + '20', color: modalColor }"
          >
            {{ name }}
            <button class="remove-btn" @click="removeGuestFromTable(name)">×</button>
          </div>
        </div>

        <div 
          class="drop-zone"
          @dragover.prevent
          @drop="onDropToModal($event)"
        >
          拖拽宾客到这里添加
        </div>
      </div>
    </div>

    <!-- 保存对话框 -->
    <div 
      class="save-dialog-overlay" 
      :class="{ active: showSaveDialog }"
      @click="showSaveDialog = false"
    >
      <div class="save-dialog" @click.stop>
        <h3>保存当前方案</h3>
        <input 
          v-model="saveName" 
          type="text" 
          placeholder="输入方案名称（如：方案A、最终版）"
          class="save-input"
          @keyup.enter="saveRecord"
        />
        <div class="save-actions">
          <button class="btn-cancel" @click="showSaveDialog = false">取消</button>
          <button class="btn-save" @click="saveRecord">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

interface Category {
  label: string
  color: string
  guests: string[]
}

interface Table {
  label: string
  color: string
  guests: string[]
}

interface Position {
  top: number
  left?: string
  right?: string
}

interface SavedRecord {
  name: string
  time: number
  data: Record<string, string[]>
  coords?: Record<string, Position>
}

// 颜色定义
const colors = {
  groom: '#007AFF',
  groomDad: '#AF52DE',
  groomMom: '#FF9500',
  groomDadFri: '#34C759',
  groomMomFri: '#30D158',
  bride: '#FF2D55',
  brideFri: '#FF375F',
  brideWork: '#BF5AF2',
  main: '#FF3B30'
}

// 宾客池 - 按分类（用于侧边栏显示）
const guestPool = reactive<Record<string, Category>>({
  groom_main: {
    label: '男方主桌',
    color: colors.main,
    guests: ['新郎', '新娘', '新郎爸', '新郎妈', '舅舅', '舅妈', '外婆', '叔叔', '婶婶', '黄士杰']
  },
  groom_hs: {
    label: '新郎高中/大学同学',
    color: colors.groom,
    guests: ['廖旺', '薛莹', '郭灏', '冯琪', '罗凯凯', '王思雨', '黄培强', '强嫂', '郭宇翔', '王之韵', '邱拓先', '梁刚耀', '徐许杨', '华建', '陈佳胜', '龚神', '朱晴宇', '俊凯', '俊凯老婆']
  },
  groom_primary: {
    label: '新郎小学同学',
    color: colors.groom,
    guests: ['谢泽伟', '奥瑞', '郑建宁', '唐浩天', '朱哲聪', '徐渴望']
  },
  groom_dad_rel: {
    label: '新郎爸爸亲戚',
    color: colors.groomDad,
    guests: ['敏丽姐夫', '敏丽姐', '敏丽小孩x2', '圣圣', '佳萍姑姑', '姑丈', '佳萍小孩x2']
  },
  groom_mom_rel: {
    label: '新郎妈妈亲戚',
    color: colors.groomMom,
    guests: ['三姨', '三姨丈', '俊峰哥', '嫂子', '小孩', '俊哥', '瑶姐', '瑶姐夫', '燕燕', '燕燕丈夫', '大姨丈', '大尚哥', '大嫂', '大尚哥孩子x2', '小尚哥', '小嫂', '小尚哥孩子x3']
  },
  groom_dad_fri: {
    label: '新郎爸爸朋友',
    color: colors.groomDadFri,
    guests: ['少龙', '景云x2', '俊科x2', '福兴x2', '军岚x2', '远明x2', '振忠', '渊洲x2', '运伟', '更晓', '袁思灵x2', '钟萍x2', '飞雁']
  },
  groom_mom_fri: {
    label: '新郎妈妈朋友',
    color: colors.groomMomFri,
    guests: ['吴云', '苹果', '端妮', '红霞', '戴德威x2', '玲玲x2']
  },
  bride_main: {
    label: '女方主桌',
    color: colors.main,
    guests: ['虾仔舅', '娣舅', '岳父', '岳母', '姐姐x2', '哥哥x2', '陈湘怡', '宝宝椅x2']
  },
  bride_rel: {
    label: '新娘亲友',
    color: colors.bride,
    guests: ['姑妈', '姑夫', '碧倩', '春花舅妈', '丹丹', '大章', '小章', '明耀', '娣舅妈', '虾仔舅妈']
  },
  bride_work: {
    label: '一叶同事',
    color: colors.brideWork,
    guests: ['瞬沿x2', '俊伟x2', '远辉x2', '攀哥', '楠哥', '小灰', '婷姐x3']
  },
  bride_fri: {
    label: '新娘朋友',
    color: colors.brideFri,
    guests: ['贾萱x2', '赖凤霞x2', '桐桐', '崔玉', '徐徐', '大曾', '胖妞x2', '陈捷']
  }
})

// 桌子数据 - 按名单初始化
const tables = reactive<Record<string, Table>>({
  'main-L': { 
    label: '男方主桌 (10大)', 
    color: colors.main, 
    guests: ['新郎', '新娘', '新郎爸', '新郎妈', '舅舅', '舅妈', '外婆', '叔叔', '婶婶', '黄士杰'] 
  },
  'main-R': { 
    label: '女方主桌 (9大+2小)', 
    color: colors.main, 
    guests: ['虾仔舅', '娣舅', '岳父', '岳母', '姐姐x2', '哥哥x2', '陈湘怡', '宝宝椅x2'] 
  },
  't-1': { 
    label: '大姨家 (10人)', 
    color: colors.groomMom, 
    guests: ['大姨丈', '大尚哥', '大嫂', '大尚哥孩子x2', '小尚哥', '小嫂', '小尚哥孩子x3'] 
  },
  't-2': { 
    label: '三姨家 (9大1小)', 
    color: colors.groomMom, 
    guests: ['三姨', '三姨丈', '俊峰哥', '嫂子', '小孩', '俊哥', '瑶姐', '瑶姐夫', '燕燕', '燕燕丈夫'] 
  },
  't-3': { 
    label: '敏丽姐/佳萍姑姑 (9人)', 
    color: colors.groomDad, 
    guests: ['敏丽姐夫', '敏丽姐', '敏丽小孩x2', '圣圣', '佳萍姑姑', '姑丈', '佳萍小孩x2'] 
  },
  't-5': { 
    label: '高中同学B (9人)', 
    color: colors.groom, 
    guests: ['邱拓先', '梁刚耀', '徐许杨', '华建', '陈佳胜', '龚神', '朱晴宇', '俊凯', '俊凯老婆'] 
  },
  't-6': { 
    label: '高中同学A (10人)', 
    color: colors.groom, 
    guests: ['廖旺', '薛莹', '郭灏', '冯琪', '罗凯凯', '王思雨', '黄培强', '强嫂', '郭宇翔', '王之韵'] 
  },
  't-8': { 
    label: '小学同学 (6人)', 
    color: colors.groom, 
    guests: ['谢泽伟', '奥瑞', '郑建宁', '唐浩天', '朱哲聪', '徐渴望'] 
  },
  't-9': { 
    label: '女方亲戚 (10大)', 
    color: colors.bride, 
    guests: ['姑妈', '姑夫', '碧倩', '春花舅妈', '丹丹', '大章', '小章', '明耀', '娣舅妈', '虾仔舅妈'] 
  },
  't-10': { 
    label: '父亲朋友A (11人)', 
    color: colors.groomDadFri, 
    guests: ['少龙', '景云x2', '俊科x2', '福兴x2', '军岚x2', '远明x2'] 
  },
  't-11': { 
    label: '父亲朋友B (10人)', 
    color: colors.groomDadFri, 
    guests: ['振忠', '渊洲x2', '运伟', '更晓', '袁思灵x2', '钟萍x2', '飞雁'] 
  },
  't-12': { 
    label: '母亲朋友 (8人)', 
    color: colors.groomMomFri, 
    guests: ['吴云', '苹果', '端妮', '红霞', '戴德威x2', '玲玲x2'] 
  },
  't-13': { 
    label: '一叶同事 (11大+1小)', 
    color: colors.brideWork, 
    guests: ['瞬沿x2', '俊伟x2', '远辉x2', '攀哥', '楠哥', '小灰', '婷姐x3'] 
  },
  't-15': { 
    label: '新娘朋友 (11大)', 
    color: colors.brideFri, 
    guests: ['贾萱x2', '赖凤霞x2', '桐桐', '崔玉', '徐徐', '大曾', '胖妞x2', '陈捷'] 
  }
})

// 坐标系统（改为 reactive 支持拖拽修改）
const coords = reactive<Record<string, Position>>({
  'main-L': { top: 200, right: '37%' },
  'main-R': { top: 200, left: '37%' },
  't-9': { top: 450, left: '37%' },
  't-11': { top: 700, left: '37%' },
  't-6': { top: 950, left: '37%' },
  't-1': { top: 450, right: '37%' },
  't-3': { top: 700, right: '37%' },
  't-5': { top: 950, right: '37%' },
  't-10': { top: 500, left: '15%' },
  't-12': { top: 800, left: '15%' },
  't-2': { top: 500, right: '15%' },
  't-8': { top: 800, right: '15%' },
  't-15': { top: 1150, left: '37%' },
  't-13': { top: 1150, right: '37%' }
})

// 状态
const state = ref<{ view: string }>({ view: 'overview' })
const showModal = ref(false)
const modalTitle = ref('')
const modalLabel = ref('')
const modalColor = ref('')
const modalGuests = ref<string[]>([])
const currentTableId = ref('')
const layout = ref<HTMLElement | null>(null)
const tablesLayer = ref<HTMLElement | null>(null)
const expandedCategories = reactive<Record<string, boolean>>({})
const dragOverTable = ref('')
const draggingGuest = ref('')
const draggingFrom = ref('')
const draggingFromTable = ref('')
const showSaveDialog = ref(false)
const showHistoryPanel = ref(false)
const saveName = ref('')
const savedRecords = ref<SavedRecord[]>([])

// 桌子拖拽状态
const draggingTableId = ref('')
const tableStartX = ref(0)
const tableStartY = ref(0)
const tableOriginalPos = ref<Position | null>(null)
const tableDragged = ref(false) // 是否真正发生了拖拽

// 初始化展开状态
Object.keys(guestPool).forEach(key => {
  expandedCategories[key] = true
})

// localStorage 存储 key
const STORAGE_KEY = 'wedding-seating-tables'
const RECORDS_KEY = 'wedding-seating-records'
const COORDS_KEY = 'wedding-seating-coords'

// 撤销/重做历史
const historyStack = ref<Record<string, string[]>[]>([])
const redoStack = ref<Record<string, string[]>[]>([])
const MAX_HISTORY = 50

// 获取当前状态快照
function getSnapshot(): Record<string, string[]> {
  const data: Record<string, string[]> = {}
  for (const [tableId, table] of Object.entries(tables)) {
    data[tableId] = [...table.guests]
  }
  return data
}

// 记录历史（在修改前调用）
function pushHistory() {
  historyStack.value.push(getSnapshot())
  if (historyStack.value.length > MAX_HISTORY) {
    historyStack.value.shift()
  }
  redoStack.value = [] // 新操作清空重做栈
}

// 撤销
function undo() {
  if (historyStack.value.length === 0) return
  
  redoStack.value.push(getSnapshot())
  const prev = historyStack.value.pop()!
  
  for (const [tableId, guests] of Object.entries(prev)) {
    if (tables[tableId]) {
      tables[tableId].guests = [...guests]
    }
  }
  saveToStorage()
}

// 重做
function redo() {
  if (redoStack.value.length === 0) return
  
  historyStack.value.push(getSnapshot())
  const next = redoStack.value.pop()!
  
  for (const [tableId, guests] of Object.entries(next)) {
    if (tables[tableId]) {
      tables[tableId].guests = [...guests]
    }
  }
  saveToStorage()
}

// 默认桌位数据（用于重置）
const defaultTables: Record<string, string[]> = {
  'main-L': ['新郎', '新娘', '新郎爸', '新郎妈', '舅舅', '舅妈', '外婆', '叔叔', '婶婶', '黄士杰'],
  'main-R': ['虾仔舅', '娣舅', '岳父', '岳母', '姐姐x2', '哥哥x2', '陈湘怡', '宝宝椅x2'],
  't-1': ['大姨丈', '大尚哥', '大嫂', '大尚哥孩子x2', '小尚哥', '小嫂', '小尚哥孩子x3'],
  't-2': ['三姨', '三姨丈', '俊峰哥', '嫂子', '小孩', '俊哥', '瑶姐', '瑶姐夫', '燕燕', '燕燕丈夫'],
  't-3': ['敏丽姐夫', '敏丽姐', '敏丽小孩x2', '圣圣', '佳萍姑姑', '姑丈', '佳萍小孩x2'],
  't-5': ['邱拓先', '梁刚耀', '徐许杨', '华建', '陈佳胜', '龚神', '朱晴宇', '俊凯', '俊凯老婆'],
  't-6': ['廖旺', '薛莹', '郭灏', '冯琪', '罗凯凯', '王思雨', '黄培强', '强嫂', '郭宇翔', '王之韵'],
  't-8': ['谢泽伟', '奥瑞', '郑建宁', '唐浩天', '朱哲聪', '徐渴望'],
  't-9': ['姑妈', '姑夫', '碧倩', '春花舅妈', '丹丹', '大章', '小章', '明耀', '娣舅妈', '虾仔舅妈'],
  't-10': ['少龙', '景云x2', '俊科x2', '福兴x2', '军岚x2', '远明x2'],
  't-11': ['振忠', '渊洲x2', '运伟', '更晓', '袁思灵x2', '钟萍x2', '飞雁'],
  't-12': ['吴云', '苹果', '端妮', '红霞', '戴德威x2', '玲玲x2'],
  't-13': ['瞬沿x2', '俊伟x2', '远辉x2', '攀哥', '楠哥', '小灰', '婷姐x3'],
  't-15': ['贾萱x2', '赖凤霞x2', '桐桐', '崔玉', '徐徐', '大曾', '胖妞x2', '陈捷']
}

// 默认坐标（用于重置）
const defaultCoords: Record<string, Position> = {
  'main-L': { top: 200, right: '37%' },
  'main-R': { top: 200, left: '37%' },
  't-9': { top: 450, left: '37%' },
  't-11': { top: 700, left: '37%' },
  't-6': { top: 950, left: '37%' },
  't-1': { top: 450, right: '37%' },
  't-3': { top: 700, right: '37%' },
  't-5': { top: 950, right: '37%' },
  't-10': { top: 500, left: '15%' },
  't-12': { top: 800, left: '15%' },
  't-2': { top: 500, right: '15%' },
  't-8': { top: 800, right: '15%' },
  't-15': { top: 1150, left: '37%' },
  't-13': { top: 1150, right: '37%' }
}

// 保存当前状态到临时存储（自动保存）
function saveToStorage() {
  const data: Record<string, string[]> = {}
  for (const [tableId, table] of Object.entries(tables)) {
    data[tableId] = table.guests
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  
  // 同时保存坐标
  saveCoordsToStorage()
}

// 保存坐标到 localStorage
function saveCoordsToStorage() {
  localStorage.setItem(COORDS_KEY, JSON.stringify(coords))
}

// 从 localStorage 加载坐标
function loadCoordsFromStorage() {
  const saved = localStorage.getItem(COORDS_KEY)
  if (saved) {
    try {
      const data = JSON.parse(saved) as Record<string, Position>
      for (const [tableId, pos] of Object.entries(data)) {
        if (coords[tableId]) {
          coords[tableId] = pos
        }
      }
    } catch (e) {
      console.error('Failed to load coords data:', e)
    }
  }
}

// 从临时存储加载
function loadFromStorage() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      const data = JSON.parse(saved) as Record<string, string[]>
      for (const [tableId, guests] of Object.entries(data)) {
        if (tables[tableId]) {
          tables[tableId].guests = guests
        }
      }
    } catch (e) {
      console.error('Failed to load seating data:', e)
    }
  }
}

// 加载保存的记录列表
function loadRecords() {
  const saved = localStorage.getItem(RECORDS_KEY)
  if (saved) {
    try {
      savedRecords.value = JSON.parse(saved)
    } catch (e) {
      savedRecords.value = []
    }
  }
}

// 保存方案（带备注）
function saveRecord() {
  if (!saveName.value.trim()) {
    alert('请输入方案名称')
    return
  }
  
  const data: Record<string, string[]> = {}
  for (const [tableId, table] of Object.entries(tables)) {
    data[tableId] = [...table.guests]
  }
  
  // 保存坐标
  const coordsData: Record<string, Position> = {}
  for (const [tableId, pos] of Object.entries(coords)) {
    coordsData[tableId] = { ...pos }
  }
  
  const record: SavedRecord = {
    name: saveName.value.trim(),
    time: Date.now(),
    data,
    coords: coordsData
  }
  
  savedRecords.value.unshift(record)
  localStorage.setItem(RECORDS_KEY, JSON.stringify(savedRecords.value))
  
  saveName.value = ''
  showSaveDialog.value = false
  alert('保存成功！')
}

// 加载某个记录
function loadRecord(record: SavedRecord) {
  // 加载桌位人员
  for (const [tableId, guests] of Object.entries(record.data)) {
    if (tables[tableId]) {
      tables[tableId].guests = [...guests]
    }
  }
  // 加载桌子位置
  if (record.coords) {
    for (const [tableId, pos] of Object.entries(record.coords)) {
      if (coords[tableId]) {
        coords[tableId] = { ...pos }
      }
    }
    saveCoordsToStorage()
  }
  saveToStorage()
  showHistoryPanel.value = false
}

// 删除记录
function deleteRecord(idx: number) {
  if (confirm('确定删除这个方案吗？')) {
    savedRecords.value.splice(idx, 1)
    localStorage.setItem(RECORDS_KEY, JSON.stringify(savedRecords.value))
  }
}

// 重置为默认
function resetToDefault() {
  if (confirm('确定重置为初始方案吗？当前修改将丢失。')) {
    // 重置桌位人员
    for (const [tableId, guests] of Object.entries(defaultTables)) {
      if (tables[tableId]) {
        tables[tableId].guests = [...guests]
      }
    }
    // 重置桌子位置
    for (const [tableId, pos] of Object.entries(defaultCoords)) {
      if (coords[tableId]) {
        coords[tableId] = { ...pos }
      }
    }
    saveToStorage()
    localStorage.removeItem(COORDS_KEY)
  }
}

// 格式化时间
function formatTime(timestamp: number): string {
  const d = new Date(timestamp)
  return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`
}

// 查找宾客所在桌子
function findGuestTable(guestName: string): string | null {
  for (const [tableId, table] of Object.entries(tables)) {
    if (table.guests.includes(guestName)) {
      return tableId
    }
  }
  return null
}

// 计算属性 - 所有宾客按分类显示（包含桌号）
const allGuestsByCategory = computed(() => {
  const result: Record<string, { label: string; color: string; guests: { name: string; tableId: string | null }[] }> = {}
  
  for (const [catKey, category] of Object.entries(guestPool)) {
    result[catKey] = {
      label: category.label,
      color: category.color,
      guests: category.guests.map(name => ({
        name,
        tableId: findGuestTable(name)
      }))
    }
  }
  
  // 添加已分配到桌子但不在宾客池的人
  for (const [tableId, table] of Object.entries(tables)) {
    for (const guest of table.guests) {
      // 检查是否已在某个分类中
      let found = false
      for (const cat of Object.values(result)) {
        if (cat.guests.some(g => g.name === guest)) {
          found = true
          break
        }
      }
      if (!found) {
        // 根据桌子颜色分配到对应分类
        const catKey = getCategoryByTable(tableId)
        if (catKey && result[catKey]) {
          result[catKey].guests.push({ name: guest, tableId })
        }
      }
    }
  }
  
  return result
})

// 根据桌子获取分类
function getCategoryByTable(tableId: string): string | null {
  const table = tables[tableId]
  if (!table) return null
  
  if (tableId === 'main-L') return 'groom_main'
  if (tableId === 'main-R') return 'bride_main'
  if (tableId === 't-1' || tableId === 't-2') return 'groom_mom_rel'
  if (tableId === 't-3') return 'groom_dad_rel'
  if (tableId === 't-5' || tableId === 't-6') return 'groom_hs'
  if (tableId === 't-8') return 'groom_primary'
  if (tableId === 't-9') return 'bride_rel'
  if (tableId === 't-10' || tableId === 't-11') return 'groom_dad_fri'
  if (tableId === 't-12') return 'groom_mom_fri'
  if (tableId === 't-13') return 'bride_work'
  if (tableId === 't-15') return 'bride_fri'
  return null
}

// 解析人数（处理 x2, x3 等格式）
function parseGuestCount(name: string): number {
  const match = name.match(/x(\d+)$/)
  return match ? parseInt(match[1]) : 1
}

// 计算列表总人数
function countGuests(guests: string[]): number {
  return guests.reduce((sum, name) => sum + parseGuestCount(name), 0)
}

const totalGuests = computed(() => {
  return Object.values(tables).reduce((sum, table) => sum + countGuests(table.guests), 0)
})

// 方法
function setView(v: string) {
  state.value.view = v
}

function toggleCategory(key: string) {
  expandedCategories[key] = !expandedCategories[key]
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
  const step = 360 / Math.max(total, 1)
  const angle = (step * idx) - 90
  const rad = angle * (Math.PI / 180)
  return {
    transform: `translate(${Math.cos(rad) * radius}px, ${Math.sin(rad) * radius}px)`
  }
}

function openModal(tableId: string, table: Table) {
  currentTableId.value = tableId
  modalTitle.value = tableId.startsWith('main') 
    ? (tableId === 'main-L' ? '主桌 L (男方)' : '主桌 R (女方)')
    : `${tableId.replace('t-', '')} 号桌`
  modalLabel.value = table.label
  modalColor.value = table.color
  modalGuests.value = [...table.guests]
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

// 拖拽事件
function onDragStart(e: DragEvent, guest: string, fromCategory: string, fromTable: string | null) {
  draggingGuest.value = guest
  draggingFrom.value = fromCategory
  draggingFromTable.value = fromTable || ''
  e.dataTransfer?.setData('text/plain', guest)
}

function onDropToTable(e: DragEvent, tableId: string) {
  e.preventDefault()
  dragOverTable.value = ''
  
  if (!draggingGuest.value) return
  
  pushHistory() // 记录历史
  
  // 如果从其他桌子拖来，先从原桌子移除
  if (draggingFromTable.value && tables[draggingFromTable.value]) {
    const idx = tables[draggingFromTable.value].guests.indexOf(draggingGuest.value)
    if (idx > -1) {
      tables[draggingFromTable.value].guests.splice(idx, 1)
    }
  }
  
  // 添加到新桌子
  if (!tables[tableId].guests.includes(draggingGuest.value)) {
    tables[tableId].guests.push(draggingGuest.value)
  }
  
  saveToStorage()
  draggingGuest.value = ''
  draggingFrom.value = ''
  draggingFromTable.value = ''
}

function onDropToModal(e: DragEvent) {
  e.preventDefault()
  if (!draggingGuest.value || !currentTableId.value) return
  
  pushHistory() // 记录历史
  
  // 如果从其他桌子拖来，先从原桌子移除
  if (draggingFromTable.value && tables[draggingFromTable.value]) {
    const idx = tables[draggingFromTable.value].guests.indexOf(draggingGuest.value)
    if (idx > -1) {
      tables[draggingFromTable.value].guests.splice(idx, 1)
    }
  }
  
  // 添加到当前桌子
  if (!tables[currentTableId.value].guests.includes(draggingGuest.value)) {
    tables[currentTableId.value].guests.push(draggingGuest.value)
    modalGuests.value = [...tables[currentTableId.value].guests]
  }
  
  saveToStorage()
  draggingGuest.value = ''
  draggingFrom.value = ''
  draggingFromTable.value = ''
}

function removeGuestFromTable(guest: string) {
  if (!currentTableId.value) return
  
  pushHistory() // 记录历史
  
  const idx = tables[currentTableId.value].guests.indexOf(guest)
  if (idx > -1) {
    tables[currentTableId.value].guests.splice(idx, 1)
    modalGuests.value = [...tables[currentTableId.value].guests]
    saveToStorage()
  }
}

// 获取触摸/鼠标坐标
function getEventPos(e: MouseEvent | TouchEvent): { x: number; y: number } {
  if ('touches' in e && e.touches.length > 0) {
    return { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  if ('changedTouches' in e && e.changedTouches.length > 0) {
    return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY }
  }
  return { x: (e as MouseEvent).clientX, y: (e as MouseEvent).clientY }
}

// 桌子拖拽
function startTableDrag(e: MouseEvent | TouchEvent, tableId: string) {
  // 阻止默认行为
  e.preventDefault()
  
  const pos = getEventPos(e)
  draggingTableId.value = tableId
  tableStartX.value = pos.x
  tableStartY.value = pos.y
  tableOriginalPos.value = { ...coords[tableId] }
  tableDragged.value = false // 重置拖拽标记
  
  document.addEventListener('mousemove', onTableDrag)
  document.addEventListener('mouseup', endTableDrag)
  document.addEventListener('touchmove', onTableDrag, { passive: false })
  document.addEventListener('touchend', endTableDrag)
}

function onTableDrag(e: MouseEvent | TouchEvent) {
  if (!draggingTableId.value || !tableOriginalPos.value || !layout.value) return
  
  e.preventDefault()
  const pos = getEventPos(e)
  const scale = layout.value.getBoundingClientRect().width / 1600
  const deltaX = (pos.x - tableStartX.value) / scale
  const deltaY = (pos.y - tableStartY.value) / scale
  
  // 移动超过 5px 才算拖拽
  if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
    tableDragged.value = true
  }
  
  if (!tableDragged.value) return
  
  const newTop = (tableOriginalPos.value.top || 0) + deltaY
  
  // 更新位置（使用 left 百分比转像素计算）
  if (tableOriginalPos.value.left) {
    const leftPercent = parseFloat(tableOriginalPos.value.left)
    const leftPx = (leftPercent / 100) * 1600 + deltaX
    coords[draggingTableId.value] = {
      top: Math.max(50, Math.min(1300, newTop)),
      left: `${Math.max(5, Math.min(95, (leftPx / 1600) * 100))}%`
    }
  } else if (tableOriginalPos.value.right) {
    const rightPercent = parseFloat(tableOriginalPos.value.right)
    const rightPx = (rightPercent / 100) * 1600 - deltaX
    coords[draggingTableId.value] = {
      top: Math.max(50, Math.min(1300, newTop)),
      right: `${Math.max(5, Math.min(95, (rightPx / 1600) * 100))}%`
    }
  }
}

function endTableDrag() {
  const tableId = draggingTableId.value
  const wasDragged = tableDragged.value
  
  // 清理状态
  draggingTableId.value = ''
  tableOriginalPos.value = null
  document.removeEventListener('mousemove', onTableDrag)
  document.removeEventListener('mouseup', endTableDrag)
  document.removeEventListener('touchmove', onTableDrag)
  document.removeEventListener('touchend', endTableDrag)
  
  if (wasDragged) {
    // 是拖拽，保存坐标
    saveCoordsToStorage()
  } else if (tableId && tables[tableId]) {
    // 是点击，打开弹窗
    openModal(tableId, tables[tableId])
  }
  
  tableDragged.value = false
}

function handleResize() {
  if (!layout.value) return
  const wrap = layout.value.parentElement
  if (!wrap) return
  const scale = Math.min(
    (wrap.clientWidth - 40) / 1600,
    (wrap.clientHeight - 40) / 1400
  )
  layout.value.style.transform = `scale(${Math.max(scale, 0.25)})`
}

onMounted(() => {
  loadFromStorage()
  loadRecords()
  loadCoordsFromStorage()
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.seating-container {
  display: flex;
  height: 100vh;
  background: linear-gradient(135deg, #F5F5F7 0%, #E8E8ED 100%);
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", "PingFang SC", sans-serif;
}

/* 侧边栏 */
.sidebar {
  width: 280px;
  background: white;
  border-right: 1px solid rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid rgba(0,0,0,0.08);
}

.sidebar-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
}

.guest-count {
  font-size: 13px;
  color: #86868B;
}

.guest-categories {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
}

.tutorial {
  padding: 16px;
  border-top: 1px solid rgba(0,0,0,0.08);
  background: #FAFAFA;
}

.tutorial-title {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #1D1D1F;
}

.tutorial-item {
  font-size: 12px;
  color: #666;
  margin-bottom: 6px;
  line-height: 1.5;
}

.tutorial-item b {
  color: #333;
}

.category-section {
  margin-bottom: 8px;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  background: #F5F5F7;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  border-left: 4px solid;
  transition: background 0.2s;
}

.category-header:hover {
  background: #E8E8ED;
}

.category-count {
  background: rgba(0,0,0,0.1);
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
}

.category-guests {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 10px 4px;
}

.guest-chip {
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 600;
  cursor: grab;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
}

.guest-chip.assigned {
  opacity: 0.85;
}

.guest-chip:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.guest-chip:active {
  cursor: grabbing;
}

.table-badge {
  background: rgba(0,0,0,0.15);
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 700;
}

/* 主内容区 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.controls {
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(30px);
  border-bottom: 1px solid rgba(0,0,0,0.08);
  padding: 16px 24px;
  display: flex;
  justify-content: center;
  gap: 40px;
}

.control-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.control-label {
  font-size: 11px;
  font-weight: 700;
  color: #86868B;
  letter-spacing: 1px;
}

.btn-group {
  background: rgba(229,229,234,0.6);
  padding: 4px;
  border-radius: 12px;
  display: flex;
  gap: 2px;
}

.btn-tab {
  padding: 8px 18px;
  border-radius: 8px;
  border: none;
  background: transparent;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-tab:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn-tab.active {
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  color: #007AFF;
}

/* 画布 */
.canvas-wrapper {
  flex: 1;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.layout-container {
  width: 1600px;
  height: 1400px;
  background: linear-gradient(135deg, #FFFFFF 0%, #F9F9FB 100%);
  border-radius: 60px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.1);
  position: relative;
  transform-origin: center center;
}

.right-accent {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 8px;
  background: linear-gradient(180deg, #BFDBFE 0%, #93C5FD 100%);
  border-top-right-radius: 60px;
  border-bottom-right-radius: 60px;
}

.stage-area {
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 700px;
  height: 90px;
  background: linear-gradient(135deg, #FF3B30 0%, #FF2D55 100%);
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 28px;
  font-weight: 800;
  letter-spacing: 4px;
  box-shadow: 0 12px 32px rgba(255,45,85,0.3);
}

.runway {
  position: absolute;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 700px;
  background: linear-gradient(180deg, #5AC8FA 0%, #007AFF 100%);
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  opacity: 0.1;
}

.runway-label {
  position: absolute;
  top: 380px;
  left: 50%;
  transform: translateX(-50%);
  color: #007AFF;
  font-weight: 700;
  font-size: 20px;
  opacity: 0.4;
  white-space: nowrap;
}

.table-group {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
  height: 120px;
  z-index: 20;
}

.table-circle {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: 800;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  border: 4px solid;
  cursor: pointer;
  transition: all 0.2s;
}

.table-circle:hover {
  transform: scale(1.1);
}

.table-circle.drag-over {
  transform: scale(1.15);
  box-shadow: 0 12px 32px rgba(0,122,255,0.4);
}

.table-group.dragging-table {
  z-index: 100;
  opacity: 0.9;
}

.table-group.dragging-table .table-circle {
  transform: scale(1.15);
  box-shadow: 0 16px 40px rgba(0,0,0,0.25);
  cursor: grabbing;
}

.label-pill {
  margin-top: 14px;
  background: white;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  white-space: nowrap;
}

.satellite-name {
  position: absolute;
  font-size: 13px;
  font-weight: 600;
  background: white;
  padding: 5px 12px;
  border-radius: 12px;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.pillar {
  position: absolute;
  width: 36px;
  height: 36px;
  background: #F2F2F7;
  border: 2px solid rgba(0,0,0,0.06);
  border-radius: 12px;
}

.entrance {
  position: absolute;
  bottom: 60px;
  right: -30px;
  background: linear-gradient(135deg, #007AFF 0%, #0051D5 100%);
  color: white;
  padding: 14px 32px;
  border-radius: 20px;
  font-size: 20px;
  font-weight: 700;
  box-shadow: 0 8px 24px rgba(0,122,255,0.3);
}

/* 弹窗 */
#modal-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(8px);
  z-index: 1000;
  justify-content: center;
  align-items: center;
}

#modal-overlay.active {
  display: flex;
}

.modal-card {
  background: white;
  width: 480px;
  max-height: 80vh;
  overflow-y: auto;
  border-radius: 32px;
  padding: 32px;
  box-shadow: 0 40px 80px rgba(0,0,0,0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.modal-header h2 {
  margin: 0;
  font-size: 28px;
  font-weight: 800;
}

.modal-header p {
  margin: 4px 0 0;
  font-size: 16px;
  font-weight: 600;
}

.close-btn {
  background: #F2F2F7;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  color: #86868B;
}

.modal-guests {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.modal-guest-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 16px;
  font-size: 15px;
  font-weight: 600;
}

.remove-btn {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  opacity: 0.6;
  padding: 0;
  line-height: 1;
}

.remove-btn:hover {
  opacity: 1;
}

.drop-zone {
  border: 2px dashed #D1D1D6;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  color: #86868B;
  font-weight: 600;
  transition: all 0.2s;
}

.drop-zone:hover {
  border-color: #007AFF;
  background: rgba(0,122,255,0.05);
}

/* 历史记录面板 */
.history-panel {
  position: absolute;
  top: 80px;
  right: 20px;
  width: 300px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
  z-index: 100;
  overflow: hidden;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0,0,0,0.08);
}

.history-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
}

.history-empty {
  padding: 40px 20px;
  text-align: center;
  color: #86868B;
}

.history-list {
  max-height: 400px;
  overflow-y: auto;
}

.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  transition: background 0.2s;
  border-bottom: 1px solid rgba(0,0,0,0.04);
}

.history-item:hover {
  background: #F5F5F7;
}

.history-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.history-name {
  font-weight: 600;
  font-size: 14px;
}

.history-time {
  font-size: 12px;
  color: #86868B;
}

.delete-btn {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  opacity: 0.5;
  padding: 4px;
}

.delete-btn:hover {
  opacity: 1;
}

/* 保存对话框 */
.save-dialog-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(8px);
  z-index: 1000;
  justify-content: center;
  align-items: center;
}

.save-dialog-overlay.active {
  display: flex;
}

.save-dialog {
  background: white;
  width: 360px;
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
}

.save-dialog h3 {
  margin: 0 0 20px;
  font-size: 20px;
  font-weight: 700;
}

.save-input {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #E5E5EA;
  border-radius: 12px;
  font-size: 16px;
  margin-bottom: 20px;
  box-sizing: border-box;
}

.save-input:focus {
  outline: none;
  border-color: #007AFF;
}

.save-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.btn-cancel {
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  background: #F2F2F7;
  color: #1D1D1F;
}

.btn-save {
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  background: #007AFF;
  color: white;
}

.btn-save:hover {
  background: #0051D5;
}
</style>
