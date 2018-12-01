import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home')
    },
    {
      path: '/auth/:provider',
      name: 'auth.callback',
      component: () => import('./views/auth/Callback')
    },
    {
      path: '/admin/redeem',
      name: 'admin.redeem',
      component: () => import('./views/admin/Redeem')
    },
    {
      path: '/:promoter',
      name: 'redeem',
      component: () => import('./views/Redeem')
    }
  ]
})
