import {Router} from 'express'
import {registrarUsuario, loginUsuario, perfilUsuario, logoutUsuario, actualizarPerfil, borrarCuenta} from '../../controllers/usuarioController'
import { verificarUsuario } from '../../middleware/tokenMiddleware'
import { agregarProductoCarrito, eliminarCarrito, mostrarCarrito } from '../../controllers/carritoUsuarioController'

const router = Router()

router.post("/registro", registrarUsuario)
router.post("/login", loginUsuario)
router.get("/logout", logoutUsuario)

router.get("/perfil", verificarUsuario, perfilUsuario)
router.post("/actualizarPerfil", verificarUsuario, actualizarPerfil)
router.get("/borrarCuenta", verificarUsuario, borrarCuenta)

router.get("/carrito", verificarUsuario, mostrarCarrito)
router.post("/agregarCarrito", verificarUsuario, agregarProductoCarrito)
router.get("/eliminarCarrito", verificarUsuario, eliminarCarrito)


export default router