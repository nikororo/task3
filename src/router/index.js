import Vue from 'vue'
import VueRouter from 'vue-router'
import Authorization from '../components/Authorization.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'authorization',
    component: Authorization
  },
  {
    path: '/todo',
    name: 'todo',
    component: () => import('../components/Main.vue') 
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
