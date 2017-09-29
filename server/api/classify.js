import { Router } from 'express'
import Classify from '../methods/classify-method'
import confirmToken from '../middlewares/confirmToken'
const router = Router()

// 获取分类
router.get('/classify', confirmToken, Classify.getClassifyList)

// 增加分类
router.post('/classify/:name', confirmToken, Classify.addClassify)

// 更新分类
router.patch('/classify/:name', confirmToken, Classify.updateClassify)

// 删除分类
router.delete('/classify/:name', confirmToken, Classify.deleteClassify)

export default router
