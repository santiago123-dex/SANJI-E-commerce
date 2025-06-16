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
    const {tipo_dato, dato_busqueda} = req.body
    let eventos: any

    try{
        if(tipo_dato == 'nombre' && dato_busqueda){
            eventos = await prisma.$queryRaw`SELECT * FROM eventos WHERE nombre_evento LIKE ${'%' + dato_busqueda + '%'}`
        }else if(tipo_dato == 'categoria' && dato_busqueda){
            eventos = await prisma.$queryRaw`SELECT * FROM eventos e JOIN categorias c ON e.id_categoria = c.id_categoria WHERE c.nombre_categoria LIKE ${'%' + dato_busqueda + '%'}`
        }else{
            eventos = await prisma.eventos.findMany()
        }

        if(eventos.length === 0) {
            return res.status(404).json({message: "No se encontraron eventos relacionados con la búsqueda"})
        }

        res.status(200).json(eventos)

    }catch(error){
        res.status(500).json({message: "Error al buscar eventos", error})
    }
})


export default router