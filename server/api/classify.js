/* eslint-disable */

import { Router } from 'express'
const  router = Router()
let Classify = require('../models/Classify')
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
/* eslint-disable */
const users = [
  { name: 'Al' },
  { name: 'Po' },
  { name: 'Sébastien' }
]
router.get('/classify', (req, res ,next) => {
  res.json(users)

  // Classify.find().exec().then((articles) => {
  //   res.send(articles)
  // })
})

//添加分类

router.post('/classify1', urlencodedParser, (req, res) => {
  // const classify = {
  //   name: name
  // }
  // new Classify(classify).save()
  // res.status(200).send('classify successed')
  console.log(req.body.name)
  console.log('555')


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
