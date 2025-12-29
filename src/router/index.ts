import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/pages/HomePage.vue')
    },
    {
      path: '/category/:type',
      name: 'Category',
      component: () => import('@/pages/CategoryPage.vue'),
      props: true
    },
    {
      path: '/poster/:type/:id',
      name: 'PosterDetail',
      component: () => import('@/pages/PosterDetailPage.vue'),
      props: true
    }
  ]
})

export default router
