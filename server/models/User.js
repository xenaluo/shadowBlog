let mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  uid: String,
  username: String,
  password: String,
  create_time: String,
  logout_time: String,
  login_time: String,
  permission_code: String,
  salt: String,
  logo: String,
  blog_name: String,
  blog_desc: String,
  copyright: String,
  beian: String
}, {collection: 'user'})
const User = mongoose.model('User', UserSchema)
module.exports = User
