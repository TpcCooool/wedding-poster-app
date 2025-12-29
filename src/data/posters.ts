import type { Category } from '@/types/poster'

export const categories: Category[] = [
  {
    type: 'dice',
    name: '老婆说的都对',
    icon: '🎲',
    description: '骰子游戏规则海报',
    posters: [
      { id: 'big1', name: '规则海报 v1', component: 'BigPoster1', downloadName: '老婆说的都对-规则海报-A4' },
      { id: 'big2', name: '游戏海报 v2', component: 'BigPoster2', downloadName: '老婆说的都对_规则海报_A4' },
      { id: 'big3', name: '波普风 v1', component: 'BigPoster3', downloadName: '老婆说的都对_波普风_A4' },
      { id: 'big4', name: '波普风 v2', component: 'BigPoster4', downloadName: '老婆说的都对_波普风_A4' },
      { id: 'big5', name: '波普风 v3', component: 'BigPoster5', downloadName: '老婆说的都对_波普风_A4' },
      { id: 'big6', name: '精密布局版', component: 'BigPoster6', downloadName: '老婆说的都对_喜庆波普风_A4' }
    ]
  },
  {
    type: 'texas',
    name: '私房钱保卫战',
    icon: '🃏',
    description: '德州扑克规则海报',
    posters: [
      { id: 'texo1', name: 'ALL IN 真爱', component: 'TexoPoster1', downloadName: '私房钱保卫战-规则海报-A4' },
      { id: 'texo2', name: '保卫战 v2', component: 'TexoPoster2', downloadName: '私房钱保卫战-规则海报-A4' },
      { id: 'texo3', name: '大作战版', component: 'TexoPoster3', downloadName: '私房钱大作战-规则海报-A4' }
    ]
  },
  {
    type: 'mahjong',
    name: '家和万事兴',
    icon: '🀄',
    description: '麻将游戏规则海报',
    posters: [
      { id: 'mj1', name: '经典版', component: 'MajiangPoster1', downloadName: 'mahjong-rules-poster' },
      { id: 'mj2', name: '详细规则版', component: 'MajiangPoster2', downloadName: '家和万事兴-规则海报-A4' },
      { id: 'mj3', name: 'A4 完美适配版', component: 'MajiangPoster3', downloadName: '家和万事兴-规则海报-A4' }
    ]
  }
]

export function getCategoryByType(type: string): Category | undefined {
  return categories.find(c => c.type === type)
}

export function getPosterById(type: string, id: string) {
  const category = getCategoryByType(type)
  return category?.posters.find(p => p.id === id)
}
