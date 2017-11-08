import express from 'express'
import Login from '../methods/login-method'
// const secret = require('../config').jwt

const router = express.Router()

router.post('/login', Login.login)
// router.post('/login', function (req, res) {
//   res.send('2')
// })
export default router
