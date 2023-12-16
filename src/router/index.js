import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import CustomerView from '../views/CustomerView.vue'
import CategoryView from '../views/CategoryView.vue'
import ProductView from '../views/ProductView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
    {
      path:'/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/customer',
      name: 'customer',
      component: CustomerView
    },
    {
      path: '/customer/:clientId',
      name: 'client',
      component: () => import('../views/DataView.vue')
    },
    {
      path: '/category/',
      name: 'category',
      component: CategoryView
    },
    {
      path:'/product',
      name: 'product',
      component: ProductView
    }
  ]
})

export default router
