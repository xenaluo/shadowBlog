const express = require('express')
const router = express.Router()

const rand = require('csprng')
const sha1 = require('sha1')
let User = require('../models/User')
// 验证用户名是否正确
router.post('/user', (req, res) => {
})
// 修改账户
router.post('/updateuser', (req, res) => {
  const salt = rand(160, 36)
  const user = {
    salt: salt,
    name: req.body.name,
    password: sha1(req.body.password + salt)
  }
  User.update({_id: req.body.id}, user, (err) => {
    if (err) {
      console.log(err)
    } else {
      res.status(200).send('update successfully')
    }
  })
})
module.exports = router
