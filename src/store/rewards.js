import axios from 'axios'

export default {
  namespaced: true,

  state: {
    currentPromoter: {}
  },

  mutations: {
    updateCurrentPromoter (state, data) {
      state.currentPromoter = data
    }
  },

  actions: {
    loadPromoter ({ commit }, slug) {
      return axios.get(`https://q88ck9rk8e.execute-api.eu-west-1.amazonaws.com/v1/promoters/${slug}`)
        .then(r => commit('updateCurrentPromoter', r.data.content))
    },

    findPost ({ commit }, id) {
      return axios.post(`https://q88ck9rk8e.execute-api.eu-west-1.amazonaws.com/v1/rewards/${id}/enter`, {}, {
        headers: { Authorization: 'Bearer ' + localStorage.token }
      })
    },

    checkResult ({ commit }, id) {
      return axios.get(`https://q88ck9rk8e.execute-api.eu-west-1.amazonaws.com/v1/rewards/${id}/status`, {
        headers: { Authorization: 'Bearer ' + localStorage.token }
      })
    },

    adminRedeem ({ commit }, code) {
      return axios.post(`https://q88ck9rk8e.execute-api.eu-west-1.amazonaws.com/v1/rewards/redeem`, { code })
    }
  }
}
