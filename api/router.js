const { Router } = require('express')

const userController = require('./controllers/user.js')

const router = new Router()

router.get('/users', userController.getUser)
router.post('/users', userController.createUser)
// router.get('/users/:id', userController.getOneUser)
// router.patch('/users/:id', userController.updateUser)
// router.delete('/users/:id', userController.deleteUser)

module.exports = {
  router
}