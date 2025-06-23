import {Router} from 'express'
import {refreshCookie} from '../controllers/cookieController'

const router = Router()

router.post("/refresh", refreshCookie)

export default router