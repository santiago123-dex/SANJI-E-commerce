import {Router} from 'express'
import {loginAdmin} from '../../controllers/adminController'
import rutasAdminEvento from '../../routes/admin/rutasAdminEvento'
import { verificarAdmin } from '../../middleware/tokenMiddleware'

const router = Router()

router.post("/login", loginAdmin)
router.use("/eventos", verificarAdmin, rutasAdminEvento)

export default router