import {PrismaClient} from '@prisma/client'
import { HttpError } from '../utils/errorManager';

const prisma = new PrismaClient()

export const mostrarEventos = async () => {
    const eventos = await prisma.eventos.findMany()

    if(eventos.length === 0) throw new HttpError("No hay eventos registrados hasta el momento", 404);

    return eventos
}

export const mostrarEventoId = async (id_evento: number) => {
    const evento = await prisma.eventos.findUnique({where: {id_evento}})

    if(!evento) throw new HttpError("No hay eventos registrados hasta el momento con ese id", 404)

    return evento
}

export const mostrarEventosNombre = async (nombre_evento: string) => {
    const eventos = await prisma.eventos.findMany({where: {nombre_evento: {contains: nombre_evento}}})

    if(eventos.length === 0) throw new HttpError("No hay eventos registrados hasta el momento con ese nombre", 404);

    return eventos
}

export const mostrarEventosCategoria = async (nombre: string) => {
    const eventos: [] = await prisma.$queryRaw`SELECT * FROM eventos e JOIN categorias c ON e.id_categoria = c.id_categoria WHERE c.nombre_categoria LIKE ${'%' + nombre + '%'}`
    
    if(eventos.length === 0) throw new HttpError("No hay eventos registrados hasta el momento de esa categoria", 404);

    return eventos
}

export const mostrarBoletosPorEvento = async (id_evento: number) => {
    const boletos: [] = await prisma.$queryRaw`SELECT * FROM boletos b JOIN eventos e ON b.id_evento = e.id_evento WHERE e.id_evento LIKE ${'%' + id_evento + '%'}`
    
    if(boletos.length === 0) throw new HttpError("No hay boletos registrados hasta el momento para ese evento", 404);

    return boletos
}

export const mostrarCategorias = async () => {
    const categorias = await prisma.categorias.findMany()

    if(categorias.length === 0) throw new HttpError("No hay categorias registradas hasta el momento", 404);

    return categorias
}