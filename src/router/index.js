import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'index',
      path: '/:id?',
      component: () => import('@/pages/home/index.vue')
    }
  ]
})

export default router
