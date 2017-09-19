const express = require('express')
const router = express.Router()
const db = require('../db/db.js')
const confirmToken = require('../middlewares/confirmToken')
let Article = require('../models/Article')
/* eslint-disable */
// 发布文章
router.post('/api/article', confirmToken, (req, res) => {
  const article = {
    // comment_n: 0,
    // title: req.body.title,
    // content: req.body.content,
    // date: Date(),
    // tags: req.body.tags,
    // isPublish: true
    id: '1',
    title: req.body.title,
    state: req.body.state,
    author: req.body.author,
    current_name: req.body.current_name,
    publish_time: req.body.publish_time,
    images: [],
    classify: req.body.classify,
    content: req.body.content,
    label: req.body.label,
    is_top: req.body.is_top,
    can_comment: req.body.can_comment,
    is_draft: Boolean
  }
  new Article(article).save()
  res.status(200).send('succeed in saving new passage.')
})

// 获取某篇文章
router.get('/api/article/:id', (req, res) => {
  Article.findOne({id: req.params.id}, (err, doc) => {
    if (err) {
      console.log(err)
    } else {
      res.status(200).send(doc)
    }
  })
})

// 删除文章并删除文章下面的评论
router.delete('/api/article/:id', confirmToken, (req, res) => {
  Article.remove({id: req.params.id}, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      db.Comment.remove({articleId: req.params.id}, (err, data) => {
        if (err) {
          console.log(err)
        } else {
          res.status(200).send('succeed in deleting ---' + data)
        }
      })
    }
  })

})

// 更新文章
router.patch('/api/article/:id', confirmToken, (req, res) => {
  const id = req.params.id
  const article = {
    // title: req.body.title,
    // tags: req.body.tags,
    // date: Date(),
    // content: req.body.content,
    // isPublish: true
    id: '1',
    title: req.body.title,
    state: req.body.state,
    author: req.body.author,
    current_name: req.body.current_name,
    publish_time: req.body.publish_time,
    images: [],
    classify: req.body.classify,
    content: req.body.content,
    label: req.body.label,
    is_top: req.body.is_top,
    can_comment: req.body.can_comment
  }
  Article.update({id: id}, article, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      res.status(200).send('succeed in updating ---' + data.title)
    }
  })
})

// 获取很多文章
router.get('/api/articles', (req, res) => {
  const page = req.query.payload.page
  const value = req.query.payload.value
  const limit = req.query.payload.limit - 0 || 4
  const skip = limit * (page - 1 )
  if (value && value !== '全部') {
    Article.find({tags: value, isPublish: true}).sort({date: -1}).limit(limit).skip(skip).exec()
      .then((articles) => {
        res.send(articles)
      })
  } else {
    Article.find({isPublish: true}).sort({date: -1}).limit(limit).skip(skip).exec().then((articles) => {
      res.send(articles)
    })
  }
})
/* eslint-disable */