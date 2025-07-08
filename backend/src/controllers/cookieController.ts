import {Request, Response} from 'express'
import { HttpError } from '../utils/errorManager'
import jwt from 'jsonwebtoken'
import { generarTokenAcceso } from '../utils/generarToken'

export const refreshCookie = async (req: Request, res: Response) => {
    const tokenRefresh = req.cookies['tokenRefresh']

    if(!tokenRefresh) return res.status(401).json({message: "Token de refresco no encontrado"})

    try{
        const decoded = jwt.verify(tokenRefresh, process.env.JWT_SECRET_REFRESH as string)
        if (typeof decoded === 'object' && decoded !== null && decoded.tipo_admin === 'admin') {
            const nuevotokenAcceso = generarTokenAcceso({id_admin: decoded.id_admin, email_admin: decoded.email_admin, tipo_admin: decoded.tipo_admin})
            res.cookie('tokenAcceso', nuevotokenAcceso, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 1000 * 60 * 15
            })
        }else if(typeof decoded === 'object' && decoded !== null){
            const nuevotokenAcceso = generarTokenAcceso({id_usuario: decoded.id_usuario, email_usuario: decoded.email_usuario})
            res.cookie('tokenAcceso', nuevotokenAcceso, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 1000 * 60 * 15
            })
        }
        
        res.status(200).json({message: "Cookie renovada"})
    }catch(error){
        if(error instanceof HttpError){
            res.status(error.codigoEstado).json({message: error.message})
        }else{
            res.status(500).json({message: 'Algo salio mal al renovar la cookie'})
        }
    }
}