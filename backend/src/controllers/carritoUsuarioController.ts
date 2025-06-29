import {Request, Response} from 'express'
import * as carritoUsuarioServices from '../services/carritoUsuarioServices'
import { HttpError } from '../utils/errorManager'

export const mostrarCarrito = async (req: Request, res: Response) => {
    try{
        const id_usuario = req.usuario?.id_usuario

        if(!id_usuario) return res.status(401).json({message: 'Se necesita iniciar sesion para ver el carrito'});

        const carrito = await carritoUsuarioServices.mostrarCarrito(id_usuario)

        res.status(200).json(carrito)


    }catch(error){
        if(error instanceof HttpError){
            res.status(error.codigoEstado).json({message: error.message})
        }else{
            res.status(500).json({message: 'Error interno del servidor al obtener el carrito'})
        }
    }
}

export const agregarProductoCarrito = async (req: Request, res: Response) => {
    try{
        const id_usuario = req.usuario?.id_usuario
        const {id_boleto, cantidad} = req.body

        if(!id_usuario || !id_boleto || !cantidad) return res.status(400).json({message: 'Faltan datos'});

        await carritoUsuarioServices.agregarProductoCarrito(id_usuario, req.body)

        res.status(200).json({message: 'Producto agregado al carrito'})

    }catch(error){
        if(error instanceof HttpError){
            res.status(error.codigoEstado).json({message: error.message})
        }else{
            res.status(500).json({message: 'Error interno del servidor al agregar el producto al carrito'})
        }
    }
}

export const eliminarCarrito = async (req: Request, res: Response) => {
    try{
        const id_carrito = parseInt(req.query.id_carrito as string, 10)

        if(!id_carrito || isNaN(id_carrito)) return res.status(400).json({message: 'Faltan datos'});

        const carrito = await carritoUsuarioServices.eliminarCarrito(id_carrito)

        res.status(200).json({message: 'Producto eliminado del carrito'})

    }catch(error){
        if(error instanceof HttpError){
            res.status(error.codigoEstado).json({message: error.message})
        }else{
            res.status(500).json({message: 'Error interno del servidor al eliminar el carrito'})
        }
    }
}