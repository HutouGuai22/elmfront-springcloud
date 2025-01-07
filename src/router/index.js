import { createRouter, createWebHistory } from 'vue-router'
import Index from "@/views/Index.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('../views/Index.vue')
    },

    {
      path: '/businessList/:orderTypeId',
      name: 'businessList',
      component: () => import('../views/BusinessList.vue')
    },
    {
      path:'/businessInfo/:businessId',
      name:'businessInfo',
      component:() => import('../views/BusinessInfo.vue')
    },
    {
      path:'/login',
      name:'login',
      component:() => import('../views/Login.vue')
    },
    {
      path:'/register',
      name:'register',
      component:() => import('../views/Register.vue')
    },
    {
      path:'/addressList/:userId',
      name:'addressList',
      component:() => import('../views/AddressList.vue')
    },
    {
      path:'/addressAdd/:userId',
      name:'addressAdd',
      component:() => import('../views/addressManager/AddressAdd.vue')
    },
    {
      path:'/addressUpdate/:daId',
      name:'addressUpdate',
      component:() => import('../views/addressManager/AddressUpdate.vue')
    },
    {
      path:'/order/:orderId',
      name:'order',
      component:() => import('../views/Order.vue')
    },
    {
      path:'/payment/:orderId',
      name:'payment',
      component:() => import('../views/Payment.vue')
    },
    {
      path:'/orderList',
      name:'orderList',
      component:() => import('../views/OrderList.vue')
    }

  ]
})

export default router

