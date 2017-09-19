import { Router } from 'express'

import users from './users'
import classify from './classify'

const router = Router()

// Add USERS Routes
router.use(users)
router.use(classify)

export default router
