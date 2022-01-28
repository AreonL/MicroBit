import { createRouter, createWebHistory } from "vue-router"
// import helper from "@/helper"
import Home from "../views/Home.vue"
import Hand from "../views/Hand.vue"
import User from "../views/User.vue"
import Teacher from "../views/Teacher.vue"
import Rapport from "../views/teacher/Rapport.vue"
import StudentAdd from "../views/teacher/StudentAdd.vue"
import StudentList from "../views/teacher/StudentList.vue"
import StudentPage from "../views/teacher/StudentPage.vue"
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
    path: "/hand",
    name: "Hand",
    component: Hand,
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
    path: "/teacher/rapport",
    name: "Rapport",
    component: Rapport,
    meta: { requiresTeacher: true }
  },
  {
    path: "/teacher/studentList",
    name: "StudentList",
    component: StudentList,
    meta: { requiresTeacher: true }
  },
  {
    path: "/teacher/studentAdd",
    name: "StudentAdd",
    component: StudentAdd,
    meta: { requiresTeacher: true }
  },
  {
    path: "/teacher/student/:acronym",
    name: "StudentPage",
    component: StudentPage,
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
