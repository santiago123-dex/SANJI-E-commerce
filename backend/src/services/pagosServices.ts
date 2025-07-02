import { PrismaClient } from "@prisma/client"
import { HttpError } from "../utils/errorManager"
import { DatosPago } from "../types/pagosType"

const prisma = new PrismaClient()

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

        return pago
        
    }catch{
        throw new HttpError("Error al realizar el pago", 409);
    }


}

export const verificarDatosTarjeta = async (numero_tarjeta: string, cvc: string) => {
    const verificar = await prisma.tarjetas.findFirst({where: {numero_tarjeta, cvc}})

    if(!verificar) throw new HttpError("Datos de la tarjeta incorrectos", 400)

    return true
}
