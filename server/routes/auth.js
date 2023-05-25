const express = require('express')
const { body } = require('express-validator')
const fetchUser = require('../middleware/fetchUser')

const router = express.Router()

router.post('/createuser', body('email').isEmail(), body('password').isStrongPassword(), require('./auth/CreateUser'))

router.post('/loginuser', body('email').isEmail(),body('password').isStrongPassword(), require('./auth/loginUser'))

router.get('/getUser',fetchUser ,require('./auth/getUser'))

module.exports = router;