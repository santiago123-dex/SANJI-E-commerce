import {Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

// RUTA PARA OBTENER TODOS LOS EVENTOS
router.get("/eventos", async (_req: Request, res: Response) => {
    try{
        const eventos = await prisma.eventos.findMany()
    
        if(eventos.length === 0) {
            return res.status(404).json({message: "No hay eventos disponibles"})
        }

        res.status(200).json(eventos)
    }catch(error){
        res.status(500).json({message: "Error al obtener eventos", error})
    }
})

router.post("/eventos", async (req: Request, res: Response) => {
    const {dato_busqueda} = req.body
    if(!dato_busqueda){
        res.status(400).json({message: "Ingrese un dato para buscar"})
        return
    }

    try{
        const eventos: [] = await prisma.$queryRaw`SELECT * FROM eventos WHERE nombre_evento LIKE ${'%' + dato_busqueda + '%'}`

        if(eventos.length === 0) {
            return res.status(404).json({message: "No se encontraron eventos relacionados con la búsqueda"})
        }

        res.status(200).json(eventos)

    }catch(error){
        res.status(500).json({message: "Error al buscar eventos", error})
    }
})


export default router