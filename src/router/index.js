import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: require('@/components/Login').default
    },
    {
      path: '/',
      name: 'index-index',
      component: require('@/pages/index/index').default
    },
    {
      path: '/categories',
      name: 'categories-index',
      component: require('@/pages/category/index').default
    },
    {
      path: '/categories/add',
      name: 'categories-add',
      component: require('@/pages/category/add').default
    },
    {
      path: '/categories/edit',
      name: 'categories-edit',
      component: require('@/pages/category/edit').default
    },
    {
      path: '/goods',
      name: 'goods-index',
      component: require('@/pages/goods/index').default
    },
    {
      path: '/goods/add',
      name: 'goods-add',
      component: require('@/pages/goods/add').default
    },
    {
      path: '/goods/edit',
      name: 'goods-edit',
      component: require('@/pages/goods/edit').default
    },
    {
      path: '/goods/amount',
      name: 'goods-amount',
      component: require('@/pages/goods/amount').default
    },
    {
      path: '/goods/detail',
      name: 'goods-detail',
      component: require('@/pages/goods/detail').default
    },
    {
      path: '/cart',
      name: 'cart-index',
      component: require('@/pages/cart/index').default
    },
    {
      path: '/cart/payment',
      name: 'cart-payment',
      component: require('@/pages/cart/payment').default
    },
    {
      path: '/orders',
      name: 'orders-index',
      component: require('@/pages/order/index').default
    },
    {
      path: '/orders/detail',
      name: 'orders-detail',
      component: require('@/pages/order/detail').default
    },
    {
      path: '/orders/print',
      name: 'orders-print',
      component: require('@/pages/order/print').default
    },
    {
      path: '/buyers',
      name: 'buyers-index',
      component: require('@/pages/buyer/index').default
    },
    {
      path: '/buyers/add',
      name: 'buyers-add',
      component: require('@/pages/buyer/add').default
    },
    {
      path: '/buyers/edit',
      name: 'buyers-edit',
      component: require('@/pages/buyer/edit').default
    },
    {
      path: '/users/change_password',
      name: 'users-change_password',
      component: require('@/pages/user/change_password').default
    },
    {
      path: '/debts',
      name: 'debts-index',
      component: require('@/pages/debt/index').default
    },
    {
      path: '/debts/detail',
      name: 'debts-detail',
      component: require('@/pages/debt/detail').default
    },
    {
      path: '/debts/pay',
      name: 'debts-pay',
      component: require('@/pages/debt/pay').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
