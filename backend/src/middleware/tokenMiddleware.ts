import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { DatosToken, DatosTokenAdmin } from '../types/tokenType';
import { HttpError } from '../utils/errorManager';

export const verificarUsuario = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]

    if(!token) return res.status(401).json({message: "No se ha recibido el token"});
    
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
        if (typeof decoded === 'object' && decoded !== null) {
            req.usuario = decoded as DatosToken
            return next()
        }

        throw new HttpError("Token mal formado", 400)
    }catch(error){
        res.status(500).json({message: "Token invalido o expirado"})
    }
}

export const verificarAdmin = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]

    if(!token) return res.status(401).json({message: "No se ha recibido el token"});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
        if (typeof decoded === 'object' && decoded !== null && decoded.tipo_admin === 'admin') {
            req.usuarioAdmin = decoded as DatosTokenAdmin
            return next()
        }

        throw new HttpError("Token mal formado", 400)
    }catch(error){
        res.status(500).json({message: "Token invalido o expirado"})
    }
}