const sha1 = require('sha1')
const rand = require('csprng')
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/shadowblog')
mongoose.connection.on('connected', function () {
  console.log('connect success')
})
mongoose.connection.on('error', function (err) {
  console.log('connect error:' + err)
})
let Schema = mongoose.Schema
const UserSchema = new Schema({
  uid: String,
  username: String,
  password: String,
  create_time: String,
  logout_time: String,
  login_time: String,
  permission_code: String,
  salt: String
}, {collection: 'user'})
const User = mongoose.model('User', UserSchema)

const incSchema = new Schema({
  name: String,
  id: Number
}, {collection: 'incs'})

const Incs = mongoose.model('Incs', incSchema)

const salt = rand(160, 36)

function currentTime() {
  let currentDate = new Date()
  let year = currentDate.getFullYear()
  let month = currentDate.getMonth() + 1 < 10 ? '0' + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1)
  let date = currentDate.getDate() < 10 ? '0' + currentDate.getDate() : currentDate.getDate()
  let hours = currentDate.getHours() < 10 ? '0' + currentDate.getHours() : currentDate.getHours()
  let minutes = currentDate.getMinutes() < 10 ? '0' + currentDate.getMinutes() : currentDate.getMinutes()
  let seconds = currentDate.getSeconds() < 10 ? '0' + currentDate.getSeconds() : currentDate.getSeconds()
  return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds
}

let time = currentTime()
let psd = sha1('admin')
let newpsd = sha1(psd + salt)
let user1 = new User({
  username: 'admin',
  password: newpsd,
  create_time: time,
  login_time: time,
  permission_code: 777,
  salt: salt
})
let articleID = new Incs({
  name: 'article',
  id: 0
})
user1.save(function () {
  articleID.save(function () {
    console.log('ShadowBlog初始化成功,用户名:admin,密码:admin,权限:管理员,登录后请修改账户密码,请删除此文件!')
  })
})
