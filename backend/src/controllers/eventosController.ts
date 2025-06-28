import {Request, Response} from 'express'
import * as eventoServices from '../services/eventoServices'
import { HttpError } from '../utils/errorManager';

export const mostrarEventos = async (_req: Request, res: Response) => {
    try{
        const eventos = await eventoServices.mostrarEventos()

        if(!eventos) return res.status(404).json({message: "No se encontraron eventos"});

        res.status(200).json(eventos)

    }catch(error){
        if(error instanceof HttpError){
            res.status(error.codigoEstado).json({message: error.message})
        }else{
            res.status(500).json({message: "Ha ocurrido un error al obtener los eventos"})
        }
    }
}

export const mostrarEventosNombre = async (req: Request, res: Response) => {
    try{
        const nombre_evento = req.query.nombre_evento as string;

        if(!nombre_evento) return res.status(400).json({message: "No se ha recibido el nombre del evento"});

        const eventos = await eventoServices.mostrarEventosNombre(nombre_evento)

        if(!eventos) return res.status(404).json({message: "No se encontraron eventos con ese nombre"});
    
        res.status(200).json(eventos)

    }catch(error){
        if(error instanceof HttpError){
            res.status(error.codigoEstado).json({message: error.message})
        }else{
            res.status(500).json({message: "Ha ocurrido un error al obtener los eventos"})
        }
    }
}

export const mostrarEventosCategoria = async (req: Request, res: Response) => {
    try{    
        const {nombre_categoria} = req.params

        if(!nombre_categoria) return res.status(400).json({message: "No se ha recibido el nombre de la categoria"});

        const eventos = await eventoServices.mostrarEventosCategoria(nombre_categoria)

        if(!eventos) return res.status(400).json({message: "No se encontraron eventos con esa categoria"});

        res.status(200).json(eventos)

    }catch(error){
        if(error instanceof HttpError){
            res.status(error.codigoEstado).json({message: error.message})
        }else{
            res.status(500).json({message: "Ha ocurrido un error al obtener los eventos"})
        }
    }
}

export const mostrarEventosId = async (req: Request, res: Response) => {
    try{
        const {id_evento} = req.params

        if(!id_evento) return res.status(400).json({message: "No se ha recibido el id del evento"});

        const evento = await eventoServices.mostrarEventoId(parseInt(id_evento))

        res.status(200).json(evento)
    }catch(error){
        if(error instanceof HttpError){
            res.status(error.codigoEstado).json({message: error.message})
        }else{
            res.status(500).json({message: "Ha ocurrido un error al obtener el evento"})
        }
    }
}

export const mostrarBoletosPorEvento = async (req: Request, res: Response) => {
    const {id_evento} = req.params

    if(!id_evento) return res.status(400).json({message: "No se ha recibido el id de evento"});

    try{
        const boletos =  await eventoServices.mostrarBoletosPorEvento(parseInt(id_evento))

        if(!boletos) return res.status(404).json({message: "No se encontraron boletos"});

        res.status(200).json(boletos)

    }catch(error){
        if(error instanceof HttpError){
            res.status(error.codigoEstado).json({message: error.message})
        }else{
            res.status(500).json({message: "Ha ocurrido un error al obtener los boletos"})
        }
    }
}

export const mostrarCategorias = async (_req: Request, res: Response) => {
    try{
        const categorias = await eventoServices.mostrarCategorias()

        if(!categorias) return res.status(404).json({message: "No se encontraron categorias"});

        res.status(200).json(categorias)
    }catch(error){
        if(error instanceof HttpError){
            res.status(error.codigoEstado).json({message: error.message})
        }else{
            res.status(500).json({message: "Ha ocurrido un error al obtener las categorias"})
        }
    }
}