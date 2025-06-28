import { Request, Response } from 'express'
import * as adminEventoServices from '../services/adminEventoServices'
import { HttpError } from '../utils/errorManager';

export const crearEvento = async (req: Request, res: Response) => {
    try{
        const {id_categoria, nombre_evento, descripcion_evento, fecha_evento, ubicacion, imagen_evento, estado_evento} = req.body
        
        if(!id_categoria || !nombre_evento || !fecha_evento || !ubicacion || !estado_evento) return res.status(400).json({message: 'Faltan datos'});
    
        await adminEventoServices.crearEvento(req.body)

    }catch(error){
        if(error instanceof HttpError){
            res.status(error.codigoEstado).json({message: error.message})
        }else{
            res.status(500).json({message: 'Ha ocurrido un error al crear el evento'})
        }
    }
}

export const actualizarEvento = async (req: Request, res: Response) => {
    try{
        const {id_evento, id_categoria, nombre_evento, descripcion_evento, fecha_evento, ubicacion, imagen_evento, estado_evento} = req.body

        if(!id_evento || !id_categoria || !nombre_evento || !fecha_evento || !ubicacion || !estado_evento) return res.status(400).json({message: 'Faltan datos'});

        await adminEventoServices.actualizarEvento(req.body)

        res.status(200).json({message: 'Evento actualizado correctamente'})

    }catch(error){
        if(error instanceof HttpError){
            res.status(error.codigoEstado).json({message: error.message})
        }else{
            res.status(500).json({message: 'Ha ocurrido un error al actualizar el evento'})
        }
    }
}

export const eliminarEvento = async (req: Request, res: Response) => {
    try{
        const id_evento = parseInt(req.query.id_evento as string, 10)

        if(!id_evento || isNaN(id_evento)) return res.status(400).json({message: 'Faltan datos'});

        await adminEventoServices.eliminarEvento(id_evento)

        res.status(200).json({message: 'Evento eliminado correctamente'})

    }catch(error){
        if(error instanceof HttpError){
            res.status(error.codigoEstado).json({message: error.message})
        }else{
            res.status(500).json({message: 'Ha ocurrido un error al eliminar el evento'})
        }
    }
}

export const crearBoleto = async (req: Request, res: Response) => {
    try{
        const {id_evento, id_tipo, precio_boleto, stock, descripcion_boleto} = req.body
        if(!id_evento || !id_tipo || !precio_boleto || !stock || !descripcion_boleto) return res.status(400).json({message: 'Faltan datos'});
    
        const boleto = await adminEventoServices.crearBoleto(req.body)

        if(!boleto) return res.status(400).json({message: 'No se pudo crear el boleto'});

        res.status(201).json({message: 'Boleto creado correctamente'})

    }catch(error){
        if(error instanceof HttpError){
            res.status(error.codigoEstado).json({message: error.message})
        }else{
            res.status(500).json({message: 'Ha ocurrido un error al crear el boleto'})
        }
    }
}

export const actualizarBoleto = async (req: Request, res: Response) => {
    const {id_boleto, id_evento, id_tipo, precio_boleto, stock, descripcion_boleto} = req.body

    if(!id_boleto || !id_evento || !id_tipo || !precio_boleto || !stock || !descripcion_boleto) return res.status(400).json({message: 'Faltan datos'});

    try{
        await adminEventoServices.actualizarBoleto(req.body)

        res.status(200).json({message: 'Boleto actualizado correctamente'})

    }catch(error){
        if(error instanceof HttpError){
            res.status(error.codigoEstado).json({message: error.message})
        }else{
            res.status(500).json({message: 'Ha ocurrido un error al actualizar el boleto'})
        }
    }
}

export const eliminarBoleto = async (req: Request, res: Response) => {
    const id_boleto = req.query.id_boleto as string

    if(!id_boleto) return res.status(400).json({message: 'Faltan datos'});

    try{
        const boleto = await adminEventoServices.eliminarBoleto(parseInt(id_boleto))

        res.status(200).json({message: 'Boleto eliminado correctamente'})

    }catch(error){
        if(error instanceof HttpError){
            res.status(error.codigoEstado).json({message: error.message})
        }else{
            res.status(500).json({message: 'Ha ocurrido un error al eliminar el boleto'})
        }
    }
}