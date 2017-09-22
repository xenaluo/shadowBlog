 import express from 'express'
import User from '../methods/user-method'

const router = express.Router()
// 验证用户名是否正确
router.post('/user', User.userLogin)
// 修改账户
router.post('/updateuser', User.updateUserInfo)
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
