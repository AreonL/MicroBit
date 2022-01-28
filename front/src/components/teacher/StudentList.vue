<template>
  <div>
    <table class="styled-table">
      <thead>
        <tr>
          <th>Akronym</th>
          <th>Namn</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in listOfStudents" :key="item.acronym">
          <td @click="goToStudent(item.acronym)">{{item.acronym}}</td>
          <td>{{item.firstname}} {{ item.lastname }}</td>
          <td>
            <fa icon="edit" @click="editStudent(item.acronym)"/>
            <fa icon="trash-alt" @click="deleteStudent(item.acronym)"/>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      users: []
    }
  },
  async mounted () {
    this.users = await axios.get(`users`).then((res) => {
      // const data = {

      // }
      return res.data
    })
  },
  computed: {
    listOfStudents() {
      return this.users.filter(user => !user.isTeacher)
    }
  },
  methods: {
    goToStudent (acronym) {
      this.$router.replace({
        name: 'StudentPage',
        params: { acronym }
      })
    },
    editStudent (acronym) {
      console.log(acronym)
    },
    deleteStudent (acronym) {
      console.log(acronym)
    }
  }
}
</script>

<style scoped>
.styled-table {
  border-collapse: collapse;
  margin: 0 auto;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.styled-table tr th {
  background-color: #009879;
  color: #ffffff;
}

.styled-table th,
.styled-table td {
  padding: 12px 15px;
}

.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #009879;
}

.styled-table tbody tr.active-row {
  font-weight: bold;
  color: #009879;
}

.styled-table tbody td svg {
  padding: 0 10px;
}
</style>