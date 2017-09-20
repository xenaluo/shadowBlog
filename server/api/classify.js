import { Router } from 'express'

const router = Router()
let Classify = require('../models/Classify')
/* eslint-disable */
const users = [
  { name: 'Alesssssss' },
  { name: 'Pooya' },
  { name: 'Sébastien' }
]
// 获取分类
// router.get('/classify', (req, res) => {
//   res.json({name: '111'})
//   // Classify.find().exec().then((articles) => {
//   //   res.send(articles)
//   // })
// })

// 删除分类
// 删除文章并删除文章下面的评论
router.delete('/classify/:name', (req, res) => {
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

export default router

