const express = require('express')
const router = express.Router()
const User = require('../controllers/UserController')

router.post('/register', User.register)
router.post('/subscribe', User.subscribe)
router.post('/login', User.login)

router.get('/user', User.getUser)
router.patch('/user', User.patchUser)
router.delete('/user', User.deleteUser)



module.exports = router