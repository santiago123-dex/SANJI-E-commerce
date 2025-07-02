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

router.get("/boletos", async(_req: Request, res: Response) => {
    const eventos = await prisma.boletos.findMany()
    res.json(eventos)
})

router.get("/carrito", async(_req: Request, res: Response) => {
    const eventos = await prisma.carrito.findMany()
    res.json(eventos)
})

router.get("/tipos", async(_req: Request, res: Response) => {
    const eventos = await prisma.tipos.findMany()
    res.json(eventos)
})

router.get("/detallesPedidos", async(_req: Request, res: Response) => {
    const eventos = await prisma.detalles_pedidos.findMany()
    res.json(eventos)
})

router.get("/pedidos", async(_req: Request, res: Response) => {
    const eventos = await prisma.pedidos.findMany()
    res.json(eventos)
})

router.get("/pagos", async(_req: Request, res: Response) => {
    const eventos = await prisma.pagos.findMany()
    res.json(eventos)
})

router.get("/tarjetas", async(_req: Request, res: Response) => {
    const eventos = await prisma.tarjetas.findMany()
    res.json(eventos)
})

export default router
