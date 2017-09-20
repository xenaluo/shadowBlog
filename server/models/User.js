let mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  user_info: {
    uid: String,
    username: String,
    password: String,
    create_time: String,
    logout_time: String,
    login_time: String,
    permission_code: String
  },

  blog_info: {
    logo: String,
    blog_name: String,
    blog_desc: String
  },
  blog_model: [],
  footer_info: {
    copyright: String,
    beian: String
  }
}, {collection: 'user'})
const User = mongoose.model('User', UserSchema)
module.exports = User
