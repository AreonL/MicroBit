<template>
  <div>
    <!-- <pre>{{ user }}</pre> -->
    <h1>Welcome {{ user.name }}</h1>
    <button @click="logOut" class="btn">Logga ut</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user'
    })
  },
  methods: {
    ...mapActions({
      signOut: 'auth/signOut'
    }),
    logOut() {
      this.signOut().then(() => {
        this.$router.replace({
          name: "Home"
        })
      })
    }
  }
}
</script>

<style>

</style>