import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export const mostrarEventos = async () => {
    const eventos = await prisma.eventos.findMany()

    if(eventos.length === 0) throw new Error("No hay eventos registrados hasta el momento");

    return eventos
}

export const mostrarEventosNombre = async (nombre: string) => {
    const eventos = await prisma.eventos.findMany({where: {nombre_evento: {contains: nombre}}})

    if(eventos.length === 0) throw new Error("No hay eventos registrados hasta el momento");

    return eventos
}

export const mostrarEventosCategoria = async (nombre: string) => {
    const eventos: [] = await prisma.$queryRaw`SELECT * FROM eventos e JOIN categorias c ON e.id_categoria = c.id_categoria WHERE c.nombre_categoria LIKE ${'%' + nombre + '%'}`
    
    if(eventos.length === 0) throw new Error("No hay eventos registrados hasta el momento de esa categoria");

    return eventos
}

export const mostrarCategorias = async () => {
    const categorias = await prisma.categorias.findMany()

    if(categorias.length === 0) throw new Error("No hay categorias registradas hasta el momento");

    return categorias
}