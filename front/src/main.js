import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import axios from "axios"

require('@/store/subscriber')

axios.defaults.baseURL = "http://localhost:5500"

store.dispatch('auth/attemptLogin', localStorage.getItem('token')).then(() => {
  createApp(App).use(store).use(router).mount("#app")
})
