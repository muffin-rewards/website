import { rewards } from '@/awi'

export default {

  namespaced: true,

  state: {
    currentReward: {}
  },

  mutations: {
    updateCurrentReward (state, data) {
      state.currentReward = data
    }
  },

  actions: {

    async loadReward ({ commit }, slug) {
      return rewards()
        .body(slug)
        .then(reward => commit('updateCurrentReward', reward))
    }

  }

}
