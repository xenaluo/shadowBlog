import { Router } from 'express'
import Classify from '../methods/classify-method'
const router = Router()

// 获取分类
router.get('/classify', Classify.getClassifyList)

// 增加分类
router.post('/classify/:name', Classify.addClassify)

// 更新分类
router.patch('/classify/:name', Classify.updateClassify)

// 删除分类
router.delete('/classify/:name', Classify.deleteClassify)

export default router
