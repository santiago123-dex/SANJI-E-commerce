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

export default router