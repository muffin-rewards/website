import Vue from 'vue'
import Vuex from 'vuex'

import rewards from './rewards'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    rewards
  }
})
