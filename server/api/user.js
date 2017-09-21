const express = require('express')
const router = express.Router()
const rand = require('csprng')
const sha1 = require('sha1')
let User = require('../models/User')
// 验证用户名是否正确
router.post('/user', async (req, res) => {
  let username = req.body.name
  let find = await User.findOne({username: username})
  console.log(find)
  if (find === null){
    res.send('2')
  } else {
    let newpsd = sha1(req.body.psd + find.salt)
    if (newpsd === find.password) {
      res.send('1')
    } else {
      res.send('0')
    }
  }
  // console.log(username)
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
export default router

/* 最初存取初始管理员账户部分
  const salt = rand(160, 36)
  let user = {
    user_info: {
      username: req.body.name,
      password: sha1(req.body.psd + salt),
      login_time: req.body.time,
      permission_code: 777, // 最高权限777
      salt
    }
  }
  new User(user).save().then((res) => {
    console.log('插入成功', res)
  })
 */
