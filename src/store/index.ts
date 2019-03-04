import Vue from 'vue'
import Vuex from 'vuex'
import { State } from '@/types/store/State'

import { state } from '@/store/state'
import { actions } from '@/store/actions'
import { getters } from '@/store/getters'
import { mutations } from '@/store/mutations'

Vue.use(Vuex)

export default new Vuex.Store<State>({
  state,
  actions,
  getters,
  mutations,
})
