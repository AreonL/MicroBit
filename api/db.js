require('dotenv').config()
const mysql = require('mysql2');

module.exports = mysql.createConnection({
  host: 'localhost',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: 'MicroBit'
})