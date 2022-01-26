import axios from 'axios'

export default {
  namespaced: true,
  state: {
    token: null,
    user: null
  },
  getters: {
    authenticated (state) {
      return state.token && state.user
    },
    user (state) {
      return state.user
    }
  },
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
    },

    SET_USER (state, user) {
      state.user = user
    }
  },
  actions: {
    async signIn ({ dispatch }, credentials) {
      // send in credentials, aka username and password to get token
      let response = await axios.get(`/auth?id=${credentials}`)

      console.log(response.data)
      return dispatch('attemptLogin', response.data[0])
    },
    async attemptLogin ({ commit }, data) {
      commit('SET_TOKEN', data.token)

      try {
        // get me
        let response = await axios.get(`/auth?id=${data.id}`)
        console.log(response.data[0])
        commit('SET_USER', response.data[0])
      } catch (err) {
        commit('SET_TOKEN', null)
        commit('SET_USER', null)
      }
    }
  }
}
