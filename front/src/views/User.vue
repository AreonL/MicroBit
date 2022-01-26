<template>
  <div>
    <pre>{{ user }}</pre>
    <h1>Welcome {{ User }}</h1>
    <button @click="logOut" class="btn">Logga ut</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user'
    })
  },
  methods: {
    logOut() {
      this.$router.push("/")
    }
  }
}
</script>

<style>

</style>