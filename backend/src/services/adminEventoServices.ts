import {PrismaClient} from '@prisma/client'
import { EventoCompleto } from '../types/adminEventoType'
import { HttpError } from '../utils/errorManager'

const prisma = new PrismaClient()

export const crearEvento = async (data: EventoCompleto) => {
    const {id_categoria, nombre_evento, descripcion_evento, fecha_evento, ubicacion, imagen_evento, estado_evento} = data

    const fechaFormateada = new Date(fecha_evento)

    if(isNaN(fechaFormateada.getDate())) throw new HttpError("Fecha invalida", 400);

    return prisma.eventos.create({
        data: {
            id_categoria,
            nombre_evento,
            descripcion_evento,
            fecha_evento: fechaFormateada,
            ubicacion,
            imagen_evento,
            estado_evento,
        }
    })
}