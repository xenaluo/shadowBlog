import { Router } from 'express'
import bodyParser from 'body-parser'
import classify from './classify'
import article from './article'
import draft from './draft'
import login from './login'
import user from './user'
import comment from './comment'
import  index_init from './index_init'

const router = Router()
router.use(bodyParser.urlencoded({extended: false}))
// Add USERS Routes
router.use(classify)
router.use(article)
router.use(draft)
router.use(login)
router.use(user)
router.use(comment)
router.use(index_init)

export default router
