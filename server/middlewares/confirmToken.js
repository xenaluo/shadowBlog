const jwt = require('jsonwebtoken')
const secret = require('../config/index.js').jwt

// 检查token是否正确
const confirmToken = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).end('no token')
  } else {
    const token = req.headers.authorization.split(' ')[0]
    jwt.verify(token, secret.cert, function (err) {
      if (err) {
        console.log('2323' + err)
        res.status(401).end(err.message)
      } else {
        next()
      }
    })
  }
}

module.exports = confirmToken
