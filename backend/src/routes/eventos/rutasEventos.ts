import {Router} from 'express'
import { mostrarEventos, mostrarEventosNombre, mostrarCategorias } from '../../controllers/eventosController'


const router = Router()


router.get("/", mostrarEventos)
router.post("/", mostrarEventosNombre)
router.get("/categorias", mostrarCategorias)

export default router