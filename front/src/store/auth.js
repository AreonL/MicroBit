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
      // let response = await axios.get(`/auth?id=${credentials}`)
      let response = await axios.post(`/users/login`, credentials)

      const token = response.data.token
      return dispatch('attemptLogin', token)
    },
    async attemptLogin ({ commit, state }, token) {
      if (token) {
        commit('SET_TOKEN', token)
      }

      if (!state.token) {
        return
      }

      try {
        // get me
        let response = await axios.get(`users/me`)

        commit('SET_USER', response.data)
      } catch (err) {
        commit('SET_TOKEN', null)
        commit('SET_USER', null)
      }
    },

    signOut ({ commit }) {
      return axios.get(`/users`).then(() => {
        commit('SET_TOKEN', null)
        commit('SET_USER', null)
      })
    }
  }
}
