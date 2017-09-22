import express from 'express'
import Comment from '../methods/comment-method'

const router = express.Router()

// 发布评论并通知站长和评论者
router.post('/comment', Comment.Method1)

// 获取某一篇文章的所有评论
router.get('/comments', Comment.Method2)

// 更新评论的点赞数
router.patch('/comments/:id', Comment.Method3)
export default router
