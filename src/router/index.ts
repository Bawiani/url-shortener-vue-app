import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/creatingLink',
      name: 'CreatingLink',
      component: () => import('../views/CreatingLink.vue')
    }
  ]
})

export default router
