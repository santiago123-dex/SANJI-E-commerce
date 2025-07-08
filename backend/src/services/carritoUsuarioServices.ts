import {Prisma, PrismaClient} from '@prisma/client'
import { HttpError } from '../utils/errorManager'
import { DatosAgregarCarrito } from '../types/carritoType'
import {prisma} from '../utils/prisma'

export const mostrarCarrito = async (id: number) => {
    const id_usuario = id

    const carrito = await prisma.carrito.findMany({where: {id_usuario: id_usuario}})

    if(carrito.length === 0) throw new HttpError("No hay productos en el carrito", 404)

    return carrito
}

export const agregarProductoCarrito = async (id: number, data: DatosAgregarCarrito) => {
    try{
        const id_usuario = id
        const {id_boleto, cantidad} = data

        await prisma.carrito.create({
            data: {
                id_usuario,
                id_boleto,
                cantidad,
            }
        })
    }catch(error){
        if(error instanceof Prisma.PrismaClientValidationError) throw new HttpError("Datos inválidos para el registro", 400);
        throw new HttpError("Error al agregar el producto al carrito", 409);
    }

}

export const eliminarCarrito = async (id: number) => {
    const id_carrito = id

    const productoExisteAntes = await prisma.carrito.findUnique({where: {id_carrito}})

    if(!productoExisteAntes) throw new HttpError("El producto que intentas eliminar no existe", 404);

    try{
        await prisma.carrito.delete({where: {id_carrito}})
        
        const productoExiste = await prisma.carrito.findUnique({where: {id_carrito}})
        
        if(productoExiste) throw new HttpError("No se pudo eliminar el carrito", 400);
    }catch(error){
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if(error.code === 'P2025') throw new HttpError("El producto que intentas eliminar no existe", 404);
        }
        throw new HttpError("Error al eliminar el carrito", 409);
    }
}

export const eliminarTodoCarrito = async (id: number) => {
    try{
        const id_usuario = id

        await prisma.carrito.deleteMany({where: {id_usuario}})
    
    }catch(error){
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if(error.code === 'P2025') throw new HttpError("El producto que intentas eliminar no existe", 404);
        }
        throw new HttpError("Error al eliminar el carrito", 409);
    }
}