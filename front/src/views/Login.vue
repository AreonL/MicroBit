<template>
  <div class="login">
    <h1>Login</h1>
    <div class="form">
      <label for="username">Användarnamn</label>
      <input v-model="username" type="text" name="username" class="input" placeholder="ABCDXX"/>
      <label for="password">Lösenord</label>
      <input
        v-model="password"
        :type="togglePass ? 'password' : 'text'" class="input"
        :placeholder="togglePass ? '*********': 'lösenord'"
      />
      <fa @click="toggleShowPassword" :icon="togglePass ? ['far', 'eye'] : ['far', 'eye-slash']" />
      <label for="toggle">Visa lösenord</label>
      <button @click="login" class="btn">Login</button>
    </div>
  </div>
</template>

<script>
// import helper from '@/helper'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      username: '',
      password: '',
      togglePass: true
    }
  },
  methods: {
    ...mapActions({
      signIn: 'auth/signIn'
    }),
    login() {
      this.signIn({acronym: this.username, password: this.password}).then(() => {
        this.$router.replace({
          name: 'Home'
        })
      }).catch(() => {
        console.log('signIn failed')
      })
      // helper.user = this.username
    },
    toggleShowPassword () {
      this.togglePass = !this.togglePass
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