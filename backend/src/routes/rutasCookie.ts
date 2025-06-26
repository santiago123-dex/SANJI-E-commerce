import {Router} from 'express'
import {refreshCookie} from '../controllers/cookieController'

const router = Router()

router.get("/refresh", refreshCookie)

export default router