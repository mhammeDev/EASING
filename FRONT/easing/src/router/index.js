import { createRouter, createWebHistory } from 'vue-router'
import MaintPage from '../views/MainPage.vue'

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MaintPage
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
