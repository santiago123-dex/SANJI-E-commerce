import {Prisma, PrismaClient} from '@prisma/client'
import { BoletoCompleto, EventoCompleto } from '../types/adminEventoType'
import { HttpError } from '../utils/errorManager'
import {prisma} from '../utils/prisma'

export const crearEvento = async (data: EventoCompleto) => {
    const {id_categoria, nombre_evento, descripcion_evento, fecha_evento, ubicacion, imagen_evento, estado_evento} = data

    const fechaFormateada = new Date(fecha_evento)

    if(isNaN(fechaFormateada.getDate())) throw new HttpError("Fecha invalida", 400);
    try{
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
    }catch(error){
        if (error instanceof Prisma.PrismaClientValidationError) {
            throw new HttpError('Datos inválidos para el registro', 400)
        }else{
            throw error
        }
    }
}

export const actualizarEvento = async(data: EventoCompleto) => {
    try{
        const {id_evento, id_categoria, nombre_evento, descripcion_evento, fecha_evento, ubicacion, imagen_evento, estado_evento} = data 

        const evento = await prisma.eventos.update({
            where: {
                id_evento
            },
            data: {
                id_categoria,
                nombre_evento,
                descripcion_evento,
                fecha_evento,
                ubicacion,
                imagen_evento,
                estado_evento,
            }
        })
    
    }catch(error){
        if(error instanceof Prisma.PrismaClientValidationError) throw new HttpError("Datos inválidos para actualizar", 400);
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if(error.code === 'P2025') throw new HttpError("El evento que intentas actualizar no existe", 404);
        }
        throw new HttpError("No se pudo actualizar el evento", 400);
    }
}

export const eliminarEvento = async (data: number) => {
    try{
        const id_evento = data

        if(typeof id_evento !== 'number' || isNaN(id_evento)) throw new HttpError("El id del evento debe ser un numero", 400)
        
        const eventoExiste = await prisma.eventos.findUnique({where: {id_evento}})
        
        if(!eventoExiste) throw new HttpError("El evento que intentas borrar no existe", 404);
        
        await prisma.eventos.delete({where: {id_evento}})
        
        const evento = await prisma.eventos.findUnique({where: {id_evento}})
        
        if(evento) throw new HttpError("No se pudo eliminar el evento", 400);
    }catch(error){
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if(error.code === 'P2025') throw new HttpError("El evento que intentas borrar no existe", 404);
            if(error.code === 'P2003') throw new HttpError("No se pudo eliminar el evento, ya que tiene boletos asignados", 409);
        }else{
            throw error
        }

    }
}

export const crearBoleto = async (data: BoletoCompleto) => {
    const {id_evento, id_tipo, precio_boleto, stock, descripcion_boleto, estado_boleto} = data

    const existeBoleto: [] = await prisma.$queryRaw`SELECT * FROM boletos b WHERE b.id_evento = ${id_evento} AND b.id_tipo = ${id_tipo}`

    if(existeBoleto.length > 0) throw new HttpError("Ya existe un boleto de ese tipo en este evento", 409);

    try{
        const boleto = await prisma.boletos.create({
            data:{
                id_evento,
                id_tipo,
                precio_boleto,
                stock,
                descripcion_boleto,
                estado_boleto,
            }
        })
        
        return boleto
    }catch(error){
        if (error instanceof Prisma.PrismaClientValidationError) {
            throw new HttpError('Datos inválidos para el registro', 400)
        }else{
            throw error
        }
    }
}

export const actualizarBoleto = async (data: BoletoCompleto) => {
    try{
        const {id_boleto, id_evento, id_tipo, precio_boleto, stock, descripcion_boleto, estado_boleto} = data

        const existeBoleto = await prisma.boletos.findUnique({where: {id_boleto}})

        if(!existeBoleto) throw new HttpError("El boleto que intentas actualizar no existe", 404);

        const boleto = await prisma.boletos.update({
            where: {
                id_boleto
            },
            data: {
                id_evento,
                id_tipo,
                precio_boleto,
                stock,
                descripcion_boleto,
                estado_boleto,
            }
        })
    }catch(error){
        if(error instanceof Prisma.PrismaClientValidationError) throw new HttpError("Datos inválidos para actualizar", 400);
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if(error.code === 'P2025') throw new HttpError("El boleto que intentas actualizar no existe", 404);
        }
        throw new HttpError("No se pudo actualizar el boleto", 400);
    }
}

export const eliminarBoleto = async (data: number) => {
    try{
        const id_boleto = data

        if(typeof id_boleto !== 'number' || isNaN(id_boleto)) throw new HttpError("El id del boleto debe ser un numero", 400)

        const boleto = await prisma.boletos.findUnique({where: {id_boleto}})
    
        if(!boleto) throw new HttpError("No se puede eliminar un boleto que no existe ", 404);
    
        await prisma.boletos.delete({where: {id_boleto}})
    }catch(error){
        if (error instanceof Prisma.PrismaClientKnownRequestError){
            if(error.code === 'P2025') throw new HttpError("El boleto que intentas eliminar no existe", 404);
            if(error.code === 'P2003') throw new HttpError("No se pudo eliminar el boleto, ya que tiene pedidos asignados", 409);
        }
        throw error
    }
}