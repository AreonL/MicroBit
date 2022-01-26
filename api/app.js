require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const user = require('./router/user')

app.use(express.json())

const corsOptions = {
  origin (origin, cb) {
    if (process.env.NODE_ENV === 'development') {
      cb(null, origin)
      return
    }

    cb(null, [process.env.FRONTEND_URL])
  },
  credentials: true
}
app.use(cors(corsOptions))

app.use('/users', user)

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running on port ${process.env.PORT}`)
})