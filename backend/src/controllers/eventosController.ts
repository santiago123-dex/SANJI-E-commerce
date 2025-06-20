import {Request, Response} from 'express'
import * as eventoServices from '../services/eventoServices'

export const mostrarEventos = async (_req: Request, res: Response) => {
    try{
        const eventos = await eventoServices.mostrarEventos()

        if(!eventos) return res.status(404).json({message: "No seencontraron eventos"});

        res.status(200).json(eventos)

    }catch(error){
        res.status(500).json({message: "Ha ocurrido un error al obtener los eventos", error: error})
    }
}

export const mostrarEventosNombre = async (req: Request, res: Response) => {
    try{
        const {nombre} = req.body

        if(!nombre) return res.status(400).json({message: "No se ha recibido el nombre del evento"});

        const eventos = await eventoServices.mostrarEventosNombre(nombre)

        if(!eventos) return res.status(404).json({message: "No se encontraron eventos con ese nombre"});
    
        res.status(200).json(eventos)

    }catch(error){
        res.status(500).json({message: "Ha ocurrido un error al obtener los eventos", error: error})
    }
}

export const mostrarCategorias = async (_req: Request, res: Response) => {
    try{
        const categorias = await eventoServices.mostrarCategorias()

        if(!categorias) return res.status(404).json({message: "No se encontraron categorias"});

        res.status(200).json(categorias)
    }catch(error){
        res.status(500).json({message: "Ha ocurrido un error al obtener las categorias", error: error})
    }
}