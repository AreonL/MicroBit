import { createApp } from "vue"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import App from "./App.vue"
import router from "./router"
import store from "./store"
import axios from "axios"

library.add(fas)
library.add(far)

require('@/store/subscriber')

axios.defaults.baseURL = "http://localhost:5500"

store.dispatch('auth/attemptLogin', localStorage.getItem('token')).then(() => {
  createApp(App).use(store).use(router).component('fa', FontAwesomeIcon).mount("#app")
})
