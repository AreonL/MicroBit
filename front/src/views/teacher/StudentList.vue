<template>
  <div class="studentList">
    <h1>Teacher: Elev lista</h1>
    <StudentList />
  </div>
</template>

<script>
import StudentList from "@/components/teacher/StudentList.vue"

export default {
  components: {
    StudentList,
  },
}
</script>
