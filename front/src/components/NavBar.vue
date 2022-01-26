<template>
  <div>
    <!-- <pre>{{ user }}</pre> -->
    <div id="nav" v-if="authenticated">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/user">User</router-link>
      <router-link v-if="authenticated && user.isTeacher" to="/teacher">Teacher</router-link>
    </div>
    <!-- <div v-if="authenticated && user.isTeacher">
      <router-link to="/teacher">Teacher</router-link>
    </div> -->
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user'
    }),
  }
}
</script>

<style scoped>
a {
  padding: 0 20px;
}
</style>