import {Request, Response} from 'express'
import * as pedidoServices from '../services/pedidoServices'
import * as carritoUsuarioServices from '../services/carritoUsuarioServices'
import { HttpError } from '../utils/errorManager'

export const generarPedido = async (req: Request, res: Response) => {
    try{
        const id_usuario = req.usuario?.id_usuario
        
        if(!id_usuario) return res.status(401).json({message: 'Primero inicia sesión'});
        
        const id_pedido = await pedidoServices.generarPedido(id_usuario)

        if(!id_pedido) return res.status(400).json({message: 'No se pudo generar el pedido'});
        
        const carritoPedido = await carritoUsuarioServices.mostrarCarrito(id_usuario)

        if(!carritoPedido) return res.status(400).json({message: 'No hay productos en el carrito'});

        let total_pedido = 0

        for(const d of carritoPedido){
            const id_boleto = d.id_boleto
            const cantidad = d.cantidad
            const boletoInfo = await pedidoServices.mostrarBoletoInfo(id_boleto)

            if(!boletoInfo) return res.status(400).json({message: 'No se pudo generar el pedido'});

            if(cantidad > boletoInfo.stock){
                await pedidoServices.cancelarPedido(id_pedido)
                await carritoUsuarioServices.eliminarCarrito(d.id_carrito)
                return res.status(400).json({message: 'No se pudo realizar el pedido, ya que la cantidad de boletos disponibles no es suficiente'});
            }

            const subtotal = await pedidoServices.crearPedidoDetallado({id_pedido, id_boleto, cantidad})
            total_pedido += subtotal as number
        }

        const actualizarPedido = await pedidoServices.actualizarPedido(id_pedido, {total_pedido})

        await carritoUsuarioServices.eliminarTodoCarrito(id_usuario)

        res.status(200).json(actualizarPedido)

    }catch(error){
        if(error instanceof HttpError){
            res.status(error.codigoEstado).json({message: error.message})
        }else{
            res.status(500).json({message: 'Ha ocurrido un error al generar el pedido'})
        }
    }
}

export const cancelarPedido = async (req: Request, res: Response) => {
    try{
        const id_pedido = parseInt(req.query.id_pedido as string, 10)

        if(!id_pedido || isNaN(id_pedido)) return res.status(400).json({message: 'Faltan datos'});

        const pedido = await pedidoServices.cancelarPedido(id_pedido)

        res.status(200).json({message: 'Pedido cancelado correctamente'})

    }catch(error){
        if(error instanceof HttpError){
            res.status(error.codigoEstado).json({message: error.message})
        }else{
            res.status(500).json({message: 'Ha ocurrido un error al cancelar el pedido'})
        }
    }
}