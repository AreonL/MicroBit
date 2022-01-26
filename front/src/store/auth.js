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
      const data = [response.data[0].token, response.data[0].id]
      return dispatch('attemptLogin', data)
    },
    async attemptLogin ({ commit, state }, data) {
      // Data [0] == token, [1] == id
      // https://youtu.be/sVDlFflesHU?list=PLfdtiltiRHWF1jqLcNO_2jWJXj9RuSDvY&t=320 changes the token to be accurate
      // When JWT is done
      if (typeof data === 'string' || !data) {
        data = [data, "1"]
      }

      if (data[0]) {
        commit('SET_TOKEN', data[0])
      }

      if (!state.token) {
        return
      }

      try {
        // get me
        let response = await axios.get(`/auth?id=${data[1]}`)
        console.log(response.data[0])
        commit('SET_USER', response.data[0])
      } catch (err) {
        commit('SET_TOKEN', null)
        commit('SET_USER', null)
      }
    },

    signOut ({ commit }) {
      return axios.get(`/auth?id=1`).then(() => {
        commit('SET_TOKEN', null)
        commit('SET_USER', null)
      })
    }
  }
}
