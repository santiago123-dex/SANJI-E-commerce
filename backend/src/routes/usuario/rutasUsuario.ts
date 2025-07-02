import {Router} from 'express'
import {registrarUsuario, loginUsuario, perfilUsuario, logoutUsuario, actualizarPerfil, borrarCuenta} from '../../controllers/usuarioController'
import { verificarUsuario } from '../../middleware/tokenMiddleware'
import { agregarProductoCarrito, eliminarCarrito, mostrarCarrito } from '../../controllers/carritoUsuarioController'
import { sistemaPago, verificarDatosTarjeta } from '../../controllers/pagosController'
import { cancelarPedido, generarPedido } from '../../controllers/pedidoController'

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

router.get("/generarPedido", verificarUsuario, generarPedido)
router.get("/cancelarPedido", verificarUsuario, cancelarPedido)

router.post("/pagarPedido", verificarUsuario, sistemaPago)
router.post("/verificarDatosPago", verificarUsuario, verificarDatosTarjeta)

export default router