import {Request, Response} from 'express'
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