import {Router, Request, Response} from 'express'
import {PrismaClient} from '@prisma/client'
import { verificarTokenUsuario } from '../../middleware/middlewareUsuarioLogin'
import { RequestExtended } from '../../middleware/middlewareAdminLogin'

const router = Router()
const prisma = new PrismaClient()

router.get("/", verificarTokenUsuario, async (req: RequestExtended, res: Response) => {
    const usuario = req.usuario

    try{
        const usuariodetalle = await prisma.usuarios.findUnique({where: {id_usuario: usuario.id_usuario}})

        res.status(200).json(usuariodetalle)

    }catch(error){
        res.status(500).json({message: "Error al obtener perfil", error})
    }
})

export default router