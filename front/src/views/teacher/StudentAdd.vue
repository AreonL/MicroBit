<template>
  <div class="studentAdd">
    <h1>Teacher: Lägg till elev</h1>
    <div class="form">
      <label for="username">Akronym</label>
      <input v-model="username" type="text" name="username" class="input" placeholder="ABCDXX"/>
      <label for="firstname">Förnamn</label>
      <input v-model="firstname" type="text" name="firstname" class="input" placeholder="Jane"/>
      <label for="lastname">Efternamn</label>
      <input v-model="lastname" type="text" name="lastname" class="input" placeholder="Doe"/>
      <label for="password">Lösenord</label>
      <input v-model="password" type="text" class="input" placeholder="password"/>
      <button @click="createStudent()" class="btn">Skapa elev</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default ({
  data() {
    return {
      username: '',
      firstname: '',
      lastname: '',
      password: ''
    }
  },
  methods: {
    async createStudent () {
      const data = {
        acronym: this.username,
        firstname: this.firstname,
        lastname: this.lastname,
        password: this.password
      }
      console.log(data)

      const response = await axios.post(`/users`, data)
      if (response.status === 201) {
        // trigger som cool color effect
        console.log("Elev skapad")
      } else {
        // try again effect
        console.log('Något fel inträffa')
      }
    }
  }
})
</script>


<style scoped>
.form {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
}

.form input {
  margin-bottom: 20px;
}
</style>