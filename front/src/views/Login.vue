<template>
  <div class="login">
    <h1>Login</h1>
    <div class="form">
      <label for="username">Användarnamn</label>
      <input v-model="username" type="text" name="username" class="input" />
      <label for="password">Lösenord</label>
      <input v-model="password" type="password" class="input" />
      <button @click="login" class="btn">Login</button>
    </div>
  </div>
</template>

<script>
// import helper from '@/helper'
import { mapActions } from 'vuex'

export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapActions({
      signIn: 'auth/signIn'
    }),
    login() {
      this.signIn({name: this.username, password: this.password}).then(() => {
        this.$router.replace({
          name: 'Home'
        })
      }).catch(() => {
        console.log('signIn failed')
      })
      // helper.user = this.username
    }
  }
}
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
}
</style>