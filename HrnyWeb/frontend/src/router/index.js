import { createRouter, createWebHistory } from 'vue-router'
import NotFoundView from '../views/404View.vue'
import HomeView from '../views/HomeView.vue'
import DashBoardView from '../views/DashBoardView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashBoardView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router