db = require('./db.json')
students = require('./students.json')
teachers = require('./teachers.json')

module.exports = () => ({
  db: db,
  students: students,
  teachers: teachers
})