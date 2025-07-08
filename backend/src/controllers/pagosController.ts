import {Request, Response} from 'express'
import * as pagosServices from '../services/pagosServices'
import { HttpError } from '../utils/errorManager'

export const sistemaPago = async (req: Request, res: Response) => {
    try{
        const id_pedido = parseInt(req.query.id_pedido as string, 10)

        const {id_metodo, nombre_paga, tipo_documento, numero_documento, monto} = req.body
        
        if(!id_pedido || isNaN(id_pedido)) return res.status(400).json({message: 'Faltan datos'});
        if(!id_metodo || !nombre_paga || !tipo_documento || !numero_documento || !monto) return res.status(400).json({message: 'Faltan datos'});

        const pago = await pagosServices.sistemaPago(id_pedido, req.body)

        if(!pago) return res.status(400).json({message: 'No se pudo realizar el pago'});

        res.status(200).json({message: 'Pago realizado correctamente'})

    }catch(error){
        if(error instanceof HttpError){
            res.status(error.codigoEstado).json({message: error.message})
        }else{
            res.status(500).json({message: 'Ha ocurrido un error al realizar el pago'})
        }
    }
}

export const verificarDatosTarjeta = async (req: Request, res: Response) => {
    try{
        const {numero_tarjeta, cvc} = req.body

        if(!numero_tarjeta || !cvc) return res.status(400).json({message: 'Faltan datos'});

        const datosTarjeta = await pagosServices.verificarDatosTarjeta(numero_tarjeta, cvc)

        if(datosTarjeta != true) return res.status(400).json({message: 'Datos de la tarjeta incorrectos'})
        
        res.status(200).json({message: "Datos verificados"})
    }catch(error){
        if(error instanceof HttpError){
            res.status(error.codigoEstado).json({message: error.message})
        }else{
            res.status(500).json({message: 'Ha ocurrido un error al verificar los datos de la tarjeta'})
        }
    }
}
