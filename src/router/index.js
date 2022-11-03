import Vue from 'vue'
import VueRouter from 'vue-router'
import dashboard from '../views/Dashboard'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: dashboard,
    children: [
      {
        path: '',
        name: 'Medicines',
        component: () => import('../views/Medicines.vue')
      },
      {
        path: 'add',
        component: () => import('../views/Add.vue')
      },
      {
        path: 'update',
        component: () => import('../views/Update.vue')
      },
      {
        path: 'code',
        component: () => import('../views/UpdateCode.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
