import Article from '../methods/article-method'
import express from 'express'
// import db from '../db/db.js'
import confirmToken from '../middlewares/confirmToken'
const router = express.Router()

// 发布文章
router.post('/article/add', Article.commitNewArticle)

router.get('/article/issue', Article.getIssueArticle)
router.get('/article/draft', Article.getDraftArticle)

router.post('/article/delete', Article.deleteArticle)
// todo: 待修改 --start
// 获取某篇文章
router.get('/article', Article.getSingleArticle)

// 更新文章
router.patch('/article/:id', confirmToken, (req, res) => {
  const id = req.params.id
  const article = {
    // title: req.body.title,
    // tags: req.body.tags,
    // date: Date(),
    // content: req.body.content,
    // isPublish: true
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

// todo: 待修改 --end
// module.exports = router
export default router
