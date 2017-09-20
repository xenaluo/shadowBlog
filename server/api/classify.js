import { Router } from 'express'
const router = Router()
let Classify = require('../models/Classify')
// let bodyParser = require('body-parser')
// let urlencodedParser = bodyParser.urlencoded({ extended: false })
/* eslint-disable */
// 获取分类

router.get('/classify', (req, res) => {
  res.send('111')
  // Classify.find().exec().then((articles) => {
  //   res.send(articles)
  // })
})

router.post('/classify1', (req, res) => {
  // const classify = {
  //   name: name
  // }
  // new Classify(classify).save()
  // res.status(200).send('classify successed')
  console.log(req.body)
  console.log('555')
})

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

// module.exports = router
export default router
