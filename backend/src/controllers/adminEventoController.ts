import { Request, Response } from 'express'
import * as adminEventoServices from '../services/adminEventoServices'

export const crearEvento = async (req: Request, res: Response) => {
    try {
        const { id_categoria, nombre_evento, descripcion_evento, fecha_evento, ubicacion, imagen_evento, estado_evento } = req.body

        if (!id_categoria || !nombre_evento || !fecha_evento || !ubicacion || !estado_evento) return res.status(400).json({ message: 'Faltan datos' });

        const evento = await adminEventoServices.crearEvento(req.body)
    } catch (error) {
        res.status(500).json({ message: 'Ha ocurrido un error al crear el evento', error: error })
    }
}