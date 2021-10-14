import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/Login'
import main from '../views/mainPage/main.vue'
import stats from '../views/mainPage/stats'

Vue.use(VueRouter)

const routes = [
  // 重定向
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    name: 'main',
    component: main
  },
  {
    path: '/stats',
    name: 'stats',
    component: stats
  },
  {
    path:'/login',
    name:'login',
    component: login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
