import {Router} from 'express'
import { actualizarBoleto, actualizarEvento, crearBoleto, crearEvento, eliminarBoleto, eliminarEvento } from '../../controllers/adminEventoController'

const router = Router()

router.post("/crearEvento", crearEvento)
router.post("/actualizarEvento", actualizarEvento)
router.get("/eliminarEvento", eliminarEvento)

router.post("/crearBoleto", crearBoleto)
router.post("/actualizarBoleto", actualizarBoleto)
router.get("/eliminarBoleto", eliminarBoleto)


export default router