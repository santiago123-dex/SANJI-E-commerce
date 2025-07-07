import {Router} from 'express'
import {loginAdmin, logoutAdmin} from '../../controllers/adminController'
import rutasAdminEvento from '../../routes/admin/rutasAdminEvento'
import { verificarAdmin } from '../../middleware/tokenMiddleware'

const router = Router()

router.post("/login", loginAdmin)
router.get("/logout", logoutAdmin) 
router.use("/eventos", verificarAdmin, rutasAdminEvento)

export default router