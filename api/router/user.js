const { Router } = require('express')
const db = require('../db.js')
const router = Router()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.use((req, res, next) => {
  console.log('Request made to /USER')
  next()
})

router.get('/', async (req, res) => {
  const users = await db.promise().query(`select * from users`)
  res.status(200).json(users[0])
})

router.post('/', async (req, res) => {
  const { name, password } = req.body;
  const isTeacher = false;
  if (name && password) {
    try {
      // Crypt password
      const hashedPassword = await bcrypt.hash(password, 10)

      // Insert into database
      db.promise().query(`INSERT INTO USERS VALUES('${name}', '${hashedPassword}', ${isTeacher})`)
      res.status(201).send({ msg: 'Created User' })
    } catch (err) {
      console.log(err)
    }
  }
})

router.post('/login', async (req, res) => {
  const users = await db.promise().query(`select * from users`)
  const user = users[0].find(user => user.name === req.body.name)
  if (user == null) {
    return res.status(400).send('Cannot find user')
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = jwt.sign(user.name, process.env.ACCESS_TOKEN_SECRET)

      const data = {
        name: user.name,
        token: accessToken,
        msg: `Succressfully logged in`,
        isTeacher: user.isTeacher
      }

      res.send(data)
    } else {
      res.send('Not Allowed, login failed')
    }
  } catch {
    res.status(500).send()
  }
})

router.patch('/', async (req, res) => {
  const { name, toggle } = req.body
  const user = await db.promise().query(`select ${toggle} from users where name='${name}'`)
  const power = !user[0][0].isTeacher
  try {
    await db.promise().query(`update users set ${toggle}=${power} where name='${name}'`)
    res.status(201).send({ msg: `Toggled power of ${toggle}` })
  } catch (err) {
    console.log(err)
  }
})

router.delete('/', async (req, res) => {
  try {
    db.promise().query(`delete from users`)
    res.status(201).send({ msg: 'Deleted database' })
  } catch (err) {
    console.log(err)
  }
})


// router.post('/', async (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10)
//     const user = { name: req.body.name, password: hashedPassword}
//     users.push(user)
//     res.sendStatus(201)
//   } catch {
//     res.sendStatus(500)
//   }
// })

// router.post('/login', async (req, res) => {
//   const user = users.find(user => user.name === req.body.name)
//   if (user == null) {
//     return res.status(400).send('Cannot find user')
//   }
//   try {
//     if (await bcrypt.compare(req.body.password, user.password)) {
//       res.send(`Succressfully logged in as ${user.name}`)
//     } else {
//       res.send('Not Allowed, login failed')
//     }
//   } catch {
//     res.status(500).send()
//   }
// })

module.exports = router;