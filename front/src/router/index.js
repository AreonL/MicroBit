import { createRouter, createWebHistory } from "vue-router"
// import helper from "@/helper"
import Home from "../views/Home.vue"
import User from "../views/User.vue"
import Teacher from "../views/Teacher.vue"
import Login from "../views/Login.vue"
import store from '@/store'

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/user",
    name: "User",
    component: User,
    meta: { requiresAuth: true }
  },
  {
    path: "/teacher",
    name: "Teacher",
    component: Teacher,
    meta: { requiresTeacher: true }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: (to, from, next) => {
      if (store.getters['auth/authenticated']) {
        next({
          name: "Home"
        })
      } else {
        next()
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters['auth/authenticated']) {
      next({
        name: "Login"
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresTeacher)) {
    if (!store.getters['auth/user'].isTeacher) {
      next({
        name: "Home"
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
