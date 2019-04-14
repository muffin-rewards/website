import Vue from 'vue'
import VueRouter, { Route } from 'vue-router'
import { Request } from '@/types/routing/Request'
import { Middleware } from '@/types/routing/Middleware'

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
  ],

})

/**
 * Controller and middleware concept snippet.
 */

router.beforeEach((to: Route, from: Route, next: any) : void => {
  const controller: any = to.meta.controller
  const middleware: Middleware[] = to.meta.middleware || []
  const request: Request = { to, from }

  middleware.reduce(async (carry, mw) => {
    return carry.then(mw)
  }, Promise.resolve(request))
    .then(result => controller ? Promise.resolve(result) : Promise.reject())
    .then(result => new controller[0]()[controller[1]](result))
    .then(next, next)
})

export default router
