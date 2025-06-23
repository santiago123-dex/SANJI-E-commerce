import {PrismaClient} from '@prisma/client'
import { HttpError } from '../utils/errorManager';

const prisma = new PrismaClient()

export const mostrarEventos = async () => {
    const eventos = await prisma.eventos.findMany()

    if(eventos.length === 0) throw new HttpError("No hay eventos registrados hasta el momento", 404);

    return eventos
}

export const mostrarEventosNombre = async (nombre: string) => {
    const eventos = await prisma.eventos.findMany({where: {nombre_evento: {contains: nombre}}})

    if(eventos.length === 0) throw new HttpError("No hay eventos registrados hasta el momento con ese nombre", 404);

    return eventos
}

export const mostrarEventosCategoria = async (nombre: string) => {
    const eventos: [] = await prisma.$queryRaw`SELECT * FROM eventos e JOIN categorias c ON e.id_categoria = c.id_categoria WHERE c.nombre_categoria LIKE ${'%' + nombre + '%'}`
    
    if(eventos.length === 0) throw new HttpError("No hay eventos registrados hasta el momento de esa categoria", 404);

    return eventos
}

export const mostrarCategorias = async () => {
    const categorias = await prisma.categorias.findMany()

    if(categorias.length === 0) throw new HttpError("No hay categorias registradas hasta el momento", 404);

    return categorias
}