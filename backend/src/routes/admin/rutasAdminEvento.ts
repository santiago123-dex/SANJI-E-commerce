import {Router} from 'express'
import { actualizarBoleto, actualizarEvento, crearBoleto, crearEvento, eliminarBoleto, eliminarEvento } from '../../controllers/adminEventoController'

const router = Router()

router.post("/crearEvento", crearEvento)
router.put("/actualizarEvento", actualizarEvento)
router.delete("/eliminarEvento", eliminarEvento)

router.post("/crearBoleto", crearBoleto)
router.put("/actualizarBoleto", actualizarBoleto)
router.delete("/eliminarBoleto", eliminarBoleto)


export default router