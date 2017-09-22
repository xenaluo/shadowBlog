import Article from '../methods/article-method'
import express from 'express'
const router = express.Router()
import User from  '../models/User'

let init_data = {}
router.get('/articles',  (req, res) => {
  let article_query = {
    state: 1
  }
  Article.find(article_query, function (err,data) {
    if (err) {
      console.log('article find err')
    } else {
      Object.assign(init_data,data)
      User.find({username: 'admin'}, function (err,data) {
        if (err) {
          console.log('user find err')
        } else {
          Object.assign(init_data,data)
          console.log(init_data)
        }
      })
    }
  })
 }