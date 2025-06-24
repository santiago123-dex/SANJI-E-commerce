import {Router, Request, Response} from 'express'
import {PrismaClient} from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

router.get("/eventos", async(_req: Request, res: Response) => {
    const eventos = await prisma.eventos.findMany()
    res.json(eventos)
})

router.get("/categorias", async(_req: Request, res: Response) => {
    const eventos = await prisma.categorias.findMany()
    res.json(eventos)
})

router.get("/usuarios", async(_req: Request, res: Response) => {
    const eventos = await prisma.usuarios.findMany()
    res.json(eventos)
})

router.get("/admins", async(_req: Request, res: Response) => {
    const eventos = await prisma.administradores.findMany()
    res.json(eventos)
})

export default router