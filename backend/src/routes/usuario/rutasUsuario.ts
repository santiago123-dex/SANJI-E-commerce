import {Router} from 'express'
import {registrarUsuario, loginUsuario, perfilUsuario} from '../../controllers/usuarioController'
import { verificarUsuario } from '../../middleware/tokenMiddleware'

const router = Router()

router.post("/registro", registrarUsuario)
router.post("/login", loginUsuario)
router.get("/perfil", verificarUsuario, perfilUsuario)

export default router