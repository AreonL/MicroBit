const { useAsync } = require('../utils/express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const users = []

module.exports.getUser = useAsync(async (req, res) => {
  const user = users
  res.json({ data: user })
})

module.exports.createUser = useAsync(async (req, res) => {
  console.log(req.params)
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = { name: req.body.name, password: hashedPassword}
    users.push(user)
    res.status(201).send()
  } catch {
    res.status(500).send()
  }
})