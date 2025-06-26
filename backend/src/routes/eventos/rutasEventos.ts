import {Router} from 'express'
import { mostrarEventos, mostrarEventosNombre, mostrarCategorias, mostrarEventosCategoria, mostrarEventosId, mostrarBoletosPorEvento } from '../../controllers/eventosController'

const router = Router()

router.get("/", mostrarEventos)
router.get("/buscar_nombre", mostrarEventosNombre)
router.get("/evento_categoria", mostrarEventosCategoria)
router.get("/id_evento", mostrarEventosId)
router.get("/id_evento_boleto", mostrarBoletosPorEvento)
router.get("/categorias", mostrarCategorias)

export default router