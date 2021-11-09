import Vue from 'vue'
import VueRouter from 'vue-router'
import Splash from '../views/Splash.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'SPLASH',
    component: Splash
  },
  {
    path: '/login',
    name: 'LOGIN',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/home',
    name: 'HOME',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
