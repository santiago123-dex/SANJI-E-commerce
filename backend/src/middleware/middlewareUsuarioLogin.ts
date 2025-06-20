import {Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import { RequestExtended } from './middlewareAdminLogin'

export const verificarTokenUsuario = (req: RequestExtended, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]

    if(!token){
        res.status(400).json({message: "Token no proporcionado"})
        return
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
        req.usuario = decoded
        next()

    }catch(error){
        res.status(400).json({message: "Ha ocurrido un error al verificar el token", error})
    }
}

