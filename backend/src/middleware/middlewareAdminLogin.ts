import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

export interface RequestExtended extends Request{
    usuario?: any
}

export const verificarTokenAdmin = (req: RequestExtended, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]

    if(!token){
        res.status(400).json({message: "Token no proporcionado"})
        return
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string)

        if(typeof decoded == 'object' && decoded.tipo !== 'admin'){
            res.status(401).json({message: "Acceso denegado, no tienes permisos para acceder"})
            return
        }

        req.usuario = decoded
        next()

    }catch(error){
        res.status(500).json({message: "Error al verificar el token", error})
    }
}