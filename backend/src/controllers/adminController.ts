import { Request, Response} from "express"
import * as adminServices from '../services/adminServices'
import {generarTokenAcceso, generarTokenRefresh} from '../utils/generarToken'
import { HttpError } from "../utils/errorManager"

export const loginAdmin = async (req: Request, res: Response) => {
    try{
        const {email_admin, password_admin} = req.body
        if(!email_admin || !password_admin) return res.status(400).json({message: "No se han recibido todos los campos"});

        const admin = await adminServices.loginAdmin(req.body)

        if(!admin) return res.status(404).json({message: "Usuario no encontrado"});
        
        const tokenAcceso = generarTokenAcceso(admin)
        const tokenRefresh = generarTokenRefresh(admin)
        
        res.cookie('tokenRefresh', tokenRefresh, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 7   // para mantener la sesion por 7 dias
        })
        
        res.cookie('tokenAcceso', tokenAcceso, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 15
        })
        
        res.status(200).json({message: 'Inicio de sesion exitoso'})
        
    }catch(error){
        if(error instanceof HttpError){
            res.status(error.codigoEstado).json({message: error.message})
        }else{
            res.status(500).json({message: "Ha ocurrido un error al iniciar sesión"})
        }
    }
    
}

export const logoutAdmin = async (_req: Request, res: Response) => {
    res.clearCookie('tokenAcceso')
    res.clearCookie('tokenRefresh')
    res.status(200).json({ message: 'Sesión cerrada correctamente' })
}