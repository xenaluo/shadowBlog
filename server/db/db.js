
// 创建MongoDB数据库
// 导入mongoose模块
let mongoose = require('mongoose')
// 链接数据库
mongoose.connect('mongodb://127.0.0.1:27017/shadowblog')

// 是否连接成功 连接的事件
mongoose.connection.on('connected', function () {
  console.log('connect success')
})

// 连接出现错误
mongoose.connection.on('error', function (err) {
  console.log('connect error:' + err)
})

// 连接断开
mongoose.connection.on('disconnected', function () {
  console.log('disconnected')
})

// 打包导出为模块
module.exports = mongoose
