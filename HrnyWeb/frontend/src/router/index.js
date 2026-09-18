import { createRouter, createWebHistory } from 'vue-router'
import NotFoundView from '../views/404View.vue'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/HrnyWeb/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router