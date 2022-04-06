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

router.get('/me', authenticateToken, async (req, res) => {
  const users = await db.promise().query(`select * from users`)
  const user = users[0].find(user => user.acronym === req.user.acronym)
  res.status(200).json(user)
})

router.post('/', async (req, res) => {
  let { acronym, firstname, lastname, password } = req.body;
  const isTeacher = false;

  firstname = capitalizeFirstLetter(firstname.toLowerCase())
  lastname = capitalizeFirstLetter(lastname.toLowerCase())


  if (acronym && firstname && lastname && password) {
    try {
      // Crypt password
      const hashedPassword = await bcrypt.hash(password, 10)

      // Insert into database
      db.promise().query(`INSERT INTO USERS VALUES('${acronym.toLowerCase()}', '${firstname}', '${lastname}', '${hashedPassword}', ${isTeacher})`)
      res.status(201).send({ msg: 'Created User' })
    } catch (err) {
      console.log(err)
    }
  }
})

router.post('/login', async (req, res) => {
  const users = await db.promise().query(`select * from users`)
  const user = users[0].find(user => user.acronym === req.body.acronym)
  if (user == null) {
    return res.status(400).send('Cannot find user')
  }
  const userData = {
    acronym: user.acronym,
    firstname: user.firstname,
    lastname: user.lastname,
    isTeacher: user.isTeacher
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET)

      userData.token = accessToken
      userData.msg = `Successfully logged in.`

      res.send(userData)
    } else {
      res.status(401).send('Login failed, wrong password')
    }
  } catch {
    res.status(500).send()
  }
})

router.patch('/', async (req, res) => {
  const { acronym, toggle } = req.body
  const user = await db.promise().query(`select ${toggle} from users where acronym='${acronym}'`)
  let power
  if (toggle === 'isTeacher') {
    power = !user[0][0].isTeacher
  } else if (toggle === 'isAdmin') {
    power = !user[0][0].isAdmin
  }
  try {
    await db.promise().query(`update users set ${toggle}=${power} where acronym='${acronym}'`)
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

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


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