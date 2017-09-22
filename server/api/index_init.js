import Article from '../models/Article'
import express from 'express'
import User from '../models/User'
const router = express.Router()
let initData = {}
router.get('/articles', (req, res) => {
  let articleQuery = {
    state: 1
  }
  Article.find(articleQuery, function (err, data) {
    if (err) {
      console.log('article find err')
    } else {
      Object.assign(initData, data)
      User.find({username: 'admin'}, function (err, data) {
        if (err) {
          console.log('user find err')
        } else {
          Object.assign(initData, data)
          console.log(initData)
          res.send(initData)
        }
      })
    }
  })
})
export default router
