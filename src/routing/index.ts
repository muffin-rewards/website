import Vue from 'vue'
import store from '../store'
import VueRouter, { Route } from 'vue-router'
import { Request } from '@/types/routing/Request'
import { Middleware } from '@/types/routing/Middleware'

import { AuthController } from '@/routing/controllers/AuthController'
import { HomeController } from '@/routing/controllers/HomeController'
import { RewardsController } from '@/routing/controllers/RewardsController'

Vue.use(VueRouter)

const router: VueRouter = new VueRouter({

  /**
   * The router mode.
   */

  mode: 'history',

  /**
   * Basic Vue Router options.
   */

  linkActiveClass: 'is-active',

  /*
   * Component routes.
   */

  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        controller: [HomeController, 'index'],
      },
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('@/views/Privacy.vue'),
    },
    {
      path: '/:slug',
      name: 'reward',
      component: () => import('@/views/Reward.vue'),
      meta: {
        controller: [RewardsController, 'show'],
      },
    },
    {
      path: '/auth/:provider',
      name: 'auth',
      meta: {
        controller: [AuthController, 'callback'],
      },
    },
  ],

})

/**
 * Controller and middleware concept snippet.
 */

router.beforeEach((to: Route, from: Route, next: any) : void => {
  const controller: any = to.meta.controller
  const middleware: Middleware[] = to.meta.middleware || []
  const request: Request = { to, from }

  // We display loading spinning wheel.
  store.commit('updateViewLoadingStatus', true)

  middleware.reduce(async (carry, mw) => {
    return carry.then(mw)
  }, Promise.resolve(request))
    .then(result => controller ? Promise.resolve(result) : Promise.reject())
    .then(result => new controller[0]()[controller[1]](result))
    .then(next, next)
    // Hide the spinning wheel.
    .finally(() => store.commit('updateViewLoadingStatus', false))
})

export default router
