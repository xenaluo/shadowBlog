const express = require('express')
const router = express.Router()
let Classify = require('../models/Classify')
/* eslint-disable */
// 获取分类
router.get('/api/classify', (req, res) => {
  res.send('111')
  // Classify.find().exec().then((articles) => {
  //   res.send(articles)
  // })
})

// 删除分类
// 删除文章并删除文章下面的评论
router.delete('/api/classify/:name', (req, res) => {
  Classify.remove({id: req.params.id}, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      db.Comment.remove({name: req.params.name}, (err, data) => {
        if (err) {
          console.log(err)
        } else {
          res.status(200).send('succeed in deleting ---' + data)
        }
      })
    }
  })

})

module.exports = router

