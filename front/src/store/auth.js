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

      console.log(response.data)
      // const token = response.data.accessToken
      const token = [response.data.token, {name: response.data.name, isTeacher: response.data.isTeacher}]
      return dispatch('attemptLogin', token)
    },
    async attemptLogin ({ commit, state }, token) {
      // Data [0] == token, [1] == id
      // https://youtu.be/sVDlFflesHU?list=PLfdtiltiRHWF1jqLcNO_2jWJXj9RuSDvY&t=320 changes the token to be accurate
      // When JWT is done
      // if (typeof data === 'string' || !data) {
      //   data = [data, "1"]
      // }

      if (token) {
        commit('SET_TOKEN', token[0])
      }

      if (!state.token) {
        return
      }


      // Add this later when 'user/me' works
      try {
        // get me
        // let response = await axios.get(`user/me`)
        // console.log(response.data[0])
        commit('SET_USER', token[1])
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
