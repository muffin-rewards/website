import { rewards } from '@/awi'

export default {

  namespaced: true,

  state: {
    list: [],
    current: {}
  },

  mutations: {
    updateList (state, data) {
      state.list = data
    },

    updateCurrent (state, data) {
      state.current = data
    }
  },

  actions: {

    async list ({ commit }) {
      return rewards()
        .body()
        .then(rewards => commit('updateList', rewards))
    },

    async show ({ commit }, slug) {
      return rewards()
        .body(slug)
        .then(reward => commit('updateCurrent', reward))
    }

  }

}
