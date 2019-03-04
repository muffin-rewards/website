import Vue from 'vue'
import App from '@/App.vue'
import store from '@/store'
import router from '@/routing'

import '@/bootstrap/registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

// TODO: Reset scroll.
// TODO: Change reward list.
// TODO: Extract a bunch of components.
// TODO: Extract stuff to config.
