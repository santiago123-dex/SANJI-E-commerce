import { Prisma, PrismaClient } from "@prisma/client"
import { HttpError } from "../utils/errorManager"
import { DatosPago } from "../types/pagosType"
import {prisma} from '../utils/prisma'

export const sistemaPago = async (id_pedido: number, data: DatosPago) => {
    try{
        const {id_metodo, nombre_paga, tipo_documento, numero_documento, monto} = data

        const pago = await prisma.pagos.create({
            data: {
                id_pedido,
                id_metodo,
                nombre_paga,
                tipo_documento,
                numero_documento,
                monto,
                estado: 1
            }
        })

        await prisma.pedidos.update({
            where: {
                id_pedido
            },
            data: {
                estado_pedido: 1
            }
        })

        return pago
        
    }catch(error){
        if(error instanceof Prisma.PrismaClientValidationError) throw new HttpError("Datos inválidos para el registro", 400);
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if(error.code === 'P2025') throw new HttpError("El pedido que intentas pagar no existe", 404);
        }
        throw new HttpError("Error al realizar el pago", 409);
    }


}

export const verificarDatosTarjeta = async (numero_tarjeta: string, cvc: string) => {
    try{
        const verificar = await prisma.tarjetas.findFirst({where: {numero_tarjeta, cvc}})
        
        if(!verificar) throw new HttpError("Datos de la tarjeta incorrectos", 400)
            
        return true
    }catch(error){
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if(error.code === 'P2025') throw new HttpError("Datos de la tarjeta incorrectos o mal formados", 400);
        }else{
            throw error
        }
    }
}
