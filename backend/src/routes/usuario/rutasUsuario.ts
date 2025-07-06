import {Router} from 'express'
import {registrarUsuario, loginUsuario, perfilUsuario, logoutUsuario, actualizarPerfil, borrarCuenta} from '../../controllers/usuarioController'
import { verificarUsuario } from '../../middleware/tokenMiddleware'
import { agregarProductoCarrito, eliminarCarrito, eliminarTodoCarrito, mostrarCarrito } from '../../controllers/carritoUsuarioController'
import { sistemaPago, verificarDatosTarjeta } from '../../controllers/pagosController'
import { cancelarPedido, generarPedido } from '../../controllers/pedidoController'

const router = Router()

router.post("/registro", registrarUsuario)
router.post("/login", loginUsuario)
router.get("/logout", logoutUsuario)

router.get("/perfil", verificarUsuario, perfilUsuario)
router.put("/actualizarPerfil", verificarUsuario, actualizarPerfil)
router.delete("/borrarCuenta", verificarUsuario, borrarCuenta)

router.get("/carrito", verificarUsuario, mostrarCarrito)
router.post("/agregarCarrito", verificarUsuario, agregarProductoCarrito)
router.delete("/eliminarCarrito", verificarUsuario, eliminarCarrito)
router.delete("/eliminarTodoCarrito", verificarUsuario, eliminarTodoCarrito)

router.get("/generarPedido", verificarUsuario, generarPedido)
router.get("/cancelarPedido", verificarUsuario, cancelarPedido)

router.post("/pagarPedido", verificarUsuario, sistemaPago)
router.post("/verificarDatosPago", verificarUsuario, verificarDatosTarjeta)

export default router