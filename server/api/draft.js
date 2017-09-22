import express from 'express'
import confirmToken from '../middlewares/confirmToken'
import Draft from '../methods/draft-method'
const router = express.Router()

// 保存草稿
router.post('/draft', confirmToken, Draft.Method1)

// 更新草稿
router.patch('/draft/:aid', confirmToken, Draft.Method2)

// 获取所有的草稿
router.get('/drafts', Draft.Method3)

export default router
