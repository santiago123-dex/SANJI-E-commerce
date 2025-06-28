import {PrismaClient} from '@prisma/client'
import { HttpError } from '../utils/errorManager'

const prisma = new PrismaClient()

export const mostrarCarrito = async (id: number) => {
    const id_usuario = id

    const carrito = await prisma.carrito.findMany({where: {id_usuario: id_usuario}})

    if(carrito.length === 0) throw new HttpError("No hay productos en el carrito", 404)

    return carrito
}

export const agregarProductoCarrito = async (id: number, data: any) => {
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
    }catch{
        throw new HttpError("Error al agregar el producto al carrito", 409);
    }

}
