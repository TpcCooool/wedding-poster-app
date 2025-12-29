export interface Poster {
  id: string
  name: string
  component: string
  downloadName: string
}

export interface Category {
  type: 'dice' | 'texas' | 'mahjong'
  name: string
  icon: string
  description: string
  posters: Poster[]
}
