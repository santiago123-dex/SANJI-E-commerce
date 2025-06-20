import {Router} from 'express'
import { crearEvento } from '../../controllers/adminEventoController'

const router = Router()

router.post("/crearEvento", crearEvento)

export default router