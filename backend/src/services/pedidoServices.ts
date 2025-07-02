import {PrismaClient} from '@prisma/client'
import { DatosActualizarPedido, DatosPedidoDetallado } from '../types/pagosType'
import { HttpError } from '../utils/errorManager'

const prisma = new PrismaClient()

export const genararPedido = async (id_usuario: number) => {
    try{
        const pedido = await prisma.pedidos.create({
            data: {
                id_usuario
            }
        })

        return pedido.id_pedido
    }catch{
        throw new HttpError("Error al generar el pedido", 409);
    }
}

export const crearPedidoDetallado = async ({id_pedido, id_boleto, cantidad}: DatosPedidoDetallado) => {
    const datosBoleto = await prisma.boletos.findUnique({where: {id_boleto}})

    if(!datosBoleto) throw new HttpError("Error al crear el pedido detallado", 409);

    const precio_unidad= datosBoleto.precio_boleto
    const subtotal = cantidad * precio_unidad.toNumber()

    await prisma.detalles_pedidos.create({
        data: {
            id_pedido,
            id_boleto,
            cantidad,
            precio_unidad,
            subtotal,
        }
    })

    return subtotal
}

export const actualizarPedido = async (id_pedido: number, data: DatosActualizarPedido) => {
    try{
        const {total_pedido} = data

        const pedido = await prisma.pedidos.update({
            where: {
                id_pedido
            },
            data: {
                total_pedido,
                estado_pedido: 3,
            }
        })

        return pedido

    }catch{
        throw new HttpError("Error al actualizar el pedido", 409);
    }
}

export const mostrarPedidos = async (id_usuario: number) => {
    const pedidos = await prisma.pedidos.findMany({where: {id_usuario}})

    if(pedidos.length === 0) throw new HttpError("No hay pedidos registrados", 404);

    return pedidos
}

export const cancelarPedido = async (id_pedido: number) => {
    const pedido = await prisma.pedidos.update({
        where: {
            id_pedido
        },
        data: {
            estado_pedido: 2
        }
    })

    return pedido
}

