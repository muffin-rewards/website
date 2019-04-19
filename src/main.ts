import Vue from 'vue'
import App from '@/App.vue'
import store from '@/store'
import router from '@/routing'

import '@/bootstrap/registerServiceWorker'
import '@/bootstrap/registerGlobalComponents'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

// TODO: Reset scroll.
// TODO: Extract stuff to config.
